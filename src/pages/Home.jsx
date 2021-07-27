import React from "react";
import {
  Button,
  ProductCarousel,
  SignForm,
  ProcedureCard,
} from "../components";
import meerim from "../assets/home-meerim.png";

import imgForm from "../assets/mainPageForm.jpg";
import pr1 from "../assets/procedure-1.png";
import pr2 from "../assets/procedure-2.png";
import pr3 from "../assets/procedure-3.png";
import pr4 from "../assets/procedure-4.png";
import pr5 from "../assets/procedure-5.png";
import pr6 from "../assets/procedure-6.png";

function Home() {
  return (
    <div className="bg-primary pt-32 sm:pt-20 home">
      <div className="md:flex-col flex items-center justify-center ">
        <img className="w-1/6.5 mr-32 lg:mr-0 lg:mb-4 lg:mt-10 lg:w-3/5" src={meerim} alt="" />
        <div>
          <div className="text-5xl mb-8 font-bold sm:text-3xl text-center sm:w-full ">MD Clinic Professional</div>
          <div className="text-2xl sm:text-xl lg:w-full sm:px-2 mb-12 w-500px text-center">
            Клиника косметологии и образования Мээрим Давлетовой
          </div>
          <div className="lg:flex-col lg:items-center flex mb-24 items-baseline px-4">
            <Button name="Записаться на прием" primary />
            <div className="lg:ml-0 lg:mt-5 lg:text-base home__right-bottom-detail ml-16 text-2xl underline cursor-pointer">
              Подробнее
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-secondary flex py-24 items-center flex-col ">
        <p className="text-4xl mb-24 text-center">Популярные процедуры</p>
        <div className="grid grid-cols-3  sm:grid-cols-1">
          <ProcedureCard img={pr1} text="Отбеливание" />
          <ProcedureCard img={pr2} text="Лечение угревой болезни" />
          <ProcedureCard img={pr3} text="Омоложение" />
          <ProcedureCard img={pr4} text="Лечение выпадающих волос" />
          <ProcedureCard img={pr5} text="Похудение" />
          <ProcedureCard img={pr6} text="Эпиляция" />
        </div>
      </div>
      <div className="bg-light-grey py-24 flex flex-col items-center ">
        <p className="text-center text-4xl mb-24">Продукция</p>
        <ProductCarousel />
      </div>
      <div className="py-24 flex justify-center">
        <SignForm img={imgForm} name="Записаться на прием" />
      </div>
    </div>
  );
}

export default Home;