import LoadingStateBlock from "components/loading-state-block/LoadingStateBlock";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInputGroup,
  MDBRow,
} from "mdb-react-ui-kit";
import { getAllUsersAction } from "./TreasurerTabActions";
import { userSelectors } from "./TreasurerTabSlice";
import UserCard from "./content/UserCard";
import { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Chip } from "@mui/material";
import { useState } from "react";
import { getUserRoles } from "api/Cookie";

function TreasurerTab() {
  const dispatch = useDispatch();
  const roles = getUserRoles().split(", ");
  useEffect(() => {
    if (roles.indexOf("treasurer") !== -1) {
      dispatch(getAllUsersAction());
    }
  }, []);
  const usersLoading = useSelector((state) => state.treasurerTab.users.loading);

  return (
    <LoadingStateBlock loadingState={usersLoading}>
      <MDBRow className={"pb-3"}>
        <SearchBar />
      </MDBRow>
      <MDBRow>
        <MDBCol>
          <FilterShipsBlock />
        </MDBCol>
      </MDBRow>
      <MDBContainer className={"p-1"} fluid>
        <UsersTable />
      </MDBContainer>
    </LoadingStateBlock>
  );
}

function UsersTable() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  let users = useSelector(userSelectors.selectAll);

  if (params.has("search")) {
    const searchPrompt = params.get("search").toLowerCase();
    users = users.filter(
      (i) => i.user.user_name.toLowerCase().indexOf(searchPrompt) !== -1
    );
  }

  return (
    <>
      {users.map((i) => (
        <MDBRow key={i.user.user_id}>
          <MDBCol end>
            <UserCard user={i} />
            <hr />
          </MDBCol>
        </MDBRow>
      ))}
    </>
  );
}

function SearchBar() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    params.set("search", name);
    window.location.search = params;
  };

  return (
    <form onSubmit={handleSubmit}>
      <MDBInputGroup textBefore={<MDBIcon fas icon="search" />}>
        <input
          className="form-control"
          type="search"
          name="search"
          placeholder="Поиск"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <MDBBtn type="submit">Поиск</MDBBtn>
      </MDBInputGroup>
    </form>
  );
}

function FilterShipsBlock() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  return (
    <>
      <Chip
        icon={<SearchIcon />}
        hidden={!params.has("search")}
        label={params.get("search")}
        onDelete={() => {
          params.delete("search");
          window.location.search = params;
        }}
      />
    </>
  );
}

export default TreasurerTab;
