import React, { useState } from "react";

import { Modal } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { useQuery } from "react-query";

import { send_var_query } from "../../api";
import { changeOrderStatus } from "../../redux/cart";
import { gql } from "graphql-request";
import { readPaymentType, readStatus } from "../../transform";
import { errorComponent, loadingComponent } from "../admin/HelperComps";

const get_orders = gql`
query{
  user{
    getMyOrders{
      products{
        amount
        product{
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
`

function Orders() {

  const { data, error, refetch, isSuccess, isError, isLoading, isFetching } =
    useQuery("get_user", async () => {
      const {
        user: { getMyOrders },
      } = await send_var_query(get_orders);
      return getMyOrders;
    });
  const [modal, setModal] = useState(0);
  const [currentOrder, setCurrentOrder] = useState("");

 

  const orderStatus = useSelector((state) => state.cart.orderStatus);
  
  const dispatch = useDispatch();
  if(orderStatus!==1){
    dispatch(changeOrderStatus({status:-1}));
  }

  const modalBody = (
    <div className="flex items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center">
      <div className="bg-white w-900 px-14 pb-10 rounded-3xl py-6">
        <div className="text-2xl text-center mb-8">Заказ №{modal}</div>
        <div className="flex justify-between mb-6">
          <div>Тип оплаты:</div>
          <div>{readPaymentType(currentOrder.paymentType)}</div>
        </div>
        <div className="grid grid-cols-4 border-b-2 pb-2.5 font-semibold text-gray-800 items-center">
          <div>Наименование</div>
          <div className="text-center">Цена за 1 шт</div>
          <div className="text-center">Количество</div>
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
  const showModal = (i, e) => {
    setModal(i);
    setCurrentOrder(e);
  };

  return (
    <div className="ml-20 w-8/12">
      {isError&&errorComponent(error)}
      {(isLoading || isFetching) && isError && loadingComponent()}
      {isSuccess&&data &&!isLoading&&!isFetching && (
        <div>
        <div className="text-3xl mb-16">Мои заказы</div>
        <div className="overflow-y-scroll h-600 px-5">
          <div className="grid grid-cols-4 mb-8 text-center">
            <div className="text-xl">Номер заказа</div>
            <div className="text-xl">Тип оплаты</div>
            <div className="text-xl">Статус</div>
          </div>
          {
            data.map(e=>(
              <div className="grid grid-cols-4 items-center text-center">
                <div>{data.length - e.id+1}</div>
                <div>{readPaymentType(e.paymentType)}</div>
                <div>{readStatus(e.status)}</div>
                <button
                  onClick={() => showModal(data.length - e.id+1, e)}
                  className="btn-primary rounded-3xl my-2 w-300"
                >
                  Просмотреть заказ
                </button>
                <Modal
                  open={modal === data.length - e.id+1}
                  onClose={() => setModal(false)}
                >
                  {modalBody}
                </Modal>
              </div>
            ))
          }
        </div>
      </div>
      )}
    </div>
  );
}

export default Orders;
