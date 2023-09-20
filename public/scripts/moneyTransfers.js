// alert("moneyTransfers works");

//listener for move A to B, function ledgerInput

// initial vars of the game

// let gameName;
let timeStamp;

const actualiseDateTime = () => {
	// let dayOfWeekName;
	let date = new Date();

	// let [month, day, year, hours, minutes, dayOfWeek, seconds] = [
	// 	date.getMonth() + 1,
	// 	date.getDate(),
	// 	date.getFullYear(),
	// 	date.getHours(),
	// 	date.getMinutes(),
	// 	date.getDay(),
	// 	date.getSeconds(),
	// ];

	// const whatDayOfWeek = () => {
	// 	switch (dayOfWeek) {
	// 		case 0:
	// 			dayOfWeekName = "Sunday";
	// 			break;
	// 		case 1:
	// 			dayOfWeekName = "Monday";
	// 			break;
	// 		case 2:
	// 			dayOfWeekName = "Tuesday";
	// 			break;
	// 		case 3:
	// 			dayOfWeekName = "Wednesday";
	// 			break;
	// 		case 4:
	// 			dayOfWeekName = "Thursday";
	// 			break;
	// 		case 5:
	// 			dayOfWeekName = "Friday";
	// 			break;
	// 		case 6:
	// 			dayOfWeekName = "Saturday";
	// 			break;
	// 		default:
	// 			console.log("It's broken man!");
	// 			break;
	// 	}
	// };
	// whatDayOfWeek();
	// timeStamp =
	// 	dayOfWeekName +
	// 	", " +
	// 	day +
	// 	". " +
	// 	month +
	// 	". " +
	// 	year +
	// 	" " +
	// 	hours +
	// 	":" +
	// 	minutes +
	// 	":" +
	// 	seconds;

	const options = {
		weekday: "long",
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	};

	timeStamp = date.toLocaleString("en-GB", options);
};

const oldGames = {};

// New game page - just enter name, create name and timestamp when created
const newGame = (game_name) => {
	actualiseDateTime();
	// let gameNumber = `game-${Object.keys(oldGames).length + 1}`;
	let gameNumber = Object.keys(oldGames).length + 1;
	oldGames[gameNumber] = { name: game_name, time: timeStamp };
	// console.log(oldGames[gameNumber]);
	// console.log(Object.keys(oldGames));
};

// $("#new-game").on("click", () => {
// 	newGame();
// });

// let initialAmount = 1500;
// let initialBank = 10000;
// let salary = 200;

// //GAME Name XX - adding players page - adding players one by one, added appear above new player line, button modify
// // button NEXT
// const personaAccounts = {
// 	Bank: initialBank,
// 	// person1: { name: "Bank", cash: initialBank },
// 	// person2: { name: "Player 1", cash: initialAmount },
// 	// person3: { name: "Player 2", cash: initialAmount },
// 	// rather easier way:
// 	// bank: initialBank,
// 	Adam: initialAmount,
// 	Eve: initialAmount,
// };

// const addPerson = () => {
// 	const newPersonName = prompt("Enter name of the player:");
// 	// const startCash = prompt("How much does the player start with?");
// 	// const givenCash = parseFloat(startCash);
// 	// const newPersonKey = `person${Object.keys(personaAccounts).length + 1}`;
// 	personaAccounts[newPersonName] = initialAmount;
// };

// player modify -- adding this function only later, quite a headache :)
function playerModify() {
	// ask for new name
	changeName = prompt("Enter new name of the player:");
	// use THIS from listener to change the key (player name),
}

// GAME Name XX - initial amount each player, bank and salary - picked the hard way, if you setup this
// in earlier step, there's easy assigning of cash to new players, now there's thinking involved :o

// button PLAY - will start the game getting you to main game page

