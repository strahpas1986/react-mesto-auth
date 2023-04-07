import { useState, useEffect, useCallback } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import * as authApi from '../utils/authApi';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import InfoTooltip from './InfoTooltip';
import ProtectedRouteElement from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import error from '../images/icon-error.svg';
import succes from '../images/icon-succes.svg';

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [infoTooltipImage, setInfoTooltipImage] = useState("");
  const [infoTooltipTitle, setInfoTooltipTitle] = useState("");
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOnLoading, setEditProfilePopupButtonText] = useState(false);
  const [isEditAvatarPopupOnLoading, setEditAvatarPopupButtonText] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [isDeleteCardPopupOpen, setDeleteCardPopupClass] = useState(false);
  const [isAddPlacePopupOnLoading, setAddPlacePopupButtonText] = useState(false);
  const [isDeleteCardPopupOnLoading, setDeleteCardPopupButtonText] = useState(false)
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    loggedIn &&
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.error(err);
      })

  }, [loggedIn]);

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
      if(isOpen) { // навешиваем только при открытии
        document.addEventListener('keydown', closeByEscape);
        return () => {
          document.removeEventListener('keydown', closeByEscape);
        }
      }
    }, [isOpen]);

  const cbRegister = useCallback( async({ email, password}) => {

    try {
      const data = await authApi.register({ email, password});
      if (data) {
        setInfoTooltipImage(succes);
        setInfoTooltipTitle('Вы успешно зарегистрировались!');
        navigate("/sign-in", { replace: true });
      }
    } catch (err) {
      console.error(err);
      handleInfoTooltip();
      setInfoTooltipImage(error);
      setInfoTooltipTitle('Что-то пошло не так! Попробуйте ещё раз.');
    } finally {
      handleInfoTooltip();
    }
  }, [navigate]);

  const cbAuthorize = useCallback(async ({ email, password }) => {
    try {
      const data = await authApi.authorize({ email, password });
      if (data.token) {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        setEmail(email);
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error(err);
      handleInfoTooltip();
      setInfoTooltipImage(error);
      setInfoTooltipTitle('Что-то пошло не так! Попробуйте ещё раз.');
    }
  }, [navigate]);

  const cbTokenCheck = useCallback(async () => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      try {
        const user = await authApi.getContent(jwt);
        if (!user) {
          throw new Error("Данные пользователя отсутствуют");
        }
        setEmail(user.data.email);
        setLoggedIn(true);
        navigate("/", { replace: true });
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const cbLogOut = useCallback(() => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setEmail('');
    navigate('/sign-in', { replace: true });
  }, [navigate]);

  useEffect(() => {
    cbTokenCheck();
  }, [cbTokenCheck])

  const handleInfoTooltip = () => {
    setInfoTooltip(true);
  }

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleDeleteClick = (card) => {
    setDeleteCardPopupClass(true);
    setCardToDelete(card);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setDeleteCardPopupClass(false);
    setSelectedCard({});
    setCardToDelete({});
    setInfoTooltip(false);
  }

  function handleUpdateUser(userData) {
    setEditProfilePopupButtonText(true);
    api.editProfileInfo(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setEditProfilePopupButtonText(false);
      });
  }

  const handleCardDelete = (card) => {
    setDeleteCardPopupButtonText(true);
    api.deleteInitialCards(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setDeleteCardPopupButtonText(false);
      });
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api.likeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleUpdateAvatar = (data) => {
    setEditAvatarPopupButtonText(true);
    api.changeAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setEditAvatarPopupButtonText(false);
      });
  }

  const handleAddPlacePopup = (card) => {
    setAddPlacePopupButtonText(true);
    api.addNewCard(card)
      .then((newCards) => {
        setCards([newCards, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setAddPlacePopupButtonText(false);
      });
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header
                    title='Выйти'
                    route='*'
                    onLogOut = {cbLogOut}
                    email = {email}
          />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  component={Main}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteClick}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <>
                  <Login onLogin={cbAuthorize} />
                </>
              }
            />
            <Route
              path="/sign-up"
              element={
                <>
                  <Register onRegister={cbRegister} />
                </>
              }
            />
          </Routes>
          <Footer />
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                onLoading={isEditProfilePopupOnLoading}
              />
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                onLoading={isEditAvatarPopupOnLoading}
              />
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlacePopup}
                onLoading={isAddPlacePopupOnLoading}
              />
              <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
              />
              <DeleteCardPopup
                isOpen={isDeleteCardPopupOpen}
                onClose={closeAllPopups}
                onDeleteCard={handleCardDelete}
                onLoading={isDeleteCardPopupOnLoading}
                card={cardToDelete}
              />
              <InfoTooltip
                image={infoTooltipImage}
                title={infoTooltipTitle}
                isOpen={infoTooltip}
                onClose={closeAllPopups}
              />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
