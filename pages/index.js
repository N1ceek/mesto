import '../pages/index.css'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api';
import PopupDelete from '../components/PopupDelete.js'
import {InitialCards, formElementEdit, formElementAdd,
  formElementAvatar, buttonOpenEditPopup, buttonOpenAddPopup,
  buttonOpenAvatarPopup, nameInput, aboutInput, avatarInput,
  templateSelector, cards} from '../utils/constants.js';
import {validationConfig} from '../utils/constants.js'
import {formValidators} from '../utils/constants.js'
let userId;


const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
const apiOp = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-75',
  headers: {
    authorization: 'c93266f4-3810-4ed9-b9a5-2b3716bdbb15',
    'Content-Type': 'application/json'
  }
}

const api = new Api(apiOp);

const createCard = (data) => {
  const Likes = (id) => {
    api.addCardLike(id)
    .then((res) => {
      card.updateCardLike(res);
      card.renderCardLike();
    })
    .catch((error) => { console.log(`При лайке карточки возникла ошибка, ${error}`) })
  }
  const Dislake = (id) => {
    api.deleteCardLike(id)
    .then((res) => {
      card.updateCardLike(res);
      card.renderCardLike();
    })
    .catch((error) => { console.log(`При дизлайке карточки возникла ошибка, ${error}`) })
  }
  const Delete = (id) => {
    popupDelete.open();
    popupDelete.addSubmitHandler(() => {
      api.deleteCard(data._id)
      .then(() => {
        card.remove();
        popupDelete.close();
      })
      .catch((error) => { console.log(`При закрытии карточки возникла ошибка, ${error}`) })
    });
  }

  const card = new Card(data, templateSelector, userId, handleImageOpen, Likes, Dislake, Delete);
  return card.createCard();
};
const section = new Section({renderer:createCard}, '.cards');
api.getAllNeededData()
  .then(( [cards, userData] ) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    section.renderItems(cards);
  })
  .catch((error) => console.log(error))

const handleFormSubmitEdit = (profile) => {
  
  api.sendUserInfo(profile)
  .then(() =>{
    userInfo.setUserInfo(profile);
    popupWithFormEdit.close();
  })
  .catch((error) => {
    return { error: error.message }; // Возвращаем объект с информацией об ошибке
});
};

const handleFormSubmitAdd = (card) => {
  const newCardData = {
    name: card.title,
    likes: [],
    link: card.link,
    owner: {
      _id: userId
    }
  };

  api.createNewCard(newCardData)
  .then(() => {
    api.getCards()
    .then((thiscards) => {
      var createdCard = thiscards.filter((thiscard) => thiscard.owner._id == userId)[0];
      newCardData._id = createdCard._id;

      const newCard = createCard(newCardData);
      section.addItem(newCard);
      popupWithFormAdd.close();
    })
  })
  .catch((error) => {
    return { error: error.message }; // Возвращаем объект с информацией об ошибке
});
  
};

const handleFormSubmitAvatar = (data) => {
  api.handleUserAvatar(data)
   .then((data) => {
    userInfo.setAvatar(data);
    formValidators['popupAvatarForm'].resetValidation();
    formValidators['popupAvatarForm'].cleanValidationMessage();
    popupAvatar.close();
  })
  .catch((error) => console.log(error))
  .finally(() => popupAvatar.renderLoading(false))
}

const popupAvatar = new PopupWithForm('.popup_avatar-edit', handleFormSubmitAvatar)
const popupWithFormEdit = new PopupWithForm('.popup_type_edit', handleFormSubmitEdit)
const popupWithFormAdd = new PopupWithForm('.popup_type_add', handleFormSubmitAdd)
const popupWithImage = new PopupWithImage('.popup_photo')

const userInfo = new UserInfo('.profile__name', '.profile__workplace', '.profile__avatar')
const popupDelete = new PopupDelete('.popup_type_delete');

// api.getUserInfo()
// .then((profile) => {
//   userInfo.setUserInfo(profile)
// })
// .catch((error) => {
//   return { error: error.message }; // Возвращаем объект с информацией об ошибке
// });

const handleImageOpen = (name, link) => {
 popupWithImage.open(link, name);
};
buttonOpenEditPopup.addEventListener('click', () => {
  popupWithFormEdit.open()
  const profile = userInfo.getUserInfo()
  popupWithFormEdit.setInputValues(profile)
  // nameInput.value = profile.fullName
  // aboutInput.value = profile.workplace
  formValidators['edit-profile'].resetValidation()
  formValidators['edit-profile'].cleanValidationMessage();

  });

  buttonOpenAddPopup.addEventListener('click', () => {
    popupWithFormAdd.open()
    formValidators['add-profile'].resetValidation()
  });
  
  enableValidation(validationConfig);
  
  buttonOpenAvatarPopup.addEventListener('click', () => {
    popupAvatar.open()
    const profile = userInfo.getUserInfo()
    avatarInput.value = profile.avatar
    formValidators['popupAvatarForm'].resetValidation()
  });
  popupWithImage.setEventListeners();
  popupDelete.setEventListeners();
  popupAvatar.setEventListeners();