import {
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { useState } from "react";
import {
  MyBookedItemsList,
  MyRequestedItemsList,
  MyTakenItemsList,
} from "./ItemsList";
import { useDispatch } from "react-redux";
import { getMyItemsInUseHistoryAction } from "../../ProfilePageActions";

function ItemsManagementTab() {
  const dispatch = useDispatch();

  const [basicActive, setBasicActive] = useState("requested");

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  return (
    <>
      <MDBTabs pills className="mb-3">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => {
              handleBasicClick("requested");
              dispatch(getMyItemsInUseHistoryAction("requested"));
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
              dispatch(getMyItemsInUseHistoryAction("booked"));
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
              dispatch(getMyItemsInUseHistoryAction("taken"));
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
