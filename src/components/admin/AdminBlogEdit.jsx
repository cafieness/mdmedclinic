import { Dialog } from "@material-ui/core";
import { gql } from "graphql-request";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router";
import send_mutation, { API_URL, multipart, send_var_query } from "../../api";
import { useURLQuery } from "../../transform";
import { errorComponent, loadingComponent } from "./HelperComps";

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

const create_post_mut = gql`
  mutation create($inp: CreateBlogPostInput!) {
    admin {
      createBlogPost(input: $inp) {
        id
      }
    }
  }
`;

const upload_query = gql`
  mutation UploadFile($file: Upload!) {
    admin {
      uploadImage(file: $file)
    }
  }
`;

const update_post_mut = gql`
  mutation create($inp: UpdateBlogPostInput!, $id: ID!) {
    admin {
      updateBlogPost(input: $inp, id: $id) {
        id
      }
    }
  }
`;

function AdminBlogEdit() {
  const { mutate: createPost, isLoading } = useMutation(async (inp) => {
    const val = await send_mutation(create_post_mut, { inp });
    return val;
  });

  const { mutate: updatePost } = useMutation(async (inp) => {
    const val = await send_mutation(update_post_mut, { inp, id: post_id });
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
      refetch().then((resp) => {
        const data = resp.data;
        setTitle(data.title);
        setBody(data.body);
        setImage_link(data.image);
      });
    }
  }, []);

  const query = useURLQuery();
  const action = query.get("action");
  const post_id = query.get("id");

  const [resDialog, setResDialog] = useState(false);
  const [result, setResult] = useState({
    error: false,
    success: false,
    msg: null,
  });

  const history = useHistory();

  const dialogBody = () => {
    return (
      <div className="p-10 rounded-md flex flex-col">
        <h2 className="text-xl text-gray-900 font-semibold mb-8">
          {result.error ? "Произошла ошибка" : "Операция выполнена успешно"}
        </h2>
        {result.error && <p>{JSON.stringify(result.msg)}</p>}

        <button
          className="mt-8 btn-ar bg-red-300 text-xl font-semibold"
          onClick={() => {
            setResDialog(false);
            if (action !== "edit" && !result.error) {
              history.push("/admin/blogList");
            }
          }}
        >
          Закрыть
        </button>
      </div>
    );
  };

  const { mutate: upload_mut } = useMutation(async (file) => {
    const {
      admin: { uploadImage },
    } = await multipart(upload_query, file);
    return uploadImage;
  });

  const upload_image = (file) => {
    upload_mut(file, {
      onError: (err) => {
        console.log(err);
      },
      onSuccess: (data) => {
        setImage_link(API_URL.slice(0, -5) + data);
      },
    });
  };

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image_link, setImage_link] = useState("");

  const create_post = () => {
    createPost(
      { title, body, image: image_link },
      {
        onError: (err) => {
          setResult({ error: true, msg: err });
          setResDialog(true);
        },
        onSuccess: (data) => {
          console.log(data);
          setResult({ error: false, success: true });
          setResDialog(true);
        },
      }
    );
  };

  const update_post = () => {
    updatePost(
      { title, body, image: image_link },
      {
        onError: (err) => {
          setResult({ error: true, msg: err });
          setResDialog(true);
        },
        onSuccess: (data) => {
          console.log(data);
          setResult({ error: false, success: true });
          setResDialog(true);
        },
      }
    );
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        {action === "edit" ? "Редактировать статью" : "Новая статья"}
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
        <form
          className="flex flex-col space-y-6"
          id="blogform"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex space-x-2 items-center">
            <label>Название: </label>
            <input
              type="text"
              className="inp-ar"
              minLength={8}
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2" required>
            <label>Содержание (не менее 20 символов): </label>
            <textarea
              className="px-4 py-2 rounded text-gray-900"
              value={body}
              rows="7"
              minlength={20}
              required
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>

          <div className="flex space-x-2">
            <label>Изображение: </label>
            <input
              type="file"
              className=""
              onInput={(e) => upload_image(e.target.files[0])}
            />
            <img src={image_link ?? null} className="w-32 rounded-md" alt="" />
          </div>

          <button
            className="btn-ar"
            type="submit"
            onClick={() => {
              if (
                !document.getElementById("blogform").checkValidity() ||
                body.length < 20 ||
                image_link.length < 1
              ) {
                return;
              }
              if (action !== "edit") create_post();
              else {
                update_post();
              }
            }}
          >
            {action !== "edit" ? "Опубликовать" : "Обновить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminBlogEdit;
