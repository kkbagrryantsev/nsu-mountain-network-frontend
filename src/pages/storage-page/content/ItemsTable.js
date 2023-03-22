import { useSelector } from "react-redux";
import ItemCard from "./ItemCard";
import styles from "../styles/StoragePage.module.scss";

function ItemsTable() {
  const items = useSelector((state) => state.storagePage.items);
  return (
    <div className={styles.itemTable}>
      {items.value.map((i, index) => {
        return <ItemCard item={i} key={index} />;
      })}
    </div>
  );
}

export default ItemsTable;
