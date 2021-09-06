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
      <div className="py-6 flex space-x-10  mx-auto justify-center md:flex-col md:items-center">
        <div className="flex flex-col items-center md:mb-8">
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
        <div>
          <p className="font-bold text-2xl mb-8">
            {isEng ? "Contacts" : "Контакты"}
          </p>
          <a href="tel:+996556877782" className="mb-4 block">
            {isEng ? "Phone" : "Телефон"}: +996 556 877 782, <br />
            +996 707 600 726
          </a>
          <a href="email:mdclinic.service@gmail.com" className="mb-4 block">
            {isEng ? "Email" : "Почта"}: mdclinic.service@gmail.com
          </a>
          <p className="mb-4">
            {isEng
              ? "Address: Moskovskaya st., 191"
              : "Адрес: ул. Московская,191"}
          </p>
          <p className="mb-4">Адрес: ул. Московская, 191</p>
        </div>
        <div>
          <p className="font-bold text-2xl mb-8">
            {isEng ? "Procedures ⠀⠀⠀⠀⠀⠀" : "Процедуры ⠀⠀⠀⠀⠀⠀"}
          </p>
          <div className="flex flex-col">
            <Link to="/procedure/inject" className="mb-4">
              {isEng ? "Injection procedures" : "Инъекционные процедуры"}
            </Link>
            <Link to="/procedure/skincare" className="mb-4">
              {isEng ? "Skincare" : "Уход за кожей"}
            </Link>
            <Link to="/procedure/apparat">
              {isEng ? "Hardware cosmetology" : "Аппаратная косметология"}
            </Link>
          </div>
        </div>
        <div>
          <p className="font-bold text-2xl mb-8">
            {isEng ? "About us" : "О нас"}
          </p>
          <div className="flex flex-col">
            <Link to="/about" className="mb-4">
              {isEng ? "About us⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀" : "О нас⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"}
            </Link>
            <Link to="/education" className="mb-4">
              {isEng ? "Education" : "Обучение"}
            </Link>
            <Link to="/gallery">{isEng ? "Gallery" : "Галерея"}</Link>
          </div>
        </div>
      </div>
      <hr className="w-full border-t-2 border-black border-solid" />
      <div className="flex justify-evenly md:flex-col">
        <div className="md:mb-2">All rights reserved by MD Clinic, 2021</div>
        <div>Developers: Camila Choroeva, Arthur Talkanbaev</div>
      </div>
    </div>
  );
}

export default Footer;
