import Item from "./Item";
import { useSelector } from "react-redux";

/**
 * Main ware page frame, which stores fetched items.
 *
 * @returns {JSX.Element}
 * @constructor
 */
function Ware() {
  const items = useSelector((state) => state.warePageSlice.items);
  const filters = useSelector((state) => state.warePageSlice.filters);
  return (
    <div>
      {items.map((item) => {
        return <Item key={item.item_id} />;
      })}
    </div>
  );
}

export default Ware;
