import React from "react";
import SignForm from "../components/common/SignForm";

import imgForm from "../assets/mainPageForm.jpg";

function Contacts() {
  return (
    <div className="bg-primary py-40 sm:py-20">
      <div className="mx-auto px-40 md:px-4">
        <div className="font-bold text-3xl mb-8">Контакты</div>

        <div className="flex">
          <div className="font-bold">Адрес:⠀⠀⠀</div>
          <div>г. Бишкек, ул. Московская, 191</div>
        </div>

        <div className="flex">
          <div className="font-bold">Телефон:⠀</div>
          <div>
            <a href="tel:+996556877782">+996 556 877 782,</a> <br />
            <a href="tel:+996707600726">+996 707 600 726</a>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="font-bold mb-8">Email:⠀⠀ </div>
          <a href="mailto:mdmedclinic@gmail.com">mdmedclinic@gmail.com</a>
        </div>

        <div className="font-bold text-2xl mb-4">График работы</div>

        <div>Понедельник-воскресенье: 10:00-22:00</div>
        <div className="mb-16"></div>

        <SignForm img={imgForm} title="Записаться на прием" contacts />
      </div>
    </div>
  );
}

export default Contacts;
