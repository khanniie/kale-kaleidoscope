class Kaleidoscope {
    constructor(height, width, trisides) {
        this.height = height;
        this.width = width;

        this.arrayOf = [];
        var ycor = 0;
        var xcor = 0;
        for (var i = 0; i < height * 2; i = i + 2) {
            xcor = 0;
           
            var top = [];
            var bottom = [];
            if (Kaleidoscope.isShifted(i)) {
                xcor += (trisides / 2);
            }
            for (var j = 0; top.length < width / 2; j++) {
                top.push(new Piece(xcor, ycor + (trisides / 2) * Math.sqrt(3), xcor + (trisides / 2), ycor, xcor + trisides, ycor + (trisides / 2) * Math.sqrt(3), true, trisides));
                bottom.push(new Piece(xcor, ycor + (trisides / 2) * Math.sqrt(3), xcor + (trisides / 2), ycor + trisides * Math.sqrt(3), xcor + trisides, ycor + (trisides / 2) * Math.sqrt(3), false, trisides));
                xcor += trisides;
            }
             ycor += (trisides / 2) * Math.sqrt(3);
            this.arrayOf.push(top);
            this.arrayOf.push(bottom);
        }
    }

    static isShifted(rowNum) {
        if (rowNum % 4 == 0 || (rowNum - 1) % 4 == 0)
            return true;

        else
            return false;
    }
}

class Piece {
    constructor(xcor1, ycor1, xcor2, ycor2, xcor3, ycor3, top, length) {

        this.color = [];
        var count = 0;
        if(top){
        for (var i = 0; i < 3; i++) {
            var temp = [];
            for (var j = 0; j <= count; j++) {
                temp[j] = 200;
            }
            this.color.push(temp);
            count++;
        }}
        else{
        count = 2
        for (var i = 2; i >= 0; i--) {
            var temp = [];
            for (var j = 0; j <= count; j++) {
                temp[j] = 200;
            }
            this.color.push(temp);
            count++;
        }}

        this.xcor1 = xcor1;
        this.ycor1 = ycor1;
        this.xcor2 = xcor2;
        this.ycor2 = ycor2;
        this.xcor3 = xcor3;
        this.ycor3 = ycor3;
        this.top = top;
        this.lengthamt = length;
    }
}

var kale;

function setup() {
    kale = new Kaleidoscope(50, 50, 100);
    createCanvas(windowWidth, windowHeight);
    translate(100,100);
      for (var i = 0; i < kale.arrayOf.length; i++) {
        for (var j = 0; j < kale.arrayOf[0].length; j++) {
            triangle(kale.arrayOf[i][j].xcor1, kale.arrayOf[i][j].ycor1, kale.arrayOf[i][j].xcor2, kale.arrayOf[i][j].ycor2, kale.arrayOf[i][j].xcor3, kale.arrayOf[i][j].ycor3);
            
        }
    }
}

function randomColor(lower, upper){
    var dif = upper - lower;
    var color = [];

    for(var i = 0; i<3; i++){
        var number = Math.random()*dif + lower;
        color.push(number);
    }
    return color;
}

// // function draw() {
// //   triangle(mouseX - 10, mouseY - 10, mouseX + 10, mouseY + 10, mouseX, mouseY);
// // }

//     //     for (var i = 0; i < kalesmall.arrayOf.length; i++) {
//     //     console.log("newrow");
//     //     for (var j = 0; j < kalesmall.arrayOf[0].length; j++) {
//     //         triangle(kalesmall.arrayOf[i][j].xcor1, kalesmall.arrayOf[i][j].ycor1, kalesmall.arrayOf[i][j].xcor2, kalesmall.arrayOf[i][j].ycor2, kalesmall.arrayOf[i][j].xcor3, kalesmall.arrayOf[i][j].ycor3);
//     //     }
//     // }
//    // stroke(255, 100, 100);
//         for (var i = 0; i < kale.arrayOf.length; i++) {
//         // console.log("newrow");
//         for (var j = 0; j < kale.arrayOf[0].length; j++) {
//             triangle(kale.arrayOf[i][j].xcor1, kale.arrayOf[i][j].ycor1, kale.arrayOf[i][j].xcor2, kale.arrayOf[i][j].ycor2, kale.arrayOf[i][j].xcor3, kale.arrayOf[i][j].ycor3);
//             // blendMode(LIGHTEST);
//             // strokeWeight(30);
//             // stroke(80, 150, 255);
//             // line(25, 25, 75, 75);
//             // stroke(255, 50, 50);
//             // line(75, 25, 25, 75);



//             // var temptri = kale.arrayOf[i][j].color;

//             // var temp = kale.arrayOf[i][j];
//             // for(var k = 0; k < 3; k++){
//             //     for(var l = 0; l < temptri[k]; l++){
//             //         // console.log(k +" " + l)
//             //         noStroke();
//             //         fill(200);
//             //         if(temp.top){
//             //         triangle((temp.xcor2 + temp.xcor1)/2, (temp.ycor2 + temp.ycor1)/2, temp.xcor2 , temp.ycor2, (temp.xcor2 + temp.xcor3)/2, (temp.ycor2 + temp.ycor1)/2);    
//             //         }
//             //         // else{
//             //        // triangle((temp.xcor2 + temp.xcor1)/2, (temp.ycor2 + temp.ycor1)/2, temp.xcor2 , temp.ycor2, (temp.xcor2 + temp.xcor3)/2, (temp.ycor2 + temp.ycor1)/2);    
//             //        // }
//             //         noFill();
//             //         stroke(0);
//             //     }
//             // }

//         }
//     }