export default class Card {
    constructor(data) {
        this._popupImage = document.querySelector('.popup__photo-images');
        this._imageCaption = document.querySelector('.popup__photo-title');
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = '#template';
        this._popupPhoto = document.querySelector('.popup_photo')
    }
    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
            return cardTemplate
    }
    createCard() {
        this._cardElement = this._getTemplate();
        this._cardImage = this._cardElement.querySelector('.card__image');
        this._cardTitle = this._cardElement.querySelector('.card__name');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;
        this._buttonRemove = this._cardElement.querySelector('.card__remove');
        this._buttonLike = this._cardElement.querySelector('.card__like');
        this._setEventListeners();
        return this._cardElement;
    }
    _handleCardRemove() {
        this._cardElement.remove();
    }
    _handleCardLike() {
        this._buttonLike.classList.toggle('card__like_activeted');
    }
    _handleCardOpen() {
        console.log(this)
        this._popupImage.src = this._cardImage.src;
        this._imageCaption.textContent = this._cardTitle.src;
        this._popupPhoto.classList.add('popup_opened');
    }
    _setEventListeners() {
        this._buttonRemove.addEventListener('click', () => {
            this._handleCardRemove();
        });
        this._buttonLike.addEventListener('click', () => {
            this._handleCardLike();
        });
        this._cardImage.addEventListener('click', () => {
            this._handleCardOpen();
        });
    }
}
