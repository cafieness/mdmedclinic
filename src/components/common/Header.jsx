import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user";
import { useLoginRedirect } from "../../transform";

function Header() {
  const [isToggle, setIsToggle] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isProcedureOpen, setIsProcedureOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const location = useLocation();
  const isLoggedIn = useSelector((state) => (state.user.user ? true : false));
  const isAdmin = useSelector((state) => {
    if (!isLoggedIn) {
      return false;
    }
    if (state.user.user.isAdmin) {
      return true;
    } else {
      return false;
    }
  });

  const refAbout = useRef(null);
  const refProcedure = useRef(null);
  const refAccount = useRef(null);
  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  useEffect(() => {
    setIsToggle(false);
    setIsAboutOpen(false);
    setIsProcedureOpen(false);
    setIsAccountOpen(false);
  }, [location]);

  const dispatch = useDispatch();

  const cartLength = useSelector((state) =>
    state.cart.cart ? state.cart.cart.length : false
  );

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isAboutOpen &&
        refAbout.current &&
        !refAbout.current.contains(e.target)
      ) {
        setIsAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isAboutOpen]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isProcedureOpen &&
        refProcedure.current &&
        !refProcedure.current.contains(e.target)
      ) {
        setIsProcedureOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isProcedureOpen]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isAccountOpen &&
        refAccount.current &&
        !refAccount.current.contains(e.target)
      ) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isAccountOpen]);

  const history = useHistory();

  return (
    <nav
      className={
        navbar
          ? "active nav flex justify-between items-center  py-2 px-48 lg:px-10  z-50 fixed  w-full"
          : "nav flex justify-between items-center  py-2 px-48 lg:px-10  z-50 fixed  w-full "
      }
    >
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
          <button
            className="dropbtn"
            for="btnControl"
            onClick={() => {
              setIsAboutOpen(!isAboutOpen);
            }}
          >
            О нас
          </button>
          <div className={isAboutOpen ? "dropdown space-y-4" : "hidden"}>
            <Link to="/about">О нас</Link>
            <Link to="/education">Обучение</Link>
            <Link to="/contacts">Контакты</Link>
          </div>
        </div>

        <div className="nav-link" ref={refProcedure}>
          <button
            className="dropbtn"
            for="btnControl"
            onClick={() => {
              setIsProcedureOpen(!isProcedureOpen);
            }}
          >
            Процедуры
          </button>
          <div
            className={isProcedureOpen ? "dropdown space-y-4" : "hidden"}
            for="btnControl"
          >
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
        <Link to="/shop" className="nav-link ">
          Продукция
        </Link>
        <Link to="/blog" className="nav-link">
          Блог
        </Link>
        {isLoggedIn === false && (
          <Link to="/login" className="nav-link">
            Войти
          </Link>
        )}
        {isLoggedIn && (
          <div className="flex sm:flex-col">
            <div className="mr-8 nav-link sm:mr-0" ref={refAccount}>
              <button
                className="dropbtn"
                for="btnControl"
                onClick={() => {
                  setIsAccountOpen(!isAccountOpen);
                }}
              >
                <FontAwesomeIcon className="text-2xl" icon={faUser} />
              </button>
              <div className={isAccountOpen ? "dropdown space-y-4" : "hidden"}>
                <Link to="/profile">Профиль</Link>
                {isAdmin && <Link to="/admin">Админ панель</Link>}
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(logout());
                    history.push("/");
                  }}
                >
                  Выйти
                </div>
              </div>
            </div>

            <Link to="/basket" className="nav-link relative">
              <FontAwesomeIcon className="text-2xl" icon={faShoppingCart} />
              <div
                className="top-3 italic left-3 absolute h-7 w-7 rounded-full bg-gray-300 text-center"
                hidden={cartLength <= 0}
              >
                {cartLength}
              </div>
            </Link>
          </div>
        )}
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
