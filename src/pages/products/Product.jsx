import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { products } from "../../db";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";
import { ProductCard } from "../../components";
import Dialog from "@material-ui/core/Dialog";

function getProduct(id) {
  for (let i = 0; i < products.length; i++) {
    if (id == products[i].id) {
      return products[i];
    }
  }
}

function Product() {
  const { id } = useParams();
  const product = getProduct(id);
  let [productCounter, setProductCounter] = useState(1);
  const [showDescription, setShowDescription] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [showIngridients, setShowIngridients] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const similarProducts = [];

  const dialogBody = (
    <div className="p-10 flex flex-col items-center">
      <FontAwesomeIcon className="text-5xl mb-8 text-green-400" icon={faCheck} />
      <div>Добавлено в корзину</div>
    </div>
  );

  useEffect(() => {
     setTimeout(() => {
      setOpenDialog(false);
    }, 2500);
  }, [openDialog]);

  function getSimilarProducts() {
    for (let i = 0; i < products.length; i++) {
      if (similarProducts.length === 6) {
        break;
      }
      if (
        product.category === products[i].category &&
        product.name !== products[i].name
      ) {
        similarProducts.push(products[i]);
      }
    }
  }
  getSimilarProducts();

  return (
    <div className="py-40 bg-primary sm:py-20">
      <div className="flex flex-col items-center">
        <div className="product-width md:flex-col flex justify-between items-center ">
          <div className=" md:order-3 product-left-description md:flex-col md:flex md:items-center  md:mr-0 mr-10">
            <div className="text-3xl mb-10 italic">{product.name}</div>
            <div className="mb-8 italic">{product.shortDesc}</div>
            <table className="product-table">
              <tr className="flex justify-between">
                <th>Зона применения</th>
                <td>{product.areaOfapplication}</td>
              </tr>
              <tr className="flex justify-between">
                <th className="text-left w-1/2">Типы кожи</th>
                <td className="text-right">{product.skinType}</td>
              </tr>
              <tr className="flex justify-between">
                <th>Возраст</th>
                <td>{product.age}</td>
              </tr>
            </table>
          </div>
          <img className="md:order-1 md:w-4/5 md:mb-10  w-2/3" src={product.image} alt="" />
          <div className="md:order-2 md:mb-16  product-right-description ml-10 md:ml-0 flex flex-col">
            <div className="text-4xl italic">{product.price}</div>
            <div className="italic my-4">{product.volume}</div>
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
              <div className="text-4xl font-bold italic">{productCounter}</div>
              <button onClick={() => setProductCounter(++productCounter)}>
                <FontAwesomeIcon className="text-2xl" icon={faPlus} />
              </button>
            </div>
            <button
              onClick={() => setOpenDialog(true)}
              className="text-xl text-white bg-black py-3 hover:text-black hover:bg-white border-black border-2 transform duration-300 ease-in-out"
            >
              В корзину
            </button>
            <Dialog open={openDialog} onClose={()=>setOpenDialog(false)}>{dialogBody}</Dialog>
          </div>
        </div>
        <div className="product-width mt-20">
          <div className="py-4 px-4  border-t-2 border-b-2 border-black">
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
              <div className="italic my-4 ">{product.fullDescription}</div>
            </CSSTransition>
          </div>
          <div className="py-4 px-4 border-b-2 border-black">
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
              <div className="italic my-4 ">{product.Application}</div>
            </CSSTransition>
          </div>
          <div className="py-4 px-4 border-b-2 border-black">
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
              <div className="italic my-4 ">{product.Ingridients}</div>
            </CSSTransition>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="italic text-2xl mt-20 mb-14 sm:text-xl">
            Другие продукты из серии
          </div>
          <div className="grid grid-cols-3 gap-20 md:grid-cols-2 product-similar">
            {similarProducts.map((pr) => (
              <a href={`/shop/${pr.id}/${pr.name}`}>
                <ProductCard name={pr.name} img={pr.image} price={pr.price} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
