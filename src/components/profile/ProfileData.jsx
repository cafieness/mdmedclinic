import React, { useState } from "react";
import { SimpleError } from "../";
import validator from "validator";

import { useMutation, useQuery } from "react-query";
import send_mutation, { send_var_query } from "../../api";
import { gql } from "graphql-request";

import { errorComponent, loadingComponent } from "../admin/HelperComps";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/user";

const get_user_query = gql`
  query {
    user {
      me {
        id
        isAdmin
        fullname
        email
        phoneNumber
      }
    }
  }
`;

const change_user_mut = gql`
  mutation ChangeUserData($name: String!, $phone: String!, $email: String!) {
    user {
      updateUser(input: { email: $email, name: $name, phone: $phone }) {
        user {
          id
          email
          fullname
          isAdmin
          phoneNumber
        }
      }
    }
  }
`;

function ProfileData() {
  const { data, error, refetch, isSuccess, isError, isLoading, isFetching } =
    useQuery("get_user", async () => {
      const {
        user: { me },
      } = await send_var_query(get_user_query);
      return me;
    });

  const user = useSelector((state) => state.user.user);

  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phoneNumber);
  const [changeData, setChangeData] = useState(false);
  const [name, setName] = useState(user.fullname);

  const [emailError, setEmailError] = useState("");

  const validateEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (email === "") {
      setEmailError("Пожалуйста введите новую почту");
      return;
    }
    if (!validator.isEmail(email)) {
      setEmailError("Эта почта не действительна");
      return;
    }
    setEmailError("");
  };

  const [nameError, setNameError] = useState();
  const validateName = (e) => {
    const name = e.target.value;
    setName(name);
    if (name.length < 3) {
      setNameError("Введите свое имя");
      return;
    }
    setNameError("");
  };

  const { mutate } = useMutation(({ phone, name, email }) =>
    send_mutation(change_user_mut, { phone: phone, name: name, email: email })
  );

  const dispactch = useDispatch();

  function saveChanges() {
    mutate(
      { phone, name, email },
      {
        onSuccess: (mut_data) => {
          setChangeData(false);
          dispactch(setUser(mut_data.user.updateUser.user));
        },
        onError: () => {},
      }
    );
  }

  return (
    <div>
      {isError && errorComponent(error)}
      {(isLoading || isFetching) && isError && loadingComponent()}
      {isSuccess && data && !isLoading && !isFetching && (
        <div className="ml-20">
          <div className="text-3xl mb-12">Мой профиль</div>
          <p className="text-gray-400 text-base my-4">
            Если вы хотите изменить свои данные кликните кнопку изменить данные,
            измените их и кликните Сохранить
          </p>
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
              <SimpleError error={nameError} />
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
                onChange={(e) => setPhone(e.target.value)}
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
      )}
    </div>
  );
}

export default ProfileData;
