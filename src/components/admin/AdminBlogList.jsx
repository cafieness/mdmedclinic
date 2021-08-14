import { gql } from "graphql-request";
import React from "react";
import { useMutation, useQuery } from "react-query";
import send_mutation, { send_simple_query } from "../../api";

const get_posts_query = gql`
  {
    getBlogPosts {
      id
      image
      publishDate
      title
    }
  }
`;

const delete_post_query = gql`
  mutation deletePost($id: ID!) {
    admin {
      deleteBlogPost(id: $id)
    }
  }
`;

function AdminBlogList() {
  const { isSuccess, data, isError, error, isLoading, refetch } = useQuery(
    "posts",
    async () => {
      const { getBlogPosts } = await send_simple_query(get_posts_query);
      return getBlogPosts;
    }
  );

  const delete_post = useMutation(({ id }) =>
    send_mutation(delete_post_query, { id: id })
  );

  const delete_post_handler = (id) => {
    delete_post.mutateAsync({ id }).then(() => {
      if (delete_post.isSuccess) {
        refetch();
      }
    });
  };

  const errorComponent = () => {
    return (
      <div className="absolute font-semibold top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2">
        Произошла ошибка {JSON.stringify(error)}
      </div>
    );
  };

  const loadingComponent = () => {
    return (
      <div className="absolute font-semibold top-1/2 right-1/2  transform translate-x-1/2 -translate-y-1/2">
        Загрузка...
      </div>
    );
  };

  return (
    <div className="relative w-full h-full">
      {isError && errorComponent()}
      {isLoading || (delete_post.isLoading && loadingComponent())}
      {isSuccess && (
        <div className="">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Управление блогом
          </h2>
          <div className="flex flex-col space-y-3">
            {data.map((el) => (
              <div className="flex p-3 bg-gray-50 rounded-md hover:shadow-md transition duration-200 items-center space-x-2">
                <img
                  src={el.image}
                  className="rounded-full h-20 w-20 object-cover"
                  alt=""
                />
                <p className="flex-1 text-gray-900 font-semibold text-center">
                  {el.title}
                </p>
                <button className="btn-ar bg-yellow-500  font-semibold hover:ring-yellow-300">
                  Изменить
                </button>
                <button
                  className="btn-ar bg-red-600 text-white hover:ring-red-800 font-semibold"
                  onClick={() => delete_post_handler(el.id)}
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminBlogList;
