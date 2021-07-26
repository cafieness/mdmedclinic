import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [isToggle, setIsToggle] = useState(false);
  return (
      <nav class="nav flex  items-center justify-between py-4 z-50 fixed bg-white w-full px-5 ">
        <img src={logo} className="hidden sm:inline-block sm:w-1/5" alt="" />
        <div
          className={
            isToggle
              ? " active nav-menu transition duration-300 ease-in-out w-full "
              : "nav-menu top-5 flex w-full items-center"
          }
        >
          <div className=" dropdown">
            <button className="dropbtn" for="btnControl">
              О нас
            </button>
            <div className="dropdown-content dc1">
              <Link to="/about">О нас</Link>
              <Link to="/education">Обучение</Link>
              <Link to="/contacts">Контакты</Link>
            </div>
          </div>

          <div className=" dropdown">
            <button className="dropbtn" for="btnControl">
              Процедуры
            </button>
            <div className="dropdown-content dc2">
              <Link to="/procedure/inject">Инъекционные процедуры</Link>
              <Link to="/procedure/skincare">Уход за кожей</Link>
              <Link to="/procedure/apparat">Аппаратная косметология</Link>
            </div>
          </div>
          <Link to="/gallery" className="nav-link">
            Галерея
          </Link>
          <Link to="/">
            <img className="mx-0 sm:hidden " src={logo} alt="" />
          </Link>
          <Link to="/catalogue" className="nav-link ">
            Продукция
          </Link>
          <Link to="/blog" className="nav-link">
            Блог
          </Link>
          <Link to="/entrance" className="nav-link">
            Войти
          </Link>
          <Link to="/account" className="nav-link">
            <FontAwesomeIcon className="text-2xl" icon={faUser} />
          </Link>
          <Link to="/cart" className="nav-link">
            <FontAwesomeIcon className="text-2xl" icon={faShoppingCart} />
          </Link>
        </div>

        <button
          onClick={() => setIsToggle(!isToggle)}
          className={isToggle ? "hamburger active" : "hamburger"}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </nav>
  );
}

export default Header;
