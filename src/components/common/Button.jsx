import React from 'react'

function Button({name, primary}) {
    return (
       
        <button className={primary ? "button btn-primary rounded-2xl focus:outline-none": "focus:outline-none md:w-full btn rounded-2xl "}>{name}</button>
     
    )
}

export default Button;
