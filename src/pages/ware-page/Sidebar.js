import { useDrop } from "react-dnd";
import { useState } from "react";
import ItemFilter from "./ItemFilter";

function SideBar({ bookHandler, setSortKey, children }) {
  const [, drop] = useDrop({
    accept: "ITEM",
    drop: () => ({ name: "Some name" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [nameOrder, setNameOrder] = useState(true);

  return (
    <div ref={drop} className="filter__wrapper">
      <ItemFilter
        order={nameOrder}
        setOrder={setNameOrder}
        sortKey="item_name"
        name="Название"
      />
      {children}
      {children.length > 0 && (
        <button onClick={() => bookHandler()}>Забронировать</button>
      )}
    </div>
  );
}

export default SideBar;
