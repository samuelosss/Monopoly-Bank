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

//middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
	console.log(`Listening at port: ${port}`);
});

app.get("/", (req, res) => {
	res.render("index.ejs", { allGameDetails });
});

app.get("/new-game", (req, res) => {
	res.render("./new-game.ejs");
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
	res.render("./new-game.ejs", { newGameName, gameDetails });
});

let listOfPlayers = [];

app.get("/add-players", (req, res) => {
	res.render("./add-players.ejs", { allGameDetails, listOfPlayers });
});

app.post("/add-players", (req, res) => {
	let newPlayerName = [];
	newPlayerName = req.body.playerName;
	listOfPlayers.push(newPlayerName);
	console.log("New player name is: " + newPlayerName);
	console.log("Plyer list: " + listOfPlayers);
	res.render("./add-players.ejs", { allGameDetails, listOfPlayers });
});

let initialBank = 99000;
let initialAmount = 1500;
let salary = 200;
let bankCash = [];
let playersCash = [];

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
		initialBank = req.body.bankBalance;
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
	console.log("Starting bank balance: " + initialBank);
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
	});
});

let fromPerson = null;
let toPerson = null;

app.post("/playTable", (req, res) => {
	const amount = req.body.dataToSend.amount;
	// Process the user input here
	toPerson = req.body.dataToSend.toPerson;
	fromPerson = req.body.dataToSend.fromPerson;
	console.log("To person: " + toPerson);
	console.log("From person: " + fromPerson);
	console.log("Sent amount: " + amount);
	// You can send a response back to the client
	res.json({ result: `You entered: ${amount}` });
	//reset from to
	// fromPerson = null;
	// toPerson = null;
});
