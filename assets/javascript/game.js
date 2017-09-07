 // $(document).ready(function() {

 //             var starWarsGame = {
 //                 gameCharacters: {
 //                     obiwan: {
 //                         name: "Obi-Wan Kenobi",
 //                         picture: "../images/obi-wan.jpg",
 //                         health: 120;
 //                         damage: 8;
 //                     },
 //                     lukeSkywalker: {
 //                         name: "Luke Skywalker",
 //                         picture: "../images/luke-skywalker.jpg",
 //                         health: 100;
 //                         damage: 5;
 //                     },
 //                     darthSidious: {
 //                         name: "Darth Sidious",
 //                         picture: "../images/darth-sidious.jpg",
 //                         health: 150;
 //                         damage: 20;
 //                     },
 //                     darthMaul: {
 //                         name: "Darth Maul",
 //                         picture: "../images/darth-maul.jpg",
 //                         health: 180;
 //                         damage: 25;
 //                     },
 //                   },
 //                     startGame: function() {
 //                         for (var i = 0; i < gameCharacters.length; i++) {

 //                             var charBtn = $("<button>");
 //                             charBtn.addClass("char-background");
 //                             charBtn.attr("char", gameCharacters[i]);
 //                             $("#characters").append(charBtn);
 //                         }
 //                     }
                 
 //             };
 //             starWarsGame.startGame();
 //         };

		var starWarsGame = [
                     {
                         name: "Obi-Wan Kenobi",
                         picture: "assets/images/obi-wan.jpg",
                         health: 120,
                         damage: 8,
                     },
                     {
                         name: "Luke Skywalker",
                         picture: "assets/images/luke-skywalker.jpg",
                         health: 100,
                         damage: 5,
                     },
                     {
                         name: "Darth Sidious",
                         picture: "assets/images/darth-sidious.jpg",
                         health: 150,
                         damage: 20,
                     },
                     {
                         name: "Darth Maul",
                         picture: "assets/images/darth-maul.jpg",
                         health: 180,
                         damage: 25,
                     }
                 ]
   			
 //   $("#characters").html(starWarsGame.lukeSkywalker.name + "<img class='char-background' src='assets/images/luke-skywalker.jpg' height=200 width=100>")
 	for (var i = 0; i < starWarsGame.length; i++) {
 	

 	var charBtn = $("<button>");
 	charBtn.addClass("char-background");
 	charBtn.html(starWarsGame[i].name);
 	charBtn.append("<img class='image' src='" + starWarsGame[i].picture +"'' height=100 width=200>");
 	charBtn.append(starWarsGame[i].health);

 	$("#characters").append(charBtn);
 }