export default class Card {
  constructor(data, templateSelector, userId, handleImageOpen, Likes, Dislike, Delete) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenImage = handleImageOpen;
    this._handleCardDeleteLike = Dislike;
    this._handleLikesCard = Likes;
    this._handleCardRemove = Delete;
    this._likes = this._data.likes || []; // Исправление 1: Обработка отсутствия лайков
    this._userId = userId;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
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
  }
  renderCardLike(button) {
    button = button || this._buttonLike;
    this._likeCount.textContent = this._likes.length;
    if (this._likes.find((like) => like._id === this._userId) != null) {
      button.classList.add('card__like_activeted');
    } else {
      button.classList.remove('card__like_activeted');
    }
  }
  _interactLike() {
      if (this._likes.find((like) => like._id === this._userId) != null) {
        this._handleCardDeleteLike(this._cardId);
    } else {
      this._handleLikesCard(this._cardId);
    }
  }
  remove() {
    this._cardElement.remove();
    this._cardElement = null;
  }
  createCard() {
    this._cardElement = this._getTemplate();
    this._buttonLike = this._cardElement.querySelector('.card__like');
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardTitle = this._cardElement.querySelector('.card__name');
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._buttonRemove = this._cardElement.querySelector('.card__remove');
    this._likeCount = this._cardElement.querySelector('.card__like-count');
    this._likeCount.textContent = this._likes.length; // Добавление этой строки
    if (this._ownerId != this._userId) {
      this._buttonRemove.remove();
    }
    this._setEventListeners();
    this.renderCardLike(this._buttonLike); // Исправление 3: Вызов renderCardLike для правильного отображения лайков
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
