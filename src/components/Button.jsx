import React from 'react'

function Button({name, primary}) {
    return (
       
        <button className={primary ? "md:w-full btn-primary rounded-2xl w-2/3": "md:w-full btn rounded-2xl w-2/3"}>{name}</button>
     
    )
}

export default Button;
