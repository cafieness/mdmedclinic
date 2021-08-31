import React, { useEffect,useState} from "react";
import Dialog from "@material-ui/core/Dialog";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useMutation} from "react-query";
import send_mutation from "../../api";

const mut_add_course = `
mutation courseRegister($name:String!,$phoneNumber:String!){
  makeCourseAppointment(input:{name:$name,phoneNumber:$phoneNumber}){
    name
    phoneNumber
    id
    status
  }
}
`
const mut_add_visit = `
mutation visitRegister($name:String!,$phoneNumber:String!){
  makeVisitAppointment(input:{name:$name,phoneNumber:$phoneNumber}){
    id
    name
    phoneNumber
    status
  }
}
`

function SignForm({ img, title, contacts }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const mut = title==="Записаться на прием"?mut_add_visit:mut_add_course;


  const dialogBody = (
    <div className="p-10 flex flex-col items-center">
      <FontAwesomeIcon className="text-5xl mb-8 text-green-400" icon={faCheck} />
      <div>Вы успешно записались</div>
    </div>
  );

  useEffect(() => {
     setTimeout(() => {
      setOpenDialog(false);
    }, 2500);
  }, [openDialog]);

  function changeName(e){
    setName(e.target.value);
  }
  function changePhone(e){
    setPhoneNumber(e.target.value);
  }

  const { mutate } = useMutation(({ phoneNumber, name }) =>
    send_mutation(mut, { phoneNumber: phoneNumber, name: name })
  );

  function handleSubmit(e){
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
          if(err.response.errors[0].errors.name){
            setError("Имя должно иметь не менее 3 букв");
          }
          if(err.response.errors[0].errors.phone_number){
            setError("Неверный телефон");
          }
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit}
      className={
        contacts
          ? "sign-form-width bg-white flex justify-between rounded-2xl  sm:px-2"
          : "w-1/2 sm:w-320 bg-white flex justify-between rounded-2xl  sm:px-2"
      }
    >
      <div className="py-10 pl-10 sm:pl-0 sm:pr-0 flex flex-col ">
        
        <p className="text-2xl font-bold mb-4">{title}</p>
        <p className="text-gray-700 text-xs mb-8">
          Нажимая на кнопку "Записатьcя", Вы даете Согласие  на использование
          предоставленных персональных данных для получения услуг
        </p>
        <input
          className="signform-inp mb-4 border border-black w-full rounded-2xl py-2 px-3 text-black focus:outline-none"
          id="имя"
          type="text"
          placeholder="Имя"
          value={name}
          onChange={changeName}
        />

        <input
          className="signform-inp mb-8 border border-black w-full rounded-2xl py-2 px-3 focus:outline-none text-black "
          id="номер телефона"
          type="text"
          placeholder="Номер телефона"
          value={phoneNumber}
          onChange={changePhone}
        />
        <div className="text-red-600">{error}</div>
        <button type="submit" className="button btn-primary rounded-2xl focus:outline-none">Записаться</button>
        <Dialog open={openDialog} onClose={()=>setOpenDialog(false)}>{dialogBody}</Dialog>
        
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
