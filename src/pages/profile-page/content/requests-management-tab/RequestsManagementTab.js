import {
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import {
  BookedItemsList,
  RequestedItemsList,
  TakenItemsList,
} from "./ItemsList";
import { useDispatch } from "react-redux";
import { getItemsInUseByTypeAction } from "./RequestsManagementTabActions";
import { getUserRoles } from "api/Cookie";

function RequestsManagementTab() {
  const dispatch = useDispatch();
  const roles = getUserRoles().split(", ");
  const [basicActive, setBasicActive] = useState("requested");

  useEffect(() => {
    if (roles.indexOf("warehouseman") !== -1) {
      dispatch(getItemsInUseByTypeAction("requested"));
    }
  }, []);

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  return (
    <>
      <MDBTabs pills className="d-flex justify-content-center mb-3">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => {
              handleBasicClick("requested");
              dispatch(getItemsInUseByTypeAction("requested"));
            }}
            active={basicActive === "requested"}
          >
            Заявки
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => {
              handleBasicClick("booked");
              dispatch(getItemsInUseByTypeAction("booked"));
            }}
            active={basicActive === "booked"}
          >
            Брони
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => {
              handleBasicClick("taken");
              dispatch(getItemsInUseByTypeAction("taken"));
            }}
            active={basicActive === "taken"}
          >
            Выданное
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={basicActive === "requested"}>
          <RequestedItemsList />
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "booked"}>
          <BookedItemsList />
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "taken"}>
          <TakenItemsList />
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
}

export default RequestsManagementTab;
