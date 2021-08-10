import React from 'react'

function CheckDate(date) {
    const year = date.date.toString().substring(0,4);
    const day = date.date.toString().substring(8,10);
    const months = ["декабря","января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября"];
    const month = months[parseInt(date.date.toString().substring(5,7))]
    return (
        <div className="mt-4">
            {day} {month}, {year}
        </div>
    )
}

export default CheckDate
