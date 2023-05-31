import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { patchCategoryAction } from "../WareEditorActions";
import { apiGetCategoryImage } from "../../../../../api/models/ApiCalls";
import { createErrorToast } from "../../../../../models/ToastModel";

function CategoryEditDialog(props) {
  const dispatch = useDispatch();
  const category = props.data;

  const [imageLoading, setImageLoading] = useState("placeholder");
  const [image, setImage] = useState(null);

  useEffect(() => {
    apiGetCategoryImage(category.categoryId)
      .then((response) => {
        if (response.status === 200) {
          setImageLoading("");
          const imageUrl = URL.createObjectURL(response.data);
          setImage(imageUrl);
        }
      })
      .catch(() => {
        createErrorToast("Ошибка сервера");
      });
  }, []);

  const [formValue, setFormValue] = useState({
    category_name: category.categoryName,
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    dispatch(patchCategoryAction(formValue));
  };

  return (
    <MDBModal show={props.isActive} setShow={props.setIsActive} tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>{category.categoryName}</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={() => setIsActive(!isActive)}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBValidation
              isValidated
              className={"d-flex flex-column align-items-center gap-1"}
              onSubmit={onSubmit}
            >
              <MDBValidationItem feedback invalid>
                <MDBInput
                  value={formValue.name}
                  name="name"
                  onChange={onChange}
                  required
                  label="Имя"
                />
              </MDBValidationItem>
              <MDBValidationItem feedback invalid>
                <MDBInput
                  value={formValue.email}
                  name="email"
                  type="email"
                  onChange={onChange}
                  required
                  label="Почта"
                />
              </MDBValidationItem>
              <MDBValidationItem feedback invalid>
                <MDBInput
                  value={formValue.phone}
                  name="phone"
                  type="number"
                  onChange={onChange}
                  required
                  label="Номер телефона"
                />
              </MDBValidationItem>
              <MDBValidationItem feedback invalid>
                <MDBInput
                  value={formValue.login}
                  name="login"
                  onChange={onChange}
                  required
                  label="Логин"
                />
              </MDBValidationItem>
              <MDBValidationItem feedback invalid>
                <MDBInput
                  value={formValue.password}
                  name="password"
                  type="password"
                  onChange={onChange}
                  required
                  label="Пароль"
                />
              </MDBValidationItem>
              <MDBBtn type="submit" color={"primary"}>
                Зарегистрироваться
              </MDBBtn>
            </MDBValidation>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}

export default CategoryEditDialog;
