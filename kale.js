var can, pg, triheight, triwidth;
var screenwidth, screenheight;

function setup() {
    triwidth = 120;
    //higher number, thicker strokes, less detail
    detailamt1 = 1.8;
    //higher number, more strokes, more detail
    detailamt2 = 24;
    triheight = (triwidth / 2) * Math.sqrt(3);
    pg = createGraphics(triwidth * 2, triwidth * 2);
    can = createCanvas(triwidth * 4, triwidth * 4);
    translate(triwidth * 2, triheight * 2);
    pg.fill(randomColor(20));
    pg.noStroke();
    pg.triangle(0, 0, triwidth / 2, triheight, triwidth, 0);
    pg.blendMode(LIGHTEST);

    for (var i = 0; i < detailamt2; i++) {
        pg.strokeWeight(10 * detailamt1);
        if(Math.random()<0.7)
        pg.strokeCap(SQUARE);
        else
        pg.strokeCap(ROUND);
        pg.stroke(randomColor(Math.random() * 255));
        pg.line(Math.random() * triwidth, Math.random() * triheight, Math.random() * triwidth, Math.random() * triheight);
    }
    for (var i = 0; i < detailamt2; i++) {
        var temp = randomColor(Math.random() * 255);
        pg.noStroke();
        pg.fill(temp);
        pg.ellipse(Math.random() * triwidth, Math.random() * triheight, Math.random() * triwidth / 1.5, Math.random() * triheight / 1.5);
    }
    pg.drawingContext.globalCompositeOperation = "destination-atop";
    pg.fill(255);
    pg.triangle(0, 0, triwidth / 2, triheight, triwidth, 0);
    image(pg, -triwidth, -triheight * 2);
    for (var i = 0; i < 5; i++) {
        var a = 1;
        if (i % 2 == 1) {
            a = -1;
        }
        scale(-1, 1);
        rotate(radians(a * 60));
        image(pg, -1 * triwidth, -1 * triheight * 2);
    }

    // scale(-1, 1);
    // rotate(radians(60));


    // line(-300, 0, 300, 0);
    // stroke(255, 0, 0);
    // line(0, -300, 0, 300);
    // image(pg, -1 * triwidth, -1 * triheight * 2);

    // scale(-1, 1);
    // rotate(radians(-60));
    // translate(triwidth * 2, 0);
    // stroke(0);
    // strokeWeight(20);
    // line(-300, 0, 300, 0);
    // stroke(255, 0, 0);
    // line(0, -300, 0, 300);

    can.id("mycanvas");

    screenheight = windowHeight;
    screenwidth = windowWidth;
    console.log(screenwidth + "  " + screenwidth);
}

// var temp = document.getElementbyId("mycanvas");
//     var ctx = temp.getContext("2d");
//     ctx.getImageData(0, 0, triwidth * 2, triwidth * 2);  

function randomColor(opacity) {
    var colorar = [];
    //one of the color values is always maxed out to ensure color vibrancy
    colorar.push(255);
    for (var i = 0; i < 2; i++) {
        var number = Math.random() * 255;
        colorar.push(number);
    }
    //shuffle to make sure the 255 value doesn't always land on red
    colorar = shuffleArray(colorar);
    return color(colorar[0], colorar[1], colorar[2], opacity);
}

//notmine, fischer yates shuffle
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

$(function() {
    var c = document.getElementById("mycanvas");
    var ctx = c.getContext("2d");
    var dest = document.getElementById("dest");
    var destCtx = dest.getContext('2d');


    var verttracker = triheight * 4;
    var horztracker = 0;
    var alt = 0;
    while (horztracker < screenwidth) {
        while (verttracker < screenheight) {
            destCtx.drawImage(c, horztracker, verttracker, triwidth * 4, triwidth * 4);
            verttracker += triheight * 4;
        }
        if (alt % 2 == 0) {
            verttracker = -triheight * 2;
        } else {
            verttracker = 0;
        }
        horztracker -= triwidth;
        horztracker += triwidth * 4;
        alt++;
    }
    horztracker = -triwidth * 3;
    verttracker = -triheight * 2;
    while (verttracker < screenheight) {
        destCtx.drawImage(c, horztracker, verttracker, triwidth * 4, triwidth * 4);
        verttracker += triheight * 4;
    }
});
