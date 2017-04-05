document.addEventListener("DOMContentLoaded", function(event) {


    var getCanvasContainer = document.getElementById('canvasContainer');
    var canvasContext = getCanvasContainer.getContext('2d');
    var initialValueX = getCanvasContainer.width / 2;
    var initialValueY = getCanvasContainer.height - 30;
    var moveX = 2;
    var moveY = -2;
    var radiusOfBall = 10;
    var paletteHeight = 10;
    var paletteWidth = 75;
    var paletteValueX = (getCanvasContainer.width - paletteWidth) / 2;
    var keyPressRight = false;
    var keyPressLeft = false;

    document.addEventListener('keydown', keyDownFunction, false)
    document.addEventListener('keyup', keyUpFunction, false);


    function keyDownFunction(e) {
        if (e.keyCode == 39) {
            keyPressRight = true;
        } else if (e.keyCode == 37) {
            keyPressLeft = true;
        }
    }


    function keyUpFunction(e) {
        if (e.keyCode == 39) {
            keyPressRight = false;
        } else if (e.keyCode == 37) {
            keyPressLeft = false;
        }
    }

    function createPalette() {
        canvasContext.beginPath();
        canvasContext.rect(paletteValueX, getCanvasContainer.height - paletteHeight, paletteWidth, paletteHeight);
        canvasContext.fillStyle = "#0095DD";
        canvasContext.fill();
        canvasContext.closePath();
    }

    function createBall() {
        canvasContext.beginPath();
        canvasContext.arc(initialValueX, initialValueY, radiusOfBall, 0, Math.PI * 2);
        canvasContext.fillStyle = "#0095DD";
        canvasContext.fill();
        canvasContext.closePath();

    }



    function moveBall() {
        canvasContext.clearRect(0, 0, getCanvasContainer.width, getCanvasContainer.height);
        createBall();
        createPalette();

        initialValueX += moveX;
        initialValueY += moveY;



        if (initialValueY + moveY < radiusOfBall) {
            moveY = -moveY;
        } else if (initialValueY + moveY > getCanvasContainer.height - radiusOfBall) {
            if (initialValueX > paletteWidth && initialValueX < paletteWidth + paletteValueX) {
                moveY = -moveY;
            } else {
                console.log('game over');
                console.log(paletteWidth);
                console.log(moveX);
            }
        }

        if (initialValueX + moveX + radiusOfBall > getCanvasContainer.width || initialValueX + moveX < radiusOfBall) {
            moveX = -moveX;
        }

        if (keyPressRight && paletteValueX + paletteWidth < getCanvasContainer.width) {
            paletteValueX += 7;
        }


        if (keyPressLeft && paletteValueX + getCanvasContainer.width > getCanvasContainer.width) {
            paletteValueX -= 7;
        }

    }



    setInterval(moveBall, 20);


});
