import Logo from '../images/logo.svg';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = React.useState(false);
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = React.useState(false);
  const [isAddPlacePopupOpened, setIsAddPlacePopupOpened] = React.useState(false);
  const [isImagePopupOpened, setIsImagePopupOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    async function getContent() {
      try {
        setCards(await api.getInitialCards());
      } catch (e) {
        console.log(e);
      }
    }
    getContent();
  }, []);

  async function handleCardLike(card) {
    const isLiked = card.likes.some((l) => {
      return l._id === currentUser._id;
    });
    try {
      const newCard = await api.changeLikeStatus(card._id, isLiked);
      const newCards = cards.map((c) => {
        return c._id === card._id ? newCard : c;
      });
      setCards(newCards);
    }
    catch (e) {
      console.log(e.message);
    }
  }

  async function handleCardDelete(card) {
    try {
      await api.deleteCard(card._id);
      const newCards = cards.filter((c) => {
        return c._id !== card._id;
      })
      setCards(newCards);
    } catch (e) {
      console.log(e.message);
    }
  }
  React.useEffect(() => {
    async function getUserInfo() {
      try {
        setCurrentUser(await api.getProfileInfo());
      } catch (e) {
        console.log(e.message);
      }
    }
    getUserInfo();
  }, []);
  function handleAvatarClick() {
    setIsEditAvatarPopupOpened(true);
  }
  function handleProfileClick() {
    setIsEditProfilePopupOpened(true);
  }
  function handleAddClick() {
    setIsAddPlacePopupOpened(true);
  }

  function handleCardClick(card) {
    setSelectedCard({
      ...selectedCard,
      src: card.link,
      name: card.name
    });
    setIsImagePopupOpened(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpened(false);
    setIsEditProfilePopupOpened(false);
    setIsAddPlacePopupOpened(false);
    setIsImagePopupOpened(false);
  }

  async function handleUpdateUser(user) {
    try {
      setCurrentUser(await api.setProfileInfo(user));
      closeAllPopups();
    } catch (e) {
      console.log(e.message);
    }
  }

  async function handleUpdateAvatar(link) {
    try {
      setCurrentUser(await api.setProfileAvatar(link));
      closeAllPopups();
    }
    catch (e) {
      console.log(e.message);
    }
  }

  async function handleAddPlaceSubmit(data) {
    try {
      setCards([await api.postNewCard(data), ...cards]);
      closeAllPopups();
    } catch (e) {
      console.log(e.message);
    }
  }
  return (
    <>
      <div className="page">
        <div className="page__container">
          <CurrentUserContext.Provider value={currentUser}>
            <Header src={Logo} />
            <Main onEditAvatar={handleAvatarClick} onEditProfile={handleProfileClick}
              onAddPlace={handleAddClick} onCardClick={handleCardClick}
              cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
            <Footer />
            <EditProfilePopup isOpened={isEditProfilePopupOpened} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
            <EditAvatarPopup isOpened={isEditAvatarPopupOpened} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
            <AddPlacePopup isOpened={isAddPlacePopupOpened} onClose={closeAllPopups} onSubmit={handleAddPlaceSubmit} />
          </CurrentUserContext.Provider>
        </div>
        <PopupWithForm name="confirm" title="Вы уверены?" onClose={closeAllPopups} />
        <ImagePopup card={selectedCard} isOpened={isImagePopupOpened} onClose={closeAllPopups} />
      </div>
    </>
  );
}

export default App;
