


// Добавление атрибута к input (readonly, disabled, enabled)
const inputEl = document.querySelectorAll('.form__field');
// document.querySelector('form__field').readOnly = true;
// document.querySelector('.form__field').setAttribute('readonly', true);
inputEl.forEach(element => {    
    // element.setAttribute('readonly', true);
    element.readOnly = true;
});