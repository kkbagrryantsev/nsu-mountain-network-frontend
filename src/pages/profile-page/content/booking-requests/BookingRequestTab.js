import {
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { useState } from "react";
//import PendingItems from "./PendingItems";
import BookedItems from "./BookedItems";
//import LendItems from "./LendItems";

function BookingRequestTab() {
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
          <MDBTabsLink
            onClick={() => handleBasicClick("pending")}
            active={basicActive === "pending"}
          >
            Входящие заявки
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("booked")}
            active={basicActive === "booked"}
          >
            Принятые заявки
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
          <BookedItems />
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "booked"}>
          Я русский
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "lend"}>
          Я узкий
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
}

export default BookingRequestTab;

/**
 * <PendingItems />
 * <BookedItems />
 * <LendItems />
 */
