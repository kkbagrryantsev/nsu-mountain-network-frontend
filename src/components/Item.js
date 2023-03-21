import "./Item.css"
import {mapCategory} from "../api/categoryMap";
import {useDrag} from "react-dnd";

const mapQuantity = (quantity) => {
    return quantity ? quantity : "-";
}

function Item(props) {
    const {handler, item_name, category, item_quantity_current} = props
    const [{isDragging}, drag] = useDrag({
        item: {name: 'Any'},
        type: 'ITEM',
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (dropResult) {
                handler(props.item_id)
            } else {
                handler()
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    })

    const opacity = isDragging ? 0.4 : 1

    return (<div ref={drag} className="item__wrapper" style={{opacity}}>
        <div className="pics__wrapper">
            <img src={mapCategory(category.category_id).img} alt="Error"/>
            <div className="quantity__wrapper">
                <small>{mapQuantity(item_quantity_current)}</small>
            </div>
        </div>
        <div className="text__wrapper">
            <h2>{item_name}</h2>
            <p>{category.category_name}</p>
        </div>

    </div>)
}

export default Item