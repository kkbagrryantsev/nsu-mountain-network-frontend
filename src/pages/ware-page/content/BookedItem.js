import { BiX } from "react-icons/bi";

function BookedItem() {
  return (
    <div>
      // Nested div may be unnecessary
      <div>
        <h2>{}</h2>
        <p>{}</p>
        <button>
          <BiX size={"20px"} color={"#949494"} />
        </button>
      </div>
    </div>
  );
}

export default BookedItem;
