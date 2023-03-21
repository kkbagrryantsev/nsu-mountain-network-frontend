import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateItems } from "../WarePageSlice";

/**
 * Sorter functional component. Sorts items by given key in an ascending or descending order.
 *
 * @param props items' sort key
 * @returns {JSX.Element} clickable sort order trigger
 */
function Filter(props) {
  const [order, setOrder] = useState(undefined);
  //Items from ware slice
  const items = useSelector((state) => state.items);
  //Dispatch hook
  const dispatch = useDispatch();

  /**
   * Sorts items by set key in chosen order.
   *
   * @returns {Promise<*>} ?
   */
  const sortItems = () => {
    const sortByOrder = (a, b) => {
      if (a[props.key] <= b[props.key]) {
        return order ? 1 : -1;
      } else {
        return order ? -1 : 1;
      }
    };

    items.sort((a, b) => sortByOrder(a, b));
    return items;
  };

  /**
   * Inverts sort order and sorts items.
   *
   * @type {(function(): void)|*}
   */
  const toggleSort = () => {
    props.setActiveFilter(props.id);
    if (order === undefined) {
      setOrder(true);
    } else {
      setOrder(!order);
    }
    sortItems().then((r) => dispatch(updateItems(r)));
  };

  /**
   * Sort order marker is shown on sort trigger.
   */
  return (
    <div>
      <p>{props.name}</p>
      <button onClick={toggleSort}>
        {order
          ? props.activeFilter === props.id && <BiChevronUp size={"20px"} />
          : props.activeFilter === props.id && <BiChevronDown size={"20px"} />}
      </button>
    </div>
  );
}

export default Filter;
