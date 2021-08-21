import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../redux/user";
import { ProfileData, PasswordChange, Orders} from '../../components';

function Profile() {
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState("Профиль");
  const sections = ["Профиль", "Сменить пароль", "Мои заказы"];
  const isLoggedIn = useSelector((state) => (state.user.user ? true : false));

  

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
          <ProfileData />
           )}
        {activeSection === "Сменить пароль" && (
          <PasswordChange /> 
          )}
        {activeSection === "Мои заказы" && (
          <Orders />
           )}
      </div>
    </div>
  );
}

export default Profile;
