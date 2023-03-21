import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { apiGetItems } from "../../api/ApiCalls";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setErrorLoadingItems,
  setIsLoadingItems,
  updateItems,
} from "./WarePageSlice";
import Sidebar from "./content/Sidebar";
import Ware from "./content/Ware";

const itemsPromise = apiGetItems().then((res) => res);

/**
 * Holds items loaded from the ware and functional sidebar.
 * Items can be dragged from Ware to Sidebar frame.
 *
 * @returns {JSX.Element}
 * @constructor
 */
function WarePage() {
  // Uses redux dispatch to update items according to request response.
  // Considered to do it once a mount.
  const dispatch = useDispatch();
  dispatch(setIsLoadingItems());
  useEffect(() => {
    itemsPromise
      .then((res) => dispatch(updateItems(res)))
      .catch((ignore) => dispatch(setErrorLoadingItems()));
  });

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Sidebar />
        <Ware />
      </DndProvider>
    </div>
  );
}

export default WarePage;
