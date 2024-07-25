//משתנים
const NUM_OF_DIV_TO_WIN = 70;

let person = JSON.parse(localStorage.getItem("currentUser"));
let setIntervalIndex = 0;
let LEVEL = localStorage.getItem("levelPlay");
let SPEED = 0.05 - (localStorage.getItem("levelPlay") * 0.01);
let main = document.querySelector("main");

//audio
let audio = document.querySelector("audio");
let song;
let flagMusic = person.music;
switch (LEVEL) {
  case "1":
    {
      song = "passacaglia";
      break;
    }
  case "2":
    {
      song = "Red Berries in Blossom";
      break;
    }
  case "3":
    {
      song = "Marche Militaire";
      break;
    }
}

//start
let score = 0;
let isThePlayerDontFail = true;
let isTheGameStart = false;
let NUMOFDIVTOWINMusic = person.music;
let startGameAudio=document.querySelector("#startGame");
let startButton = document.querySelector("#startButton");
startButton.addEventListener("click", start);
function start() {
  startGameAudio.play();
  isTheGameStart = true;
  startButton.style.display = "none";
  repeat();
}
//קריאה לפונקציה ליצירת דיבים שחוזרת על עצמה ועצירתה.
let setRepeat;
let setCreateDiv;
function repeat() {

  console.log("repeat");
  console.log(" score is:" + score);
  if (score >= NUM_OF_DIV_TO_WIN * LEVEL || isThePlayerDontFail == false) {

    clearTimeout(setCreateDiv);
    clearTimeout(setRepeat);
  }
  else {
    setCreateDiv = setTimeout(createDiv, SPEED * 1800);
    setRepeat = setTimeout(repeat, SPEED * 18000);
  }
  if (score >= NUM_OF_DIV_TO_WIN * LEVEL) {
    win();
  }
}
//הפונקציה שמחשבת לאיזה טור לכניס א ת הדיב החדש
let columNumber = 1;
function lottery() {
  let help = columNumber;
  columNumber = Math.floor(Math.random() * 4 + 1);//add
  if (columNumber == help) {
    if (columNumber == 4) columNumber = 1;
    else columNumber++;
  }
  console.log(columNumber);
  return columNumber;
}

//פונקציה היוצרת דיבים
let crowns = document.querySelector("#crowns");
let crown1 = document.querySelector("#crown1");
let crown2 = document.querySelector("#crown2");
let crown3 = document.querySelector("#crown3");

function createDiv() {
  let newDiv = document.createElement("div");
  newDiv.setAttribute("class", "divTav");
  let chozenColum = document.querySelector(`#div${lottery()}`);
  chozenColum.appendChild(newDiv);
  setIntervalIndex++;
  MoveDivs(SPEED, newDiv, setIntervalIndex);
  newDiv.addEventListener("click", function () {
    //newDiv.style.backgroundColor="rgba(4, 7, 79,0.1)";
    newDiv.style.opacity = "0.1";
    score++;
    let numTav = score;
    if (numTav > 55) {
      numTav = numTav % (55);
    }
    if (flagMusic == true) {
      audio.src = `../audio/${song}/${numTav}.m4a`;
      audio.play();
    }
    if (score == (10 * LEVEL)) {
      if (flagMusic == true) {
        audioCrown.play();
      }
      crown1.style.color = "yellow";
    }
    if (score == (25 * LEVEL)) {
      if (flagMusic == true) {
        audioCrown.play();
      }
      crown2.style.color = "yellow";
    }
    if (score == (45 * LEVEL)) {
      if (flagMusic == true) {
        audioCrown.play();
      }
      crown3.style.color = "yellow";
    }
    console.log(score);
  })

}
let flow = [];
// הפונקציה שמזיזה את הדיבים
function MoveDivs(SPEED, newDiv) {
  let pos = -20;
  // 
  flow[setIntervalIndex] = setInterval(frame, 7);
  function frame() {
    if (pos > 100) {
      if (newDiv.style.opacity !== "0.1") {
        isThePlayerDontFail = false;
        newDiv.remove();
        fail();//פונקציה פסילות 2 - כאשר קוביה יורדת למטה 
        return;
      }

      // clearInterval(flow);
      newDiv.remove();
    }
    else {
      pos = pos + ((1 / SPEED) / 100);
      newDiv.style.top = pos + 'vh';
    }
  }
}

//פונקציה לעדכון הניקוד של המשתמש לאחר פסילה או נצחון
function reScore() {
  let highScore = localStorage.getItem("highScore");
  if (LEVEL == 1) {
    person.currentScore = score;
  }
  if (LEVEL == 2) {
    person.currentScore = score + 70;
  }
  if (LEVEL == 3) {
    person.currentScore = score + 210;
  }
  if (person.currentScore > person.bestScore) {
    person.bestScore = person.currentScore;
  }
  if (person.currentScore > highScore) {
    highScore = person.currentScore;
  }
  localStorage.setItem("highScore", highScore);
  localStorage.setItem(person.mail, JSON.stringify(person));
  localStorage.setItem("currentUser", JSON.stringify(person));
}

//פונקציות של פסילות
//פונקציה פסילות 1 - כאשר לוחצים על מקום ריק
main.addEventListener('click', clickNotRight);
function clickNotRight(e) {
  if (isTheGameStart) {
    if (e.target.className === "mainColumns") {
      isThePlayerDontFail = false;
      fail();
    }
  }
}

//פונקציה הפוסלת
let failDiv = document.querySelector("#fail");
let yourLevelScoreAfterFail = document.querySelector("#levelScore");
function fail() {
  while (flow[setIntervalIndex]) {

    clearInterval(flow[setIntervalIndex]);
    setIntervalIndex--;
  }
  console.log("fail");
  if (flagMusic) {
    audioFail.play();
  }

  clearTimeout(setCreateDiv);
  clearTimeout(setRepeat);
  main.style.display = "none";
  failDiv.style.display = "block";
  failDiv.appendChild(crowns);
  crowns.style.top = "52vh";
  yourLevelScoreAfterFail.innerHTML = `בשלב זה הגעת ל ${score} נקודות`;
  reScore();
}

//פונקצית ריפרש
let refreshGame = document.querySelector(".fa-arrow-rotate-right");
refreshGame.addEventListener("click", refreshLevel);
function refreshLevel() {
  flag = true;
  location.reload("../html/game.html");
  repeat();

}

let winDiv = document.querySelector("#winDiv");
let nextLevelButton = document.querySelector("#nextLevelButton");
let nextLevel = document.querySelector("#nextLevel");

//פונקצית נצחון
function win() {
  while (flow[setIntervalIndex]) {

    clearInterval(flow[setIntervalIndex]);
    setIntervalIndex--;
  }
  console.log("win");
  main.style.display = "none";
  winDiv.style.display = "block";
  if (LEVEL < 3) {
    nextLevel.innerHTML = `${person.name} הגעת לשלב ${++LEVEL}! כל הכבוד!`;
    nextLevelButton.innerHTML = "לשלב הבא >>";
    if (flagMusic == true) {
      audioLevel.play();
    }

  }
  else {
    
    nextLevelButton.innerHTML = "שחק שוב";
    if (flagMusic == true) {
      audioEnd.play();
    }

  }
  if ((person.level == --LEVEL) && (person.level < 3)) {
    person.level++;
  }
  reScore();
}



//לחצן מעבר לשלב הבא לאחר נצחון
nextLevelButton.addEventListener("click", () => {
  localStorage.setItem("levelPlay", ++LEVEL);
  location.reload("../html/game.html");
})
//אנימציות:

