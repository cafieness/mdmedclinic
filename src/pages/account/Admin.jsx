import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Visits,
  BlogList,
  Courses,
  Orders,
  Products,
} from "../../components/admin";

function Admin() {
  let tabs = [
    { name: "Блог", key: "blogList" },
    { name: "Заказы", key: "orders" },
    { name: "Записи на курсы", key: "courses" },
    { name: "Записи на посещение", key: "visits" },
    { name: "Продукция", key: "products" },
  ];

  const { tab } = useParams();
  const [selectedTab, setSelectedTab] = useState(tab ?? "blogList");

  const handleClick = (key) => {
    setSelectedTab(key);
  };

  const selectComponent = () => {
    switch (selectedTab) {
      case "blogList":
        return <BlogList />;
      case "visits":
        return <Visits />;
      case "orders":
        return <Orders />;
      case "courses":
        return <Courses />;
      case "products":
        return <Products />;
      default:
        return <BlogList />;
    }
  };

  return (
    <div className="pt-28 h-screen">
      <div className="mdh:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold">
        Данная страница не доступна с мобильных устройств. Воспользуйтесь
        компьютером или планшетом
      </div>
      <div className="hidden mdh:flex mx-6">
        <div className="flex flex-col space-y-3 font-semibold text-gray-900 mb-4">
          <h2 className="pl-3 mb-5">Админ панель</h2>
          {tabs.map((el) => (
            <Link
              to={"/admin/" + el.key}
              key={el.key}
              className={
                "py-2 px-3 rounded-full ring-2 cursor-pointer transition duration-150 ease-in-out " +
                (selectedTab === el.key
                  ? "ring-green-600"
                  : "ring-transparent hover:ring-purple-800")
              }
              onClick={() => handleClick(el.key)}
            >
              {el.name}
            </Link>
          ))}
        </div>
        <div>{selectComponent()}</div>
      </div>
    </div>
  );
}

export default Admin;
