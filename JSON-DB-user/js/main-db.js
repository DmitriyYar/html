'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const API_1 = 'https://jsonplaceholder.typicode.com/users';
// const API_1 = 'https://www.cbr-xml-daily.ru/latest.js';
let dataJson = []; //данные JSON файла


fetch(`${API_1}`) // ${API}/catalogData.json
    .then(result => result.json()) // получаем промис
    .then(data => { // получаем данные из файла
        dataJson = data;
        console.log(dataJson);
        print_1();
        buttonClick();
    })
    .catch(error => {
        console.log(error);
    });

/**
 * Функция назначает обработку клика на все кнопки.
 */
const buttonClick = () => {
    const btnEl = document.querySelectorAll('.user-card__button');
    console.log(btnEl);
    btnEl.forEach(function (button) {
        button.addEventListener('click', addedProductHandler);
    })
};
/**
 * Функция-обработчик события клика по кнопке "Отправить".
 * @param {MouseEvent} event
 */
function addedProductHandler(event) {
    const userId = event.currentTarget.getAttribute('data-id');
    // const userId = event.currentTarget.dataset.id;
    console.log(userId);
    localStorage.setItem('id', userId);
    // renderInfoUser(userId);

    let user = dataJson.find(item => item.id === +userId);
    console.log(user);
    localStorage.setItem('user', user);
    // for (const iterator of dataJson) {
    //     if (iterator.id === +userId) {
    //         console.log(iterator);
    //     } else {
    //         console.log("Нет такого пользователя");
    //     }
    // }
}

/**
 * Функция осуществляет перебор каждого объекта из массива объектов
 */
function print_1() {
    // Если данные в файле JSON представленны массивом 
    let users = dataJson.length === undefined ? 0 : dataJson.length
    document.querySelector('.quantity-users').textContent = users;
    for (let object of dataJson) { // получаем объекты JSON файла
        console.log(object);
        render(object);
    }
}

document.querySelector('.menu__button_1').addEventListener('click', () => sorting('city'));
document.querySelector('.menu__button_2').addEventListener('click', () => sorting('company'));

function sorting(arg) {
    // dataJson.sort(function (a, b) {
    //     if (a.name < b.name) { return -1; }
    //     if (a.name > b.name) { return 1; }
    //     return 0;
    // })

    if (arg === 'city') {
        dataJson.sort((a, b) => a.address.city.localeCompare(b.address.city));
    }
    if (arg === 'company') {
        dataJson.sort((a, b) => a.company.name.localeCompare(b.company.name));
    }
    // document.querySelectorAll('.user-card').remove();
    console.log(dataJson);
    document.querySelectorAll('.user-card').forEach(element => element.remove());
    print_1()
    buttonClick();
}

// users.sort(function(a, b){
//     if(a.firstname < b.firstname) { return -1; }
//     if(a.firstname > b.firstname) { return 1; }
//     return 0;
// })




/**
 * Функция отрисовки карточки пользователя.
 * @param {Object} obj 
 */
function render(obj) {
    document.querySelector('.content-block').insertAdjacentHTML('beforeEnd',
        `
        <article class="user-card">
            <div class="user-card__box user-card__box_data">
                <div class="user-card__text">ФИО:&nbsp;&nbsp;<span class="user-card__data user-card__data_name">${obj.name}</span></div>
                <div class="user-card__text">Город:&nbsp;&nbsp;<span class="user-card__data user-card__data_city">${obj.address.city}</span></div>
                <div class="user-card__text">Компания:&nbsp;&nbsp;<span class="user-card__data user-card__data_company">${obj.company.name}</span></div>
            </div>
            <div class="user-card__box">
                <!--<button class="user-card__button" data-id="${obj.id}">Подробнее</button>-->
                <a class="user-card__button" href="./read.html" data-id="${obj.id}">Подробнее</a>
            </div>
        </article>
        `
    );
}
// <a class="user-card__button" href="user-read.html" data-id="${obj.id}">Подробнее</a>

/**
 * Функция отрисовки подробной информации о пользователе
 * @param {Number} id 
 */
function renderInfoUser(id) {
    //document.querySelector('.form').insertAdjacentHTML('beforeEnd', `<p>${id}: ${dataJson[id - 1].name}</p>`);
    // document.querySelector('.form').insertAdjacentHTML('afterEnd', `<p>${dataJson[id-1].name}</p>`);
    document.querySelector('.user-wrapper').insertAdjacentHTML('beforeEnd',
        `
        <form class="form">
            <p class="form-title">Name</p>
            <input type="text" class="form__field" value="${dataJson[id - 1].name}" placeholder="Иван Иванов" readonly>
            <p class="form-title">User Name</p>
            <input type="text" class="form__field" value="${dataJson[id - 1].username}" placeholder="Ivan" readonly>
            <p class="form-title">E-mail</p>
            <input type="email" class="form__field" value="${dataJson[id - 1].email}" placeholder="example@mail.com" readonly>
            <p class="form-title">Street</p>
            <input type="text" class="form__field" value="${dataJson[id - 1].address.street}" placeholder="ул.Ленина" readonly>
            <p class="form-title">City</p>
            <input type="text" class="form__field" value="${dataJson[id - 1].address.city}" placeholder="Москва" readonly>
            <p class="form-title">Zip code</p>
            <input type="text" class="form__field" value="${dataJson[id - 1].address.zipcode}" placeholder="1234234" readonly>
            <p class="form-title">Phone</p>
            <input type="tel" class="form__field" value="${dataJson[id - 1].phone}" placeholder="899911122233" readonly>
            <p class="form-title">Website</p>
            <input type="url" class="form__field" value="${dataJson[id - 1].website}" placeholder="www.example.com" readonly>
            <p class="form-title">Comment</p>
            <textarea class="form__field-1" cols="40" rows="5" placeholder="Your Message" readonly></textarea><br>
            <button class="button" type="submit">Отправить</button>
        </form>
    `
    );
}
