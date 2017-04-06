document.addEventListener("DOMContentLoaded", function(event) {


    var getCanvasContainer = document.getElementById('canvasContainer');
    var canvasContext = getCanvasContainer.getContext('2d');
    var initialValueX = getCanvasContainer.width / 2;
    var initialValueY = getCanvasContainer.height - 30;
    var moveX = 2;
    var moveY = -2;
    var radiusOfBall = 10;
    var paletteHeight = 10;
    var paletteWidth = 150;
    var paletteValueX = (getCanvasContainer.width - paletteWidth) / 2;
    var keyPressRight = false;
    var keyPressLeft = false;
    var ceilBricks = [];
    var score = 0;

    //loop creating bricks

    for (var i = 0; i < 9; i++) { //X line
        ceilBricks[i] = [];
        for (var j = 0; j < 3; j++) { // Y line
            ceilBricks[i][j] = {
                x: 0,
                y: 0,
                z: 0
            };
        }
    }

    //function to detect collision ball with bricks
    function detectBricks() {

        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 3; j++) {
                var getValueOfBricks = ceilBricks[i][j];
                // console.log(getValueOfBricks);
                if (getValueOfBricks.z == 0) {
                    //checking if ball is touching bricks
                    if (initialValueX > getValueOfBricks.x && initialValueX < getValueOfBricks.x + 75 + radiusOfBall && initialValueY > getValueOfBricks.y && initialValueY < getValueOfBricks.y + 20 + radiusOfBall) {
                        moveY = -moveY;
                        getValueOfBricks.z = 1;
                        score++;
                    }
                }
            }
        }
    }


    //events for keyboard to move palette
    document.addEventListener('keydown', keyDownFunction, false)
    document.addEventListener('keyup', keyUpFunction, false);

    //function to move palette
    function keyDownFunction(e) {
        if (e.keyCode == 39) {
            keyPressRight = true;
        } else if (e.keyCode == 37) {
            keyPressLeft = true;
        }
    }

    //function to stop palette
    function keyUpFunction(e) {
        if (e.keyCode == 39) {
            keyPressRight = false;
        } else if (e.keyCode == 37) {
            keyPressLeft = false;
        }
    }
    //creating palette using canvas
    function createPalette() {
        canvasContext.beginPath();
        canvasContext.rect(paletteValueX, getCanvasContainer.height - paletteHeight, paletteWidth, paletteHeight);
        canvasContext.fillStyle = "#DE4B39";
        canvasContext.fill();
        canvasContext.closePath();
    }
    //creating ball using canvas
    function createBall() {
        canvasContext.beginPath();
        canvasContext.arc(initialValueX, initialValueY, radiusOfBall, 0, Math.PI * 2);
        canvasContext.fillStyle = "#DE4B39";
        canvasContext.fill();
        canvasContext.closePath();
    }

    //creating score info using canvas
    function createScore() {
        canvasContext.beginPath();
        canvasContext.font = '18px Arial';
        canvasContext.fillStyle = "#DE4B39";
        canvasContext.fillText('Score: ' + score, 8, 420);
        canvasContext.closePath();
    }
    //finish game
    function gameFinished() {
        if (score == 27) {
            alert('You won!');
            document.location.reload();
        }
    }



    //function to render bricks using canvas
    function createBricks() {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 3; j++) {
                if (ceilBricks[i][j].z == 0) {


                    var brickX = (i * (75 + 10)) + 20;
                    var brickY = (j * (20 + 10)) + 10;
                    ceilBricks[i][j].x = brickX;
                    ceilBricks[i][j].y = brickY;
                    canvasContext.beginPath();
                    canvasContext.rect(brickX, brickY, 75, 20);
                    canvasContext.fillStyle = '#E6D4A4';
                    canvasContext.fill();
                    canvasContext.closePath();
                }
            }
        }
    }

    //function to move ball
    function game() {
        canvasContext.clearRect(0, 0, getCanvasContainer.width, getCanvasContainer.height);
        createBall();
        createPalette();
        createBricks();
        detectBricks();
        createScore();
        gameFinished();

        initialValueX += moveX;
        initialValueY += moveY;



        if (initialValueY + moveY < radiusOfBall) {
            moveY = -moveY;
            //checking collision with ceil
        } else if (initialValueY + moveY > getCanvasContainer.height - radiusOfBall) {
            if (initialValueX > paletteValueX && initialValueX < paletteWidth + paletteValueX) {
                moveY = -moveY;
                //checking collision with palette
            } else {
                alert('Game over!');
                document.location.reload();
                //checking collision with floor and game over
            }
        }

        if (initialValueX + moveX + radiusOfBall > getCanvasContainer.width || initialValueX + moveX < radiusOfBall) {
            moveX = -moveX;
            //checking collision with left and right walls
        }

        if (keyPressRight && paletteValueX + paletteWidth < getCanvasContainer.width) {
            paletteValueX += 7;
            //move palette right
        }


        if (keyPressLeft && paletteValueX + getCanvasContainer.width > getCanvasContainer.width) {
            paletteValueX -= 7;
            //move palette left
        }
        requestAnimationFrame(game);

    }


    //start the game!

    game();
});
