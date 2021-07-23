



// Declare the DOM elements
var playerNameInputEl = document.querySelector('#playername');
var playerFormEl = document.querySelector('#player-form');


// on button click with valid NBA player run PlayerID and Giphy functions
var formSubmitHandler = function(event) {
    event.preventDefault();

    var playername = playerNameInputEl.value.trim();

    if (playername) {
        getPlayerID(playername);
        giphyApi(playername);
    } else {
        console.log("DON'T USE THIS ALERT BUT formSubmitHandler is broken");
        // fix this alert
    }
}

var getPlayerID = function(name) {
     
    var apiUrl ="https://www.balldontlie.io/api/v1/players?search="+name
    
    fetch(apiUrl)
      .then(function(response) {
          if(response.ok) {
              
              response.json().then(function(data) {
                  //console.log(data);
                  if(data.data[0]===undefined){
                      console.log("basketball player not found");
                  }else {
                  console.log(data.data[0].id);
                  playerID=data.data[0].id;
                  averageStats(playerID)
                  playerBio(data);
                  }
            
                  
              })
          }
      })
}

var playerBio = function(playerName) {
    console.log(playerName);
}

var averageStats = function(playerID) {
     
    var apiUrl ="https://www.balldontlie.io/api/v1/season_averages?season=2020&player_ids[]="+playerID;

    fetch(apiUrl)
      .then(function(response) {
          if(response.ok) {
              
              response.json().then(function(data) {
                  //console.log(data);
                   getStats(data);
                  
              })
          }
      })
}

var getStats = function(playerInfo) {
    console.log(playerInfo);
}
var giphyApi = function(name) {
     
    var apiUrl ='https://api.giphy.com/v1/gifs/search?q=' +name +'&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=1'
    
    fetch(apiUrl)
      .then(function(response) {
          if(response.ok) {
              
              response.json().then(function(data) {
                  //console.log(data);
                   getGiphy(data);
                  
              })
          }
      })
}

var getGiphy = function(gifInput) {
    console.log(gifInput);
}

playerFormEl.addEventListener("submit", formSubmitHandler);

