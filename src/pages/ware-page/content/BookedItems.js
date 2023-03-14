import { useDrop } from "react-dnd";
import BookedItem from "./BookedItem";
import { useSelector } from "react-redux";

function BookedItems() {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "ITEM",
    drop: () => ({ name: "Some name" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const cartItems = useSelector((state) => state.warePageSlice.cartItems);

  return (
    <div ref={drop}>
      {items.map((item) => {
        return <BookedItem key={item.item_id} />;
      })}
    </div>
  );
}

export default BookedItems;
