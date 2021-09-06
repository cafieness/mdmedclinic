import React from "react";
import meerim from "../assets/education/meerim.png";
import aizada from "../assets/education/aizada.jpg";
import program from "../assets/education/program.png";
import formpic from "../assets/education/form.jpg";
import { SignForm } from "../components";
import Scroll from "react-scroll";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faCertificate,
  faAtom,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";

const ScrollLink = Scroll.Link;

function Education() {
  return (
    <div className="">
      <div className="education-bg py-40 min-h-[900px] h-screen flex items-center ">
        <div className="w-4/5 sm:w-full sm:ml-3 mx-auto flex justify-between md:justify-center">
          <div>
            <div className="text-4xl mb-10 sm:mb-4">
              Курс Косметолога Дерматолога
            </div>
            <div className="w-450 sm:w-300">
              Предназначена для Косметологов, кто хочет получить серьезную
              практической базу по косметологии с расширенным спектром процедур.
              Расширенный курс включает в себя инъекционную и аппаратную
              косметологию, где специалист познакомится с наивысшим уровнем
              индустрии. После чего, происходит закрепление полученных навыков с
              отдельным преподавателем, что позволит каждую тему проработать
              несколько раз.{" "}
            </div>
            <div className="text-gray-900 hidden md:block mt-4">
              <div className="text-2xl">Длительность:</div>
              <div className=" font-bold my-2">от 15 дней</div>
              <div className="text-2xl">Стоимость:</div>
              <div className="font-bold my-2">от 30000 сом</div>
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
            <div className="text-3xl font-bold my-4">от 15 дней</div>
            <div className="text-4xl">Стоимость:</div>
            <div className="text-3xl font-bold my-4">от 30000 сом</div>
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
              Главный врач и владелица одноименного “Центра Косметологии и
              Образования Мээрим Давлетовой”. Ей доверяют самые известные лица
              Кыргызстана и любят за то, что она одинаково успешно работает как
              иглой, так и новейшими аппаратами. В кабинете у Мээрим Давлетовой
              точно не надо бояться получить чего-то лишнего: по её пациентам
              сложно догадаться, что они часто бывают у косметолога. Ее обширный
              10-тилетний опыт подкрепленный знаниями с разных уголков мира,
              такие как Израиль, Корея и Германия, сейчас обеспечивают
              здоровьем, красотой и образованием тысячи Кыргызстанцев. Ее конек
              — естественный эффект и индивидуальный подход.
            </div>
          </div>
        </div>
      </div>
      <div className="education-bg-2 min-h-[900px] py-40 h-screen flex items-center ">
        <div className="w-4/5 sm:w-full sm:ml-3 mx-auto flex justify-between md:justify-center">
          <div>
            <div className="text-4xl mb-10">Курс Косметолога-эстетиста</div>
            <div className="w-450 sm:w-300">
              Предназначена для людей, желающих получить необходимые навыки для
              работы косметологом, а также уметь выполнять не только базовые
              операции, такие как маски, чистки, компрессы, но и выполнять
              комплексную 12-ти этапную чистку лица по Израильской Технологии.{" "}
            </div>
            <div className="text-gray-900 hidden md:block mt-8">
              <div className="text-2xl">Длительность:</div>
              <div className=" font-bold my-2">15 дней</div>
              <div className="text-2xl">Стоимость:</div>
              <div className="font-bold my-2">30000 сом</div>
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
          <div className=" md:hidden">
            <div className="text-4xl">Длительность:</div>
            <div className="text-3xl font-bold my-4">от 15 дней</div>
            <div className="text-4xl">Стоимость:</div>
            <div className="text-3xl font-bold my-4">от 30000 сом</div>
          </div>
        </div>
      </div>
      <div className="bg-about py-40 flex flex-col items-center">
        <div className="text-5xl mb-24 lg:text-3xl">Преподаватель</div>
        <div className="flex md:flex-col justify-between w-3/5 xl:w-4/5  mx-auto items-center">
          <img src={aizada} alt="" className="rounded-3xl" />
          <div className="bg-white w-500px sm:w-300 p-10 rounded-t-3xl ml-20 md:mt-16 md:ml-0">
            <div className="text-2xl mb-8">Айзада Давлетова</div>
            <div>
              Одна из бьюти-покровительниц Бишкека, растит уже второе поколение
              ухоженных красавиц и молодых людей. Пациенты стараются приходить к
              ней не в одиночку, передавая своих подрастающих детей в ее
              бережные руки. Руководящий врач “Центра Косметологии и Образования
              Мээрим Давлетовой” не только знает азы косметологии, но и блестяще
              использует свои коммуникативные и организаторские навыки.
            </div>
          </div>
        </div>
      </div>

      <div className="bg-ed-3 py-20 flex flex-col items-center">
        <div className="text-5xl mb-24 lg:text-3xl text-center sm:mx-2">
          Что ожидать от обучения
        </div>
        <div className="grid grid-cols-4 w-3/5 sm-grid-cols-1 xl:w-4/5 mx-auto gap-16 md:grid-cols-2">
          <div className="flex flex-col items-center text-center">
            <FontAwesomeIcon
              className="text-pink-500 ed-exp-text"
              icon={faGraduationCap}
            />
            <div className="mb-4 text-xl">Гарантированный результат</div>
            <div>
              Специалисты клиники Мээрим Давлетовой гарантируют, что качество их
              образования соответсвует мировым стандартам.
            </div>
          </div>
          <div className="flex flex-col items-center text-center">
            <FontAwesomeIcon
              className="text-pink-500 ed-exp-text"
              icon={faBrain}
            />
            <div className="mb-4 text-xl">Современные знания</div>
            <div>
              Вы будете работать с практикующими специалистами, которые
              обучались в самых престижных образовательных учереждениях по всему
              миру.
            </div>
          </div>
          <div className="flex flex-col items-center text-center">
            <FontAwesomeIcon
              className="text-pink-500 ed-exp-text"
              icon={faCertificate}
            />
            <div className="mb-4 text-xl">Официальный сертификат</div>
            <div>
              По окончанию курса вы получите официальный сертификат
              подтвержадющий ваши достижения и опыт.
            </div>
          </div>
          <div className="flex flex-col items-center text-center">
            <FontAwesomeIcon
              className="text-pink-500 ed-exp-text"
              icon={faAtom}
            />
            <div className="mb-4 text-xl">
              Опыт работы с новейшим оборудованием
            </div>
            <div>
              В течении обучения вы сможете получить опыт работы с самым
              современным и выскотехнологичным обордуованием.
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
            <div className="bg-white p-5 w-450 text-2xl sm:w-300 text-center rounded-3xl mb-4">
              Индивидуальный подход
            </div>
            <div className="bg-white p-5 w-450 text-2xl sm:w-300 text-center rounded-3xl mb-4">
              Профессиональная косметика премиум класса
            </div>
            <div className="bg-white p-5 w-450 text-2xl sm:w-300 text-center rounded-3xl mb-4">
              90% практического обучения
            </div>
            <div className="bg-white p-5 w-450 text-2xl sm:w-300 text-center rounded-3xl mb-4">
              Опыт работы в команде и с клиентами
            </div>
            <div className="bg-white p-5 w-450 text-2xl sm:w-300 text-center rounded-3xl mb-4">
              Новейшее оборудование
            </div>
            <div className="bg-white p-5 w-450 text-2xl sm:w-300 text-center rounded-3xl mb-4">
              Сертификат по окончании
            </div>
          </div>
          <img
            src={program}
            className="w-450 h-full ml-20 lg:ml-0 lg:mb-16 md:w-300"
            alt=""
          />
        </div>
      </div>
      <div
        id="education-sign-form"
        className="py-20 bg-primary flex flex-col items-center"
      >
        <SignForm title="Записаться на обучение" img={formpic} />
      </div>
    </div>
  );
}

export default Education;
