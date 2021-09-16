import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../redux/user";
import { ProfileData, PasswordChange, Orders } from "../../components";

function Profile() {
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState("Профиль");
  const sections = ["Профиль", "Сменить пароль", "Мои заказы"];

  return (
    <div className="bg-primary pt-10 mdh:pt-40 min-h-[100vh] min-w-[100vw]">
      <div className="flex flex-col mdh:flex-row items-start">
        <div className="mx-auto mdh:mx-0 mdh:ml-8 mt-16 mdh:mt-24 grid gap-4 mdh:gap-6 lgh:gap-8 mdh:pr-4 border-black mdh:border-r-2">
          {sections.map((name) => (
            <button
              className={
                activeSection === name
                  ? "shop-filter-active shop-left-filter"
                  : "shop-left-filter hover:bg-black hover:text-white transform ease-in-out duration-200 py-1 rounded-3xl focus:outline-none"
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

        {activeSection === "Профиль" && <ProfileData />}
        {activeSection === "Сменить пароль" && <PasswordChange />}
        {activeSection === "Мои заказы" && <Orders />}
      </div>
    </div>
  );
}

export default Profile;
