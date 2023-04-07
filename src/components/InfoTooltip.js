import React from "react";


const InfoTooltip = (props) => {
    return (
        <section className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
          <button className="popup__close" type="button" onClick={props.onClose}></button>
          <img
            className="popup__image"
            src={props.image}
            alt={props.title}
          />
          <h2 className="popup__subtitle">{props.title}</h2>

        </div>
      </section>
    )
}

export default InfoTooltip;
