import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(document.querySelector(popupSelector));
    this._submitCallback = submitCallback;
    this._formElement = this._popup.querySelector('.form');
    this._inputList = this._popup.querySelectorAll('.form__input');
    this.setEventListeners()
  }
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitCallback(this._getInputValues());
      this.close()
    });
  }
  close() {
    super.close();
    this._formElement.reset();
  }
}

