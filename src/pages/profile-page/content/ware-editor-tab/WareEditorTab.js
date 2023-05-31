import { categoriesSelectors } from "./CategoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategoriesListAction } from "./WareEditorActions";
import {
  MDBAccordion,
  MDBAccordionItem,
  MDBBadge,
  MDBContainer,
  MDBRipple,
} from "mdb-react-ui-kit";

export function WareEditorTab() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesListAction());
  }, []);
  const categories = useSelector(categoriesSelectors.selectAll);

  return (
    <MDBContainer fluid className={"d-grid gap-2 p-0"}>
      {categories.map((c) => (
        <CategoryDropDown
          categoryName={c.category_name}
          categoryId={c.category_id}
          key={c.category_id}
        />
      ))}
    </MDBContainer>
  );
}

function CategoryDropDown(props) {
  const categoryDropDownHeader = (
    <>
      <h6 className={"fs-7 mb-1"}>{props.categoryName}</h6>
      <MDBRipple className={"rounded-5 ms-2"} rippleTag={"div"}>
        <MDBBadge
          color={"transparent"}
          className={"btn btn-sm rounded-5 btn-outline-primary"}
          onClick={(e) => e.stopPropagation()}
        >
          Изменить
        </MDBBadge>
      </MDBRipple>
    </>
  );

  return (
    <MDBAccordion>
      <MDBAccordionItem
        className={"border-2"}
        headerTitle={categoryDropDownHeader}
        collapseId={props.categoryId}
      ></MDBAccordionItem>
    </MDBAccordion>
  );
}
