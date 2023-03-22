import LoadingStateBlock from "../../components/loading-state-block/LoadingStateBlock";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./content/Sidebar";
import ItemsTable from "./content/ItemsTable";
import { MDBBtn, MDBIcon, MDBInputGroup } from "mdb-react-ui-kit";
import { getItems } from "./StoragePageActions";
import { useState } from "react";
import { updateItems } from "./StoragePageSlice";

function StoragePage() {
  const dispatch = useDispatch();
  window.onload = () => dispatch(getItems);
  const items = useSelector((state) => state.storagePage.items);
  const [searchPrompt, setSearchPrompt] = useState("");
  console.log(items);
  return (
    <LoadingStateBlock loadingState={items}>
      <div className={"d-flex flex-row w-100"}>
        <Sidebar />
        <div className={"d-flex flex-column w-100"}>
          <MDBInputGroup
            className="mb-3"
            textBefore={<MDBIcon fas icon="search" />}
          >
            <input
              value={searchPrompt}
              onChange={(e) => setSearchPrompt(e.target.value)}
              className="form-control"
              type="text"
              placeholder="Поиск"
            />
            <MDBBtn
              onClick={() =>
                dispatch(
                  updateItems(
                    items.value.filter(
                      (i) =>
                        i.item_name.toLocaleLowerCase() ===
                        searchPrompt.toLocaleLowerCase()
                    )
                  )
                )
              }
            >
              Поиск
            </MDBBtn>
          </MDBInputGroup>
          <ItemsTable />
        </div>
      </div>
    </LoadingStateBlock>
  );
}

export default StoragePage;
