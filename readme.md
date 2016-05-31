# Snake - Par Jimmy Letecheur

## Un projet pour le cours de Multimédia

Pour l'examen de multimédia, notre professeur, Pierre-Antoine Delnatte, nous a demandé de réaliser un mini-jeu en à l'aide des technologies CANVAS/JAVASCRIPT. J'ai tout de suite pensé au jeu « Snake », qui m'a fait rester coller de nombreuses heures sur mon Nokia 3310 de l'époque. *PS : Il fonctionne toujours !*

## Game Design

Le but du mini-jeu est de diriger un serpent dans un espace défini. Le serpent doit attraper des objets afin d'évoluer et de grandir, ce qui fera augmenter le score. Au démarrage du jeu, il y aura un message comme quoi on peu commencer à jouer en appuyant sur la touche `espace`.

Dans le jeu, le serpent se déplacera à l'aide des fleches directionnelles du clavier `haut`, `bas`, `droite`, `gauche`. Dés qu'il attrapera une nourriture, le score montera d'un point et le serpent grandira.

Si le serpent touche l'une des extrémité du canvas, la partie s'arrête et affiche un message du style "Perdu ! Appuyez sur espace pour recommencer". Si le serpent vient « se mordre la queue », la partie s'arrête également.

## Avancement

- [x] Ajouter un message au start
- [x] Dessiner le snake  
- [x] Dessiner la nourriture  
- [x] Gérer les collisions  
- [x] Ajouter un game over
- [x] Ajouter des levels
