import React from "react";

function ProductCard({ img, name, price }) {
  return (
    <div className="product-card-width p-2 flex flex-col items-center rounded-lg pb-4 hover:scale-105 transform duration-500 ease-in-out cursor-pointer">
      <img src={img} alt="" className="w-64 rounded-lg" />
      <p className="text-center mt-8 text-gray-900">{name}</p>
      <p className="text-xl mt-2 text-gray-900">{price}</p>
    </div>
  );
}

export default ProductCard;
