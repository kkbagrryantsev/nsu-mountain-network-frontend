import LoadingStateBlock from "../../components/loading-state-block/LoadingStateBlock";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./content/Sidebar";
import ItemsTable from "./content/ItemsTable";
import {
  MDBBtn,
  MDBIcon,
  MDBInputGroup,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import { getItems } from "./StoragePageActions";
import { updateItems } from "./StoragePageSlice";

function StoragePage() {
  const dispatch = useDispatch();
  window.onload = () => dispatch(getItems);
  const items = useSelector((state) => state.storagePage.items);
  console.log(items);
  const onSearchSubmit = (e) => {
    dispatch(
      updateItems(
        items.value.filter(
          (i) =>
            i.item_name.toLocaleLowerCase() ===
            e.target.value.toLocaleLowerCase()
        )
      )
    );
  };

  return (
    <LoadingStateBlock loadingState={items}>
      <div className={"d-flex flex-row w-100 p-4"}>
        <Sidebar />
        <div className={"d-flex flex-column align-items-center w-100"}>
          <MDBInputGroup
            className="mb-3"
            onSubmit={(e) => onSearchSubmit(e)}
            textBefore={<MDBIcon fas icon="search" />}
          >
            <input
              className="form-control"
              type="text"
              name={"searchPrompt"}
              placeholder="Поиск"
            />
            <MDBBtn type={"submit"}>Поиск</MDBBtn>
          </MDBInputGroup>
          <ItemsTable />
          <MDBPagination className={"mb-0"}>
            <MDBPaginationItem>
              <MDBPaginationLink>1</MDBPaginationLink>
            </MDBPaginationItem>
            <MDBPaginationItem>
              <MDBPaginationLink>2</MDBPaginationLink>
            </MDBPaginationItem>
            <MDBPaginationItem>
              <MDBPaginationLink>3</MDBPaginationLink>
            </MDBPaginationItem>
          </MDBPagination>
        </div>
      </div>
    </LoadingStateBlock>
  );
}

export default StoragePage;
