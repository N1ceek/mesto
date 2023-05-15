let edit = document.querySelector(`.profile__edit-button`);
console.log(edit);
let popupOpen = document.querySelector('.popup');
console.log(popupOpen)
edit.addEventListener(`click`, function(){
    popupOpen.classList.add(`popup__opened`)
})
