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

var errormsg = document.getElementById('error-msg');

var playerContent = document.getElementById('playerContent');
var siteHeader = document.getElementById('siteHeader');
var introContent = document.getElementById('introContent');
var playerFavorites = document.getElementById('player-favorites');

var localFavorites = [];




// on button click with valid NBA player run PlayerID and Giphy functions
var formSubmitHandler = function (event) {
    event.preventDefault();

    var playername = playerNameInputEl.value.trim();


    if (playername) {
        errormsg.textContent = "";
        getPlayerID(playername);
        giphyApi(playername);
        cleartxt();

        playerContent.style.display = "block";
        siteHeader.style.display = "none";
        introContent.style.display = "none";
        playerFavorites.style.display = "block";



    } else {
        cleartxt();
        errormsg.textContent = "Please enter an active player during the 2020 Season, form submit";
    }
}



var getPlayerID = function (name) {

    var apiUrl = "https://www.balldontlie.io/api/v1/players?search=" + name

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {

                response.json().then(function (data) {
                    //console.log(data);
                    if (data.data[0] === undefined) {
                        console.log("basketball player not found");
                        errormsg.textContent = "Please enter an active player during the 2020 Season, get player ID";
                        cleartxt();
                    } else {
                        console.log(data.data[0].id);
                        playerID = data.data[0].id;
                        playerBio(playerID);
                        averageStats(playerID);


                    }


                })
            }
        })
}



var playerBio = function (playerID) {
    var apiUrl = "https://www.balldontlie.io/api/v1/players/" + playerID;
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {

                response.json().then(function (data) {
                    console.log(data);
                    if (data.first_name === undefined) {
                        errormsg.textContent = "Please enter an active player during the 2020 Season. playerBio";
                        cleartxt();
                    } else {

                        playerFullName.textContent = `${data.first_name} ${data.last_name}`;
                        playerTeam.textContent = `${data.team.full_name}`;
                        playerPosition.textContent = `${data.position}`;
                        playerHeight.textContent = `${data.height_feet}ft ` + ` ${data.height_inches}in`;
                    }
                })
            }
        })

}

var averageStats = function (playerID) {

    var apiUrl = "https://www.balldontlie.io/api/v1/season_averages?season=2020&player_ids[]=" + playerID;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {

                response.json().then(function (data) {
                    if (data.data[0] === undefined) {

                        errormsg.textContent = "Please enter an active player during the 2020 Season. AverageStats";
                        cleartxt();
                    } else {


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

                    }
                })
            }
        })
}

var giphyApi = function (name) {

    var apiUrl = 'https://api.giphy.com/v1/gifs/search?q=' + name + '&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=1'

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {

                response.json().then(function (data) {
                    console.log(data);

                    playerGif.innerHTML = '<iframe src="' + `${data.data[0].embed_url}` + '" width="480" height="240" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>';


                })
            }
        })
}

var cleartxt = function () {
    var gifImg = document.getElementById('gif');
    gifImg.innerHTML = '';
    playerFullName.textContent = '';
    playerTeam.textContent = '';
    playerPosition.textContent = '';
    playerHeight.textContent = '';
    playerPoints.textContent = '';
    playerRebounds.textContent = '';
    playerAssists.textContent = '';
    playerSteals.textContent = '';
    playerBlocks.textContent = '';
    playerTO.textContent = '';
    playerFG.textContent = '';
    player3PT.textContent = '';
    playerFT.textContent = '';
}

var saveFavorites = function (event) {
    event.preventDefault();
    var playername = playerFullName.textContent;
    

    var favoriteBtn = document.getElementById('favoriteBtn');

    var buttonCreate = document.createElement('button');

    var buttonSpan = document.createElement('span');

    buttonSpan.innerHTML = "  X"
    buttonSpan.id ="X"+playername;
    buttonSpan.style.color = "red";

    buttonCreate.innerHTML = playername;
    buttonCreate.id = "button" + playername;
    buttonCreate.class = "buttonFav";
    
    var favDataObj = {
        favName: playerFullName.textContent,
        id: "button" + playerFullName.textContent,
        favClass: "buttonFav"

    };
    

    localFavorites.push(favDataObj);
    setFavorites(localFavorites);
    //console.log(localFavorites);
    //console.log(favDataObj);
    buttonCreate.appendChild(buttonSpan);

    favoriteBtn.appendChild(buttonCreate);

    favoriteBtn.addEventListener('click', function (event) {
        if (event.target && event.target.id === 'button' + playername) {
            errormsg.textContent = "";
            getPlayerID(playername);
            giphyApi(playername);
            cleartxt();
        }
    })

    buttonSpan.addEventListener('click', function(event){
        if (event.target && event.target.id === "X"+playername){
            
            buttonCreate.remove();
            
        }
    })
}

var setFavorites = function (data) {
    localStorage.setItem("favoritesObj", JSON.stringify(data));
    
    
}

var loadFavorites = function(data) {
    console.log("loadFavorites is running");
    var savedFavorites = localStorage.getItem("favoritesObj");
    if (!savedFavorites) {
        return false;
      }
      console.log("Saved favorites found!");
      // else, load up saved tasks
    
      savedFavorites = JSON.parse(savedFavorites);
      console.log(savedFavorites);

      var favoriteBtn = document.getElementById('favoriteBtn');

      var savedFavBtn = document.createElement('button');
  
      var savedFavBtnSpan = document.createElement('span');
  
      savedFavBtnSpan.innerHTML = "  X"
      savedFavBtnSpan.id ="X"+savedFavorites[0].favName;
      savedFavBtnSpan.style.color = "red";
  
      savedFavBtn.innerHTML = savedFavorites[0].favName;
      savedFavBtn.id = "button" + savedFavorites[0].favName;
      savedFavBtn.class = "buttonFav";

      savedFavBtn.appendChild(savedFavBtnSpan);

      favoriteBtn.appendChild(savedFavBtn);

      favoriteBtn.addEventListener('click', function (event) {
        if (event.target && event.target.id === 'button' + savedFavorites[0].favName) {
            errormsg.textContent = "";
            playerContent.style.display = "block";
        siteHeader.style.display = "none";
        introContent.style.display = "none";
        playerFavorites.style.display = "block";
            getPlayerID(savedFavorites[0].favName);
            giphyApi(savedFavorites[0].favName);
            cleartxt();
            console.log(savedFavorites[0].favName);
        }
    })

    savedFavBtnSpan.addEventListener('click', function(event){
        if (event.target && event.target.id === "X"+savedFavorites[0].favName){
            
            savedFavBtn.remove();
            
        }
    })

}
playerFormEl.addEventListener("submit", formSubmitHandler);
playerFavorites.addEventListener("click", saveFavorites);

loadFavorites();
