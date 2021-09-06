import React from "react";
import SignForm from "../components/common/SignForm";

import imgForm from "../assets/mainPageForm.jpg";

function Contacts() {
  return (
    <div className="bg-primary py-40 sm:py-28">
      <div className="mx-auto px-40 md:px-5 contacts-px">
        <div className="font-bold text-3xl mb-8">Контакты</div>

        <div className="flex">
          <div className="font-bold">Адрес:⠀⠀⠀</div>
          <div>г. Бишкек, ул. Московская, 191</div>
        </div>

        <div className="flex">
          <div className="font-bold">Телефон:⠀</div>
          <div>+996 707 600 726</div>
        </div>
        <div className="flex">
          <div className="font-bold mb-8">Email:⠀⠀ ⠀</div>
          <div>mdmedclinic@gmail.com</div>
        </div>

        <div className="font-bold text-2xl mb-4">График работы</div>

        <div>Понедельник-воскресенье: 8:00-21:00</div>
        <div className="mb-16"></div>

        <SignForm img={imgForm} title="Записаться на прием" contacts />
      </div>
    </div>
  );
}

export default Contacts;
