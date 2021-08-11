import React from "react";
import meerim from "../assets/education/meerim.png";
import program from "../assets/education/program.png";
import formpic from "../assets/education/form.jpg";
import { SignForm } from "../components";
import Scroll from "react-scroll";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";


const ScrollLink = Scroll.Link;

function Education() {
  return (
    <div className="">
      <div className="education-bg py-40 h-screen flex items-center ">
        <div className="w-4/5 sm:w-full sm:ml-3 mx-auto flex justify-between md:justify-center">
          <div>
            <div className="text-4xl mb-10">Курс косметолога</div>
            <div className="w-450 sm:w-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.{" "}
            </div>
            <div className="text-white hidden md:block mt-8">
              <div className="text-2xl">Длительность:</div>
              <div className=" font-bold my-2">20 занятий</div>
              <div className="text-2xl">Стоимость:</div>
              <div className="font-bold my-2">300$</div>
            </div>
            <ScrollLink
              to="education-sign-form"
              spy={true}
              smooth={true}
              duration={500}
            >
            <button className="btn-primary rounded-3xl mt-10 sm:w-300 w-450">
              Записаться на обучение
            </button>
            </ScrollLink>
          </div>
          <div className="text-white md:hidden">
            <div className="text-4xl">Длительность:</div>
            <div className="text-3xl font-bold my-4">20 занятий</div>
            <div className="text-4xl">Стоимость:</div>
            <div className="text-3xl font-bold my-4">300$</div>
          </div>
        </div>
      </div>
      <div className="bg-about py-40 flex flex-col items-center">
        <div className="text-5xl mb-24 lg:text-3xl">Преподаватель</div>
        <div className="flex md:flex-col justify-between w-3/5 xl:w-4/5  mx-auto items-center">
          <img src={meerim} alt="" />
          <div className="bg-white w-500px sm:w-300 p-10 rounded-t-3xl ml-20 md:mt-16 md:ml-0">
            <div className="text-2xl mb-8">Мээрим Давлетова</div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur.
            </div>
          </div>
        </div>
      </div>
      <div className="bg-ed-3 py-20 flex flex-col items-center">
        <div className="text-5xl mb-24 lg:text-3xl text-center sm:mx-2">
          Что ожидать от обучения
        </div>
        <div className="grid grid-cols-4 w-3/5 sm-grid-cols-1 xl:w-4/5 mx-auto gap-16 md:grid-cols-2">
          <div className="flex flex-col items-center">
            <FontAwesomeIcon
              className="text-pink-500 ed-exp-text"
              icon={faGraduationCap}
            />
            <div className="mb-4 text-xl">Lorem ipsum</div>
            <div className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
          <div className="flex flex-col items-center">
            <FontAwesomeIcon
              className="text-pink-500 ed-exp-text"
              icon={faGraduationCap}
            />
            <div className="mb-4 text-xl">Lorem ipsum</div>
            <div className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
          <div className="flex flex-col items-center">
            <FontAwesomeIcon
              className="text-pink-500 ed-exp-text"
              icon={faGraduationCap}
            />
            <div className="mb-4 text-xl">Lorem ipsum</div>
            <div className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
          <div className="flex flex-col items-center">
            <FontAwesomeIcon
              className="text-pink-500 ed-exp-text"
              icon={faGraduationCap}
            />
            <div className="mb-4 text-xl">Lorem ipsum</div>
            <div className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
        </div>
      </div>
      <div className="py-36 bg-primary flex flex-col items-center">
        <div className="text-5xl mb-20 lg:text-3xl sm:text-center mx-2">
          Индивидуальная программа обучения
        </div>
        <div className="flex w-3/5  xl:w-4/5 mx-auto justify-between items-center lg:flex-col">
          <div className="lg:order-2">
            <div className="bg-white p-5 w-450 sm:w-300 text-center rounded-3xl mb-16">
              <div className="mb-4 text-2xl">Индивидуальный подход</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
              </div>
            </div>
            <div className="bg-white p-5 w-450 sm:w-300 text-center rounded-3xl mb-16">
              <div className="mb-4 text-2xl">Индивидуальный подход</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
              </div>
            </div>
            <div className="bg-white p-5 w-450 sm:w-300 text-center rounded-3xl">
              <div className="mb-4 text-2xl">Индивидуальный подход</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
              </div>
            </div>
          </div>
          <img
            src={program}
            className="w-450 h-full ml-20 lg:ml-0 lg:mb-16 md:w-300"
            alt=""
          />
        </div>
      </div>
      <div id="education-sign-form" className="py-20 bg-primary flex flex-col items-center">
        <SignForm name="Записаться на обучение" img={formpic} />
      </div>
    </div>
  );
}

export default Education;
