import { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);

  return (
        <main className="content">
          <section className="profile">
            <div className="profile__container">
              <div className="profile__avatar-container">
                <img src={currentUser.avatar} alt="Аватар пользователя" className="profile__avatar" onClick={onEditAvatar} />
              </div>

              <div className="profile__info">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button className="profile__btn-edit" type="button" onClick={onEditProfile} ></button>
                <p className="profile__text">{currentUser.about}</p>
              </div>
            </div>
            <button className="profile__button" type="button" onClick={onAddPlace}></button>
          </section>

          <section className="elements">
            {cards.map((card) => {
              return (
                <Card
                  key={card._id}
                  card={card}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              )
            })
          }
          </section>
        </main>
    )
}

export default Main;
