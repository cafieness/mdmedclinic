import React from "react";
import meerimCircle from "../assets/about/meerim-circle.png";
import choose1 from "../assets/about/choose-1.png";
import choose2 from "../assets/about/choose-2.svg";
import choose3 from "../assets/about/choose-3.svg";
import { Feedback } from "../components";
import Carousel from "react-multi-carousel";

import c1 from "../assets/about/certificates/1-min.jpg";
import c2 from "../assets/about/certificates/2-min.jpg";
import c3 from "../assets/about/certificates/3-min.jpg";
import c4 from "../assets/about/certificates/4-min.jpg";
import c5 from "../assets/about/certificates/5-min.jpg";
import c6 from "../assets/about/certificates/6-min.jpg";
import c7 from "../assets/about/certificates/7-min.jpg";
import c8 from "../assets/about/certificates/8-min.jpg";
import c9 from "../assets/about/certificates/9-min.jpg";
import c10 from "../assets/about/certificates/10-min.jpg";
import c11 from "../assets/about/certificates/11-min.jpg";
import c12 from "../assets/about/certificates/12-min.jpg";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function Certificates() {
  const images = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12];
  return (
    <Carousel responsive={responsive} className="mx-auto w-3/5">
      {images.map((image) => (
        <div className="flex items-center h-[500px]">
          <img className="mx-auto px-1 self-center" src={image} alt="" />
        </div>
      ))}
    </Carousel>
  );
}

function About() {
  return (
    <div className="bg-about pt-40 sm:pt-10">
      <div className="lg:flex-col flex justify-center items-center py-20">
        <img
          src={meerimCircle}
          className="mr-20 lg:mr-0 lg:mb-10 sm:w-3/5"
          alt=""
        />
        <div className="w-1/3 lg:w-4/5">
          <div className="text-3xl mb-4 md:text-xl">
            Клиника эстетической медицины Мээрим Давлетовой
          </div>
          <hr className="mb-4 w-full  border-t-2 border-gray-600 border-solid" />
          <div className="text-xl md:text-base mb-10">
            Мээрим Давлетова - косметолог с медицинским образованием, эксперт
            инъекционной и аппаратной косметологии, контурной пластике,
            мезонитям, а также специалист в области массажных техник по лицу.
          </div>
          <div className="text-xl md:text-base mb-10">
            За многие годы практики Мээрим помогла многим женщинам стать
            увереннее в своей красоте, открыла собственную клинику эстетической
            медицины в Бишкеке и основала блог о красоте в Инстаграм - здесь
            каждый найдет для себя профессиональные рекомендации и информацию о
            процедурах и препаратах.
          </div>
        </div>
      </div>
      <div className="bg-primary py-20 px-10">
        <div className="text-center text-4xl mb-24">Почему выбирают нас</div>
        <div className=" w-4/5 md:w-4/5 mx-auto flex justify-center md:flex-col md:items-center">
          <div className="flex flex-col mr-20 md:mr-0">
            <img src={choose3} alt="" className="w-2/5 mx-auto" />
            <div className="text-center text-xl mt-4 mb-4">
              Самое инновационное оборудование
            </div>
            <div className=" text-center mb-16 ">
              Клиника MD Clinic Professional оснащена современной аппаратурой
              для проведения косметических процедур
            </div>
          </div>
          <div className="flex flex-col  mr-20  md:mr-0 ">
            <img src={choose1} alt="" className="w-2/5 mx-auto" />
            <div className="text-center text-xl mt-4 mb-4">
              Квалифицированные специалисты
            </div>
            <div className=" text-center mb-16">
              В клинике работают врачи-косметологи высокого профессионального
              уровня с медицинским образованием
            </div>
          </div>
          <div className="flex flex-col ">
            <img src={choose2} alt="" className="w-2/5 mx-auto" />
            <div className="text-center text-xl mt-4 mb-4">
              Только то, что необходимо
            </div>
            <div className=" text-center mb-16">
              Мы рекомендуем только те процедуры, которые вам необходимы и
              никогда не посоветуем лишнего
            </div>
          </div>
        </div>
      </div>
      <div className="py-20 px-10 bg-white flex flex-col">
        <div className="text-center text-4xl mb-24">Дипломы и сертификаты</div>
        <Certificates />
      </div>
      <div className="py-20 bg-primary px-10">
        <div className="text-center text-4xl mb-24">Отзывы</div>
        <Feedback />
      </div>
    </div>
  );
}

export default About;
