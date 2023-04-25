import { apiAddress } from "./BackendSettings";
import { getAccessTokenHeader, getJSONHeader } from "../utils/ApiUtils";

export async function apiLogin(credentials) {
  return fetch(apiAddress + "/api/auth/login", {
    method: "POST",
    headers: getJSONHeader(),
    body: JSON.stringify(credentials),
  }).then((r) => r.json().then((data) => ({ status: r.status, data: data })));
}

export async function apiRegister(credentials) {
  return fetch(apiAddress + "/api/auth/signup", {
    method: "POST",
    headers: getJSONHeader(),
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

export async function apiGetRequests(type) {
  if (type === undefined) {
    type = "all";
  }

  return fetch(apiAddress + `/api/models/item_in_use/${type}`, {
    method: "GET",
    headers: getAccessTokenHeader(),
  }).then((r) => r.json().then((data) => ({ status: r.status, data: data })));
}

