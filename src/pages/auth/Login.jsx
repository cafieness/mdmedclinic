import React, { useState } from "react";
import Button from "../../components/common/Button";
import { Link, Redirect } from "react-router-dom";

import validator from "validator";

import { useDispatch, useSelector } from "react-redux";
import {login as login2} from "../../redux/user"

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState('')

  const isLoggedIn  = useSelector(state => state.user.user ? true : false);

  const validateEmail = (e) => {
    let email = e.target.value;

    if (validator.isEmail(email)||e.target.value==="") {
      setEmailError("");
    } else {
      setEmailError("email недействительный");
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
  };

  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault();
    if(emailError===""&&password!==""&&email!==""){
      dispatch(login2({token: "hi", user: {name:"Vasya", email: "vasya@mail.com", phone:"88005553535", id: "1", isAdmin:true}}))
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/profile" />;
  }
  return (
    <div className="h-screen login-bg flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="bg-white py-10 px-5 rounded-xl z-20 flex flex-col items-center text-xl "
      >
        <div className="text-4xl mb-8">Вход</div>
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
          <span className=" text-red-600">
            {emailError}
          </span>

        <label for="password" className="mb-4 self-start">
          Пароль
        </label>
        <input
          className="auth-input mb-8 focus:outline-none"
          type="password"
          placeholder="Введите ваш пароль"
          name="password"
          value={password}
          onChange={onChangePassword}
          required
        />
        <Button name="Войти" primary />
        <div className="mt-2">или</div>
        <Link className="border-b border-black" to="/signup">
          Зарегистрироваться
        </Link>
      </form>
    </div>
  );
}

export default Login;
