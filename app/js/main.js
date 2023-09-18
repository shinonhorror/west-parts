$(function () {
	$('.top__slider').slick({
		arrows: true,
		autoplay: true,
		autoplaySpeed: 5000,
		prevArrow:
			'<button type="button" class="top__slider-left"><img src="images/arrow-left.svg"></button>',
		nextArrow:
			'<button type="button" class="top__slider-right"><img src="images/arrow-right.svg"></button>',
	});

	$('.brands__slider').slick({
		arrows: true,
		autoplay: true,
		infinite: true,
		autoplaySpeed: 5000,
		slidesToShow: 7,
		prevArrow:
			'<button type="button" class="brands__slider-left"><img src="images/arrow-left-brand.svg"></button>',
		nextArrow:
			'<button type="button" class="brands__slider-right"><img src="images/arrow-right-brand.svg"></button>',
	});
});

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
