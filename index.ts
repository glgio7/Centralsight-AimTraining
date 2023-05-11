let tela: HTMLCanvasElement = document.getElementById(
	"desktop"
) as HTMLCanvasElement;

let pincel: CanvasRenderingContext2D = tela.getContext(
	"2d"
) as CanvasRenderingContext2D;

let telaMobile: HTMLCanvasElement = document.getElementById(
	"mobile"
) as HTMLCanvasElement;

let pincelMobile: CanvasRenderingContext2D = telaMobile.getContext(
	"2d"
) as CanvasRenderingContext2D;

let score = 0;
const scoreCounter: HTMLElement = document.querySelector(
	".score-board__counter"
) as HTMLElement;
const settings = document.getElementById("settings");
const refresh = document.getElementById("refresh");

const toggleSettings = () => {
	const settings: HTMLUListElement = document.querySelector(
		"ul"
	) as HTMLUListElement;
	settings.classList.toggle("active");
};

const refreshPage = () => window.location.reload();

const easy: HTMLLIElement = document.getElementById("easy") as HTMLLIElement;
const normal: HTMLLIElement = document.getElementById(
	"normal"
) as HTMLLIElement;
const hard: HTMLLIElement = document.getElementById("hard") as HTMLLIElement;
const custom: HTMLLIElement = document.getElementById(
	"custom"
) as HTMLLIElement;

const valorCustom = (): number | undefined => {
	let input: string =
		prompt(
			"Digite um intervalo em ms (apenas números entre 99 e 2000). Exemplo: 0.5s = 500ms"
		) ?? "";
	let x: number = parseInt(input);

	if (x && x > 99 && x <= 2000) {
		return x;
	} else {
		alert("Valor é inválido!");
	}
};

function desktopGame() {
	tela.style.display = "block";
	telaMobile.style.display = "none";
	pincel.fillStyle = "rgba(0,0,0, 0.75)";
	pincel.fillRect(0, 0, tela.width, tela.height);
	let xAleatorio: number;
	let yAleatorio: number;
	let raio = 15;

	function desenhaCirculo(x: number, y: number, raio: number, cor: string) {
		pincel.fillStyle = cor;
		pincel.beginPath();
		pincel.arc(x, y, raio, 0, 2 * Math.PI);
		pincel.fill();
	}

	function limpaTela() {
		pincel.clearRect(0, 0, tela.width, tela.height);
		pincel.fillStyle = "rgba(0,0,0, 0.75)";
		pincel.fillRect(0, 0, tela.width, tela.height);
	}
	function desenhaAlvo(x: number, y: number) {
		desenhaCirculo(x, y, raio + 10, "#fff");
		desenhaCirculo(x, y, raio, "#03fc18");
	}

	function geraPosicao(maximo: number) {
		return Math.floor(Math.random() * maximo);
	}

	function atualizaTela() {
		limpaTela();
		xAleatorio = geraPosicao(tela.width);
		yAleatorio = geraPosicao(tela.height);
		desenhaAlvo(xAleatorio, yAleatorio);
	}
	function addScore(props: MouseEvent) {
		let x = props.pageX - tela.offsetLeft;
		let y = props.pageY - tela.offsetTop;
		if (
			x > xAleatorio - raio &&
			x < xAleatorio + raio &&
			y > yAleatorio - raio &&
			y < yAleatorio + raio
		) {
			score += 10;
			scoreCounter.innerHTML = score.toString();
			limpaTela();
		} else if (
			x > xAleatorio - raio - 10 &&
			x < xAleatorio + raio + 10 &&
			y > yAleatorio - raio - 10 &&
			y < yAleatorio + raio + 10
		) {
			score += 5;
			scoreCounter.innerHTML = score.toString();
			limpaTela();
		}
	}

	let timer = setInterval(atualizaTela, 900);

	function normalMode() {
		clearInterval(timer);
		timer = setInterval(atualizaTela, 900);
		normal.style.color = "#03fc18";
		hard.style.color = "#fff";
		easy.style.color = "#fff";
		custom.style.color = "#fff";
	}

	function hardMode() {
		clearInterval(timer);
		timer = setInterval(atualizaTela, 650);
		hard.style.color = "#03fc18";
		easy.style.color = "#fff";
		normal.style.color = "#fff";
		custom.style.color = "#fff";
	}
	function easyMode() {
		clearInterval(timer);
		timer = setInterval(atualizaTela, 1300);
		easy.style.color = "#03fc18";
		hard.style.color = "#fff";
		normal.style.color = "#fff";
		custom.style.color = "#fff";
	}
	function customMode() {
		clearInterval(timer);
		timer = setInterval(atualizaTela, valorCustom());
		custom.style.color = "#03fc18";
		normal.style.color = "#fff";
		hard.style.color = "#fff";
		easy.style.color = "#fff";
	}

	hard.onclick = hardMode;
	normal.onclick = normalMode;
	easy.onclick = easyMode;
	custom.onclick = customMode;
	settings!.onclick = toggleSettings;
	refresh!.onclick = refreshPage;
	tela.onclick = addScore;
}

