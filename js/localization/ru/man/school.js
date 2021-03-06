Locations.school.localization = {
	dialog: {
		message: '<span class="m">- Я хочу пойти к доске ответить, будешь мне помогать.</span>',
		control: {// + 2 контроль
			0: "Помочь с ответом.",
			1: "Подсказать.",
			2: "Не обращать внимания.",
			win: {
				0: "Я помог Шанти, теперь она чаще прислушивается ко мне.",
				1: "Я подсказал Шанти, теперь она еще сильней зависит от меня.",
				2: "Я игнорирую Шанти, теперь она сама ищет моего внимания."
			},
			loose:{
				0: '',
				1: '',
				2: ''
			}
		},
		superControl: { // + 5 контроль - 1 возбуждение -- проверка -10 контроль
			//0: "Давай вместе разберемся?",
			0: "А где пожалуйста? Ты же воспитанная девушка?",
			1: "Разве так просят о помощи?",
			2: "Я тебе помогу, если ты залезешь под стол, и скажешь что уронила ручку.",
			win: {
				0: "Шанти вежливо просит меня о помощи.",
				1: "Шанти упрашивает меня, и видимо её это ничуть не смущает.",
				2: "Шанти роняет ручку и лезет под стол, её короткая юбка задирается и однокласникам видно, что на ней нет трусиков."
			},
			loose:{
				0: '<span class="m">- А не много ли ты себе позволяешь?</span>',
				1: '<span class="m">- А толку от тебя немного.</span>',
				2: '<span class="m">- Оно того не стоит, извини что потревожила.</span>'
			}
		},
		controlExcitation: { // +/- контроль + возбуждение -10 контроль -1 возбуждение
			0: "Смотри у Лены новый фразер. Интересно что за модель?",
			1: "Представь как бы тебе пошла та юбка?",
			2: "Ты смогла бы соблазнить Мишку?",
			win: {
				0: "Шанти проявляет любопытство и крутится на стуле пытаясь рассмотреть фразер.",
				1: "Шанти мечтательно закрывает глаза, видимо уже представляя потоки внимания которые привлечет новая юбка, которая на ней будет сидеть несомненно лучше.",
				2: "Шанти оборачивается и смотрит на Мишу, оценивая его и прикидывая свои возможности."
			},
			loose:{
				0: '<span class="m">- Ты меня отвлекаешь.</span>',
				1: '<span class="m">- Юбка как юбка, об уроке надо думать.</span>',
				2: '<span class="m">- Что то он меня не привлекает.</span>'
			}
		},
		//answer2: "А Мишка то какой сладенький.. так бы и съела.", // +/- контроль + возбуждение

		Excitation: { // ++ возбуждение проверка: -10 контроль +1 возбуждение
			0: "Ты заметила засос у Кати?",
			1: "Смотри, Маша то сегодня без нижнего белья пришла...",
			2: "На тебе сейчас нет трусиков, как же это заводит.. любое неосторожное движение и ты на всеобщем обозрении...",
			win: {
				0: "Шанти рассматривает шейку однокласницу, представляя ситуацию где она могла бы его получить.",
				1: "Шанти периодически оборачивается назад, стараясь поймать момент когда Маша перекладывая ногу на ногу, случайно блеснет промежностью.",
				2: "Шанти прикрывает глаза, и немного разводит ноги в стороны, словно добиваясь того чтобы кто нибудь заметил, что под юбкой ничего нет."
			},
			loose:{
				0: '<span class="m">- Наверняка сама себе сделала.</span>',
				1: '<span class="m">- Тебе показалось.</span>',
				2: 'Шанти сжимает ноги крепче, она явно чувствует дискомфорт.'
			}
			//2: "Раздвинь ноги, твоя киска теперь на всеобщем обозрении..."
			//2: "Раздвинь ноги, чувствуешь себя бунтаркой, ты сегодня без трусиков, и любой неосторожный взгляд под парту выдаст тебя с потрахами."
			//2: "Вот бы сейчас Серега сделал тебе куни прямо на уроке..."
		},
		//answer4: "Рассказать анектод", // ++ возбуждение
		//answer4: "Ты заметила, Маша то без нижнего белья пришла...", // ++ возбуждение
		story: {
			0:{
				say: "Предложить обернуться.",
				win: "Как я и ожидал, Шанти смутилась неприличных жестов которые ей показывал Сергей, но не смотря на это игривого настроения у неё явно прибавилось.",
				loose: "Шанти отмахивается от меня как от надоедливой мухи."
			},
			1:{
				say: "Предложить задержаться после уроков.",
				win: "Шанти  приняла мое предложение, видимо любопытство перевесило.",
				loose: '<span class="m">- У меня еще куча дел сегодня.</span>'
			},
			2:{
				say: "Болтать с Сергеем.",
				win: "Беседа получилось достаточно оживленная. Надо заметить, Сергей не промах и старательно и аккуратно сводит темы к романтике.",
				loose: "Поболтушки не получились, Шанти быстро наскучила глупая болтвоня Сергея."
			},
			3:{
				say: "Подкидывать темы для беседы.",
				win: "Я подсказываю темы для беседы ненавязчиво направляя от романтичных к интимным.",
				loose: "Сегодня явно не мой день, Шанти невосприимчива к моим нашептываниям."
			},
			4:{
				say: "Рисовать в её сознании эротические образы.",
				win: "Шанти делает вид что не слушает меня, но я вижу реакцию, она смотрит на губы парня, а это верный признак что девочка готова сделать шаг.",
				loose: "Шанти испугалась своих мыслей и как можно скорей свернула беседу."
			},
			5:{
				say: "Поцелуй.",
				win: "Сергей не выдерживает первый, поднимает Шанти и целует её, продолжая целовать сажает её на стул.",
				loose: "Шанти опешила от неожиданного поцелуя и засмущавшись быстро убежала."
			},//Точка невозврата
			6:{
				say: "Раздвинуть ножки.",
				win: "Какой сообразительный парень, мгновенно понял намёк, опустился на колени и с головой так сказать погрузился в дело."
			},
			7:{
				say: "Нашептывать пошлости.",
				win: "Шанти прикрыла глаза от удовольствия. Видно что остатки разума борятся с возбуждением, но меня не выключает, значит ей нравится всё происходящее. " +
				"Сергей лег прямо на пол, и делает приглашающие жесты."
			},
			8:{
				say: "Садись на его член, ты же хочешь...",
				win: "Возбуждение уже накрыло Шанти, она бесприкосолвно слушается меня. Становится над парнем, и мдленно и аккуратно садится на его член." +
				"Шанти начинает двигаться, я слышу насколько сильно она намокла, эти хлюпающие звуки..."
			},
			9:{
				say: "Встань раком, я хочу увидить как он будет иметь тебя сзади.",
				win: "Шанти слазит с члена, и становится на четвереньки. Сергей начинает уверенно и размашисто трахать её. " +
				"Судя по ускоряющимся фрикциям надолго этого молодого бычка не хватит."
			},
			10:{
				say: "Сделай ему миньет.",
				win: "Шанти поворачиваются к Сергею и берет его член в рот."
			},
			11:{
				say: "Проси его кончить тебе в рот.",
				win: "Шанти просит и парень не заставляет себя долго ждать. Лицо Шанти расплылось в довольной улбыке."
			},
			//12:{
			//	say: "Спросить почему она не кончила?",
			//	win: "Шанти сдела вид, что не услышала."
			//},
			12:{
				say: "...",
				win: ""
			}
		} // ++ ветка

	}
};

//				win: "Шанти продолжает облизывать член."
