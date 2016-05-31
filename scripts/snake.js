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
            keys,
            key,
            lastKey,
            inverseDirection,
            requestAnimationFrame,

    // Settings for the game
        game = {

            messageGameStart: "",
            messageGameOver: null,
            gameIsOver: true,
            speed: 15, // VITESSE DU SNAKE DE BASE
            score: 0, // SCORE AU DEPART
            level: 1, // NIVEAU AU DÉPART

            // GAME IS START
            "gameIsStart": function() {
                game.gameIsOver = false;
                game.messageGameOver = null;
                game.score = 0;
                snake.start();
                food.createFood();

            },

            // GAME IS OVER
            "gameIsStop": function() {
                game.gameIsOver = true;
                game.messageGameStart = null;
                game.speed = 15;
                game.level = 1;
                game.messageGameOver = "";
            },

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

            // Écrire le score
            "writeScore": function() {
                oContext.fillStyle = "#bdc3c7";
                oContext.font = "25px px Helvetica, Arial";
                oContext.textAlign = "center";
                oContext.fillText( "Score : " + game.score, 105, 40 );
            },

            "writeLevel": function() {
                oContext.fillStyle = "1bdc3c7";
                oContext.font = "20 px Helvetica, Arial";
                oContext.textAlign = "center";
                oContext.fillText( "Level : " + game.level, 540, 40 );
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
                    oContext.fillText( "Tu as perdu !", oCanvas.width / 2, oCanvas.height / 2 );
                    oContext.fillText( "Rejoues avec espace", oCanvas.width / 2, oCanvas.height / 1.7);
                }
            },

            "resetGame": function() {
                oContext.clearRect( 0, 0, oCanvas.width, oCanvas.height );
            }

        };

        // Settings for the Snake
        snake = {
            "color": "#ecf0f1",
            "size": oCanvas.width / 40,
            "x": null,
            "y": null,
            "snakeDirection": "left",
            "section": [],

            "start": function() {
                snake.section = [];
                snake.snakeDirection = "left";
                snake.x = oCanvas.width / 2 + snake.size / 2;
                snake.y = oCanvas.height / 2 + snake.size / 2;
                for ( var i = snake.x + ( 5 * snake.size); i >= snake.x; i -= snake.size ) {
                    snake.section.push( i + "," + snake.y );
                }
            },

            "moveSnake": function() {
                switch ( snake.snakeDirection ) {
                    case "left":
                        snake.x -= snake.size;
                        break;
                    case "right":
                        snake.x += snake.size;
                        break;
                    case "up":
                        snake.y -= snake.size;
                        break;
                    case "down":
                        snake.y += snake.size;
                        break;
                }
                snake.checkIfCollision();
                snake.checkGrowth();
                snake.section.push( snake.x + "," + snake.y );
            },

            "drawSnake": function( ) {
                for ( var i = 0; i < snake.section.length; i++ ) {
                    snake.drawSection( snake.section[ i ].split( "," ) );
                }
            },

            "drawSection": function( section ) {
                game.drawBox( parseInt( section[ 0 ] ), parseInt( section[ 1 ] ), snake.size, snake.color );
            },

            // REGARDER SI IL Y A UNE COLLISION
            "checkIfCollision": function() {
                if ( snake.isCollision( snake.x, snake.y ) === true ) {
                    game.gameIsStop();
                }
            },

            // SI COLLISION ...
            "isCollision": function( x, y ) {
                if ( x < snake.size / 2 || x > oCanvas.width || y < snake.size / 2 || y > oCanvas.height || snake.section.indexOf( x + "," + y ) >= 0 ) {
                    return true;
                }
            },

            // SCORE + LEVELS + FOODS
            "checkGrowth": function() {
                if ( snake.x === food.x && snake.y === food.y ) {
                    game.score++;
                    if ( game.score % 5 === 0 ) {
                        game.speed = game.speed + 3;
                        game.level++;
                    }
                    food.createFood();
                } else {
                    snake.section.shift();
                }
            }
        };



        // Settings for the food
        food = {
            "size": null,
            "color": "#2ecc71",
            "x": null,
            "y": null,

            "createFood": function() {
                food.size = snake.size;
                food.x = ( Math.ceil( Math.random() * 10 ) * snake.size * 4 ) - snake.size / 2;
                food.y = ( Math.ceil( Math.random() * 10 ) * snake.size * 3 ) - snake.size / 2;
            },

            "drawFood": function() {
                game.drawBox(food.x, food.y, food.size, food.color);
            }

        };

        // Inverser les directions des mouvements
        inverseDirection = {
            "up": "down",
            "left": "right",
            "right": "left",
            "down": "up"
        };

        // Initialiser les touches
        keys = {
            "left": [ 37 ], // Fleche gauche
            "right": [ 39 ], // Fleche droite
            "up": [ 38 ], // Fleche haut
            "down": [ 40 ], // Fleche bas
            "space": [ 32 ] // Barre d'espace
        };

        Object.prototype.getKey = function( value ) {
            for( key in this ) {
                if( this[ key ] instanceof Array && this[ key ].indexOf( value ) >= 0 ) {
                    return key;
                }
            }
            return null;
        };

        addEventListener( "keydown", function( e ) {
            lastKey = keys.getKey( e.keyCode );
            if ( [ "up", "down", "left", "right" ].indexOf( lastKey ) >= 0 && lastKey !== inverseDirection[ snake.snakeDirection ] ) {
                snake.snakeDirection = lastKey;
            } else if ( [ "space" ].indexOf( lastKey ) >= 0 && game.gameIsOver ) {
                game.gameIsStart();
            }
        }, false );


    requestAnimationFrame = window.requestAnimationFrame;

    function loadSettings() {
        if ( game.gameIsOver === false ) {
            game.resetGame();
            game.writeScore();
            game.writeLevel();
            snake.moveSnake();
            food.drawFood();
            snake.drawSnake();
            game.drawMessageGameIsOver();
        } else {
            game.drawMessageGameIsStarted();
        }

        setTimeout( function() {
            requestAnimationFrame( loadSettings );
        }, 1000 / game.speed );

    }

    requestAnimationFrame( loadSettings );


})();
