Locations = {
	/**Лабратория, начальная локация.*/
	lab: new Location({
		entrancePoints: 0,
		isRandom: false
	}),
	bath: new Location({
		name: 'Ванна',
		entrancePoints: 20,
		isRandom: true,
		time: [1,3],
		week: [1,2,3,4,5,6,7]
	}),
	school:  new Location({
		name:'Универ',
		entrancePoints: 0,
		isRandom: true,
		time: [1,2],
		week: [1,2,3,4,5]
	}),
	bedroom: new Location({
		entrancePoints: 0,
		isRandom: true,
		time: [2,3],
		week: [1,2,3,4,5,6,7]
	}),
	night: new Location({
		entrancePoints: 0,
		isRandom: true,
		time: [0],
		week: [1,2,3,4,5,6,7]
	}),
	kitchen: new Location({
		entrancePoints: 20,
		isRandom: true,
		time: [1,3],
		week: [1,2,3,4,5,6,7]
	}),
	nature: new Location({
		entrancePoints: 0,
		isRandom: true,
		time: [1,2,3],
		week: [6,7]
	}),
	party: new Location({
		entrancePoints: 0,
		isRandom: true,
		time: [1,2,3],
		week: [6,7]
	}),
	sister: new Location({
		entrancePoints: 20,
		isRandom: true,
		time: [2,3],
		week: [1,2,3,4,5]
	}),
	walk: new Location({
		entrancePoints: 0,
		isRandom: true,
		time: [2,3],
		week: [1,2,3,4,5,6,7]
	}),
	goTo: function(locationName) {
		if (typeof Game.getCurrentLocation().onLeave != 'undefined') {
			Game.getCurrentLocation().onLeave();
			console.log('ON LEAVING');
		}
		if (locationName == 'random') {
			availableLocations = new gArray;
				i=0;
			for (oneLocation in this) {
				if (Locations[oneLocation].isRandom
					&& $.inArray(Time.get(), Locations[oneLocation].time)
					&& $.inArray(Day.get(), Locations[oneLocation].week)) {
						availableLocations.push(oneLocation);
				}
			}
			/** Устанавливаем рандомную возбужденность*/
			Master.excitation.setRandom();
			locationName = availableLocations.getRandom();
		}
		locationName = 'sister';
		console.log(locationName);
		//Загружаем файл локации и его локализацию и все файлы
		if (typeof Locations[locationName].localization == "undefined") {
			require(
				['js/locations/' + locationName,
					'js/localization/' + Locale.get() + '/' + Gender.get() + '/' + locationName
				],
				function (util) {
/** TODO: Отключить*/
//Locations.lab.step=11;
					Locations.load(locationName);
				});
		} else {
			Locations.load(locationName);
		}
	},
	load: function(locationName) {
		Game.setCurrenLocation(Locations[locationName]);
		Locations[locationName].load();
	}
};