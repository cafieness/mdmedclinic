import React from "react";
import SignForm from "../../components/common/SignForm";
import imgForm from "../../assets/mainPageForm.jpg";

import { Link, useParams } from "react-router-dom";

import { procedures } from "../../db";

function checkProcedure(title) {
  if (title === "inject") {
    return procedures.inject;
  }
  if (title === "apparat") {
    return procedures.apparat;
  }
  if (title === "skincare") {
    return procedures.skincare;
  }
}

function Procedures() {
  let id = useParams();
  const procedure = checkProcedure(id.id);
  const title =
    id.id === "inject"
      ? "Инъекционная косметология"
      : id.id === "apparat"
      ? "Аппаратная косметология"
      : "Уход за кожей";
  return (
    <div className="pt-40 sm:pt-32">
      <div className="flex flex-col items-center">
        <div className="text-4xl mb-16 sm:text-xl">{title}</div>
        <div className="grid gap-8 lgh:gap-12 px-8 grid-cols-1 mdh:grid-cols-2 lgh:grid-cols-1 procedure-grid">
          {procedure.map((pr) => (
            <Link
              to={`/procedure/${pr.title}`}
              key={pr.title}
              className="flex flex-col lgh:odd:flex-row items-center cursor-pointer hover:scale-105 transform duration-500 ease-in-out lgh:mx-32 lgh:even:flex-row-reverse"
            >
              <img
                src={pr.img}
                alt=""
                className="rounded-3xl object-cover w-64 h-64"
              />

              <div className="mt-4 lgh:mt-0 lgh:mx-4">
                <div className="text-lg font-semibold text-gray-900 lgh:mb-2 ">
                  {pr.title}
                </div>
                <p className="hidden lgh:block">{pr.description1}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="py-24 flex justify-center">
        <SignForm img={imgForm} title="Записаться на прием" />
      </div>
    </div>
  );
}

export default Procedures;
