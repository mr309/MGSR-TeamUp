
// List of users, which needs updating from time to time.
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
// }

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
