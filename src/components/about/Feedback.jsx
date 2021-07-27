import React from "react";
import "react-multi-carousel/lib/styles.css";
import karen from "../../assets/about/feedback-1.png";

function Feedback() {
  return (
    <div className="flex flex-col items-center  md:text-sm">
      <div className="flex md:mb-0 mb-16 md:flex-col">
      <div className="flex flex-col items-center md:mb-10 bg-white p-10 mr-20 md:mr-0 rounded-2xl">
        <img src={karen} className="mb-8" alt="" />
        <div className="text-center mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br/> sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br/> sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        </div>
        <div className="font-bold">
            Karen Karen
        </div>
      </div>
      <div className="flex flex-col items-center md:mb-10 bg-white p-10 rounded-2xl">
        <img src={karen} className="mb-8" alt="" />
        <div className="text-center mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br/> sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br/> sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        </div>
        <div className="font-bold">
            Karen Karen
        </div>
      </div>
      </div>
      <div className="flex  md:flex-col">
      <div className="flex flex-col items-center md:mb-10 bg-white p-10 mr-20 md:mr-0 rounded-2xl">
        <img src={karen} className="mb-8" alt="" />
        <div className="text-center mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br/> sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br/> sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        </div>
        <div className="font-bold">
            Karen Karen
        </div>
      </div>
      <div className="flex flex-col items-center md:mb-10 bg-white p-10 rounded-2xl">
        <img src={karen} className="mb-8" alt="" />
        <div className="text-center mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br/> sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br/> sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        </div>
        <div className="font-bold">
            Karen Karen
        </div>
      </div>
      </div>
    
    </div>
  );
}

export default Feedback;
