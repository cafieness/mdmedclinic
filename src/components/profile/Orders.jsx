import React, { useState } from "react";

import { Modal } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { changeOrderStatus } from "../../redux/cart";

function Orders() {
  const [modal, setModal] = useState(0);
  const [currentOrder, setCurrentOrder] = useState("");

 

  const orderStatus = useSelector((state) => state.cart.orderStatus);
  const order = useSelector((state) =>
    state.orders.orders ? state.orders.orders : false
  );
  const dispatch = useDispatch();
  if(orderStatus===1){
    dispatch(changeOrderStatus({status:-1}));
  }

  const modalBody = (
    <div className="flex items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center">
      <div className="bg-white w-900 px-14 pb-10 rounded-3xl py-6">
        <div className="text-2xl text-center mb-8">Заказ №{modal}</div>
        <div className="flex justify-between mb-6">
          <div>Тип оплаты:</div>
          <div>{currentOrder.method}</div>
        </div>
        <div className="grid grid-cols-4 border-b-2 pb-2.5 font-semibold text-gray-800 items-center">
          <div>Наименование</div>
          <div className="text-center">Цена за 1 шт</div>
          <div className="text-center">Количество</div>
          <div className="text-center">Общая сумма</div>
        </div>
        {currentOrder !== "" &&
          currentOrder.order.map((el) => (
            <div className="grid grid-cols-4 border-b-2 mt-2 pb-2 items-center">
              <div>{el.product.name}</div>
              <div className="text-center">{el.product.price}</div>
              <div className="text-center">{el.units}</div>
              <div className="text-center">{el.product.price * el.units}</div>
            </div>
          ))}
        <div className="text-right font-semibold mt-6">
          Итого к оплате:{" "}
          {currentOrder !== "" &&
            currentOrder.order.reduce(
              (a, b) => (a = a + b.product.price * b.units),
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
    <div className="ml-20 w-3/5">
      <div className="text-3xl mb-16">Мои заказы</div>
      <div className="overflow-y-scroll h-600 px-5">
        <div className="grid grid-cols-4 mb-8 text-center">
          <div className="text-xl">Номер заказа</div>
          <div className="text-xl">Тип оплаты</div>
          <div className="text-xl">Статус</div>
        </div>
        {order &&
          order.map((e, index) => (
            <div className="grid grid-cols-4 items-center text-center">
              <div>{order.length - index}</div>
              <div>{e.method}</div>
              <div>{e.status ? "Выполнен" : "Не выполнен"}</div>
              <button
                onClick={() => showModal(order.length - index, e)}
                className="btn-primary rounded-3xl my-2 w-300"
              >
                Просмотреть заказ
              </button>
              <Modal
                open={modal === order.length - index}
                onClose={() => setModal(false)}
              >
                {modalBody}
              </Modal>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Orders;
