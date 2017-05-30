
var inquirer = require("inquirer");

var fs = require("fs");

var clozeCardList = require("./clozeCardList.json");


function ClozeCard(completeText, answer) {

		var clozeSections = clozeDelete(completeText, answer);

		this.incomplete = incompleteCard(completeText, clozeSections);
		this.answer = answer;


		function clozeDelete(completeText, answer) {
			var start = completeText.indexOf(answer);
			if(start !== -1) {
				return [start, start + answer.length];
			}

			throw new Error("Could not find the flashcard answer within the completed text.")
		}


		function incompleteCard(completeText, clozeSections) {
			var start = completeText.slice(0, clozeSections[0]);
			var end = completeText.slice(clozeSections[1], completeText.length);
			return start + " ... " + end;
		}
}


ClozeCard.prototype.showCard = function showCard(){
	console.log(this.incomplete.replace("..."), this.answer)
}

function newFlashCard() {
	inquirer.prompt([{
		type: "input",
		name: "completeText",
		message: "What is the complete text of the desired flashcard?"
	},

	{	type: "input",
		name: "answer",
		message: "What is the answer that we are removing from the complete text of the flashcard?"
	}

	]).then(function(inputs) {
		var card = new ClozeCard(inputs.completeText, inputs.answer);
		card.showCard;
		clozeCardList.push(card);

		var newClozeCardData = JSON.stringify(clozeCardList, null, '\t');
		fs.writeFile('./clozeCardList.json', newClozeCardData, function(err){
			if(err) throw err;
			console.log("New Cloze flashcard created!")
		})
	});

}

newFlashCard();
