import React from "react";

const errorComponent = (error) => {
  return (
    <div className="absolute font-semibold top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2">
      Произошла ошибка {JSON.stringify(error)}
    </div>
  );
};

const loadingComponent = () => {
  return (
    <div className="absolute font-semibold top-1/2 right-1/2  transform translate-x-1/2 -translate-y-1/2">
      Загрузка...
    </div>
  );
};

const handleGQLError = (error, loginRedirect) => {
  const errors = error.response.errors;
  if (errors.length === 1) {
    switch (errors[0].message) {
      case "Auth required":
      case "JWT token expired":
        loginRedirect();
        return;

      default:
        break;
    }
  }
};

export { errorComponent, loadingComponent, handleGQLError };
