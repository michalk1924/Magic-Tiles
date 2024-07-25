//לקיחת כל פרטי המשתמש מהאיחסון המקומי
let person = JSON.parse(localStorage.getItem("currentUser"));

//עצוב העמוד-פתיחת/נעילת שלבים לפי שלב המשתמש
let play1 = document.querySelector("#play1");
let play2 = document.querySelector("#play2");
let play3 = document.querySelector("#play3");
let level2 = document.querySelector("#level2");
let level3 = document.querySelector("#level3");
let lock2 = document.querySelector("#lock2");
let lock3 = document.querySelector("#lock3");
let num2 = document.querySelector("#img2");
let num3 = document.querySelector("#img3");
if (person.level == 2) {
    lock2.style.display = "none";
    play2.style.display = "block";
    level2.style.backgroundColor = "beige";
    num2.src = "../images/twoGold.png";
}
if (person.level == 3) {
    lock2.style.display = "none";
    lock3.style.display = "none";
    play2.style.display = "block";
    play3.style.display = "block";
    level2.style.backgroundColor = "beige";
    level3.style.backgroundColor = "beige";
    num2.src = "../images/twoGold.png";
    num3.src = "../images/threeGold.png";
}

//עדכון הניקוד והשיאים בחלונית המשתמש
let userCurrentScoreName = document.querySelector("#userCurrentScoreName");
let userCurrentScore = document.querySelector("#userCurrentScore");
let userBestScore = document.querySelector("#userBestScore");
let bestScoreAtGame = document.querySelector("#bestScoreAtGame");
userCurrentScoreName.innerHTML = `הניקוד של ${person.name}`;
userCurrentScore = JSON.parse(localStorage.getItem("currentUser")).score;
userBestScore = JSON.parse(localStorage.getItem("currentUser")).bestScore;
bestScoreAtGame = JSON.parse(localStorage.getItem("bestScore"));

// עידכון לחצן הצלילים לפי השמור באיחסון המקומי על המשתמש הנוכחי
let iconMusic = document.querySelector(".music");
if (person.music == true) {
    iconMusic.className = "fa-solid fa-volume-high music icon";
}
else {
    iconMusic.className = "fa-solid fa-volume-xmark music icon";
    person.music = false;
}

//מעבר למשחק לפי השלב שנבחר
play1.addEventListener("click", play1F);
play2.addEventListener("click", play2F);
play3.addEventListener("click", play3F);
function play1F() {
    localStorage.setItem("levelPlay", 1);
}
function play2F() {
    localStorage.setItem("levelPlay", 2);
}
function play3F() {
    localStorage.setItem("levelPlay", 3);
}


//פתיחת חלונית המשתמש -שיאים וניקוד
let peakH1 = document.querySelector("#peakH1");
let peakP = document.querySelector("#peakP");
let peak = document.querySelector("#peak");
let exitPeak = document.querySelector("#exitPeak");
let userPeakOpen = document.querySelector("#userPeakOpen");
userPeakOpen.addEventListener("click", peakFunc);
exitPeak.addEventListener("click", () => peak.style.display = "none");
function peakFunc() {
    if (peak.style.display == "none") {
        let myUser = JSON.parse(localStorage.getItem("currentUser"));
        peakH1.innerHTML = `השיאים של ${myUser.name}`;
        peakP.innerHTML = `הניקוד הנוכחי שלך: ${person.currentScore} <br> הניקוד הגבוה שלך: ${person.bestScore} <br> הניקוד הגבוה מבין המשתתפים: ${localStorage.getItem("highScore")}`
        peak.style.display = "block";
    }
    else {

        peak.style.display = "none";
    }
}

//הפעלת/כיבוי הצלילים במשחק
iconMusic.addEventListener("click", changeMusicState);
function changeMusicState() {
    if (person.music) {
        person.music = false;
        localStorage.setItem("currentUser", JSON.stringify(person));
        localStorage.setItem(person.mail, JSON.stringify(person));
        iconMusic.className = "fa-solid fa-volume-xmark music icon";
    }
    else {
        person.music = true;
        localStorage.setItem("currentUser", JSON.stringify(person));
        localStorage.setItem(person.mail, JSON.stringify(person));
        iconMusic.className = "fa-solid fa-volume-high music icon";
    }
}

