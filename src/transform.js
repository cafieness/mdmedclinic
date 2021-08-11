const readStatus = (status)=>{
    switch(status){
        case "PENDING":
            return "В ождилании";
        case "ACCEPTED":
            return "Заказ принят";
        case "READY":
            return "Заказ готов";
        case "CLOSED":
            return "Заказ закрыт";
        case "CANCELLED":
            return "Заказ отменен";        
    }
}
export {readStatus};