import { apiAddress } from "./BackendSettings";
import { getAccessToken } from "./Cookie";

const getAccessTokenHeader = () => {
  const token = getAccessToken();

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

const getDefaultHeader = () => {
  return {
    "Content-Type": "application/json",
  };
};

export async function apiLogin(credentials) {
  return fetch(apiAddress + "/api/auth/login", {
    method: "POST",
    headers: getDefaultHeader(),
    body: JSON.stringify(credentials),
  }).then((r) => r.json().then((data) => ({ status: r.status, data: data })));
}

export async function apiRegister(credentials) {
  return fetch(apiAddress + "/api/auth/signup", {
    method: "POST",
    headers: getDefaultHeader(),
    body: credentials,
  }).then((r) => ({ status: r.status }));
}

export async function apiGetItems() {
  return fetch(apiAddress + "/api/models/items", {
    method: "GET",
    headers: getAccessTokenHeader(),
  }).then((r) => r.json().then((data) => ({ status: r.status, data: data })));
}

export async function apiBookItems(credentials) {
  console.log(credentials);
  return fetch(apiAddress + "/api/models/items/book", {
    method: "POST",
    headers: getAccessTokenHeader(),
    body: JSON.stringify(credentials),
  }).then((r) => ({ status: r.status }));
}

export async function apiReturnItem(credentials) {
  console.log(credentials);
  return fetch(apiAddress + "/api/models/items/use/return", {
    method: "POST",
    headers: getAccessTokenHeader(),
    body: JSON.stringify(credentials),
  }).then((r) => ({ status: r.status }));
}

export async function apiGetUserData() {
  return fetch(apiAddress + "/api/auth/my_profile/", {
    method: "GET",
    headers: getAccessTokenHeader(),
  }).then((r) => r.json().then((data) => ({ status: r.status, data: data })));
}

export async function apiGetItemData(credentials) {
  return fetch(apiAddress + `/api/models/items/${credentials.item_id}`, {
    method: "GET",
    headers: getAccessTokenHeader(),
  }).then((r) => r.json().then((data) => ({ status: r.status, data: data })));
}
