// List of users, which needs updating from time to time.
const userIds = [
  ["516493086524964866", "__Henry__"],
  ["807995974735364097", "Rohanisya"],
  ["749516708099784824", "Goosebumps"],
  ["326008716484935692", "Friskiest"],
  ["906374386423066684", "LeSinge"],
  ["871595637219659898", "Andrew-Morse"],
  ["700821941724119062", "WoogieGeezer"],
  ["147602825231335425", "CAKE13"],
  ["689663687694221358", "manmaru"],
  ["161114714170982400", "Mrs. Chippy"],
  ["412116606861312001", "AlFritz"],
  ["440226012370960423", "Eristoff 🇫🇷"],
  ["150728328867872768", "zetite"],
  ["751042478408335371", "An average gamer"],
  ["108715289994096640", "Kenryu"],
  ["483856524783910917", "capo_r420"],
  ["513925859694870548", "Manic"],
  ["799065911716741131", "Mia🌻"],
  ["337749548485181441", "titandude21"],
  ["129102832019308544", "Bluekandy"],
  ["172140080855646219", "Note"],
  ["210461076846936065", "Blaxton"],
  ["310846363443134465", "jawthumb"],
  ["361224360893349890", "The Milkman"],
  ["450933963620352010", "BerkutReaper"],
  ["187398415812919296", "Dank Vegetables"],
  ["918598727336345681", "McClary"],
  ["97452249470468096", "Mick"],
  ["320052548557864960", "dishnet34"],
  ["182130393242271744", "MegaMeerkat"],
  ["788325569707245588", "Stink Man"],
  ["920764241886195764", "E-tan"],
  ["276134695870267392", "Lheticus"],
  ["578332642164867073", "carterferris07"],
  ["774417504889733170", "Dream Master"],
  ["600344944070230026", "Ursi"],
  ["901349011095683092", "🐙MistahKush"],
  ["710503007074386062", "🎄Apple🎄"],
  ["525560136811675650", "ChunkyChango"],
  ["904871547704070144", "Orangebird"],
  ["618908576492027914", "Shmumbz"],
  ["480296400408805388", "Mitch"],
];

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
