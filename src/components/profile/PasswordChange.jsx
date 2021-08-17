import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";


function PasswordChange() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  function savePassword() {
    //open dialog and put the mutation results
    setOpenDialog(true);
    setOldPassword("");
    setNewPassword("");
  }
  useEffect(() => {
    setTimeout(() => {
      setOpenDialog(false);
    }, 2500);
  }, [openDialog]);


  const dialogBody = (
    <div className="p-10 flex flex-col items-center">
      <FontAwesomeIcon
        className="text-5xl mb-8 text-green-400"
        icon={faCheck}
      />
      <div>Вы успешно сохранили пароль</div>
    </div>
  );
  return (
    <div className="ml-20">
      <div className="text-3xl mb-16">Сменить пароль</div>
      <div>
        <div className="text-xl mb-8">
          <label>Старый пароль: </label>
          <input
            type="password"
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
            className="bg-white py-2 px-4 rounded-full ring-1 ring-gray-400 focus:ring-2 focus:ring-purple-500 transition duration-500 ease-in-out focus:outline-none ml-6"
          />
        </div>
        <div className="text-xl mb-8">
          <label>Новый пароль: </label>
          <input
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            className="bg-white py-2 px-4 rounded-full ring-1 ring-gray-400 focus:ring-2 focus:ring-purple-500 transition duration-500 ease-in-out focus:outline-none ml-8"
          />
        </div>
        <button
          onClick={savePassword}
          className="button btn-primary rounded-2xl focus:outline-none"
        >
          Сохранить
        </button>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          {dialogBody}
        </Dialog>
      </div>
    </div>
  );
}

export default PasswordChange;
