import React from "react";
import img1 from "../assets/gallery/1.JPG";
import img2 from "../assets/gallery/2.PNG";
import img3 from "../assets/gallery/3.JPG";
import img4 from "../assets/gallery/4.JPG";
import img5 from "../assets/gallery/5.JPG";
import img6 from "../assets/gallery/6.JPG";
import img7 from "../assets/gallery/7.JPG";
import img8 from "../assets/gallery/8.JPG";
import img9 from "../assets/gallery/9.JPG";
import img10 from "../assets/gallery/10.JPG";
import img11 from "../assets/gallery/11.JPG";
import img12 from "../assets/gallery/12.JPG";
import img13 from "../assets/gallery/13.JPG";
import img14 from "../assets/gallery/14.JPG";
import img15 from "../assets/gallery/15.JPG";
import img16 from "../assets/gallery/16.JPG";
import img17 from "../assets/gallery/17.JPG";
import img18 from "../assets/gallery/18.JPG";
import img19 from "../assets/gallery/19.JPG";
import img20 from "../assets/gallery/20.JPG";
import img21 from "../assets/gallery/21.JPG";
import img22 from "../assets/gallery/22.JPG";
import img23 from "../assets/gallery/23.JPG";
import img24 from "../assets/gallery/24.JPG";
import img25 from "../assets/gallery/25.JPG";
import img26 from "../assets/gallery/26.JPG";
import img27 from "../assets/gallery/27.JPG";
import img28 from "../assets/gallery/28.JPG";
import img29 from "../assets/gallery/29.JPG";

function Gallery() {
  const images = [img1, img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12,img13,img14,img15,img16,img17,img20,img21,img22,img23,img24,img25,img26,img27,img28,img29];
  return (
    <div className="bg-primary pt-40 pb-28 sm:pt-32">
      <div className="flex flex-col items-center px-5">
        <div className="text-5xl md:text-2xl mb-16">Галерея</div>
        <div className="gallery-grid grid grid-cols-3 gap-20 md:grid-cols-2">
          {images.map((image) => (
            <div>
              <img className="w-[250px] h-[250px]" src={image} alt="" />
              <div className="text-xl mt-4 flex justify-between">
                <div>До</div>
                <div>После</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
