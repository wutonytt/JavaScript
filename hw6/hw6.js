console.log(parseInt(" "));

// 宣告BLANK = 空白
const BLANK = " ";

// 建立Brick function
function Brick() {
    this.ABCnode = document.createTextNode(BLANK);   // 先將要填入的value設為空白
    this.node = document.createElement("div");       // 將node設為div
    this.node.setAttribute("class", "brick");        // 將node的class設為brick
    this.node.appendChild(this.ABCnode);             // 利用append將value傳進node
}

// 建立Brick的prototype function
Brick.prototype.setBrick = function (i) {
    this.ABCnode.nodeValue = i;                           // 將value設為i
    this.node.setAttribute("class", "brick brick" + i);   // 將node的class加入bricki以利設定style
}

Brick.prototype.getBrick = function () {
    return this.ABCnode.nodeValue;                        // 回傳node的value
}

// 隨機產生一個有value的brick
function randomTile() {
    let aTmp = [], i;
    for (i = 0; i < 16; i++) {
        if (aBrick[i].getBrick() === BLANK) aTmp.push(i);    // 將是空格的brick找出來選
    }
    i = Math.floor(Math.random() * aTmp.length);             // 隨機選一個空的brick
    aBrick[aTmp[i]].setBrick(Math.random() < 0.8 ? 2 : 4);   // 將選出來的brick設為2或4
    return true;
}

let aBrick = [];
let container = document.getElementById("container");   // setup container

for (let i = 0; i < 16; i++) {
    aBrick.push(new Brick());                // 產生16個bricks
    container.appendChild(aBrick[i].node);   // 將node append到container
}

// 一開始先產生兩個
randomTile();
randomTile();

// 控制event response的function
function run(e) {
    // 計算是否已被加過以避免累加
    var added = new Array(16);
    added.fill(0);
    // flags
    let gameover = true;
    let forcemove = false;
    let wrongkey = false;
    switch (e.code) {
        case "ArrowLeft":
            for (let i = 0; i < 16; i++) {
                if (i % 4 != 0) {
                    if (aBrick[i].getBrick() !== BLANK) {   // 找有value的brick
                        for (let j = i; j > i - (i % 4); j--) {   // 往左找
                            // 若左邊是空白則移過去並將原本格子設成空白
                            if (aBrick[j - 1].getBrick() === BLANK) {
                                aBrick[j - 1].setBrick(aBrick[j].getBrick());
                                aBrick[j].setBrick(BLANK);
                                gameover = false;
                            }
                            // 若左邊有一樣的value且還沒被加過則往左加，將該格設為已加過，並將原本格子設成空白
                            else if (aBrick[j - 1].getBrick() === aBrick[j].getBrick() && added[j - 1] == 0) {
                                aBrick[j - 1].setBrick(parseInt(aBrick[j - 1].getBrick()) * 2);
                                aBrick[j].setBrick(BLANK);
                                gameover = false;
                                added[j - 1] = 1;
                                break;
                            }
                            // 若都不是則不要做事
                            else {
                                break;
                            }
                        }
                    }
                    else {
                        forcemove = true;
                    }
                }
            }
            break;
        case "ArrowRight":
            for (let i = 15; i >= 0; i--) {
                if (i % 4 != 3) {
                    if (aBrick[i].getBrick() !== BLANK) {
                        for (let j = i; j < i - (i % 4) + 3; j++) {   // 往右找
                            // 若右邊是空白則移過去並將原本格子設成空白
                            if (aBrick[j + 1].getBrick() === BLANK) {
                                aBrick[j + 1].setBrick(aBrick[j].getBrick());
                                aBrick[j].setBrick(BLANK);
                                gameover = false;
                            }
                            // 若右邊有一樣的value且還沒被加過則往右加，將該格設為已加過，並將原本格子設成空白
                            else if (aBrick[j + 1].getBrick() === aBrick[j].getBrick() && added[j + 1] == 0) {
                                aBrick[j + 1].setBrick(parseInt(aBrick[j + 1].getBrick()) * 2);
                                aBrick[j].setBrick(BLANK);
                                gameover = false;
                                added[j + 1] = 1;
                                break;
                            }
                            else {
                                break;
                            }
                        }
                    }
                    else {
                        forcemove = true;
                    }
                }
            }
            break;
        case "ArrowUp":
            for (let i = 4; i < 16; i++) {
                if (aBrick[i].getBrick() !== BLANK) {
                    for (let j = i; j > 3; j -= 4) {   // 往上找
                        // 若上面是空白則移過去並將原本格子設成空白
                        if (aBrick[j - 4].getBrick() === BLANK) {
                            aBrick[j - 4].setBrick(aBrick[j].getBrick());
                            aBrick[j].setBrick(BLANK);
                            gameover = false;
                        }
                        // 若上面有一樣的value且還沒被加過則往上加，將該格設為已加過，並將原本格子設成空白
                        else if (aBrick[j - 4].getBrick() === aBrick[j].getBrick() && added[j - 4] == 0) {
                            aBrick[j - 4].setBrick(parseInt(aBrick[j - 4].getBrick()) * 2);
                            aBrick[j].setBrick(BLANK);
                            gameover = false;
                            added[j - 4] = 1;
                            break;
                        }
                        else {
                            break;
                        }
                    }
                }
                else {
                    forcemove = true;
                }
            }
            break;
        case "ArrowDown":
            for (let i = 11; i >= 0; i--) {
                if (aBrick[i].getBrick() !== BLANK) {
                    for (let j = i; j < 12; j += 4) {   // 往下找
                        // 若下面是空白則移過去並將原本格子設成空白
                        if (aBrick[j + 4].getBrick() === BLANK) {
                            aBrick[j + 4].setBrick(aBrick[j].getBrick());
                            aBrick[j].setBrick(BLANK);
                            gameover = false;
                        }
                        // 若下面有一樣的value且還沒被加過則往下加，將該格設為已加過，並將原本格子設成空白
                        else if (aBrick[j + 4].getBrick() === aBrick[j].getBrick() && added[j + 4] == 0) {
                            aBrick[j + 4].setBrick(parseInt(aBrick[j + 4].getBrick()) * 2);
                            aBrick[j].setBrick(BLANK);
                            gameover = false;
                            added[j + 4] = 1;
                            break;
                        }
                        else {
                            break;
                        }
                    }
                }
                else {
                    forcemove = true;
                }
            }
            break;
        default:
            wrongkey = true;
    }

    // 若沒有gameover且任一格大於等於2048則贏
    if (!gameover) {
        for (let i = 0; i < 16; i++) {
            if (parseInt(aBrick[i].getBrick()) >= 2048) {
                window.removeEventListener("keydown", run, false);
                alert("Congratulation");
                console.log("Congratulation");
                break;
            }
        }
        randomTile();
    }
    // 相反且沒地方走則game over
    else {
        if (!forcemove && !wrongkey) {
            alert("Game Over");
            console.log("Game Over");
            window.removeEventListener("keydown", run, false);
        }

    }
}
window.addEventListener("keydown", run, false);
