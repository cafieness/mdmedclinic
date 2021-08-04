import React from "react";
import travolta from "../assets/errorpage/travolta.gif";

function ErrorPage() {
  return (
    <div className="bg-primary h-screen flex md:flex-col items-center justify-center">
      <img src={travolta} alt="" className="md:absolute " />
      <div className="md:z-10 md:text-white">
        <p className="text-stroke error-title text-center">404</p>
        <p className="text-stroke text-5xl mb-10 sm:text-2xl">Страница не найдена</p>
      </div>
    </div>
  );
}

export default ErrorPage;
