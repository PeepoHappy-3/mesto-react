import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const ref = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({ avatar: ref.current.value });
  }
  return (
    <PopupWithForm name="avatar" title="Обновить аватар"
      isOpened={props.isOpened} onClose={props.onClose} onSubmit={handleSubmit}>
      <input id="avatar-input" type="url" className="popup__input  popup__input_type_link"
        placeholder="Ссылка на картинку" name="avatar" required ref={ref} />
      <span id="avatar-input-error" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;