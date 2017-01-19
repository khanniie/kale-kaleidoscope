var can, pg, triheight, triwidth;

function setup() {
    push();
    triwidth = 120;
    //higher number, thicker strokes, less detail
    detailamt1 = 1.8;
    //higher number, more strokes, more detail
    detailamt2 = 6;
    triheight = (triwidth / 2) * Math.sqrt(3);
    pg = createGraphics(triwidth*2, triwidth*2);
    can = createCanvas(windowWidth, windowHeight);
    translate(triwidth*2, triwidth*2);
    pg.fill(randomColor(20));
    pg.noStroke();
    pg.triangle(0, 0, triwidth / 2, triheight, triwidth, 0);
    pg.blendMode(LIGHTEST);

    for (var i = 0; i < 4* detailamt2; i++) {
        pg.strokeWeight(10 * detailamt1);
        pg.stroke(randomColor(Math.random() * 255));
        pg.line(Math.random() * triwidth, Math.random() * triheight, Math.random() * triwidth, Math.random() * triheight);
    }
    for (var i = 0; i < 4* detailamt2; i++) {
        var temp = randomColor(Math.random() * 255);
        pg.noStroke();
        pg.fill(temp);
        pg.ellipse(Math.random() * triwidth, Math.random() * triheight, Math.random() * triwidth / 1.5, Math.random() * triheight / 1.5);
    }
    pg.drawingContext.globalCompositeOperation = "destination-atop";
    pg.fill(255);
    pg.triangle(0, 0, triwidth / 2, triheight, triwidth, 0);
    image(pg, -triwidth, -triheight*2);
    for (var i = 0; i < 5; i++) {
        var a = 1;
        if (i % 2 == 1) {
            a = -1;
        }
        scale(-1, 1);
        rotate(radians(a * 60));
        image(pg, -triwidth, -triheight*2);
    }
    // scale(-1, 1);
    // rotate(radians(60));
    // image(pg, -100, -(100) * Math.sqrt(3));
}

function randomColor(opacity) {
    var colorar = [];
    colorar.push(255);
    for (var i = 0; i < 2; i++) {
        var number = Math.random() * 255;
        colorar.push(number);
    }
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
