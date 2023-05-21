import LoadingStateBlock from "components/loading-state-block/LoadingStateBlock";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./content/Sidebar";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInputGroup,
  MDBRow,
} from "mdb-react-ui-kit";
import { getAllUsersAction } from "./TreasurerPageActions";
import { userSelectors } from "./TreasurerPageSlice";
import UserCard from "./content/UserCard";
import { useEffect } from "react";
import { useResolvedPath } from "react-router";


function TreasurerPageTab() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsersAction())
  }, [])

 
  const usersL = useSelector((state) => state.treasurerPage.users.loading);
  const users = useSelector((state) => state.treasurerPage.users);

  return (
    <LoadingStateBlock loadingState={usersL}>
      <MDBContainer fluid>
        <MDBRow center>
        <MDBCol md={"20"}>
            <Sidebar />
          </MDBCol>
          <MDBCol md={"20"} className={"p-4"}>
            <MDBRow>
              <UsersTable />
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </LoadingStateBlock>
  );
}

function UsersTable() {
  let users = useSelector(userSelectors.selectAll);
  return (
    <MDBRow className={"row-cols-1 row-cols-lg-1 g-2"}>
      {users.map((i) => (
        <MDBCol >
          <UserCard user={i} />
        </MDBCol>
      ))}
    </MDBRow>
  );
}

export default TreasurerPageTab;


//<ItemCard item={i} />  <h5>{i.user.user_name + ": " + i.user.user_money}</h5>