import { useHistory, useLocation } from "react-router";

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

const readHiddenStatus = (st) => {
  switch (st) {
    case "VISIBLE":
      return "Активные";
    case "HIDDEN":
      return "Скрытые";
    default:
      return "Неверный тип";
  }
};

function useURLQuery() {
  return new URLSearchParams(useLocation().search);
}

function useLoginRedirect(from) {
  const history = useHistory();
  const loginRedirect = () => {
    history.push("/login?reauth=true&from=" + from);
  };
  return loginRedirect;
}

export {
  readStatus,
  readPaymentType,
  readHiddenStatus,
  useURLQuery,
  useLoginRedirect,
};
