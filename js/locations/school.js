$.extend(Locations.school,  {
	/** Номер шага для диалога*/
	step:0,
	load: function() {
		Master.excitation.set(0);
		console.log(Locations.school.localization[Locale.get()]);
		lText = Locations.school.localization[Locale.get()][Gender.get()];
		switch (this.step) {
			case 1:
				MessagesBlock.setText(lText.step1.message);
			break;
			default:
				MessagesBlock.setText(lText.step0.message);
		}
		VariantsBlock.setVariants(
			[
				{
					text: lText.step0.answer1,
					action: function(){
						Locations.school.step++;
						Locations.school.load();
					}
				}
			]
		);
	},
	onLeave: function() {

	}
});