import React from "react"
function SimpleError({error}){
    return(
        <span className="text-red-600 mb-2 text-base" hidden={!error}>
          {error}
        </span>
    )
}

export default SimpleError