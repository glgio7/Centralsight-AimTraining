let tela = document.getElementById("desktop");
let pincel = tela.getContext("2d");

let telaMobile = document.getElementById("mobile");
let pincelMobile = telaMobile.getContext("2d");

let score = 0;
const scoreBoard = document.querySelector(".score");
const settings = document.getElementById("settings");
const refresh = document.getElementById("refresh");

const toggleSettings = () => document.querySelector("ul").classList.toggle("active");
const refreshPage = () => window.location.reload();

const easy = document.getElementById("easy");
const normal = document.getElementById("normal");
const hard = document.getElementById("hard");
const custom = document.getElementById("custom");
const valorCustom = () => {
  let x = prompt(
    "Digite um intervalo em ms (apenas números entre 99 e 2000). Exemplo: 0.5s = 500ms"
  );
  if (x > 99 && x <= 2000) {
    return x;
  } else {
    return alert("Valor inválido! Houston, temos um problema!")
  }
};
const desktopMode = document.getElementById('desktop')
const mobileMode = document.getElementById('mobile')

function desktopGame() {
  desktopMode.style.display = 'block';
  mobileMode.style.display = 'none';
  pincel.fillStyle = "#111";
  pincel.fillRect(0, 0, tela.width, tela.height);
  let xAleatorio;
  let yAleatorio;
  let raio = 14;

  function desenhaCirculo(x, y, raio, cor) {
    pincel.fillStyle = cor;
    pincel.beginPath();
    pincel.arc(x, y, raio, 0, 2 * Math.PI);
    pincel.fill();
  }

  function limpaTela() {
    pincel.clearRect(0, 0, tela.width, tela.height);
    pincel.fillStyle = "#111";
    pincel.fillRect(0, 0, tela.width, tela.height);
  }
  function desenhaAlvo(x, y) {
    desenhaCirculo(x, y, raio + 24, "#00ff80");
    desenhaCirculo(x, y, raio + 20, "#333");
    desenhaCirculo(x, y, raio, "#00ff80");
  }

  function geraPosicao(maximo) {
    return Math.floor(Math.random() * maximo);
  }

  function atualizaTela() {
    limpaTela();
    xAleatorio = geraPosicao(tela.width);
    yAleatorio = geraPosicao(tela.height);
    desenhaAlvo(xAleatorio, yAleatorio);
  }
  function addScore(props) {
    let x = props.pageX - tela.offsetLeft;
    let y = props.pageY - tela.offsetTop;
    if (
      x > xAleatorio - raio &&
      x < xAleatorio + raio &&
      y > yAleatorio - raio &&
      y < yAleatorio + raio
    ) {
      score += 10;
      scoreBoard.innerHTML = score;
      limpaTela();
    } else if (
      x > xAleatorio - raio - 10 &&
      x < xAleatorio + raio + 10 &&
      y > yAleatorio - raio - 10 &&
      y < yAleatorio + raio + 10
    ) {
      score += 5;
      scoreBoard.innerHTML = score;
      limpaTela();
    }
  }

  let timer = setInterval(atualizaTela, 900);

  function normalMode() {
    clearInterval(timer);
    timer = setInterval(atualizaTela, 900);
    normal.style.color = "#00ff80";
    hard.style.color = "#fff";
    easy.style.color = "#fff";
    custom.style.color = "#fff";
  }

  function hardMode() {
    clearInterval(timer);
    timer = setInterval(atualizaTela, 650);
    hard.style.color = "#00ff80";
    easy.style.color = "#fff";
    normal.style.color = "#fff";
    custom.style.color = "#fff";
  }
  function easyMode() {
    clearInterval(timer);
    timer = setInterval(atualizaTela, 1300);
    easy.style.color = "#00ff80";
    hard.style.color = "#fff";
    normal.style.color = "#fff";
    custom.style.color = "#fff";
  }
  function customMode() {
    clearInterval(timer);
    timer = setInterval(atualizaTela, valorCustom());
    custom.style.color = "#00ff80";
    normal.style.color = "#fff";
    hard.style.color = "#fff";
    easy.style.color = "#fff";
  }

  hard.onclick = hardMode;
  normal.onclick = normalMode;
  easy.onclick = easyMode;
  custom.onclick = customMode;
  settings.onclick = toggleSettings;
  refresh.onclick = refreshPage;
  tela.onclick = addScore;
}

