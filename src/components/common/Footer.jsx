import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import whatsapp from "../../assets/whatsapp.png";
import facebook from "../../assets/facebook.png";
import intstagram from "../../assets/instagram.png";

function Footer() {
  return (
    <div className="bg-primary">
      <hr className="w-full border-t-2 border-black border-solid" />
      <div className="py-6 flex space-x-10  mx-auto justify-center md:flex-col md:items-center">
        <div className="flex flex-col items-center md:mb-8">
          <img src={logo} alt="" className="mb-4" />
          <div className="flex">
            <Link target="_blank" to="https://www.instagram.com/kosmetolog_davletova/?hl=en">
              <img src={intstagram} alt="" className="h-8 mr-4" />
            </Link>
            <Link target="_blank" to="">
              <img src={whatsapp} alt="" className="h-8 mr-4" />
            </Link>
            <Link target="_blank" to="https://www.facebook.com/page.meerim.davletova/">
              <img src={facebook} alt="" className="h-8" />
            </Link>
          </div>
        </div>
        <div >
          <p className="font-bold text-2xl mb-8">Контакты</p>
          <p className="mb-4">Телефон: 8-800-555-35-35</p>
          <p className="mb-4">Почта: mdclinic@gmail.com</p>
          <p className="mb-4">Адрес: ул. Уметалиева, 81</p>
        </div>
        <div >
          <p className="font-bold text-2xl mb-8">Процедуры</p>
          <div className="flex flex-col">
            <Link to="/procedure/inject" className="mb-4">
              Инъекционные процедуры
            </Link>
            <Link to="/procedure/skincare" className="mb-4">
              Уход за кожей
            </Link>
            <Link to="/procedure/apparat">Аппаратная косметология</Link>
          </div>
        </div>
        <div >
          <p className="font-bold text-2xl mb-8">О нас</p>
          <div className="flex flex-col">
            <Link to="/about" className="mb-4">
              О нас⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
            </Link>
            <Link to="/education" className="mb-4">
              Обучение
            </Link>
            <Link to="/gallery">Галерея</Link>
          </div>
        </div>
      </div>
      <hr className="w-full border-t-2 border-black border-solid"/>
      <div className="flex justify-evenly md:flex-col md:items-center">
        <div className="md:mb-2">All rights reserved by MD Clinic, 2021</div>
        <div>Developers: Camila Choroeva, Arthur Talkanbaev</div>
      </div>
    </div>
  );
}

export default Footer;
