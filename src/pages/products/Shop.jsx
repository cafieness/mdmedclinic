import React, { useState } from "react";
import { ProductCard } from "../../components";
import { products } from "../../db";

import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";

function Shop() {
  const [activeLeftFilter, setActiveLeftFilter] = useState("Все продукты");
  const [activeRightFilter, setActiveRightFilter] = useState("Все");
  const handleLeftFilterButton = (name) => {
    setActiveLeftFilter(name);
  };
  const handleRightFilterButton = (name) => {
    setActiveRightFilter(name);
  };
  const leftFilterButtons = [
    "Все продукты",
    "Уход за телом",
    "Уход за кожей",
    "Крема",
    "Маски",
  ];
  const rightFilterButtons = ["Все", "Новинки", "Популярное"];

  const [showMobileFilter, setShowMobileFilter] = useState(false);

  function handleCategoryFilter(name){
    setActiveLeftFilter(name);
    setShowMobileFilter(false);
  }

  return (
    <div className="bg-primary pt-40 pb-28 sm:pt-28">
      <div className="flex  flex-col items-center w-4/5 xl:w-full xl:px-10 mx-auto">
        <div className=" flex items-start">
          <div className="md:hidden pr-10 mt-24 grid gap-8 mr-20 xl:mr-10 border-black border-r-2">
            {leftFilterButtons.map((name) => (
              <button
                className={
                  activeLeftFilter === name
                    ? "shop-filter-active shop-left-filter"
                    : "shop-left-filter"
                }
                onClick={() => handleLeftFilterButton(name)}
              >
                {name}
              </button>
            ))}
          </div>
          <div>
            <div className="flex md:flex-col  justify-between items-center mb-16">
              <div className="text-2xl md:mb-10">Наша продукция</div>
              <div className="flex md:flex-wrap md:justify-center md:mb-8">
                {rightFilterButtons.map((name) => (
                  <button
                    className={
                      activeRightFilter === name
                        ? "shop-filter-active shop-right-filter md:mb-4"
                        : "shop-right-filter md:mb-4"
                    }
                    onClick={() => handleRightFilterButton(name)}
                  >
                    {name}
                  </button>
                ))}
              </div>
              <div className="hidden md:relative md:inline-block">
                <div
                  onClick={() => setShowMobileFilter(!showMobileFilter)}
                  className="cursor-pointer hidden md:flex justify-between items-center border-black border-2 rounded-3xl px-5 py-2 shop-filter-width"
                >
                  <button>{activeLeftFilter}</button>
                  <FontAwesomeIcon className="mb-1" icon={faSortDown} />
                </div>
                <div
                  className={
                    showMobileFilter
                      ? "rounded-2xl top-14 w-full absolute flex flex-col bg-primary z-10 border-t-2 border-l-2 border-r-2 border-black"
                      : "hidden"
                  }
                >
                  {leftFilterButtons.map((name) => (
                    <button
                      onClick={() => handleCategoryFilter(name)}
                      className="border-b-2 border-black text-lg rounded-2xl py-2"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-10 xl:grid-cols-3 shop-grid mb-10">
              {products.map((product) => (
                <Link to={`/shop/${product.id}/${product.name}`}>
                  <ProductCard
                    name={product.name}
                    price={product.price}
                    img={product.image}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Pagination count={10} className="self-end" />
      </div>
    </div>
  );
}

export default Shop;
