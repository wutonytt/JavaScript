// 建一個randint function，避免重複很多動作
function randint(start, end) {
    r = Math.floor(Math.random() * (end-start+1)) + start;
    // 為了讓randint出來的值不等於0，不然他可能會靜止不動
    if (r == 0) {randint(start,end);}
    return r;
}

// 建立Ball class
class Ball {
    constructor(node) {
        // 設定球可能的顏色
        const COLORS = ["red", "orange", "yellow", "green", "blue", "violet", 
        "purple", "grey", "pink", "skyblue", "olive"];

        // 隨機設定球的半徑大小
        this.radius = randint(3, 10);

        // 隨機設定球在block中的起始座標
        this.coor = {
            x: randint(this.radius, 750),
            y: randint(this.radius, 550),
        };

        // 隨機設定球移動的變量大小
        this.offset = {
            x: randint(-5, 5),
            y: randint(-5, 5)
        };

        // 設定球的長、高、和顏色
        this.node = node;
        this.node.style.width = this.radius * 2 + "px";
        this.node.style.height = this.radius * 2 + "px";
        this.node.style.backgroundColor = COLORS[randint(0, 9)];
        this.node.setAttribute("class", "ball");
        
        // 設定球的起始座標
        this.node.style.left = this.coor.x + "px";
        this.node.style.top = this.coor.y + "px";
    }
    move() {
        // 如果碰到右邊牆壁則反彈，原本offset.x正的變負的
        if (this.coor.x + this.offset.x >= 800)
            this.offset.x = randint(-5, -(this.radius));

        // 如果碰到下面牆壁則反彈，原本offset.y正的變負的
        if (this.coor.y + this.offset.y >= 600)
            this.offset.y = randint(-5, -(this.radius));

        // 如果碰到左邊牆壁則反彈，原本offset.x負的變正的
        if (this.coor.x + this.offset.x <= 0)
            this.offset.x = randint(this.radius, 5);

        // 如果碰到上面牆壁則反彈，原本offset.y負的變正的
        if (this.coor.y + this.offset.y <= 0)
            this.offset.y = randint(this.radius, 5);

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

// 隨機設定球的數量
let balls = randint(3, 10);
let aBall = [], node;

// create balls個球
for (let i = 0; i < balls; i++){
    node = document.createElement("div");
    aBall.push(new Ball(node));
    container.appendChild(node);
}

// 設定移動的間隔時間
var timer = setInterval(function() {
    for (let i = 0; i < balls; i++) {aBall[i].move();}
}, 50);

// 設定幾秒後停止移動
setTimeout(clearInterval, 50000, timer)

