import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
  const [cards, setCards] = React.useState([]);

  const currentUser = React.useContext(CurrentUserContext);

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
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__inner">
          <div className="profile__overlay" onClick={props.onEditAvatar}></div>
          <img src={currentUser.avatar} alt={`Аватар ${currentUser.name}`} className="profile__photo" />
        </div>
        <div className="profile__column">
          <div className="profile__row">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button type="button" className="profile__btn profile__btn_edit" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__subtitle">
            {currentUser.about}
          </p>
        </div>
        <button type="button" className="profile__btn profile__btn_add" onClick={props.onAddPlace}></button>
      </section>
      <section className="cards-gallery">
        {cards.map((card, i) => {
          return (
            <Card className="card" key={card._id} onCardClick={props.onCardClick} card={card} onCardLike={handleCardLike}
              onCardDelete={handleCardDelete} />
          );
        })}
      </section>
    </main >);
}

export default Main;