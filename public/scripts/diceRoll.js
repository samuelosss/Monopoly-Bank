// client-side js only performing dice roll with some animation later
// alert("diceRoll works!");

const dice = [1, 2, 3, 4, 5, 6];
let diceOne = null;
let diceTwo = null;
let numberOfMoves = null;

function rollOne() {
	diceOne = Math.floor(Math.random() * dice.length) + 1;
	console.log(diceOne);
}

function rollTwo() {
	diceTwo = Math.floor(Math.random() * dice.length) + 1;
	console.log(diceTwo);
}

let howManyTimesSame = 0;

// const checkIfSame = () => {
// 	if (diceOne === diceTwo) {
// 		// do something when same numbers
// 		// show alert
// 		// highlight AGAIN button
// 		// deactivate CLOSE button
// 		howManyTimesSame++;

// 		if (howManyTimesSame === 3) {
// 			// show alert on new red coloured modal "Third time same number! GO TO JAIL"
// 			alert("Third time same number! GO TO JAIL");
// 			// only CLOSE button on this modal
// 		} else {
// 			alert("Hey! Same numbers. Do your turn and ROLL AGAIN!");
// 			console.log(howManyTimesSame + " times same number!");
// 		}
// 	} else {
// 		// make CLOSE button higlighted and AGAIN button unhighlight
// 		console.log("Not the same this time..");
// 	}
// };

const diceRoll = () => {
	rollOne();
	rollTwo();
	// diceOne = 3; //fake for testing
	// diceTwo = 3; //fake for testing
	numberOfMoves = diceOne + diceTwo;
	// console.log("Number of moves: " + numberOfMoves);
	// checkIfSame();
};

/*
        Klik rolldice
        if stejne 1x
            klik roll
            if stejne 2x
                    klik roll
                    if stejne 3x - VEZENI
                    else KONEC
            else KONEC
        else konec

*/

// // KLIK
// $("#dice").on("click", () => {
// 	diceRoll(); //roll
// 	if (diceOne === diceTwo) {
// 		//FIRST time the same

// 		howManyTimesSame++;
// 		$("#dice").on("click", () => {
// 			diceRoll();
// 			if (diceOne === diceTwo) {
// 				// SECOND time the same
// 				howManyTimesSame++;
// 				$("#dice").on("click", () => {
// 					diceRoll();
// 					if (diceOne === diceTwo) {
// 						howManyTimesSame++; // THIRD time the same

// 						// show alert on new red coloured modal "Third time same number! GO TO JAIL"
// 						alert("Third time same number! GO TO JAIL");
// 						// only CLOSE button on this modal
// 					} else {
// 						//KONEC
// 						console.log("Number of moves: " + numberOfMoves);
// 					}
// 				});
// 				alert("Hey! Same numbers SECOND TIME. Do your turn and ROLL AGAIN!");
// 			} else {
// 				//KONEC
// 				console.log("Number of moves: " + numberOfMoves);
// 			}
// 		});
// 		alert("Hey! Same numbers FIRST TIME. Do your turn and ROLL AGAIN!");
// 	} else {
// 		//KONEC
// 		console.log("Number of moves: " + numberOfMoves);
// 	}
// });

const clickRolls = () => {
	diceRoll(); //roll
	if (diceOne === diceTwo) {
		// if the dice are the same, increment the counter
		howManyTimesSame++;
		// check the counter and show different alerts accordingly
		if (howManyTimesSame === 1) {
			alert("Hey! Same numbers FIRST TIME. Do your turn and ROLL AGAIN!");
			console.log("Number of moves: " + numberOfMoves);
		} else if (howManyTimesSame === 2) {
			alert("Hey! Same numbers SECOND TIME. Do your turn and ROLL AGAIN!");
			console.log("Number of moves: " + numberOfMoves);
		} else if (howManyTimesSame === 3) {
			alert("Third time same number! GO TO JAIL");
			// reset the counter
			howManyTimesSame = 0; // coment out  WHEN TESTING
		}
	} else {
		// if the dice are not the same, reset the counter
		howManyTimesSame = 0;
		// show the number of moves
		console.log("Number of moves: " + numberOfMoves);
	}
};

// KLIK
$("#dice").on("click", () => {
	clickRolls();
});

function test(number) {
	for (var i = 0; i < number; i++) {
		clickRolls();
		console.log(`Iteration number ${i}`);
		// napsat if at se to vyhodi kdyz vezeni (3x)
		if (howManyTimesSame === 3) {
			break;
		}
	}
}
