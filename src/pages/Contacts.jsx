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
          <div>г. Бишкек, ул. Уметалиева, 81</div>
        </div>

        <div className="flex">
          <div className="font-bold">Телефон:⠀</div>
          <div>8-800-555-35-35</div>
        </div>
        <div className="flex">
          <div className="font-bold mb-8">Email:⠀⠀ ⠀</div>
          <div>mdmedclinic@gmail.com</div>
        </div>

        <div className="font-bold text-2xl mb-4">График работы</div>

        <div>Понедельник-суббота: 9:00-18:00</div>
        <div className="mb-16">Воскресенье: выходной</div>

        <SignForm img={imgForm} name="Записаться на прием" contacts />
      </div>
    </div>
  );
}

export default Contacts;
