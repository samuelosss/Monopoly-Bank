// alert("gamePlay works");

//listener for move A to B, function ledgerInput

$("#new-game").on("click", () => {
	window.location.href = "/new-game";
});

let fromPerson;
let toPerson;
let amount;

const ledgerInput = async (fromPerson, toPerson) => {
	let amountInput = prompt("How much do you transfer?"); // how much do you transfer
	amount = parseInt(amountInput); // parsing input string to floating-point (decimal) number

	if (amount !== null) {
		// Check if userInput is a valid number
		if (!isNaN(amount)) {
			try {
				const dataToSend = {
					amount: parseInt(amount),
					fromPerson: fromPerson,
					toPerson: toPerson,
				};

				const response = await fetch("/playTable", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ dataToSend }),
				});
				if (response.ok) {
					// Handle a successful response from the server
					const result = await response.json();
					console.log("Server response:", result);
				} else {
					// Handle errors here
					console.error("Error:", response.statusText);
				}
			} catch (error) {
				console.error("Fetch error:", error);
			}
		} else {
			alert("Please enter a valid number.");
		}
	}
};

// let ledger = {};
// 1 { giver: who_pays , reciever: to_whom_he_pays , amount: how_much }

// Perform transfer between two personas clicked in order giver >> reciever and update ledger and their balances
$(".person").on("click", function () {
	// take name of the persona clicked

	if (!fromPerson) {
		// if empty put something from clicked element
		fromPerson = $(this).text();
		console.log("From: " + fromPerson);
	} else {
		// if fromPerson NOT empty fill toPerson
		toPerson = $(this).text();
		console.log("To: " + toPerson);

		ledgerInput(fromPerson, toPerson); // perform transaction - I will use form post to node.js

		// update ledger -- not on client side -  bu in node.js
		// (function () {
		// 	let ledgerLine = Object.keys(ledger).length + 1;
		// 	ledger[ledgerLine] = {
		// 		giver: fromPerson,
		// 		reciever: toPerson,
		// 		cash: amount,
		// 	};
		// })();

		// after this sequence delete variables
		fromPerson = null;
		toPerson = null;
	}
});

// $("#add-person").on("click", () => {
// 	addPerson();
// });

// $("#ledger").on("click", () => {
// 	ledgerInput();
// });

// $("#game-initial").on("click", () => {
// 	newGameInitials();
// });
