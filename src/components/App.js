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

function App() {
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = React.useState(false);
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = React.useState(false);
  const [isAddPlacePopupOpened, setIsAddPlacePopupOpened] = React.useState(false);
  const [isImagePopupOpened, setIsImagePopupOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});

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
  return (
    <>
      <div className="page">
        <div className="page__container">
          <CurrentUserContext.Provider value={currentUser}>
            <Header src={Logo} />
            <Main onEditAvatar={handleAvatarClick} onEditProfile={handleProfileClick} onAddPlace={handleAddClick} onCardClick={handleCardClick} />
            <Footer />
            <EditProfilePopup isOpened={isEditProfilePopupOpened} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          </CurrentUserContext.Provider>
        </div>

        <PopupWithForm name="avatar" title="Обновить аватар" isOpened={isEditAvatarPopupOpened} onClose={closeAllPopups}>
          <input id="avatar-input" type="url" className="popup__input  popup__input_type_link" placeholder="Ссылка на картинку" name="avatar" required />
          <span id="avatar-input-error" className="popup__error"></span>
        </PopupWithForm>

        <PopupWithForm name="add-card" title="Новое место" isOpened={isAddPlacePopupOpened} onClose={closeAllPopups}>
          <input id="place-input" type="text" className="popup__input popup__input_type_place" placeholder="Название" name="name" required minLength="2" maxLength="30" />
          <span id="place-input-error" className="popup__error"></span>
          <input id="link-input" type="url" className="popup__input popup__input_type_link" placeholder="Ссылка на картинку" name="link" required />
          <span id="link-input-error" className="popup__error"></span>
        </PopupWithForm>
        <PopupWithForm name="confirm" title="Вы уверены?" onClose={closeAllPopups} />
        <ImagePopup card={selectedCard} isOpened={isImagePopupOpened} onClose={closeAllPopups} />
      </div>
    </>
  );
}

export default App;
