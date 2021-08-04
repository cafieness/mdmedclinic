import React from 'react'

function ProductCard({img, name,price}) {
    return (
        <div className="product-card-width p-2 border-2 border-grey-200 flex flex-col items-center mx-3 rounded-lg pb-4 hover:scale-105 transform duration-500 ease-in-out cursor-pointer">
            <img src={img} alt=""  className="w-64 rounded-lg"/>
            <p className="text-center mt-8">{name}</p>
            <p className="text-xl mt-2" >{price}</p>
        </div>
    )
}

export default ProductCard;
