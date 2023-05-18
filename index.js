let edit = document.querySelector(`.profile__edit-button`);
let popupOpen = document.querySelector('.popup');
edit.addEventListener(`click`, function() {
  popupOpen.classList.add(`popup_opened`)
});
let editClose = document.querySelector(`.popup__close`);
editClose.addEventListener(`click`, function() {
  popupOpen.classList.remove(`popup_opened`)
});
edit.addEventListener(`click`, function() {
  popupOpen.classList.add(`popup_opened`)
});
let formElement = document.querySelector(`.form`);
let nameInput = formElement.querySelector(`.form__input_type_user-name`);
let jobInput = formElement.querySelector(`.form__input_type_about`);
formElement.addEventListener('submit', handleFormSubmit);
function handleFormSubmit (evt){
  evt.preventDefault();
  console.log(nameInput.value)
  document.querySelector(`.profile__name`).textContent = nameInput.value;
  console.log(jobInput.value)
  document.querySelector(`.profile__workplace`).textContent = jobInput.value;
  popupOpen.classList.remove(`popup_opened`);
}