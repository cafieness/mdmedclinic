import React from 'react'

function ProductCard({img, name,size,price}) {
    return (
        <div className="bg-white flex flex-col items-center mx-3 rounded-lg pb-4 hover:scale-105 transform duration-500 ease-in-out cursor-pointer">
            <img src={img} alt=""  className="w-64 rounded-lg"/>
            <hr className="w-2/3 border-t-2 border-black border-solid" />
            <p className="text-center mb-3">{name}</p>
            <p >{size}</p>
            
            <p className="text-xl mt-2" >{price}</p>
        </div>
    )
}

export default ProductCard;
