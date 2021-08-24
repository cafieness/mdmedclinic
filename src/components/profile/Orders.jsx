import React, { useState } from "react";

import { Modal } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { useQuery } from "react-query";

import { send_var_query } from "../../api";
import { changeOrderStatus } from "../../redux/cart";
import { gql } from "graphql-request";
import { readPaymentType, readStatus } from "../../transform";
import { errorComponent, loadingComponent } from "../admin/HelperComps";
import { Dialog } from "@material-ui/core";

const get_orders = gql`
  query {
    user {
      getMyOrders {
        products {
          amount
          product {
            id
            image
            name
            price
            volume
          }
        }
        status
        paymentType
        id
      }
    }
  }
`;

function Orders() {
  const { data, error, refetch, isSuccess, isError, isLoading, isFetching } =
    useQuery("get_user", async () => {
      const {
        user: { getMyOrders },
      } = await send_var_query(get_orders);
      return getMyOrders;
    });
  const [modal, setModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState("");

  const orderStatus = useSelector((state) => state.cart.orderStatus);

  const dispatch = useDispatch();
  if (orderStatus !== 1) {
    dispatch(changeOrderStatus({ status: -1 }));
  }

  const modalBody = (
    <div className="flex items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center">
      <div className="bg-white min-w-[90vw] mdh:min-w-[70vw] px-4 mdh:px-14 pb-10 rounded-3xl py-6">
        <div className="text-2xl text-center mb-8">
          Заказ №{currentOrder.id}
        </div>
        <div className="flex justify-between mb-6">
          <div>Тип оплаты:</div>
          <div>{readPaymentType(currentOrder.paymentType)}</div>
        </div>
        <div className="grid grid-cols-4 border-b-2 pb-2.5 font-semibold text-gray-800 items-center">
          <div>Продукт</div>
          <div className="text-center">Цена за 1 шт</div>
          <div className="text-center">Кол-во</div>
          <div className="text-center">Общая сумма</div>
        </div>
        {currentOrder !== "" &&
          currentOrder.products.map((el) => (
            <div className="grid grid-cols-4 border-b-2 mt-2 pb-2 items-center">
              <div>{el.product.name}</div>
              <div className="text-center">{el.product.price}</div>
              <div className="text-center">{el.amount}</div>
              <div className="text-center">{el.product.price * el.amount}</div>
            </div>
          ))}
        <div className="text-right font-semibold mt-6">
          Итого к оплате:{" "}
          {currentOrder !== "" &&
            currentOrder.products.reduce(
              (a, b) => (a = a + b.product.price * b.amount),
              0
            )}
        </div>
      </div>
    </div>
  );
  const showModal = (e) => {
    setModal(true);
    setCurrentOrder(e);
  };

  return (
    <div className="">
      <Modal open={modal} onClose={() => setModal(false)}>
        {modalBody}
      </Modal>
      {isError && errorComponent(error)}
      {(isLoading || isFetching) && isError && loadingComponent()}
      {isSuccess && data && !isLoading && !isFetching && (
        <div className="my-8 mdh:w-full">
          <div className="text-3xl mb-8 mdh:mb-12 ml-4 mdh:ml-16 ">
            Мои заказы
          </div>
          <div className="px-1 mdh:px-16">
            <div className="grid grid-cols-7 mb-4 text-center">
              <div className="font-semibold text-gray-800 ">Номер заказа</div>
              <div className="font-semibold text-gray-800 col-span-2">
                Тип оплаты
              </div>
              <div className="font-semibold text-gray-800 col-span-2">
                Статус
              </div>
            </div>
            {data.map((e) => (
              <div
                className="grid grid-cols-7 items-center text-center"
                key={e.id}
              >
                <div>{e.id}</div>
                <div className="col-span-2">
                  {readPaymentType(e.paymentType)}
                </div>
                <div className="col-span-2">{readStatus(e.status)}</div>
                <button
                  onClick={() => showModal(e)}
                  className="col-span-2 btn-primary-logic px-3 py-1 mdh:px-8 mdh:text-xl  rounded-3xl my-2"
                >
                  Просмотреть заказ
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
