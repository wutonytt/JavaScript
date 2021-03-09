"use strict";

// 寫入<div></div>將含有tables的區塊包成一個div
document.write('<div>')

// 利用for迴圈建立6個tables
for (var i = 1; i <= 6; i++) {
    // 寫入<table></table>以建立table
    document.write('<table>');

    // 寫入各table的標題，而String()則是為了將int轉成string
    document.write('<tr><th colspan = "8">第' + String(i) + '張卡片' +
        '<input type="checkbox">' + '</th></tr>');

    // 利用for迴圈寫入各table中的32個數字，在此宣告m以節省宣告variable的cost
    for (var j = 0, m = 2**(i-1); j < 32; j++) {
        // 在寫入每一個row的第一個column前先寫入<tr>，以表示是一個row的開始
        if ((j+1) % 8 == 1)
            document.write('<tr>');

        // 寫入每格的value，例如第3張卡片：先將後兩bits拿掉並設為0，在第三個bit加入1，並將前三個bit往左shift一位，在加回最後兩bits
        document.write('<td>' + String(j * 2 + m - (j % m)) + '</td>');

        // 在寫入每一個row的最後一個column後寫入</tr>，以表示是一個row的結束
        if ((j+1) % 8 == 0)
            document.write('</tr>');
    }
    document.write("</table>");
}

document.write('</div>');
