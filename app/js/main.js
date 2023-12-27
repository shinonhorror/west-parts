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

const openModal = (classname, id) => {
	const modals = document.querySelectorAll('.modal');
	const account = document.querySelector(classname);
	const modal = document.getElementById(id);
	if (!modal || !account) {
		return;
	}

	const container = modal.querySelector('.modal-container');
	const close = modal.querySelector('.modal__close');

	account.addEventListener('click', () => {
		modal.classList.add('active');
		document.body.style.overflow = 'hidden';
		modals.forEach((item) => {
			if (item.classList.contains('active') && item !== modal) {
				item.classList.remove('active');
			}
		});
	});

	modal.addEventListener('click', (e) => {
		const withinBoundaries = e.composedPath().includes(container);

		if (!withinBoundaries) {
			modal.classList.remove('active');
			document.body.style.overflow = '';
		}
	});

	close.addEventListener('click', () => {
		modal.classList.remove('active');
		document.body.style.overflow = '';
	});

	activeCheckbox();
};

const toggleList = () => {
	const toggles = document.querySelectorAll('.catalog__filter-toggle');

	toggles.forEach((item) => {
		let btn = item.querySelector('.catalog__filter-toggle_button');
		let content = item.querySelector('.catalog__filter-toggle_content');

		btn.addEventListener('click', () => {
			let expanded = btn.getAttribute('aria-expanded') === 'true' || false;

			btn.setAttribute('aria-expanded', !expanded);

			content.hidden = expanded;
		});
	});
};

const rangeTooltip = () => {
	const rangers = document.querySelectorAll('.catalog__filter-ranger');

	rangers.forEach((item) => {
		const input = item.querySelector('.catalog__filter-input');
		const value = item.querySelector('.catalog__filter-value');

		input.addEventListener('input', () => {
			const newValue = Number(
				((input.value - input.min) * 100) / (input.max - input.min),
			);
			const newPosition = 10 - newValue * 0.2;
			value.innerHTML = `<span>${input.value} ${input.dataset.condition}</span>`;

			value.style.left = `calc(${newValue}% + (${newPosition}px))`;
		});
	});
};

const toggleDropdown = (classname, id) => {
	const dropdownButton = document.querySelector(classname);
	const dropdown = document.getElementById(id);

	dropdownButton.addEventListener('click', (e) => {
		dropdown.classList.toggle('show');
		console.log(dropdown);
	});

	document.addEventListener('click', (e) => {
		const withinBoundaries =
			e.composedPath().includes(dropdown) ||
			e.composedPath().includes(dropdownButton);

		if (!withinBoundaries) {
			dropdown.classList.remove('show');
		}
	});
};

const activateButtons = () => {
	const searchButtons = document.querySelectorAll('.search__buttons-item');
	const categoriesButtons = document.querySelectorAll('.categories__list-item');
	const sortButtons = document.querySelectorAll('.catalog__filter-sort_item');
	const paginationButtons = document.querySelectorAll(
		'.catalog__pagination-item',
	);

	searchButtons.forEach((item) => {
		item.addEventListener('click', () => {
			const active = document.querySelector('.search__buttons-item.active');
			item.classList.add('active');
			active.classList.remove('active');
		});
		item.removeEventListener('click', () => {
			const active = document.querySelector('.search__buttons-item.active');
			item.classList.add('active');
			active.classList.remove('active');
		});
	});

	categoriesButtons.forEach((item) => {
		item.addEventListener('click', () => {
			const active = document.querySelector('.categories__list-item.active');
			item.classList.add('active');
			active.classList.remove('active');
		});
		item.removeEventListener('click', () => {
			const active = document.querySelector('.categories__list-item.active');
			item.classList.add('active');
			active.classList.remove('active');
		});
	});

	sortButtons.forEach((item) => {
		item.addEventListener('click', () => {
			const active = document.querySelector(
				'.catalog__filter-sort_item.active',
			);
			item.classList.add('active');
			active.classList.remove('active');
		});
		item.removeEventListener('click', () => {
			const active = document.querySelector(
				'.catalog__filter-sort_item.active',
			);
			item.classList.add('active');
			active.classList.remove('active');
		});
	});

	paginationButtons.forEach((item) => {
		item.addEventListener('click', () => {
			const active = document.querySelector('.catalog__pagination-item.active');
			item.classList.add('active');
			active.classList.remove('active');
		});
		item.removeEventListener('click', () => {
			const active = document.querySelector('.catalog__pagination-item.active');
			item.classList.add('active');
			active.classList.remove('active');
		});
	});
};

const activateOrderTabs = (tab, contents) => {
	const tabs = document.querySelectorAll(tab);

	tabs.forEach((item) => {
		item.addEventListener('click', () => {
			const active = document.querySelector(`${tab}.active`);
			const activeContent = document.querySelector(
				`${contents}[data-index="${active.dataset.index}"]`,
			);
			const content = document.querySelector(
				`${contents}[data-index="${item.dataset.index}"]`,
			);
			item.classList.add('active');
			content.hidden = false;
			active.classList.remove('active');
			activeContent.hidden = true;
		});

		item.removeEventListener('click', () => {
			const active = document.querySelector(`${tab}.active`);
			const activeContent = document.querySelector(
				`${contents}[data-index="${active.dataset.index}"]`,
			);
			const content = document.querySelector(
				`${contents}[data-index="${item.dataset.index}"]`,
			);
			item.classList.add('active');
			content.hidden = false;
			active.classList.remove('active');
			activeContent.hidden = true;
		});
	});
};

CitySearch();

activateTabs('.search__tabs-panel', '.search__tabs-link', '.search__tabs-item');

activateTabs('.modal__tabs-panel', '.modal__tabs-link', '.modal__tabs-item');

activateTabs(
	'.profile__tabs-panel',
	'.profile__tabs-item',
	'.profile__tabs-item',
);

toggleList();
