import { Dialog } from "@material-ui/core";
import { gql } from "graphql-request";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import send_mutation, { send_var_query } from "../../api";
import { useURLQuery } from "../../transform";
import { errorComponent, loadingComponent } from "./HelperComps";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const get_post = gql`
  query get_post($id: ID!) {
    getBlogPost(id: $id) {
      body
      id
      image
      title
    }
  }
`;

const create_post = gql`
  mutation create($inp: CreateBlogPostInput!) {
    admin {
      createBlogPost(input: $inp) {
        id
      }
    }
  }
`;

function AdminBlogEdit() {
  const {
    mutate: createPost,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useMutation(async (inp) => {
    const val = await send_mutation(create_post, { inp });
    return val;
  });

  const { data: blogPostData, refetch } = useQuery(
    "get_post",
    async () => {
      const { getBlogPost } = await send_var_query(get_post, {
        id: post_id,
      });
      return getBlogPost;
    },
    {
      enabled: false,
      onSuccess: (data) => {},
      refetchInterval: false,
    }
  );

  useEffect(() => {
    if (action === "edit") {
      refetch();
    }
  }, []);

  const query = useURLQuery();
  const action = query.get("action");
  const post_id = query.get("id");

  const [resDialog, setResDialog] = useState(false);

  const dialogBody = () => {};

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        {action === "edit" ? "Редактировать продукт" : "Новый продукт"}
      </h2>
      {resDialog && (
        <Dialog
          open={resDialog}
          onClose={() => {
            setResDialog(false);
          }}
        >
          {dialogBody()}
        </Dialog>
      )}
      <div>
        {isLoading && loadingComponent()}
        {isError && !isLoading && errorComponent(error)}
        {isSuccess && !isLoading && <div>НАМАНА</div>}
        <form className="flex flex-col space-y-6">
          <div className="flex space-x-2 items-center">
            <label>Название: </label>
            <input type="text" className="inp-ar" minLength={8} requiredq />
          </div>

          <div className="flex flex-col space-y-2" required>
            <label>Содержание: </label>
            <textarea></textarea>
          </div>

          <div className="flex space-x-2">
            <label>Изображение: </label>
            <input type="file" className="" required />
          </div>

          <button className="btn-ar" type="submit">
            Опубликовать
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminBlogEdit;
