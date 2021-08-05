import React, { useState } from "react";
import { Link } from "react-router-dom";

import validator from "validator";


// import { useDispatch } from "react-redux";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email) || email === "") {
      setEmailError("");
    } else {
      setEmailError("email недействительный");
    }
  };
  const validatePassword = (e) => {
    var password = e.target.value;
    if (validator.isStrongPassword(password) || password === "") {
      setPasswordError("");
    } else {
      setPasswordError("пароль недостаточно силён");
    }
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    validateEmail(e);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    validatePassword(e);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if(emailError===""&&passwordError===""&&password!==""&&email!==""){
      
    }
  };
  return (
    <div className="h-screen signup-bg flex justify-center items-center">
      <form
        onSubmit={handleSignup}
        className="bg-white py-10 px-5 rounded-xl z-20 flex flex-col items-center text-xl "
      >
        <div className="text-4xl mb-8">Регистрация</div>
        <label for="email" className="mb-4 self-start">
          Email
        </label>
        <input
          type="text"
          placeholder="Введите ваш email"
          name="email"
          value={email}
          required
          onChange={onChangeEmail}
          className="auth-input w-full focus:outline-none mb-4 text-black"
        />
        <span className=" text-red-600">{emailError}</span>
        <label for="password" className="mb-4 self-start">
          Пароль
        </label>
        <input
          className="auth-input mb-4  focus:outline-none"
          type="password"
          placeholder="Введите ваш пароль"
          name="password"
          value={password}
          onChange={onChangePassword}
          required
        />
        <span className=" text-red-600 mb-4">{passwordError}</span>
        <button className="button btn-primary rounded-2xl focus:outline-none">
          Зарегистрироваться
        </button>
        <div className="flex mt-4">
          <div>Уже есть аккаунт?⠀</div>
          <Link className="border-b border-black" to="/login">
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