function mobileGame() {
  if (window.innerWidth < 1024)
  {
  desktopMode.style.display = 'none';
  mobileMode.style.display = 'block';
  pincelMobile.fillStyle = "#111";
  pincelMobile.fillRect(0, 0, telaMobile.width, telaMobile.height);
  let xAleatorio;
  let yAleatorio;
  let raio = 10;

  function desenhaCirculo(x, y, raio, cor) {
    pincelMobile.fillStyle = cor;
    pincelMobile.beginPath();
    pincelMobile.arc(x, y, raio, 0, 2 * Math.PI);
    pincelMobile.fill();
  }

  function limpaTela() {
    pincelMobile.clearRect(0, 0, telaMobile.width, telaMobile.height);
    pincelMobile.fillStyle = "#111";
    pincelMobile.fillRect(0, 0, telaMobile.width, telaMobile.height);
  }
  function desenhaAlvo(x, y) {
    desenhaCirculo(x, y, raio + 18, "#00ff80");
    desenhaCirculo(x, y, raio + 14, "#333");
    desenhaCirculo(x, y, raio, "#00ff80");
  }

  function geraPosicao(maximo) {
    return Math.floor(Math.random() * maximo);
  }

  function atualizaTela() {
    limpaTela();
    xAleatorio = geraPosicao(telaMobile.width);
    yAleatorio = geraPosicao(telaMobile.height);
    desenhaAlvo(xAleatorio, yAleatorio);
  }
  function addScore(props) {
    let x = props.pageX - telaMobile.offsetLeft;
    let y = props.pageY - telaMobile.offsetTop;
    if (
      x > xAleatorio - raio &&
      x < xAleatorio + raio &&
      y > yAleatorio - raio &&
      y < yAleatorio + raio
    ) {
      score += 10;
      scoreBoard.innerHTML = score;
      limpaTela();
    } else if (
      x > xAleatorio - raio - 10 &&
      x < xAleatorio + raio + 10 &&
      y > yAleatorio - raio - 10 &&
      y < yAleatorio + raio + 10
    ) {
      score += 5;
      scoreBoard.innerHTML = score;
      limpaTela();
    }
  }

  let timer = setInterval(atualizaTela, 900);

  function normalMode() {
    clearInterval(timer);
    timer = setInterval(atualizaTela, 900);
    normal.style.color = "#00ff80";
    hard.style.color = "#fff";
    easy.style.color = "#fff";
    custom.style.color = "#fff";
  }

  function hardMode() {
    clearInterval(timer);
    timer = setInterval(atualizaTela, 650);
    hard.style.color = "#00ff80";
    easy.style.color = "#fff";
    normal.style.color = "#fff";
    custom.style.color = "#fff";
  }
  function easyMode() {
    clearInterval(timer);
    timer = setInterval(atualizaTela, 1300);
    easy.style.color = "#00ff80";
    hard.style.color = "#fff";
    normal.style.color = "#fff";
    custom.style.color = "#fff";
  }
  function customMode() {
    clearInterval(timer);
    timer = setInterval(atualizaTela, valorCustom());
    custom.style.color = "#00ff80";
    normal.style.color = "#fff";
    hard.style.color = "#fff";
    easy.style.color = "#fff";
  }

  hard.onclick = hardMode;
  normal.onclick = normalMode;
  easy.onclick = easyMode;
  custom.onclick = customMode;
  settings.onclick = toggleSettings;
  refresh.onclick = refreshPage;
  telaMobile.onclick = addScore;}
}