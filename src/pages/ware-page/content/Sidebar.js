import Filters from "./Filters";
import BookedItems from "./BookedItems";

/**
 * Holds items' filters and a list of booked items
 * @returns {JSX.Element}
 * @constructor
 */
function Sidebar() {
  return (
    <div className="sidebar__wrapper">
      <Filters />
      <BookedItems />
    </div>
  );
}

export default Sidebar;
