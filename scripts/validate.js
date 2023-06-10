const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  disabledButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_error-text',
  errorClass: 'form__input-error'
};

const cleanValidationMessage = (popup) => {
  const errors = popup.querySelectorAll('.form__input-error');
  const inputs = popup.querySelectorAll('.form__input');
  errors.forEach((span) => {
    span.textContent = '';
  });
  inputs.forEach((input) => {
    input.classList.remove('form__input_error-text');
  });
};

const showInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(validationConfig.inputErrorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  inputElement.classList.remove(validationConfig.inputErrorClass);
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
};

const toggleButtonState = (formElement, validationConfig) => {
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));

  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(validationConfig.disabledButtonClass);
    submitButton.setAttribute('disabled', '');
  } else {
    submitButton.classList.remove(validationConfig.disabledButtonClass);
    submitButton.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(formElement, validationConfig);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, validationConfig);
    toggleButtonState(formElement, validationConfig);
  });
};

enableValidation(validationConfig);
