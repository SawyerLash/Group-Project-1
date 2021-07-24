// Declare the DOM elements
var playerNameInputEl = document.querySelector('#playername');
var playerFormEl = document.querySelector('#player-form');

var playerFullName = document.querySelector('#playerFullName');
var playerTeam = document.querySelector('#playerTeam');
var playerPosition = document.querySelector('#playerPosition');
var playerHeight = document.querySelector('#playerHeight');

var playerPoints = document.querySelector('#playerPoints');
var playerRebounds = document.querySelector('#playerRebounds');
var playerAssists = document.querySelector('#playerAssists');
var playerSteals = document.querySelector('#playerSteals');
var playerBlocks = document.querySelector('#playerBlocks');
var playerTO = document.querySelector('#playerTO');
var playerFG = document.querySelector('#playerFG');
var player3PT = document.querySelector('#player3PT');
var playerFT = document.querySelector('#playerFT');

var playerGif = document.querySelector('#gif');



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
                  playerBio(playerID);
                  averageStats(playerID);
                  getGiphy(name);
                //   playerBio(data);
                
                  }
            
                  
              })
          }
      })
}

var playerBio = function(playerName) {

    console.log(playerName);
}

var playerBio = function(playerID) {
    var apiUrl ="https://www.balldontlie.io/api/v1/players/"+playerID;
    fetch(apiUrl)
      .then(function(response) {
          if(response.ok) {
              
              response.json().then(function(data) {
                //console.log(data);
                // display player bio after search
                // playerBio(data);
                // playerFullName.textContent = playerName;
                // alert(`${data.first_name}`);
                playerFullName.textContent = `${data.first_name} ${data.last_name}`;
                playerTeam.textContent = `${data.team.full_name}`;
                playerPosition.textContent = `${data.position}`;
                playerHeight.textContent = `${data.height_feet}ft`;
              })
          }
      })
    // console.log(playerName);
}

var averageStats = function(playerID) {
     
    var apiUrl ="https://www.balldontlie.io/api/v1/season_averages?season=2020&player_ids[]="+playerID;

    fetch(apiUrl)
      .then(function(response) {
          if(response.ok) {
              
              response.json().then(function(data) {
                //console.log(data);
                // display player bio after search
                // playerBio(data);
                // playerFullName.textContent = playerName;
                // alert(`${data.data[0].first_name}`);
                // playerFullName.textContent = `${data.data[0].first_name}+${data.data[0].last_name}`;
                // playerTeam.textContent = `${data.data[0].team.full_name}`;
                // playerPosition.textContent = `${data.data[0].position}`;
                // playerHeight.textContent = `${data.data[0].height_feet}`;
                // getStats(data);
                // display player stats after search
                playerPoints.textContent = `${data.data[0].pts}`;
                playerRebounds.textContent = `${data.data[0].reb}`;
                playerAssists.textContent = `${data.data[0].ast}`;
                playerSteals.textContent = `${data.data[0].stl}`;
                playerBlocks.textContent = `${data.data[0].blk}`;
                playerTO.textContent = `${data.data[0].turnover}`;
                playerFG.textContent = `${data.data[0].fg_pct}`;
                player3PT.textContent = `${data.data[0].fg3_pct}`;
                playerFT.textContent = `${data.data[0].ft_pct}`;
              })
          }
      })
}

// var getStats = function(playerInfo) {
//     console.log(playerInfo);
// }
var giphyApi = function(name) {
     
    var apiUrl ='https://api.giphy.com/v1/gifs/search?q=' +name +'&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=1'
    
    fetch(apiUrl)
      .then(function(response) {
          if(response.ok) {
              
              response.json().then(function(data) {
                  console.log(data);
                    getGiphy(data);
                playerGif.innerHTML = '<iframe src="'+`${data.data[0].embed_url}`+'" width="480" height="240" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>';

                  
              })
          }
      })
}

var getGiphy = function(gifInput) {
    console.log(gifInput);
}

playerFormEl.addEventListener("submit", formSubmitHandler);

