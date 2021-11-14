const players = [
  "@mr309#3290",
  "@__Henry__#9095",
  "@Andrew-Morse#8509",
  "@Master Bates#4935",
  "@Goosebumps#8209",
  "@igonnawrecku#1386",
  "@InvinciBeard#3473",
  "@leftytehllama#8951",
  "@Me, Ed#3697",
  "@Michael722#2048",
  "@PatsWhatImTalkinAbout#2731",
  "@strangemusic#5017",
  "@Rabbit#5852",
  "@Splash#0972",
  "@The Mario Odyssey#6494",
  "@🐙MistahKush#5119",
  "@jrichgames#5710",
  "@zetite#0422",
  "@WoogieGeezer#9537",
  "@Hamm#1714",
];

const userIds = [
  ["178739102101929984", "Master Bates"],
  ["516493086524964866", "__Henry__"],
  ["749516708099784824", "DR"],
  ["488098500765024263", "Me, Ed"],
  ["142797219341402112", "Rabbit"],
  ["230873770053730315", "leftytehllama"],
  ["759971547141242933", "Michael722"],
  ["871595637219659898", "Andrew-Morse"],
  ["641510334515118082", "PatsWhatImTalkinAbout"],
  ["130515887403958272", "Hamm"],
  ["149560980081344512", "jrichgames"],
  ["451829170092376067", "igonnawrecku"],
  ["187245277076389888", "strangemusic"],
  ["161114714170982400", "mr309"],
  ["700821941724119062", "WoogieGeezer"],
  ["150728328867872768", "zetite"],
  ["268964485555945473", "Splash"],
  ["901349011095683092", "🐙MistahKush"],
  ["700822583351705640", "The Mario Odyssey"],
];

const list = document.querySelector("#players");

//players.forEach((item) => {
//  let option = document.createElement("option");
//  option.value = item;
//  list.appendChild(option);
//});

//Trying to create a datalist for each match placement.
//Struggling to get each input to populate correctly.

players.forEach((item) => {
  let option = document.createElement("option");
  option.value = item;
  //list.forEach((e) => {
  list.appendChild(option);
  //});
});

// function results(r1, r2, r3, r4) {
//   console.log(`/game record game: MGSR 1v1 result: #1 ${r1} #2 ${r2}`);
// }

// results(players[0], players[1]);

function AddResult(button) {
  let resultsBox = document.getElementById("results");

  if (button.id == "1st") {
    resultsBox.value += " #1 " + document.getElementById("firstplace").value;
  }
  if (button.id == "2nd") {
    resultsBox.value += " #2 " + document.getElementById("secondplace").value;
  }
  if (button.id == "3rd") {
    resultsBox.value += " #3 " + document.getElementById("thirdplace").value;
  }
  if (button.id == "4th") {
    resultsBox.value += " #4 " + document.getElementById("fourthplace").value;
  }
}

function reset() {
  let fields = document.querySelectorAll("input");
  fields.forEach((e) => (e.value = ""));
  document.getElementById("results").value = "/game record game: MGSR 1v1 test result:";
}

//works on the leaderboard page, not actually this page.
function getUsers() {
  var leaderboard = await fetch("https://teamupdiscord.com/api/api", {
    credentials: "include",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0",
      Accept: "application/json",
      "Accept-Language": "en-US,en;q=0.5",
      "Content-Type": "application/json",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
    },
    referrer: "https://teamupdiscord.com/leaderboard/server/670656871434027049/game/bWdzciUyMDF2MQ==/versus/1v1",
    body: '{"guildId":"670656871434027049","gameId":"mgsr 1v1","versus":"1v1","action":"leaderboardGuildGameVersus"}',
    method: "POST",
    mode: "cors",
  })
    .then((response) => response.json())
    .then((data) => [data.leaderboard, data.playerNames]);
  var namesArray = Object.entries(leaderboard[1]);
  namesArray.map((u, i) => [namesArray[i][0], namesArray[i][1].username]);
}
