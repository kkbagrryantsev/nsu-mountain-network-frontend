import axios from "axios";

export default function initAxios() {
  axios.defaults.baseURL = "http://127.0.0.1:5000";
  // axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  // axios.defaults.headers.common["Access-Control-Allow-Credentials"] = "true";
}

export const apiAddress = "http://127.0.0.1:5000";
