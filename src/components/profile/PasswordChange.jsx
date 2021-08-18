import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import send_mutation, { send_var_query } from "../../api";

import { useMutation, useQuery } from "react-query";
import { gql } from "graphql-request";
import { useSelector } from "react-redux";

const change_password_mut = gql`
  mutation ChangeUserData($oldPassword: String!, $newPassword: String!) {
    user {
      updatePassword(input: { newPass: $newPassword, oldPass: $oldPassword }) {
        user {
          email
          fullname
          phoneNumber
        }
      }
    }
  }
`;

function PasswordChange() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

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

  const { mutate } = useMutation(({ oldPassword, newPassword }) =>
    send_mutation(change_password_mut, {
      oldPassword: oldPassword,
      newPassword: newPassword,
    })
  );

  function savePassword() {
    mutate(
      { oldPassword, newPassword },
      {
        onSuccess: () => {
          setOpenDialog(true);
          setOldPassword("");
          setNewPassword("");
          setPasswordError("");
        },
        onError: () => {
          setPasswordError("Вы неправильно ввели пароль или новый пароль менее 8 символов")
        },
      }
    );
  }
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
        <div className="my-4 text-red-600">{passwordError}</div>
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
