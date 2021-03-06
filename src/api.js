import { GraphQLClient } from "graphql-request";
import store from "./store";

const API_URL =
  (process.env.REACT_APP_API_CONFIG ?? "http://18.142.94.86/api") + "/api/";

const setHeaders = () => {
  let token = store.getState().user.token;
  if (token && token !== "") {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  return {};
};

const client = new GraphQLClient(API_URL, {
  headers: setHeaders(),
});

const listen_for_token = () => {
  client.setHeaders(setHeaders());
};

store.subscribe(listen_for_token);

const send_simple_query = (query) => {
  return client.request(query);
};

const send_var_query = (query, vars) => {
  return client.request(query, vars);
};

const send_mutation = (query, params) => {
  return client.request(query, params);
};

const reqV2 = async (query, params, onSuccess, onError) => {
  try {
    const data = await client.request(query, params);
    onSuccess(data);
    return;
  } catch (error) {
    onError(error);
  }
};

const multipart = async (query, file) => {
  let token = store.getState().user.token;
  const formData = new FormData();
  formData.append("query", `mutation {admin{ uploadImage(file: \"file\")}}`);
  formData.append("file", file);
  var resp;
  await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => (resp = data));
  return resp.data;
};

export default send_mutation;
export {
  client,
  send_simple_query,
  send_mutation,
  send_var_query,
  reqV2,
  multipart,
  API_URL,
};
