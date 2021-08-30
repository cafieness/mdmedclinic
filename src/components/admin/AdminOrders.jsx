import { Dialog } from "@material-ui/core";
import { gql } from "graphql-request";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import send_mutation, { send_var_query } from "../../api";
import { readPaymentType, readStatus, useLoginRedirect } from "../../transform";
import {
  errorComponent,
  handleGQLError,
  loadingComponent,
} from "./HelperComps";

const get_orders_query = gql`
  query getOrders($st: Status!) {
    admin {
      getAllOrders(input: { status: $st }) {
        id
        address
        paymentType
        products {
          amount
          product {
            id
            name
            price
            image
          }
        }
        status
        user {
          email
          fullname
          id
          phoneNumber
        }
      }
    }
  }
`;

const propogate_query = gql`
  mutation PropogateOrder($id: ID!, $status: Status!) {
    admin {
      updateStatus(orderId: $id, input: { status: $status }) {
        id
      }
    }
  }
`;

const render_order_list_comp = (data, select_order) => {
  return (
    <div className="table-auto table my-4">
      {data.length === 0 && (
        <div className="absolute top-1/2 left-[55%] transform -translate-x-1/2 -translate-y-1/2 text-gray-900 font-bold">
          Заказов в данной категории пока нет
        </div>
      )}
      {data.length !== 0 && (
        <thead className="">
          <tr className="text-center font-semibold text-lg text-gray-900 mb-4">
            <th className="table-cell">Номер заказа</th>
            <th className="table-cell">Имя заказчика</th>
            <th className="table-cell">Номер телефона</th>
            <th className="table-cell"></th>
            <th className="table-cell"></th>
          </tr>
        </thead>
      )}
      <tbody className="">
        {data.map((el) => (
          <tr className="text-center items-center hover:shadow-md">
            <td className="py-2">{el.id}</td>
            <td className="py-2">{el.user.fullname}</td>
            <td className="py-2">{el.user.phoneNumber}</td>
            <td className="py-2">
              <button
                className="btn-ar bg-gray-900 text-white hover:ring-red-700"
                onClick={() => select_order(el)}
              >
                Управление
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </div>
  );
};

function propagate_order(status, propogate_mut) {
  var msg;
  switch (status) {
    case "PENDING":
      msg = "Утвердить заказ";
      break;
    case "ACCEPTED":
      msg = "Указать, что заказ готов";
      break;
    case "READY":
      msg = "Закрыть позицию";
      break;
    case "CLOSED":
      msg = null;
      break;
    case "CANCELLED":
      msg = "Восстановить позицию";
      break;
    default:
      break;
  }
  var new_status;
  switch (status) {
    case "PENDING":
      new_status = "ACCEPTED";
      break;
    case "ACCEPTED":
      new_status = "READY";
      break;
    case "READY":
      new_status = "CLOSED";
      break;
    case "CLOSED":
      new_status = null;
      break;
    case "CANCELLED":
      new_status = "PENDING";
      break;
    default:
      break;
  }
  return (
    <button
      className={
        "btn-ar " +
        (msg ? "!ring-green-600 font-semibold hover:bg-green-300" : "")
      }
      onClick={() => propogate_mut(new_status)}
    >
      {msg}
    </button>
  );
}

function RenderOrderModal(order, close_order, propogate_mut) {
  return (
    <Dialog
      open={order}
      onClose={() => {
        close_order(null);
      }}
      maxWidth="lg"
    >
      <div className="py-10 mx-20 flex flex-col min-w-[60vw] space-y-4 text-gray-900">
        <h2 className="font-semibold text-2xl  text-center">
          Заказ номер #{order.id}
        </h2>
        <div className="flex justify-between w-full">
          <p className="font-bold">Фамилия, Имя заказчика:</p>
          <p>{order.user.fullname}</p>
        </div>
        <div className="flex justify-between w-full">
          <p className="font-bold">Статус:</p>
          <p>{readStatus(order.status)}</p>
        </div>
        <div className="flex justify-between w-full">
          <p className="font-bold">Номер телефона:</p>
          <p>{order.user.phoneNumber}</p>
        </div>
        <div className="flex justify-between w-full">
          <p className="font-bold">Тип Оплаты:</p>
          <p>{readPaymentType(order.paymentType)}</p>
        </div>

        {order.address && (
          <div className="flex justify-between w-full">
            <p className="font-bold">Адрес:</p>
            <p>{order.address}</p>
          </div>
        )}
        <div className="mb-8"></div>
        <table className="table-auto w-full text-left">
          <thead>
            <th>Наименование</th>
            <th>Цена</th>
            <th>Кол-во</th>
            <th>Общая сумма</th>
          </thead>
          <tbody>
            {order.products.map((el) => (
              <tr className=" items-center h-8 overscroll-y-auto">
                <td>{el.product.name}</td>
                <td>{el.product.price}</td>
                <td>{el.amount}</td>
                <td>{el.amount * el.product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-right font-bold">
          Итого к оплате{" "}
          {order.products.reduce((pr, cur) => {
            return pr + cur.amount * cur.product.price;
          }, 0)}
        </p>
        <div className="flex space-x-4">
          {order.status !== "CLOSED" && order.status !== "CANCELLED" && (
            <button
              className="btn-ar !ring-red-600 hover:bg-red-300 font-semibold text-black"
              onClick={() => propogate_mut("CANCELLED")}
            >
              Отменить заказ
            </button>
          )}
          {propagate_order(order.status, propogate_mut)}
        </div>
      </div>
    </Dialog>
  );
}

function AdminOrders() {
  const [status, setStatus] = useState("PENDING");
  const statusList = ["CANCELLED", "CLOSED", "READY", "ACCEPTED", "PENDING"];
  const { data, isError, isLoading, isSuccess, refetch, isFetching, error } =
    useQuery("orders", async () => {
      const {
        admin: { getAllOrders },
      } = await send_var_query(get_orders_query, { st: status });
      return getAllOrders;
    });

  useEffect(() => {
    refetch();
    setSelectedOrder(null);
  }, [status]);

  const loginRedirect = useLoginRedirect("/admin/orders");

  useEffect(() => {
    if (isError) {
      handleGQLError(error, loginRedirect);
    }
  }, [error, isError, loginRedirect]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const { mutate: propogate_mut } = useMutation(async ({ new_status, id }) => {
    const {
      admin: { update },
    } = await send_mutation(propogate_query, { id: id, status: new_status });
    return update;
  });

  const propogate_order = (new_status) => {
    var id = selectedOrder.id;
    propogate_mut(
      { new_status, id },
      {
        onError: (err) => {
          console.log(err);
        },
        onSuccess: (data) => {
          refetch();
          setSelectedOrder(null);
          console.log(data);
        },
      }
    );
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-semibold text-gray-900 mb-4">Заказы</h2>
      <div className="flex flex-row-reverse text-sm mb-4">
        {statusList.map((el) => (
          <button
            className={
              "btn-ar mr-2 " +
              (status === el
                ? "bg-gray-900 text-white"
                : "bg-transparent ring-1 ring-gray-800")
            }
            onClick={() => setStatus(el)}
          >
            {readStatus(el)}
          </button>
        ))}
      </div>

      {isError && errorComponent(error)}
      {(isLoading || isFetching) && loadingComponent()}
      {isSuccess &&
        data &&
        !isLoading &&
        !isFetching &&
        render_order_list_comp(data, setSelectedOrder)}
      {selectedOrder &&
        RenderOrderModal(selectedOrder, setSelectedOrder, propogate_order)}
    </div>
  );
}

export default AdminOrders;
