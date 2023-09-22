import express from "express";
import bodyParser from "body-parser";
import {
	timeStamp,
	actualiseDateTime,
} from "./public/scripts/moneyTransfers.js";

const port = 3000;
const app = express();

app.use(express.static("public"));

app.use(express.json());

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: "Internal Server Error" });
});

//middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
	console.log(`Listening at port: ${port}`);
});

app.get("/", (req, res) => {
	res.render("index.ejs", { allGameDetails });
});

app.get("/new-game", (req, res) => {
	res.render("./new-game.ejs", { allGameDetails });
});

let newGameName = null;
const allGameDetails = [];

app.post("/new-game", (req, res) => {
	newGameName = req.body.nameOfNewGame;
	actualiseDateTime();
	// newGame(newGameName);
	// const gameDetails = Object.keys(oldGames).map((gameNumber) => {
	// 	const { name, time } = oldGames[gameNumber];
	// 	return {
	// 		gameNumber,
	// 		gameName: name,
	// 		timestamp: time,
	// 	};
	// });
	const gameDetails = {
		gameNumber: allGameDetails.length + 1,
		gameName: newGameName,
		// timestamp: oldGames[Object.keys(oldGames).length].time,
		timestamp: timeStamp,
	};
	allGameDetails.push(gameDetails);
	console.log("Last added game name: " + newGameName);
	console.log("Number of saved games: " + allGameDetails.length);
	console.log("All games objects in array: " + allGameDetails);
	res.render("./new-game.ejs", { newGameName, gameDetails, allGameDetails });
});

let listOfPlayers = [];

app.get("/add-players", (req, res) => {
	res.render("./add-players.ejs", { allGameDetails, personas });
});

// base Persona constructor
function Persona(name, initialCash) {
	this.name = name;
	this.cash = initialCash;
}

// Player Constructor
function Player(name, initialCash) {
	Persona.call(this, name, initialCash);
	this.propertiesOwned = [];
}
Player.prototype = Object.create(Persona.prototype);
Player.prototype.constructor = Player;

Player.prototype.buyProperty = function (property) {
	// Implement property purchase logic, probably will get some input from client-side js initially
};

// Bank Constructor
function Bank(initialFunds) {
	Persona.call(this, "Bank", initialFunds);
}
Bank.prototype = Object.create(Persona.prototype);
Bank.prototype.constructor = Bank;

// Create an array to store persona objects
const personas = [];

let initialBank = 99000;
let initialAmount = 1500;
let salary = 200;
let bankCash = [];
let playersCash = [];

app.post("/add-players", (req, res) => {
	let newPlayerName = req.body.playerName;
	let newPlayer = new Player(newPlayerName, initialAmount);

	personas.push(newPlayer);

	console.log("New player name is: " + newPlayerName);
	// console.log("Plyer list: " + listOfPlayers);
	newPlayerName = null;
	newPlayer = null;
	// res.render("./add-players.ejs", { allGameDetails, personas });
	res.redirect("/add-players");
});

// create Bank
const bank = new Bank(initialBank);
personas.push(bank);
console.log("Starting bank balance: " + personas[0].cash);

app.get("/game-initial", (req, res) => {
	res.render("./game-initial.ejs", { allGameDetails });
});

app.post("/game-initial", (req, res) => {
	if (
		req.body.bankBalance != null &&
		req.body.bankBalance !== "" &&
		!isNaN(parseInt(req.body.bankBalance)) &&
		Number.isInteger(parseInt(req.body.bankBalance))
	) {
		initialBank = req.body.bankBalance; // changing initial values only if correct numbers are entered by user
	}

	if (
		req.body.startingAmount != null &&
		req.body.startingAmount !== "" &&
		!isNaN(parseInt(req.body.startingAmount)) &&
		Number.isInteger(parseInt(req.body.startingAmount))
	) {
		initialAmount = req.body.startingAmount;
	}
	if (
		req.body.playerSalary != null &&
		req.body.playerSalary !== "" &&
		!isNaN(parseInt(req.body.playerSalary)) &&
		Number.isInteger(parseInt(req.body.playerSalary))
	) {
		salary = req.body.playerSalary;
	}

	console.log("Starting player balance: " + initialAmount);
	console.log("Starting salary / pass GO: " + salary);

	res.redirect("/playTable");
});

app.get("/playTable", (req, res) => {
	res.render("./playTable.ejs", {
		allGameDetails,
		listOfPlayers,
		initialBank,
		initialAmount,
		salary,
		bankCash,
		playersCash,
		ledger,
		personas,
	});
});

let fromPerson = null;
let toPerson = null;
let ledger = {};

app.post("/playTable", (req, res) => {
	// try {
	//trying to catch errors - only in node console some errors after adding res.render line
	const amount = req.body.dataToSend.amount;
	// Process the user input here
	toPerson = req.body.dataToSend.toPerson;
	fromPerson = req.body.dataToSend.fromPerson;
	console.log("To person: " + toPerson);
	console.log("From person: " + fromPerson);
	console.log("Sent amount: " + amount);

	// update ledger
	(function ledgerUpdate() {
		let ledgerLine = Object.keys(ledger).length + 1;
		ledger[ledgerLine] = {
			giver: fromPerson,
			reciever: toPerson,
			cash: amount,
		};
	})();
	console.log("Current ledger: " + ledger);

	// You can send a response back to the client
	res.json({
		result: `You entered: ${amount}`,
		allGameDetails,
		listOfPlayers,
		initialBank,
		initialAmount,
		salary,
		bankCash,
		playersCash,
		ledger,
		personas,
	});

	//reset from to
	// fromPerson = null;
	// toPerson = null;

	// res.render("./playTable.ejs", {
	// allGameDetails,
	// listOfPlayers,
	// initialBank,
	// initialAmount,
	// salary,
	// bankCash,
	// playersCash,
	// ledger,
	// });
	// } catch (error) {
	// 	// Handle and log any errors
	// 	console.error("Error:", error);
	// 	res.status(500).send("Internal Server Error");
	// } //trying to catch errors - only in node console some errors after adding res.render line
});
