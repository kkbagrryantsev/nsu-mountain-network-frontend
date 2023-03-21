import { useState } from "react";
import Filter from "./Filter";

/**
 * Sidebar filters. Keys are computed depending on items set and its properties.
 *
 * @param props ?
 * @returns {JSX.Element} ?
 */
function Filters(props) {
  const [activeFilter, setActiveFilter] = useState(undefined);
  const properties = mapProperties();

  return (
    <>
      {properties.map((property, index) => {
        return (
          <Filter
            key={property}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            id={index}
          />
        );
      })}
    </>
  );
}

export default Filters;
