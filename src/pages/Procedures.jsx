import React from "react";
import SignForm from "../components/common/SignForm";
import imgForm from "../assets/mainPageForm.jpg";

import { Link } from "react-router-dom";

import {skincare,apparat, inject} from '../procedures';

function checkProcedure(title){
    if(title=="Уход за кожей"){
        return skincare;
    }
    if(title=="Аппаратная косметология"){
        return apparat;
    }
    if(title=="Инъекционная косметология"){
        return inject;
    }
    
}

function Procedures({ t}) {
    const procedures = checkProcedure(t);
    const procedureLength = procedures.length;

  return (
    <div className="pt-40">
      <div className="flex flex-col items-center">
        <div className="text-4xl mb-16 md:text-2xl">{t}</div>
        <div className="grid grid-cols-4 gap-16 px-8 md:grid-cols-2 procedure-grid">
            {procedures.map(procedure =>(
                <Link to={procedure.title} className="flex flex-col items-center cursor-pointer hover:scale-105 transform duration-500 ease-in-out">
                   <img src={procedure.img} alt="" /> 
                   <div className="mt-4 text-lg">{procedure.title}</div>
                </Link>
            ))}
        </div>
      </div>
      <div className="py-24 flex justify-center">
        <SignForm img={imgForm} name="Записаться на прием" />
      </div>
    </div>
  );
}

export default Procedures;
