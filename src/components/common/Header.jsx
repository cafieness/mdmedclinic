import React, { useState, useRef, useEffect  } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";


function Header() {
  const [isToggle, setIsToggle] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isProcedureOpen, setIsProcedureOpen] = useState(false)
  const location = useLocation();

  const refAbout = useRef(null);
  const refProcedure = useRef(null);

  useEffect(() => {
    setIsToggle(false);
    setIsAboutOpen(false);
    setIsProcedureOpen(false);
  }, [location]);

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (isAboutOpen && refAbout.current && !refAbout.current.contains(e.target)) {
        setIsAboutOpen(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isAboutOpen])

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (isProcedureOpen && refProcedure.current && !refProcedure.current.contains(e.target)) {
        setIsProcedureOpen(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isProcedureOpen])
  
  return (
    <nav class="nav flex justify-between items-center  py-2 px-48 lg:px-10  z-50 fixed bg-white w-full ">
      <Link to="/">
        <img src={logo} className="w-2/5 hidden-mobile" alt="" />
      </Link>
      <div
        className={
          isToggle
            ? " active nav-menu transition duration-300 ease-in-out w-full "
            : "nav-menu top-5 flex w-full items-center"
        }
      >
        <Link to="/" className="nav-link hidden-mobile">
          Главная
        </Link>
        <div className="nav-link " ref={refAbout}>
          <button className="dropbtn" for="btnControl" onClick={()=>{
            setIsAboutOpen(!isAboutOpen)
          }}>
            О нас
          </button>
           <div className={isAboutOpen?"dropdown space-y-4":"hidden"}>
              <Link to="/about">О нас</Link>
              <Link to="/education">Обучение</Link>
              <Link to="/contacts">Контакты</Link>
            </div> 
        </div>

        <div className="nav-link" ref={refProcedure}>
          <button className="dropbtn" for="btnControl" onClick={()=>{
            setIsProcedureOpen(!isProcedureOpen)
          }}>
            Процедуры
          </button >
          <div  className={isProcedureOpen?"dropdown space-y-4":"hidden"} for="btnControl">
              <Link to="/procedures/inject">Инъекционные процедуры</Link>
              <Link to="/procedures/skincare">Уход за кожей</Link>
              <Link to="/procedures/apparat">Аппаратная косметология</Link>
            </div>
        </div>
        <Link to="/gallery" className="nav-link">
          Галерея
        </Link>
        <Link to="/">
          <img className=" sm:hidden  w-4/5" src={logo} alt="" />
        </Link>
        <Link to="/catalogue" className="nav-link ">
          Продукция
        </Link>
        <Link to="/blog" className="nav-link">
          Блог
        </Link>
        <Link to="/login" className="nav-link">
          Войти
        </Link>
        {/* <Link to="/account" className="nav-link">
            <FontAwesomeIcon className="text-2xl" icon={faUser} />
          </Link>
          <Link to="/cart" className="nav-link">
            <FontAwesomeIcon className="text-2xl" icon={faShoppingCart} />
          </Link> */}
      </div>

      <button
        onClick={() => setIsToggle(!isToggle)}
        className={isToggle ? "hamburger active" : "hamburger"}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
    </nav>
  );
}


export default Header;