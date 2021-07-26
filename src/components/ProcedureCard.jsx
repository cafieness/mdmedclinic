import React from "react";

function ProcedureCard({img, text}) {
  return (
    <div className="flex flex-col items-center mx-12 cursor-pointer hover:scale-105 transform duration-500 ease-in-out">
      <img src={img} alt="" className="w-96 mb-2" />
      <p className="text-xl mb-16 text-center">{text}</p>
    </div>
  );
}

export default ProcedureCard;
