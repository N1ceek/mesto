import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import InitialCards from '../components/constants.js'


const formElementEdit = document.querySelector('.form_type_edit');
const formElementAdd = document.querySelector('.form_type_add');
const buttonOpenEditPopup = document.querySelector('.profile__edit-button');
const buttonOpenAddPopup = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const nameInput = formElementEdit.querySelector('.form__input_value_name');
const aboutInput = formElementEdit.querySelector('.form__input_value_about');
// const profileName = document.querySelector('.profile__name');
// const profileAbout = document.querySelector('.profile__workplace');
const buttonsClosePopup = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
// const popupImage = document.querySelector('.popup__photo-images');
// const popupCaption = document.querySelector('.popup__photo-title');
// const popupPhoto = document.querySelector('.popup_photo');
const templateSelector = '#template'
const cards = document.querySelector('.cards');
// const title = document.querySelector('.form__input_value_title');
// const link = document.querySelector('.form__input_value_link');
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  disabledButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_error-text',
  errorClass: 'form__input-error',
};
const formValidators = {}
const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
};
const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};
const handleFormSubmitEdit = (profile) => {
  userInfo.setUserInfo(profile)
  closePopup(popupEdit);
};
const handleFormSubmitAdd = (card) => {
  const newCardData = {
    name: card.title,
    link: card.link
  };
  const newCard = createCard(newCardData);
  cards.prepend(newCard);
  closePopup(popupAdd);
  formElementAdd.reset();
  console.log(card)
};
const createCard = (data) => {
  const card = new Card(data, templateSelector, handleImageOpen);
  return card.createCard();
};
const popupWithFormEdit = new PopupWithForm('.popup_type_edit', handleFormSubmitEdit)
const popupWithFormAdd = new PopupWithForm('.popup_type_add', handleFormSubmitAdd)
const popupWithImage = new PopupWithImage('.popup_photo')
const userInfo = new UserInfo('.profile__name', '.profile__workplace')
const section = new Section({items:InitialCards,renderer:createCard}, '.cards')
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
    console.log('123')
  });
});
const handleImageOpen = (link, name) => {
 popupWithImage.open(link, name)
};
section.renderItems();
buttonOpenEditPopup.addEventListener('click', () => {
  popupWithFormEdit.open()
  const profile = userInfo.getUserInfo()
  nameInput.value = profile.fullName
  aboutInput.value = profile.workplace
  formValidators['edit-profile'].resetValidation()
  formValidators['edit-profile'].cleanValidationMessage();
  });
  buttonOpenAddPopup.addEventListener('click', () => {
    popupWithFormAdd.open()
    formValidators['add-profile'].resetValidation()
    formElementAdd.reset(); 
  });
  enableValidation(validationConfig);