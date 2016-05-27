/*
 * Created by Jimmy Letecheur on 26/05/16.
 */


(function() {
    "use strict";

        var oCanvas = document.getElementById( "game" ),
            oContext = oCanvas.getContext( "2d" ),
            game,
            snake,
            food,
            requestAnimationFrame,

    // Settings for the game
        game = {

            messageGameStart: "",
            messageGameOver: null,
            gameIsOver: true,
            speed: 0,

            // GAME IS START
            "gameIsStart": function(){
                game.gameIsOver = false;
                game.messageGameOver = null;
            },

            // GAME IS OVER
            "gameIsStop": function(){
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
            },

            // REGARDER SI IL Y A UNE COLLISION
            "checkIfCollision": function() {
                if ( snake.isCollision(snake.x, snake.y) === true ) {
                    game.gameIsStop();
                }
            },

            // SI COLLISION ...
            "isCollision": function( x, y ) {
                if ( x < snake.size / 2 || x > oCanvas.width || y < snake.size / 2 || y > oCanvas.height || snake.section.indexOf( x + "," + y ) >= 0 ) {
                    return true;
                }
            }
        };



        // Settings for the food
        food = {
            size: null,
            color: "#2ecc71",
            x: null,
            y: null,

            "createFood": function() {
                food.size = snake.size;
                food.x = ( Math.ceil( Math.random() * 10 ) * snake.size * 4 ) - snake.size / 2;
                food.y = ( Math.ceil( Math.random() * 10 ) * snake.size * 3 ) - snake.size / 2;
            },

            "drawFood": function() {
                game.drawBox(food.x, food.y, food.size, food.color);
            }

        };


        requestAnimationFrame = window.requestAnimationFrame;

        function loadSettings() {
            if ( game.gameIsOver === false ) {
                game.resetGame();
                food.drawFood();
                snake.drawSnake();
                game.drawMessageGameIsOver();
            } else {
                game.drawMessageGameIsStarted();
            }

            setTimeout(function() {
                requestAnimationFrame(loadSettings);
            }, 1000 / game.speed );

        }

        requestAnimationFrame( loadSettings() );


})();