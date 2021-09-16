import React from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/logo.png";
import whatsapp from "../../assets/whatsapp.png";
import facebook from "../../assets/facebook.png";
import intstagram from "../../assets/instagram.png";

function Footer() {
  const loc = useLocation();
  const isEng = loc.search === "?lang=en";
  return (
    <div className="bg-primary">
      <hr className="w-full border-t-2 border-black border-solid" />
      <div className="py-6 flex mdh:mx-8 lgh:mx-16 mdh:space-x-6 space-y-2 mdh:space-y-0 justify-center flex-col mx-4 mdh:flex-row ">
        <div className="flex-1 flex flex-col items-center md:mb-4">
          <img src={logo} alt="" className="mb-4" />
          <div className="flex">
            <a
              target="_blank"
              href="https://www.instagram.com/kosmetolog_davletova/?hl=en"
              rel="noreferrer"
            >
              <img src={intstagram} alt="" className="h-8 mr-4" />
            </a>
            <a
              target="_blank"
              href="https://wa.me/996707600726"
              rel="noreferrer"
            >
              <img src={whatsapp} alt="" className="h-8 mr-4" />
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/page.meerim.davletova/"
              rel="noreferrer"
            >
              <img src={facebook} alt="" className="h-8" />
            </a>
          </div>
        </div>
        <div className="flex-1 flex flex-col space-y-2 mdh:space-y-4">
          <p className="font-bold text-2xl mb-2 mdh:mb-3">
            {isEng ? "Contacts" : "Контакты"}
          </p>
          <div>
            {isEng ? "Phone" : "Телефон"}:{" "}
            <a href="tel:+996556877782">+996 556 877 782</a>, <br />
            <a href="tel:+996707600726">+996 707 600 726</a>
          </div>
          <a href="mailto:mdmedclinic.service@gmail.com" className="block">
            {isEng ? "Email" : "Почта"}: mdmedclinic@gmail.com
          </a>
          <p>
            {isEng
              ? "Address: Moskovskaya st., 191"
              : "Адрес: ул. Московская,191"}
          </p>
        </div>
        <div className="flex-1 flex flex-col space-y-2 mdh:space-y-4">
          <p className="font-bold text-2xl mb-2 mdh:mb-3">
            {isEng ? "Procedures" : "Процедуры"}
          </p>
          <Link to="/procedure/inject">
            {isEng ? "Injection procedures" : "Инъекционные процедуры"}
          </Link>
          <Link to="/procedure/skincare">
            {isEng ? "Skincare" : "Уход за кожей"}
          </Link>
          <Link to="/procedure/apparat">
            {isEng ? "Hardware cosmetology" : "Аппаратная косметология"}
          </Link>
        </div>
        <div className="flex-1 flex flex-col space-y-2 mdh:space-y-4">
          <p className="font-bold text-2xl mb-2 mdh:mb-3">
            {isEng ? "About us" : "О нас"}
          </p>
          <Link to="/about">{isEng ? "About us" : "О нас"}</Link>
          <Link to="/education">{isEng ? "Education" : "Обучение"}</Link>
          <Link to="/gallery">{isEng ? "Gallery" : "Галерея"}</Link>
        </div>
      </div>
      <hr className="w-full border-t-1 border-black border-solid" />
      <div className="flex justify-evenly md:flex-col text-gray-500 text-xs">
        <div className="md:mb-1">All rights reserved by MD Clinic, 2021</div>
        <a className="block" href="mailto:talkanbaev.artur@outlook.com">
          Developers: Camila Choroeva, Arthur Talkanbaev
        </a>
      </div>
    </div>
  );
}

export default Footer;
