import React from 'react';

function PopupWithForm({
  name, 
  subtitle, 
  isOpen,
  buttonText, 
  onClose, 
  onSubmit, 
  isFormValid,
  ...props}) {
    return (
      <section className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
          <button className="popup__close" onClick={onClose}></button>
          <h2 className="popup__subtitle">{subtitle}</h2>
          <form className="popup__form" name={`${name}`} noValidate onSubmit={onSubmit}>
            {props.children}
            <button type="submit" className="popup__button">{buttonText || 'Сохранить'}</button>
          </form>
        </div>
      </section>
    )
  }
  
export default PopupWithForm;