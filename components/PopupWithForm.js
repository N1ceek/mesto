import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(document.querySelector(popupSelector));
    this._submitCallback = submitCallback;
    this._formElement = this._popup.querySelector('.form');
    this._inputList = this._popup.querySelectorAll('.form__input');
    this._popupButton = this._popup.querySelector('.form__save-button');
    this._popupButtonTextContent = this._popupButton.textContent;
    this._setEventListeners()
  }
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
  _setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitCallback(this._getInputValues());
  
    });
  }
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
      console.log(data)
    });
  }
  close() {
    super.close();
    this._formElement.reset();
  }
  renderLoading(isLoading) {
    if(isLoading) {
      this._popupButton.textContent = 'Сохранение...';
    } else {
      this._popupButton.textContent = this._popupButtonTextContent;
    }
  }
};