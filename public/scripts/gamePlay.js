// alert("gamePlay works");

//listener for move A to B, function ledgerInput

$("#new-game").on("click", () => {
	window.location.href = "/new-game";
});

let fromPerson;
let toPerson;
let amount;

let result;

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
					result = await response.json();
					console.log("Server response:", result);

					// Update the #ledger-output element with the new ledger data
					// $("#ledger-output").html(result.ledger);

					// advanced
					// Update the #ledger-output element with the new ledger data
					const ledgerOutput = $("#ledger-output");
					ledgerOutput.empty(); // Clear previous content

					for (const key in result.ledger) {
						if (result.ledger.hasOwnProperty(key)) {
							const transaction = result.ledger[key];
							const transactionHtml = `
      <div class="transaction">
        Transaction ${key}: Giver: ${transaction.giver}, Receiver: ${transaction.reciever}, Cash: ${transaction.cash}
      </div>
    `;
							ledgerOutput.prepend(transactionHtml);
						}
					}

					let ledgerKeys = Object.keys(result.ledger);
					let lastLedgerKey = ledgerKeys.length;

					// Find the element with class 'persona-name' and text matching toPerson
					let $personaTo = $(
						'.persona-name:contains("' +
							result.ledger[lastLedgerKey].reciever +
							'")'
					);
					let $personaFrom = $(
						'.persona-name:contains("' +
							result.ledger[lastLedgerKey].giver +
							'")'
					);

					let personaToNewCash = result.personas.find(
						(someone) => someone.name === result.ledger[lastLedgerKey].reciever
					)?.cash;

					let personaFromNewCash = result.personas.find(
						(someone) => someone.name === result.ledger[lastLedgerKey].giver
					)?.cash;

					// console.log("personaToNewCash: " + personaToNewCash);
					// console.log("personaFromNewCash: " + personaFromNewCash);

					$personaTo.siblings(".money").html(personaToNewCash);
					$personaFrom.siblings(".money").html(personaFromNewCash);
					// Extract the cash values for the giver and receiver from the server's response
					// const cashForGiver = result.personas.find(
					// 	(person) => person.name === transaction.giver
					// )?.cash;
					// const cashForReceiver = result.personas.find(
					// 	(person) => person.name === transaction.receiver
					// )?.cash;

					// Update the cash values based on the server response
					// if ($balanceToChange.length > 0 && cashForReceiver !== undefined) {
					// 	// Change the text of the found element to the new cash value for the receiver
					// 	$balanceToChange.text(cashForReceiver);
					// }

					// if ($balanceFromChange.length > 0 && cashForGiver !== undefined) {
					// 	// Change the text of the found element to the new cash value for the giver
					// 	$balanceFromChange.text(cashForGiver);
					// }
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
$(".persona-name").on("click", function () {
	// take name of the persona clicked
	// const textFromNestedDiv = $(this).find(".persona-name").text();

	if (!fromPerson) {
		// if empty put something from clicked element
		// fromPerson = textFromNestedDiv;
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
