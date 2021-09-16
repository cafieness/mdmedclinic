import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "react-query";
import send_mutation from "../../api";
import { useLocation } from "react-router-dom";

const mut_add_course = `
mutation courseRegister($name:String!,$phoneNumber:String!){
  makeCourseAppointment(input:{name:$name,phoneNumber:$phoneNumber}){
    name
    phoneNumber
    id
    status
  }
}
`;
const mut_add_visit = `
mutation visitRegister($name:String!,$phoneNumber:String!){
  makeVisitAppointment(input:{name:$name,phoneNumber:$phoneNumber}){
    id
    name
    phoneNumber
    status
  }
}
`;

function SignForm({ img, title, contacts }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const loc = useLocation();
  const eng = loc.search === "?lang=en";
  const mut =
    title === "Записаться на прием" || "Make an appointment"
      ? mut_add_visit
      : mut_add_course;

  const dialogBody = (
    <div className="p-10 flex flex-col items-center">
      <FontAwesomeIcon
        className="text-5xl mb-8 text-green-400"
        icon={faCheck}
      />
      <div>Вы успешно записались</div>
    </div>
  );

  useEffect(() => {
    setTimeout(() => {
      setOpenDialog(false);
    }, 2500);
  }, [openDialog]);

  function changeName(e) {
    setName(e.target.value);
  }
  function changePhone(e) {
    setPhoneNumber(e.target.value);
  }

  const { mutate } = useMutation(({ phoneNumber, name }) => {
    let num = phoneNumber.replace(/\D/g, "");
    send_mutation(mut, { phoneNumber: num, name: name });
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutate(
      { phoneNumber, name },
      {
        onSuccess: () => {
          setName("");
          setPhoneNumber("");
          setOpenDialog(true);
          setError("");
        },
        onError: (err) => {
          if (err.response.errors[0].errors.name) {
            setError("Имя должно иметь не менее 3 букв");
          }
          if (err.response.errors[0].errors.phone_number) {
            setError("Неверный телефон");
          }
        },
      }
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white flex justify-between rounded-2xl mx-3 mdh:mx-auto relative lgh:w-[68%] xlh:w-3/5"
    >
      <div className="flex flex-col z-10 py-4 px-2 mdh:pl-5 mdh:self-center">
        <p className="text-2xl font-bold mb-2 text-center">
          {eng ? "Make an appointment" : title}
        </p>
        <p className="text-gray-700 text-xs text-center mb-8">
          {eng
            ? `By clicking on the "Sign up" button, you consent to the use of the personal data provided to receive the services`
            : `Нажимая на кнопку "Записатьcя", Вы даете Согласие  на использование предоставленных персональных данных для получения услуг`}
        </p>
        <input
          className="mb-4 mdh:mb-3 border border-black rounded-2xl py-2 px-3 text-black focus:outline-none"
          id="имя"
          type="text"
          placeholder={eng ? "Name" : "Имя"}
          value={name}
          onChange={changeName}
        />

        <input
          className="mb-6 mdh:mb-4 border border-black rounded-2xl py-2 px-3 focus:outline-none text-black "
          id="номер телефона"
          type="text"
          placeholder={eng ? "Phone number" : "Номер телефона"}
          value={phoneNumber}
          onChange={changePhone}
        />
        <div className="text-red-600">{error}</div>
        <button
          type="submit"
          className="btn-primary rounded-2xl focus:outline-none"
        >
          {eng ? "Enroll" : "Записаться"}
        </button>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          {dialogBody}
        </Dialog>
      </div>
      <img
        src={img}
        alt=""
        className="absolute z-0 right-0 top-0 h-full w-auto opacity-[55%] rounded-2xl border-transparent mdh:hidden"
      />
      <img
        src={img}
        alt=""
        className="hidden w-3/5 mdh:block rounded-2xl border-transparent"
      />
    </form>
  );
}

export default SignForm;
