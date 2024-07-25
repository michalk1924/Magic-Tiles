
//כניסה לאתר
if (localStorage.getItem("highScore") == null) {
    localStorage.setItem("highScore", 0);
}

let hello = document.querySelector("#hello");
let passToLog = document.querySelector("#passToLog");
function welcome() {
    if (localStorage.getItem("currentUser") == null || localStorage.getItem("currentUser") == "null") {
        passToLog.innerHTML = "הרשם / הכנס"
    }
    else {
        passToLog.innerHTML = "יציאה מהחשבון"
        hello.innerHTML = `שלום ${JSON.parse(localStorage.getItem("currentUser")).name}! וברוך הבא לPLAYME`;
    }
}
welcome();

//פונקצית הרשמה
let logUp = document.querySelector("#logUp");
let logUpForm = document.querySelector("#logUpForm");
let wrongInputInLogUp = document.querySelector("#wrongInputInLogUp");
logUpForm.addEventListener("submit", logUpF);
function logUpF(event) {
    event.preventDefault();
    console.log("hellow");
    let person = {
        name: document.querySelector("#name").value,
        mail: document.querySelector("#mailUp").value,
        password: document.querySelector("#passwordUp").value,
        level: 1,
        bestScore: 0,
        currentScore: 0,
        music: true
    };
    let p = JSON.parse(localStorage.getItem(person.mail));
    console.log(p);
    if (p == null) {
        localStorage.setItem(person.mail, JSON.stringify(person));
        localStorage.setItem("currentUser", JSON.stringify(person));
        welcome();
        passToHomeF();

    }
    else {
        wrongInputInLogUp.style.display = "block";
        setTimeout(wrongInputInLogUpStopAnnouncement, 3000);
    }
}
//פונקצית כניסה לחשבון
let logInForm = document.querySelector("#logInForm");
let logIn = document.querySelector("#logIn");
let wrongInputInLogIn = document.querySelector("#wrongInputInLogIn");
logInForm.addEventListener("submit", logInF);
function logInF(event) {
    event.preventDefault();
    let email = document.querySelector("#mailIn").value;
    let password = document.querySelector("#passwordIn").value;
    let p = JSON.parse(localStorage.getItem(email));
    console.log(p);
    if (p == null) {
        wrongInputInLogIn.style.display = "block";
        setTimeout(wrongInputInLogInStopAnnouncement, 3000);
    }
    else {
        if (password !== p.password) {
            wrongInputInLogIn.style.display = "block";
            setTimeout(wrongInputInLogInStopAnnouncement, 3000);
        }
        else {
            localStorage.setItem("currentUser", JSON.stringify(p));
            welcome();
            passToHomeF();
        }
    }
}

//פונקציות המתריעות על שגיאה בקליטת הנתונים
function wrongInputInLogUpStopAnnouncement() {//על המיל ביצירת חשבון
    wrongInputInLogUp.style.display = "none";
}
function wrongInputInLogInStopAnnouncement() {//על שגיאה בכניסה לחשבון
    wrongInputInLogIn.style.display = "none";
}

//לחצנים המעבירים מכניסה להרשמה ולהיפך
let logUpTag = document.querySelector("#logUpTag");
let logInTag = document.querySelector("#logInTag");
logInTag.addEventListener("click", passToLogIn);
logUpTag.addEventListener("click", passToLogUp);

//פונקציה המעבירה לכניסה מההרשמה
function passToLogIn() {
    logUp.style.display = "none";
    logIn.style.display = "block";
    logInTag.style.backgroundColor = " rgba(215, 57, 216,0.5)";
    logUpTag.style.backgroundColor = "hsla(297, 100%, 63%, 0)";
}
//כנ"ל להפך
function passToLogUp() {
    logIn.style.display = "none";
    logUp.style.display = "block";
    logUpTag.style.backgroundColor = " rgba(215, 57, 216,0.5)";
    logInTag.style.backgroundColor = "hsla(297, 100%, 63%, 0)";
}

//להעברה מהבית לכניסה/הרשמה ולהיפך 

let main = document.querySelector("main");
let log = document.querySelector("#log");

passToLog.addEventListener("click", passToLogF);
function passToLogF() {
    if (localStorage.getItem("currentUser") != null) {
        localStorage.setItem("currentUser", null);
    }
    hello.innerHTML = "";
    main.style.display = "none";
    passToLog.style.display = "none";
    log.style.display = "block";
}

//לחיצה על הלוגו מעבירה לדף הבית
let logo = document.querySelector("#logo");
logo.addEventListener("click", passToHomeF);
function passToHomeF() {
    if (localStorage.getItem("currentUser") == null || localStorage.getItem("currentUser") == "null") {
        passToLog.innerHTML = "הרשם / הכנס"
    }
    else {
        passToLog.innerHTML = "יציאה מהחשבון"
        hello.innerHTML = `שלום ${JSON.parse(localStorage.getItem("currentUser")).name}! וברוך הבא לPLAYME`;
    }
    log.style.display = "none";
    main.style.display = "block";
    passToLog.style.display = "block";
}

//לחיצה על המשחק מעבירה למשחק
let ourGame = document.querySelector("#ourGame");
ourGame.addEventListener("click", passToGame);
function passToGame() {
    if (localStorage.getItem("currentUser") == null || localStorage.getItem("currentUser") == "null") {
        main.style.display = "none";
        passToLog.style.display = "none";
        log.style.display = "block";
    }
    else {
        location.replace("../html/levels.html");
    }

}

