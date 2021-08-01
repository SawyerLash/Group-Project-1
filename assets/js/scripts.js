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

var favoriteBtn = document.getElementById('favoriteBtn');






// on button click with valid NBA player run PlayerID and Giphy functions
var formSubmitHandler = function (event) {
    event.preventDefault();

    var playername = playerNameInputEl.value.trim();

    // if player name isn't blank, clear error messages and display/hide content
    if (playername) {
        errormsg.textContent = "";
        getPlayerID(playername);
        giphyApi(playername);
        cleartxt();

        playerContent.style.display = "block";
        siteHeader.style.display = "none";
        introContent.style.display = "none";
        playerFavorites.style.display = "block";
        errormsg.style.display = "none";



    } else {
        //if search is blank. Clear all gifs/text and display error message
        cleartxt();
        errormsg.style.display = "block";
        errormsg.textContent = "Please enter an active player during the 2020 Season.";
    }
}



var getPlayerID = function (name) {

    var apiUrl = "https://www.balldontlie.io/api/v1/players?search=" + name
    //gets the player info based off of user input
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {

                response.json().then(function (data) {
                    //console.log(data);
                    if (data.data[0] === undefined) {
                        //if the player does not exist or did not play in the 2020 season return error message and clear text
                        console.log("basketball player not found");
                        errormsg.textContent = "Please enter an active player during the 2020 Season.";
                        errormsg.style.display = "block";
                        cleartxt();
                    } else {
                        //if entry is good, get the player ID and run player Bio and average Stats
                        console.log(data.data[0].id);
                        playerID = data.data[0].id;
                        playerBio(playerID);
                        averageStats(playerID);


                    }


                })
            }
        })
}


// gets player Bio data
var playerBio = function (playerID) {
    var apiUrl = "https://www.balldontlie.io/api/v1/players/" + playerID;
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {

                response.json().then(function (data) {
                    console.log(data);
                    if (data.first_name === undefined) {
                        errormsg.textContent = "Please enter an active player during the 2020 Season.";
                        errormsg.style.display = "block";
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
// gets average stats 
var averageStats = function (playerID) {

    var apiUrl = "https://www.balldontlie.io/api/v1/season_averages?season=2020&player_ids[]=" + playerID;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {

                response.json().then(function (data) {
                    if (data.data[0] === undefined) {

                        errormsg.textContent = "Please enter an active player during the 2020 Season.";
                        errormsg.style.display = "block";
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
// gets a giph that matches the search input and displays it in the player Bio. 
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
// clears all text input and giphs
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
// create favorites button


var saveFavorites = function(event) {
    event.preventDefault();
    
    localStorage.clear();
    localFavorites = [];
    
    favoriteBtn.style.display = "block";
    
    var favDataObj = {
        favName: playerFullName.textContent,

    };

    
    localFavorites.push(favDataObj);

    if (localFavorites[1]) {
        errormsg.textContent = "Please remove current favorite player before adding a new one";
        errormsg.style.display = "block";
    }else{

        
    setFavorites(localFavorites);
    loadFavorites2();
}}


// takes data from array and sets it in local storage
var setFavorites = function (data) {
    localStorage.setItem("favoritesObj", JSON.stringify(data));
    console.log(data);
    console.log(JSON.stringify(data));


}
// loads local storage buttons for favorite player
var loadFavorites2 = function(data) {
    
    var savedFavorites = localStorage.getItem("favoritesObj");
    // if there is nothing in local storage set the button to not display and return out of the function
    if (!savedFavorites) {
        favoriteBtn.style.display = "none";
        return false;
    }
    // If local storage is present. load a button on the home screan for favorite player

    savedFavorites = JSON.parse(savedFavorites);
    console.log(savedFavorites);


    

    var favoriteBtnSpan = document.createElement('span');

    favoriteBtnSpan.innerHTML = "  X"
    favoriteBtnSpan.id = "X" + savedFavorites[0].favName;
    favoriteBtnSpan.style.color = "red";

    favoriteBtn.innerHTML = savedFavorites[0].favName;
    favoriteBtn.id = "button" + savedFavorites[0].favName;
    
    favoriteBtn.appendChild(favoriteBtnSpan);

    
   
    // allows you to search your favorite player by clicking button 
    favoriteBtn.addEventListener('click', function (event) {
        if (event.target && event.target.id === 'button' + savedFavorites[0].favName) {
            errormsg.textContent = "";
            errormsg.style.display = "none";
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
    // Sets display of button to none and clears local storage
    favoriteBtnSpan.addEventListener('click', function (event) {
        if (event.target && event.target.id === "X" + savedFavorites[0].favName) {

            favoriteBtn.style.display = "none";
            localStorage.clear();

        }
    })

}


playerFormEl.addEventListener("submit", formSubmitHandler);
playerFavorites.addEventListener("click", saveFavorites); //used to be saveFavorites

loadFavorites2();

