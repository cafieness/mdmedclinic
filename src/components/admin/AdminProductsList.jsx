import { Dialog } from "@material-ui/core";
import { gql } from "graphql-request";
import React, { useState } from "react";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import send_mutation, { client, send_simple_query } from "../../api";
import {
  errorComponent,
  handleGQLError,
  loadingComponent,
} from "./HelperComps";

const get_porducts_query = gql`
  {
    getProducts(
      input: { filter: ALL, pagination: { page: 1, pageSize: 1000 } }
    ) {
      id
      name
      image
      category {
        name
      }
      volume
      price
    }
  }
`;

const deleteProduct = gql`
  mutation DeleteProducts($id: ID!) {
    admin {
      deleteProduct(id: $id)
    }
  }
`;

const deleteDialogBody = (closeDialog, emptyDeleteItem, handleDelete) => {
  return (
    <div className="flex p-10 flex-col font-semibold rounded-md items-center">
      <h3 className="text-lg mb-8">
        Вы действительно хотите удалить этот продукт?
      </h3>
      <div className="flex justify-between items-center w-full">
        <button
          className="btn-ar bg-yellow-200 hover:ring-blue-600"
          onClick={() => {
            closeDialog(false);
            emptyDeleteItem(null);
          }}
        >
          Нет, не удалять не нужно
        </button>
        <button
          className="btn-ar bg-red-200 hover:ring-red-600"
          onClick={() => {
            handleDelete();
            emptyDeleteItem(null);
            closeDialog(false);
          }}
        >
          Да, удалите его
        </button>
      </div>
    </div>
  );
};

const resDialog = (closeDialog, result) => {
  return (
    <div className="flex flex-col p-10 font semibold rounded-md items-center">
      <h3 className="text-lg mb-8">
        {result.isError ? "Произошла ошибка" : "Операция выполнена"}
      </h3>
      {result.isError && <div>{JSON.stringify(result.error)}</div>}
      <button className="mt-8 btn-ar" onClick={() => closeDialog(false)}>
        Закрыть
      </button>
    </div>
  );
};

function AdminProductsList() {
  const { error, data, isLoading, isSuccess, isFetching, isError } = useQuery(
    "get_products",
    async () => {
      try {
        const { getProducts } = await client.request(get_porducts_query);
        return getProducts;
      } catch (error) {
        console.log(error);
        return {};
      }
    }
  );

  const [resultDialog, setResultDialog] = useState(false);
  const [mutRes, setMutRes] = useState({
    res: null,
    isError: false,
    isSuccess: false,
  });

  useEffect(() => {
    if (isError) {
      console.log("err");
    }
  }, [isError, error, isLoading]);

  const { mutate } = useMutation(async ({ id }) => {
    try {
      const resp = await send_mutation(deleteProduct, { id });
      return resp;
    } catch (err) {
      return err;
    }
  });

  const handleDelete = () => {
    mutate(toDeletePID, {
      onSuccess: (data) => {
        setResultDialog(true);
        setMutRes({ isSuccess: true, isError: false, res: data });
      },
      onError: (error) => {
        console.log(error);
        handleGQLError(error);
        setResultDialog(false);
        setMutRes({ isSuccess: false, isError: true, res: error });
      },
    });
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [toDeletePID, setToDeletePID] = useState(null);

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Список продукции
      </h2>
      {isError && !isLoading && !isFetching && errorComponent(error)}
      {isLoading && isFetching && loadingComponent()}
      {openDialog && (
        <Dialog
          open={openDialog}
          onClose={() => {
            setToDeletePID(null);
            setOpenDialog(false);
          }}
        >
          {deleteDialogBody(setOpenDialog, setToDeletePID, handleDelete)}
        </Dialog>
      )}
      {resultDialog && (
        <Dialog
          open={openDialog}
          onClose={() => {
            setToDeletePID(null);
            setOpenDialog(false);
          }}
        >
          {resDialog(setResultDialog, mutRes)}
        </Dialog>
      )}
      {isSuccess && !isFetching && !isLoading && (
        <div className="flex flex-col mx-6 space-y-2">
          {data.map((el) => (
            <div className="flex bg-white rounded-md hover:shadow-md px-4 py-3">
              <img
                src={el.image}
                className="rounded-full h-20 w-20 object-cover"
                alt=""
              />
              <p className="flex-1 font-semibold text-gray-900">
                {el.name} {el.volume}ml {el.price} сом
              </p>
              <button className="btn-ar bg-yellow-500  font-semibold hover:ring-yellow-300">
                Изменить
              </button>
              <button
                className="btn-ar bg-red-600 text-white hover:ring-red-800 font-semibold"
                onClick={() => {
                  setToDeletePID(el.id);
                  setOpenDialog(true);
                }}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminProductsList;
