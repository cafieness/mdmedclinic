import React from "react";
import meerimCircle from "../assets/about/meerim-circle.png";

function About() {
  return (
    <div className="bg-about pt-40">
      <div className="flex justify-center items-center py-20">
        <img src={meerimCircle} className="mr-20" alt="" />
        <div className="w-2/6">
          <div className="font-bold text-3xl mb-4">Клиника эстетической медицины Мээрим Давлетовой</div>
          <hr className="mb-4 w-full border-t-2 border-gray-600 border-solid" />
          <div className="text-xl mb-10">
            Мээрим Давлетова - косметолог с медицинским образованием, эксперт
            инъекционной и аппаратной косметологии, контурной пластике,
            мезонитям, а также специалист в области массажных техник по лицу.
          </div>
          <div className="text-xl mb-10">
            За многие годы практики Мээрим помогла многим женщинам стать
            увереннее в своей красоте, открыла собственную клинику эстетической
            медицины в Бишкеке и основала блог о красоте в Инстаграм - здесь
            каждый найдет для себя профессиональные рекомендации и информацию о
            процедурах и препаратах.
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
