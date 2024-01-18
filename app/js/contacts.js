let groups = [
	{
		name: 'Офисы',
		icon: 'images/office.svg',
		items: [
			{
				center: [59.908642, 30.32204],
				name: [
					'<address>',
					'<strong>Санкт-Петербург</strong>',
					'<br/>',
					'Обводный канал, 92',
					'<br/>',
					'пн–пт 09:00 – 18:00',
					'<br/>',
					'<a href="tel:79213333510">+7 (921) 333-35-10</a>',
					'</address>',
				].join(''),
				icon: 'images/office.svg',
			},
		],
	},
	{
		name: 'Склады',
		icon: 'images/store.svg',
		items: [
			{
				center: [59.745721, 30.52037],
				name: [
					'<address>',
					'<strong>Санкт-Петербург</strong>',
					'<br/>',
					'Колпинское шоссе, 135',
					'<br/>',
					'пн–пт 09:00 – 18:00',
					'<br/>',
					'<a href="tel:79213333510">+7 (921) 333-35-10</a>',
					'</address>',
				].join(''),
				icon: 'images/store.svg',
			},
			{
				center: [45.037012, 39.083838],
				name: [
					'<address>',
					'<strong>Краснодар</strong>',
					'<br/>',
					'Уральская улица, 144',
					'<br/>',
					'пн–пт 09:00 – 18:00',
					'<br/>',
					'<a href="tel:79213333510">+7 (921) 333-35-10</a>',
					'</address>',
				].join(''),
				icon: 'images/store.svg',
			},
			{
				center: [55.813566, 37.766854],
				name: [
					'<address>',
					'<strong>Москва</strong>',
					'<br/>',
					'2-й Иртышский проезд, 8с6',
					'<br/>',
					'пн–пт 09:00 – 18:00',
					'<br/>',
					'<a href="tel:79213333510">+7 (921) 333-35-10</a>',
					'</address>',
				].join(''),
				icon: 'images/store.svg',
			},
		],
	},
];

function createMenuGroup(group, map, menu) {
	let menuItem = $(
		`<li class='contacts__menu-item'><h2><img src=${group.icon}> ${group.name} <img class='contacts__menu-arrow' src='images/profile/toggle.svg'></img> </h2></li>`,
	);
	let collection = new ymaps.GeoObjectCollection(null, {});
	let submenu = $('<ul class="submenu"></ul>');

	map.geoObjects.add(collection);

	collection.events.add('click', function (e) {
		map
			.setZoom(9)
			.then(() => map.setCenter(e.get('target').geometry.getCoordinates()));
	});

	menuItem
		.append(submenu)
		.appendTo(menu)
		.find('h2')
		.bind('click', function () {
			if (collection.getParent()) {
				map.geoObjects.remove(collection);
				submenu.hide();
			} else {
				map.geoObjects.add(collection);
				submenu.show();
			}
		});
	for (let j = 0, m = group.items.length; j < m; j++) {
		createSubMenu(group.items[j], collection, submenu, map);
	}
}

function createSubMenu(item, collection, submenu, map) {
	let submenuItem = $('<li>' + item.name + '</li>');
	let placemark = new ymaps.Placemark(
		item.center,
		{
			balloonContentBody: item.name,
		},
		{
			iconLayout: 'default#image',
			iconImageHref: item.icon,
			iconImageSize: [32, 32],
		},
	);

	collection.add(placemark);

	submenuItem
		.appendTo(submenu)
		.find('address')
		.bind('click', function () {
			if (!placemark.balloon.isOpen()) {
				map
					.setZoom(9)
					.then(() => map.setCenter(item.center));

				placemark.balloon.open();
			} else {
				placemark.balloon.close();
			}
			return false;
		});
}

ymaps.ready(function () {
	let contacts = new ymaps.Map('contact-map', {
		center: [55.755793, 37.617134],
		zoom: 4,
		controls: [],
	});

	let menu = $('<ul class="contacts__menu-list"></ul>');

	for (var i = 0, l = groups.length; i < l; i++) {
		createMenuGroup(groups[i], contacts, menu);
	}

	menu.appendTo($('.contacts__menu'));

	ListBoxLayout = ymaps.templateLayoutFactory.createClass(
		"<button class='contacts__map-toggle' id='my-listbox-header' class='btn btn-success dropdown-toggle' data-toggle='dropdown'>" +
			"{{data.title}} <img class='caret' src='images/profile/toggle.svg'></img>" +
			'</button>' +
			"<ul class='contacts__map-list' id='my-listbox'" +
			" class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu'" +
			" style='display: {% if state.expanded %}block{% else %}none{% endif %};'></ul>",
		{
			build: function () {
				ListBoxLayout.superclass.build.call(this);

				this.childContainerElement = $('#my-listbox').get(0);
				this.events.fire('childcontainerchange', {
					newChildContainerElement: this.childContainerElement,
					oldChildContainerElement: null,
				});
			},

			getChildContainerElement: function () {
				return this.childContainerElement;
			},

			clear: function () {
				this.events.fire('childcontainerchange', {
					newChildContainerElement: null,
					oldChildContainerElement: this.childContainerElement,
				});
				this.childContainerElement = null;
				ListBoxLayout.superclass.clear.call(this);
			},
		},
	);

	ListBoxItemLayout = ymaps.templateLayoutFactory.createClass(
		"<li class='contacts__map-item'><a>{{data.content}}</a></li>",
	);

	listBoxItems = [
		new ymaps.control.ListBoxItem({
			data: {
				content: 'Москва',
				center: [55.755864, 37.617698],
				zoom: 9,
			},
		}),
		new ymaps.control.ListBoxItem({
			data: {
				content: 'Санкт-Петербург',
				center: [59.938784, 30.314997],
				zoom: 9,
			},
		}),
		new ymaps.control.ListBoxItem({
			data: {
				content: 'Краснодар',
				center: [45.03547, 38.975313],
				zoom: 9,
			},
		}),
		new ymaps.control.ListBoxItem({
			data: {
				content: 'Волгоград',
				center: [48.707067, 44.516975],
				zoom: 9,
			},
		}),
	];

	listBox = new ymaps.control.ListBox({
		items: listBoxItems,
		data: {
			content: 'Выберите город',
			title: 'Выберите город',
		},
		options: {
			layout: ListBoxLayout,
			itemLayout: ListBoxItemLayout,
		},
	});

	contacts.controls.add(listBox, { float: 'left' });

	listBox.events.add('click', function (e) {
		var item = e.get('target');
		if (item != listBox) {
			listBox.data.set('title', item.data.get('content'));

			contacts.setCenter(item.data.get('center'), item.data.get('zoom'));
		}
	});
});

openModal('.header__buttons-account', 'modal');
toggleDropdown('.header__buttons-menu', 'dropdown');
