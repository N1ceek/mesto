
  const valid = {
    formSelector: ".form", //форма
    inputSelector: ".form__input", //инпут
    submitButtonSelector: ".form__save-button", //кнопка активна
    inactiveButtonClass: "form__save-button_disabled", // кнопка не активна
    inputErrorClass: "form__input_error-text", // это сам текст в инпуте
    errorClass: "form__input_error", // это  текст под инпутом
  };
  
  const showInputError = (formElement, inputElement, errorMessage, valid) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(valid.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(valid.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, valid) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(valid.inputErrorClass);
    errorElement.classList.remove(valid.errorClass);
    errorElement.textContent = "";
  };
  
  const checkInputValidity = (formElement, inputElement, valid) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement,inputElement,inputElement.validationMessage,valid);
    } else {
      hideInputError(formElement, inputElement, valid);
    }
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  const toggleButtonState = (formElement,inputList,) => {
    const buttonElementContinue = formElement.querySelector(valid.submitButtonSelector);
    if (hasInvalidInput(inputList)) {
      buttonElementContinue.setAttribute("disabled", true);
      buttonElementContinue.classList.add(valid.inactiveButtonClass);
    } else {
      buttonElementContinue.removeAttribute("disabled");
      buttonElementContinue.classList.remove(valid.inactiveButtonClass);
    }
    console.log(buttonElementContinue)
  };
  
  const setEventListeners = (formElement, valid) => {
    const inputList = Array.from(
      formElement.querySelectorAll(valid.inputSelector)
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, valid);
        toggleButtonState(formElement,inputList,valid.submitButtonSelector,valid);
      });
    });
  };
  
  const removeValidationErrors = (formElement, inputList) => {
    for (let i = 0; i < inputList.length; i++) {
      hideInputError(formElement, inputList[i], valid);
    }
  };
  
  const enableValidation = (valid) => {
    const formList = Array.from(
      document.querySelectorAll(valid.formSelector)
    );
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });
  
      setEventListeners(formElement, valid);
    });
  };
  
  enableValidation(valid);