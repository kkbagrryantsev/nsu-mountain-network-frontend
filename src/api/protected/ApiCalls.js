import axios from "axios";
import { getAccessTokenHeader } from "utils/ApiUtils";

// USER RIGHTS
export const apiCheckUserAuthorizationStatus = () =>
  axios.get(
    "/api/protected/fromAny",
    getAccessTokenHeader({ restrictAuthConfirm: true })
  );

export const apiCheckUserPrivilegeStatus = () =>
  axios.get("/api/protected/fromDefault", getAccessTokenHeader());

export const apiCheckUserHasTreasurerPrivilegess = () =>
  axios.get("/api/protected/fromTreasurer", getAccessTokenHeader());
// USER RIGHTS
