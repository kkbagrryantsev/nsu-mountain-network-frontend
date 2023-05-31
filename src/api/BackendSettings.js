import axios from "axios";
import { apiCheckUserAuthorizationStatus } from "./protected/ApiCalls";
import { deleteAccessToken, deleteUserRoles } from "./Cookie";

export default function initAxios() {
  // axios.defaults.baseURL = "http://127.0.0.1:5000";
  axios.defaults.baseURL = "https://nmm-nocarend.amvera.io";
  // axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  // axios.defaults.headers.common["Access-Control-Allow-Credentials"] = "true";
  axios.interceptors.request.use(
    function (request) {
      if (request.headers.restrictAuthConfirm !== "true") {
        apiCheckUserAuthorizationStatus().catch((ignore) => {
          deleteAccessToken();
          deleteUserRoles();
          window.location.href = window.location.origin;
        });
      }
      return request;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
}

export const apiAddress = "http://127.0.0.1:5000";
