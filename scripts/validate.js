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
// const clearSpan = (popup) => {
//   const snap = popup.querySelectorAll('.form__input-error')
//   snap.textContent = '';
// }
const showInputError = (formSelector, inputSelector) => {
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);
  errorElement.textContent = inputSelector.validationMessage;
  inputSelector.classList.add(validationConfig.inputErrorClass);
};
const hideInputError = (formSelector, inputSelector) => {
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);
  errorElement.textContent = '';
  inputSelector.classList.remove(validationConfig.inputErrorClass);
};
const checkInputValidity = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
      showInputError(formSelector, inputSelector);
  } else {
      hideInputError(formSelector, inputSelector);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
  })
}
const disableSubmitButton = () => {
  const submitButton = document.querySelectorAll(validationConfig.submitButtonSelector);
  submitButton.forEach((btn) => {
      btn.setAttribute('disabled', true);
      btn.classList.add(validationConfig.disabledButtonClass);
  })
}
const enableSubmitButton = () => {
  const submitButton = document.querySelectorAll(validationConfig.submitButtonSelector);
  submitButton.forEach((btn) => {
      btn.removeAttribute('disabled');
      btn.classList.remove(validationConfig.disabledButtonClass);
  })
}
const toggleButtonState = (inputList, submitButtonSelector) => {
  if (hasInvalidInput(inputList)) {
      disableSubmitButton(submitButtonSelector);
  } else {
      enableSubmitButton(submitButtonSelector)
  }
}
const setEventListeners = (formSelector, validationConfig) => {
  const inputList = Array.from(formSelector.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formSelector.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);

  inputList.forEach(inputSelector => {
      inputSelector.addEventListener('input', function () {
          checkInputValidity(formSelector, inputSelector);
          toggleButtonState(inputList, buttonElement);
      });
  });
};
const enableValidation = (validationConfig) => {
  const formList = document.querySelectorAll(validationConfig.formSelector);
  formList.forEach((formSelector) => {
      setEventListeners(formSelector, validationConfig);
      formSelector.addEventListener('submit', function (evt) {
          evt.preventDefault();
      });
  });
};
enableValidation(validationConfig);
