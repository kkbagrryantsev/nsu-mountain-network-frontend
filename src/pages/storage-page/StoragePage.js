import LoadingStateBlock from "components/loading-state-block/LoadingStateBlock";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./content/Sidebar";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInputGroup,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBRow,
} from "mdb-react-ui-kit";
import { getAvailableItemsAction } from "./StoragePageActions";
import { Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { itemSelectors } from "./StoragePageSlice";
import ItemCard from "./content/ItemCard";
import { useEffect } from "react";

function StoragePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAvailableItemsAction())
  }, [])

  const items = useSelector((state) => state.storagePage.items.loading);

  return (
    <LoadingStateBlock loadingState={items}>
      <MDBContainer fluid>
        <MDBRow center>
          <MDBCol md={"3"}>
            <Sidebar />
          </MDBCol>
          <MDBCol md={"6"} className={"p-4"}>
            <MDBRow className={"pb-2"}>
              <SearchBar />
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <FilterShipsBlock />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <ItemsTable />
            </MDBRow>

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
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </LoadingStateBlock>
  );
}

function SearchBar() {
  return (
    <form>
      <MDBInputGroup textBefore={<MDBIcon fas icon="search" />}>
        <input
          className="form-control"
          type="search"
          name="search"
          placeholder="Поиск"
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

function ItemsTable() {
  const search = window.location.search;
  const params = new URLSearchParams(search);

  let items = useSelector(itemSelectors.selectAll);

  console.log(items);

  if (params.has("search")) {
    const searchPrompt = params.get("search").toLowerCase();
    items = items.filter(
      (i) => i.item_name.toLowerCase().indexOf(searchPrompt) !== -1
    );
  }

  return (
    <MDBRow className={"row-cols-1 row-cols-lg-2 g-3"}>
      {items.map((i) => (
        <MDBCol key={i.item_id}>
          <ItemCard item={i} />
        </MDBCol>
      ))}
    </MDBRow>
  );
}

export default StoragePage;
