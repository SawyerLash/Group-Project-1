

// test api for ballDontlie
var name = "Chris Paul";
var splitname = name.split(" ");
var firstname = splitname[0];
var lastname = splitname[1];



var getPlayerID = function() {
     
    var apiUrl ="https://www.balldontlie.io/api/v1/players?search="+name
    // "https://www.balldontlie.io/api/v1/players?search=Chris Paul"
    fetch(apiUrl)
      .then(function(response) {
          if(response.ok) {
              
              response.json().then(function(data) {
                  console.log(data);
                  console.log(data.data[0].id);
                  playerID=data.data[0].id;
                  averageStats(playerID)
            
                  
              })
          }
      })
}

var averageStats = function(playerID) {
     
    var apiUrl ="https://www.balldontlie.io/api/v1/season_averages?season=2020&player_ids[]="+playerID;

    fetch(apiUrl)
      .then(function(response) {
          if(response.ok) {
              
              response.json().then(function(data) {
                  console.log(data);
                  
              })
          }
      })
}

var giphyApi = function() {
     
    var apiUrl ='https://api.giphy.com/v1/gifs/search?q=' +name +'&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=1'
    // https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=Lebron%20James
    // https://api.giphy.com/v1/gifs/search?q='+searchTerm+ '&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FNlimit=1
    fetch(apiUrl)
      .then(function(response) {
          if(response.ok) {
              
              response.json().then(function(data) {
                  console.log(data);
                  
              })
          }
      })
}

getPlayerID();
giphyApi();


