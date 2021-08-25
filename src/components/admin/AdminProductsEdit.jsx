import { gql } from "graphql-request";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import send_mutation, { send_simple_query, send_var_query } from "../../api";
import { useURLQuery } from "../../transform";
import { errorComponent, loadingComponent } from "./HelperComps";
import { Dialog } from "@material-ui/core";
import { useHistory } from "react-router";

const get_product_query = gql`
  query getProduct($id: ID!) {
    getProductById(id: $id) {
      age
      application
      category {
        id
      }
      fullDesc
      image
      ingridients
      name
      price
      skinType
      volume
      id
      areaOfApplication
    }
  }
`;

const add_product_muts = gql`
  mutation addproduct(
    $age: String!
    $application: String!
    $categoryId: ID!
    $fullDesc: String!
    $image: String!
    $ingridients: String!
    $name: String!
    $price: Float!
    $skinType: String!
    $volume: Int!
    $areaOfApplication: String!
  ) {
    admin {
      createProduct(
        input: {
          age: $age
          application: $application
          categoryId: $categoryId
          fullDesc: $fullDesc
          image: $image
          ingridients: $ingridients
          name: $name
          price: $price
          skinType: $skinType
          volume: $volume
          areaOfApplication: $areaOfApplication
        }
      ) {
        id
      }
    }
  }
`;

const update_product_mut = gql`
  mutation updateP($id: ID!, $i: UpdateProductInput!) {
    admin {
      updateProduct(orderId: $id, input: $i) {
        id
      }
    }
  }
`;

const get_categories = gql`
  {
    getCategories {
      id
      name
    }
  }
`;

