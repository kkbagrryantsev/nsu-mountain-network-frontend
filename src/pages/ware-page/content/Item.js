import {useDrag} from "react-dnd";

function Item(props) {
  const [{isDragging}, drag] = useDrag({
    item: {name: "Any"},
    type: "ITEM",
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        dropHandler(props.item_id);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag}>
      <div>
        <img src={} alt={}/>
        <div>
          <small>{props.item.quantity}</small>
        </div>
      </div>
      <div>
        <h2>{props.item.name}</h2>
        <p>{props.item.category}</p>
      </div>
    </div>
  );
}

export default Item