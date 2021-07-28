import React, { useState, useRef } from "react";
import Button from "../components/common/Button";


import { login } from "../redux/actions/auth";

function Login(props) {


  return (
    <div className="h-screen auth-bg flex justify-center items-center">
        <form onSubmit="" className="bg-white py-10 px-5 rounded-xl z-20 flex flex-col items-center text-xl ">
        <div className="text-4xl mb-8">Вход</div>
        <label for="email" className="mb-4 self-start">
            Email
          </label>
          <input
            type="text"
            placeholder="Введите ваш email"
            name="email"
            required
            className="auth-input w-full focus:outline-none mb-4 text-black"
          />
          <label for="password" className="mb-4 self-start">
            Пароль
          </label>
          <input
          className="auth-input mb-8 focus:outline-none"
            type="password"
            placeholder="Введите ваш пароль"
            name="password"
            required
          />
          <Button name="Войти" primary />
          <div className="mt-2">или</div>
        <div className="border-b border-black">Зарегистрироваться</div>
          
        </form> 
    </div>
  );
}

export default Login;