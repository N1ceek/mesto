const popup = document.querySelector(`.popup`);

const popupEdit = document.querySelector(`.popup_edit`);
const popupAdd = document.querySelector(`.popup_add`);
const popupPhoto = document.querySelector(`.popup_photo`);
const buttonAddOpen = document.querySelector(`.profile__add-button`);
const buttonEditOpen = document.querySelector(`.profile__edit-button`);
const buttonClose = document.querySelectorAll(`.popup__close`);
const buttonCloseEdit = document.querySelector(`.popup__close_edit`);
const buttonCloseAdd = document.querySelector(`.popup__close_add`);
const buttonClosePhoto = document.querySelector(`.popup__close_photo`);
const nameInput = document.querySelector(`.form__input_type_user-name`);
const aboutInput = document.querySelector(`.form__input_type_about`);
const formEdit = document.querySelector(`.form_edit`);
const profileName = document.querySelector(`.profile__name`);
const profielWorkplace = document.querySelector(`.profile__workplace`);
const formCard = document.querySelector('.form_add');
const templateContent = document.querySelector('.template').content; 
const card = templateContent.querySelector('.card'); 
const cards = document.querySelector('.cards');
const formPlaceInput = document.querySelector(`.form__input_type_place`);
const formPlaceUrl = document.querySelector(`.form__input_type_link`);
const photoTitle = document.querySelector('.popup__photo-title');
const photoImages = document.querySelector('.popup__photo-images');

//открытие и закрытие попапов
function openPopup(popup) {
  popup.classList.add(`popup_opened`);
  document.addEventListener('keydown', closePopupOnEsc);
  document.addEventListener('mousedown', closePopupOnClick);
};
function closePopup(popup) {
  popup.classList.remove(`popup_opened`);
  document.addEventListener('keydown', closePopupOnEsc);
  document.addEventListener('mousedown', closePopupOnClick);
};
const closePopupOnEsc = evt => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};
const closePopupOnClick = evt => {
  const evtTarget = evt.target;
  if (evtTarget.classList.contains('popup')) {
    closePopup(evtTarget);
  }
};



function handleFormSubmit (evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profielWorkplace.textContent = aboutInput.value;
  closePopup(popupEdit)
};
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
formEdit.addEventListener(`submit`, handleFormSubmit);
formCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newCard = createCards({ name: formPlaceInput.value, link: formPlaceUrl.value });
  cards.prepend(newCard);
  closePopup(popupAdd)
});
buttonCloseEdit.addEventListener('click', function () {
  closePopup(popupEdit)
});
buttonCloseAdd.addEventListener('click', function () { 
  closePopup(popupAdd)
});
buttonClosePhoto.addEventListener('click', function () { 
  closePopup(popupPhoto)
});
buttonAddOpen.addEventListener('click', function () { 
  openPopup(popupAdd)
});
buttonEditOpen.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  aboutInput.value = profielWorkplace.textContent;
});
