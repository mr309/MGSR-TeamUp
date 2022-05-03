const NICKNAME_LOOKUP = {
  // Dictionary of nicknames in MGSR Server which cannot be easily matched to actual Discord username
  // Use normalized version of names, no punctation, no spaces, all lowercase
  "h": "igonnawrecku",
  "phantompowered": "strangemusic",
  "poolguy": "ironfist68",
  "thatoneguy": "theyosh",
  "drebick": "sdreb3421",
  "mississippichippy": "mrschippy",
  "poolguy": "ironfist68",
  "speed": "speedmcdemon",
  "wooly": "zetite",
  "woolyzetite": "zetite",
  "will": "william",
  "uvwxyz": "fakeuser2",  // Only for testing
};

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
  document.getElementById("inputParser").style.display = "block";
}

// Updates state based on string input copied from Discord.
function updateNewState(userobject) {
  userobject.forEach((e, index) => {
    Object.assign(gameState, {
      [index + 1]: {
        place: e.place,
        userID: e.userID,
        userName: e.userName,
      },
    });
  });
  renderCommands(gameState);
  updateDOMState();
}

// Function to verify that the placements in gameState correspond to the inputs in mainform element.
// Changes the DOM element values to match the gameState values.
function updateDOMState() {
  let mainform = document.getElementById("mainform");
  let placeSelects = mainform.querySelectorAll("[name='place']");
  let playerSelects = mainform.querySelectorAll("input");
  placeSelects.forEach((e, index) => (e.value = gameState[index + 1].place));
  playerSelects.forEach((e, index) => (e.value = gameState[index + 1].userName));
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
  // console.log(pairings);
  let pairList = pairings.map((e) => {
    const p1 = e[0];
    const p2 = e[1];
    if (p1.place != "" && p1.userID != null && p2.place != "" && p2.userID != null) {
      // Only include results in output if it is for a valid pairing
      // Which means, the pairing has a place and user selected

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

      let commandID = "OutputArea";
      ordinalPlaces(p1, p2, matchSize, p3, p4, commandID, "MultiResultsArea");
      //ordinalPlaces(p1, p2, matchSize, p3, p4, "MultiResultsArea");

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

function ordinalPlaces(p1, p2, matchSize, p3, p4, commandID, input) {
  //function ordinalPlaces(p1, p2, matchSize, p3, p4, input) {
  let resultHeader = document.createElement("div");
  resultHeader.setAttribute("id", "ResultsHeader");
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
  document.getElementById(input).appendChild(resultHeader);
}

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

function lookupAlternateUserName(userNickName) {
  if (userNickName in NICKNAME_LOOKUP) {
    return NICKNAME_LOOKUP[userNickName];
  }
  return userNickName;
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
  if (!window.location.href.includes("mr309.github.io")) {
    return [
      ["12", "FakeUser1"],
      ["34", "FakeUser2"],
      ["56", "Fake User3"],
      ["78", "FakeUser 4567"],
      ["90", "Fake User 8)"],
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
        const translatedUserName = lookupAlternateUserName(normalizedUserName);
        let matches = stringSimilarity.findBestMatch(translatedUserName, userListArray[2]);
        // Check if the userList contains the normalized userName.
        if (matches.bestMatch.rating >= 0.7) {
          user.userName = userListArray[1][matches.bestMatchIndex];
          user.userID = userNameToID[user.userName];
          //console.log(user.userName + " " + user.userID);
        } else {
          user.userName = normalizedUserName;
          // user.userID = "TagMe";
        }
      } else {
        // If user name contains <@> or <@!>, then check the userID field in the userList.
        let userID = user.userName.replace(/[^a-zA-Z0-9]/g, "");
        let matches = stringSimilarity.findBestMatch(userID, userListArray[0]);
        if (matches.bestMatch.rating == 1.0) {
          user.userName = userListArray[1][matches.bestMatchIndex];
          user.userID = userListArray[0][matches.bestMatchIndex];
          //console.log(user.userName + " " + user.userID);
        } /* else {
          user.userName = "TagMe";
          user.userID = "[New Competitor/Alternate Name]";
        }*/
      }
    });
    //console.log(userObjects);
    let p1 = userObjects[0];
    let p2 = userObjects[1];
    let p3 = userObjects[2];
    let p4 = userObjects[3];

    updateNewState(userObjects);
    // updateNewState(p2);
    // updateNewState(p3);
    // updateNewState(p4);

    let matchSize = userObjects.length;
    if (matchSize < 2) {
      return;
    }
    //need to add `<@!${ }>` around usernames, for proper command in Discord.
    let matchResultSyntax = ` #${p1.place} <@!${p1.userID}> #${p2.place} <@!${p2.userID}>`;
    if (matchSize >= 3) {
      matchResultSyntax = matchResultSyntax + ` #${p3.place} <@!${p3.userID}>`;
    }
    if (matchSize == 4) {
      matchResultSyntax = matchResultSyntax + ` #${p4.place} <@!${p4.userID}>`;
    }

    // ordinalPlaces(p1, p2, matchSize, p3, p4, commandID, "InputCheck");
    //ordinalPlaces(p1, p2, matchSize, p3, p4, "ResultHeader", "CheckOutput");
    //document.getElementById("CheckOutput").value = defaultCommand + matchResultSyntax;
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
  // Get raw string, replace newlines with spaces
  const rawString = input.value.replace(/[\r\n]+/g, " ");

  // Get each individual space-separated word/phrase
  const rawWords = rawString.split(" ");

  // These two variables are memory buffers to store the place and multiple user name space-separated strings
  // When the next placement string is detected, whatever is here will be dumped into parsedUsers
  let currentPlacement = "0";
  let currentName = [];

  // Holder for placement+name objects
  const parsedUsers = [];

  // Loop through all words, find placements, treat strings afterwards as user name until the next placement number is found
  for (let i = 0; i < rawWords.length; i++) {
    const currentWord = rawWords[i];
    if (currentWord == undefined || currentWord == "") {
      // If there were consecutive spaces, skip this empty string
      continue;
    }

    const placementNumber = getPlacementNumber(currentWord);
    console.log("place" + placementNumber + "; word=" + currentWord);
    if (placementNumber == null) {
      // This word is part of a user name or ID
      currentName.push(currentWord);
    } else {
      // New placement number string detected
      if (currentPlacement != "0") {
        // Dump previous accumulated memory buffer as a user object
        parsedUsers.push({
          place: currentPlacement,
          userName: currentName.join(" "),
        });
      }

      // Reset memory buffers
      currentPlacement = placementNumber;
      currentName = [];
    }
  }

  // Dump final content of memory buffers as a user Object
  parsedUsers.push({
    place: currentPlacement,
    userName: currentName.join(" "),
  });

  //console.log(parsedUsers); // parsedUsers = [{place: "1", userName: "@Coach"}, {place: "2", userName: "@Daisy (Uncertified Player)}, {place: "2", userName: "@Derty69"}, {place: "4", userName: "@Mrs.Chippy"}]

  // Map all userNames in userList to an array to later compare each user in parsedUsers against.
  let userObjects = parsedUsers;
  let userListArray = [
    userList.map((e) => e[0]),
    userList.map((e) => e[1]),
    userList.map((e) => normalizeNameForComparison(e[1].toLowerCase())),
  ];
  return { userObjects, userListArray };
}

function getPlacementNumber(phrase) {
  // Will definitely not have an @ symbol which indicates user name
  if (phrase.includes("@")) {
    return null;
  }

  // Placement indicator will be a short phrase
  if (phrase.length > 4) {
    return null;
  }

  // Placement indicator would have 1,2,3,4 number in it
  let placementNum = null;
  if (phrase.includes("1")) {
    placementNum = "1";
  } else if (phrase.includes("2")) {
    placementNum = "2";
  } else if (phrase.includes("3")) {
    placementNum = "3";
  } else if (phrase.includes("4")) {
    placementNum = "4";
  }

  // If 1/2/3/4 number not found, not a placement string
  if (placementNum == null) {
    return null;
  }

  // No other number should be present in the phrase
  const phraseWithoutPlacement = phrase.replace(placementNum, "p");
  const otherNumbers = phraseWithoutPlacement.match(/(\d)/);
  if (otherNumbers != null) {
    // More than one number indicates it is not a placement string
    // Could be longer number, or part of name
    return null;
  }

  // Seems we have found a placement string, return the non-null number
  return placementNum;
}

// Assign empty strings to each element in the gameState object and update the DOM to reflect the new state
function clearInputs() {
  Object.assign(gameState, {
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
  });
  let inputCheck = document.getElementById("InputCheck");
  inputCheck.value = "";
  processChange(inputCheck);
  updateDOMState();
}
