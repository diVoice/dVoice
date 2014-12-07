Locations = {
	/**Лабратория, начальная локация.*/
	lab: {
		entrancePoints: 0,
		isRandom: false
	},
	bath: {
		entrancePoints: 20,
		isRandom: true,
		time: [1,3],
		week: [1,2,3,4,5,6,7]
	},
	school: {
		entrancePoints: 0,
		isRandom: true,
		time: [1,2],
		week: [1,2,3,4,5]
	},
	bedroom: {
		entrancePoints: 0,
		isRandom: true,
		time: [2,3],
		week: [1,2,3,4,5,6,7]
	},
	night: {
		entrancePoints: 0,
		isRandom: true,
		time: [0],
		week: [1,2,3,4,5,6,7]
	},
	kitchen: {
		entrancePoints: 20,
		isRandom: true,
		time: [1,3],
		week: [1,2,3,4,5,6,7]
	},
	nature: {
		entrancePoints: 0,
		isRandom: true,
		time: [1,2,3],
		week: [6,7]
	},
	party: {
		entrancePoints: 0,
		isRandom: true,
		time: [1,2,3],
		week: [6,7]
	},
	sister: {
		entrancePoints: 20,
		isRandom: true,
		time: [2,3],
		week: [1,2,3,4,5]
	},
	walk: {
		entrancePoints: 0,
		isRandom: true,
		time: [2,3],
		week: [1,2,3,4,5,6,7]
	},
	goTo: function(locationName) {
		if (locationName == 'random') {
			availableLocations = gArray;
				i=0;
			for (oneLocation in this) {
				if (Locations[oneLocation].isRandom
					&& $.inArray(Time.get(), Locations[oneLocation].time)
					&& $.inArray(Day.get(), Locations[oneLocation].week)) {
						availableLocations.push(oneLocation);
				}
			}
			locationName = availableLocations.getRandom();
		}
		//Загружаем файл локации и его локализацию и все файлы
		if (typeof Locations[locationName].localization == "undefined") {
			require(
				['js/locations/' + locationName,
					'js/localization/' + Locale.get() + '/' + Gender.get() + '/' + locationName
				],
				function (util) {
/** TODO: Отключить*/
Locations.lab.step=11;

					Locations[locationName].load();
				});
		} else {
			Locations[locationName].load();
		}
	}
};

Locations.goTo('lab');