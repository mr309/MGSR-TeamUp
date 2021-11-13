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
    resultsBox.innerHTML += " #1 " + document.getElementById("firstplace").value;
  }
  if (button.id == "2nd") {
    resultsBox.innerHTML += " #2 " + document.getElementById("secondplace").value;
  }
  if (button.id == "3rd") {
    resultsBox.innerHTML += " #3 " + document.getElementById("thirdplace").value;
  }
  if (button.id == "4th") {
    resultsBox.innerHTML += " #4 " + document.getElementById("fourthplace").value;
  }
}
