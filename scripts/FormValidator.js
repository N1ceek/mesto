export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
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
    const submitButton = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    const inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(submitButton, inputList);
      });
    });
  }

  _cleanValidationMessage() {
    const errors = Array.from(this._formElement.querySelectorAll('.form__input-error'));
    const inputs = Array.from(this._formElement.querySelectorAll('.form__input'));

    errors.forEach((error) => {
      error.textContent = '';
    });

    inputs.forEach((input) => {
      input.classList.remove(this._validationConfig.inputErrorClass);
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
    const submitButton = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    const inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
    this._toggleButtonState(submitButton, inputList);
  }
}
