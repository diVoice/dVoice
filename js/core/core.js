/*свойства игрока*/
var Master = {
	/**Уровень контроля, глобальный*/
	control: {
		/**Увеличить контроль на заданную величину*/
		increaseBy: function (value) {
			Master.control.value += value;
			Master.control.set(Master.control.value > 100 ? 100 : Master.control.value);
		},
		/**Уменшить контроль на заданную величину*/
		decreaseBy: function (value) {
			Master.control.value -= value;
			Master.control.set(Master.control.value < 0 ? 0 : Master.control.value);
		},
		/**Устанавливает уровень контроль в заданную величину*/
		set: function (value) {
			Master.control.value = value;
			Control.set(value);
		},
		/**Текущее значение контроля*/
		value: 0
	},
	/**Уровень возбуждения, глобальный*/
	excitation: {
		/**Увеличить возбуждение на заданную величину*/
		increaseBy: function (value) {
			Master.excitation.value += value;
			Master.excitation.set(Master.excitation.value > 100 ? 100 : Master.excitation.value);
		},
		/**Уменшить возбуждение на заданную величину*/
		decreaseBy: function (value) {
			Master.excitation.value -= value;
			Master.excitation.set(Master.excitation.value < 0 ? 0 : Master.excitation.value);
		},
		/**Устанавливает уровень возбуждения в заданную величину*/
		set: function (value) {
			iValue = value * 10;
			Master.excitation.value = value;
			Excitation.set(iValue);
		},
		/**Текущее значение возбуждения*/
		value: 0
	},
	onNew: function() {
		this.control.set(0);
		this.excitation.set(0);
	}
};

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
 */
var Control = {
	red: 15,
	mid: 55,
	element: $('.control-element'),
	/**Устанавливает прогресс бар "Контроль" на заданную величину*/
	set: function (value) {
		var newValue = value;
		Control.element.find('#control-element-value').html(value);
		var diffValue = 0;
		/*зеленая*/
		if (newValue > Control.red + Control.mid) {
			diffValue = newValue - (Control.red + Control.mid);
			newValue = Control.red + Control.mid;
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
	element: $('.excitation-element'),
	/**Устанавливает прогресс бар "Возбуждение" на заданную величину*/
	set: function (value) {
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
			$item = $('<li />').append($('<a href="#" />').html(variants[oneVariant].text).click(variants[oneVariant].action));
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
gArray = new Array;
gArray.getRandom = function() {
		max = this.length;
		console.log(max);
		r= this[Math.floor(Math.random() * (max - 1))];
		console.log(r);
		/*Math.floor(Math.random() * (max - min + 1)) + min*/
		return r;
	};