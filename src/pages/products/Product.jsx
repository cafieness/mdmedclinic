import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../redux/cart";
import { useQuery } from "react-query";
import { send_var_query } from "../../api";
import {
  errorComponent,
  loadingComponent,
} from "../../components/admin/HelperComps";

const get_product = `
  query getProduct($id: ID!) {
    getProductById(id: $id) {
      age
      id
      application
      fullDesc
      image
      ingridients
      name
      price
      skinType
      volume
    }
  }
`;

function Product() {
  const { id } = useParams();
  const cart = useSelector((state) => state.cart.cart);

  const { data, error, refetch, isSuccess, isError, isLoading, isFetching } =
    useQuery(
      "get_user",
      async () => {
        const { getProductById } = await send_var_query(get_product, {
          id: id,
        });
        return getProductById;
      },
      {
        onSuccess: (data) => {},
      }
    );
  let [productCounter, setProductCounter] = useState(1);
  const [showDescription, setShowDescription] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [showIngridients, setShowIngridients] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const isLoggedIn = useSelector((state) => (state.user.user ? true : false));

  const similarProducts = [];

  const dialogBody = isLoggedIn ? (
    <div className="p-10 flex flex-col items-center">
      <FontAwesomeIcon
        className="text-5xl mb-8 text-green-400"
        icon={faCheck}
      />
      <div>Добавлено в корзину</div>
    </div>
  ) : (
    <div className="p-10">Сначала нужно войти</div>
  );

  useEffect(() => {
    setTimeout(() => {
      setOpenDialog(false);
    }, 2500);
  }, [openDialog]);

  const dispatch = useDispatch();
  let time = new Date();
  function handleSubmit() {
    setOpenDialog(true);
    if (!isLoggedIn) {
      setTimeout(() => {
        setRedirectToLogin(true);
      }, 2500);
    } else {
      console.log(cart);
      dispatch(add({ product: data, amount: productCounter }));
    }
  }
  if (redirectToLogin) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="py-40 bg-primary sm:py-20">
      {isError && errorComponent(error)}
      {(isLoading || isFetching) && isError && loadingComponent()}
      {isSuccess && data && !isLoading && !isFetching && (
        <div className="flex flex-col items-center">
          <div className="mx-8 md:flex-col min-w-[90%] flex justify-between items-center ">
            <div className=" md:order-3 product-left-description min-w-[33%] flex-col flex lgh:pr-6">
              <div className="text-3xl mb-10 italic text-left ">
                {data.name}
              </div>
              <table className="product-table">
                <tr className="flex justify-between">
                  <th>Зона применения</th>
                  <td>Лицо</td>
                </tr>
                <tr className="flex justify-between">
                  <th className="text-left w-1/2">Типы кожи</th>
                  <td className="text-right">{data.skinType}</td>
                </tr>
                <tr className="flex justify-between">
                  <th>Возраст</th>
                  <td>{data.age}</td>
                </tr>
              </table>
            </div>
            <img
              className="md:order-1 w-auto md:mb-10 flex-grow  mdh:min-w-[33%] rounded-md hover:shadow duration-300 transition"
              src={data.image}
              alt=""
            />
            <div className="md:order-2 md:mb-16 min-w-[33%] lgh:mx-10 product-right-description flex flex-col">
              <div className="text-4xl italic">{data.price} сом</div>
              <div className="italic my-4">{data.volume} мл.</div>
              <div className="flex mb-10 py-4 border-b-2 border-t-2 justify-between border-black">
                <button
                  onClick={() =>
                    productCounter === 1
                      ? setProductCounter(1)
                      : setProductCounter(--productCounter)
                  }
                >
                  <FontAwesomeIcon className="text-2xl" icon={faMinus} />
                </button>
                <div className="text-4xl font-bold italic">
                  {productCounter}
                </div>
                <button onClick={() => setProductCounter(++productCounter)}>
                  <FontAwesomeIcon className="text-2xl" icon={faPlus} />
                </button>
              </div>
              <button
                onClick={handleSubmit}
                className="text-xl text-white bg-black py-3 hover:text-black hover:bg-white border-black border-2 transform duration-300 ease-in-out"
              >
                В корзину
              </button>
              <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                {dialogBody}
              </Dialog>
            </div>
          </div>
          <div className="mt-20 w-full">
            <div className="py-4 px-4  border-t-2 border-b-2 border-black mx-8">
              <div className="flex justify-between">
                <div className="text-2xl italic">Описание</div>
                <button onClick={() => setShowDescription(!showDescription)}>
                  <FontAwesomeIcon className="text-2xl" icon={faPlus} />
                </button>
              </div>
              <CSSTransition
                in={showDescription}
                timeout={300}
                classNames="showDescription"
                unmountOnExit
              >
                <div className="italic my-4 ">{data.fullDesc}</div>
              </CSSTransition>
            </div>
            <div className="py-4 px-4 border-b-2 border-black mx-8">
              <div className="flex justify-between">
                <div className="text-2xl italic">Применение</div>
                <button onClick={() => setShowApplication(!showApplication)}>
                  <FontAwesomeIcon className="text-2xl" icon={faPlus} />
                </button>
              </div>
              <CSSTransition
                in={showApplication}
                timeout={300}
                classNames="showDescription"
                unmountOnExit
              >
                <div className="italic my-4 ">{data.application}</div>
              </CSSTransition>
            </div>
            <div className="py-4 px-4 border-b-2 border-black mx-8">
              <div className="flex justify-between">
                <div className="text-2xl italic">Ингридиенты</div>
                <button onClick={() => setShowIngridients(!showIngridients)}>
                  <FontAwesomeIcon className="text-2xl" icon={faPlus} />
                </button>
              </div>
              <CSSTransition
                in={showIngridients}
                timeout={300}
                classNames="showDescription"
                unmountOnExit
              >
                <div className="italic my-4 ">{data.ingridients}</div>
              </CSSTransition>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
