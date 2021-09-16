import React from "react";

function ProcedureCard({ img, text, desc }) {
  return (
    <div className="flex flex-col items-center mx-6 cursor-pointer mdh:hover:scale-105 transform duration-500 ease-in-out">
      <div className="mb-2 relative">
        <img src={img} alt="" className="mb-2 rounded-lg" />
        <div className="hidden mdh:block hover:opacity-100 opacity-0 absolute bottom-[2%] max-h-[56%] overflow-y-hidden bg-white/70 transition ease-in-out duration-500 translate-y-12  hover:translate-y-0">
          <p className="px-2 py-3 overflow-clip text-gray-900 text-center text-xs xlh:text-sm">
            {desc}
          </p>
        </div>
      </div>

      <p className="text-xl text-gray-900 font-semibold text-center">{text}</p>
    </div>
  );
}

export default ProcedureCard;
