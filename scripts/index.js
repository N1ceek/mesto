//popup
const edit = document.getElementById(`edit`);
const add = document.getElementById(`add`);
//buttons
const editOpen = document.querySelector(`.profile__edit-button`);
const editClose = document.getElementById(`edit_close`);
const addOpen = document.querySelector(`.profile__add-button`);
const addClose = document.getElementById(`add_close`);
//form
const nameInput = document.getElementById(`username`);
const aboutInput = document.getElementById(`about`);
const placeInput = document.getElementById(`place`);
const linkInput = document.getElementById(`link`);



const formEdit = document.getElementById(`FormEdit`);
const profileName = document.querySelector(`.profile__name`);
const profielWorkplace = document.querySelector(`.profile__workplace`);



function close() {
  edit.classList.remove('popup_opened');
  add.classList.remove('popup_opened');
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


editClose.addEventListener('click', () => {
  close();
});

addClose.addEventListener('click', () => {
  close();
});

addOpen.addEventListener('click', () => {
  add.classList.add('popup_opened');
});



const formCard = document.getElementById('formAdd');
const templateContent = document.getElementById('template').content; 
const card = templateContent.getElementById('card'); 
const photoSection = document.getElementById('cards');



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

  const initCardImg = initCard.querySelector('card__image'); //копируем элементы внутри: картинка, надпись, лайк, удаление
  const initCardItem = initCard.querySelector('card__item');
  const initCardTitle = initCard.querySelector('card__name');
  const initCardLike = initCard.querySelector('card__like');
  const initCardDelete = initCard.querySelector('card__remove');

  initCardTitle.textContent = el.name; //присваиваем значения для карточек
  initCardImg.src = el.link;

  const buttonLike = initCard.getElementById('cardLike'); //находим кнопку Лайка на странице
  buttonLike.addEventListener('click', function () {
    //будет добавляться или удаляться класс при помощи слушателя событий
    buttonLike.classList.toggle('active');
  });
  const buttonDelete = initCard.querySelector('.photo__delete'); //ищем кнопки удалить
  buttonDelete.addEventListener('click', function () {
    //на каждую кнопку вешаем слушатель событий на клик
    const сard = buttonDelete.closest('.photo__item'); //используем метод closest, чтобы удалить именно родительский элемент, кликнутой кнопки
    сard.remove();
  });

  const imgBigTitle = document.querySelector('.title');
  const imgBig = document.querySelector('.img'); //поиск картинки и названия в попапе
  const popupOpenPhoto = document.querySelector('.popup_photo_open'); //находим попап открытия фото
  const popupCloseButton = document.querySelector('.popup__button-close_popup_add-photo'); //находим кнопку закрытия для фото-карточек
  initCardImg.addEventListener('click', function (event) {
    openPopup(popupOpenPhoto); //при клике на каждую картинку открывается попап
    imgBig.src = initCardImg.src;
    imgBigTitle.textContent = initCardTitle.textContent;
  });
  popupCloseButton.addEventListener('click', function () {
    closePopup(popupOpenPhoto); //при клике на закрыть - попап закрывается!
  });

  return initCard;
}