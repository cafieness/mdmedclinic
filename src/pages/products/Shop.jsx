import React, { useState, useEffect } from "react";
import { ProductCard } from "../../components";

import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { readFilter } from "../../transform";

import { useQuery } from "react-query";
import { send_var_query } from "../../api";
import {
  errorComponent,
  loadingComponent,
} from "../../components/admin/HelperComps";
import { gql } from "graphql-request";

const get_products = gql`
  query getProducts(
    $filter: ProductFilter!
    $page: Int!
    $productCategory: String
  ) {
    getProducts(
      input: {
        filter: $filter
        pagination: { page: $page, pageSize: 16 }
        productCategory: $productCategory
      }
    ) {
      products {
        id
        image
        name
        price
        category {
          name
          id
        }
        volume
      }
      pagination {
        currentPage
        pageSize
        totalCount
      }
    }
    getCategories {
      id
      name
    }
  }
`;

function Shop() {
  const [activeLeftFilter, setActiveLeftFilter] = useState("Все");
  const [activeRightFilter, setActiveRightFilter] = useState("Все");
  const [page, setPage] = useState(1);
  const handleLeftFilterButton = (name) => {
    setActiveLeftFilter(name);
  };
  const handleRightFilterButton = (name) => {
    setActiveRightFilter(name);
  };
  const [leftFilterButtons, setLeftFilterButtons] = useState([
    "Все",
    "Уход за телом",
    "Уход за кожей",
    "Крема",
    "Маски",
  ]);

  const rightFilterButtons = ["Все", "Новинки", "Популярное"];
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  function handleCategoryFilter(name) {
    setActiveLeftFilter(name);
    setShowMobileFilter(false);
  }
  const { data, error, refetch, isSuccess, isError, isLoading, isFetching } =
    useQuery("get_user", async () => {
      const { getProducts, getCategories } = await send_var_query(
        get_products,
        {
          filter: readFilter(activeRightFilter),
          page,
          productCategory: activeLeftFilter,
        }
      );
      return { getCategories, getProducts };
    });
  useEffect(() => {
    refetch();
  }, [page, activeLeftFilter, activeRightFilter]);

  useEffect(() => {
    if (data.getCategories) {
      let filters = data.getCategories.map((el) => el.name);
      setLeftFilterButtons(["Все", ...filters]);
    }
  }, [isSuccess, data]);

  return (
    <div
      className={
        isSuccess &&
        !isLoading &&
        !isFetching &&
        data &&
        data.getProducts.products.length < 5
          ? "bg-primary pt-40 pb-28 sm:pt-28 h-screen"
          : "bg-primary pt-40 pb-28 sm:pt-28"
      }
    >
      <div className="flex  flex-col items-center w-4/5 xl:w-full xl:px-10 mx-auto">
        <div className=" flex items-start">
          <div className="md:hidden pr-10 mt-24 grid gap-8 mr-20 xl:mr-10 border-black border-r-2">
            {isSuccess &&
              leftFilterButtons.map((name) => (
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
                  {data &&
                    leftFilterButtons.map((name) => (
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
              {isError && errorComponent(error)}
              {(isLoading || isFetching) && isError && loadingComponent()}
              {isSuccess &&
                data &&
                !isLoading &&
                !isFetching &&
                data.getProducts.products.map((product) => (
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
        {isSuccess && data && !isLoading && !isFetching && (
          <Pagination
            disabled={data.getProducts.pagination.totalCount <= 16}
            count={
              data.getProducts.pagination.totalCount % 16 === 0
                ? data.getProducts.pagination.totalCount / 16
                : data.getProducts.pagination.totalCount / 16 + 1
            }
            className="self-end"
            onChange={(el, value) => {
              setPage(value);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Shop;
