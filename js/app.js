//import stringSimilarity from "string-similarity-js";

//var stringSimilarity = require("string-similarity");

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
    console.log("Local testing.");
    // Makes it possible to test changes locally before pushing to main branch
    /* data = [
      ["12", "FakeUser1"],
      ["34", "FakeUser2"],
      ["56", "FakeUser3"],
      ["78", "FakeUser4"],
      ["90", "FakeUser5"],
    ];*/
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
  // If the name is blank, null, or undefined, return an empty string
  if (userName == null || userName == undefined || userName == "") {
    return "";
  } else {
    return userName.replace(/[^\p{L}\p{N}\^$\n]/gu, "").toLowerCase();
  }
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
  // If URL is localhost or 127.0.0.1, use local leaderboard.
  if (window.location.href.includes("localhost") || window.location.href.includes("127.0.0.1")) {
    return [
      ["12", "FakeUser1"],
      ["34", "FakeUser2"],
      ["56", "FakeUser3"],
      ["78", "FakeUser4"],
      ["90", "FakeUser5"],
    ];
  } else if (leaderboardName == "MGSR") {
    leaderboardID = "812794920158363688";
    leaderboardHash = "bWdzcg==";
    gameId = "mgsr";
    return await fetchLeaderBoard(leaderboardID, gameId);
  } else if (leaderboardName == "MGSR 1v1") {
    leaderboardID = "670656871434027049";
    leaderboardHash = "bWdzciUyMDF2MQ==";
    gameId = "mgsr 1v1";
    return await fetchLeaderBoard(leaderboardID, gameId);
  }
}

async function fetchLeaderBoard(leaderboardID, gameId) {
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
    //referrer: `https://teamupdiscord.com/leaderboard/server/${leaderboardID}/game/${leaderboardHash}/versus/1v1`,
    body: `{"guildId":"${leaderboardID}","gameId":"${gameId}","versus":"1","action":"players"}`,
    method: "POST",
    mode: "cors",
  });
  var data = await leaderboard.json();
  var userList = data.map((i) => [i.id, i.username]);
  //console.log(userList);
  return userList;
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const processChange = debounce((input) => checkInput(input));

// Take the contents of inputCheck element and check each user against the userlist.
async function checkInput(input) {
  // Get the value of the userIds async function.
  let userList = await userIds;
  let { userObjects, userListArray } = formatInput(input, userList);

  /*if (!rawString.includes("#")) {
    throw "Improperly formatted report. All reports should be as follows: #1 @user1 #2 @user2 #3 @user3 ...";
  }*/

  // Check if userObjects is nullish, and if so, throw an error.
  /*
  if (userObjects[1] == (null || undefined || "")) {
    throw "Empty user list. Please add user(s).";
  }*/

  try {
    userObjects.forEach((user) => {
      // If user name does not contain <@> or <@!>, then check the userName field in the userList.
      if (!user.userName.includes("<@") && !user.userName.includes("<@!")) {
        // user = {place: "1", userName: "@Coach"}
        // Now normalize the userName for comparison.
        let normalizedUserName = normalizeNameForComparison(user.userName);
        let matches = stringSimilarity.findBestMatch(normalizedUserName, userListArray[2]);
        // Check if the userList contains the normalized userName.
        if (matches.bestMatch.rating >= 0.7) {
          user.userName = userListArray[1][matches.bestMatchIndex];
          user.userID = userNameToID[user.userName];
          console.log(user.userName + " " + user.userID);
        } else {
          user.userName = "TagMe";
          user.userID = "[New Competitor/Alternate Name]";
        }
      } else {
        // If user name contains <@> or <@!>, then check the userID field in the userList.
        let userID = user.userName.replace(/[^a-zA-Z0-9]/g, "");
        let matches = stringSimilarity.findBestMatch(userID, userListArray[0]);
        if (matches.bestMatch.rating == 1.0) {
          user.userName = userListArray[1][matches.bestMatchIndex];
          user.userID = userListArray[0][matches.bestMatchIndex];
          console.log(user.userName + " " + user.userID);
        } else {
          user.userName = "TagMe";
          user.userID = "[New Competitor/Alternate Name]";
        }
      }
    });
    //console.log(userObjects);
    let matchSize = userObjects.length;
    if (matchSize < 2) {
      return;
    }
    //need to add `<@!${ }>` around usernames, for proper command in Discord.
    let matchResultSyntax = ` #${userObjects[0].place} <@!${userObjects[0].userID}> #${userObjects[1].place} <@!${userObjects[1].userID}>`;
    if (matchSize >= 3) {
      matchResultSyntax = matchResultSyntax + ` #${userObjects[2].place} <@!${userObjects[2].userID}>`;
    }
    if (matchSize == 4) {
      matchResultSyntax = matchResultSyntax + ` #${userObjects[3].place} <@!${userObjects[3].userID}>`;
    }

    document.getElementById("CheckOutput").value = defaultCommand + matchResultSyntax;
  } catch (error) {
    console.error(error);
    // document.getElementById("MultiResultsArea").appendChild(resultCommand);

    /* document.getElementById(
    "CheckOutput"
  ).value = `#${userObjects[0].place} @${userObjects[0].userName} #${userObjects[1].place} @${userObjects[1].userName} #${userObjects[2].place} @${userObjects[2].userName} #${userObjects[3].place} @${userObjects[3].userName}`;
  */
  }
}
function formatInput(input, userList) {
  let rawString = input.value;
  // Take rawString and split it into an array of strings, each string being a user, separated
  // by a # followed by a numeral (e.g. #1 @Coach). User names may have spaces in them, so we need to include those.
  // For example, "@Daisy (Uncertified player)" should NOT be split into ["@Daisy", "(Uncertified player)"],
  // it should remain as one string.
  let userArray = rawString.split(/(#\d+)/);
  // Remove any empty strings from the array.
  userArray = userArray.filter(Boolean);
  // Convert the array into an array of objects with the user's place as the key and the user's name as the value.
  let userObjects = userArray
    .map((user, index) => {
      if (user.includes("#")) {
        return { place: user.substring(1), userName: userArray[index + 1] };
      } else {
        // Do not add an empty string to the array
        return;
      }
    })
    .filter((x) => x !== undefined);
  //console.log(userObjects); // userObjects = [{place: "1", userName: "@Coach"}, {place: "2", userName: "@Daisy (Uncertified Player)}, {place: "2", userName: "@Derty69"}, {place: "4", userName: "@Mrs.Chippy"}]
  // Map all userNames in userList to an array to later compare each user in userObjects against.
  let userListArray = [userList.map((e) => e[0]), userList.map((e) => e[1]), userList.map((e) => e[1].toLowerCase())];
  return { userObjects, userListArray };
}
