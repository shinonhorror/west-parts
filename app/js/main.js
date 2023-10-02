if (document.querySelector('.top__slider')) {
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
}

const CitySearch = () => {
	const choises = new Choices('.header__city-select', {
		searchEnabled: false,
		itemSelectText: '',
	});
};

const activateTabs = (panels, links, items) => {
	const tabPanels = document.querySelectorAll(panels);
	const tabLinks = document.querySelectorAll(links);

	if (!tabPanels) {
		return;
	}

	for (let el of tabLinks) {
		el.addEventListener('click', (e) => {
			e.preventDefault();

			document.querySelector(`${items}.active`).classList.remove('active');

			document.querySelector(`${panels}.active`).classList.remove('active');

			const parentListItem = links !== items ? el.parentElement : el;

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

if (document.getElementById('map')) {
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
}

if (document.getElementById('moskowStorage')) {
	ymaps.ready(function () {
		new ymaps.Map('moskowStorage', {
			center: [59.90862, 30.32179],
			zoom: 16,
			controls: [],
		});
	});

	ymaps.ready(function () {
		new ymaps.Map('spbStorage', {
			center: [59.90862, 30.32179],
			zoom: 16,
			controls: [],
		});
	});

	ymaps.ready(function () {
		new ymaps.Map('krasnodarStorage', {
			center: [59.90862, 30.32179],
			zoom: 16,
			controls: [],
		});
	});
}

const activeCheckbox = () => {
	const checkboxes = document.querySelectorAll('.modal__registration-radio');
	const panels = document.querySelectorAll('.modal__registration-panel');
	if (!checkboxes) {
		return;
	}
	for (let el of checkboxes) {
		el.addEventListener('click', () => {
			const index = el.getAttribute('data-index');
			if (index) {
				document
					.querySelector('.modal__registration-panel.active')
					.classList.remove('active');
				if (el.checked == true) {
					panels[index].classList.add('active');
				}
			}
		});
	}
};

const openModal = () => {
	const account = document.querySelector('.header__buttons-account');
	const modal = document.getElementById('modal');
	if (!modal) {
		return;
	}
	const container = document.querySelector('.modal-container');
	const close = document.querySelector('.modal__close');
	account.addEventListener('click', () => {
		modal.classList.add('active');
	});

	modal.addEventListener('click', (e) => {
		const withinBoundaries = e.composedPath().includes(container);

		if (!withinBoundaries) {
			modal.classList.remove('active');
		}
	});

	close.addEventListener('click', () => {
		modal.classList.remove('active');
	});

	activeCheckbox();
};

CitySearch();

activateTabs('.search__tabs-panel', '.search__tabs-link', '.search__tabs-item');

activateTabs('.modal__tabs-panel', '.modal__tabs-link', '.modal__tabs-item');

activateTabs(
	'.profile__tabs-panel',
	'.profile__tabs-item',
	'.profile__tabs-item',
);

openModal();
