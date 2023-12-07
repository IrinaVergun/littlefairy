let cvs = document.getElementById("canvas"); // моя область
let ctx = cvs.getContext("2d"); //контекс отвечает за вид нашей игры
let feya = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBotton = new Image();
let salut = new Image();

feya.src = "img/feya2.png";
bg.src = "img/fon1.jpg";
fg.src = "img/trava.png";
pipeUp.src = "img/zybsnizy.png";
pipeBotton.src = "img/zybsverhy1.png";
let gap = 140;
let endmus = new Audio();
let fly1 = new Audio();
fly1.src = "audio/fly1.mp3";
endmus.src = "audio/endmus.mp3 ";
let allgame2 = new Audio();
allgame2.src = "audio/allgame1.mp3";
document.addEventListener("click", moveUp);
document.addEventListener("keydown", moveUp); //срабатывает на момент нажатия клавиши

function moveUp() {
  yPos -= 25;
  return fly1.play();
}
//создание блоков
let pipe = [];
pipe[0] = {
  x: 851,
  y: 0,
};
let score = 0;
let xPos = 350;
let yPos = 150;
let graw = 1.25;

function draw() {
  allgame2.play();
  ctx.drawImage(bg, 0, 0, 1250, 550);
  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBotton, pipe[i].x, pipe[i].y + pipeUp.height + gap);
    pipe[i].x--;
    if (pipe[i].x == 800) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height, // создаём новые блоки
      });
    }
    //если фея находиться в начале блока в серединке или в конце в преелах высоты то перезапуск всей игры
    //отслеживание прикосновений xgor y ver
    if (
      (xPos + feya.width - 15 >= pipe[i].x &&
        xPos <= pipe[i].x + pipeUp.width - 15 &&
        (yPos <= pipe[i].y + pipeUp.height - 10 ||
          yPos + feya.height >= pipe[i].y + pipeUp.height + gap)) ||
      yPos + feya.height >= cvs.height - fg.height
    ) {
      endmus.play();
      let per = confirm(`Cыграть ещё? Твой счёт: ${score} `);
      if (per) {
        return location.reload();
      } else {
        alert("Пока, по желанию отправь отзыв на почту antohka803@gmail.com");
      }
    }
    if (score === 100) {
      alert("Ты чёртов победитель, Поздравляю!!!");
      return location.assign((salut.src = "img/salut.jpg"));
    }
    if (pipe[i].x == 240) {
      score++;
    }
  }
  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(feya, xPos, yPos); //
  //рисует этот метод

  yPos += graw;
  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText("Счёт:  " + score, 10, cvs.height - 60);
  requestAnimationFrame(draw); // сщздаёт анимаю как фея падает, работает ка сет таймаут лучше для анимации
}

pipeBotton.onload = draw; //при загрузке последней картинки запускается функция рисовки
