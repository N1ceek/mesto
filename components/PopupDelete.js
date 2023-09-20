import Popup from './Popup.js';

export default class PopupDelete extends Popup {
    constructor(popupSelector) {
        super(document.querySelector(popupSelector));
        this._popupConfirmButton = this._popup.querySelector('.popup__confirm');
        this._submitHandler = null;
    }
    
    addSubmitHandler(handler) {
        this._submitHandler = handler;
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._popupConfirmButton.addEventListener('click', () => {
          this._submitHandler();
        });
    }
}