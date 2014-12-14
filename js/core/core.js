/*свойства игрока*/
var Master = {
	/**Уровень контроля, глобальный*/
	control: {
		/**Увеличить контроль на заданную величину*/
		increaseBy: function (value) {
			newValue = Master.control.value + value;
			Master.control.set(newValue > 1000 ? 1000 : newValue);
		},
		/**Уменшить контроль на заданную величину*/
		decreaseBy: function (value) {
			newValue = Master.control.value - value;
			Master.control.set(newValue < 0 ? 0 : newValue);
		},

		/**Устанавливает уровень контроль в заданную величину*/
		set: function (value) {
			diff = value - Master.control.value;
			Master.control.value = value;
			Control.set(value/10, diff);

		},
		get: function() {
			return this.value;
		},
		getState: function() {
			if (this.value >= 700) {
				return 2;
			}
			if (this.value >= 300) {
				return 1;
			}
			return 0;
		},
		/**Текущее значение контроля*/
		value: 0
	},
	/**Уровень возбуждения, глобальный*/
	excitation: {
		maxValue: 10,
		/**Увеличить возбуждение на заданную величину*/
		increaseBy: function (value) {
			newValue = Master.excitation.value + value;
			Master.excitation.set(newValue > this.maxValue ? this.maxValue : newValue);
			//Master.excitation.value += value;
			//Master.excitation.set(Master.excitation.value > 100 ? 100 : Master.excitation.value);
		},
		/**Уменшить возбуждение на заданную величину*/
		decreaseBy: function (value) {
			newValue = Master.excitation.value - value;
			Master.excitation.set(newValue < 0 ? 0 : newValue);

			//Master.excitation.value -= value;
			//Master.excitation.set(Master.excitation.value < 0 ? 0 : Master.excitation.value);
		},
		setRandom: function(){
			max = 3;
			r = Math.floor(Math.random() * (max + 1));
			this.set(r);
		},
		/**Устанавливает уровень возбуждения в заданную величину*/
		set: function (value) {
			diff = value - Master.excitation.value;
			iValue = value * 10;
			Master.excitation.value = value;
			Excitation.set(iValue, diff);
		},
		get: function() {
			return this.value;
		},
		/**Текущее значение возбуждения*/
		value: 0
	},
	onNew: function() {
		this.control.set(0);
		this.excitation.set(0);
	}
};

function getRandomFromArray(array) {
	max = array.length + 1;
	min = 1;
	/*Math.floor(Math.random() * (max - min + 1)) + min*/
	return array[Math.floor(Math.random() * (max - min + 1)) + min];
}

var Avatar = {
	element: $('.avatar'),
	setImage: function(src) {
		this.element.attr('src', src);
	},
	onNew: function() {
		this.setImage('images/misc/avatar_unknown.png');
	}
};

/**
 * Элемент "Контроль" с прогрессбаром
 * 0-1000
 */
var Control = {
	red: 30,
	mid: 70,
	updateViewElement: $('.control-tip'),
	element: $('.control-element'),
	/**Устанавливает прогресс бар "Контроль" на заданную величину*/
	set: function (value, diff) {
		var vElementColor = diff < 0 ? '#dd514c' /*red*/: '#57a957' /*green*/;
		var vElementValue = diff < 0 ? diff : '+' + diff;
		this.updateViewElement.html(vElementValue).css('color', vElementColor).fadeIn(1000).fadeOut(1000);
		var newValue = value;
		Control.element.find('#control-element-value').html(value * 10);
		var diffValue = 0;
		/*зеленая*/
		if (newValue > Control.mid) {
			diffValue = newValue - Control.mid;
			newValue = Control.mid;
		}
		Control.element.find('.bar-success').css('width', diffValue + '%');
		/*желтая*/
		if (newValue > Control.red) {
			diffValue = newValue - Control.red;
			newValue = Control.red;
		}
		Control.element.find('.bar-warning').css('width', diffValue + '%');
		/*красная*/
		Control.element.find('.bar-danger').css('width', newValue + '%');
		return this;
	},
	show: function() {
		this.element.show();
		return this;
	},
	hide: function() {
		this.element.hide();
		return this;
	},
	onNew: function() {
		this.set(0).hide();
	}

};

/**
 * Элемент "Возбуждение" с прогрессбаром
 * шкала из 10 степеней
 */
