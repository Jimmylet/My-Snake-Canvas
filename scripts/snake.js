/*
 * Created by Jimmy Letecheur on 26/05/16.
 */


(function() {
    "use strict";

        var oCanvas = document.getElementById( "game" ),
            oContext = oCanvas.getContext( "2d" ),
            game,
            snake,

        // Settings for the game
        game = {

            messageGameStart: "",
            messageGameOver: null,
            gameIsOver: true,
            speed: 0,

            // GAME IS START
            "start": function(){
                game.gameIsOver = false;
                game.messageGameOver = null;
            },

            // GAME IS OVER
            "stop": function(){
                game.gameIsOver = true;
                game.messageGameStart = null;
                game.messageGameOver = "";
            },

            // MESSAGE GAME IS START
            "drawMessageGameIsStarted": function() {
                if ( game.messageGameStart !== null ) {
                    oContext.fillStyle = "white";
                    oContext.font = "28px helvetica, arial";
                    oContext.textAlign = "center";
                    oContext.fillText( "Commences avec espace", oCanvas.width / 2, oCanvas.height / 2 );
                }
            },

            // MESSAGE GAME IS OVER
            "drawMessageGameIsOver": function() {
                if ( game.messageGameOver !== null ) {
                    oContext.fillStyle = "white";
                    oContext.font = "28px helvetica, arial";
                    oContext.textAlign = "center";
                    oContext.fillText( "Commences avec espace", oCanvas.width / 2, oCanvas.height / 2 );
                }
            },

            // DESSINE LE BOITE
            "drawBox": function( x, y, size, color ) {
                oContext.fillStyle = color;
                oContext.beginPath();
                oContext.moveTo( x - ( size / 2 ), y - ( size / 2 ) );
                oContext.lineTo( x + ( size / 2 ), y - ( size / 2 ) );
                oContext.lineTo( x + ( size / 2 ), y + ( size / 2 ) );
                oContext.lineTo( x - ( size / 2 ), y + ( size / 2 ) );
                oContext.closePath();
                oContext.fill();
            },

            "resetGame": function() {
                oContext.clearRect( 0, 0, oCanvas.width, oCanvas.height );
            }

        };

        // Settings for the Snake
        snake = {
            color: "#ecf0f1",
            size: oCanvas.width / 40,
            x: null,
            y: null,
            snakeDirection: "left",
            section: [],

            "start": function() {
                snake.section = [];
                snake.snakeDirection = "left";
                snake.y = oCanvas.height / 2 + snake.size / 2;
                snake.x = oCanvas.height / 2 + snake.size / 2;
                for ( snake.x + ( 6 * snake.size ); snake.x >= snake.x; snake.x -= snake.size) {
                    snake.section.push( snake.x + "," + snake.y );
                }
            },

            "drawSnake": function() {
                for (var i = 0; i < snake.section.length; i++ ) {
                    snake.drawSection(snake.section[i].split( "," ) );
                }
            },

            "drawSection": function( section ) {
                game.drawBox( parseInt( section[ 0 ] ), parseInt( section[ 1 ] ), snake.size, snake.color );
            }



        };



        // Settings for the food
        var food = {};


        var requestAnimationFrame = window.requestAnimationFrame;

        function loadSettings() {
            if ( game.over === false ) {
                game.resetGame();
                game.drawMessageGameIsOver();
            } else {
                game.drawMessageGameIsStarted();
            }

            setTimeout(function() {
                requestAnimationFrame(loadSettings);
            }, 1000 / game.speed );

        }

        requestAnimationFrame(loadSettings());


})();