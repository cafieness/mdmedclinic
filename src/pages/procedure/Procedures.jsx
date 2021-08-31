import React from "react";
import SignForm from "../../components/common/SignForm";
import imgForm from "../../assets/mainPageForm.jpg";

import { Link, useParams } from "react-router-dom";


import {procedures} from '../../db';

function checkProcedure(title){
    if(title==="inject"){
        return procedures.inject
    }
    if(title==="apparat"){
        return procedures.apparat;
    }
    if(title==="skincare"){
        return procedures.skincare;
    }
}

function Procedures() {
    let id = useParams();
    const procedure = checkProcedure(id.id);
    const title = (id.id==="inject")? "Инъекционная косметология":(id.id==="apparat")?"Аппаратная косметология":"Уход за кожей"  
  return (
    <div className="pt-40 sm:pt-24">
      <div className="flex flex-col items-center">
        <div className="text-4xl mb-16 sm:text-xl">{title}</div>
        <div className="grid grid-cols-4 gap-16 px-8 md:grid-cols-2 procedure-grid">
            {procedure.map(pr =>(
                <Link to={`/procedure/${pr.title}`} className="flex flex-col items-center cursor-pointer hover:scale-105 transform duration-500 ease-in-out">
                   <img src={pr.img} alt="" className="rounded-3xl w-[250px] h-[250px]" /> 
                   <div className="mt-4 text-lg">{pr.title}</div>
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
