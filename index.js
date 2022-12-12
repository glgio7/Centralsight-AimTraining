let tela = document.querySelector("canvas");
let pincel = tela.getContext("2d");
pincel.fillStyle = "#111";
pincel.fillRect(0, 0, 720, 480);
let xAleatorio;
let yAleatorio;
let raio = 14;
let score = 0;
let scoreBoard = document.querySelector(".score");
const settings = document.getElementById("settings");
const toggleSettings = () => {
  document.querySelector("ul").classList.toggle("active");
};
const refresh = document.getElementById("refresh");
const refreshPage = () => {
  window.location.reload();
};

// ↓↓↓  Meu Discord  ↓↓↓ //
// ↑↑↑  glgio7 #3740 ↑↑↑ //
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

function desenhaCirculo(x, y, raio, cor) {
  pincel.fillStyle = cor;
  pincel.beginPath();
  pincel.arc(x, y, raio, 0, 2 * Math.PI);
  pincel.fill();
}

function limpaTela() {
  pincel.clearRect(0, 0, 720, 480);
  pincel.fillStyle = "#111";
  pincel.fillRect(0, 0, 720, 480);
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
  xAleatorio = geraPosicao(720);
  yAleatorio = geraPosicao(480);
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
function normalMode() {
  clearInterval(timer);
  timer = setInterval(atualizaTela, 900);
  normal.style.color = "#00ff80";
  hard.style.color = "#fff";
  easy.style.color = "#fff";
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
