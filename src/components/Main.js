import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(props) {


  const currentUser = React.useContext(CurrentUserContext);


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
        {props.cards.map((card, i) => {
          return (
            <Card className="card" key={card._id} onCardClick={props.onCardClick} card={card} onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete} />
          );
        })}
      </section>
    </main >);
}

export default Main;