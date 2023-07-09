import Card from './Card.js';
import FormValidator from './FormValidator.js'
const formElementEdit = document.querySelector('.form_type_edit');
const formElementAdd = document.querySelector('.form_type_add');
const buttonOpenEditPopup = document.querySelector('.profile__edit-button');
const buttonOpenAddPopup = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const nameInput = document.querySelector('.form__input_value_name');
const aboutInput = document.querySelector('.form__input_value_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__workplace');
const buttonsClosePopup = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const popupPhoto = document.querySelector(`.popup_photo`);
const templateElements = document.querySelector('#template').content;


const titleInput = document.querySelector('.form__input_value_title');
const linkInput = document.querySelector('.form__input_value_link');
const card = templateElements.querySelector('.card'); 
const cards = document.querySelector('.cards');
const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
};
const closePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
};
const handleFormSubmitEdit = (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup(popupEdit);
}
const handleFormSubmitAdd = (evt) => {
    evt.preventDefault();
    closePopup(popupAdd);
}
function handleFormSubmit (evt){
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup(popupEdit)
  };
const preloadEditPopup = () => {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
}
preloadEditPopup();
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
};
popups.forEach(popup => {
    popup.addEventListener('click',(evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(popup);
        }
    })
})
buttonsClosePopup.forEach((btn) => {
    const popup = btn.closest('.popup')
    btn.addEventListener('click', () => {
        closePopup(popup);
    })
});
  initialCards.forEach(function (item) {
    const newCards = new Card(item);
    cards.prepend(newCards.createCard())
    
  });
  console.log(initialCards)
  formElementEdit.addEventListener('submit', handleFormSubmitEdit);
  formElementAdd.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const newCard = new Card({ name: titleInput.value, link: linkInput.value });
    cards.prepend(newCard.createCard())
    closePopup(popupAdd)
  });
 
  buttonOpenEditPopup.addEventListener('click', function () {
    cleanValidationMessage(popupEdit);
    preloadEditPopup();
    openPopup(popupEdit);
  });
  buttonOpenAddPopup.addEventListener('click', function () {
    cleanValidationMessage(popupAdd);
    openPopup(popupAdd);
    formElementAdd.reset();
  });
  const profileValidator = new FormValidator(validationConfig, popupEdit);
  profileValidator.enableValidation();

  const imageAddValidator = new FormValidator(validationConfig, popupAdd);
  imageAddValidator.enableValidation();