/*
 * Created by Jimmy Letecheur on 26/05/16.
 */


(function() {
    "use strict";

        var oCanvas = document.getElementById( "game" ),
            oContext = oCanvas.getContext( "2d" );

        // Settings for the game
        var game = {

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

            "resetGame": function() {
                oContext.clearRect( 0, 0, oCanvas.width, oCanvas.height );
            }

        };

        // Settings for the Snake
        var snake = {};

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