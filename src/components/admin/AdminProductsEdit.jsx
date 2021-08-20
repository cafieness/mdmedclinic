import { gql } from "graphql-request";
import React from "react";
import { useMutation } from "react-query";
import send_mutation from "../../api";
import { useURLQuery } from "../../transform";
import { errorComponent, loadingComponent } from "./HelperComps";

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
        }
      ) {
        id
      }
    }
  }
`;

function AdminProducts() {
  const { mutate, isError, isSuccess, isLoading, error } = useMutation(
    (params) => send_mutation(add_product_muts, params)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    console.log(data);
    data.price = parseFloat(data.price);
    data.volume = parseInt(data.volume);
    mutate(data);
  };

  const query = useURLQuery();
  const action = query.get("action");
  const product_id = query.get("id");

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        {action === "edit" ? "Редактировать продукт" : "Новый продукт"}
      </h2>
      <div>
        {isLoading && loadingComponent()}
        {isError && !isLoading && errorComponent(error)}
        {isSuccess && !isLoading && <div>НАМАНА</div>}
      </div>
      <div>
        <form
          className="mx-4 flex flex-col space-y-3 my-4"
          onSubmit={handleSubmit}
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
                type="number"
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
              <input
                type="text"
                className="inp-ar"
                spellCheck="false"
                autoComplete="false"
                name="categoryId"
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
