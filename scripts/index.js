// POPUP EDIT/ADD
const formElementEdit = document.querySelector('.form__edit');
const formElementAdd = document.querySelector('.form__add');
const buttonOpenEditPopup = document.querySelector('.profile__edit-button');
const buttonOpenAddPopup = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup__edit');
const popupAdd = document.querySelector('.popup__add');
const nameInput = document.querySelector('.form__input_value_name');
const aboutInput = document.querySelector('.form__input_value_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__workplace');
const buttonsClosePopup = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const popupPhoto = document.querySelector(`.popup_photo`);
const templateElements = document.querySelector('#template').content;
const image = document.querySelector('.popup__img');
const imageCaption = document.querySelector('.popup__photo-title');
const popupImage = document.querySelector('.popup__photo-image');
const titleInput = document.querySelector('.form__input_value_title');
const linkInput = document.querySelector('.form__input_value_link');
const card = templateElements.querySelector('.card'); 
const cards = document.querySelector('.cards');
const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
    formElementAdd.reset();
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
    disableSubmitButton();
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
function createCards(el) {
    const initCard = card.cloneNode(true);
    const initCardImg = initCard.querySelector('.card__image');
    const initCardTitle = initCard.querySelector('.card__name');
    const buttonRemove = initCard.querySelector('.card__remove');
    const buttonLike = initCard.querySelector('.card__like');
    initCardTitle.textContent = el.name;
    initCardImg.src = el.link;  
    buttonLike.addEventListener('click', function () { 
    buttonLike.classList.toggle('card__like_activeted');
    });
    initCardImg.addEventListener('click', function (event) {
      openPopup(popupPhoto);
      photoImages.src = initCardImg.src;
      photoTitle.textContent = initCardTitle.textContent;
    });
    buttonRemove.addEventListener('click', function () {
      const сard = buttonRemove.closest('.card');
      сard.remove();
      });
    return initCard;
  };
  initialCards.forEach(function (item) {
    const newCards = createCards(item);
    cards.prepend(newCards);
  });
  formElementEdit.addEventListener('submit', handleFormSubmitEdit);
  formElementEdit.addEventListener(`submit`, handleFormSubmit);
  formElementAdd.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const newCard = createCards({ name: titleInput.value, link: linkInput.value });
    cards.prepend(newCard);
    closePopup(popupAdd)
  });
  buttonOpenEditPopup.addEventListener('click', function () {
    cleanValidationMessage(popupEdit);
    preloadEditPopup();
    enableSubmitButton();
    openPopup(popupEdit);
  });
  buttonOpenAddPopup.addEventListener('click', function () {
    cleanValidationMessage(popupAdd);
    disableSubmitButton();
    openPopup(popupAdd);
  });
  
formElementAdd.addEventListener('submit', handleFormSubmitAdd);