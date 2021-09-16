import React from "react";
import {
  Button,
  ProductCarousel,
  SignForm,
  ProcedureCard,
} from "../components";
import { Link, useLocation } from "react-router-dom";
import Scroll from "react-scroll";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import meerim from "../assets/meerim.png";
import back_2 from "../assets/home-meerim.png";

import imgForm from "../assets/mainPageForm.jpg";
import pr1 from "../assets/procedure-1.png";
import pr2 from "../assets/procedure-2.png";
import pr3 from "../assets/procedure-3.png";
import pr4 from "../assets/procedure-4.png";
import pr5 from "../assets/procedure-5.png";
import pr6 from "../assets/procedure-6.png";
import { procedures } from "../db";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faChevronCircleDown,
} from "@fortawesome/free-solid-svg-icons";

const ScrollLink = Scroll.Link;

function Home() {
  const loc = useLocation();
  const isEng = loc.search === "?lang=en";

  const procs = [
    procedures.apparat[2],
    procedures.skincare[1],
    procedures.apparat[3],
    procedures.inject[6],
    procedures.apparat[4],
    procedures.apparat[5],
  ];

  return (
    <div className="bg-primary">
      <div className="md:flex-col flex items-center justify-center pt-32 sm:pt-20 home">
        <img
          className="home-main-image mr-32 lg:mr-0 lg:mb-4 lg:mt-10"
          src={meerim}
          alt=""
        />
        <div className="sm:w-320">
          <div className="text-5xl mb-8 font-bold sm:text-3xl text-center sm:w-full ">
            MD Clinic Professional
          </div>
          <div className="text-2xl sm:text-xl lg:w-full sm:px-2 mb-6 w-500px text-center">
            {isEng
              ? "Cosmetology and Education Clinic of Meerim Davletova"
              : "Клиника косметологии и образования Мээрим Давлетовой"}
          </div>
          <div className="lg:flex-col lg:items-center space-x-0 lgh:space-x-10 space-y-4 lgh:space-y-0 flex mb-24 items-baseline px-4">
            <ScrollLink
              to="procs"
              className="lgh:order-3 lgh:ml-4"
              spy={true}
              smooth={true}
              duration={500}
            >
              <button className="h-10 w-10 border-2 flex items-center  border-gray-900 bg-transparent rounded-full">
                <FontAwesomeIcon
                  className="text-2xl mx-auto"
                  icon={faAngleDown}
                ></FontAwesomeIcon>
              </button>
            </ScrollLink>
            <ScrollLink
              to="home-sign-form"
              spy={true}
              smooth={true}
              duration={500}
            >
              <Button
                name={isEng ? "Make an appointment" : "Записаться на прием"}
                primary
              />
            </ScrollLink>

            <div className="lg:text-base home__right-bottom-detail  text-2xl underline cursor-pointer">
              <Link to="/about">{isEng ? "Details" : "Подробнее"}</Link>
            </div>
          </div>
        </div>
      </div>
      <div
        id="procs"
        className=" bg-secondary flex py-4 mdh:py-8 items-center flex-col "
      >
        <h2 className="text-3xl font-semibold text-gray-900 mb-4 text-center">
          {isEng ? "Popular procedures" : "Популярные процедуры"}
        </h2>
        <p className="text-sm text-center text-gray-700 mb-3 px-4 mdh:mb-6 lgh:mb-10 mdh:w-1/2">
          {isEng
            ? "Our clinic provides many services to treat all kind of problems."
            : "Наша клиника предоставляет широкий спектр процедур для решения всех видов проблем."}
        </p>
        <div className="mx-4 mdh:mx-10 lgh:w-[70%] lgh:gap-3 lgh:mx-auto grid lgh:grid-cols-3 gap-2 grid-cols-1 mdh:grid-cols-2">
          {procs.map((el) => (
            <Link to={"/procedure/" + el.title} key={el.title}>
              <ProcedureCard
                img={el.img}
                text={isEng ? el.eng_title : el.title}
                desc={el.description1}
              ></ProcedureCard>
            </Link>
          ))}
        </div>
      </div>
      <div className="pt-8 mdh:py-10 mdh:px-4 flex flex-col items-center ">
        <p className="text-center text-3xl mb-4 font-semibold text-gray-900">
          {isEng ? "Products" : "Наша продукция"}
        </p>
        <p className="text-sm text-center text-gray-700 mb-3 px-4 mdh:mb-6 lgh:mb-10 mdh:w-1/2">
          {isEng
            ? "Meerim Davletova's Clinic is the only certified distributor of Eldan cometics products in Kyrgyzstan. You can order cosmetics on our website and get your order in our clinic."
            : "Клиника Мээрим Давлетовой - это экслюзивный поставщик косметики фирмы Eldan в Кыргызстане. В можете приобрести косметические препараты в нашем магазине и получить их в нашем филиале."}
        </p>
        <ProductCarousel />
      </div>
      <div id="home-sign-form" className="py-8 flex mdh:px-4">
        <SignForm img={imgForm} title="Записаться на прием" />
      </div>
      <YMaps>
        <div>
          <h4 className="text-3xl font-semibold my-4 text-center text-gray-900">
            {isEng ? "Our Clinic" : "Наш филиал"}
          </h4>
          <p className="text-sm text-center text-gray-700 mb-3 px-4 mdh:mb-6 lgh:mb-10">
            {isEng
              ? "Visit our center and get an amazing experience!"
              : "Посетите наш филиал и получите незабываемый опыт"}
          </p>
          <Map
            width={"99vw"}
            height={"50vh"}
            defaultState={{
              center: [42.871052, 74.582214],
              zoom: 17,
              controls: ["zoomControl", "fullscreenControl"],
            }}
            modules={["control.ZoomControl", "control.FullscreenControl"]}
          >
            <Placemark
              defaultGeometry={[42.871052, 74.582214]}
              options={{ preset: "islands#circleIcon" }}
              properties={{ iconCaption: "Клиника Мээрим Давлетовой" }}
            />
          </Map>
        </div>
      </YMaps>
    </div>
  );
}

export default Home;
