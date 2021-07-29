import React from "react";
import SignForm from "../components/common/SignForm";

import imgForm from "../assets/mainPageForm.jpg";

function Contacts() {
  return (
    <div className="bg-primary pt-40 sm:pt-28  ">
      <div className="py-16 flex flex-col items-center">
        <div className="mb-16">
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
<div>Воскресенье: выходной</div>

        </div>

        <SignForm img={imgForm} name="Записаться на прием" />
      </div>
    </div>
  );
}

export default Contacts;
