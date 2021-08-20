import { Dialog } from "@material-ui/core";
import { gql } from "graphql-request";
import React, { useState } from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import send_mutation, { client, send_simple_query } from "../../api";
import { useURLQuery } from "../../transform";
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
      {result.isError &&
        result.res.includes(
          "constraint error when attempting to delete struct"
        ) && (
          <h3 className="text-3xl font-semibold mx-10">
            Если вы видите это сообщение, скорее всего вы пытаетесь удалить
            продукт, от которго зависит много данных. Удаление приведет к потере
            данных. Оставьте этот продукт как есть. Кнопка закрыть снизу
          </h3>
        )}
      {result.isError && (
        <div>
          <span dangerouslySetInnerHTML={{ __html: result.res }} />
        </div>
      )}
      <button
        className="mt-8 btn-ar bg-red-300 text-xl font-semibold"
        onClick={() => closeDialog(false)}
      >
        Закрыть
      </button>
    </div>
  );
};

function AdminProductsList() {
  const { error, data, isLoading, isSuccess, isFetching, isError, refetch } =
    useQuery("get_products", async () => {
      try {
        const { getProducts } = await client.request(get_porducts_query);
        return getProducts;
      } catch (error) {
        console.log(error);
        return {};
      }
    });

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
    mutate(
      { id: toDeletePID },
      {
        onSuccess: (data) => {
          if (data.response && data.response.status === 500) {
            setResultDialog(true);
            setMutRes({
              isSuccess: false,
              isError: true,
              res: data.response.error,
            });
            return;
          }
          setResultDialog(true);

          setMutRes({ isSuccess: true, isError: false, res: data });
          refetch();
        },
        onError: (error) => {
          setResultDialog(true);
          setMutRes({ isSuccess: false, isError: true, res: error });
        },
      }
    );
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [toDeletePID, setToDeletePID] = useState(null);

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Список продукции
      </h2>
      <div className="flex flex-row-reverse mx-4 mb-6">
        <Link
          className="bg-green-600 text-white font-semibold btn-ar"
          to="/admin/productEdit?action=new"
        >
          Новый продукт
        </Link>
      </div>
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
          maxWidth="lg"
          open={resultDialog}
          onClose={() => {
            setToDeletePID(null);
            setOpenDialog(false);
          }}
        >
          {resDialog(setResultDialog, mutRes)}
        </Dialog>
      )}
      {isSuccess && !isFetching && !isLoading && (
        <div className="flex flex-col mx-6 space-y-2 mb-8">
          {data.map((el) => (
            <div
              className="flex bg-white rounded-md hover:shadow-md px-4 py-3 items-center space-x-2"
              key={el.id}
            >
              <img
                src={el.image}
                className="rounded-full h-20 w-20 object-cover"
                alt=""
              />
              <p className="flex-1 font-semibold text-gray-900">
                {el.name} {el.volume}ml {el.price} сом
              </p>
              <Link
                className="btn-ar bg-yellow-500  font-semibold hover:ring-yellow-300 my-auto"
                to={"/admin/productEdit?action=edit&id=" + el.id}
              >
                Изменить
              </Link>
              <button
                className="btn-ar bg-red-600 text-white hover:ring-red-800 font-semibold my-auto"
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
