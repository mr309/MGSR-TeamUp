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

let userNameToID = {};
const userIds = (async () => {
  let data = [];
  try {
    data = await getUsers(LEADERBOARD_NAME);
  } catch (ex) {
    // Simulate network loading time, .75 seconds
    await new Promise((sleep) => setTimeout(sleep, 750));

    // Makes it possible to test changes locally before pushing to main branch
    data = [
      ["12", "FakeUser1"],
      ["34", "FakeUser2"],
      ["56", "FakeUser3"],
      ["78", "FakeUser4"],
      ["90", "FakeUser5"],
    ];
  }
  UserSort(data);
  data.forEach((dataItem) => {
    userNameToID[dataItem[1]] = dataItem[0];
  });
  BuildHtmlLists(data);
  return data;
})();

// Sorts the user IDs by a custom function looking at the names
function UserSort(userIdData) {
  userIdData.sort((x, y) => {
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
  userIdData = userIdData.unshift(["TagMe", "[New Competitor]"]);
}

const searchableList = document.getElementById("searchableUsers");

function BuildHtmlLists(userIdData) {
  userIdData.forEach((item) => {
    let option = document.createElement("option");
    option.value = item[1];
    option.textContent = item[1];
    option.setAttribute("data-userid", item[0]);

    searchableList.appendChild(option);
  });

  document.getElementById("usersNotYetLoaded").style.display = "none";
  document.getElementById("usersLoaded").style.display = "block";
}

function updateState() {
  // Update global object with selected values
  let places = [
    document.getElementById("placement1"),
    document.getElementById("placement2"),
    document.getElementById("placement3"),
    document.getElementById("placement4"),
  ];
  let userNames = [
    places[0].nextElementSibling.value,
    places[1].nextElementSibling.value,
    places[2].nextElementSibling.value,
    places[3].nextElementSibling.value,
  ];
  let userIDs = [
    userNameToID[userNames[0]],
    userNameToID[userNames[1]],
    userNameToID[userNames[2]],
    userNameToID[userNames[3]],
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
  // Used to have to output the individual commands for each pairing
  // For a 1,2,3,4 match, this would be 6 commands
  // 1: 1v2, 1v3, 1v4; 2: 2v3, 2v4; 3: 3v4
  // For a 1,2,3 (or 1,1,3), it would be 3 commands
  // for a 1,2 (or 1,1), just 1 command
  // No longer necessary with 1/20/22 TeamUp Update

  // First, clear any existing elements produced on a previous click
  document.getElementById("MultiResultsArea").innerHTML = "";

  let pairings = getPairings(state);
  let hasEnoughSelections = false;
  console.log(pairings);
  let pairList = pairings.map((e) => {
    const p1 = e[0];
    const p2 = e[1];
    if (p1.place != "" && p1.userID != null && p2.place != "" && p2.userID != null) {
      // Only include results in output if it is for a valid pairing
      // Which means, the pairing has a place and user selected

      const commandID = p1.userID + "_" + p2.userID;

      /*let p1BotPlace = "1";
      let p2BotPlace = "2";
      let p3BotPlace = "3";
      let p4BotPlace = "4";

      if (p1.place == p2.place) {
        p2BotPlace = "1";
      }*/

      hasEnoughSelections = true;

      let matchSize = 2;
      const p3 = e[2];
      if (p3.place != "" && p3.userID != null) {
        matchSize = 3;
      }

      const p4 = e[3];
      if (p4.place != "" && p4.userID != null) {
        matchSize = 4;
      }

      let resultHeader = document.createElement("div");
      let resultDesc = document.createElement("span");
      resultDesc.style = "font-size: 0.75em; font-weight: bold;";
      const resultSummaryParts = [];
      resultSummaryParts.push(p1.place + getPlaceSuffix(p1.place) + " (" + p1.userName + ")");
      resultSummaryParts.push(p2.place + getPlaceSuffix(p2.place) + " (" + p2.userName + ")");
      if (matchSize >= 3) {
        resultSummaryParts.push(p3.place + getPlaceSuffix(p3.place) + " (" + p3.userName + ")");
      }
      if (matchSize == 4) {
        resultSummaryParts.push(p4.place + getPlaceSuffix(p4.place) + " (" + p4.userName + ")");
      }
      resultDesc.innerHTML = resultSummaryParts.join(", ");

      let copyButton = document.createElement("button");
      copyButton.setAttribute("onclick", "copyClipboard('" + commandID + "')");
      copyButton.style = "margin-right: 4px;";
      copyButton.innerHTML = "Copy";
      resultHeader.appendChild(copyButton);
      resultHeader.appendChild(resultDesc);
      document.getElementById("MultiResultsArea").appendChild(resultHeader);

      let resultCommand = document.createElement("input");
      resultCommand.setAttribute("id", commandID);
      resultCommand.setAttribute("class", "command");

      //need to add `<@!${ }>` around usernames, for proper command in Discord.
      let matchResultSyntax = ` #${p1.place} <@!${p1.userID}> #${p2.place} <@!${p2.userID}>`;
      if (matchSize >= 3) {
        matchResultSyntax = matchResultSyntax + ` #${p3.place} <@!${p3.userID}>`;
      }
      if (matchSize == 4) {
        matchResultSyntax = matchResultSyntax + ` #${p4.place} <@!${p4.userID}>`;
      }

      resultCommand.value = defaultCommand + matchResultSyntax;
      document.getElementById("MultiResultsArea").appendChild(resultCommand);
    }
  });

  if (!hasEnoughSelections) {
    document.getElementById("MultiResultsArea").innerHTML =
      "Please select at least two placements and participants above";
  }
}

// Obsolete after 1/20/22 TeamUp Update. No longer need pairings.
// Just need to do simple '#1 ... #2 ... #3 ... #4 ... command'
/* function getPairings(o) {
  return [
    [o[1], o[2]],
    [o[1], o[3]],
    [o[1], o[4]],
    [o[2], o[3]],
    [o[2], o[4]],
    [o[3], o[4]],
  ];
}
*/

function getPairings(o) {
  return [[o[1], o[2], o[3], o[4]]];
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
    referrer: `https://teamupdiscord.com/leaderboard/server/${leaderboardID}/game/${leaderboardHash}/versus/1`,
    body: `{"guildId":"${leaderboardID}","gameId":"${gameId}","versus":"1v1","action":"players"}`,
    method: "POST",
    mode: "cors",
  });
  var data = await leaderboard.json();
  var userList = data.map((i) => [i.id, i.username]);
  //console.log(userList);
  return userList;
}
