import React, { useState } from "react";
import Button from "../../components/common/Button";
import { Link, Redirect, useHistory } from "react-router-dom";

import validator from "validator";

import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/user";
import { useMutation } from "react-query";
import { gql } from "graphql-request";
import send_mutation from "../../api";
import { useURLQuery } from "../../transform";

const login_mutation = ({ email, password }) => {
  return send_mutation(
    gql`
      mutation Login($email: String!, $pass: String!) {
        login(email: $email, password: $pass) {
          token
          user {
            fullname
            email
            isAdmin
            id
            phoneNumber
          }
        }
      }
    `,
    { email: email, pass: password }
  );
};

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");

  const { mutate, isLoading } = useMutation(login_mutation);

  const isLoggedIn = useSelector((state) => (state.user.user ? true : false));

  const validateEmail = (e) => {
    let email = e.target.value;

    if (validator.isEmail(email) || e.target.value === "") {
      setEmailError("");
    } else {
      setEmailError(" недействительный");
    }
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (email === "") {
      setEmailError("Поле не может быть пустым");
      return;
    }
    if (!validator.isEmail(email)) {
      setEmailError("Указаная почта не действительна");
      return;
    }
    setEmailError("");
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    if (password.length < 8) {
      setPasswordError("Пароль слишком короткий");
      return;
    }
    setPasswordError("");
  };

  const dispatch = useDispatch();

  const [error, setError] = useState();
  const history = useHistory();
  const handleLogin = (e) => {
    e.preventDefault();
    if (emailError === "" && password !== "" && email !== "") {
      mutate(
        { email: email, password: password },
        {
          onError: (err) => {
            const error = err.response.errors[0].message;
            if (error === "Invalid credentials") {
              setError("Неверный пароль");
              return;
            }
            if (error === "No user") {
              setError("Пользователя с таким email не существует");
              return;
            }
            setError(error);
          },
          onSuccess: (data) => {
            dispatch(login(data.login));
            setTimeout(() => {
              if (query.get("from")) {
                history.push(query.get("from"));
              } else {
                history.push("/");
              }
            }, 1000);
          },
        }
      );
    }
  };

  const query = useURLQuery();

  if (isLoggedIn && !query.get("reauth")) {
    return <Redirect to="/profile" />;
  }
  return (
    <div className="h-screen login-bg flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="bg-white py-6 2xl:px-8 s:px-3 px-5 mx-1 mt-12 rounded-xl z-20 flex flex-col items-center text-xl xl:text-lg "
      >
        <div className="text-3xl mb-6">Вход</div>
        <label for="email" className="mb-3 self-start">
          Email
        </label>
        <input
          type="text"
          placeholder="Введите ваш email"
          name="email"
          value={email}
          required
          onChange={onChangeEmail}
          className="auth-input w-full focus:outline-none mb-2 text-black"
        />

        <span className=" text-red-600 mb-2 text-base" hidden={!emailError}>
          {emailError}
        </span>

        <label for="password" className="mb-3 self-start">
          Пароль
        </label>
        <input
          className="auth-input mb-2 focus:outline-none"
          type="password"
          placeholder="Введите ваш пароль"
          name="password"
          value={password}
          onChange={onChangePassword}
          required
        />
        <span className="text-red-600 mb-2 text-base" hidden={!passwordError}>
          {passwordError}
        </span>
        {isLoading && <div>Загрузка...</div>}
        {error && <span className="text-base text-red-600 mb-2">{error}</span>}
        <span className="mt-2"></span>
        <Button name="Войти" primary />
        <div className="my-2">или</div>
        <Link className="border-b border-black mb-2" to="/signup">
          Зарегистрироваться
        </Link>
      </form>
    </div>
  );
}

export default Login;
