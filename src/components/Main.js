import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    async function getContent() {
      try {
        const userInfo = await api.getProfileInfo();
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
      } catch (e) {
        console.log(e);
      }
      try {
        setCards(await api.getInitialCards());
      } catch (e) {
        console.log(e);
      }
    }
    getContent();
  }, []);
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__inner">
          <div className="profile__overlay" onClick={props.onEditAvatar}></div>
          <img src={userAvatar} alt="Жак-Ив Кусто." className="profile__photo" />
        </div>
        <div className="profile__column">
          <div className="profile__row">
            <h1 className="profile__title">{userName}</h1>
            <button type="button" className="profile__btn profile__btn_edit" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__subtitle">
            {userDescription}
          </p>
        </div>
        <button type="button" className="profile__btn profile__btn_add" onClick={props.onAddPlace}></button>
      </section>
      <section className="cards-gallery">
        {cards.map((card, i) => {
          return (
            <Card className="card" key={card._id} onCardClick={props.onCardClick} card={
              <>
                <img src={card.link} alt={card.name} className="card__image" />
                <button type="button" className="card__delete"></button>
                <div className="card__body">
                  <h3 className="card__heading">{card.name}</h3>
                  <div className="card__like">
                    <button type="button" className="card__btn"></button>
                    <span className="card__like-count">{card.likes.length}</span>
                  </div>
                </div>
              </>}>

            </Card>
          );
        })}
      </section>
    </main >);
}

export default Main;