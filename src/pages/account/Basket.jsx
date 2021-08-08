import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, remove, updateUnits } from "../../redux/cart";

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
    dispatch(updateUnits({ units: val, id: id }));
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
      <div className="w-3/5 mx-auto">
        <div className="text-4xl mb-10">Ваш заказ</div>
        {cart.length > 0 && (
          <div className="w-full">
            
              <div className="basket-table-th">
                <div></div>
                <div>Наименование</div>
                <div>Количество</div>
                <div>Сумма</div>
                <div></div>
              </div>
              <div className="mt-4 border-t-2">
                {cart.map((el) => (
                  <div className="border-b-2 basket-table-tr">
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
                        onClick={() => decrementUnits(el.units, el.product.id)}
                        className="mr-2 text-2xl"
                      />
                      <input
                        type="number"
                        value={el.units}
                        onChange={(e) => updateUnitsValue(e, el.product.id)}
                        className="text-center w-12 text-2xl italic bg-primary appearance-none"
                      />
                      <FontAwesomeIcon
                        icon={faPlus}
                        onClick={() => incrementUnits(el.units, el.product.id)}
                        className="text-2xl ml-2 cursor-pointer"
                      />
                    </div>

                    <div className="text-2xl italic">
                      {el.product.price * el.units} сом
                    </div>
                    <button
                      className="text-4xl"
                      onClick={() => dispatch(remove({ id: el.product.id }))}
                    >
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                  </div>
                ))}
              </div>
            <div className="mt-20">
                <div className="italic text-right">Итого к оплате: {cart.reduce((a,b)=>a=a+b.product.price * b.units, 0)} сом</div>
                <div className="flex mt-20 justify-between items-center">
                    <Link to="/shop" className="text-2xl italic">{`<`} Вернуться к покупкам</Link>
                    <Link><button className="btn-primary rounded-3xl">Оформить заказ</button></Link>
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
