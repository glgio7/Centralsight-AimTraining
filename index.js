let tela = document.querySelector("canvas");
let pincel = tela.getContext("2d");
pincel.fillStyle = "#111";
pincel.fillRect(0, 0, 720, 480);
let raio = 10;
let xAleatorio;
let yAleatorio;
let score = 0;
let scoreBoard = document.querySelector(".score");
let settings = document.getElementById("settings");
const toggleSettings = () => {
  document.querySelector("ul").classList.toggle("active");
};

//Preciso descobrir como mudar o setInterval no onclick destes elementos ↓↓↓ se alguem puder me ajudar, meu discord: glgio7 #3740
const easyMode = document.getElementById("easy");
const normalMode = document.getElementById("normal");
const hardMode = document.getElementById("hard");

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
  desenhaCirculo(x, y, raio + 20, "#00ff80");
  desenhaCirculo(x, y, raio + 10, "#333");
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

setInterval(atualizaTela, 1000);

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
  } else if (
    x > xAleatorio - raio - 10 &&
    x < xAleatorio + raio + 10 &&
    y > yAleatorio - raio - 10 &&
    y < yAleatorio + raio + 10
  ) {
    score += 5;
    scoreBoard.innerHTML = score;
  }
}
tela.onclick = addScore;
settings.onclick = toggleSettings;
