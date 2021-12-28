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

const defaultCommand = "/game record leaderboard: " + LEADERBOARD_NAME + " result:";

const userIDs = await getUsers(LEADERBOARD_NAME);

// List of users, which needs updating from time to time.
/* function getUserData(leaderboardName) {
  switch (leaderboardName) {
    case "MGSR":
      return [
        ["480296400408805388", "Mitch"],
        ["618908576492027914", "Shmumbz"],
        ["904871547704070144", "Orangebird"],
        ["710503007074386062", "🎄Apple🎄"],
        ["525560136811675650", "ChunkyChango"],
        ["578332642164867073", "carterferris07"],
        ["600344944070230026", "Ursi"],
        ["299764226745171969", "DBSssss"],
        ["343927790078525440", "lteinhorn"],
        ["774417504889733170", "Dream Master"],
        ["276134695870267392", "Lheticus"],
        ["320052548557864960", "dishnet34"],
        ["920764241886195764", "E-tan"],
        ["901349011095683092", "DoctahKush"],
        ["788325569707245588", "Stink Man"],
        ["799065911716741131", "Mia🌻"],
        ["918598727336345681", "McClary"],
        ["519333443218440222", "chexmix"],
        ["149560980081344512", "jrichgames"],
        ["182130393242271744", "MegaMeerkat"],
        ["310846363443134465", "jawthumb"],
        ["97452249470468096", "Mick"],
        ["916695974452277258", "YuckyDucky41"],
        ["187398415812919296", "Dank Vegetables"],
        ["360941986242494464", "DevinHotdog"],
        ["450933963620352010", "BerkutReaper"],
        ["361224360893349890", "The Milkman"],
        ["210461076846936065", "Blaxton"],
        ["172140080855646219", "Note"],
        ["129102832019308544", "Bluekandy"],
        ["337749548485181441", "titandude21"],
        ["513925859694870548", "Manic"],
        ["483856524783910917", "capo_r420"],
        ["108715289994096640", "Kenryu"],
        ["751042478408335371", "An average gamer"],
        ["294481448378040320", "blakingdom"],
        ["150728328867872768", "zetite"],
        ["440226012370960423", "Eristoff"],
        ["147602825231335425", "CAKE13"],
        ["326008716484935692", "Friskiest"],
        ["161114714170982400", "Mrs. Chippy"],
        ["412116606861312001", "AlFritz"],
        ["871595637219659898", "Andrew-Morse"],
        ["689663687694221358", "manmaru"],
        ["906374386423066684", "LeSinge"],
        ["700821941724119062", "WoogieGeezer"],
        ["516493086524964866", "__Henry__"],
        ["807995974735364097", "Rohanisya"],
        ["749516708099784824", "Goosebumps"],
      ];

    case "MGSR 1v1":
      return [
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
        ["689663687694221358", "manmaru"],
      ];

    default:
      return [];
  }
}

const userIds = getUserData(LEADERBOARD_NAME); */

// Sorts the user IDs by a custom function looking at the names
userIds.sort(function (x, y) {
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
userIds.push(["tag this person directly in Discord", "(Unlisted User)"]);

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

  let pairings = getPairings(state);
  let hasEnoughSelections = false;
  let pairList = pairings.map((e) => {
    const p1 = e[0];
    const p2 = e[1];
    if (p1.place != "" && p1.userID != null && p2.place != "" && p2.userID != null) {
      // Only include results in output if it is for a valid pairing
      // Which means, the pairing has a place and user selected

      const commandID = p1.userID + "_" + p2.userID;

      let p1BotPlace = "1";
      let p2BotPlace = "2";
      if (p1.place == p2.place) {
        p2BotPlace = "1";
      }

      hasEnoughSelections = true;
      let resultHeader = document.createElement("div");
      let resultDesc = document.createElement("span");
      resultDesc.style = "font-size: 0.75em; font-weight: bold;";
      resultDesc.innerHTML =
        p1.place +
        getPlaceSuffix(p1.place) +
        " (" +
        p1.userName +
        ")" +
        (p1BotPlace == p2BotPlace ? " ties " : " defeats ") +
        p2.place +
        getPlaceSuffix(p2.place) +
        " (" +
        p2.userName +
        ")";
      let copyButton = document.createElement("button");
      copyButton.setAttribute("onclick", "copyClipboard('" + commandID + "')");
      copyButton.style = "margin-left: 4px;";
      copyButton.innerHTML = "Copy";
      resultHeader.appendChild(resultDesc);
      resultHeader.appendChild(copyButton);
      document.getElementById("MultiResultsArea").appendChild(resultHeader);

      let resultCommand = document.createElement("input");
      resultCommand.setAttribute("id", commandID);
      resultCommand.setAttribute("class", "command");
      //need to add `<@!${ }>` around usernames, for proper command in Discord.
      const matchResultSyntax = ` #${p1BotPlace} <@!${p1.userID}> #${p2BotPlace} <@!${p2.userID}>`;
      resultCommand.value = defaultCommand + matchResultSyntax;
      document.getElementById("MultiResultsArea").appendChild(resultCommand);
    }
  });

  if (!hasEnoughSelections) {
    document.getElementById("MultiResultsArea").innerHTML =
      "Please select at least two placements and participants above";
  }
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
  return userName.replace(/[^\p{L}\p{N}\^$\n]/gu, "").toLowerCase();
}

// Build each pairing to output as a string, then paste into Discord.
let pairings = getPairings(gameState);

function copyClipboard(elementID) {
  var copyText = document.getElementById(elementID);

  /* Select the text inside that element */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);
}

// Function to dynamically get the userlist.
async function getUsers(leaderboardName) {
  let leaderboardID;
  let leaderboardHash;
  let gameId;
  if (leaderboardName == "MGSR") {
    leaderboardID = "812794920158363688";
    leaderboardHash = "bWdzcg==";
    gameId = "mgsr";
  } else if (leaderboardName == "MGSR 1v1") {
    leaderboardID = "670656871434027049";
    leaderboardHash = "bWdzciUyMDF2MQ==";
    gameId = "mgsr 1v1";
  }
  let leaderboard = await fetch("https://teamupdiscord.com/api/api", {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Accept-Language": "en-US,en;q=0.5",
      "Content-Type": "application/json",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
    },
    referrer: `https://teamupdiscord.com/leaderboard/server/${leaderboardID}/game/${leaderboardHash}/versus/1v1`,
    body: `{"guildId":"${leaderboardID}","gameId":"${gameId}","versus":"1v1","action":"players"}`,
    method: "POST",
    mode: "cors",
  });
  var data = await leaderboard.json();
  var userList = data.map((i) => [i.id, i.username]);
  //console.log(userList);
  return userList;
}

/* Function below works on the leaderboard page, not actually this page.
I used it to get the list of users and IDs. It's more of a one-time thing.

async function getUsers() {
  var leaderboard = await fetch("https://teamupdiscord.com/api/api", {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Accept-Language": "en-US,en;q=0.5",
      "Content-Type": "application/json",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
    },
    referrer: "https://teamupdiscord.com/leaderboard/server/812794920158363688/game/bWdzcg==/versus/1v1",
    body: '{"guildId":"812794920158363688","gameId":"mgsr","versus":"1v1","action":"players"}',
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
