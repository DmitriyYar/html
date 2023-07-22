'use strict';

const cartCounterEl = document.querySelector('.cart-number'); //счетчик товара в корзине
const cartTotalEl = document.querySelector('.cart-products-price');
const cartTotalValueEl = document.querySelector('.cartTotalValue');
const btnCart = document.querySelector('.cart-link');
const btnCartEl = document.querySelector('.cart-products');

let cart = {}; 

// получаем данные карточек
let productData = [];
let productCards = document.querySelectorAll('.product-card');
productCards.forEach(function (productCard) {
	let name = productCard.querySelector('.product-card-title').innerText;
	let desc = productCard.querySelector('.product-card-text').innerText;
	let price = +productCard.querySelector('.featuredPriceValue').innerText;
	productData.push({
		name,
		desc,
		price
	});
})
// console.log(productData);

// список товаров в корзине
btnCart.addEventListener('click', function () {
	btnCartEl.classList.toggle('cart-products-close');
})

/**
 * Функция назначает обработку клика на все кнопки "Add to cart".
 */
function buttonAddToCart() {
	let btnProduct = document.querySelectorAll('.product-card-btn');
	btnProduct.forEach(function (button) {
		button.addEventListener('click', addedProductHandler);
	})
}

/**
 * Функция-обработчик события клика по кнопке "Add to cart".
 * @param {MouseEvent} event
 */
function addedProductHandler(event) {
	const productId = event.currentTarget.getAttribute('data-id');
	// const productId = event.currentTarget.dataset.id;
	addProductIntoCart(productId);
}

/**
 * Функция увеличивает счетчик количества товаров рядом с иконкой корзины.
 */
function increaseProductsCount() {
	cartCounterEl.innerText++;
}

/**
 * Метод добавляет продукт в объект basket. (увеличивает кол-во товара одного типа)
 * @param {number} productId
 */
 function addProductToObject(productId) {
	if (!(productId in cart)) {
			cart[productId] = 1;
	} else {
			cart[productId]++;
	}
}

/**
 * Функция срабатывает когда нужно отрисовать продукт в корзине.
 * @param {number} productId
 */
 function renderProductInBasket(productId) {
	let productExist = document.querySelector(`.productCount[data-id="${productId}"]`);
	if (productExist) {
			increaseProductCount(productId);
			recalculateSumForProduct(productId);
	} else {
			renderNewProductInBasket(productId);
	}
}

/**
 * Функция отрисовывает новый товар в корзине.
 * @param {number} productId
 */
 function renderNewProductInBasket(productId) {
	let productRow = `
			<div class="cart-products-box">
					<p>${productData[productId].name}</p>
					<p>
							<span class="productCount" data-id="${productId}">1</span> шт.
					</p>
					<p>$${productData[productId].price}</p>
					<p>
							$<span class="productTotalRow" data-id="${productId}">${productData[productId].price}</span>
					</p>
			</div>
	`;
	cartTotalEl.insertAdjacentHTML("beforebegin", productRow);
}

/**
 * Функция увеличивает количество товаров в строке в корзине.
 * @param {number} productId
 */
 function increaseProductCount(productId) {
	const productCountEl = document.querySelector(`.productCount[data-id="${productId}"]`);
	productCountEl.textContent++;
}

/**
 * Функция пересчитывает стоимость товара умноженное на количество товара
 * в корзине.
 * @param {number} productId
 */
 function recalculateSumForProduct(productId) {
	const productTotalRowEl = document.querySelector(`.productTotalRow[data-id="${productId}"]`);
	let totalPriceForRow = (cart[productId] * productData[productId].price).toFixed(2);
	productTotalRowEl.textContent = totalPriceForRow;
}

/**
 * Функция пересчитывает общую стоимость корзины и выводит это значение на страницу.
 */
 function calculateAndRenderTotalBasketSum() {
	let totalSum = 0;
	for (let productId in cart) {
			totalSum += cart[productId] * productData[productId].price;
	}
	cartTotalValueEl.textContent = totalSum.toFixed(2);
}

/**
 * Эта функция срабатывает когда добавляют новый товар в корзину.
 * @param {number} productId
 */
function addProductIntoCart(productId) {
	increaseProductsCount();
	addProductToObject(productId);
	renderProductInBasket(productId);
	calculateAndRenderTotalBasketSum();
}

buttonAddToCart();
