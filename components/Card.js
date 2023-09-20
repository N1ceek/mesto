export default class Card {
    constructor(data, templateSelector, userId, handleOpenImage, handleDelete, handleLikesCard) {
        this._data = data;
        this._name = _data.name;
        this._link = _data.link;
        this._templateSelector = templateSelector;
        
        this._userId = userId;
        
        this._cardId = _data._id;
        // this._ownerId = data.owner._id;
        this._handleOpenImage = handleOpenImage;
        this._handleDelete = handleDelete;
        this._handleLikesCard = handleLikesCard;
        this._handleCardDeleteLike = handleLikesCard;
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
          this._cardLikeBtn.classList.add('card__like_activeted');
        }else {
          this._cardLikeBtn.classList.remove('card__like_activeted');
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
        this._cardLikeBtn.addEventListener('click', () => {
          this._interactLike();
        });
    
        /*Слушатель кнопки удаления */
        this._cardDeleteBtn.addEventListener('click', () => {
           // this._onDeleteCard();
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
        this._cardTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardRemove = this._cardElement.querySelector('.card__remove');
        this._cardLike = this._cardElement.querySelector('.card__like');
        this._setEventListeners();
        return this._cardElement;
    }
    _handleCardRemove() {
        this._cardElement.remove();
    }
    _handleCardLike() {
        this._cardLike.classList.toggle('card__like_activeted');
    } 
    _setEventListeners() {
        this._cardRemove.addEventListener('click', () => {
            this._handleCardRemove();
        });
        this._cardLike.addEventListener('click', () => {
            this._handleCardLike();
        });
        this._cardImage.addEventListener('click', () => {
            this._handleOpenImage(this._link, this._name);
        });
    }
}
