import React from "react";
import bg from "../../assets/login/bg.png";
import Button from "../common/Button";

function Login() {
  return (
    <div className="flex md:justify-center">
      <div className="pt-64 md:pt-36 w-1/2 flex flex-col items-center px-5  md:bg-white">
        <div className="text-4xl mb-10">Вход</div>
        <form onSubmit="" className="flex flex-col text-xl">
          <label for="email" className="mb-4">
            Email
          </label>
          <input
            type="text"
            placeholder="Введите ваш email"
            name="email"
            required
            className="auth-input w-full focus:outline-none mb-4 text-black"
          />
          <label for="password" className="mb-4">
            Пароль
          </label>
          <input
          className="auth-input mb-8 focus:outline-none"
            type="password"
            placeholder="Введите ваш пароль"
            name="password"
            required
          />
          <Button name="Войти" primary/>
        </form>
        <div className="mt-2">или</div>
        <div className="border-b border-black">Зарегистрироваться</div>
      </div>
      <div className="h-screen login-bg md:hidden">
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      </div>
    </div>
  );
}

export default Login;
