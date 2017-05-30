
var inquirer = require("inquirer");

var fs = require("fs");

var basicCardList = require("./basicCardList.json")
console.log(basicCardList);


function BasicCard(frontText, backText) {
	this.front = frontText;
	this.back = backText;
}

function newFlashCard() {
	inquirer.prompt([{
		type: "input",
		name: "frontText",
		message: "What question would you like to ask the great flashcard?"
	},

	{	type: "input",
		name: "backText",
		message: "What is the correct answer to your flashcard question?"
	}

	]).then(function(inputs) {
		var card = new BasicCard(inputs.frontText, inputs.backText);
		basicCardList.push(card);

		var newBasicCardData = JSON.stringify(basicCardList, null, '\t');
		fs.writeFile('./basicCardList.json', newBasicCardData, function(err){
			if(err) throw err;
			console.log("New Basic flashcard created!")
		})
	});

}

newFlashCard();
