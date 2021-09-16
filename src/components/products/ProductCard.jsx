import React from "react";

function ProductCard({ img, name, price, desc, show_desc }) {
  return (
    <div className="flex flex-col items-center rounded-lg pb-4 hover:scale-105 transform duration-500 ease-in-out cursor-pointer">
      <div className="realtive group">
        <img src={img} alt="" className="w-64 rounded-lg z-0" />
        <div className="hidden mdh:block hover:opacity-100 opacity-0 absolute top-[4.5rem] mx-auto h-[11.5rem] bg-white/70 overflow-y-hidden max-w-[16rem] transition ease-in-out duration-500 translate-y-12 hover:translate-y-0">
          <p className="px-2 overflow-ellipsis text-gray-800 overflow-hidden text-center text-sm">
            {desc}
          </p>
        </div>
      </div>
      <p className="text-center mt-8 font-semibold text-gray-800">{name}</p>
      <p className="text-xl mt-2 text-gray-900">{price} сом</p>
    </div>
  );
}

export default ProductCard;
