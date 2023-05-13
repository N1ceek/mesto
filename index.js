

let element = document.getElementById('edit')
element.addEventListener('onclick', function () {

Element.innerHTML = `
<div class="popup popup__edit" id="edit">
        <div class="popup__container">
            <button class="popup__close" aria-label="Закрыть"></button>
            <form class="form">
                <fieldset class="form__set">
                    <label class="form__field">
                        <input class="form__input form__input_type_user-name" name="name" id="username" placeholder="Укажите своё имя" minlength="2" maxlength="40" required=""> <span class="form__input-error username-error"></span></label>
                        <label class="form__field"><input class="form__input form__input_type_about" name="about" id="about" placeholder="Укажите род деятельности" minlength="2" maxlength="200" required=""> <span class="form__input-error about-error"></span></label>
                        <button class="form__save-button" type="submit" disabled="true">Сохранить</button>
                </fieldset>
            </form>
        </div>
    </div>`
});