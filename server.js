import express from "express";
import bodyParser from "body-parser";
import {
	personaAccounts,
	timeStamp,
	actualiseDateTime,
} from "./public/scripts/moneyTransfers.js";

const port = 3000;
const app = express();

app.use(express.static("public"));

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
	console.log("All games: " + allGameDetails.length);
	res.render("./new-game.ejs", { newGameName, gameDetails });
});
