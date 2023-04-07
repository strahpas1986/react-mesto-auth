import { useEffect } from "react";
import useValidation from "../utils/useValidation";

import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, onLoading, card }) {
    const { resetValidation } = useValidation();

    useEffect(() => {
        resetValidation(true);
      }, [isOpen, resetValidation]);

      function handleSubmit(e) {
        e.preventDefault();
        onDeleteCard(card);
      }

    return (
        <PopupWithForm
            name="delete-card"
            subtitle="Вы уверены?"
            buttonText={onLoading ? "Удаление..." : "Да"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isFormValid={true}
        />
    )
}

export default DeleteCardPopup;