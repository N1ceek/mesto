export default class Card {
    constructor(data, templateSelector, userId, handleCardClick, handleDelete, handleLikesCard, handleCardDeleteLike) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._userId = userId;
        this._handleOpenImage = handleCardClick;
        this._handleDelete = handleDelete;
        this._handleLikesCard = handleLikesCard;
        this._handleCardDeleteLike = handleCardDeleteLike;
        this._name = data.name;
        this._link = data.link;
        this._likes = this._data.likes;

        this._cardId = data._id;
        this._ownerId = data.owner._id;
       

    }
    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
            return cardTemplate
    }
    updateCardLike(response) {
        this._likes = response.likes;
      }
      renderCardLike() {
        this.likesCount.textContent = this._likes.length;
        if(this._likes.find((userLike) => userLike._id === this._userId)) {
          this._cardLike.classList.add('card__like_activeted');
        }else {
          this._cardLike.classList.remove('card__like_activeted');
        }
      }
      _interactLike() {
        if (this._likes.find((userLike) => userLike._id === this._userId)) {
          this._handleCardDeleteLike(this._cardId);
        } else {
          this._handleLikesCard(this._cardId);
        }
      }
     
      _remove() {
        this._card.remove();
        this._card = null;
      }
    
      /* Устанавливаем слушатели на карточку: лайк, удаление, нажатие на изображение*/
      _setEventListeners() {
        /*Слушатель кнопки лайка */
        this._cardLike.addEventListener('click', () => {
          this._interactLike();
        });
    
        /*Слушатель кнопки удаления */
        this._cardRemove.addEventListener('click', () => {
            this._handleDelete();
        });
    
        /*Слушатель нажатия на изображение */
        this._cardImage.addEventListener('click', () => {
          this._handleCardClick(this._name, this._link);
          
        });
     }
    createCard() {
        this._cardElement = this._getTemplate();
        this._cardImage = this._cardElement.querySelector('.card__image');
        this._cardTitle = this._cardElement.querySelector('.card__name');
        this._cardRemove = this._cardElement.querySelector('.card__remove');
        this._cardLike = this._cardElement.querySelector('.card__like');
        this.likesCount = this._cardElement.querySelector('.card__like-count');
        this._cardTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this.renderCardLike(this._card);
        this._cardElement.querySelector('.card__like-count').textContent = this._likes.length;
        if(!(this._ownerId === this._userId)) {
          this._cardElement.querySelector('.card__remove').style.display = 'none';
        }
        this._setEventListeners();
        return this._cardElement;
    }
    _handleCardRemove() {
        this._cardElement.remove();
    }
    _handleCardLike() {
        this._cardLike.classList.toggle('card__like_activeted');
    } 
}
