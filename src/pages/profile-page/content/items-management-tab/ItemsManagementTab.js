import {
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { useState } from "react";
import PendingItems from "./PendingItems";
import BookedItems from "./BookedItems";
import LendItems from "./LendItems";

function ItemsManagementTab() {
  const [basicActive, setBasicActive] = useState("pending");

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
          <MDBTabsLink>??</MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("booked")}
            active={basicActive === "booked"}
          >
            Забронированное снаряжение
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("lend")}
            active={basicActive === "lend"}
          >
            Выданное снаряжение
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={basicActive === "pending"}>
          <PendingItems />
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "booked"}>
          <BookedItems />
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "lend"}>
          <LendItems />
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
}

export default ItemsManagementTab;
