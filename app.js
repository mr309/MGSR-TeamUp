const gameState = {
  1: {
    place: "",
    user: "",
  },
  2: {
    place: "",
    user: "",
  },
  3: {
    place: "",
    user: "",
  },
  4: {
    place: "",
    user: "",
  },
};

const defaultCommand = "/game record leaderboard: MGSR 1v1 result:";

// List of users, which needs updating from time to time.
const userIds = [
  ["749516708099784824", "Goosebumps"],
  ["906374386423066684", "LeSinge"],
  ["807995974735364097", "Rohanisya"],
  ["326008716484935692", "Friskiest"],
  ["689663687694221358", "manmaru"],
  ["147602825231335425", "CAKE13"],
  ["161114714170982400", "Mrs. Chippy"],
  ["412116606861312001", "AlFritz"],
  ["700821941724119062", "WoogieGeezer"],
  ["187398415812919296", "Dank Vegetables"],
  ["483856524783910917", "capo_r420"],
  ["799065911716741131", "Mia🌻"],
  ["129102832019308544", "Bluekandy"],
  ["210461076846936065", "Blaxton"],
  ["172140080855646219", "Note"],
  ["361224360893349890", "The Milkman"],
  ["450933963620352010", "BerkutReaper"],
  ["310846363443134465", "jawthumb"],
  ["918598727336345681", "McClary"],
  ["97452249470468096", "Mick"],
  ["320052548557864960", "dishnet34"],
  ["516493086524964866", "__Henry__"],
  ["618908576492027914", "Shmumbz"],
  ["788325569707245588", "Stink Man"],
  ["774417504889733170", "Dream Master"],
  ["276134695870267392", "Lheticus"],
  ["600344944070230026", "Ursi"],
  ["578332642164867073", "carterferris07"],
  ["710503007074386062", "🎄Apple🎄"],
  ["904871547704070144", "Orangebird"],
  ["480296400408805388", "Mitch"],
];

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

function updateState() {
  // Update global object with selected values
  // let firstPlace = document.getElementById("placement1");
  let places = [
    document.getElementById("placement1"),
    document.getElementById("placement2"),
    document.getElementById("placement3"),
    document.getElementById("placement4"),
  ];
  let users = [
    places[0].nextElementSibling.selectedOptions[0].getAttribute("data-userid"),
    places[1].nextElementSibling.selectedOptions[0].getAttribute("data-userid"),
    places[2].nextElementSibling.selectedOptions[0].getAttribute("data-userid"),
    places[3].nextElementSibling.selectedOptions[0].getAttribute("data-userid"),
  ];
  Object.assign(gameState, {
    1: {
      place: places[0].value,
      user: users[0],
    },
    2: {
      place: places[1].value,
      user: users[1],
    },
    3: {
      place: places[2].value,
      user: users[2],
    },
    4: {
      place: places[3].value,
      user: users[3],
    },
  });
  //need to add `<@!${ }>` around usernames, for proper command in Discord.
}

function ffaOutput(o) {
  // Need to output the individual commands for each pairing
  // For a 1,2,3,4 match, this would be 6 commands
  // 1: 1v2, 1v3, 1v4; 2: 2v3, 2v4; 3: 3v4
  // For a 1,2,3 (or 1,1,3), it would be 3 commands
  // for a 1,2 (or 1,1), just 1 command
  // Have to test for ties
  let pairings = getPairings(o);
  // let input = document.getElementById("results2");
  let pairList = pairings.map((e) => {
    // `${defaultCommand} #${e[0].place} <@!${e[0].user}> #${e[1].place} <@!${e[1].user}>`;
    let f = document.createElement("input");
    f.type = "text";
    //f.style = "display: block; width: 32rem; margin: .2em";
    f.setAttribute("class", "result");
    f.value = `${defaultCommand} #${e[0].place} <@!${e[0].user}> #${e[1].place} <@!${e[1].user}>`;
    document.getElementById("ResultsArea").appendChild(f);
  });
  //Trying to outut 6 different possible games for a FFA game
  console.log(pairList);
  pairList.forEach(
    (e) => {
      console.log(e);
    }
    /* if (e[0].place == e[1].place) {
      f.value = `${defaultCommand} #1 <@!${e[0].user}> #1 <@!${e[1].user}>`;
      document.getElementById("ResultsArea").appendChild(f);
    } else {
      f.value = `${defaultCommand} #1 <@!${e[0].user}> #2 <@!${e[1].user}>`;
      document.getElementById("ResultsArea").appendChild(f);
    } */
  );
}

function checkForTies() {
  let myData = Object.keys(gameState).map((key) => gameState[key]);
  0;
  let uniqueValues = new Set(myData.map((v) => v.place));

  if (uniqueValues.size < myData.length) {
    console.log("duplicates found");
  }
  console.log(myData);
  console.log(uniqueValues);
}

function getPairings(o) {
  return [
    [o[1], o[2]],
    [o[1], o[3]],
    [o[1], o[4]],
    [o[2], o[3]],
    [o[2], o[4]],
    [o[3], o[4]],
  ];
}

// Build each pairing to output as a string, then paste into Discord.
let pairings = getPairings(gameState);

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
