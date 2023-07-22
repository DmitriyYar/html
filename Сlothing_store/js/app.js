'use strict';

const btnMenuOpen = document.getElementById('btn-2');
const btnMenuClose = document.getElementById('btn-3');
const navMenu = document.querySelector('.main-nav');

btnMenuOpen.addEventListener('click', function () {
	navMenu.classList.remove('main-nav-close');
});

btnMenuClose.addEventListener('click', function () {
	// alert('клик');
	navMenu.classList.add('main-nav-close');
});