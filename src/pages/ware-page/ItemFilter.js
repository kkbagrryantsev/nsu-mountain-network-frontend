import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useState } from "react";

function ItemFilter(props) {
  const sortKey = props.sortKey;
  const setSortKey = props.setSortKey;

  const [nameOrder, setNameOrder] = useState(true);

  const toggleSort = () => {
    setSortKey(
      !nameOrder
        ? { key: sortKey, ascending: true }
        : { key: sortKey, ascending: false }
    );
    props.setOrder(!nameOrder);
    //localStorage['itemsSortKey'] = props.sortKey

    //const url = window.location.href
    //window.location.href = window.location.href + (url.indexOf("sort=") === -1 ? "?sort=" + sortKey : "")
  };

  return (
    <div className="singleFilter__wrapper">
      <p>{props.name}</p>
      <button onClick={() => toggleSort()}>
        {props.order ? (
          <BiChevronDown size={"20px"} />
        ) : (
          <BiChevronUp size={"20px"} />
        )}
      </button>
    </div>
  );
}

export default ItemFilter;
