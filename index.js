// let 


let edit = document.querySelector(`.profile__edit-button`);
let popupOpen = document.querySelector('.popup');
let editClose = document.querySelector(`.popup__close`);
let formElement = document.querySelector(`.form`);
let nameInput = formElement.querySelector(`.form__input_type_user-name`);
let jobInput = formElement.querySelector(`.form__input_type_about`);
let profileName = document.querySelector(`.profile__name`);
let profielWorkplace = document.querySelector(`.profile__workplace`);

// function


function openEdit() {
  popupOpen.classList.add(`popup_opened`)
  nameInput.textContent = profileName.value
  

};
function closeEdit() {
  popupOpen.classList.remove(`popup_opened`)
};
function handleFormSubmit (evt){
  evt.preventDefault();
  nameInput.value
  profileName.textContent = nameInput.value;
  jobInput.value
  profielWorkplace.textContent = jobInput.value;
  popupOpen.classList.remove(`popup_opened`);
};


// listener


edit.addEventListener(`click`, openEdit);
editClose.addEventListener(`click`, closeEdit);
formElement.addEventListener('submit', handleFormSubmit);
