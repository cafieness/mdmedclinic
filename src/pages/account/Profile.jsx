import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../redux/user";

import { products } from "../../db";


function Profile() {
  const [activeSection, setActiveSection] = useState("Профиль");
  const sections = ["Профиль", "Сменить пароль", "Мои заказы"];
  const isLoggedIn = useSelector((state) => (state.user.user ? true : false));
  const userInfo = useSelector((state) =>
    state.user.user ? state.user.user : false
  );
  const cart  = useSelector(state => state.cart.cart ? state.cart.cart : false);

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

  const dialogBody = (
    <div className="p-10 flex flex-col items-center">
      <FontAwesomeIcon
        className="text-5xl mb-8 text-green-400"
        icon={faCheck}
      />
      <div>Вы успешно сохранили пароль</div>
    </div>
  );

  useEffect(() => {
    setTimeout(() => {
      setOpenDialog(false);
    }, 2500);
  }, [openDialog]);

  const dispatch = useDispatch();

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
            <div className="overflow-y-scroll h-600 w-1000">
            {cart&&cart.map( el=>(
              
              <div className="orders-grid border-b-2 border-black py-2 justify-start">
                <img src={el.product.image} alt="" />
                <div className="justify-self-start">
                  <div className="text-xl mb-2">{el.product.name}</div>
                  <div>{el.product.volume}</div>
                  <div className="italic bold text-3xl mt-8">{el.product.price}</div>
                </div> 
                <div className="flex flex-col items-center">
                  <div className="text-2xl mb-1">Количество</div>
                  <div className="italic text-3xl">{el.units}</div>
                </div>
                <div className="justify-self-end mr-3">
                  <div className="text-2xl text-right">Дата заказа</div>
                  <div className="text-3xl">1 июля, 2020</div>
                </div>
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
