const popupImage = document.querySelector('.popup__photo-images');
const popupCaption = document.querySelector('.popup__photo-title');
const popupPhoto = document.querySelector('.popup_photo')
export default class Card {
    constructor(data, templateSelector, openPopup) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._openPopup = openPopup;
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
        this._cardTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        popupCaption.textContent = this._name;
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
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupCaption.textContent = this._cardTitle.textContent;
        popupPhoto.classList.add('popup_opened');
        this._openPopup(popupPhoto);
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
