export let allAnswers = [
	'Óbvio que si',
	'Bafff, claro que si',
	'Sin duda',
	'Si, definitivo',
	'Puedes asegurarte en eso',

	'Como yo veo, si',
	'Probabilidád de 90% que si',
	'Paréce que si',
	'Sip',
	'Mis pétalos dícen: Si',

	'Todavía no puedes saber',
	'Pregúntame despues',
	'No debería decirte ahora',
	'Mis pétalos descánsan, ahora no',
	'Pregúntame algo differente',

	'Probabilidád de 70% que no',
	'Mi respuesta es: No',
	'Mis petalos dícen: No',
	'No, definitívo No',
	'Lo dudo'
];

function randelt<T>(lst: T[]) {
	const index = (Math.floor(Math.random() * 100) + lst.length) % lst.length;
	return lst[index];
}

function maybeAddChar(x: string, str: string): string {
	let toAdd = '';
	while (Math.random() < 0.66) {
		toAdd += x;
	}

	return str + toAdd;
}

function moji(str: string, src: string[]): string {
	const emojip = Math.random() < 0.37;
	const count = randelt([1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5]);
	if (emojip) {
		const emoji = randelt(src);
		let em = '';
		for (let i = 0; i < count; i++) em += emoji;

		return str + ' ' + em;
	} else {
		return str + '.';
	}
}

export function dynamify(index: number): string {
	const r0t10e = ['😏', '😉', '😅'];
	const r10t15e = ['🙄', '😈', '😒', '🙃', '😶', '😡', '😑'];
	const r15t20e = ['😈', '😂', '😆', '😅', '😝', '🙃', '🙅'];

	if (index < 10) {
		if (index == 6) {
			const p = 70 + Math.floor(Math.random() * 30);
			return moji(maybeAddChar('i', `Probabilidád de ${p}% que si`), r0t10e);
		}

		if (index == 9) return moji(maybeAddChar('i', allAnswers[index]), r0t10e);

		return moji(allAnswers[index], r0t10e);
	}

	if (index < 15) {
		return moji(allAnswers[index], r10t15e);
	}

	if (index < 20) {
		if (index == 15) {
			const p = 60 + Math.floor(Math.random() * 40);
			return moji(maybeAddChar('o', `Probabilidád de ${p}% que no`), r0t10e);
		}

		if (index < 19) {
			return moji(maybeAddChar('o', allAnswers[index]), r15t20e);
		}

		return moji(allAnswers[index], r15t20e);
	}

	return allAnswers[0];
}
