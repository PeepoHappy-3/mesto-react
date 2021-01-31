function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpened && "popup_opened"}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={props.onClose}></button>
        <form action="#" className="popup__form" name={props.name} noValidate>
          <h2 className="popup__title">
            {props.title}
          </h2>
          {props.children}
          <button type="submit" className="popup__submit" disabled>Сохранить</button>
        </form>
      </div>
    </div >
  );
}

export default PopupWithForm;