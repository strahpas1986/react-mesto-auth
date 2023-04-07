import { useEffect, useContext } from "react";
import useValidation from '../utils/useValidation';

import PopupWithForm from "./PopupWithForm";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
    const { values, errors, isFormValid, onChange, resetValidation } = useValidation();
    const currentUser = useContext(CurrentUserContext);

    
    useEffect(() => {
      resetValidation(true, currentUser);
    }, [currentUser, isOpen, resetValidation]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser(values);
    }

    return (
        <PopupWithForm
          name="name"
          subtitle="Редактировать профиль"
          buttonText={onLoading ? "Сохранение..." : "Сохранить"}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          isFormValid={isFormValid}
        >
        <label className="popup__wrapper">
          <input
                  name="name"
                  id="name-element"
                  required
                  placeholder="Жак-Ив Кусто"
                  type="text"
                  className={`popup__input ${
                    errors.name ? "popup__input_type_error" : ""
                  }`}
                  minLength="2"
                  maxLength="40"
                  value={values.name || ""}
                  onChange={onChange}
              />
              <span id="name-element-error" className={`popup__error ${
                errors.name ? "popup__error_active" : ""
                }`}>{errors.name || ""}</span>
          </label>

          <label className="popup__wrapper">
            <input
                  name="about"
                  id="job-element"
                  required
                  placeholder="Исследователь океана"
                  type="text"
                  className={`popup__input ${
                    errors.about ? "popup__input_type_error" : ""
                  }`}
                  minLength="2"
                  maxLength="200"
                  value={values.about || ""}
                  onChange={onChange}
              />
              <span id="job-element-error" className={`popup__error ${
                errors.about ? "popup__error_active" : ""
                }`}>{errors.about || ""}</span>
          </label>          
        
      </PopupWithForm>
    );  
} 

export default EditProfilePopup;