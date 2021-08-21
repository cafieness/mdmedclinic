import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeOrderStatus,
  decrement,
  increment,
  remove,
  updateUnits,
} from "../../redux/cart";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

function Basket() {
  const isLoggedIn = useSelector((state) => (state.user.user ? true : false));
  const cart = useSelector((state) =>
    state.cart.cart ? state.cart.cart : false
  );

  const dispatch = useDispatch();

  const updateUnitsValue = (event, id) => {
    let val = event.target.value;
    if (parseInt(val) <= 0) {
      val = 1;
    }
    if (parseInt(val) > 999) {
      val = 999;
    }
    if (val === "") {
      val = 1;
    }
    dispatch(updateUnits({ amount: val, id: id }));
  };
  const incrementUnits = (numb, id) => {
    if (numb < 999) {
      dispatch(increment({ id: id }));
    }
  };
  const decrementUnits = (numb, id) => {
    if (numb > 1) {
      dispatch(decrement({ id: id }));
    }
  };

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div
      className={
        cart.length >= 2 ? "py-40 bg-primary " : "h-screen py-40 bg-primary"
      }
    >
      <div className="w-4/5 mx-auto">
        <div className="text-4xl mb-10 text-center">Ваш заказ</div>
        {cart.length > 0 && (
          <div>
            <div className="w-full md:hidden">
              <div className="basket-table-th">
                <div></div>
                <div>Наименование</div>
                <div>Количество</div>
                <div>Сумма</div>
                <div></div>
              </div>
              <div className="mt-4 border-t-2">
                {cart.map((el) => (
                  <div className="border-b-2 basket-table-tr ">
                    <img src={el.product.image} alt="" />
                    <div>
                      <div className="text-2xl mb-4">{el.product.name}</div>
                      <div className="text-2xl italic">
                        Цена: {el.product.price} сом
                      </div>
                    </div>
                    <div>
                      <FontAwesomeIcon
                        icon={faMinus}
                        onClick={() => decrementUnits(el.amount, el.product.id)}
                        className="mr-2 text-2xl"
                      />
                      <input
                        type="number"
                        value={el.amount}
                        onChange={(e) => updateUnitsValue(e, el.product.id)}
                        className="text-center w-12 text-2xl italic bg-primary appearance-none"
                      />
                      <FontAwesomeIcon
                        icon={faPlus}
                        onClick={() => incrementUnits(el.amount, el.product.id)}
                        className="text-2xl ml-2 cursor-pointer"
                      />
                    </div>

                    <div className="text-2xl italic">
                      {el.product.price * el.amount} сом
                    </div>
                    <button
                      className="text-4xl"
                      onClick={() => dispatch(remove({ id: el.product.id }))}
                    >
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                  </div>
                ))}
                <div className="mt-20">
                <div className="italic text-right">
                  Итого к оплате:{" "}
                  {cart.reduce(
                    (a, b) => (a = a + b.product.price * b.amount),
                    0
                  )}{" "}
                  сом
                </div>
                <div className="flex mt-20 justify-between items-center">
                  <Link to="/shop" className="text-xl italic mt-10">
                    {`<`} Вернуться к покупкам
                  </Link>
                  <Link to="/payment">
                    <button
                      onClick={dispatch(changeOrderStatus({ status: 0 }))}
                      className="btn-primary rounded-3xl"
                    >
                      Оформить заказ
                    </button>
                  </Link>
                </div>
              </div>
            
              </div>
              
            </div>
            
            <div className="hidden md:flex md:flex-col md:items-center">
              {cart.map((el) => (
                <div className="flex flex-col items-center border-b-2 pb-4">
                  <img src={el.product.image} alt="" />
                  <div className="text-2xl my-4">{el.product.name}</div>
                  <div className="text-2xl italic">
                    Цена: {el.product.price} сом
                  </div>
                  <div className="mt-8">
                    <FontAwesomeIcon
                      icon={faMinus}
                      onClick={() => decrementUnits(el.amount, el.product.id)}
                      className="mr-2 text-2xl"
                    />
                    <input
                      type="number"
                      value={el.amount}
                      onChange={(e) => updateUnitsValue(e, el.product.id)}
                      className="text-center w-12 text-2xl italic bg-primary appearance-none"
                    />
                    <FontAwesomeIcon
                      icon={faPlus}
                      onClick={() => incrementUnits(el.amount, el.product.id)}
                      className="text-2xl ml-2 cursor-pointer"
                    />
                  </div>
                </div>
              ))}
              <div className="mt-6">
                <div className="italic text-center">
                  Итого к оплате:{" "}
                  {cart.reduce(
                    (a, b) => (a = a + b.product.price * b.amount),
                    0
                  )}{" "}
                  сом
                </div>
                <div className="flex-col flex mt-6 justify-between items-center">
                  <Link to="/shop" className="text-xl italic order-2 mt-10">
                    {`<`} Вернуться к покупкам
                  </Link>
                  <Link to="/payment">
                    <button
                      onClick={dispatch(changeOrderStatus({ status: 0 }))}
                      className="btn-primary rounded-3xl"
                    >
                      Оформить заказ
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {cart.length === 0 && (
          <div className="text-4xl w-full flex justify-center items-center h-96">
            Пусто
          </div>
        )}
      </div>
    </div>
  );
}

export default Basket;


