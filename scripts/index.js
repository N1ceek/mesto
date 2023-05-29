const edit = document.getElementById(`edit`);
const add = document.getElementById(`add`);
const photo = document.getElementById(`popupPhoto`);
const editOpen = document.querySelector(`.profile__edit-button`);
const editClose = document.getElementById(`edit_close`);
const addOpen = document.querySelector(`.profile__add-button`);
const addClose = document.getElementById(`add_close`);
const photoClose = document.getElementById(`photo_close`);
const nameInput = document.getElementById(`username`);
const aboutInput = document.getElementById(`about`);
const formEdit = document.getElementById(`FormEdit`);
const profileName = document.querySelector(`.profile__name`);
const profielWorkplace = document.querySelector(`.profile__workplace`);
const formCard = document.getElementById('formAdd');
const templateContent = document.getElementById('template').content; 
const card = templateContent.getElementById('card'); 
const photoSection = document.getElementById('cards');
const formPlaceInput = document.getElementById(`place`);
const formPlaceUrl = document.getElementById(`link`);



function close() {
  edit.classList.remove('popup_opened');
  add.classList.remove('popup_opened');
}
function closePhoto() {
  photo.classList.remove(`popup_opened`)
}
function handleFormSubmit (evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profielWorkplace.textContent = aboutInput.value;
  close()
};


formEdit.addEventListener(`submit`, handleFormSubmit);
editOpen.addEventListener('click', () => {
  edit.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  aboutInput.value = profielWorkplace.textContent;
});
editClose.addEventListener('click', close);
addClose.addEventListener('click', close);
photoClose.addEventListener('click', closePhoto);
addOpen.addEventListener('click', () => {
  add.classList.add('popup_opened');
});
formCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newCard = createCards({ name: formPlaceInput.value, link: formPlaceUrl.value });
  photoSection.prepend(newCard);
  close();
});





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
initialCards.forEach(function (item) {
  const newCards = createCards(item);
  photoSection.prepend(newCards);
});
function createCards(el) {
  const initCard = card.cloneNode(true);
  const initCardImg = initCard.querySelector('.card__image');
  initCardImg.src = el.link; 
  const initCardTitle = initCard.querySelector('.card__name');
  initCardTitle.textContent = el.name;
  const initCardRemove = initCard.querySelector('.card__remove');
  const buttonLike = initCard.querySelector('.card__like'); 
  buttonLike.addEventListener('click', function () { 
  buttonLike.classList.toggle('card__like_activeted');
  });
    initCardRemove.addEventListener('click', function () {
    сard = initCardRemove.closest('.card'); 
  });
  const buttonRemove = initCard.querySelector('.card__remove');
  const photoTitle = document.getElementById('photoTitle');
  const photoImages = document.getElementById('photoImages');
  initCardImg.addEventListener('click', function (event) {
    photo.classList.add('popup_opened');
    photoImages.src = initCardImg.src;
    photoTitle.textContent = initCardTitle.textContent;
  });
  buttonRemove.addEventListener('click', function () {
  const сard = buttonRemove.closest('.card');
  сard.remove();
  });
  return initCard;
};