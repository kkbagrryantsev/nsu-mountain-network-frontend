import {
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import {
  MyBookedItemsList,
  MyRequestedItemsList,
  MyTakenItemsList,
} from "./ItemsList";
import { useDispatch } from "react-redux";
import { getMyRequestsAction } from "./ItemsManagementTabActions";

function ItemsManagementTab() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyRequestsAction("requested"));
  }, []);

  const [basicActive, setBasicActive] = useState("requested");

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
              dispatch(getMyRequestsAction("requested"));
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
              dispatch(getMyRequestsAction("booked"));
            }}
            active={basicActive === "booked"}
          >
            Забронированное
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => {
              handleBasicClick("taken");
              dispatch(getMyRequestsAction("taken"));
            }}
            active={basicActive === "taken"}
          >
            Выданное
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={basicActive === "requested"}>
          <MyRequestedItemsList />
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "booked"}>
          <MyBookedItemsList />
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "taken"}>
          <MyTakenItemsList />
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
}

export default ItemsManagementTab;
