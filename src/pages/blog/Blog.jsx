import React from "react";
import { gql } from "graphql-request";

import { blogPosts } from "../../db";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { send_simple_query } from "../../api";
import {
  errorComponent,
  loadingComponent,
} from "../../components/admin/HelperComps";

const get_posts = gql`
  {
    getBlogPosts {
      id
      shortDesc
      image
      title
    }
  }
`;

function Blog() {
  const { data, isError, isFetching, isLoading, isSuccess, error } = useQuery(
    "get_posts",
    async () => {
      const { getBlogPosts } = await send_simple_query(get_posts);
      return getBlogPosts;
    }
  );

  return (
    <div className="bg-blog pt-28">
      {(isLoading || isFetching) && loadingComponent()}
      {!isFetching && !isLoading && isError && errorComponent(error)}
      {!isFetching && !isLoading && data && data.length === 0 && (
        <div className="relative w-screen h-[70vh]">
          <div className="absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-semibold italic text-gray-800 text-center">
            Статей пока нет
          </div>
        </div>
      )}
      {!isFetching && !isLoading && data && data.length !== 0 && (
        <div className="flex flex-col mx-4 mb-8 mdh:flex-row mdh:justify-around lgh:mx-20">
          <img
            className="mb-8 mdh:w-1/2 lgh:w-[40%] rounded-md"
            src={data[0].image}
            alt=""
          />
          <div className="flex flex-col items-center mdh:my-auto">
            <div className="text-5xl mb-8 md:text-2xl text-center md:mb-5">
              {data[0].title}
            </div>
            <p className="text-lg mb-6 md:text-base truncate w-full mdh:max-w-[50vw]">
              {data[0].shortDesc}
            </p>
            <Link to={`/blog/${data[0].id}/${data[0].title}`}>
              <button className="text-2xl w-300 border-black border-2 rounded-3xl py-2 transform duration-200 ease-in-out hover:bg-white">
                Подробнее
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className=" bg-white">
        <div className="grid grid-cols-1 mdh:grid-cols-2 pt-10 justify-items-center">
          {!isFetching &&
            !isLoading &&
            data &&
            data.length !== 0 &&
            data.map(
              (post) =>
                data[0] !== post && (
                  <Link
                    to={`/blog/${post.id}/${post.title}`}
                    className="block hover:ring-2 rounded-lg ring-purple-700 p-4 w-450 mb-8 sm:w-300"
                  >
                    <img className="rounded-md" src={post.image} alt="" />
                    <div className="text-2xl mb-4 mt-8 font-bold">
                      {post.title}
                    </div>
                    <div className="mb-4 truncate">{post.shortDesc}</div>
                    <Link
                      to={`/blog/${post.id}/${post.title}`}
                      className="font-bold"
                    >
                      Подробнее
                    </Link>
                  </Link>
                )
            )}
        </div>
      </div>
    </div>
  );
}

export default Blog;
