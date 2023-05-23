import LoadingStateBlock from "components/loading-state-block/LoadingStateBlock";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./content/Sidebar";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import { getAllUsersAction } from "./TreasurerPageActions";
import { userSelectors } from "./TreasurerPageSlice";
import UserCard from "./content/UserCard";
import { useEffect } from "react";

function TreasurerPageTab() {
  const dispatch = useDispatch();
    
  const usersLoading = useSelector((state) => state.treasurerPage.users.loading);

  useEffect(() => {
    dispatch(getAllUsersAction())
  }, [])

  return (
    <div>
    
    <LoadingStateBlock loadingState={usersLoading}>
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
    </div>
  );
}

function UsersTable() {
  let users = useSelector(userSelectors.selectAll);
  return (
    <MDBRow className={"row-cols-1 row-cols-lg-1 g-2"}>
      {users.map((i) => (
        <MDBCol >
          <UserCard user={i}/>
        </MDBCol>
      ))}
    </MDBRow>
  );
}

export default TreasurerPageTab;
