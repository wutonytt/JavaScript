function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

// 建立Score class to create Scoreboard
class Score {
    constructor(score, x, y, init) {
        this.score = score;
        this.score.setAttribute("class", "score");
        this.score.style.color = "white";
        this.score.style.fontSize = 100 + "px";
        this.score.style.fontFamily = "Helvetica Neue";
        this.score.style.fontStyle = "italic";

        this.value = document.createTextNode(init);
        this.score.appendChild(this.value);

        this.score.style.left = x + "px";
        this.score.style.top = y + "px";
    }
    set(i) {
        this.value.nodeValue = i;
    }
    get() {
        return this.value.nodeValue;
    }
}

// 建立Net class to build the pillar
class Net {
    constructor(net) {
        this.net = net;
        this.net.style.width = 20 + "px";
        this.net.style.height = 200 + "px";
        // this.net.style.backgroundColor = "#a86f06";
        this.net.style.backgroundImage = "url('images/1.jpeg')";
        this.net.setAttribute("class", "net");

        this.net.style.left = 790 + "px";
        this.net.style.top = 600 + "px";
    }
}

// 建立Dog class to create the two dogs
class Dog {
    constructor(dog, x, y, image) {
        this.coor = {
            x: x,
            y: y
        };

        // 設定狗的長、高、和顏色
        this.dog = dog;
        this.dog.style.width = 100 + "px";
        this.dog.style.height = 160 + "px";
        this.dog.style.backgroundImage = image;
        this.dog.setAttribute("class", "dog");

        // 設定狗的起始座標
        this.dog.style.left = this.coor.x + "px";
        this.dog.style.top = this.coor.y + "px";
    }

    move(direction) {
        if (direction == 'l' && this.coor.x > 820)
            this.coor.x -= 10;
        else if (direction == 'r' && this.coor.x < 1480)
            this.coor.x += 10;
        else if (direction == 'u' && this.coor.y > 350)
            this.coor.y -= 10;
        else if (direction == 'd' && this.coor.y < 640)
            this.coor.y += 10;

        if (direction == 'A' && this.coor.x > 30)
            this.coor.x -= 10;
        else if (direction == 'D' && this.coor.x < 660)
            this.coor.x += 10;
        else if (direction == 'W' && this.coor.y > 350)
            this.coor.y -= 10;

        else if (direction == 'S' && this.coor.y < 640)
            this.coor.y += 10;

        this.dog.style.left = this.coor.x + "px";
        this.dog.style.top = this.coor.y + "px";
    }

    init(x, y) {
        this.coor = {
            x: x,
            y: y
        };
        this.dog.style.left = this.coor.x + "px";
        this.dog.style.top = this.coor.y + "px";
    }
}

// 建立Ball class to create the volleyball
class Ball {
    constructor(node) {
        // 隨機設定球的半徑大小
        this.radius = 50;

        // 隨機設定球在block中的起始座標
        this.coor = {
            x: 350,
            y: 0
        };

        // 隨機設定球移動的變量大小
        this.offset = {
            x: 0,
            y: -1
        };

        // 設定球的長、高、和顏色
        this.node = node;
        this.node.style.width = this.radius * 2 + "px";
        this.node.style.height = this.radius * 2 + "px";
        this.node.style.backgroundImage = "url('images/ball.png')";
        this.node.setAttribute("class", "ball");

        // 設定球的起始座標
        this.node.style.left = this.coor.x + "px";
        this.node.style.top = this.coor.y + "px";
    }

    init(side) {
        // this.coor.x = 350;
        // this.coor.y = 0;
        if (side == 'l') {
            this.coor = {
                x: 350,
                y: 0
            };
        }

        else if (side == 'r') {
            this.coor = {
                x: 1150,
                y: 0
            };
        }

        this.offset = {
            x: 0,
            y: -1
        };
        this.node.style.left = this.coor.x + "px";
        this.node.style.top = this.coor.y + "px";
    }

