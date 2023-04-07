import React from 'react';

function ImagePopup({ card, onClose }) {
    return (
      <section className={`popup popup_image-visible ${card.link ? "popup_opened" : ""}`}>
        <div className="popup__container popup__container_img">
          <button className="popup__close" onClick={onClose}></button>
          <img className="popup__image" src={card.link} alt={card.name} />
          <h2 className="popup__subtitle-img">{card.name}</h2>
        </div>
      </section>
    );
  };
  
export default ImagePopup;