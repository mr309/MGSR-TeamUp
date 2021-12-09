/*
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
*/

/* const userIds = [
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
*/

const userIds = [
  [
    "147602825231335425",
    "CAKE13"
  ],
  [
    "749516708099784824",
    "Goosebumps"
  ],
  [
    "326008716484935692",
    "Friskiest"
  ],
  [
    "689663687694221358",
    "manmaru"
  ],
  [
    "161114714170982400",
    "Mrs. Chippy"
  ],
  [
    "906374386423066684",
    "LeSinge"
  ],
  [
    "412116606861312001",
    "AlFritz"
  ],
  [
    "450933963620352010",
    "BerkutReaper"
  ],
  [
    "94882879636504576",
    "Nic_Dizzle"
  ],
  [
    "149560980081344512",
    "jrichgames"
  ],
  [
    "150728328867872768",
    "zetite"
  ],
  [
    "799065911716741131",
    "Mia🌻"
  ],
  [
    "129102832019308544",
    "Bluekandy"
  ],
  [
    "210461076846936065",
    "Blaxton"
  ],
  [
    "172140080855646219",
    "Note"
  ],
  [
    "361224360893349890",
    "The Milkman"
  ],
  [
    "320052548557864960",
    "dishnet34"
  ],
  [
    "97452249470468096",
    "Mick"
  ],
  [
    "480296400408805388",
    "Mitch"
  ],
  [
    "788325569707245588",
    "Stink Man"
  ],
  [
    "578332642164867073",
    "carterferris07"
  ],
  [
    "600344944070230026",
    "Ursi"
  ],
  [
    "710503007074386062",
    "🎄Apple🎄"
  ]
]

// const list = document.querySelector("#players");
const list = document.querySelectorAll("[name='playerlist']");

userIds.forEach((item) => {
  let option = document.createElement("option");
  option.value = item[1];
  option.textContent = item[1];
  option.setAttribute("data-userid", item[0]);
  let option2 = option.cloneNode(true);
  let option3 = option.cloneNode(true);
  let option4 = option.cloneNode(true);
  list[0].appendChild(option);
  list[1].appendChild(option2);
  list[2].appendChild(option3);
  list[3].appendChild(option4);
});

// players.forEach((item) => {
//   let option = document.createElement("option");
//   option.value = item;
//   //list.forEach((e) => {
//   list.appendChild(option);
//   //});
// });

// function results(r1, r2, r3, r4) {
//   console.log(`/game record game: MGSR 1v1 result: #1 ${r1} #2 ${r2}`);
// }

// results(players[0], players[1]);

function AddResult(button) {
  let resultsBox = document.getElementById("results");

  if (button.id == "1st") {
    resultsBox.value += ` #1 <@!${document
      .getElementById("firstplace")
      .selectedOptions[0].getAttribute("data-userid")}>`;
  }
  if (button.id == "2nd") {
    resultsBox.value += ` #2 <@!${document
      .getElementById("secondplace")
      .selectedOptions[0].getAttribute("data-userid")}>`;
  }
  if (button.id == "3rd") {
    resultsBox.value += " #3 " + document.getElementById("thirdplace").selectedOptions[0].getAttribute("data-userid");
  }
  if (button.id == "4th") {
    resultsBox.value += " #4 " + document.getElementById("fourthplace").selectedOptions[0].getAttribute("data-userid");
  }
}

function reset() {
  let fields = document.querySelectorAll("input");
  fields.forEach((e) => (e.value = ""));
  document.getElementById("results").value = "/game record leaderboard: MGSR result:";
}

function copyClipboard() {
  /* Get the text field */
  var copyText = document.getElementById("results");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);

  /* Alert the copied text */
  //alert("Copied the text: " + copyText.value);
}

/* Function below works on the leaderboard page, not actually this page.
I used it to get the list of users and IDs. It's more of a one-time thing.

async function getUsers() {
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
    referrer: "https://teamupdiscord.com/leaderboard/server/812794920158363688/game/bWdzcg==/versus/1v1",
    body: '{"guildId":"812794920158363688","gameId":"mgsr","versus":"1v1","action":"leaderboardGuildGameVersus"}',
    method: "POST",
    mode: "cors",
  })
    .then((response) => response.json())
    .then((data) => [data.leaderboard, data.playerNames]);
  var namesArray = Object.entries(leaderboard[1]);
  var namesList = namesArray.map((u, i) => [namesArray[i][0], namesArray[i][1].username]);
	console.log(namesList)
}
*/

/*
const userIds = [
  [
    "147602825231335425",
    "CAKE13"
  ],
  [
    "749516708099784824",
    "Goosebumps"
  ],
  [
    "326008716484935692",
    "Friskiest"
  ],
  [
    "689663687694221358",
    "manmaru"
  ],
  [
    "161114714170982400",
    "Mrs. Chippy"
  ],
  [
    "906374386423066684",
    "LeSinge"
  ],
  [
    "412116606861312001",
    "AlFritz"
  ],
  [
    "450933963620352010",
    "BerkutReaper"
  ],
  [
    "94882879636504576",
    "Nic_Dizzle"
  ],
  [
    "149560980081344512",
    "jrichgames"
  ],
  [
    "150728328867872768",
    "zetite"
  ],
  [
    "799065911716741131",
    "Mia🌻"
  ],
  [
    "129102832019308544",
    "Bluekandy"
  ],
  [
    "210461076846936065",
    "Blaxton"
  ],
  [
    "172140080855646219",
    "Note"
  ],
  [
    "361224360893349890",
    "The Milkman"
  ],
  [
    "320052548557864960",
    "dishnet34"
  ],
  [
    "97452249470468096",
    "Mick"
  ],
  [
    "480296400408805388",
    "Mitch"
  ],
  [
    "788325569707245588",
    "Stink Man"
  ],
  [
    "578332642164867073",
    "carterferris07"
  ],
  [
    "600344944070230026",
    "Ursi"
  ],
  [
    "710503007074386062",
    "🎄Apple🎄"
  ]
]

*/
