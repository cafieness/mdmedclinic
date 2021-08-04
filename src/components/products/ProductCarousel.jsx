import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ProductCard } from "../";

function ProductCarousel() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min:  768},
      items: 3,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 768, min: 1 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  return (
      <Carousel responsive={responsive} className="w-3/5" >
        <ProductCard
          img="https://www.eldancosmetics.it/prodotti_small/1925_AcquaDetergente.jpg"
          name="Acqua detergente micellare"
          price="100500$"
        />
        <ProductCard
          img="https://www.eldancosmetics.it/prodotti_small/1925_AcquaDetergente.jpg"
          name="Acqua detergente micellare"
          price="100500$"
        />
        <ProductCard
          img="https://www.eldancosmetics.it/prodotti_small/1925_AcquaDetergente.jpg"
          name="Acqua detergente micellare"
          price="100500$"
        />
        <ProductCard
          img="https://www.eldancosmetics.it/prodotti_small/1925_AcquaDetergente.jpg"
          name="Acqua detergente micellare"
          price="100500$"
        />
        <ProductCard
          img="https://www.eldancosmetics.it/prodotti_small/1925_AcquaDetergente.jpg"
          name="Acqua detergente micellare"
          price="100500$"
        />
        <ProductCard
          img="https://www.eldancosmetics.it/prodotti_small/1925_AcquaDetergente.jpg"
          name="Acqua detergente micellare"
          price="100500$"
        />
      </Carousel>
  );
}

export default ProductCarousel;