function AdminProducts() {
  const { mutate, isError, isSuccess, isLoading, error } = useMutation(
    (params) => send_mutation(add_product_muts, params)
  );

  const { data: categories, isSuccess: is_cat_loaded } = useQuery(
    "get_categories",
    async () => {
      const { getCategories } = await send_simple_query(get_categories);
      return getCategories;
    }
  );

  const {
    mutate: update_mut,
    isSuccess: up_suc,
    isError: is_up_err,
    error: up_err,
  } = useMutation((params) =>
    send_mutation(update_product_mut, { id: product_id, i: params })
  );

  const [productData, setProductData] = useState({});
  const [resDialog, setResDialog] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = productData;
    console.log(data);
    data.price = parseFloat(data.price);
    data.volume = parseInt(data.volume);
    data.categoryId = parseInt(data.categoryId);
    if (action === "edit") {
      update_mut(data, {
        onSettled: () => {
          setResDialog(true);
        },
      });
    } else {
      mutate(data, {
        onSettled: () => {
          setResDialog(true);
        },
      });
    }
  };

  const handleChange = (e) => {
    const data = Object.fromEntries(new FormData(e.target.form).entries());
    setProductData(data);
    console.log(data);
  };

  const query = useURLQuery();
  const action = query.get("action");
  const product_id = query.get("id");

  const form = useRef();

  const {
    data: prodQueryData,
    refetch,
    status,
  } = useQuery(
    "get_product",
    async () => {
      const { getProductById } = await send_var_query(get_product_query, {
        id: product_id,
      });
      return getProductById;
    },
    {
      enabled: false,
      onSuccess: (data) => {
        let dataMod = data;
        dataMod.categoryId = data.category.id;
        delete dataMod.category;
        delete dataMod.id;
        for (var key in dataMod) {
          const input = form.current.elements[key];
          input.value = dataMod[key];
        }
        setProductData(dataMod);
      },
      refetchInterval: false,
    }
  );

  const get_err = (err) => {
    const error = err.response.errors[0].message;
    if (error === "Invalid params") {
      let msg = "";
      const error_domain = err.response.errors[0].errors;
      for (var e in error_domain) {
        msg = msg + " " + e + " " + error_domain[e] + "\n";
      }
      return error + "\n" + msg;
    }
    return error;
  };

  const history = useHistory();

  const dialogBody = () => {
    return (
      <div className="p-10 rounded-md flex flex-col">
        <h2 className="text-xl text-gray-900 font-semibold mb-8">
          {isError || is_up_err
            ? "Произошла ошибка"
            : "Операция выполнена успешно"}
        </h2>
        {(isError || is_up_err) && <p>{get_err(up_err ?? error)}</p>}

        <button
          className="mt-8 btn-ar bg-red-300 text-xl font-semibold"
          onClick={() => {
            setResDialog(false);
            if (action !== "edit") {
              history.push("/admin/products");
            }
          }}
        >
          Закрыть
        </button>
      </div>
    );
  };

  useEffect(() => {
    if (action === "edit") {
      refetch();
    }
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        {action === "edit" ? "Редактировать продукт" : "Новый продукт"}
      </h2>
      {resDialog && (
        <Dialog
          open={resDialog}
          onClose={() => {
            setResDialog(false);
          }}
        >
          {dialogBody()}
        </Dialog>
      )}
      <div>
        {isLoading && loadingComponent()}
        {isError && !isLoading && errorComponent(error)}
        {isSuccess && !isLoading && <div>НАМАНА</div>}
      </div>
      <div>
        <form
          className="mx-4 flex flex-col space-y-3 my-4"
          onSubmit={handleSubmit}
          onChange={handleChange}
          ref={form}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-between">
              <label className="mr-3 font-semibold">Название:</label>
              <input
                type="text"
                className="inp-ar"
                spellCheck="false"
                autoComplete="false"
                name="name"
              />
            </div>

            <div className="flex justify-between">
              <label className="mr-3 font-semibold">Цена:</label>
              <input
                type="float"
                className="inp-ar"
                spellCheck="false"
                autoComplete="false"
                name="price"
              />
            </div>

            <div className="flex justify-between">
              <label className="mr-3 font-semibold">Возраст:</label>
              <input
                type="text"
                className="inp-ar"
                spellCheck="false"
                autoComplete="false"
                name="age"
              />
            </div>

            <div className="flex justify-between">
              <label className="mr-3 font-semibold">Объем:</label>
              <input
                type="text"
                className="inp-ar"
                spellCheck="false"
                autoComplete="false"
                name="volume"
              />
            </div>

            <div className="flex justify-between">
              <label className="mr-3 font-semibold">Тип кожи:</label>
              <input
                type="text"
                className="inp-ar"
                spellCheck="false"
                autoComplete="false"
                name="skinType"
              />
            </div>

            <div className="flex justify-between">
              <label className="mr-3 font-semibold">Картинка:</label>
              <input
                type="text"
                className="inp-ar"
                spellCheck="false"
                autoComplete="false"
                name="image"
              />
            </div>

            <div className="flex justify-between">
              <label className="mr-3 font-semibold">ID Категории:</label>
              <select
                name="categoryId"
                id=""
                className="bg-white rounded-full px-3 py-2 w-1/2 form-select"
                defaultValue="0"
              >
                <option value="0" hidden>
                  Категория
                </option>
                {is_cat_loaded &&
                  categories.map((el) => (
                    <option key={el.id} value={el.id} className="">
                      {el.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex justify-between">
              <label className="mr-3 font-semibold">Зона применения:</label>
              <input
                type="text"
                className="inp-ar"
                spellCheck="false"
                autoComplete="false"
                name="areaOfApplication"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Описание:</label>
            <textarea
              type="text"
              className="inp-ar"
              spellCheck="false"
              autoComplete="false"
              name="fullDesc"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Применение:</label>
            <textarea
              type="text"
              className="inp-ar"
              spellCheck="false"
              autoComplete="false"
              name="application"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Ингридиенты:</label>
            <textarea
              type="text"
              className="inp-ar"
              spellCheck="false"
              autoComplete="false"
              name="ingridients"
            />
          </div>

          <button
            className="btn-ar mx-auto bg-gray-900 text-white font-semibold"
            type="submit"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminProducts;
