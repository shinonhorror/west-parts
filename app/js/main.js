$(function () {
	$('.top__slider').slick({
		infinite: true,
		slidesToShow: 1,
		speed: 1000,
		pauseOnFocus: false,
		pauseOnHover: false,
		arrows: true,
		autoplay: true,
		autoplaySpeed: 3000,
		prevArrow:
			'<button type="button" class="top__slider-left"><img src="images/arrow-left.svg"></button>',
		nextArrow:
			'<button type="button" class="top__slider-right"><img src="images/arrow-right.svg"></button>',
	});

	$('.brands__slider').slick({
		arrows: true,
		autoplay: true,
		infinite: true,
		autoplaySpeed: 3000,
		slidesToShow: 7,
		prevArrow:
			'<button type="button" class="brands__slider-left"><img src="images/arrow-left-brand.svg"></button>',
		nextArrow:
			'<button type="button" class="brands__slider-right"><img src="images/arrow-right-brand.svg"></button>',
	});
});

const CitySearch = () => {
	const choices = new Choices('.header__city-select', {
		searchEnabled: false,
		itemSelectText: '',
	});
};

const activateTabs = () => {
	const tabLinks = document.querySelectorAll('.search__tabs-link');
	const tabPanels = document.querySelectorAll('.search__tabs-panel');

	for (let el of tabLinks) {
		el.addEventListener('click', (e) => {
			e.preventDefault();

			document
				.querySelector('.search__tabs-item.active')
				.classList.remove('active');
			document
				.querySelector('.search__tabs-panel.active')
				.classList.remove('active');

			const parentListItem = el.parentElement;

			parentListItem.classList.add('active');
			const index = [...parentListItem.parentElement.children].indexOf(
				parentListItem,
			);

			const panel = [...tabPanels].filter(
				(el) => el.getAttribute('data-index') == index,
			);
			panel[0].classList.add('active');
		});
	}
};

ymaps.ready(function () {
	let map = new ymaps.Map('map', {
		center: [59.90862, 30.32179],
		zoom: 16,
		controls: [],
	});

	placemark = new ymaps.Placemark(
		map.getCenter(),
		{
			balloonContent: 'Санкт-Петербург, наб. Обводного канала, д. 92',
		},
		{
			iconLayout: 'default#image',
			iconImageHref: 'images/placemark.svg',
			iconImageSize: [68, 49],
		},
	);

	map.geoObjects.add(placemark);
});

CitySearch();

activateTabs();
