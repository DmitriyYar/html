'use strict';

const API_1 = 'https://jsonplaceholder.typicode.com/users';
let dataJson = []; //данные JSON файла

const inputEl = document.querySelectorAll('.form__field');

inputEl.forEach(element => {    
    // element.setAttribute('readonly', true);
    element.readOnly = true;
});

fetch(`${API_1}`)
    .then(result => result.json()) // получаем промис
    .then(data => { // получаем данные из файла
        dataJson = data;
        renderInfoUser(localStorage.getItem('id'));
    })
    .catch(error => {
        console.log(error);
    });




/**
 * Функция отрисовки подробной информации о пользователе
 * @param {Number} id 
 */
 function renderInfoUser(id) {
    //document.querySelector('.form').insertAdjacentHTML('beforeEnd', `<p>${id}: ${dataJson[id - 1].name}</p>`);
    // document.querySelector('.form').insertAdjacentHTML('afterEnd', `<p>${dataJson[id-1].name}</p>`);
    
    let user = dataJson.find(item => item.id === +id);
    const value = [user.name, user.username, user.email, user.address.street, user.address.city, user.address.zipcode, user.phone, user.website, user.company.catchPhrase];
    let i =0;
    
    inputEl.forEach(element => {    
        element.value = value[i];
        i++;
        
        
        // for (let i = 0; i < value.length; i++) {
        //     element.value = value[i];
        //     console.log( element.value = value[i]);
        // }
    });
    
}


const edit = () =>{
    inputEl.forEach(element => {    
        // element.setAttribute('readonly', true);
        element.readOnly = false;
        element.style.color = '#000000';
        console.log(element);
    });
    const btnEl = document.querySelector('.menu__button_4');
    btnEl.style.backgroundColor = '#52CF4F';
    btnEl.removeAttribute("disabled");
    
    // document.querySelector(".button").addEventListener("click", function() {
    //     this.disabled = true;
    //   })
};

const btnEl = document.querySelector('.menu__button_3');
btnEl.addEventListener('click', edit);

/**
 * Функция назначает обработку клика на все кнопки.
 */
 const buttonClick = () => {
    const btnEl = document.querySelectorAll('.menu__button');
    console.log(btnEl);
    btnEl.forEach(function (button) {
        button.addEventListener('click', edit);
    })
};




