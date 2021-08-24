import { gql } from "graphql-request";
import React, { useState } from "react";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import send_mutation, { send_simple_query } from "../../api";
import { errorComponent, loadingComponent } from "./HelperComps";
import { Dialog } from "@material-ui/core";
import { add } from "../../redux/cart";

const get_cats = gql`
  {
    getCategories {
      id
      name
    }
  }
`;

const del_mut = gql`
  mutation del_cat($id: ID!) {
    admin {
      deleteCategory(id: $id)
    }
  }
`;

const update_cat = gql`
  mutation update_cat($id: ID!, $name: String!) {
    admin {
      updateCategory(id: $id, input: { name: $name }) {
        id
      }
    }
  }
`;

const create_cat = gql`
  mutation create_cat($name: String!) {
    admin {
      addCategory(input: { name: $name }) {
        id
      }
    }
  }
`;

const deleteDialogBody = (closeDialog, emptyDeleteItem, handleDelete) => {
  return (
    <div className="flex p-10 flex-col font-semibold rounded-md items-center">
      <h3 className="text-lg mb-8">
        Вы действительно хотите удалить эту категорию?
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
          Да, удалите ее
        </button>
      </div>
    </div>
  );
};

const AddDialog = (closeDialog, createFunc, name, setName) => {
  return (
    <div className="flex p-10 flex-col font-semibold rounded-md items-center">
      <h3 className="text-lg mb-4">Ведите название</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4 py-1 px-5 focus:outline-none text-lg rounded-full bg-white ring-1 ring-green-500"
      />
      <div className="flex justify-between items-center space-x-2 w-full">
        <button
          className="btn-ar bg-yellow-200 hover:ring-blue-600"
          onClick={() => {
            closeDialog(false);
          }}
        >
          Отменить
        </button>
        <button
          className="btn-ar bg-red-200 hover:ring-red-600"
          onClick={() => {
            createFunc(name);
            closeDialog(false);
          }}
        >
          Создать
        </button>
      </div>
    </div>
  );
};

function AdminCategories() {
  const {
    data: categories,
    isError: is_cats_err,
    error: cats_err,
    isLoading: _is_c_load,
    isFetching: is_c_fet,
    isSuccess: is_c_suc,
    refetch,
  } = useQuery("get_categories", async () => {
    const { getCategories } = await send_simple_query(get_cats);
    return getCategories;
  });

  const editItem = (ev, el) => {
    let ar = [...cats];
    const id = ar.findIndex((e) => e.id === el.id);
    if (id !== -1) {
      ar[id].name = ev.target.value;
      setCats(ar);
    }
  };

  const [cats, setCats] = useState([]);

  useEffect(() => {
    setCats(categories);
  }, [categories]);

  const [dialog, setDialog] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const { mutate: updateMut } = useMutation(async ({ id, name }) => {
    const {
      admin: { updateCategory },
    } = await send_mutation(update_cat, { id, name });
    return updateCategory;
  });

  const { mutate: delMut } = useMutation(async ({ id }) => {
    const {
      admin: { deleteCategory },
    } = await send_mutation(del_mut, { id });
    return deleteCategory;
  });

  const { mutate: createMut } = useMutation(async ({ name }) => {
    const {
      admin: { addCategory },
    } = await send_mutation(create_cat, { name });
    return addCategory;
  });

  const saveEl = (el) => {
    updateMut(
      { id: el.id, name: el.name },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const delEl = () => {
    delMut(
      { id: toDeleteId },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const [addingDialog, setAdddingDialog] = useState(false);
  const [newName, setnewName] = useState("");

  const addEl = (name) => {
    createMut(
      { name },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Управление Категориями продукции
      </h2>
      <div className="flex flex-row-reverse mx-4 mb-6">
        <button
          className="btn-ar bg-green-500 hover:ring-green-700 font-semibold"
          onClick={() => setAdddingDialog(true)}
        >
          Добавить новую категорию
        </button>
      </div>

      {dialog && (
        <Dialog open={dialog} onClose={() => setDialog(false)}>
          {deleteDialogBody(setDialog, setToDeleteId, delEl)}
        </Dialog>
      )}

      {addingDialog && (
        <Dialog open={addingDialog} onClose={() => setAdddingDialog(false)}>
          {AddDialog(setAdddingDialog, addEl, newName, setnewName)}
        </Dialog>
      )}

      {is_cats_err && !is_c_fet && _is_c_load && errorComponent(cats_err)}
      {(is_c_fet || _is_c_load) && loadingComponent()}
      {is_c_suc && !is_c_fet && !_is_c_load && cats && (
        <div className="mx-6 flex flex-col">
          {cats.map((el) => (
            <div
              className="flex px-6 py-4 hover:shadow-md rounded-md"
              key={el.id}
            >
              <input
                className="text-left text-xl rounded-full px-5 py-1 bg-transparent hover:bg-white hover:shadow-sm focus:outline-none duration-500 transition ease-in-out focus:bg-white focus:ring ring-green-500"
                value={el.name}
                onInput={(e) => editItem(e, el)}
              ></input>
              <button
                className="ml-auto btn-ar bg-green-300 hover:ring-green-500 font-semibold"
                onClick={() => saveEl(el)}
              >
                Сохранить
              </button>
              <button
                className="btn-ar bg-red-300 hover:ring-red-500 ml-4 font-semibold"
                onClick={() => {
                  setDialog(true);
                  setToDeleteId(el.id);
                }}
              >
                Скрыть
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminCategories;
