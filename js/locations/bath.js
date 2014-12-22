$.extend(Locations.bath, {
	/** Номер шага для диалога*/
	storyStep: 0,
	selectedDialog: new Dialog({dialogName: 'main'}),
	/** Загрузка локации*/
	load: function () {
		var dialogName = Game.getCurrentLocation().getCurrentDialog().getName();
		/*Загржуаем локализованный текст*/
		lText = Game.getText('bath');
		/*Контроллер*/
		switch (dialogName) {
			case 'main':
				this.main();
				break;
			case 'story':
				this.story();
				break;
			default :
				this.processDialogs();
		}
	},
	main: function () {
		var imageFile = 'images/locations/bath/001.png';
		if (Master.control.getState() == 1) {
			imageFile = 'images/locations/bath/2_001.png';
		}
		if (Master.control.getState() == 2) {
			imageFile = 'images/locations/bath/3_001.png';

		}
		ContentBlock.setImage(imageFile);
		var controlState = Master.control.getState();
		MessagesBlock.setText(lText.dialog.message[controlState]);

		/** Дефолтные ответы*/
		VariantsBlock.setVariants([
			new Dialog({
				/*БумуБУву У?*/
				dialogName: 'control',
				chance: 0,
				text: lText.dialog.control[Master.control.getState()]
			})
		]);

		/**superControl только при контроле 0 и 1-го уровня*/
		if (Master.control.getState() < 2 ) {
			VariantsBlock.addVariant(
				new Dialog({
					/*Ты просто обворожительна в этой... пене...*/
					dialogName: 'superControl',
					chance: 60,
					text: lText.dialog.superControl[Master.control.getState()]
				}))
		}
		/**Excitation только при контроле 0-го уровня*/
		if (Master.control.getState() == 0) {
			VariantsBlock.addVariant(
				new Dialog({
					/*Ты просто обворожительна в этой... пене...*/
					dialogName: 'Excitation',
					chance: 70,
					text: lText.dialog.Excitation[Master.control.getState()]
				}))
		}

		/**story только при контроле 2-го уровня*/
		if (Master.control.getState() > 1) {
			VariantsBlock.addVariant(
				new Dialog({
					/*А мне очень нравятся, маленькие, аккуратненькие, сладенькие*/
					dialogName: 'story',
					chance: 90,
					text: lText.dialog.story[0].say
				})
			);
		}
		/**Пропустить*/
		VariantsBlock.addVariant(
			new Dialog({
				/*А мне очень нравятся, маленькие, аккуратненькие, сладенькие*/
				dialogName: 'main',
				text: lText.dialog.skip
			})
		);
	},
	processDialogs: function() {
		//На этом этапе мы знаем какой диалог уже выбран, и выполняем нужные действия.
		var win = false;
		if (typeof Game.getCurrentLocation().getCurrentDialog().chance != 'undefined') {
			win = Game.takeAChance(Game.getCurrentLocation().getCurrentDialog().chance);
		}
		var currentDialogName = Game.getCurrentLocation().getCurrentDialog().getName();
		switch(currentDialogName) {
			case 'control':
				Master.control.increaseBy(5);
				ContentBlock.setImage('images/locations/bath/win_001.png');
				break;
			case 'superControl':
				if (win) {
					Master.control.increaseBy(10);
					var imageName = 'images/locations/bath/win_002.png';
					if (Master.control.getState() == 1) imageName = 'images/locations/bath/2_win_001.png';
					if (Master.control.getState() == 2) imageName = 'images/locations/bath/2_win_001.png';
					ContentBlock.setImage(imageName);
				} else {
					var imageName = 'images/locations/bath/loose_001.png';
					if (Master.control.getState() == 1) imageName = 'images/locations/bath/2_loose_001.png';
					if (Master.control.getState() == 2) imageName = 'images/locations/bath/2_win_001.png';
					ContentBlock.setImage(imageName);
					//ContentBlock.setImage('images/locations/bath/loose_001.png');
					Master.control.decreaseBy(-20);
				}
				break;
			case 'Excitation':
				if (win) {
					Master.excitation.increaseBy(2);
					ContentBlock.setImage('images/locations/bath/001.png');
				} else {
					Master.control.decreaseBy(10);
					ContentBlock.setImage('images/locations/bath/win_002.png');
				}
				break;
			default : //main
		}
		MessagesBlock.setText(lText.dialog[currentDialogName][win ? 'win' : 'loose'][Master.control.getState()]);
		/** Прощальные диалоги */
		VariantsBlock.setVariants([
			new Dialog({
				/*Помочь с ответом.*/
				dialogName: currentDialogName,
				chance: 0,
				text: '...',
				action: function() {
					Locations.goTo('random');
				}
			})]);
	},
	story: function() {
		if (this.storyStep > 7) {
			return	Locations.goTo('random');
		}
		lText = Game.getText('bath');
		var dialog =new Dialog({
			dialogName: 'story'
		});
		var win = true;
		var chance = 0;
		/**До пятого шага*/
		if (typeof Game.getCurrentLocation().getCurrentDialog().chance != 'undefined' && this.storyStep < 5) {
			chance = Game.getCurrentLocation().getCurrentDialog().chance + this.storyStep * 5;
			win = Game.takeAChance(chance) && (Master.control.getState() >= 2 ||  this.storyStep < 4);
			dialog.chance = chance;
		}
		dialog.text = win ? lText.dialog.story[this.storyStep+1].say : '...';
		if (win) {
			/*Если выиграл, прибавляем шаг и выводим победное сообщение и картинку*/
			Master.excitation.increaseBy(1);
			Master.control.increaseBy(5);
			ContentBlock.setImage('images/locations/bath/story/' + ('00' + (this.storyStep+1)).substr(-3) + '.png');
			MessagesBlock.setText(lText.dialog.story[this.storyStep].win);
		} else {
			/*Если проиграл, выводим прощально сообщение и картинку*/
			Master.control.decreaseBy(20);
			dialog.action = function(){Locations.goTo('random');};
			ContentBlock.setImage('images/locations/bath/story/loose_00' + (this.storyStep < 2 ? '1' : '2') + '.png');
			MessagesBlock.setText(lText.dialog.story[this.storyStep].loose);
		}
		this.storyStep++;
		VariantsBlock.setVariants([dialog, new Dialog({
			dialogName: 'story',
			text: lText.dialog.storyLeave,
			action: function(){Locations.goTo('random');}
		})
		]);
	},
	/**Код выполняемый в конце перед выходом из локации*/
	onLeave: function() {
		/*Чистим переменные локации*/
		this.set({
			selectedDialog: new Dialog({dialogName: 'main'}),
			storyStep: 0
		});
	}
});