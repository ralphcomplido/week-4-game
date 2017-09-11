 $(document).ready(function() {

var sword = new Audio('assets/audio/lightsaber.mp3');
var noEnemy = new Audio('assets/audio/no-enemy.mp3');
var backgroundMusic = new Audio('assets/audio/starwars-music.mp3');
var lost = new Audio('assets/audio/you-lose.mp3');
var victory = new Audio('assets/audio/victory.mp3')

     var starWarsGame = {
         'Obi-Wan Kenobi': {
             name: "Obi-Wan Kenobi",
             picture: "assets/images/obi-wan.jpg",
             health: 120,
             damage: 8,
             counter: 20
         },
         'Luke Skywalker': {
             name: "Luke Skywalker",
             picture: "assets/images/luke-skywalker.jpg",
             health: 100,
             damage: 5,
             counter: 15
         },
         'Darth Sidious': {
             name: "Darth Sidious",
             picture: "assets/images/darth-sidious.jpg",
             health: 150,
             damage: 20,
             counter: 25
         },
         'Darth Maul': {
             name: "Darth Maul",
             picture: "assets/images/darth-maul.jpg",
             health: 180,
             damage: 25,
             counter: 30
         }
     };
     var combatants = [];
     var currSelectedCharacter;
     var currDefender;
     var turnCounter = 1;
     var killCount = 0;

     backgroundMusic.play();
     // make character
     var makeCharacter = function(character, charPosition, makeChar) {
         // make button, show name, image, health 
         var charBtn = $("<button class='character char-background' data-name='" + character.name + "'>");
         var charName = $("<div class='character-name'>").text(character.name);
         var charImage = $("<img alt='image' class='character-image' height=80 width=150>").attr("src", character.picture);
         var charHealth = $("<div class='character-health'>").text(character.health);
         charBtn.append(charName).append(charImage).append(charHealth);
         $(charPosition).append(charBtn);

         // assign class if according to user option
         if (makeChar == 'enemy') {
             $(charBtn).addClass('enemy');
         } else if (makeChar == 'defender') {
             currDefender = character;
             $(charBtn).addClass('target-enemy');
         }
     };

     var showMessage = function(message) {
         var gameMesageSet = $("#game-message");
         var newMessage = $("<div>").text(message);
         gameMesageSet.append(newMessage);

         if (message == 'clearMessage') {
             gameMesageSet.text('');
         }
     };

     var showCharacters = function(charObj, charSection) {
         //show all characters
         if (charSection == '#characters') {
             $(charSection).empty();
             for (var key in charObj) {
                 if (charObj.hasOwnProperty(key)) {
                     makeCharacter(charObj[key], charSection, '');
                 }
             }
         }
         if (charSection == '#your-character') {
             makeCharacter(charObj, charSection, '');
             $('#attack-button').css('visibility', 'visible');
         }

         if (charSection == '#enemies') {

             for (var i = 0; i < charObj.length; i++) {

                 makeCharacter(charObj[i], charSection, 'enemy');
             }
             //render one enemy to defender area
             $(document).on('click', '.enemy', function() {
                 //select an combatant to fight
                 name = ($(this).data('name'));
                 //if defernder area is empty
                 if ($('#defender').children().length === 0) {
                     showCharacters(name, '#defender');
                     $(this).hide();
                     $("#game-message").empty();
                     showMessage("Your Enemy is " + currDefender.name + "!");

                 }
             });
         }

         if (charSection == '#defender') {
             $(charSection).empty();
             for (var i = 0; i < combatants.length; i++) {
                 //add enemy to defender area
                 if (combatants[i].name == charObj) {
                     makeCharacter(combatants[i], charSection, 'defender');
                 }
             }
         }

         if (charSection == 'playerDamage') {
             $('#defender').empty();
             makeCharacter(charObj, '#defender', 'defender');
         }

         if (charSection == 'enemyDamage') {
             $('#your-character').empty();
             makeCharacter(charObj, '#your-character', '');
         }

         if (charSection == 'enemyDefeated') {
             $('#defender').empty();

         }
     };
     showCharacters(starWarsGame, '#characters');
     //render player character


     $(document).on('click', '.character', function() {
         name = $(this).data('name');
         //if no player char has been selected
         if (!currSelectedCharacter) {
             currSelectedCharacter = starWarsGame[name];
             console.log(currSelectedCharacter);
             for (var key in starWarsGame) {
                 if (key != name) {
                     combatants.push(starWarsGame[key]);
                 }
             }
             $("#characters").hide();
             showCharacters(currSelectedCharacter, '#your-character');
             //this is to render all characters for user to choose fight against
             showCharacters(combatants, '#enemies');
             $("#game-message").empty();
             showMessage("You Chose " + currSelectedCharacter.name + "!");
         }
     });

     $("#attack-button").on("click", function() {

         if ($('#defender').children().length !== 0) {
            sword.play();
             var attackMessage = "You attacked " + currDefender.name + " for " + (currSelectedCharacter.damage * turnCounter) + " damage.";
             currDefender.health = currDefender.health - (currSelectedCharacter.damage * turnCounter);

             turnCounter++;

             if (currDefender.health > 0) {
                 //enemy not dead keep playing
                 showCharacters(currDefender, 'playerDamage');
                 var counterAttackMessage = currDefender.name + " attacked you back for " + currDefender.counter + " damage.";
                 currSelectedCharacter.health = currSelectedCharacter.health - currDefender.counter;

                 showCharacters(currSelectedCharacter, 'enemyDamage');
                 $("#game-message").empty();
                 showMessage(attackMessage);
                 showMessage(counterAttackMessage);


                 if (currSelectedCharacter.health <= 0) {
                     currSelectedCharacter.health = 0;
                     $("#game-message").empty();
                     showMessage("You lose Young Padawan! Train Harder and Play Again!");
                     showCharacters(currSelectedCharacter, 'enemyDamage');
                     restartGame();
                     lost.play();
                     backgroundMusic.pause();
                     $("#attack-button").unbind("click");
                 }


             } else {
                 showCharacters(currDefender, 'enemyDefeated');
                 $("#game-message").empty();
                 showMessage("You Defeated " + currDefender.name + "! Choose Another Enemy.");
                 killCount++;

                 if (killCount >= 3) {
                     $("#game-message").empty();
                     showMessage("You are Victorious Master Jedi! Play Again!");
                     backgroundMusic.pause();
                     victory.play();
                     $("#attack-button").unbind("click");
                     restartGame();
                 }
             }

         } else {
            $("#game-message").empty();
            noEnemy.play();
            showMessage("No Enemy here.");
        }
     });

     var restartGame = function() {
         // restart button will appear if the player win or lose
         var restart = $('<button class="btn">Restart</button>').click(function() {
             location.reload();
         });
         $("#restart").append(restart);
     };
 });