    move() {
        // winning detection
        if (this.coor.y + 100 >= 800 && this.coor.x + 100 < 790) {
            sscorer.set(parseInt(parseInt(sscorer.get()) + 1));

            bball.init('r');
            doglo.init(350, 640);
            dogro.init(1150, 640);

            if (parseInt(sscorer.get()) == 11) {
                alert("Right Wins");
                sscorel.set(0);
                sscorer.set(0);
            }
            sleep(1000);
        }

        if (this.coor.y + 100 >= 800 && this.coor.x > 810) {
            sscorel.set(parseInt(parseInt(sscorel.get()) + 1));

            bball.init('l');
            doglo.init(350, 640);
            dogro.init(1150, 640);

            if (parseInt(sscorel.get()) == 11) {
                alert("Left Wins!")
                sscorel.set(0);
                sscorer.set(0);
            }
            sleep(1000);
        }
        
        // dog and ball collision detect
        if (this.coor.x >= doglo.coor.x && this.coor.x <= doglo.coor.x + 100 && this.coor.y >= doglo.coor.y - 50 && this.coor.y <= doglo.coor.y + 50) {
            this.offset.x = 10;
            this.offset.y = -this.offset.y;
        }

        if (this.coor.x >= doglo.coor.x - 50 && this.coor.x <= doglo.coor.x && this.coor.y >= doglo.coor.y - 50 && this.coor.y <= doglo.coor.y + 50) {
            this.offset.x = -10;
            this.offset.y = -this.offset.y;
        }

        if (this.coor.x >= dogro.coor.x && this.coor.x <= dogro.coor.x + 80 && this.coor.y >= dogro.coor.y - 50 && this.coor.y <= dogro.coor.y + 50) {
            this.offset.x = 10;
            this.offset.y = -this.offset.y;
        }

        if (this.coor.x >= dogro.coor.x - 50 && this.coor.x <= dogro.coor.x && this.coor.y >= dogro.coor.y - 50 && this.coor.y <= dogro.coor.y + 50) {
            this.offset.x = -10;
            this.offset.y = -this.offset.y;
        }

        // border & net collision detection
        // 如果從左邊碰到網子則反彈，原本offset.x正的變負的
        if (this.coor.x == 690 && this.coor.y > 480)
            this.offset.x = -10;

        // 如果從右邊碰到網子則反彈，原本offset.x負的變正的
        if (this.coor.x == 810 && this.coor.y > 480)
            this.offset.x = 10;

        // 如果碰到右邊牆壁則反彈，原本offset.x正的變負的
        if (this.coor.x + 100 >= 1600)
            this.offset.x = -10;

        // 如果碰到下面牆壁則反彈，原本offset.y正的變負的
        if (this.coor.y + 100 >= 800)
            this.offset.y = -10;

        // 如果碰到左邊牆壁則反彈，原本offset.x負的變正的
        if (this.coor.x <= 0)
            this.offset.x = 10;

        // 如果碰到上面牆壁則反彈，原本offset.y負的變正的
        if (this.coor.y <= 0)
            this.offset.y = 10;

        // 將移動變量加上本來的座標來移動球的位置
        this.coor.x = (this.coor.x + this.offset.x);
        this.coor.y = (this.coor.y + this.offset.y);

        this.node.style.left = this.coor.x + "px";
        this.node.style.top = this.coor.y + "px";
    }
}

// 設一個container當球移動的最大範圍的block
var container = document.createElement("div");
container.setAttribute("id", "container");
document.body.appendChild(container);

// scoreboard
// left score
let scorel = document.createElement("div");
let sscorel = new Score(scorel, 650, 20, 0);
container.appendChild(scorel);

// right score
let scorer = document.createElement("div");
let sscorer = new Score(scorer, 880, 20, 0);
container.appendChild(scorer);

// :
let scorem = document.createElement("div");
let sscorem = new Score(scorem, 780, 13, ':');
container.appendChild(scorem);

// net
let net = document.createElement("div");
let nnet = new Net(net);
container.appendChild(net);

// dog
// left dog
let dogl = document.createElement("div");
let doglo = new Dog(dogl, 350, 640, "url('images/dog4.png')");
container.appendChild(dogl);

// right dog
let dogr = document.createElement("div");
let dogro = new Dog(dogr, 1150, 640, "url('images/dog2.png')");
container.appendChild(dogr);

// create ball
let node = document.createElement("div");
let bball = new Ball(node);
container.appendChild(node);

// 利用requestAnimationFrame在更新frame時移動球
requestAnimationFrame(Move);
function Move() {
    bball.move();
    requestAnimationFrame(Move);
}

// keyboard listener & handler
// boolean for move or not
var lLEFT = false;
var lRIGHT = false;
var lUP = false;
var lDOWN = false;

var rLEFT = false;
var rRIGHT = false;
var rUP = false;
var rDOWN = false;

requestAnimationFrame(DogLMove);
function DogLMove() {
    if (lLEFT)
        doglo.move('A');
    if (lRIGHT)
        doglo.move('D');
    if (lUP)
        doglo.move('W');
    if (lDOWN)
        doglo.move('S');
    requestAnimationFrame(DogLMove);
}

requestAnimationFrame(DogRMove);
function DogRMove() {
    if (rLEFT)
        dogro.move('l');
    if (rRIGHT)
        dogro.move('r');
    if (rUP)
        dogro.move('u');
    if (rDOWN)
        dogro.move('d');
    requestAnimationFrame(DogRMove);
}

// keydown detection
document.onkeydown = function (e) {
    switch (e.code) {
        case "ArrowLeft":
            rLEFT = true;
            break;
        case "ArrowRight":
            rRIGHT = true;
            break;
        case "ArrowUp":
            rUP = true;
            break;
        case "ArrowDown":
            rDOWN = true;
            break;

        case "KeyA":
            lLEFT = true;
            break;
        case "KeyD":
            lRIGHT = true;
            break;
        case "KeyW":
            lUP = true;
            break;
        case "KeyS":
            lDOWN = true;
            break;
    }
}

// keyup detection
document.onkeyup = function (e) {
    switch (e.code) {
        case "ArrowLeft":
            rLEFT = false;
            break;
        case "ArrowRight":
            rRIGHT = false;
            break;
        case "ArrowUp":
            rUP = false;
            break;
        case "ArrowDown":
            rDOWN = false;
            break;

        case "KeyA":
            lLEFT = false;
            break;
        case "KeyD":
            lRIGHT = false;
            break;
        case "KeyW":
            lUP = false;
            break;
        case "KeyS":
            lDOWN = false;
            break;
    }
}
