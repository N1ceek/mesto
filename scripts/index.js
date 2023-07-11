import Card from './Card.js';
import FormValidator from './FormValidator.js';

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
const popupPhoto = document.querySelector('.popup_photo');
const templateSelector = '#template'
const cards = document.querySelector('.cards');
const title = formElementAdd.querySelector('.form__input_value_title');
const link = formElementAdd.querySelector('.form__input_value_link');



const popupImage = document.querySelector('.popup__photo-images');
const popupCaption = document.querySelector('.popup__photo-title');

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  disabledButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_error-text',
  errorClass: 'form__input-error',
};
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
};



const preloadEditPopup = () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
};

preloadEditPopup();

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

buttonsClosePopup.forEach((btn) => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => {
    closePopup(popup);
  });
});

const profileValidator = new FormValidator(validationConfig, formElementEdit);
profileValidator.enableValidation();

const imageAddValidator = new FormValidator(validationConfig, formElementAdd);
imageAddValidator.enableValidation();

const createCard = (data) => {
  const card = new Card(data, templateSelector, openPopup);
  return card.createCard();
  
};
initialCards.forEach((item) => {
  const newCard = createCard(item);
  cards.appendChild(newCard);
});
const handleFormSubmitAdd = (evt) => {
  evt.preventDefault();
  const newCardData = {
    name: title.value,
    link: link.value
  };
  const newCard = createCard(newCardData);
  cards.prepend(newCard);
  closePopup(popupAdd);
  formElementAdd.reset();
};
formElementEdit.addEventListener('submit', handleFormSubmitEdit);

formElementAdd.addEventListener('submit', handleFormSubmitAdd);

buttonOpenEditPopup.addEventListener('click', () => {
    profileValidator.cleanValidationMessage();
    preloadEditPopup();
    openPopup(popupEdit);
  });
  
  buttonOpenAddPopup.addEventListener('click', () => {
    imageAddValidator.cleanValidationMessage();
    imageAddValidator.enableValidation();
    openPopup(popupAdd);
    formElementAdd.reset();
  });
 