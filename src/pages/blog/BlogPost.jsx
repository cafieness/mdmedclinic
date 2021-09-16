import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "graphql-request";
import { useQuery } from "react-query";
import { send_var_query } from "../../api";
import {
  loadingComponent,
  errorComponent,
} from "../../components/admin/HelperComps";

const get_post = gql`
  query getPost($id: ID!) {
    getBlogPost(id: $id) {
      id
      body
      image
      title
    }
  }
`;

function BlogPost() {
  const { id } = useParams();

  const { data, isLoading, isFetching, isError, error, isSuccess } = useQuery(
    "get_post",
    async () => {
      const { getBlogPost } = await send_var_query(get_post, { id });
      return getBlogPost;
    }
  );

  return (
    <div className="pt-28 mdh:pt-32 pb-10">
      {(isLoading || isFetching) && loadingComponent()}
      {!isLoading && !isFetching && isError && errorComponent(error)}
      {isSuccess && !data && (
        <div className="relative h-screen max-w-[100vw] overflow-hidden overscroll-x-contain">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center italic font-semibold text-gray-800 text-5xl">
            Такой статьи увы нет
          </div>
        </div>
      )}
      {isSuccess && !isLoading && !isFetching && data && (
        <div className="mx-6 mdh:mx-20 lgh:mx-32 flex flex-col">
          <img
            src={data.image}
            alt=""
            className="rounded-3xl mx-auto w-[90%] mdh:w-1/2"
          />

          <h1 className="text-4xl sm:text-2xl font-bold pt-6 mdh:pt-16 lgh:pt-20 mb-8 md:text-center">
            {data.title}
          </h1>
          <p className="break-all whitespace-pre-wrap">{data.body}</p>
        </div>
      )}
    </div>
  );
}

export default BlogPost;
