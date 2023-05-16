let edit = document.querySelector(`.profile__edit-button`);
let popupOpen = document.querySelector('.popup');
edit.addEventListener(`click`, function() {
  popupOpen.classList.add(`popup__opened`)
});
let editClose = document.querySelector(`.popup__close`);
editClose.addEventListener(`click`, function() {
  popupOpen.classList.remove(`popup__opened`)
});
edit.addEventListener(`click`, function() {
  popupOpen.classList.add(`popup__opened`)
})
let sumbit = document.querySelector(`.form__save-button`).onclick = handleFormSubmit;

function handleFormSubmit(evt) {
  //get input
  evt.preventDefault();
  let nameInput = document.querySelector(`.form__input_type_user-name`).value;
  document.querySelector(`.profile__name`).innerHTML = nameInput;
  let jobInput = document.querySelector(`.form__input_type_about`).value;
  document.querySelector(`.profile__workplace`).innerHTML = jobInput;
  popupOpen.classList.remove(`popup__opened`);

};