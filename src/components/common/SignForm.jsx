import React from "react";
import { Button } from "..";

function SignForm({ img, name, contacts }) {
  return (
    <form
      className={
        contacts
          ? "sign-form-width bg-white flex justify-between rounded-2xl  sm:px-2"
          : "w-1/2 sm:w-320 bg-white flex justify-between rounded-2xl  sm:px-2"
      }
    >
      <div className="py-10 pl-10 sm:pl-0 sm:pr-0 flex flex-col ">
        
        <p className="text-2xl font-bold mb-4">{name}</p>
        <p className="text-gray-700 text-xs mb-8">
          Нажимая на кнопку "Записатьcя", Вы даете Согласие  на использование
          предоставленных персональных данных для получения услуг
        </p>
        <input
          className="signform-inp mb-4 border border-black w-full rounded-2xl py-2 px-3 text-black focus:outline-none"
          id="имя"
          type="text"
          placeholder="Имя"
        />

        <input
          className="signform-inp mb-8 border border-black w-full rounded-2xl py-2 px-3 focus:outline-none text-black "
          id="номер телефона"
          type="text"
          placeholder="Номер телефона"
        />
        <Button name="Записаться" primary />

        
      </div>
      <img
        src={img}
        alt=""
        className={
          contacts
            ? "md:hidden rounded-2xl border-transparent"
            : "md:hidden w-3/5 rounded-2xl border-transparent"
        }
      />
    </form>
  );
}

export default SignForm;
