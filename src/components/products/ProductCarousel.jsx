import { Link } from "@material-ui/core";
import { gql } from "graphql-request";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useQuery } from "react-query";
import { ProductCard } from "../";
import { send_simple_query } from "../../api";

const get_products = gql`
  {
    getProducts(input: { filter: NEW, pagination: { page: 1, pageSize: 10 } }) {
      products {
        id
        image
        fullDesc
        name
        price
      }
    }
  }
`;

function ProductCarousel() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 1 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const { data, isLoading, isSuccess } = useQuery(
    "get_products_main",
    async () => {
      const {
        getProducts: { products },
      } = await send_simple_query(get_products);
      return products;
    }
  );

  return (
    <Carousel
      responsive={responsive}
      swipeable
      draggable
      keyBoardControl
      infinite
      autoPlay
      autoPlaySpeed={4000}
      itemClass="px-1 mb-2"
      className="w-full lgh:w-4/5"
      showDots
    >
      {!isLoading &&
        isSuccess &&
        data &&
        data.map((el) => (
          <a href={`/shop/${el.id}/${el.name}`} key={el.id}>
            <ProductCard
              name={el.name}
              price={el.price}
              img={el.image}
              desc={el.fullDesc}
              show_desc
            />
          </a>
        ))}
    </Carousel>
  );
}

export default ProductCarousel;