var Excitation = {
	red: 20,
	mid: 60,
	updateViewElement: $('.excitation-tip'),
	element: $('.excitation-element'),
	/**Устанавливает прогресс бар "Возбуждение" на заданную величину*/
	set: function (value, diff) {
		var vElementColor = diff < 0 ? '#dd514c' /*red*/: '#57a957' /*green*/;
		var vElementValue = diff < 0 ? diff : '+' + diff;
		if (diff !=0) {
			this.updateViewElement.html(vElementValue).css('color', vElementColor).fadeIn(1000).fadeOut(1000);
		}
		var newValue = value;
		var diffValue = 0;
		/*зеленая*/
		if (newValue > this.red + this.mid) {
			diffValue = newValue - (this.red + this.mid);
			newValue = this.red + this.mid;
		}
		this.element.find('.bar-success').css('width', diffValue + '%');
		/*желтая*/
		if (newValue > this.red) {
			diffValue = newValue - this.red;
			newValue = this.red;
		}
		this.element.find('.bar-warning').css('width', diffValue + '%');
		/*красная*/
		this.element.find('.bar-danger').css('width', newValue + '%');
		return this;
	},
	show: function() {
		this.element.show();
		return this;
	},
	hide: function() {
		this.element.hide();
		return this;
	},
	onNew: function() {
	this.set(0).hide();
}
};

/**Локаль*/
var Locale = {
	value: 'ru',
	set: function(locale) {
		this.value = locale;
		return this;
	},
	get: function() {
		return this.value;
	},
	onNew: function() {
	this.value = 'ru';
}
};

/**Пол
 * man
 * woman
 * */
var Gender = {
	value: 'man',
	element: $('.gender-image'),
	set: function(value) {
		this.value = value;
		this.element.attr('src', value == 'man' ? 'images/misc/man.png' : 'images/misc/woman.png');
		this.element.show();
		return this;
	},
	get: function() {
		return this.value;
	},
	onNew: function() {
		this.value = 'man';
		this.element.hide();
	}
};

/**
 * Элемент, блок основного конетента.
 */
var ContentBlock = {
	element: $('.content-block'),
	setImage: function(src, additionslParams) {
		params = {src: src, class: 'rounded-border', width: '860px'};
		$.extend(params, additionslParams)
		$img = $('<img />', params);
		this.element.html($img);
	},
	clear: function() {
		this.element.html('');
	},
	onNew: function() {
		this.clear();
	}
};

/**
 * Элемент, надпись с именем.
 */
var MasterNameLabel = {
	element: $('.master-name-label'),
	show: function() {
		this.element.show();
		return this;
	},
	hide: function() {
		this.element.hide();
		return this;
	},
	setName: function(name) {
		this.element.find('.label-text').html(name);
		return this;
	},
	onNew: function() {
		this.hide().setName('');
	}
};

/** Игра, следит за состоянием игры, сбрасывает и востанавливает его.*/
var Game = {
	startNew: function() {
		MasterNameLabel.onNew();
		VariantsBlock.onNew();
		MessagesBlock.onNew();
		ContentBlock.onNew();
		Gender.onNew();
		Locale.onNew();
		Master.onNew();
		Avatar.onNew();
		Time.onNew();
		Day.onNew();
		Locations.lab.load();
	},
	getText: function(location) {
		return Locations[location]['localization'];
	},
	takeAChance: function(chance) {
		/*рандом от 100*/
		max = 100;
		min = 1;
		rand = Math.floor(Math.random() * (max - min + 1)) + min;
		c = (Master.control.get() / 10 + (Master.excitation.get() * 2)) + rand;
		return c >= chance;
	},
	currentLocation: 'lab',
	setCurrenLocation: function(currentLocation) {
		this.currentLocation = currentLocation;
		return this;
	},
	getCurrentLocation: function() {
		return this.currentLocation;
	}
};

