$.extend(Locations.school, {
	/** Номер шага для диалога*/
	storyStep: 0,
	selectedDialog: new Dialog({dialogName: 'main'}),
	/** Загрузка локации*/
	load: function () {
		var dialogName = Game.getCurrentLocation().getCurrentDialog().getName();
		/*Загржуаем локализованный текст*/
		lText = Game.getText('school');
		/*Контроллер*/
		console.log(dialogName);
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
		ContentBlock.setImage('images/locations/school/001.png');
		MessagesBlock.setText(lText.dialog.message);
		/** Дефолтные ответы*/
		VariantsBlock.setVariants([
			new Dialog({
			/*Помочь с ответом.*/
			dialogName: 'control',
			chance: 0,
			text: lText.dialog.control[Master.control.getState()]
			}),
			new Dialog({
			/*А где пожалуйста? Ты же воспитанная девушка?*/
			dialogName: 'superControl',
			chance: 40,
			text: lText.dialog.superControl[Master.control.getState()]
		}),
			new Dialog({
			/*Смотри у Лены новый фразер. Интересно что за модель?*/
			dialogName: 'controlExcitation',
			chance: 50,
			text: lText.dialog.controlExcitation[Master.control.getState()]
		}),
			new Dialog({
			/*Ты заметила засос у Кати?*/
			dialogName: 'Excitation',
			chance: 60,
			text: lText.dialog.Excitation[Master.control.getState()]
		}),
			new Dialog({
			/*Предложить обернуться.*/
			dialogName: 'story',
			chance: 90,
			text: lText.dialog.story[0].say
		})
		]);
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
				ContentBlock.setImage('images/locations/school/win.png');
			break;
			case 'superControl':
				Master.control.increaseBy(win ? 10 : -20);
				if (win) {
					ContentBlock.setImage('images/locations/school/002.png');
				} else {
					ContentBlock.setImage('images/locations/school/loose.png');
				}
			break;
			case 'controlExcitation':
				if (win) {
					Master.excitation.increaseBy(1);
					Master.control.increaseBy(10);
					ContentBlock.setImage('images/locations/school/002.png');
				} else {
					Master.control.decreaseBy(20);
					ContentBlock.setImage('images/locations/school/loose.png');
				}
			break;
			case 'Excitation':
				if (win) {
					Master.excitation.increaseBy(2);
					ContentBlock.setImage('images/locations/school/002.png');
				} else {
					Master.control.decreaseBy(10);
					ContentBlock.setImage('images/locations/school/loose.png');
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
		console.log(this.storyStep );
		if (this.storyStep > 12) {
			Locations.goTo('random');
		}
		lText = Game.getText('school');
		var win = true;
		var chance = 0;
		if (typeof Game.getCurrentLocation().getCurrentDialog().chance != 'undefined'
		&& this.storyStep < 7
		) {
			chance = Game.getCurrentLocation().getCurrentDialog().chance + this.storyStep * 2;
			win = Game.takeAChance(chance) && (Master.control.getState() >= 2 ||  this.storyStep < 6);
		}
		var dialog =new Dialog({
			dialogName: 'story',
			chance: chance,
			text: win ? lText.dialog.story[this.storyStep+1].say : '...'
		});
		if (win) {
			/*Если выиграл, прибавляем шаг и выводим победное сообщение и картинку*/
			Master.excitation.increaseBy(1);
			Master.control.increaseBy(5);
			ContentBlock.setImage('images/locations/school/story/' + ('00' + (this.storyStep+1)).substr(-3) + '.png');
			MessagesBlock.setText(lText.dialog.story[this.storyStep].win);
		} else {
			/*Если проиграл, выводим прощально сообщение и картинку*/
			Master.control.decreaseBy(20);
			dialog.action = function(){Locations.goTo('random');};
			ContentBlock.setImage('images/locations/school/story/loose_00' + (this.storyStep < 5 ? '1' : '2') + '.png');
			MessagesBlock.setText(lText.dialog.story[this.storyStep].loose);
		}
		this.storyStep++;
		VariantsBlock.setVariants([dialog]);
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