// const newGameInitials = () => {
// 	let howMuchEach = prompt("How much will each player star with?");
// 	initialAmount = parseInt(howMuchEach);
// 	// let names = Object.keys(personaAccounts);
// 	// personaAccounts[names] = initialAmount; // nope not working, only creates new key/value pair, with names array as key
// 	// for (let name in personaAccounts) {
// 	// 	let firstElement = Object.keys(personaAccounts)[0];

// 	// 	if (firstElement) {
// 	// 		continue;
// 	// 		console.log("neco");
// 	// 	} else {
// 	// 		personaAccounts[name] = initialAmount;
// 	// 		console.log("neco jineho");
// 	// 	}
// 	// }
// 	let isFirstKey = true;
// 	for (let name in personaAccounts) {
// 		if (isFirstKey) {
// 			// let it continue over first iteration
// 			isFirstKey = false; // set false, so every other iteration goes through
// 			continue;
// 		}
// 		personaAccounts[name] = initialAmount;
// 	}
// 	// another way would be for loop with numbered index and starting from 1 instead of 0
// 	/*
//     // Get an array of keys from personaAccounts
//     let keys = Object.keys(personaAccounts);

//     // Check if there are keys in the object
//     if (keys.length > 0) {
//         // Get the first key
//         let firstKey = keys[0];

//         // Update the value for the first key (if needed)
//         // (You can choose to update it or skip it)

//         // Loop through the rest of the keys starting from the second key
//         for (let i = 1; i < keys.length; i++) {
//             let name = keys[i];
//             personaAccounts[name] = initialAmount;
//         } */
// 	let howMuchBank = prompt("How much is in the bank?");
// 	initialBank = parseInt(howMuchBank);
// 	personaAccounts["Bank"] = initialBank;
// 	let howMuchGo = prompt(
// 		"How much will player recieve salary when passing 'GO'?"
// 	);
// 	salary = parseInt(howMuchGo);
// };

// let fromPerson;
// let toPerson;
// let amount;

// const ledgerInput = (fromPerson, toPerson) => {
// 	let amountInput = prompt("How much do you transfer?"); // how much do you transfer
// 	amount = parseFloat(amountInput); // parsing input string to floating-point (decimal) number
// 	if (!isNaN(amount)) {
// 		personaAccounts[fromPerson] -= amount;
// 		personaAccounts[toPerson] += amount;
// 		// for (var i = 1; i <= 6; i++)
// 		// 	console.log("Player " + i + " : " + personaAccounts[i]);
// 		console.log(
// 			"New balance " + fromPerson + " " + personaAccounts[fromPerson]
// 		);
// 		console.log("New balance " + toPerson + " " + personaAccounts[toPerson]);
// 	} else {
// 		alert("Insert valid number!");
// 	}
// };

let ledger = {};
// 1 { giver: who_pays , reciever: to_whom_he_pays , amount: how_much }

// Perform transfer between two personas clicked in order giver >> reciever and update ledger and their balances
// $(".person").on("click", function () {
// 	// take name of the persona clicked

// 	if (!fromPerson) {
// 		// if empty put something from clicked element
// 		fromPerson = $(this).text();
// 		console.log("From: " + fromPerson);
// 	} else {
// 		// if fromPerson NOT empty fill toPerson
// 		toPerson = $(this).text();
// 		console.log("To: " + toPerson);

// 		ledgerInput(fromPerson, toPerson); // perform transaction

// 		// update ledger
// 		(function () {
// 			let ledgerLine = Object.keys(ledger).length + 1;
// 			ledger[ledgerLine] = {
// 				giver: fromPerson,
// 				reciever: toPerson,
// 				cash: amount,
// 			};
// 		})();

// 		// after this sequence delete variables
// 		fromPerson = null;
// 		toPerson = null;
// 	}
// });

// $("#add-person").on("click", () => {
// 	addPerson();
// });

// $("#ledger").on("click", () => {
// 	ledgerInput();
// });

// $("#game-initial").on("click", () => {
// 	newGameInitials();
// });

export { timeStamp, actualiseDateTime };
