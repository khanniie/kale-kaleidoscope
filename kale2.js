var can, pg, triheight, triwidth;
function setup() {
    push();
    pg = createGraphics(200, 200);
    triwidth = 100;
    triheight = (triwidth / 2) * Math.sqrt(3);
    can = createCanvas(windowWidth, windowHeight);
    translate(200, 200);
    pg.fill(randomColor(0, 255, 20));
    pg.noStroke();
    pg.triangle(0, 0, triwidth/2, triheight, triwidth, 0);
    pg.blendMode(LIGHTEST);

    for(var i = 0; i < 12; i++){
    pg.strokeWeight(30);
    pg.stroke(randomColor1());
    pg.line(Math.random()* triwidth, Math.random()* triheight, Math.random()* triwidth, Math.random()* triheight);}
    for(var i = 0; i < 12; i++){
    var temp = randomColor1();
    pg.noStroke();
    pg.fill(temp);
    pg.ellipse(Math.random()* triwidth,Math.random()* triheight,Math.random()* triwidth/1.5,Math.random()* triheight/1.5);}
    pg.drawingContext.globalCompositeOperation="destination-atop";
    pg.fill(255);
    pg.triangle(0, 0, triwidth/2, triheight, triwidth, 0);
    image(pg, -100, -(100) * Math.sqrt(3));
     for(var i = 0; i< 5; i++){
        var a = 1;
        if(i%2 == 1){
            a = -1;
        }
        scale(-1, 1);
         rotate(radians(a *60));
         image(pg, -100, -(100) * Math.sqrt(3)); 
     }


        scale(-1, 1);
         rotate(radians(60));
        image(pg, -100, -(100) * Math.sqrt(3));

    

}








function randomColor1() {
    var colorar = [];
    colorar.push(255);
    for (var i = 0; i < 2; i++) {
        var number = Math.random()*255;
        colorar.push(number);}
    colorar = shuffleArray(colorar);
    return color(colorar[0], colorar[1], colorar[2], Math.random()*200 + 50);}

function randomColor(lower, upper, opacity) {
    var colorar = [];
    colorar.push(upper);
    for (var i = 0; i < 2; i++) {
        var number = Math.random() * lower;
        colorar.push(number);}
    colorar = shuffleArray(colorar);
    return color(colorar[0], colorar[1], colorar[2], opacity);}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;}
    return array;}
