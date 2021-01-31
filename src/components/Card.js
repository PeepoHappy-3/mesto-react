function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <div className={props.className} onClick={handleClick}>
      {props.card}
    </div>
  );
}
export default Card;