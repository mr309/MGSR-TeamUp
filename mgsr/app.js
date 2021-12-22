const gameState = {
  1: {
    place: "",
    userID: "",
    userName: "",
  },
  2: {
    place: "",
    userID: "",
    userName: "",
  },
  3: {
    place: "",
    userID: "",
    userName: "",
  },
  4: {
    place: "",
    userID: "",
    userName: "",
  },
};

const defaultCommand = "/game record leaderboard: MGSR result:";

// List of users, which needs updating from time to time.
const userIds = [
    [
      "749516708099784824",
      "Goosebumps"
    ],
    [
      "807995974735364097",
      "Rohanisya"
    ],
    [
      "906374386423066684",
      "LeSinge"
    ],
    [
      "326008716484935692",
      "Friskiest"
    ],
    [
      "147602825231335425",
      "CAKE13"
    ],
    [
      "700821941724119062",
      "WoogieGeezer"
    ],
    [
      "871595637219659898",
      "Andrew-Morse"
    ],
    [
      "161114714170982400",
      "Mrs. Chippy"
    ],
    [
      "412116606861312001",
      "AlFritz"
    ],
    [
      "516493086524964866",
      "__Henry__"
    ],
    [
      "689663687694221358",
      "manmaru"
    ],
    [
      "751042478408335371",
      "An average gamer"
    ],
    [
      "108715289994096640",
      "Kenryu"
    ],
    [
      "483856524783910917",
      "capo_r420"
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
      "172140080855646219",
      "Note"
    ],
    [
      "210461076846936065",
      "Blaxton"
    ],
    [
      "361224360893349890",
      "The Milkman"
    ],
    [
      "450933963620352010",
      "BerkutReaper"
    ],
    [
      "310846363443134465",
      "jawthumb"
    ],
    [
      "774417504889733170",
      "Dream Master"
    ],
    [
      "187398415812919296",
      "Dank Vegetables"
    ],
    [
      "918598727336345681",
      "McClary"
    ],
    [
      "440226012370960423",
      "Eristoff 🇫🇷"
    ],
    [
      "901349011095683092",
      "🐙MistahKush"
    ],
    [
      "97452249470468096",
      "Mick"
    ],
    [
      "320052548557864960",
      "dishnet34"
    ],
    [
      "920764241886195764",
      "E-tan"
    ],
    [
      "788325569707245588",
      "Stink Man"
    ],
    [
      "276134695870267392",
      "Lheticus"
    ],
    [
      "618908576492027914",
      "Shmumbz"
    ],
    [
      "600344944070230026",
      "Ursi"
    ],
    [
      "578332642164867073",
      "carterferris07"
    ],
    [
      "710503007074386062",
      "🎄Apple🎄"
    ],
    [
      "525560136811675650",
      "ChunkyChango"
    ],
    [
      "904871547704070144",
      "Orangebird"
    ],
    [
      "480296400408805388",
      "Mitch"
    ]
  ];

// Sorts the user IDs by a custom function looking at the names
userIds.sort(function(x, y) {
  n1 = normalizeNameForComparison(x[1]);
  n2 = normalizeNameForComparison(y[1]);

  if (n1 > n2) {
    return 1;
  }
  if (n1 < n2) {
    return -1;
  }
  return 0;
});

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

function updateState() {
  // Update global object with selected values
  // let firstPlace = document.getElementById("placement1");
  let places = [
    document.getElementById("placement1"),
    document.getElementById("placement2"),
    document.getElementById("placement3"),
    document.getElementById("placement4"),
  ];
  let userIDs = [
    places[0].nextElementSibling.selectedOptions[0].getAttribute("data-userid"),
    places[1].nextElementSibling.selectedOptions[0].getAttribute("data-userid"),
    places[2].nextElementSibling.selectedOptions[0].getAttribute("data-userid"),
    places[3].nextElementSibling.selectedOptions[0].getAttribute("data-userid"),
  ];
  let userNames = [
    places[0].nextElementSibling.selectedOptions[0].value,
    places[1].nextElementSibling.selectedOptions[0].value,
    places[2].nextElementSibling.selectedOptions[0].value,
    places[3].nextElementSibling.selectedOptions[0].value,
  ];
  Object.assign(gameState, {
    1: {
      place: places[0].value,
      userID: userIDs[0],
      userName: userNames[0],
    },
    2: {
      place: places[1].value,
      userID: userIDs[1],
      userName: userNames[1],
    },
    3: {
      place: places[2].value,
      userID: userIDs[2],
      userName: userNames[2],
    },
    4: {
      place: places[3].value,
      userID: userIDs[3],
      userName: userNames[3],
    },
  });

  renderCommands(gameState);
}

function renderCommands(state) {
  // Need to output the individual commands for each pairing
  // For a 1,2,3,4 match, this would be 6 commands
  // 1: 1v2, 1v3, 1v4; 2: 2v3, 2v4; 3: 3v4
  // For a 1,2,3 (or 1,1,3), it would be 3 commands
  // for a 1,2 (or 1,1), just 1 command

  // First, clear any existing elements produced on a previous click
  document.getElementById("MultiResultsArea").innerHTML = "";

  console.log(JSON.stringify(state));
  let pairings = getPairings(state);
  let hasEnoughSelections = false;
  let pairList = pairings.map((e) => {
    const p1 = e[0];
    const p2 = e[1];
    if (p1.place != '' &&  p1.userID != null && p2.place != '' && p2.userID != null) {
      // Only include results in output if it is for a valid pairing
      // Which means, the pairing has a place and user selected

      let p1BotPlace = "1";
      let p2BotPlace = "2";
      if (p1.place == p2.place) {
        p2BotPlace = "1";
      }

      hasEnoughSelections = true;
      let resultDesc = document.createElement("div");
      resultDesc.style = "font-size: 0.75em; font-weight: bold;";
      resultDesc.innerHTML =
        p1.place
        + getPlaceSuffix(p1.place)
        + " ("
        + p1.userName
        + ")"
        + (p1BotPlace == p2BotPlace ? " ties " : " defeats ")
        + p2.place
        + getPlaceSuffix(p2.place)
        + " ("
        + p2.userName
        + ")"
      ;
      document.getElementById("MultiResultsArea").appendChild(resultDesc);

      let resultCommand = document.createElement("div");
      resultCommand.setAttribute("class", "command");
      //need to add `<@!${ }>` around usernames, for proper command in Discord.
      const matchResultSyntax = ` #${p1BotPlace} <@!${p1.userID}> #${p2BotPlace} <@!${p2.userID}>`;
      resultCommand.innerHTML = defaultCommand + matchResultSyntax;
      document.getElementById("MultiResultsArea").appendChild(resultCommand);
    }
  });

  if (!hasEnoughSelections) {
    document.getElementById("MultiResultsArea").innerHTML = 'Please select at least two placements and participants above';
  }
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

function getPlaceSuffix(placeNumber) {
  if (placeNumber == "1") {
    return "st";
  }
  if (placeNumber == "2") {
    return "nd";
  }
  if (placeNumber == "3") {
    return "rd";
  }
  return "th";
}

function normalizeNameForComparison(userName) {
  // Removes all chars from strings except primary letters and numbers
  // This allows sorting to work with logically with names starting with either emoji or punctuation
  // See this for more: https://stackoverflow.com/questions/10992921/how-to-remove-emoji-code-using-javascript
  return userName.replace(/[^\p{L}\p{N}\^$\n]/gu, '').toLowerCase();
}

// Build each pairing to output as a string, then paste into Discord.
let pairings = getPairings(gameState);

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
