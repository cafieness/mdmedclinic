import { GraphQLClient } from "graphql-request";
import store from "./store";

const API_URL =
  (process.env.REACT_APP_API_CONFIG ?? "http://localhost:8000") + "/api/";

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

export default send_mutation;
export { client, send_simple_query, send_mutation, send_var_query };
