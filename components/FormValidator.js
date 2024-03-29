export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
  }
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._validationConfig.inputErrorClass);
  }
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
  }
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(submitButton, inputList) {
    if (this._hasInvalidInput(inputList)) {
      submitButton.classList.add(this._validationConfig.disabledButtonClass);
      submitButton.setAttribute('disabled', '');
    } else {
      submitButton.classList.remove(this._validationConfig.disabledButtonClass);
      submitButton.removeAttribute('disabled');
    }
  }
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._submitButton, this._inputList);
      });
    });
  }
  resetValidation() {
    this._toggleButtonState(this._submitButton, this._inputList);
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }
  cleanValidationMessage() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
    this._toggleButtonState(this._submitButton, this._inputList);
  }
}
