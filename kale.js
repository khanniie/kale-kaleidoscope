var interactMode = true;
var mousex, mousey, screenwidth, screenheight, currentcap, backgroundcolor;
var can, pg, triheight, triwidth;
var pieces = [];
var fr = 30;
var slider;

function preload(){

    $("#autoloop").click(function(){
        interactMode = false;
        $(this).css("display", "none");
        $("#manualloop").css("display", "block");
        $("#slider").css("display", "block");
        $("#sliderbox").css("display", "block");
    })
    $("#manualloop").click(function(){
        interactMode = true;
        $(this).css("display", "none");
        $("#autoloop").css("display", "block");
        $("#slider").css("display", "none");
        $("#sliderbox").css("display", "none");

    })

    $( "body" ).mousemove(function( event ) {
        $("#intro").css("opacity", "0");
    });
       
}

function setup() {
     slider = createSlider(8, 60, 30);
     slider.position(225, 18);
     slider.style('width', '80px');
    frameRate(fr);
    triwidth = 120;
    //higher number, thicker strokes, less detail
    detailamt1 = 1.8;
    //higher number, more strokes, more detail
    detailamt2 = 32;
    triheight = (triwidth / 2) * Math.sqrt(3);
    pg = createGraphics(triwidth * 2, triwidth * 2);
    can = createCanvas(triwidth * 4, triwidth * 4);
    translate(triwidth * 2, triheight * 2);
    var backgroundcol = randomColor(20);
    backgroundcolor = backgroundcol;
    pg.fill(backgroundcol);
    pg.noStroke();
    pg.triangle(0, 0, triwidth / 2, triheight, triwidth, 0);
    pg.blendMode(LIGHTEST);

    for (var i = 0; i < detailamt2; i++) {
        pg.strokeWeight(10 * detailamt1);
        if (Math.random() < 0.7) {
            pg.strokeCap(SQUARE);
            currentcap = "SQUARE";
        } else {
            pg.strokeCap(ROUND);
            currentcap = "ROUND";
        }
        var temp = randomColor(Math.random() * 255);
        pg.stroke(temp);
        var input1 = Math.random() * triwidth;
        var input2 = Math.random() * triheight;
        var input3 = Math.random() * triwidth;
        var input4 = Math.random() * triheight;
        pg.line(input1, input2, input3, input4);
        pieces.push(new Piece("stroke", temp, input1, input2, input3, input4, currentcap));
    }
    for (var i = 0; i < detailamt2; i++) {
        var temp = randomColor(Math.random() * 255);
        pg.noStroke();
        pg.fill(temp);
        var input1 = Math.random() * triwidth;
        var input2 = Math.random() * triheight;
        var input3 = Math.random() * triwidth / 1.5;
        var input4 = Math.random() * triheight / 1.5;
        pg.ellipse(input1, input2, input3, input4);
        pieces.push(new Piece("ellipse", temp, input1, input2, input3, input4, null));
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

    can.id("mycanvas");
    pg.id("pg");
    slider.id("slider");

    screenheight = windowHeight;
    screenwidth = windowWidth;
    mousey = mouseY;
    mousex = mouseX;
        drawoutside();
    
}

// $(function() {
     
// });



function drawoutside() {
    $("#pg").remove();
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
}

function draw() {
    var val = slider.value();
    frameRate(val);
   // console.log(fr + "  " + frameRate());
    pg = createGraphics(triwidth * 2, triwidth * 2);
    can = createCanvas(triwidth * 4, triwidth * 4);
    translate(triwidth * 2, triheight * 2);
    pg.fill(backgroundcolor);
    pg.noStroke();
    pg.strokeWeight(18);
    pg.triangle(0, 0, triwidth / 2, triheight, triwidth, 0);
    pg.blendMode(LIGHTEST);
    if(interactMode){
        interact();
    }
    else{
        autoloop();
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
    can.id("mycanvas");
    pg.id("pg");
    screenheight = windowHeight;
    screenwidth = windowWidth;
    mousey = mouseY;
    mousex = mouseX;
    drawoutside();
}

function interact() {
    frameRate(30);
    var difx = (mousex - mouseX) / 10 * -1;
    var dify = (mousey - mouseY) / 10 * -1;

    if (Math.abs(difx) > 20) {
        difx = 0;
    }
    if (Math.abs(dify) > 20) {
        dify = 0;
    }
    for (var i = 0; i < pieces.length; i++) {
        if (pieces[i].type === "ellipse") {
            pg.noStroke();
            pg.fill(pieces[i].color);
            pieces[i].input1 += difx;
            pieces[i].input2 += dify;
            pg.ellipse(pieces[i].input1, pieces[i].input2, pieces[i].input3, pieces[i].input4);

            var temp = false;
            while (!temp) {
                temp = true;
                if (pieces[i].input2 < 0) {
                    pieces[i] = new Piece("ellipse", randomColor(Math.random() * 255), Math.random() * triwidth / 3 + triwidth / 3, Math.random() * triheight / 4 + triheight * 3 / 4, Math.random() * triwidth / 1.5, Math.random() * triheight / 1.5, null);
                    temp = false;
                } else if (pieces[i].input2 > Math.sqrt(3) * pieces[i].input1) {
                    pieces[i] = new Piece("ellipse", randomColor(Math.random() * 255), Math.random() * triwidth + triwidth * 2 / 3, pieces[i].input2 - triheight / 3, Math.random() * triwidth / 1.5, Math.random() * triheight / 1.5, null);
                    temp = false;
                } else if (pieces[i].input2 > Math.sqrt(3) * triwidth / 2 - Math.sqrt(3)) {
                    pieces[i] = new Piece("ellipse", randomColor(Math.random() * 255), Math.random() * triwidth, pieces[i].input2 - triheight / 3, Math.random() * triwidth / 1.5, Math.random() * triheight / 1.5, null);
                    temp = false;
                } else if (pieces[i].input1 > triwidth * 4 / 5) {
                    pieces[i] = new Piece("ellipse", randomColor(Math.random() * 255), Math.random() * triwidth, pieces[i].input2 - triheight / 3, Math.random() * triwidth / 1.5, Math.random() * triheight / 1.5, null);
                    temp = false;
                }
            }
        } else {
            pg.stroke(pieces[i].color);
            if (pieces[i].strokecap === "ROUND")
                pg.strokeCap(ROUND);
            else
                pg.strokeCap(SQUARE);
            pieces[i].input1 += difx;
            pieces[i].input2 += dify;
            pieces[i].input3 += difx;
            pieces[i].input4 += dify;
            pg.line(pieces[i].input1, pieces[i].input2, pieces[i].input3, pieces[i].input4);

            var temp = false;
            while (!temp) {
                temp = true;
                if (pieces[i].input2 < 0) {
                    pieces[i] = new Piece("stroke", randomColor(Math.random() * 255), Math.random() * triwidth / 3 + triwidth / 3, Math.random() * triheight / 4 + triheight * 3 / 4, Math.random() * triwidth, Math.random() * triheight, pieces[i].strokecap);
                    temp = false;
                } else if (pieces[i].input2 > Math.sqrt(3) * pieces[i].input1) {
                    pieces[i] = new Piece("stroke", randomColor(Math.random() * 255), Math.random() * triwidth + triwidth * 2 / 3, pieces[i].input2 - triheight / 3, Math.random() * triwidth, Math.random() * triheight, pieces[i].strokecap);
                    temp = false;
                } else if (pieces[i].input2 > Math.sqrt(3) * triwidth / 2 - Math.sqrt(3)) {
                    pieces[i] = new Piece("stroke", randomColor(Math.random() * 255), Math.random() * triwidth, pieces[i].input2 - triheight / 3, Math.random() * triwidth, Math.random() * triheight, pieces[i].strokecap);
                    temp = false;
                } else if (pieces[i].input1 > triwidth * 4 / 5) {
                    pieces[i] = new Piece("stroke", randomColor(Math.random() * 255), Math.random() * triwidth, pieces[i].input2 - triheight / 3, Math.random() * triwidth, Math.random() * triheight, pieces[i].strokecap);
                    temp = false;
                }
            }
        }
    }
}

function autoloop() {
    for (var i = 0; i < pieces.length; i++) {
        if (pieces[i].type === "ellipse") {
            pg.noStroke();
            pg.fill(pieces[i].color);
            pieces[i].input1 += 1;
            pieces[i].input2 += 1;
            pg.ellipse(pieces[i].input1, pieces[i].input2, pieces[i].input3, pieces[i].input4);
            if (pieces[i].input1 > triwidth || pieces[i].input2 > triheight) {
                pieces[i] = new Piece("ellipse", randomColor(Math.random() * 255), Math.random() * triwidth * 1.6 - triwidth / 3, Math.random() * triheight / 2 - triheight / 3, Math.random() * triwidth / 1.5, Math.random() * triheight / 1.5, null);
            }
        } else {
            pg.stroke(pieces[i].color);
            if (pieces[i].strokecap === "ROUND")
                pg.strokeCap(ROUND);
            else
                pg.strokeCap(SQUARE);
            pieces[i].input1 += 1;
            pieces[i].input2 += 1;
            pieces[i].input3 += 1;
            pieces[i].input4 += 1;
            pg.line(pieces[i].input1, pieces[i].input2, pieces[i].input3, pieces[i].input4);
            if (pieces[i].input1 > triwidth || pieces[i].input2 > triheight || pieces[i].input3 > triwidth || pieces[i].input4 > triheight) {
                pieces[i] = new Piece("stroke", randomColor(Math.random() * 255), Math.random() * triwidth, Math.random() * triheight / 3, Math.random() * triwidth, Math.random() * triheight, pieces[i].strokecap);
            }
        }
    }
}

class Piece {
    constructor(type, color, input1, input2, input3, input4, strokecap) {
        this.type = type;
        this.color = color;
        this.input1 = input1;
        this.input2 = input2;
        this.input3 = input3;
        this.input4 = input4;
        this.strokecap = strokecap;
    }
}

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