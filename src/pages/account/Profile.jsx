import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import { Modal } from "@material-ui/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../redux/user";
import { CheckDate } from "../../components";
import { changeOrderStatus } from "../../redux/cart";


function Profile() {
  const [activeSection, setActiveSection] = useState("Профиль");
  const sections = ["Профиль", "Сменить пароль", "Мои заказы"];
  const isLoggedIn = useSelector((state) => (state.user.user ? true : false));
  const userInfo = useSelector((state) =>
    state.user.user ? state.user.user : false
  );
  const orderStatus = useSelector((state) => state.cart.orderStatus);
  const order  = useSelector(state => state.orders.orders ? state.orders.orders : false);

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [phone, setPhone] = useState(userInfo.phone);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [changeData, setChangeData] = useState(false);


  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePhoneChange(e) {
    setPhone(e.target.value);
  }
  function handleOldPasswordChange(e) {
    setOldPassword(e.target.value);
  }
  function handleNewPasswordChange(e) {
    setNewPassword(e.target.value);
  }

  function saveChanges() {
    setChangeData(false);
  }
  function savePassword() {
    setOpenDialog(true);
    setOldPassword("");
    setNewPassword("");
  }

  const [openDialog, setOpenDialog] = useState(false);
  const [modal, setModal] = useState(0);
  const [currentOrder, setCurrentOrder] = useState("");
  

  

  const dialogBody = (
    <div className="p-10 flex flex-col items-center">
      <FontAwesomeIcon
        className="text-5xl mb-8 text-green-400"
        icon={faCheck}
      />
      <div>Вы успешно сохранили пароль</div>
    </div>
  );
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
          <div  className="text-center">Количество</div>
          <div  className="text-center">Общая сумма</div>
        </div>
        {currentOrder!==""&& currentOrder.order.map(el=>
        <div className="grid grid-cols-4 border-b-2 mt-2 pb-2 items-center">
          <div>{el.product.name}</div>
          <div className="text-center">{el.product.price}</div>
          <div className="text-center">{el.units}</div>
          <div className="text-center">{el.product.price * el.units}</div>
        </div>

        )}
        <div className="text-right font-semibold mt-6">Итого к оплате: {currentOrder.order.reduce((a, b) => (a = a + b.product.price * b.units), 0)}</div>
      </div>
    </div>
  )
    const showModal = (i, e) => {
      setModal(i);
      setCurrentOrder(e);
    }
  

  useEffect(() => {
    setTimeout(() => {
      setOpenDialog(false);
    }, 2500);
  }, [openDialog]);

  const dispatch = useDispatch();
if(orderStatus===1){
  dispatch(changeOrderStatus({status:-1}));
}
  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="bg-primary py-40 h-screen">
      <div className="flex items-start">
        <div className=" mt-24 ml-20 pr-20 grid gap-8 border-black border-r-2">
          {sections.map((name) => (
            <button
              className={
                activeSection === name
                  ? "shop-filter-active shop-left-filter"
                  : "shop-left-filter hover:bg-black hover:text-white transform ease-in-out duration-200 py-1 rounded-3xl"
              }
              onClick={() => setActiveSection(name)}
            >
              {name}
            </button>
          ))}
          <button
            onClick={() => dispatch(logout())}
            className="hover:bg-black hover:text-white transform ease-in-out duration-200 py-1 rounded-3xl"
          >
            Выйти
          </button>
        </div>

        {activeSection === "Профиль" && (
          <div className="ml-20">
            <div className="text-3xl mb-16">Мой профиль</div>
            <div>
              <div className="text-xl mb-8">
                <label>Имя: </label>
                <input
                  type="text"
                  onChange={handleNameChange}
                  value={name}
                  readOnly={!changeData}
                  className="bg-white py-2 px-4 rounded-full ring-1 ring-gray-400 focus:ring-2 focus:ring-purple-500 transition duration-500 ease-in-out focus:outline-none ml-6"
                />
              </div>
              <div className="text-xl mb-8">
                <label>Email: </label>
                <input
                  type="text"
                  onChange={handleEmailChange}
                  readOnly={!changeData}
                  value={email}
                  className="bg-white py-2 px-4 rounded-full ring-1 ring-gray-400 focus:ring-2 focus:ring-purple-500 transition duration-500 ease-in-out focus:outline-none ml-6"
                />
              </div>
              <div className="text-xl mb-8">
                <label>Номер телефона: </label>
                <input
                  type="text"
                  onChange={handlePhoneChange}
                  readOnly={!changeData}
                  value={phone}
                  className="bg-white py-2 px-4 rounded-full ring-1 ring-gray-400 focus:ring-2 focus:ring-purple-500 transition duration-500 ease-in-out focus:outline-none ml-6"
                />
              </div>
              {!changeData && (
                <button
                  onClick={() => setChangeData(true)}
                  className="button btn-primary rounded-2xl focus:outline-none"
                >
                  Изменить данные
                </button>
              )}
              {changeData && (
                <button
                  onClick={saveChanges}
                  className="button btn-primary rounded-2xl focus:outline-none"
                >
                  Сохранить
                </button>
              )}
            </div>
          </div>
        )}
        {activeSection === "Сменить пароль" && (
          <div className="ml-20">
            <div className="text-3xl mb-16">Сменить пароль</div>
            <div>
              <div className="text-xl mb-8">
                <label>Старый пароль: </label>
                <input
                  type="password"
                  onChange={handleOldPasswordChange}
                  value={oldPassword}
                  className="bg-white py-2 px-4 rounded-full ring-1 ring-gray-400 focus:ring-2 focus:ring-purple-500 transition duration-500 ease-in-out focus:outline-none ml-6"
                />
              </div>
              <div className="text-xl mb-8">
                <label>Новый пароль: </label>
                <input
                  type="password"
                  onChange={handleNewPasswordChange}
                  value={newPassword}
                  className="bg-white py-2 px-4 rounded-full ring-1 ring-gray-400 focus:ring-2 focus:ring-purple-500 transition duration-500 ease-in-out focus:outline-none ml-8"
                />
              </div>
              <button
                onClick={savePassword}
                className="button btn-primary rounded-2xl focus:outline-none"
              >
                Сохранить
              </button>
              <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                {dialogBody}
              </Dialog>
            </div>
          </div>
        )}
        {activeSection === "Мои заказы" && (
          <div className="ml-20">
            <div className="text-3xl mb-16">Мои заказы</div>
            <div className="overflow-y-scroll h-600 px-5">
              <div className="grid grid-cols-4 mb-8 text-center">
                <div className="text-xl">
                  Номер заказа
                </div>
                <div className="text-xl">Тип оплаты</div>
                <div className="text-xl">Статус</div>
              </div>
            {order&&order.map( (e, index)=>(  
              <div className="grid grid-cols-4 items-center text-center">
                <div >{index+1}</div>
                <div>{e.method}</div>
                <div>{e.status?"Выполнен":"Не выполнен"}</div>
                <button onClick={()=>showModal(index+1, e)} className="btn-primary rounded-3xl my-2 w-300">Просмотреть заказ</button>
                <Modal
                  open={modal===index+1}
                  onClose={()=>setModal(false)}>
                 {modalBody}
                </Modal>
              </div>
              
            ))}
              </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