var Time = {
	value: 0,
	items: {0:'00:00', 1:'10:00', 2: '14:00', 3: '18:00'},
	element: $('.time-of-day'),
	next: function() {
		return this.set(this.value + 1);
	},
	set: function(value){
		this.value = value;
		if (this.value > 3) {
			this.value = 0;
		}
		this.element.html(this.items[this.value]);
		return this;
	},
	get: function() {
		return this.value;
	},
	show: function() {
		this.element.show();
		return this;
	},
	hide: function() {
		this.element.hide();
		return this;
	},
	onNew: function() {
		this.set(1).hide();
	}
};
var Day = {
	value: 7,
	items: {1:'Понедельник', 2:'Вторник', 3: 'Среда', 4: 'Четверг', 5: 'Пятница', 6: 'Суббота', 7: 'Воскресение'},
	element: $('.day-of-week'),
	next: function() {
		return this.set(this.value + 1);
	},
	set: function(value){
		this.value = value;
		if (this.value > 7) {
			this.value = 1;
		}
		this.element.html(this.items[this.value]);
		return this;
	},
	get: function() {
		return this.value;
	},
	show: function() {
		this.element.show();
		return this;
	},
	hide: function() {
		this.element.hide();
		return this;
	},
	onNew: function() {
		this.set(1).hide();
	}
};
/**
 * Элемент, блок основного сообщения.
 */
var MessagesBlock = {
	element: $('.message'),
	setText: function(text) {
		MessagesBlock.element.html(text);
	},
	onNew: function() {
		this.setText('');
	}
};

/**
 * Элемент, блок с вариантами ответов.
 */
var VariantsBlock = {
	element: $('.variants'),
	setVariants: function(variants) {
		$ul = this.element.find('ul.nav-list');
		$ul.html('');
		for(oneVariant in variants) {
			color = 0;
			colorHex = 'transparent';
			tipHelp = '';
			/** Показываем шанс*/

			if (typeof variants[oneVariant].dialogName != 'undefined') {
				dialogName = variants[oneVariant].dialogName;
				chance = variants[oneVariant].chance;

				c = Math.floor(Master.control.get()/10 + (Master.excitation.get() * 2));
				color = 100 - chance + c;
				//color = 100 - variants[oneVariant].chance + c;
				color = color > 100 ? 100 : color;
				color = color < 0 ? 0 : color;
				colorHex = '#dd514c';
				if (color > 30) {
					colorHex = '#faa732';
				}
				if (color >= 80) {
					colorHex = '#5eb95e';
				}
				tipHelp = color + '% ' + chance+' - ';
				//tipHelp = color + ' "' + variants[oneVariant].chance;
			}

			if (typeof variants[oneVariant].action == 'undefined' ) {
				variants[oneVariant].action = function() {
					Game.getCurrentLocation().setCurrentDialog(typeof $(this).data('self') != 'undefined' ? $(this).data('self') : new Dialog());
					Game.getCurrentLocation().load();
				};
			}
			v = oneVariant;
			$item = $('<li />')
				.append($('<div class="chance" />').css('background-color', colorHex))
				.append($('<a href="#" />').html(tipHelp + variants[oneVariant].text)
					.data('self', variants[oneVariant])
					.click(variants[oneVariant].action));
								//.click(variants[oneVariant].action));
			$ul.append($item);
		}
	},
	addVariant: function(variant) {
		$ul = this.element.find('ul.nav-list');
		$item = $('<li />').append($('<a href="#" />').html(variant.text).click(variant.action));
		$ul.append($item);
	},
	onNew: function() {
		this.setVariants([]);
	}
};
gArray = function() {
	this.getRandom = function () {
		max = this.array.length;
		r = this.array[Math.floor(Math.random() * (max - 1))];
		/*Math.floor(Math.random() * (max - min + 1)) + min*/
		return r;
	};
	this.array = new Array;
	this.push = function(val) {
		this.array.push(val);
	}
};


Location = function(params) {
	this.entrancePoints = 0;
	this.isRandom = true;
	this.time = [];
	this.week = [];
	this.set = function (params) {
		$.extend(this, params);
		return this;
	};

	if (typeof params != 'undefined') {
		this.set(params);
	}
	this.getCurrentDialog = function() {
		selectedDialog = Game.getCurrentLocation().selectedDialog;
		return selectedDialog;
	};
	this.setCurrentDialog = function(selectedDialog) {
		Game.getCurrentLocation().selectedDialog = selectedDialog;
		return this;
	};
	return this;
};

var Dialog = function(params) {
	this.dialogName = 'main';
	this.getName = function () {
		return this.dialogName
	};
	this.set = function (params) {
		$.extend(this, params);
		return this;
	};

	if (typeof params != 'undefined') {
		this.set(params);
	}
};

function addZero() {

}