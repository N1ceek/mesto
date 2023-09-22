export default class Card {
  constructor(data, templateSelector, userId, handleImageOpen, Likes, Dislike) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenImage = handleImageOpen;
    this._handleCardDeleteLike = Dislike;
    this._handleLikesCard = Likes;
    this._likes = this._data.likes || []; // Исправление 1: Обработка отсутствия лайков
    this._userLike = this._likes.find((like) => like._id === userId); // Исправление 7: Исправление _userLike

    this._userId = userId;
    this._cardId = this._data._id;
    this._ownerId = this._data.owner._id;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardTemplate;
  }

  updateCardLike(response) {
    this._likes = response.likes;
    this._userLike = this._likes.find((like) => like._id === this._userId); // Обновление _userLike после обновления лайков
  }

  renderCardLike() {
    this._likeCount.textContent = this._likes.length; // Исправление 3: Исправление опечатки
    if (this._userLike !== this._userLike) { 
      this._buttonLike.classList.add('card__like_activeted');
    } else {
      this._buttonLike.classList.remove('card__like_activeted');
    }
  }

  _interactLike() {
    if (this._userLike === false) {
      this._handleCardDeleteLike(this._cardId);
    } else {
      this._handleLikesCard(this._cardId);
    }
  }

  createCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardTitle = this._cardElement.querySelector('.card__name');
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._buttonRemove = this._cardElement.querySelector('.card__remove');
    this._buttonLike = this._cardElement.querySelector('.card__like');
    this._likeCount = this._cardElement.querySelector('.card__like-count'); // Добавление этой строки
    this._setEventListeners();
    this.renderCardLike(); // Исправление 3: Вызов renderCardLike для правильного отображения лайков
    return this._cardElement;
  }

  _handleCardRemove() {
    this._cardElement.remove();
  }

  _setEventListeners() {
    this._buttonRemove.addEventListener('click', () => {
      this._handleCardRemove();
    });
    this._buttonLike.addEventListener('click', () => {
      this._interactLike();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleOpenImage(this._link, this._name);
    });
  }
}
