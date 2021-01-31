function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <div className={props.className} onClick={handleClick}>
      <>
        <img src={props.card.link} alt={props.card.name} className="card__image" />
        <button type="button" className="card__delete"></button>
        <div className="card__body">
          <h3 className="card__heading">{props.card.name}</h3>
          <div className="card__like">
            <button type="button" className="card__btn"></button>
            <span className="card__like-count">{props.card.likes.length}</span>
          </div>
        </div>
      </>
    </div>
  );
}
export default Card;