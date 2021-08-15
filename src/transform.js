const readStatus = (status) => {
  switch (status) {
    case "PENDING":
      return "В ожидании";
    case "ACCEPTED":
      return "Заказ принят";
    case "READY":
      return "Заказ готов";
    case "CLOSED":
      return "Заказ закрыт";
    case "CANCELLED":
      return "Заказ отменен";
    default:
      return "Неверный статус";
  }
};

const readPaymentType = (type) => {
  switch (type) {
    case "CASH":
      return "Наличными";
    case "EWALLET":
      return "Эл-сом";
    default:
      return "Неверный тип";
  }
};

export { readStatus, readPaymentType };
