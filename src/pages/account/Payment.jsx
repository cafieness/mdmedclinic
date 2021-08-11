import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import { changeOrderStatus, remove } from "../../redux/cart";
import {add} from "../../redux/orders";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function Payment() {
  const [openDialog, setOpenDialog] = useState(false);
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState(true);

  const orderStatus = useSelector((state) => state.cart.orderStatus);
  const [status, setStatus] = useState(orderStatus);
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");

  const isLoggedIn = useSelector((state) => (state.user.user ? true : false));
  const dialogBody = (
    <div className="p-10 flex flex-col items-center">
      <FontAwesomeIcon
        className="text-5xl mb-8 text-green-400"
        icon={faCheck}
      />
      <div>Заказ отправлен.<br/>Зайдите в мои заказы,<br/> чтобы проверить заказ</div>
    </div>
  );
  const handleSubmit = () => {
    if (phonePattern.test(phone) && address != "" && paymentMethod!=="") {
      setOpenDialog(true);
      setTimeout(() => {
        setOpenDialog(false);
        dispatch(add({order:cart, method:paymentMethod,status:false}));
        cart.map(el=> dispatch(remove({id:el.product.id})));
      dispatch(changeOrderStatus({ status: 1 }));
      }, 2500);
    } else {
        setErrorMessage(false)
    }
  };
  const cart = useSelector((state) =>
    state.cart.cart ? state.cart.cart : false
  );
  const phonePattern = /^(0|996)(?!([0,1,2,3,4,6,8])\2\2)([0-9]{3})[0-9]{6}$/;
  const handlePhoneChange = (el) => {
    setPhone(el.target.value);
  };
  const handleAddressChange = (el) => {
    setAddress(el.target.value);
  };

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  if (orderStatus !== 0) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="bg-primary py-40">
      <div className="w-4/5 mx-auto flex">
        <div className="border-r-2 border-black pr-20">
          <div className="text-3xl mb-20">Ваш заказ</div>
          <div
            className={cart.length > 2 ? "overflow-y-scroll h-500" : "h-500 "}
          >
            {cart.map((el) => (
              <div className="border-b-2 flex py-2">
                <img src={el.product.image} alt="" />
                <div className="ml-8">
                  <div className="text-2xl mb-4 italic font-bold">{`${el.product.name}, ${el.product.volume}`}</div>

                  <div className="text-xl mb-2">
                    Сумма: {el.product.price * el.units} сом
                  </div>
                  <div className="text-xl ">Количество: {el.units} шт.</div>
                </div>
              </div>
            ))}
            <div className="italic text-xl mt-8 text-right">
              К оплате:
              {cart.reduce((a, b) => (a = a + b.product.price * b.units), 0)}
              сом
            </div>
          </div>
        </div>

        <div className="ml-20 text-xl">
          <div>
            <div className=" mb-4">Адрес</div>
            <input
              type="text"
              className="outline-none rounded-3xl p-2 px-4 w-300 mb-6"
              onChange={handleAddressChange}
              value={address}
              required
            />
          </div>
          <div>
            <div className=" mb-4">Номер телефона</div>
            <input
              type="number"
              className="outline-none rounded-3xl p-2 px-4 w-300 mb-6"
              onChange={handlePhoneChange}
              value={phone}
              required
            />
          </div>
          <div>
            <div>Способ оплаты</div>
            <div className="ml-12 mb-10 mt-4">
              <div className="flex flex-col">
                <div>
                  <input
                    type="radio"
                    id="наличными"
                    name="оплата"
                    value="наличными"
                    className="mr-2"
                    onChange={()=>setPaymentMethod("наличными")}
                    checked={paymentMethod==="наличными"}
                  />
                  <label for="наличными">Наличными курьеру</label>
                </div>
                <input
                  type="text"
                  className="outline-none rounded-3xl p-2 px-4 w-300 mb-6 mt-4"
                  placeholder="Введите сумму для сдачи"
                  required
                />
              </div>
              <div className="flex flex-col">
                <div>
                  <input
                    type="radio"
                    id="элсом"
                    name="оплата"
                    value="элсом"
                    className="mr-2"
                    onChange={()=>setPaymentMethod("элсом")}
                    checked={paymentMethod==="элсом"}
                  />
                  <label for="элсом">Элсом</label>
                </div>
                <div className="mt-2">Номер элсома: 8-800-555-35-35</div>
              </div>
            </div>
          </div>
          <div hidden={errorMessage} className="mb-2 text-red-600">Необходимо заполнить все поля</div>
          <button className="btn-primary rounded-3xl" onClick={handleSubmit}>
            Отправить
          </button>

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            {dialogBody}
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Payment;