function mobileGame() {
	if (window.innerWidth < 1024) {
		tela.style.display = "none";
		telaMobile.style.display = "block";
		pincelMobile.fillStyle = "rgba(0,0,0, 0.75)";
		pincelMobile.fillRect(0, 0, telaMobile.width, telaMobile.height);
		let xAleatorio: number;
		let yAleatorio: number;
		let raio = 10;

		function desenhaCirculo(x: number, y: number, raio: number, cor: string) {
			pincelMobile.fillStyle = cor;
			pincelMobile.beginPath();
			pincelMobile.arc(x, y, raio, 0, 2 * Math.PI);
			pincelMobile.fill();
		}

		function limpaTela() {
			pincelMobile.clearRect(0, 0, telaMobile.width, telaMobile.height);
			pincelMobile.fillStyle = "rgba(0,0,0, 0.75)";
			pincelMobile.fillRect(0, 0, telaMobile.width, telaMobile.height);
		}
		function desenhaAlvo(x: number, y: number) {
			desenhaCirculo(x, y, raio + 20, "#fff");
			desenhaCirculo(x, y, raio, "#03fc18");
		}

		function geraPosicao(maximo: number) {
			return Math.floor(Math.random() * maximo);
		}

		function atualizaTela() {
			limpaTela();
			xAleatorio = geraPosicao(telaMobile.width);
			yAleatorio = geraPosicao(telaMobile.height);
			desenhaAlvo(xAleatorio, yAleatorio);
		}
		function addScore(props: MouseEvent) {
			let x = props.pageX - telaMobile.offsetLeft;
			let y = props.pageY - telaMobile.offsetTop;
			if (
				x > xAleatorio - raio &&
				x < xAleatorio + raio &&
				y > yAleatorio - raio &&
				y < yAleatorio + raio
			) {
				score += 10;
				scoreCounter.innerHTML = score.toString();
				limpaTela();
			} else if (
				x > xAleatorio - raio - 10 &&
				x < xAleatorio + raio + 10 &&
				y > yAleatorio - raio - 10 &&
				y < yAleatorio + raio + 10
			) {
				score += 5;
				scoreCounter.innerHTML = score.toString();
				limpaTela();
			}
		}

		let timer = setInterval(atualizaTela, 900);

		function normalMode() {
			clearInterval(timer);
			timer = setInterval(atualizaTela, 900);
			normal.style.color = "#03fc18";
			hard.style.color = "#fff";
			easy.style.color = "#fff";
			custom.style.color = "#fff";
		}

		function hardMode() {
			clearInterval(timer);
			timer = setInterval(atualizaTela, 650);
			hard.style.color = "#03fc18";
			easy.style.color = "#fff";
			normal.style.color = "#fff";
			custom.style.color = "#fff";
		}
		function easyMode() {
			clearInterval(timer);
			timer = setInterval(atualizaTela, 1300);
			easy.style.color = "#03fc18";
			hard.style.color = "#fff";
			normal.style.color = "#fff";
			custom.style.color = "#fff";
		}
		function customMode() {
			clearInterval(timer);
			timer = setInterval(atualizaTela, valorCustom());
			custom.style.color = "#03fc18";
			normal.style.color = "#fff";
			hard.style.color = "#fff";
			easy.style.color = "#fff";
		}

		hard.onclick = hardMode;
		normal.onclick = normalMode;
		easy.onclick = easyMode;
		custom.onclick = customMode;
		settings!.onclick = toggleSettings;
		refresh!.onclick = refreshPage;
		telaMobile.onclick = addScore;
	}
}
