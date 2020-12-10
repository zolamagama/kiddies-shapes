var canvas;
var ctx;
var ballX = 100;
var ballY = 100;
var xVelocity = 5;
var yVelocity = 5;
var color = "#ccff99";
var ballWidth = 100;
var ballActive = false;

setInterval(() => {
    ballWidth -= 10;
}, 1000);

// setInterval(() => {
//     ballWidth += 7;
// }, 1500);

let ballInterval;

//Gets Canvas + Sets Framerate
window.onload = function () {
    canvas = document.getElementById("test");
    ctx = canvas.getContext("2d");
    
    // if (ballActive) {
    //     ballInterval = setInterval(draw, 1000 / 60);
    // } else {
    //     draw();
    // }

    draw();

}


function startBall() {
    ballActive = true;
    ballInterval = setInterval(draw, 1000 / 60);
}


//Draw EVERYTHING
function draw() {

    if (ballWidth <= 0) {
        // play a sound when the game ends...
        clearInterval(ballInterval);
    }

    //Color The Canvas Grey
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //Draw The Ball
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.arc(ballX, ballY, ballWidth, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    //Change Ball Position
    ballX += xVelocity;
    ballY += yVelocity;

    //Bounce Ball Off Left + Choose Color
    if (ballX - ballWidth <= 0) {
        xVelocity = -xVelocity;
        changeColor();
    }

    //Bounce Ball Off Right + Choose Color
    if (ballX + ballWidth >= canvas.width) {
        xVelocity = -xVelocity;
        changeColor();
    }

    //Bounce Ball Off Top + Choose Color
    if (ballY - ballWidth <= 0) {
        yVelocity = -yVelocity;
        changeColor();
    }

    //Bounce Ball Off Bottom + Choose Color
    if (ballY + ballWidth >= canvas.height) {
        yVelocity = -yVelocity;
        changeColor();
    }

    //Randomly Choose Ball Color
    function changeColor() {

        var x = Math.random() * 10;
        var n = Math.ceil(x);
        var nu = n;

        if (nu == 1) {
            color = "#ffaacc";
        }

        if (nu == 2) {
            color = "orange";
        }

        if (nu == 3) {
            color = "teal";
        }

        if (nu == 4) {
            color = "turquoise";
        }

        if (nu == 5) {
            color = "purple";
        }

        if (nu == 6) {
            color = "lightgreen";
        }

        if (nu == 7) {
            color = "skyblue";
        }

        if (nu == 8) {
            color = "darkgrey";
        }

        if (nu == 9) {
            color = "crimson";
        }

        if (nu == 10) {
            color = "pink";
        }
    }
}