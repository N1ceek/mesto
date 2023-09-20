import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
// import InitialCards from '../components/constants.js'
import Api from '../components/Api.js'

const optionsApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-75', 
  headers: {
    authorization: 'c93266f4-3810-4ed9-b9a5-2b3716bdbb15',
    'Content-Type': "application/json"
  }
}
const api = new Api(optionsApi)
api.getUserInfo()
.then((profile) => {
  userInfo.setUserInfo(profile)
})
api.getCards()
.then((cards) => {
  const section = new Section({items:cards ,renderer:createCard}, '.cards')
  section.renderItems();
})

const formElementEdit = document.querySelector('.form_type_edit');
const formElementAdd = document.querySelector('.form_type_add');
const buttonOpenEditPopup = document.querySelector('.profile__edit-button');
const buttonOpenAddPopup = document.querySelector('.profile__add-button');
const nameInput = formElementEdit.querySelector('.form__input_value_name');
const aboutInput = formElementEdit.querySelector('.form__input_value_about');
const templateSelector = '#template'
const cards = document.querySelector('.cards');
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
const handleFormSubmitEdit = (profile) => {
  userInfo.setUserInfo(profile)
  console.log(profile)
  api.sendUserInfo(profile)
  popupWithFormEdit.close();

};
const handleFormSubmitAdd = (card) => {
  const newCardData = {
    name: card.title,
    link: card.link
  };
  const newCard = createCard(newCardData);
  cards.prepend(newCard);
  formElementAdd.reset();
  popupWithFormAdd.close()
};
const handleLikesCard = (id) => {
  api.addCardLike(id)
  .then((res) => {
    card.updateCardLike(res);
    card.renderCardLike();
  })
  .catch((error) => { console.log(`При лайке карточки возникла ошибка, ${error}`) })
}
const handleDeleteLike = (id) => {
  api.deleteCardLike(id)
  .then((res) => {
    card.updateCardLike(res);
    card.renderCardLike();
  })
  .catch((error) => { console.log(`При дизлайке карточки возникла ошибка, ${error}`) })
}
const handleDelete = (id) => {
  popupDelete.open();
  popupDelete.addSubmitHandler(() => {
    api.deleteCard(data._id)
    .then(() => {
      card._remove();
      popupDelete.close();
    })
    .catch((error) => { console.log(`При закрытии карточки возникла ошибка, ${error}`) })
  });
}
const createCard = (data) => {
  const card = new Card(data, templateSelector, userId, handleOpenImage, handleDelete, handleLikesCard, handleDeleteLike);
  return card.createCard();
};
const popupWithFormEdit = new PopupWithForm('.popup_type_edit', handleFormSubmitEdit)
const popupWithFormAdd = new PopupWithForm('.popup_type_add', handleFormSubmitAdd)
const popupWithImage = new PopupWithImage('.popup_photo')
popupWithImage.setEventListeners();
const userInfo = new UserInfo('.profile__name', '.profile__workplace')


const handleOpenImage = (link, name) => {
 popupWithImage.open(link, name);
};

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