const swiper = new Swiper('.swiper', {

	slidesPerView: 1,
	spaceBetween: 0,
	initialSlide: 1,
	centeredSlides: true,
	autoHeight: true,

	// Responsive breakpoints
	breakpoints: {


		768: {
			slidesPerView: 2,
			// spaceBetween: 10
		},
		// when window width is >= 480px
		961: {
			slidesPerView: 3,
			// spaceBetween: 10
		},
	},

	pagination: {
		el: '.swiper-pagination',

		type: 'bullets',
		clickable: true,
	},

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});