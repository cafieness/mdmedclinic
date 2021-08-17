import React, { useState } from "react";
import { SimpleError } from '../'
import validator from "validator"
import { useDispatch, useSelector } from "react-redux";

function ProfileData() {
    const userInfo = useSelector((state) =>
    state.user.user ? state.user.user : false
  );
    const [email, setEmail] = useState(userInfo.email);
    const [phone, setPhone] = useState(userInfo.phoneNumber);
    const [changeData, setChangeData] = useState(false);
    const [name, setName] = useState(userInfo.fullname);

    const [emailError, setEmailError] = useState("");

    const validateEmail = (e) =>{
      const email = e.target.value
      setEmail(email)
      if (email === ""){
        setEmailError("Пожалуйста введите новую почту")
        return;
      }
      if (!validator.isEmail(email)){
        setEmailError("Эта почта не действительна")
        return;
      }
      setEmailError("")
    }


    const [nameError, setNameError] = useState();
    const validateName = (e) =>{
        const name = e.target.value
        setName(name)
        if (name.length < 3) {
          setNameError("Введите свое имя")
          return
        }
        setNameError("")
      }
      function saveChanges() {
        //send migration then display errors and reset data if needed
        setChangeData(false);
      }


    return (
        <div>
            <div className="ml-20">
            <div className="text-3xl mb-12">Мой профиль</div>
            <p className="text-gray-400 text-base my-4">Если вы хотите изменить свои данные кликните кнопку изменить данные, измените их и кликните Сохранить</p>
            <div className="flex flex-col space-y-6 text-lg">
              <div>
                <label>Имя: </label>
                <input
                  type="text"
                  onChange={validateName}
                  value={name}
                  readOnly={!changeData}
                  className="input-general"
                />
                <SimpleError error={nameError}/>
              </div>
              
              <div>
                <label>Email: </label>
                <input
                  type="text"
                  onChange={validateEmail}
                  readOnly={!changeData}
                  value={email}
                  className="input-general"
                />
                <SimpleError error={emailError} />
              </div>
              <div>
                <label>Номер телефона: </label>
                <input
                  type="text"
                  onChange={e => setPhone(e.target.value)}
                  readOnly={!changeData}
                  value={phone}
                  className="input-general"
                />
              </div>
              {!changeData && (
                <button
                  onClick={() => setChangeData(true)}
                  className="button btn-primary rounded-2xl focus:outline-none"
                >
                  Изменить данные
                </button>
              )}
              {changeData && (
                <button
                  onClick={saveChanges}
                  className="button btn-primary rounded-2xl focus:outline-none"
                >
                  Сохранить
                </button>
              )}
            </div>
          </div>
       
        </div>
    )
}

export default ProfileData;
