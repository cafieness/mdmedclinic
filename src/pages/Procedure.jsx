import React from "react";
import { useParams } from "react-router-dom";
import { procedures } from "../procedures";

function Procedure() {
  let { name } = useParams();
  const procedure = checkProcedure(name);
  const ind = procedure.indictions.split(";");
  const contrind = procedure.contraindications.split(";");
  const res = procedure.results.split(";");

  return (
    <div className="py-48 bg-primary px-10 sm:pt-28 ">
      <div className=" flex flex-col items-center">
        <div className="text-4xl mb-16 sm:text-2xl">{procedure.title}</div>
        <div className="procedure-width md:flex-col flex justify-evenly items-center border-b-2 pb-12 border-black">
          <div className="procedure-description md:order-2">
            <div className="mb-8 border-b-2 pb-4 border-black italic text-2xl">
              {procedure.shortDescription}
            </div>
            <div>
              {procedure.description1} <br /> <br />
              {procedure.description2}
            </div>
          </div>
          <img className="procedure-img ml-32 md:mb-10 md:ml-0" src={procedure.img} alt="" />
        </div>
        <div className=" procedure-width border-b-2 pb-8 border-black">
          <div className="text-xl italic my-5">Показания</div>
          <ul className="list-disc pl-5">
            {ind.map((indiction) => (
              <li className="">{indiction}</li>
            ))}
          </ul>
        </div>
        <div className=" procedure-width border-b-2 pb-8 border-black">
          <div className="text-xl italic my-5">Противопоказания</div>
          <ul className="list-disc pl-5">
            {contrind.map((contrindiction) => (
              <li className="">{contrindiction}</li>
            ))}
          </ul>
        </div>
        <div className=" procedure-width border-b-2 pb-8 border-black">
          <div className="text-xl italic my-5">Результаты</div>
          <ul className="list-disc pl-5">
            {res.map((result) => (
              <li className="">{result}</li>
            ))}
          </ul>
        </div>
        <div className=" flex flex-col items-center procedure-width ">
          <div className="text-xl italic my-12">Стоймость процедуры</div>
          <table class="w-full procedure-table sm:hidden">
            <thead className="border-b-2 border-black">
              <tr>
                <th>Процедура</th>
                <th>Время</th>
                <th>Цена за 1 процедуру</th>
                <th>Кол-во процедур</th>
                <th>Частота посещений</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <td className="text-center">{procedure.title}</td>
                <td className="text-center">{procedure.time}</td>
                <td className="text-center">{procedure.price}</td>
                <td className="text-center">{procedure.number}</td>
                <td className="text-center">{procedure.frequency}</td>
              </tr>
            </tbody>
          </table>
            <table className="procedure-mobile-table w-11/12">
                <tr className="flex justify-between">
                    <th>Процедура</th>
                    <td>{procedure.title}</td>
                </tr>
                <tr className="flex justify-between">
                    <th>Время</th>
                    <td>{procedure.time}</td>
                </tr>
                <tr className="flex justify-between">
                    <th>Цена за 1 процедуру</th>
                    <td>{procedure.price}</td>
                </tr>
                <tr className="flex justify-between">
                    <th>Кол-во посещений</th>
                    <td>{procedure.number}</td>
                </tr>
                <tr className="flex justify-between">
                    <th>Частота посещений</th>
                    <td>{procedure.frequency}</td>
                </tr>
            </table>
        </div>
      </div>
    </div>
  );
}

function checkProcedure(name) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < procedures.skincare.length; j++) {
      if (name === procedures.skincare[j].title) {
        return procedures.skincare[j];
      }
    }
    for (let j = 0; j < procedures.apparat.length; j++) {
      if (name === procedures.apparat[j].title) {
        return procedures.apparat[j];
      }
    }
    for (let j = 0; j < procedures.inject.length; j++) {
      if (name === procedures.inject[j].title) {
        return procedures.inject[j];
      }
    }
  }
}

export default Procedure;
