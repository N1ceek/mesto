const popupEdit = document.getElementById(`edit`);
const popupAdd = document.getElementById(`add`);
const popupPhoto = document.getElementById(`popupPhoto`);
const buttonEditOpen = document.querySelector(`.profile__edit-button`);
const buttonEditClose = document.getElementById(`edit_close`);
const buttonAddOpen = document.querySelector(`.profile__add-button`);
const buttonAddClose = document.getElementById(`add_close`);
const buttonPhotoClose = document.getElementById(`photo_close`);
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
const photoTitle = document.getElementById('photoTitle');
const photoImages = document.getElementById('photoImages');
function close() {
  popupEdit.classList.remove('popup_opened');
  popupAdd.classList.remove('popup_opened');
  popupPhoto.classList.remove(`popup_opened`);
};
function handleFormSubmit (evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profielWorkplace.textContent = aboutInput.value;
  close()
};
formEdit.addEventListener(`submit`, handleFormSubmit);
buttonEditOpen.addEventListener('click', () => {
  popupEdit.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  aboutInput.value = profielWorkplace.textContent;
});
buttonEditClose.addEventListener('click', close);
buttonAddClose.addEventListener('click', close);
buttonPhotoClose.addEventListener('click', close);
buttonAddOpen.addEventListener('click', () => {
  popupAdd.classList.add('popup_opened');
});
formCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newCard = createCards({ name: formPlaceInput.value, link: formPlaceUrl.value });
  photoSection.prepend(newCard);
  close();
});

initialCards.forEach(function (item) {
  const newCards = createCards(item);
  photoSection.prepend(newCards);
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
    popupPhoto.classList.add('popup_opened');
    photoImages.src = initCardImg.src;
    photoTitle.textContent = initCardTitle.textContent;
  });
  buttonRemove.addEventListener('click', function () {
    const сard = buttonRemove.closest('.card');
    сard.remove();
    });
  return initCard;
};