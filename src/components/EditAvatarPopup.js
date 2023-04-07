import { useEffect } from "react";
import useValidation from "../utils/useValidation";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {
  const { values, errors, isFormValid, onChange, resetValidation } = useValidation();  
    useEffect(() => {
      resetValidation();
    }, [isOpen, resetValidation])

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(values);
    } 

    return (
        <PopupWithForm
            name="avatar"
            subtitle="Обновить аватар"
            buttonText={onLoading ? "Сохранение..." : "Сохранить"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isFormValid={isFormValid}
        >
          <label className="popup__wrapper">
            <input
                  name="avatar"
                  id="avatar"
                  required
                  placeholder="Ссылка на аватар"
                  type="url"
                  className={`popup__input ${
                    errors.about ? "popup__input_type_error" : ""
                  }`}
                  onChange={onChange}
                  value={values.avatar || ""}
                />
            <span id="avatar-error" className={`popup__error ${
                errors.avatar ? "popup__error_active" : ""
                }`}>{errors.avatar || ""}</span>
          </label>
            
        </PopupWithForm>
    ) 
}

export default EditAvatarPopup;

