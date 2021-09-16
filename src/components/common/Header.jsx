import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faMap,
  faMobileAlt,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

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

  const loc = useLocation();
  const isEng = loc.search === "?lang=en";

  const user = () => (
    <div>
      {isLoggedIn && (
        <div className="flex space-x-4">
          <div ref={refAccount}>
            <button
              onClick={() => {
                setIsAccountOpen(!isAccountOpen);
              }}
            >
              <FontAwesomeIcon className="text-3xl" icon={faUser} />
            </button>
            <div className={isAccountOpen ? "dropdown space-y-4" : "hidden"}>
              <Link to="/profile">{isEng ? "Profile" : "Профиль"}</Link>
              {isAdmin && (
                <Link to="/admin">{isEng ? "Admin page" : "Админ панель"}</Link>
              )}
              <div
                className="cursor-pointer"
                onClick={() => {
                  dispatch(logout());
                  history.push("/");
                }}
              >
                {isEng ? "Sign out" : "Выйти"}
              </div>
            </div>
          </div>

          <Link to="/basket" className="relative">
            <FontAwesomeIcon className="text-3xl" icon={faShoppingCart} />
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
  );

  const langButtons = () => (
    <div className="my-2 scale-125">
      {loc.pathname === "/" && loc.search !== "?lang=en" && (
        <Link to="/?lang=en">
          <img src="https://auca.kg/templates/_sources/flag_en.gif" alt="" />
        </Link>
      )}
      {loc.pathname === "/" && loc.search === "?lang=en" && (
        <Link to="/">
          <img src="https://auca.kg/templates/_sources/flag_ru.gif" alt="" />
        </Link>
      )}
    </div>
  );

  return (
    <nav
      className={
        "nav z-50 fixed  w-full mdh:px-7 lgh:px-14 xlh:px-40 xl2:px-64" +
        (navbar ? " active " : "")
      }
    >
      <div
        name="mobile"
        className="mdh:hidden flex justify-between px-6 py-0.5"
      >
        <Link to={"/" + (isEng ? "?lang=en" : "")}>
          <img src={logo} className="w-[7.5rem] h-auto" alt="" />
        </Link>
        <button
          onClick={() => setIsToggle(!isToggle)}
          className={"hamburger ml-auto " + (isToggle ? " active " : "")}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <div className={"nav-menu" + (isToggle ? " active " : "")}>
          <Link to={"/" + (isEng ? "?lang=en" : "")}>
            <img src={logo} className="w-[5.5rem] h-auto mx-auto mb-2" alt="" />
          </Link>
          <div className="mx-auto">{user()}</div>
          <div className="flex flex-col my-2 border-b border-[#101010] mx-3">
            <Link to={"/" + (isEng ? "?lang=en" : "")} className="nav-link-mob">
              {isEng ? "Home" : "Главная"}
            </Link>
            <Link to="/gallery" className="nav-link-mob">
              {isEng ? "Gallery" : "Галерея"}
            </Link>
            <Link to="/shop" className="nav-link-mob">
              {isEng ? "Products" : "Продукция"}
            </Link>
            <Link to="/blog" className="nav-link-mob">
              {isEng ? "Blog" : "Блог"}
            </Link>
            <Link className="nav-link-mob" to="/about">
              {isEng ? "About" : "О нас"}
            </Link>
            <Link className="nav-link-mob" to="/education">
              {isEng ? "Education" : "Обучение"}
            </Link>
            {isLoggedIn === false && (
              <Link to="/login" className="nav-link-mob">
                {isEng ? "Sign in" : "Войти"}
              </Link>
            )}
            <Link className="nav-link-mob" to="/contacts">
              {isEng ? "Contacts" : "Контакты"}
            </Link>
            <div className="nav-link-mob relative" ref={refProcedure}>
              <button
                className=""
                onClick={() => {
                  setIsProcedureOpen(!isProcedureOpen);
                }}
              >
                {isEng ? "Procedures" : "Процедуры"}
              </button>
              <div
                className={isProcedureOpen ? "dropdown-ar space-y-4" : "hidden"}
              >
                <Link to="/procedures/inject">
                  {isEng ? "Injection procedures" : "Инъекционные процедуры"}
                </Link>
                <Link to="/procedures/skincare">
                  {isEng ? "Skincare" : "Уход за кожей"}
                </Link>
                <Link to="/procedures/apparat">
                  {isEng ? "Apparate cosmetology" : "Аппаратная косметология"}
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2 items-center">
            <div className="flex space-x-4 items-center">
              <FontAwesomeIcon
                className="h-16 w-16 text-3xl text-gray-500"
                icon={faMobileAlt}
              ></FontAwesomeIcon>
              <div>
                <a className="block" href="tel:+996556877782">
                  +996 556 877 782
                </a>
                <a className="block" href="tel:+996707600726">
                  +996 707 600 726
                </a>
              </div>
            </div>
            <div className="flex space-x-4 items-center">
              <FontAwesomeIcon
                className="h-16 w-16 text-3xl text-gray-500"
                icon={faMap}
              ></FontAwesomeIcon>
              <div className="text-center">
                <p>{isEng ? "Address" : "Адрес"}</p>
                <a
                  className="block"
                  href="https://yandex.ru/maps/org/klinika_meerim_davletovoy/134434222710/?ll=74.582214%2C42.871052&z=18"
                >
                  {isEng ? "Moscow st. 191" : "ул. Московская, д.191"}
                </a>
              </div>
            </div>
            <div className="flex space-x-4 items-center">
              <FontAwesomeIcon
                className="h-16 w-16 text-3xl text-gray-500"
                icon={faClock}
              ></FontAwesomeIcon>
              <div className="text-center">
                <p>{isEng ? "Working time" : "Рабочее время"}</p>
                <p>{isEng ? "Mn-Sn" : "Понедельник-воскресенье"}</p>
                <p>10:00-22:00</p>
              </div>
            </div>
          </div>
          <Link
            className="btn-ar btn-gradient text-white font-semibold text-lg rounded-lg mt-4 mx-auto"
            to={"/contacts"}
          >
            {isEng ? "Make an appointment" : "Записаться на прием"}
          </Link>
          <div className="mx-auto scale-100">{langButtons()}</div>
        </div>
      </div>

      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>

      <div name="full" className="hidden mdh:flex justify-center">
        <div className="flex-1 flex w-full items-center justify-evenly">
          <div className="nav-link " ref={refAbout}>
            <button
              className="dropbtn"
              onClick={() => {
                setIsAboutOpen(!isAboutOpen);
              }}
            >
              {isEng ? "About" : "О нас"}
            </button>
            <div className={isAboutOpen ? "dropdown space-y-4" : "hidden"}>
              <Link to="/about">{isEng ? "About" : "О нас"}</Link>
              <Link to="/education">{isEng ? "Education" : "Обучение"}</Link>
              <Link to="/contacts">{isEng ? "Contacts" : "Контакты"}</Link>
            </div>
          </div>
          <div className="nav-link" ref={refProcedure}>
            <button
              className="dropbtn"
              onClick={() => {
                setIsProcedureOpen(!isProcedureOpen);
              }}
            >
              {isEng ? "Procedures" : "Процедуры"}
            </button>
            <div className={isProcedureOpen ? "dropdown space-y-4" : "hidden"}>
              <Link to="/procedures/inject">
                {isEng ? "Injection procedures" : "Инъекционные процедуры"}
              </Link>
              <Link to="/procedures/skincare">
                {isEng ? "Skincare" : "Уход за кожей"}
              </Link>
              <Link to="/procedures/apparat">
                {isEng ? "Apparate cosmetology" : "Аппаратная косметология"}
              </Link>
            </div>
          </div>
          <Link to="/gallery" className="nav-link">
            {isEng ? "Gallery" : "Галерея"}
          </Link>
        </div>
        <Link
          name="main logo"
          to={"/" + (isEng ? "?lang=en" : "")}
          className=""
        >
          <img className="py-1" src={logo} alt="" />
        </Link>
        <div className="flex-1 flex justify-evenly items-center">
          <Link to="/shop" className="">
            {isEng ? "Products" : "Продукция"}
          </Link>
          <Link to="/blog" className="">
            {isEng ? "Blog" : "Блог"}
          </Link>
          {user()}
          {isLoggedIn === false && (
            <Link to="/login" className="">
              {isEng ? "Sign in" : "Войти"}
            </Link>
          )}
          {langButtons()}
        </div>
      </div>
    </nav>
  );
}

export default Header;
