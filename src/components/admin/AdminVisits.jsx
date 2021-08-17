import { gql } from "graphql-request";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import send_mutation, { send_var_query } from "../../api";
import { readHiddenStatus } from "../../transform";
import { errorComponent, loadingComponent } from "./HelperComps";

const get_visits_query = gql`
  query GetVisits($st: HiddenStatus!) {
    admin {
      getVisits(status: $st) {
        id
        name
        phoneNumber
        status
        insertedAt
      }
    }
  }
`;

const hide_mut = gql`
  mutation HideComp($st: HiddenStatus!, $id: ID!) {
    admin {
      changeApointmentStatus(status: $st, id: $id, type: VISIT)
    }
  }
`;

function AdminVisits() {
  const [status, setStatus] = useState("VISIBLE");
  const statusList = ["HIDDEN", "VISIBLE"];
  const { data, error, refetch, isSuccess, isError, isLoading, isFetching } =
    useQuery("get_visits", async () => {
      const {
        admin: { getVisits },
      } = await send_var_query(get_visits_query, { st: status });
      return getVisits;
    });

  useEffect(() => {
    refetch();
  }, [status]);

  const { mutate } = useMutation(({ st, id }) =>
    send_mutation(hide_mut, { st: st, id: id })
  );

  const handle_hide = (id, st) => {
    if (st === "VISIBLE") {
      st = "HIDDEN";
    } else {
      st = "VISIBLE";
    }
    mutate(
      { st, id },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Записи на посещение клиники
      </h2>
      <div className="flex flex-row-reverse text-sm mb-4">
        {statusList.map((el) => (
          <button
            className={
              "btn-ar mr-2 " +
              (status === el
                ? "bg-gray-900 text-white"
                : "bg-transparent ring-1 ring-gray-800")
            }
            onClick={() => setStatus(el)}
          >
            {readHiddenStatus(el)}
          </button>
        ))}
      </div>
      <div>
        {isError && errorComponent(error)}
        {(isLoading || isFetching) && !isError && loadingComponent()}
        {isSuccess && data && !isLoading && !isFetching && (
          <div className="flex flex-col mx-2 space-y-3">
            {data.map((el) => (
              <div className="flex border border-transparent group transition duration-300 ease-in-out hover:border-gray-800 justify-between rounded-md hover:shadow-md px-10 items-center py-3 space-x-4">
                <p>
                  <b className="mr-2">Имя:</b> {el.name}
                </p>
                <p>
                  <b className="mr-2">Телефон:</b> {el.phoneNumber}
                </p>

                <p className="opacity-0 group-hover:opacity-100 duration-[1500ms] transition ease-in-out w-auto">
                  <b className="mr-2">Пользователь записался в:</b>{" "}
                  {el.insertedAt}
                </p>

                <button
                  className="place-self-end font-semibold btn-ar  bg-gray-900 text-white hover:ring-red-600 !ring-2"
                  onClick={() => handle_hide(el.id, el.status)}
                >
                  {el.status === "VISIBLE" ? "Скрыть" : "Восстановить"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminVisits;
