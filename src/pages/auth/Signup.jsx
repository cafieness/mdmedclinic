import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import validator from "validator";
import send_mutation from "../../api";
import { useMutation } from "react-query";
import Dialog from "@material-ui/core/Dialog";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const mut_signup = `
mutation signup($email:String!, $name:String!, $password:String!, $phone:String!){
  signup(input:{email:$email, name:$name, password:$password, phone:$phone}){
    token
    user{
      id
      phoneNumber
      fullname
      email
    }
  }
}
`;

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signupError, setSignupError] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email) || email === "") {
    } else {
      setSignupError("email недействительный");
    }
  };
  const validatePassword = (e) => {
    var password = e.target.value;
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
  const { mutate } = useMutation(({ phone, name, email, password }) =>
    send_mutation(mut_signup, {
      phone: phone,
      name: name,
      email: email,
      password: password,
    })
  );
  const dialogBody = (
    <div className="p-10 flex flex-col items-center">
      <FontAwesomeIcon
        className="text-5xl mb-8 text-green-400"
        icon={faCheck}
      />
      <div>Вы успешно зарегистрировались</div>
    </div>
  );

  const handleSignup = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "" && name !== "" && phone !== "") {
      mutate(
        { phone, name, email, password },
        {
          onSuccess: () => {
            setOpenDialog(true);
            setTimeout(() => {
              setOpenDialog(false);
              setStatus(true);
            }, 2500);
          },
          onError: (err) => {
            if (err.response.errors[0].errors.password) {
              setSignupError("Пароль должен быть не менее 8 символов");
              return;
            }
            if (err.response.errors[0].errors.fullname) {
              setSignupError("Имя должно иметь не менее 4 букв");
              return;
            }
            if (err.response.errors[0].errors.email) {
              setSignupError("Такой email уже существует");
              return;
            }
            if (err.response.errors[0].errors.phone) {
              setSignupError("Неверный телефон");
              return;
            }
          },
        }
      );
    }
  };
  if (status) {
    return <Redirect to="/login"></Redirect>;
  }
  return (
    <div className="h-screen min-h-[900px] signup-bg flex justify-center items-center pt-28">
      <form
        onSubmit={handleSignup}
        className="bg-white py-10 px-5 rounded-xl z-20 flex flex-col items-center text-xl "
      >
        <div className="text-4xl mb-8">Регистрация</div>
        <label for="name" className="mb-4 self-start">
          Имя
        </label>
        <input
          type="text"
          placeholder="Введите ваше имя"
          name="name"
          value={name}
          required
          onChange={(el) => setName(el.target.value)}
          className="auth-input w-full focus:outline-none mb-4 text-black"
        />
        <label for="phone" className="mb-4 self-start">
          Телефон
        </label>
        <input
          type="text"
          placeholder="Введите ваш номер телефона"
          name="phone"
          value={phone}
          required
          onChange={(el) => setPhone(el.target.value)}
          className="auth-input w-full focus:outline-none mb-4 text-black"
        />
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
        <span className=" text-red-600 mb-2">{signupError}</span>
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
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        {dialogBody}
      </Dialog>
    </div>
  );
}

export default Signup;
