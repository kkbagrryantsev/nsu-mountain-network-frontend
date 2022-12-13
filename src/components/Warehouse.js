// noinspection JSUnresolvedVariable

import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DndProvider, useDrop} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BiChevronUp, BiX} from "react-icons/bi"
import {BiChevronDown} from "react-icons/bi";
import {useLocation} from "react-router-dom";
import queryString from "query-string";
import Item from "./Item";
import {bookItems, getItems} from "../api/Queries";
import "./Warehouse.css"
import SuccessModal from "./SuccessModal";
import Modal from "./Modal";
import {activatePopUp} from "../slices/modalsSlice";
import FailureModal from "./FailureModal";

const SORT_KEYS = ['item_name']

function BookedItem(props) {
    const [isDeleted, setIsDeleted] = useState(false)
    useEffect(() => {
        isDeleted && props.handler(props.item_id)
    // eslint-disable-next-line
    }, [isDeleted])

    return <div className="bookedItem__wrapper">
        <div className="text__wrapper">
            <h2>{props.item_name}</h2>
            <p>{props.category.category_name}</p>
            <button onClick={() => setIsDeleted(true)}><BiX size={"20px"} color={"#949494"}/></button>
        </div>
    </div>
}

function Filter({bookHandler, setSortKey, children}) {
    const [nameOrder, setNameOrder] = useState(true)

    function SingleFilter(props) {
        const sortKey = props.sortKey
        const toggleSort = () => {
            setSortKey(!nameOrder ? {key: sortKey, ascending: true} : {key: sortKey, ascending: false})
            props.setOrder(!nameOrder)
            //localStorage['itemsSortKey'] = props.sortKey

            //const url = window.location.href
            //window.location.href = window.location.href + (url.indexOf("sort=") === -1 ? "?sort=" + sortKey : "")
        }

        return (<div className="singleFilter__wrapper">
            <p>{props.name}</p>
            <button onClick={() => toggleSort()}>
                {props.order ? <BiChevronDown size={"20px"}/> : <BiChevronUp size={"20px"}/>}
            </button>
        </div>)
    }

    const [, drop] = useDrop({
        accept: 'ITEM', drop: () => ({name: 'Some name'}), collect: (monitor) => ({
            isOver: monitor.isOver(), canDrop: monitor.canDrop(),
        })
    })

    return (<div ref={drop} className="filter__wrapper">
        <SingleFilter order={nameOrder} setOrder={setNameOrder} sortKey="item_name" name="Название"/>
        {children}
        {children.length > 0 && <button onClick={() => bookHandler()}>Забронировать</button>}
    </div>)
}

function sortItems(items, key) {
    const sortedItems = items
    if (!key.key || !SORT_KEYS.includes(key.key)) {
        return sortedItems
    }

    function sortByOrder(a, b) {
        if (a[key.key] <= b[key.key]) {
            return key.ascending ? 1 : -1
        } else {
            return key.ascending ? -1 : 1
        }
    }

    sortedItems.sort((a, b) => sortByOrder(a, b))
    return sortedItems
}

function Warehouse() {
    const location = useLocation()
    const dispatch = useDispatch()
    const query = queryString.parse(location.search)
    const [sortKey, setSortKey] = useState({key: query.sort, ascending: true})

    const token = useSelector((token) => token.token.value)
    useEffect(() => {
        getItems(token).then(res => res.items ? setItems(res.items) : setItems([]))
        // eslint-disable-next-line
    }, [])
    const [items, setItems] = useState([])

    useEffect(() => {
        const sortedItems = sortItems(items.filter((item) => item.isFiltered !== true), sortKey)
        setItems(sortedItems)
        // eslint-disable-next-line
    }, [sortKey])

    const selectItem = (id) => {
        setItems(items.map((item) => {
            if (item.item_quantity_current === undefined || item.item_quantity_current === 1) {
                return id === item.item_id ? {...item, item_quantity_current: 0, isFiltered: true} : {...item}
            } else {
                if (id === item.item_id) {
                    return {
                        ...item,
                        booked_amount: item.booked_amount + 1,
                        item_quantity_current: item.item_quantity_current - item.booked_amount,
                        isFiltered: true
                    }
                } else {
                    return {...item}
                }

            }
        }))
    }

    const deselectItem = (id) => {
        setItems(items.map((item) => {
            return id === item.item_id ? {...item, isFiltered: false} : {...item}
        }))
    }

    const bookingItems = () => {
        function toCorrect(item) {
            return {item_id: item.item_id, quantity: 1}
        }
        const bookedItems = {items: items
            .filter((i) => i.isFiltered)
            .map((i) => toCorrect(i))}
        console.log(bookedItems)
        let status = 404
        bookItems(token, bookedItems).then(res => status = res)
        if (status === 200) {
            dispatch(activatePopUp("successBooking"))
        } else {
            dispatch(activatePopUp("failureBooking"))
        }
    }

    return (<div className="ware__wrapper">
        <Modal name="successBooking">
            <SuccessModal text='Вещи успешно забронированы, можете получить их в ближайщем складе' />
        </Modal>
        <Modal name="failureBooking">
            <FailureModal text='Произошла ошибка' />
        </Modal>
        <DndProvider backend={HTML5Backend}>
            <Filter bookHandler={bookingItems} setSortKey={setSortKey}>
                {items
                    .filter((item) => item.isFiltered)
                    .map((i) => {
                        return <BookedItem key={i.item_id} handler={deselectItem} {...i}/>
                    })}</Filter>
            <div className="warehouse__wrapper">
                {items
                    .filter((item) => !item.isFiltered)
                    .map((i) => {
                        return <Item key={i.item_id} handler={selectItem} {...i}/>
                    })}
            </div>
        </DndProvider>
    </div>)
}

export default Warehouse