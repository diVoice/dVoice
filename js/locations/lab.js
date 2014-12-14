$.extend(Locations.lab, {
	/** Номер шага для диалога*/
	step: 0,
	/** Загрузка локации*/
	load: function () {
		console.log('LAB LOADED');
		Master.excitation.set(0);
		lText = Game.getText('lab');
		stepKey = 'step' + this.step;

		MessagesBlock.setText(lText[stepKey].message);
		/** Дефолтные ответы*/
		VariantsBlock.setVariants(
			[
				{
					text: lText[stepKey].answer1,
					action: function () {
						Locations.lab.step++;
						Locations.lab.load();
					}
				}
			]
		);

		switch (this.step) {
			case 1:
				Avatar.setImage('images/misc/avatar_1.png');
				ContentBlock.setImage('images/locations/lab/wake_up.png');
			break;
			case 3:
				Avatar.setImage('images/misc/avatar_2.png');
				ContentBlock.setImage('images/locations/lab/001.png');
			break;
			case 4:
				ContentBlock.setImage('images/locations/lab/002.png');
			break;
			case 5:
				Avatar.setImage('images/misc/avatar_3.png');
				ContentBlock.setImage('images/locations/lab/005.png');
				MasterNameLabel.setName(lText.shantyName).show();
				/** Добавляем дополнительные варианты ответов*/
				VariantsBlock.addVariant(
					{
						text: lText[stepKey].answer2,
						action: function () {
							Locations.lab.step = 100;
							Locations.lab.load();
						}
					});
				VariantsBlock.addVariant(
					{
						text: lText[stepKey].answer3,
						action: function () {
							Locations.lab.step = 100;
							Locations.lab.load();
						}
					}
				);
			break;
			case 6:
				ContentBlock.setImage('images/locations/lab/006.png');
				break;
			case 7:
				ContentBlock.setImage('images/locations/lab/007.png');
				break;
			case 8:
				ContentBlock.setImage('images/locations/lab/008.png');
				break;
			case 9:
				ContentBlock.setImage('images/locations/lab/009.png');
				VariantsBlock.setVariants(
					[
						{
							text: lText[stepKey].answer1,
							action: function () {
								Locations.lab.step++;
								Locations.lab.load();
							}
						}
					]
				);
			break;
			case 10:
				ContentBlock.setImage('images/locations/lab/010.png');
				/** Добавляем дополнительные варианты ответов*/
				VariantsBlock.setVariants([
						/*А по моему он милый..*/
					{   text: lText[stepKey].answer1,
						action: function () {
							Gender.set('woman');
							Master.control.increaseBy(50);
							Locations.lab.step++;
							Locations.lab.load();
						}
					},
					/*Слабак, совсем осаду слабо держит.*/
					{   text: lText[stepKey].answer2,
						action: function () {
							Gender.set('man');
							Master.control.increaseBy(10);
							Locations.lab.step++;
							Locations.lab.load();
						}
					},
					/*Я бы с таким разговаривать даже не стала.*/
					{   text: lText[stepKey].answer3,
						action: function () {
							Gender.set('woman');
							Master.control.increaseBy(50);
							Locations.lab.step++;
							Locations.lab.load();
						}
					},
					/*Нормальный пацан, чо ты сразу тут начинаешь это..*/
					{   text: lText[stepKey].answer4,
						action: function () {
							Gender.set('man');
							Master.control.increaseBy(10);
							Locations.lab.step++;
							Locations.lab.load();
						}
					}
					]
				);
			break;
			case 11:
				ContentBlock.clear();
				VariantsBlock.setVariants(
					[
					/*Да что за ... ?*/
					{	text: lText[stepKey].answer1,
						action: function () {
							Control.show();
							Time.show();
							Day.show();
							Excitation.show();
							Locations.goTo('random');
						}
					}
					]
				);
				break;
			case 100:
				ContentBlock.setImage('images/locations/lab/100.png');
				VariantsBlock.setVariants(
					[
						{
							text: lText[stepKey].answer1,
							action: function () {
								Locations.lab.step = 0;
								Game.startNew();
							}
						}
					]
				);
			break;
			default:
				ContentBlock.clear();
		}

	},
	onLeave: function () {

	}
});