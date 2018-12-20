
      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyDqcvuhOiuZrALI05J-8TtvTsrmH_pZHaw",
        authDomain: "rpshomework-760d0.firebaseapp.com",
        databaseURL: "https://rpshomework-760d0.firebaseio.com",
        projectId: "rpshomework-760d0",
        storageBucket: "rpshomework-760d0.appspot.com",
        messagingSenderId: "221897824049"
      };
      firebase.initializeApp(config);
    
    var database = firebase.database();

    // Creates an array that lists out all of the options (Rock, Paper, or Scissors).
    var buttons = ["Rock", "Paper", "Scissors"];

    // Creating variables to hold the number of wins, losses, and ties. They start at 0.
    var wins = 0;
    var losses = 0;
    var ties = 0;
    var i = 0;
    var ip;
    var turn = 1;
    var round = 1;

    var player = {
      Player: [{
        name: "no-one",
        wins: 0,
        losses: 0,
        ties: 0,
        choice: "",
        ip: "0.0.0.0"
      }, {
        name: "no-one",
        wins: 0,
        losses: 0,
        ties: 0,
        choice: "",
        ip: "0.0.0.0"
      }]
    }

    // This function is run whenever the user presses a key.
    
    database.ref().on("value", function(snapshot) {
    
    //-------Database Code-------//

    function pull() {
    }

    });

    $(document).ready(function() {

    //code for obtaining the IP addresses
    function getIP() {
      $.getJSON('http://www.geoplugin.net/json.gp?ip=xx.xx.xx.xx', function(data) {
        if (i == 2){
        }
        else {
        player.Player[i].ip = data.geoplugin_request;
        }
      });
    }

    //-------Game Code------//

    //Code for populating the choice buttons
    function populateButtons() {
      $("#show-buttons").empty();
      var head = $("<h1>");
      head.text("Choose a button...");
      $("#show-buttons").append(head);
      for (var i = 0; i < buttons.length; i++) {
          var Btns = $("<button>");
          var img = $("<img>");
          img.attr("src","assets/images/"+buttons[i]+".png");
          Btns.addClass("btn btn-lg normal-button");
          Btns.attr("data", buttons[i]);
          Btns.text(buttons[i]);
          $(Btns).append(img);
          $("#show-buttons").append(Btns);
        }
      }
  
    function selectChoice() {
      $(".normal-button").click(function() {
        choice = $(this).attr("data");
        var select = new Audio("assets/sounds/Select.MP3");
        select.play();
        if (turn == 1) {
          player.Player[0].choice = choice;
          database.ref().set({
            choice1 : player.Player[0].choice
          });
          turn++;
        }
        else if (turn == 2){
          player.Player[1].choice = choice;
          database.ref().set({
          choice2 : choice
          });
        gameStuff();
        }
      });
    }
    
    function gameStuff() {
      var player1Guess = player.Player[0].choice;
      var player2Guess = player.Player[1].choice;
        if ((player1Guess === "Rock") && (player2Guess === "Scissors")) {
          player.Player[0].wins++;
          winnings();
        } else if ((player1Guess === "Rock") && (player2Guess === "Paper")) {
          player.Player[1].wins++;
          winnings();
        } else if ((player1Guess === "Scissors") && (player2Guess === "Rock")) {
          player.Player[1].wins++;
          winnings();
        } else if ((player1Guess === "Scissors") && (player2Guess === "Paper")) {
          player.Player[0].wins++;
          winnings();
        } else if ((player1Guess === "Paper") && (player2Guess === "Rock")) {
          player.Player[0].wins++;
          winnings();
        } else if ((player1Guess === "Paper") && (player2Guess === "Scissors")) {
          player.Player[1].wins++;
          winnings();
        } else if (player1Guess === player2Guess) {
          winnings();
        }
      }

    //Code for declaring who won the round/game
    function winnings() {
        if (player.Player[0].wins > player.Player[1].wins){
          $("#show-winning").text(snapshot.val().name + " is winning.");
          round++;
          database.ref().set({
            wins1 : player.Player[0].wins
          })
        } else if (player.Player[1].wins > player.Player[0].wins){
          $("#show-winning").text(player.Player[1].name + " is winning.");
            round++;
            database.ref().set({
              wins2 : player.Player[1].wins
            })
          } else {
          $("#show-winning").text("The game is currently tied");
          }
          score();
          turn--;
        }

    function score() {
      $("#show-score").html("Player 1: " + player.Player[0].wins + 
      "<br>" + "Player 2: " + player.Player[1].wins);
    }

    //code for when the submit button is clicked
    function nameInput() {
    $("#name-button").on("click", function(event) {
        event.preventDefault();
        player.Player[i].name = $("#name-input").val().trim();
        getIP();
        console.log(player.Player[i].ip);
        if (player.Player[i].name == ""){
        alert("Please enter a name...");
        }
        else if (i == 1){ 
        database.ref().set({
          player2 : player.Player[1].name,
          ipaddress2 : player.Player[1].ip
        });
        populateButtons();
        selectChoice();
        score();
        $("#game").empty();
        i++
        }
        else {
        database.ref().set({
          player1 : player.Player[0].name,
          ipaddress: player.Player[0].ip
        });
        $("#namer").text("Player 2, please log in.");
        i++
        }
      });
    }

    nameInput();

    function chatBox(){ 
    chatbox = $("div");
    
    }
  
  });
  