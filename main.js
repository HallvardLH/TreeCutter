//THINGS TO ADD///////
//achievements?
////Using the description function, clicking every clickable object gives achievement "clicker of everything"
//businessees and such to invest in
//money currency
//trees having to be bought with money
////This means I have to make a way to limit the amount of trees depending on how many trees I cureently own
////cut time can be shortened with better axes
//Purchasing an acre of forest yelds a random amount of trees and a message is displayed saying this
////Displaying acres with the trees showing
//Make different variants to trees
//Add fade out effect to last tree frame https://www.w3schools.com/jquery/eff_fadeout.asp
//Golden wood
////Has a low chance of dropping
////Sappling from gold trees can be replanted in some sort of garden, or empty acres
//Garden
////Growing mechanism: random amount of time (withing a certain set amount of time) before next plant stage until fully grown
////Tree growth starts off at literally 10 years until maturity. This is shortened by some kind of potion of whatever.
//Something showing how much logs are worth
//A way to pause and then start the lumberjack again
//Item shop
//Wood related businesses
////Heat energy suppliers
////Carpentry firm
////Someone who automatically buys land for you
////When the Earth has no more trees, build rockets to other planets
//Corporate offices
////stock market
//Resin
////Frankincense
////Make the lumerjack work iven if the wondow is not in focus
//Tree plantation, grows a certain amount of trees everry certain amound of time
//Manually putting a certain amount of wood and money into the sawmill.
////Same with lumberjack.
////This is to avoid these buildings using up every all the resources immediately.
//Guerilla warfare becomes a reality as the amount of trees decline drastically
//You have to buy upgrades and troops to defend what few acres of trees are left
//Eventually you realize you need to colonized the solar system and plant trees there instead
//You have to put money wood and other resources into buildings for them to work.
//Sawmill Progress bar
//Several Lumberjacks with different names, personalities and traits.

//Settings/options menu

//Price of certain things fluctuate in relation to how much you sell and so forth
//Market

//Create your own currency, WoodCoin. Possibly be able to name it yourself

//Choices
////Good and bad. Choosing total deforestation or letting the world live through
////a series of choices presented throughout the game
////

// Pollution level 
// https://aqicn.org/map/world/
// Affects value of WoodCoin
// Affects quality of Earth
// May make your stock value go down
// Affects world population




//////////////////////
//ADDED FEATURES/////
//Lumberjack that enters the frame and cuts the tree automatically
//something that tells you what you got from every click (added this to show in the input bar, might change.)
//upgrades (got the general things to work for this)
//feature that makes cutting trees take longer
//Pressing the "sell wood" button with an empty input field sells all wood (changed this to instead ask how much wood to sell)
//Sawmill


//Lumberjacks are assigened to land, rather than trees being given to them
//////////////////


var oakWoodAmount = 0;
var spruceWoodAmount = 0;
var oakWood = 0;
var spruceWood = 0;
var planks = 0;

/*=====================================================================================
									STOCK MARKET
=======================================================================================*/

function TSLA(){
  this.growth_multiplier = 1.001,
  this.current_worth_per_stock = 301.72,
  this.player_owns_x_stocks = 0,
  this.full_name = "Tesla"
}

var my_TSLA_object = new TSLA();



/*=====================================================================================
										INPUTS
=======================================================================================*/

function buildingSwitch(item) {
	hideItem('lumberjackInputs');
	hideItem('sawmillInputs');
	hideItem('plantationInputs');
switch(item){
		case 10:
			showItem('lumberjackInputs');
			break;
		case 20:
			showItem('sawmillInputs');
			break;
		case 30:
			showItem('plantationInputs');
			break;
		case 40:
			break;
	}
}

function switchResourceType(type) {
	outline("oakWoodIcon", 'clear'); // Clear all icons of outline
	outline("spruceWoodIcon", 'clear');
	outline("plank", 'clear');
	switch(type) {
		case 0:
			document.getElementById("sellBtn").innerHTML = "Sell oak";
			resourceType = "oak";
			outline("oakWoodIcon");
			break;
		case 1:
			document.getElementById("sellBtn").innerHTML = "Sell spruce";
			resourceType = "spruce";
			outline("spruceWoodIcon");
			break;
		case 2:
			document.getElementById("sellBtn").innerHTML = "Sell planks";
			resourceType = "planks";
			outline("plank");
			break;
		}
}

function imageReplace(id, src) {
	document.getElementById(id).src=src;
}

// Reads the input value and subtracts it from the chosen type
// Only sells if there is enough wood
var inputValue = document.getElementById("inputAmount").value;
async function sellWood(number) {
	if(resourceType == "oak") {
		var typeAmount = oakWood;
	} else
	if(resourceType == "spruce") {
		var typeAmount = spruceWood;
	} else
	if (resourceType == "planks") {
		var typeAmount = planks;
	}

	var input = document.getElementById("inputAmount").value;
	if(number == 'all') {
		var inputValue = typeAmount;
	}
	else if(number == 'half') {
		t = typeAmount;
		var inputValue = t /=2;
		inputValue = Math.floor(inputValue);
	}
	else if(input != '') {
		var inputValue = document.getElementById("inputAmount").value; // Gets the inputted value
	}else {
		var inputValue = number;
	}


	var inputSecure = typeAmount -= inputValue;
	if(inputValue == "") {
		document.getElementById("inputAmount").value = "How much?";
	}
	if(inputSecure >= 0) {
		if(resourceType == "oak") {
			oakWood = inputSecure;
			s = inputValue * woodValue;
			money += s
		} else
		if(resourceType == "spruce") {
			spruceWood = inputSecure;
			s = inputValue * woodValue;
			money += s
		} else
		if (resourceType == "planks") {
			planks = inputSecure;
			s = inputValue * plankValue;
			money += s
		}
		if(resourceType == 'planks' || resourceType == 'oak' || resourceType == 'spruce') { 
			messageDisplay('Sold ' + inputValue + ' ' + resourceType + ' for ' + s + '$');
		}
		document.getElementById("inputAmount").value = "";
	} else
	messageDisplay('Input field empty.');
}

var ljMoney = 0;
function lumberjackInputMoney(amount) {
	if(amount != undefined) {
		var inputValue = amount;
	}
	else {
		//var inputValue = Number(document.getElementById("ljMoneyInput").value);
	}
	var m = money;
	var input = inputValue
	var inputSecure = m -= inputValue;

	if(inputSecure >= 0 && lumberjackOn == 1) {
		ljMoney += input;
		money -= input;
		if(amount == undefined) {
			//document.getElementById("ljMoneyInput").value = "";
		}
	}
}

function withdrawWood(which, type) {
	var o = ljOak;
	var s = ljSpruce;
	if(which == 'sell') {
		if(resourceType == "oak") {
			a = o;
			d = Math.floor(o) * woodValue;
			money += d;
			ljOak -= o;
		}
		if(resourceType == "spruce") {
			a = s;
			d = Math.floor(s) * woodValue;
			money += d;
			ljSpruce -= s;
		}
		messageDisplay('Sold ' + Math.floor(a) + ' ' + resourceType + ' for ' + Math.floor(d) + '$');
	}
	if(which == 'withdraw') {
		if(type == "oak") {
			ljOak -= Math.floor(o);
			oakWood += Math.floor(o);
			//messageDisplay('Withdrew ' + Math.floor(o) + ' oak wood');
		}
		if(type == "spruce") {
			ljSpruce -= Math.floor(s);
			spruceWood += Math.floor(s);
			//messageDisplay('Withdrew ' + Math.floor(s) + ' spruce wood');
		}
	}
}

var lumberjackOn = 1;
function lumberjackOnOff(which) {
	if(which == 0) {
		lumberjackOn = 1;
	}
	if(which == 1) {
		lumberjackOn = 0;
	}
}


var ljOak = 0;
var ljSpruce = 0;
var ljBirch = 0;
var ljOak = 0;
var ljSpruce = 0;

var smillMoney = 0;
var calculatedSawmillPercent;
function sawmillInputMoney(number) {
	var inputValue = number;
	var m = money;
	var input = parseInt(inputValue)
	var inputSecure = m -= inputValue;
	WPS = Math.abs(sawmillWPS);
	if(oakWood >= WPS || spruceWood >= WPS) {
		if(inputSecure >= 0 && sawmillOn == 1) {
			smillMoney += input;
			money -= input;
		}
	}
}

var smillPercentage = 10;
function sawmillPercentage(which) {
	if(which == 0 && smillPercentage < 100) {
		smillPercentage++;
	}
	if(which == 1 && smillPercentage > 0) {
		smillPercentage--;
	}
}

var sawmillOn = 1;
function sawmillOnOff(which) {
	if(which == 0) {
		sawmillOn = 1;
	}
	if(which == 1) {
		sawmillOn = 0;
	}
}



var smillOak = 0;
var smillSpruce = 0;
var smillBirch = 0;
function sawmillInputWood(number) {
	WPS = Math.abs(sawmillWPS);
		if(oakWood >= WPS || spruceWood >= WPS)
			if(oakWood >= spruceWood && sawmillOn == 1) {
				smillOak += number;
				oakWood -= number;
			}
			else if(spruceWood > oakWood && sawmillOn == 1) {
				smillSpruce += number;
				spruceWood -= number;
				
			}
}

function withdrawPlanks(which) { // Choose between selling all planks or withdrawing them
	var p = smillPlanks;
	if(which == 'sell') {
		a = p * plankValue;
		messageDisplay('Sold ' + Math.floor(p) + ' planks' + ' for ' + Math.floor(a) + '$');
		smillPlanks -= p;
		money += Math.floor(p) * plankValue;
	}
	if(which == 'withdraw') {
		smillPlanks -= Math.floor(p);
		planks += Math.floor(p);
		//messageDisplay('Withdrew ' + Math.ceil(p) + ' planks');
	}
}





var resourceType = "oak";
var money = 0;

// Use later for window resizing to adjust resolutions
document.body.style.zoom=1;this.blur();
//

/*=====================================================================================
									 TILES (LAND)
=======================================================================================*/
var tile1Trees = 500;
var tile2Trees = 0;

function buyLand() {
	defocus('spruceForest');
	hideItem("sprucePatch");
	showItem("spruceForest");
	showItem('spruceWoodIcon');
	if(money >= 500 && localStorage.ownedTiles == undefined) {
		money -= 500;
		plantationTreeRange++;
		var givenTrees = Math.floor(Math.random() * (1100 - 900)) + 900;
		tile2Trees += givenTrees;
		messageDisplay("+" + givenTrees + " spruce trees!");
		localStorage.ownedTiles = 1;
	}
	else if(localStorage.ownedTiles == undefined) {
		notEnough();
	}
}

function treeLoose() {
	if(chosenTile == 1) {
		tile1Trees--;
	}
	else if(chosenTile == 2) {
		tile2Trees--;
	}
}

var chooseActive = false;
function lumberjackChooseTile() {
	hideItem('infoSection');
	showItem('landSection');
	chooseActive = true;
	//messageDisplay('You are currently selecting the tile from which the lumberjack gets his trees. Open the land menu and simply click on a tile of land');
}

var whichTile = 0;
var chosenTile = 1;
//1 = Oak tree
//2 = Spruce tree
function switchTree(treeNum) {
	var x = document.getElementById("clickTreeImage");
	switch(treeNum){
		case 1:
			if(chooseActive) {
				whichTile = 1;
				chooseActive = false;
				hideItem('chosenOakTile');
				showItem('chosenSpruceTile');
				messageDisplay('Oak tile chosen');
			}
			else if(chooseActive == false && treeStage == 0 || treeStage == 7) {
				defocus('spruceForest');
				defocus('oakForest');
				focus('oakForest');
				oakTree = true;
				spruceTree = false;
				chosenTile = treeNum;
				x.src = 'https://i.imgur.com/aGBT0tm.png';
				x.style.backgroundImage = "";
				if(tile1Trees < 1) {
					x.src = 'https://i.imgur.com/5A2LW1e.png';
				}
				messageDisplay('Oak tile chosen');
			}
			else {
				messageDisplay('Finish the tree first!');
			}
			break;
		case 2:
			if(chooseActive) {
				whichTile = 2;
				chooseActive = false;
				hideItem('chosenSpruceTile');
				showItem('chosenOakTile');
				messageDisplay('Spruce tile chosen');
			}
			else if(chooseActive == false && treeStage == 0 || treeStage == 7) {
				defocus('spruceForest');
				defocus('oakForest');
				focus('spruceForest');
				spruceTree = true;
				oakTree = false;
				chosenTile = treeNum;
				x.src = 'https://art.pixilart.com/3feb11b0ca2d069.png';
				x.style.backgroundImage = "url('https://i.imgur.com/5zTMOb3.png')";
				if(tile1Trees < 1) {
					x.src = 'https://i.imgur.com/pT4aSQQ.png';
				}
				messageDisplay('Spruce tile chosen');
			}
			else {
				messageDisplay('Finish the tree first!');
			}
			break;
	}
}

function defocus(id) {
    var x = document.getElementById(id);
    //if(x.style.filter == "grayscale(100%)") {
    //	x.style.filter = "";
    //}
    //else {
    	x.style.filter = "grayscale(100%)";
    //}
}

function focus(id) {
    var x = document.getElementById(id);
    x.style.filter = "";
}

function sepia(id) {
    var x = document.getElementById(id);
    if(x.style.filter == "") {
    	x.style.filter =  "sepia(100%)";
    }
    else {
    	x.style.filter = "";
    }
}

/*=====================================================================================
											SAVE
=======================================================================================*/

//$(window).on('load', 
async function loadUp() {
 	if(localStorage.length != 0) {
		money = Number(localStorage.money);
		oakWood = Number(localStorage.oak);
		spruceWood = Number(localStorage.spruce);
		planks = Number(localStorage.planks);
		tile1Trees = Number(localStorage.tile1Trees); // Land
 		tile2Trees = Number(localStorage.tile2Trees);
 		ljMoney = Number(localStorage.ljMoney);
 		ljOak = Number(localStorage.ljOak);
 		ljSpruce = Number(localStorage.ljSpruce);
 		smillMoney = Number(localStorage.smillMoney);
 		smillOak = Number(localStorage.smillOak);
 		smillSpruce = Number(localStorage.smillSpruce);
 		smillPlanks = Number(localStorage.smillPlanks);
 		whichTile = Number(localStorage.whichTile); // The selected tile for the lumberjack
 		lumberjackGO2 = localStorage.lumberjackGO2;
 		population = Number(localStorage.population);
 		treesCutDown = Number(localStorage.treesCutDown);
 		ownedUpgrades = JSON.parse(localStorage.getItem("ownedUpgrades"));
 		//unlockedUpgrades = JSON.parse(localStorage.getItem("unlockedUpgrades"));
 		lumberjackMPS = Number(localStorage.lMPS);
 		lumberjackWPS = Number(localStorage.lWPS);
 		lumberjackTPS = Number(localStorage.lTPS);
 		axePercent = Number(localStorage.axePercent);
 		baseWPT = Number(localStorage.baseWPT);
 		//lumberjack per secon values
	 	lumberjackWPSMultiply = Number(localStorage.lumberjackWPSMultiply);
		lumberjackMPSMultiply = Number(localStorage.lumberjackMPSMultiply);
		lumberjackTPSMultiply = Number(localStorage.lumberjackTPSMultiply);
		baseLumberjackWPS = Number(localStorage.baseLumberjackWPS);
		baseLumberjackMPS = Number(localStorage.baseLumberjackMPS);
		baseLumberjackTPS = Number(localStorage.baseLumberjackTPS);

		//sawmill per second values
		sawmillWPSMultiply = Number(localStorage.sawmillWPSMultiply);
		sawmillMPSMultiply = Number(localStorage.sawmillMPSMultiply);
		sawmillPPSMultiply = Number(localStorage.sawmillPPSMultiply);
		baseSawmillWPS = Number(localStorage.baseSawmillWPS);
		baseSawmillMPS = Number(localStorage.baseSawmillMPS);
		baseSawmillPPS = Number(localStorage.baseSawmillPPS);

		//plantation per time values
		plantationTPSAdd = Number(localStorage.plantationTPSAdd);
		plantationTPSMultiply = Number(localStorage.plantationTPSMultiply);
		basePlantationTPS = Number(localStorage.basePlantationTPS);

		resourceType = localStorage.resourceType;

		lumberjackPrice = localStorage.lumberjackPrice;
		plantationPrice = localStorage.plantationPrice;

		secondsPlayed = Number(localStorage.secondsPlayed);
		days = Number(localStorage.days);

		secondsPerTree = Number(localStorage.secondsPerTree);

		plantationAmount = Number(localStorage.plantationAmount);

		initialTimer = Number(localStorage.initialTimer);

		sawmillOn = Number(localStorage.sawmillOn);
		lumberjackOn = Number(localStorage.lumberjackOn);

		lJackSpeed = Number(localStorage.lJackSpeed);

		planksProduced = Number(localStorage.planksProduced);

		plantationTreeRange = Number(localStorage.plantationTreeRange);

		plantationOwned = Number(localStorage.plantationOwned);
		document.getElementById("treeSeconds").innerHTML = 'Time left:<br>' + new Date(treeTimer * 1000).toISOString().substr(11, 8);
		if(plantationOwned == 1) {
			activatePlantation();
			treeTimer = Number(localStorage.treeTimer);
		}

		updateType();
 		function updateType() { // Correctly shows which resource type is chosen
 			if(resourceType == 'oak') {
				switchResourceType(0);
 			}
 			if(resourceType == 'spruce') {
				switchResourceType(1);
 			}
 			if(resourceType == 'planks') {
				switchResourceType(2);
 			}
 		}	

		autoLumberjackInput = Number(localStorage.autoLumberjackInput);

		if(Number(localStorage.chainsaw) == 1) {
			showItem('chainsawTool');
		}

		chosenTile = Number(localStorage.chosenTile) // The selected tile for the player
		switchTree(chosenTile);
		if(chosenTile == 1) {
			focus('oakForest');
		}
		if(chosenTile == 2) {
			focus('spruceForest');
		}


		if(localStorage.lumberjack >= 1) {
			activateLumberjack();
			lumberjackAmount = Number(localStorage.lumberjack);
		}
		if(localStorage.sawmill == 1) {
			shopBuy(1);
		}
		if(localStorage.ownedTiles == 1) {
			buyLand();
		}
		if(whichTile == 1) {
			hideItem('chosenOakTile');
			showItem('chosenSpruceTile');
		}
		if(whichTile == 2) {
			hideItem('chosenSpruceTile');
			showItem('chosenOakTile');
			document.getElementById("treeImage").src = 'https://art.pixilart.com/3feb11b0ca2d069.png';
		}
		for(var i = 0; i < 500; i++){ //Loops 200 times
			if(ownedUpgrades[i] == 0) { //If index is 1, the upgrade is owned
				if(i <= 50) {
					spawnUpgrade(i, 2)
				}
				if(i >= 51 && i <= 100) {
					spawnUpgrade(i, 3)
				}
				if(i >= 101 && i <= 150) {
					spawnUpgrade(i, 2);
				}
				if(i >= 151 && i <= 200) {
					spawnUpgrade(i, 4);
				}
				if(i >= 201 && i <= 250) {
					spawnUpgrade(i, 5);
				}
			}
		}
		console.log('Welcome back!')
 	} else { // If not, it's the first time playing and these need to be set
 		money = Math.floor(Math.random() * 101);
 		oakWood = 0;
 		spruceWood = 0;
 		planks = 0;
 		localStorage.sawmillUpgrade = 0;
 		resourceType = 'oak';
 		save();
 		console.log('First time load');
 		messageDisplay("You inherit your father's plot of land. It's empty except for some boring old oak trees. You contemplate what to do with them...")
 	}
 	document.getElementById("planksAmount").innerHTML = Math.floor(planks);
    document.getElementById("moneyAmount").innerHTML = Math.ceil(money);
	document.getElementById("oakWoodAmount").innerHTML = Math.ceil(oakWood);
	document.getElementById("spruceWoodAmount").innerHTML = Math.ceil(spruceWood);
 }//);

 // Simply updates the localStorage values
async function save() {
	//Values in bank
 	localStorage.money = money;
 	localStorage.oak = oakWood;
 	localStorage.spruce = spruceWood;
 	localStorage.planks = planks;
 	//Lumberjack values
 	localStorage.ljMoney = ljMoney;
 	localStorage.ljOak = ljOak;
 	localStorage.ljSpruce = ljSpruce;

 	localStorage.lMPS = lumberjackMPS;
 	localStorage.lWPS = lumberjackWPS;
 	localStorage.lTPS = lumberjackTPS;

 	//Sawmill values
 	localStorage.smillMoney = smillMoney;
 	localStorage.smillOak = smillOak;
 	localStorage.smillSpruce = smillSpruce;
 	localStorage.smillPlanks = smillPlanks;

 	localStorage.sawmillUpgrade = localStorage.sawmillUpgrade;

 	//Tile values
 	localStorage.tile1Trees = tile1Trees;
 	localStorage.tile2Trees = tile2Trees;

 	//Chosen resource
 	localStorage.resourceType = resourceType;

 	//Chosen lumberjack tile
 	localStorage.whichTile = whichTile;

 	localStorage.chosenTile = chosenTile;

 	//Determine whether or not the Lumberjack animation should be active on load
 	localStorage.lumberjackGO2 = lumberjackGO2;

 	//Upgrades
 	localStorage.ownedUpgrades = JSON.stringify(ownedUpgrades);

 	//localStorage.unlockedUpgrades = JSON.stringify(unlockedUpgrades);

 	//Axe
 	localStorage.axePercent = axePercent;
 	localStorage.baseWPT = baseWPT;

 	//lumberjack per secon values
 	localStorage.lumberjackWPSMultiply = lumberjackWPSMultiply;
	localStorage.lumberjackMPSMultiply = lumberjackMPSMultiply;
	localStorage.lumberjackTPSMultiply = lumberjackTPSMultiply;
	localStorage.baseLumberjackWPS = baseLumberjackWPS;
	localStorage.baseLumberjackMPS = baseLumberjackMPS;
	localStorage.baseLumberjackTPS = baseLumberjackTPS;

	//sawmill per second values
	localStorage.sawmillWPSMultiply = sawmillWPSMultiply;
	localStorage.sawmillMPSMultiply = sawmillMPSMultiply;
	localStorage.sawmillPPSMultiply = sawmillPPSMultiply;
	localStorage.baseSawmillWPS = baseSawmillWPS;
	localStorage.baseSawmillMPS = baseSawmillMPS;
	localStorage.baseSawmillPPS = baseSawmillPPS;

	//plantation per time values
	localStorage.plantationTPSAdd = plantationTPSAdd;
	localStorage.plantationTPSMultiply = plantationTPSMultiply;
	localStorage.basePlantationTPS = basePlantationTPS;

	//Stats
	localStorage.population = population;
	localStorage.treesCutDown = treesCutDown;

	//Automation upgrade effects
	localStorage.autoLumberjackInput = autoLumberjackInput;

	localStorage.lumberjackPrice = lumberjackPrice;
	localStorage.plantationPrice = plantationPrice;

	localStorage.secondsPlayed = secondsPlayed;
	localStorage.days = days;

	localStorage.plantationOwned = plantationOwned;

	localStorage.secondsPerTree = secondsPerTree;

	localStorage.plantationAmount = plantationAmount;

	localStorage.initialTimer = initialTimer;

	localStorage.sawmillOn = sawmillOn;
	localStorage.lumberjackOn = lumberjackOn;

	localStorage.lJackSpeed = lJackSpeed;

	localStorage.planksProduced = planksProduced;

	localStorage.plantationTreeRange = plantationTreeRange;

 	messageDisplay('Game saved.');
}

// Saves when exiting or refreshing
var saveTimer = 0;
window.onbeforeunload = function exitSave() {
	//save();
	if(saveTimer > 300) {
		alert('You have not saved in the last five minutes, are you sure you want to close this tab?');
	}
};

// Save game manually
$("#saveGame").click(async function() {
	save();
	saveTimer = 0;
});

// Saves automatically every set amount of time (currently 5 minutes)
setInterval(function saveRepeat() {
	save();
	document.getElementById("inputAmount").value = "";
}, 300000);


$(window).bind('keydown', function(event) {
    if (event.ctrlKey || event.metaKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
        case 's':
            event.preventDefault();
            save();
            break;
        case '1':
            event.preventDefault();
            sellWood(1);
            break;
        case '2':
            event.preventDefault();
            sellWood(2);
            break;
        case '3':
            event.preventDefault();
            sellWood(3);
            break;
        case '4':
            event.preventDefault();
            sellWood(4);
            break;
        case '5':
            event.preventDefault();
            sellWood(5);
            break;
        case '6':
            event.preventDefault();
            sellWood(6);
            break;
        case '7':
            event.preventDefault();
            sellWood(7);
            break;
        case '8':
            event.preventDefault();
            sellWood(8);
            break;
        case '9':
            event.preventDefault();
            sellWood(9);
            break;
        }
    }
});

// Wipes saved data and relads the page
$("#restartGame").click(async function() {
	localStorage.clear();
	location.reload();
});


// Used to delay... certain things... :)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var woodCount = 0;
var totalTreeAmount = 0;
// Basically updates stuff
setInterval(function repeat() {
	document.getElementById('WoodPerTree').innerHTML = 'Wood Per Tree: ' + WPT;
	document.getElementById('cutDown').innerHTML = 'Trees cut down: ' + treesCutDown;

	// Only allows you to pick a tile if the Lumberjack has money
	// To prevent a weird bug, will look into. Probably.
	// if(ljMoney > 0) {
	// 	showItem('ljChooseTile');
	// }
	// else {
	// 	hideItem('ljChooseTile');
	// }

	// Changing the cursor when picking land
	if(chooseActive) {
		document.getElementById("sectionRight").style.cursor = "copy";
		document.getElementById("sectionRight2").style.cursor = "copy";
		document.getElementById("sectionRight3").style.cursor = "copy";
	}
	if(chooseActive == false) {
		document.getElementById("sectionRight").style.cursor = "auto";
		document.getElementById("sectionRight2").style.cursor = "auto";
		document.getElementById("sectionRight3").style.cursor = "auto";
	}

	if(smillMoney > 0 && smillOak >= 4 || smillSpruce >= 4) {
		document.getElementById('sawmill').src = 'images/sawmillActive.png';
	} else {
		document.getElementById('sawmill').src = 'images/sawmill.png';
	}

	//document.getElementById("smillMoneyAmount").innerHTML = 'Money: ' + Math.ceil(smillMoney) + '$';

	if(ljOak >= 1) { // Wood made with the lumberjack goes directly into player's bank
		withdrawWood('withdraw', 'oak');
	}
	if(ljSpruce >= 1) {
		withdrawWood('withdraw', 'spruce');
	}

	if(smillPlanks) {
		withdrawPlanks('withdraw');
	}


	if(resourceType == 'oak') {
		bright('oakWoodIcon');
	}
	if(resourceType == 'spruce') {
		bright('spruceWoodIcon');
	}
	if(resourceType == 'planks') {
		bright('plank');
	}

	document.getElementById("lumberjackPrice").innerHTML = lumberjackPrice + '$';

	if(days < 1) {
		document.getElementById("timePlayed").innerHTML = 'Time played: ' + new Date(secondsPlayed * 1000).toISOString().substr(11, 8);
	}else if(days == 1) {
		document.getElementById("timePlayed").innerHTML = 'Time played: ' + days + ' day and ' + new Date(secondsPlayed * 1000).toISOString().substr(11, 8);
	}else {
		document.getElementById("timePlayed").innerHTML = 'Time played: ' + days + ' days and ' + new Date(secondsPlayed * 1000).toISOString().substr(11, 8);
	}
 
}, 100);

/*=====================================================================================
									 UPGRADES
=======================================================================================*/
var suffixes = [' million', ' billion', ' trillion', ' quadrillion'];
function formatNumber(number) {
	if(number < 100000000000000000069000000000000) { // Actually 1000000, just need to fix
		return number;
	}
	var arrayIndex = -4;
	number++;
	for(var compare = 1; arrayIndex < 20; compare *= 1000){
		arrayIndex++;
		if(compare >= number) {
			compare /= 1000;
			number /= compare
			number = Math.round(number * 100) / 100
			return number + suffixes[arrayIndex];
		}
	}// formatNumber(1000000)
}


async function animateNumber(variable, id) {

	var displayedValue = document.getElementById(id).innerHTML; // Finds the old value
	displayedValue = displayedValue.replace(/\D/g,''); // Strips all non-numerical characters from string
	displayedValue = Number(displayedValue); // Turns string into number

	var v = variable;
	var actualValue = Math.ceil(window[v]); 
	
	if(displayedValue < actualValue) {
	 document.getElementById(id).innerHTML = formatNumber(Math.ceil(displayedValue+=(actualValue-displayedValue)*0.2));
	}
	if(displayedValue > actualValue) {
	document.getElementById(id).innerHTML = formatNumber(Math.floor(displayedValue+=(actualValue-displayedValue)*0.2));
	}
}

setInterval(function () {
	animateNumber('money', 'moneyAmount');
	animateNumber('oakWood', 'oakWoodAmount');
	animateNumber('spruceWood', 'spruceWoodAmount');
	animateNumber('planks', 'planksAmount');
	//animateNumber('ljMoney', 'ljMoneyAmount');
	animateNumber('smillMoney', 'smillMoneyAmount');
	animateNumber('smillOak', 'smillOakAmount');
	animateNumber('smillSpruce', 'smillSpruceAmount');
	animateNumber('lumberjackAmount', 'lumberjackAmount');
	animateNumber('planksProduced', 'planksProduced');


	p = smillPercentage;
	p /= 100;
	m = money;
	var percent = m * p;
	calculatedSawmillPercent = Math.floor(percent);

	//document.getElementById("SawmillPercent").innerHTML = smillPercentage + '%:' + calculatedSawmillPercent;
}, 33);



//Axe upgrades: 0 - 50
//Sawmill upgrades: 51 - 100


var ownedUpgrades = [];
for(var ii = 0; ii < 500; ii++){ // Fills the array with values because the splice method only works with a filled array
	ownedUpgrades.splice(0+ii, 0, 1+ii);
}

function upgradePurchase(price, id) {
	if(money >= price) {
		hideItem(id);
		if(id <= 50) {
			spawnUpgrade(id, 2, 1);
		}
		if(id >= 51 && id <= 100) {
			spawnUpgrade(id, 3, 1);
		}
		if(id >= 101 && id <= 150) {
			spawnUpgrade(id, 2, 1);
		}
		if(id >= 151 && id <= 200) {
			spawnUpgrade(id, 4, 1);
		}
		if(id >= 201 && id <= 250) {
			spawnUpgrade(id, 5, 1);
		}
		var index = ownedUpgrades.indexOf(id+1);
		ownedUpgrades[index] = 0;
		id = id + 'owned';
	}
	else {
		messageDisplay('Not enough money!');
	}
}

function spawnUpgrade(id, location, purchase) {
	var object = whichObject(id);
	if(object != undefined) {
		if(purchase == 1) {
			money -= object.price;
			messageDisplay(object.name + ' purchased!');
		}

		newUpgrade(object.name, object.image, object.info, object.price, id, location, object.effect);
	}
}

function upgradeEffect(number, price) {
	if(price <= money) {
		if(number == 1) {
			axePercent += 0.0001;
		}
		if(number == 2) {
			lumberjackDouble();
			lJackSpeed -= 100;
		}
		if(number == 3) {
			sawmillDouble();
		}
		if(number == 4) {
			baseWPT++;
		}
		if(number == 5) {
			autoLumberjackInput++;
		}
		if(number == 6) {
			localStorage.chainsaw = 1;
			showItem('chainsawTool');
		}
		if(number == 7) {
			secondsPerTree = 120;
			treeTimer = Math.floor(Math.random() * secondsPerTree);
		}
	}
}

function newUpgrade(name, image, info, price, id, location, effect) {
	if(effect == 'axePercent') {
		var effectInfo = '+0.01% of your total money in bank for each tree cut down.'
		var effectId = 1
	}
	if(effect == 'lumberjackDouble') {
		var effectInfo = 'Doubles lumberjack efficiency.'
		var effectId = 2
	}
	if(effect == 'sawmillDouble') {
		var effectInfo = 'Sawmill is twice as efficient.'
		var effectId = 3
	}
	if(effect == 'axeAdd') {
		var effectInfo = '+1 wood per tree.'
		var effectId = 4
	}
	if(effect == 'autoLumberjackInput') {
		var effectInfo = '+1 dollars transferred from bank to lumberjack every second.'
		var effectId = 5
	}
	if(effect == 'unlockChainsaw') {
		var effectInfo = 'Cut trees by simply holding down the left button. Yields 50% more wood than the axe at the cost of gasoline. Select in tool tab.'
		var effectId = 6
	}
	if(effect == 'plantationFaster') {
		var effectInfo = 'Tree growth takes a maximum of 2 minutes.'
		var effectId = 7
	}


	if(location == 1) { // When the upgrade is firts created
		var $itemSection = $(".itemSection");
		var button = ');upgradePurchase(';
	}
	else if(location == 2) { // A copy placed in the "owned" section
		var $itemSection = $(".axeUpgradeSection");
		var button = "";
	}
	else if(location == 3) {
		var $itemSection = $(".sawmillSection");
		var button = "";
	}
	else if(location == 4) {
		var $itemSection = $(".lumberjackSection");
		var button = "";
	}
	else if(location == 5) {
		var $itemSection = $(".plantationSection");
		var button = "";
	}
	 	str = '<div class="tooltip">' 
	        + '<img class="small" id="'
	        + id
	        + '" onclick="upgradeEffect('
	        + effectId
	        + ', '
	        + price
	        + button
	        + price
	        + ', '
	        + id
	        + ');"'
	        + ' src='
            + image
            + '>'
            + '<div class="tooltiptext">'
            + '<ins><u><i>'
            + name
            + '</i></u></ins>'
            + '<div>Price: <font color="#11ad14">'
            + price + '$'
            + '</font><div>'
            + '<div class="effect">'
            + effectInfo
            + '</div>'
            + '<div class="description">'
            + info
            + '</div>'
            + '</div>'
            + '</div>';
		html = $.parseHTML(str),
	 
	// Append the parsed HTML
	$itemSection.append(html);

}
function whichObject(number) {
	if(number <= number) {
		var object = window['axeUpgrade' + number]; //window[] turns the string into a variable name
	}
	if(number >= 51 && number <= 100) {
		if(localStorage.sawmill == 1) {
			var object = window['sawmillUpgrade' + number];
		}
	}
	if(number >= 101 && number <= 150) {
		var object = window['automationUpgrade' + number];
	}
	if(number >= 151 && number <= 200) {
		var object = window['lumberjackUpgrade' + number];
	}
	if(number >= 201 && number <= 250) {
		if(localStorage.plantationOwned == 1 || plantationOwned == 1) {
			var object = window['plantationUpgrade' + number];
		}
	}

	return object;
}

setInterval(function () {
	unlocker();
}, 500);

var unlockedUpgrades = {};
function unlocker() {
	for(var i = 1; i < 500; i++){
		var object = whichObject(i);
		if(object != undefined) {
			//Calculating 25% of the price
			//Upgrades are unlocked when you have 75% or more of its price in bank
			var p = object.price;
			var quart = p /= 4;
			p = object.price;
			var price = p -= quart;
			// Using the eval method allows for dynamic if statements
			eval("if(money >= price && ownedUpgrades[" + i + "] != 0 && unlockedUpgrades.upgrade" + i + " != 1){ unlockedUpgrades.upgrade" + i + " = 1; spawnUpgrade(" + i + ", 1);}");
		}
	}
}

function buildingUnlocker() {
	if(money >= 250) {
		
	}
}

/* Template
var axeUpgrade = {
	name:    ,
	image:   ,
	info:    ,
	effect:  ,
	price:   ,
	id:      
};
*/

//=========AXE=========
var axeUpgrade1 = {
	name:    'Hatchet',
	image:   '"images/axe.png"',
	info:    'A standard axe, its grip feels good in your hand.',
	effect:  'axeAdd',
	price:   100,
	id:      1
};

var axeUpgrade2 = {
	name:    'Firefighter axe',
	image:   '"images/axe.png"',
	info:    'Why would you cut wood with this?',
	effect:  'axeAdd',
	price:   200,
	id:      2
};

var axeUpgrade3 = {
	name:    'Iron axe',
	image:   '"images/axe.png"',
	info:    'Named after the one from Minecraft',
	effect:  'axeAdd',
	price:   500,
	id:      3
};

var axeUpgrade4 = {
	name:    'Cleaving axe',
	image:   '"images/axe.png"',
	info:    'A heavy, wedge shaped axe used to split wood lengthways',
	effect:  'axeAdd',
	price:   1000,
	id:      4
};

var axeUpgrade5 = {
	name:    'Felling axe',
	image:   '"images/axe.png"',
	info:    'Much like a hatched, but heavier. Its weight allows for a heavy swing',
	effect:  'axeAdd',
	price:   2000,
	id:      5
};

var axeUpgrade6 = {
	name:    'Splitting maul',
	image:   '"images/axe.png"',
	info:    'Heavy like a felling axe, this axe is used to split wood into kindling for bonfires.',
	effect:  'axeAdd',
	price:   5000,
	id:      6
};

var axeUpgrade7 = {
	name:    'Tomahawk',
	image:   '"images/axe.png"',
	info:    'Small, lightwieght and perfect for a camping trip!',
	effect:  'axeAdd',
	price:   10000,
	id:      7
};

var axeUpgrade50 = {
	name:    'Chainsaw',
	image:   '"images/chainsaw.png"',
	info:    'No more clicking to cut trees!',
	effect:  'unlockChainsaw',
	price:   5000,
	id:      50
};

//=========SAWMILL=========
var sawmillUpgrade51 = {
	name:    'Better machinery',
	image:   '"https://art.pixilart.com/be7630d7b1fa991.png"',
	info:    'Better gears allow for faster saws.',
	effect:  'sawmillDouble',
	price:   2000,
	id:      51
};

var sawmillUpgrade52 = {
	name:    'How do you cut the sea in half? With a sea-saw',
	image:   '"https://art.pixilart.com/30f75d2e3951da5.png"',
	info:    'Better gears allow for faster saws.',
	effect:  'sawmillDouble',
	price:   10000,
	id:      52
};

var sawmillUpgrade53 = {
	name:    'Upgrade 3',
	image:   '"https://art.pixilart.com/927d9032bc5f7e4.png"',
	info:    'Better gears allow for faster saws.',
	effect:  'sawmillDouble',
	price:   100000,
	id:      53
};

//=========AUTOMATION=========


//=========LUMBERJACK=========
var lumberjackUpgrade151 = {
	name:    'Cocaine supply',
	image:   '"images/pills.png"',
	info:    'You start to regularly administer cocaine to your lumberjacks in order to increase their work speed.',
	effect: 'lumberjackDouble',
	price:   5000,
	id:      151
};

//=========PLANTATION=========
var plantationUpgrade201 = {
	name:    'Genetically modified trees',
	image:   '"images/grayCog.png"',
	info:    'Conventional tree growth is way too slow. Genetically altered trees grow 10 times a fast!',
	effect:  'plantationFaster',
	price:    oneDec(Math.random() * 326),
	id:      201
};
var plantationUpgrade202 = {
	name:    'Supertrees',
	image:   '"images/greenCog.png"',
	info:    'Up to 2 minutes per batch? Are you crazy?! Half that!',
	effect:  'plantationFaster',
	price:    oneDec(Math.random() * 1322),
	id:      202
};

var lumberjackPrice = 10;
var lumberjackAmount = 0;

var plantationPrice = 500;
var plantationAmount = 0;
//Items, buildings and such start from 0
function shopBuy(itemNum) {
	switch(itemNum) {
		case 0:
			if(money >= 500) {
				buyLand();
			} else {
				notEnough();
			}
			break;
		case 1:
			if(localStorage.sawmill == 1 || money >= 3000 && oakWood >= 200) {
				hideItem("sawmillBuilding");
				showItem("sawmill");
				showItem("plank");
				showItem("planksAmount");
				showItem("sectionRight2");
				showItem("sectionRight3");
				showItem("sawmillInputs");
				hideItem("lumberjackInputs");
				if(localStorage.sawmill == undefined) {
					money -= 3000;
					oakWood -= 200;
				}
				//sawmillBar();
				//move();
				localStorage.sawmill = 1;
			}
			else {
				messageDisplay('Insufficient funds!');
			}
			break;
		case 2:
			if(money >= lumberjackPrice) {
				if(lumberjackAmount == 0) {
					activateLumberjack();
				}
				money -= lumberjackPrice;
				//hideItem("lumImage");
				lumberjackAmount++;
				lumberjackBuy();
				localStorage.lumberjack = lumberjackAmount;
			}
			break;
		case 3:
			if(money >= plantationPrice) {
					plantationBuy();
				if(plantationOwned != 1) {
					activatePlantation();
					plantationOwned = 1;
				}
			}
			break;
	}
}

function activatePlantation() {
	showItem("plantation");
	showItem("plantationInputs");
	//hideItem('plantationIcon');
	showItem("sectionRight2");
	showItem("sectionRight3");
}

function activateLumberjack() {
	lumberjackGO = true;
	showItem("treeAndLumber");
	showItem("sectionRight2");
	showItem("lumberjackInputs");
	showItem("sectionRight3");
	hideItem("sawmillInputs");
	if(money >= 0.1 && lumberjackOn == 1) { // Makes sure the animation starts if it should
		if(whichTile > 0) { // If a tile is chosen
			lumberJack();
		}
	}
}


//   					Axe upgrades
var WPT = 0; // Wood per tree
var baseWPT = 5;
var axePercent = 0;
var woodYieldMultiplier = 1;
setInterval(function axePercentUpgrade() {
	m = money;
	m *= axePercent;
	b = baseWPT;
	WPT = b += Math.trunc(m);
	WPT *= woodYieldMultiplier;
}, 100);


//						Lumberjack upgrades
var lumberjackWPS = 0;
var lumberjackMPS = 0;
var lumberjackTPS = 0;

var baseLumberjackWPS = 0; // Wood per second
var baseLumberjackMPS = 0; // Money per second
var baseLumberjackTPS = 0; // Trees per second
function lumberjackBuy() {
	random = Math.random() + 1.1;
	if(random <= 1.4) {
		lumberjackPrice *= random;
	} else {
		lumberjackPrice *= 1.1;
	}
	lumberjackPrice = Math.floor(lumberjackPrice);
	baseLumberjackWPS += 0.4;
	baseLumberjackMPS += -0.1;
	baseLumberjackTPS += -0.1;
}
setInterval(function lumberjackPSCalculator() { // Calculates per second values for lumberjack
	//Wood per second
	a = baseLumberjackWPS;
	wps = a * lumberjackWPSMultiply
	lumberjackWPS = wps;
	lumberjackWPS = oneDec(lumberjackWPS);
	//Money per second
	b = baseLumberjackMPS;
	mps = b * lumberjackMPSMultiply
	lumberjackMPS = mps;
	lumberjackMPS = oneDec(lumberjackMPS);
	//Trees per second
	c = baseLumberjackTPS;
	tps = c * lumberjackTPSMultiply
	lumberjackTPS = tps;
	lumberjackTPS = oneDec(lumberjackTPS);
}, 100);

var lumberjackWPSMultiply = 1;
var lumberjackMPSMultiply = 1;
var lumberjackTPSMultiply = 1;
function lumberjackDouble() {
	lumberjackWPSMultiply *= 2;
	lumberjackMPSMultiply *= 2;
	lumberjackTPSMultiply *= 2;
}


var sawmillWPS = 0;
var sawmillMPS = 0;
var sawmillPPS = 0; // Planks per second

var baseSawmillWPS = -2;
var baseSawmillMPS = -1;
var baseSawmillPPS = 2;
setInterval(function sawmillPSCalculator() { // Calculates per second values for lumberjack
	//Wood per second
	a = baseSawmillWPS;
	wps = a * sawmillWPSMultiply
	sawmillWPS = wps;
	//Money per second
	b = baseSawmillMPS;
	mps = b * sawmillMPSMultiply
	sawmillMPS = mps;
	//Trees per second
	c = baseSawmillPPS;
	pps = c * sawmillPPSMultiply
	sawmillPPS = pps;
}, 100);


sawmillPPSMultiply = 1;
sawmillMPSMultiply = 1;
sawmillWPSMultiply = 1;
function sawmillDouble() {
	sawmillPPSMultiply *= 2;
	sawmillMPSMultiply *= 2;
	sawmillWPSMultiply *= 2;
}

var smillPlanks = 0;
var secondsPlayed = 0;
var days = 0;
var planksProduced = 0;
setInterval(function addValue() {
	if(localStorage.sawmill == 1) {
		sawmillInputMoney(Math.abs(sawmillMPS));
		sawmillInputWood(Math.abs(sawmillWPS)); 
		var o = smillOak;
		var s = smillSpruce;
		var smillWoodCount = o += s;
		var wps = sawmillWPS;
		var positiveWPS = Math.abs(wps);
		if(smillWoodCount > 0 && smillMoney > 0) { // Sawmill
			planksProduced += oneDec(sawmillPPS);
			if(smillOak > smillSpruce || smillOak == smillSpruce) {
				if(smillOak >= positiveWPS) {
					smillOak = oneDec(smillOak);
					smillOak += oneDec(sawmillWPS);

					smillPlanks += oneDec(sawmillPPS);
					smillMoney += oneDec(sawmillMPS);
				}
			} else if(smillSpruce > smillOak) {
				if(smillSpruce >= positiveWPS) {
					smillSpruce = oneDec(smillSpruce);
					smillSpruce += oneDec(sawmillWPS);

					smillPlanks += oneDec(sawmillPPS);
					smillMoney += oneDec(sawmillMPS);
				}
			}
		}
	}

	// Unrelated to the sawmill, just chucked in here for the loop
	// Incremetally increase varible to create a timer to check if you have saved
	saveTimer++;

	if(secondsPlayed < 86400) {
		secondsPlayed++;
	} else {
		secondsPlayed = 1;
		days++;
	}
		
}, 1000);

var autoLumberjackInput;
var lumberjackGO2 = true;
var lumberjackGO = false;
var ljTrees = 0;
var activeType = "";
var lumberjackActive = '';

var testVal = 0;
setInterval(function addLumValue() {
	autoLumberjackInput = Math.abs(lumberjackMPS);
	var positiveMPS = Math.abs(lumberjackMPS);
	var positiveTPS = Math.abs(lumberjackTPS);

	if(whichTile == 1) {
		ljTrees = tile1Trees;
	}
	if(whichTile == 2) {
		ljTrees = tile2Trees;
	}

	if(ljTrees >= positiveTPS) {
		lumberjackInputMoney(autoLumberjackInput)
	}

	if(ljMoney >= positiveMPS && ljTrees >= positiveTPS && lumberjackOn == 1) { // Lumberjack
		lumberjackActive = true;
		if(whichTile == 1) {
			tile1Trees += lumberjackTPS;
			ljOak += lumberjackWPS;
		}
		if(whichTile == 2) {
			tile2Trees += lumberjackTPS;
			ljSpruce += lumberjackWPS;
		}
		ljMoney += lumberjackMPS;
		testVal += lumberjackMPS;

		// Limiting all resource values to one decimal
		ljMoney = oneDec(ljMoney);
		tile1Trees = oneDec(tile1Trees);
		tile2Trees = oneDec(tile2Trees);
		ljOak = oneDec(ljOak);
		ljSpruce = oneDec(ljSpruce);

		lumberjackGO = true;
		if(lumberjackGO2 == false) {
			lumberJack();
			lumberjackGO2 = true;
		}
	}
	else {
		lumberjackGO = false;
		lumberjackGO2 = false;
	}

}, 1000);




var plantationOwned = 0;

var basePlantationTPS = 0;
function plantationBuy() {
	basePlantationTPS += 10;
	plantationAmount++;
	money -= plantationPrice;
}

var plantationTPSMultiply = 1;
var plantationTPSAdd = 0;
var plantationTPS = 0;
setInterval(function plantationPSCalculator() { // Calculates per second values for lumberjack
	a = basePlantationTPS;
	tps = a * plantationTPSMultiply;
	plantationTPS = tps + plantationTPSAdd;
	b = plantationTPSAdd * plantationAmount;
	plantationTPS += b;
}, 100);


var secondsPerTree = 7200 // - two hours

var plantationSize = 100;
var treeTimer = 0;

var treeTypes = ['oak', 'spruce'];

var treesGrown;

var plantationTreeRange = 1
	
setInterval(function addPlantationValue() {
	if(plantationOwned == 1) {
		if(treeTimer <= 0) {
			whichType = Math.floor(Math.random() * plantationTreeRange)
			var plantationTile = treeTypes[whichType];
			messageDisplay('+' + plantationTPS + ' ' + plantationTile + ' trees!');
			if(plantationTile == 'oak') {
				tile1Trees += plantationTPS;
			}
			if(plantationTile == 'spruce') {
				tile2Trees += plantationTPS;
			}
			treesGrown += plantationTPS;

			random = Math.floor(Math.random() * 101)
			s = secondsPerTree;
			seconds = secondsPerTree;
			if(random <= 5) {
				s /= 1
			}
			else if(random <= 25 && random > 5) {
				s /= 2
			}
			else if(random <= 50 && random > 25) {
				s /= 4
			}
			else if(random <= 75 && random > 50) {
				s /= 6
			}
			else if(random <= 100 && random > 75) {
				s = 0;
			}
			seconds -= s;
			if(Math.floor(Math.random() * 101) < 50) {
				seconds += random;
				seconds += Math.floor(Math.random() * random);
				seconds -= Math.floor(Math.random() * seconds);
			}

			seconds = Math.floor(seconds);

			treeTimer = seconds;
			initialTimer = treeTimer;
			if(treeTimer == 0) {
				messageDisplay('Lucky! These trees reached maturity immediately!');
			}
		} else {
			treeTimer -= 1;
			localStorage.treeTimer = treeTimer;
			document.getElementById("treeSeconds").innerHTML = 'Time left:<br>' + new Date(treeTimer * 1000).toISOString().substr(11, 8);
		}
	}
}, 1000);

var initialTimer;
setInterval(function plantationBar() {
	var timePercent = treeTimer
	c = initialTimer - treeTimer;
	width = c / initialTimer * 100;
	width = oneDec(width);
    document.getElementById("plantationBar").style.width = width + '%';

    document.getElementById("plantationBar").innerHTML = width + '%';
}, 100);


// handy time formatter
// new Date(SECONDS * 1000).toISOString().substr(11, 8);


/*=====================================================================================
									 MISCELLANEOUS
=======================================================================================*/

function hideTooltip() {
	hideItem('tooltip');
}

function oneDec(number) { // Limits a number to one decimal
	return Math.round(number * 10) / 10;
}

function help() {
	messageDisplay('Click an object to get more information (not yet functional)');
}


function shopSwitch(item) {
	hideItem('itemShop');
	hideItem('ownedItems');
	hideItem('Marketsection');
	hideItem('stocksSection');
	// changeColor('shopBtn', 'brown');
	// changeColor('ownedBtn', 'brown');
	// changeColor('marketBtn', 'brown');
	// changeColor('stocksBtn', 'brown');
switch(item){
		case 10:
			showItem('itemShop');
			// changeColor('shopBtn', 'blue');
			break;
		case 20:
			showItem('ownedItems');
			//changeColor('ownedBtn', 'blue');
			break;
		case 30:
			showItem('Marketsection');
			//changeColor('marketBtn', 'blue');
			break;
		case 40:
			showItem('stocksSection');
			//changeColor('stocksBtn', 'blue');
			break;
	}
}

function infoSwitch(item) {
	hideItem('infoSection');
	hideItem('landSection');
switch(item){
		case 10:
			showItem('infoSection');
			break;
		case 20:
			showItem('landSection');
			break;
		case 30:
			break;
		case 40:
			break;
	}
}

function infoSwitch(item) {
	hideItem('infoSection');
	hideItem('landSection');
switch(item){
		case 10:
			showItem('infoSection');
			break;
		case 20:
			showItem('landSection');
			break;
		case 30:
			break;
		case 40:
			break;
	}
}

function changeColor(ID, color) {
    var x = document.getElementById(ID);
    x.style.backgroundColor = color;
}

// Allows you to use the "enter" key when writing sell amount
document.onkeydown = function(e){
    e = e || window.event;
    var key = e.which || e.keyCode;
    if(key===13){
    	if(document.getElementById("inputAmount").value != "") {
 			sellWood();
 		}
 		//if(document.getElementById("ljMoneyInput").value != "") {
 		//	lumberjackInputMoney();
 		//}
    }
}

// Adds outline to element that have transparency around them
function outline(ID, clear) {
    var x = document.getElementById(ID);
    if(x.style.filter == "brightness(100%)") {
    	x.style.filter =  "brightness(125%)";
    }
    else {
    	x.style.filter = "brightness(100%)";
    }
    if(clear == 'clear') {
    	x.style.filter = "brightness(100%)";
    }
}

function bright(ID) {
	var x = document.getElementById(ID);
	x.style.filter =  "brightness(125%)"
}

// Hides html elements
function hideItem(ID) {
    var x = document.getElementById(ID);
    x.style.display = "none";
}

// Shows html elements
function showItem(ID) {
    var x = document.getElementById(ID);
    x.style.display = "block";
}

// Used to switch between dispalying the different shops
function hideShop() {
    var x = document.getElementById(itemShop);
    x.style.display = "none";
}

function notEnough() {
	messageDisplay('Not enough money!', '#CC0000');
}

// Not currently in use, was meant to create randomized fields, might come back to it
var treeGenArray = ['', '', ''];
function randomTree () {
	var randomTreeGen = treeGenArray.splice(Math.floor(Math.random() * treeGenArray.length));
}

// Used for delaying each axe swing
var delayTime = 10; //usually 750, 0 when testing the game
var canGo = true;
// Upgrade affected variables
var woodValue = 2; // The value of each individual piece of wood. Increased using upgrades (not yet implemented)
var plankValue = 4;
var oakTreeAmount = 50; // Amount of trees owned
var spruceTreeAmount = 0;
// Currency variables and such
var treeStage = 0;
var assurance = 0;

// Shows the cheat interface
async function showCheats() {
    var x = document.getElementById("upgradesContainer");
    if (x.style.display === "block") {
        x.style.display = "none";
        document.getElementById("showCheats").innerHTML = "Cheats";
    } else {
        x.style.display = "block";
        document.getElementById("showCheats").innerHTML = "Hide cheats";
        if(Math.floor(Math.random() * 101) > 75) {
        	messageDisplay('Filthy cheater...')
    	}
    	else if(Math.floor(Math.random() * 101) > 50) {
    		messageDisplay("Please don't.")
    	}
    	else if(Math.floor(Math.random() * 101) > 50) {
    		messageDisplay("Oh, you're one of those... okay.")
    	}
    	else {
    		messageDisplay("Initializing self destruct in:")
    		await sleep(1000);
    		messageDisplay('...5...')
    		await sleep(1000);
    		messageDisplay('...4...')
    		await sleep(1000);
    		messageDisplay('...3...')
    		await sleep(1000);
    		messageDisplay('...2...')
    		await sleep(1000);
    		messageDisplay('Error. Self destruct aborted.')
    	}
    }
}

// Realized there wasn't really a need for this but I'll keep it here anyway
	// Restrict input field to numbers
	// function isNumberKey(evt){
	//     var charCode = (evt.which) ? evt.which : event.keyCode
	//     if (charCode > 31 && (charCode < 48 || charCode > 57))
	//         return false;
	//     return true;
	// }

// Prevents certain characters from being entered into the input field
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    var charStr = String.fromCharCode(charCode);
    if (charStr == "-") {
        return false; 
    }
    if (charStr == ".") {
        return false; 
    }
    if (charStr == ",") {
        return false; 
    }
    else {
    	return true;
	}
}

var population = 7691230161;
setInterval(function () {
	if(Math.floor(Math.random() * 100) <= 90) {
		population = population += Math.floor(Math.random() * 2);
	}
	else {
		population--;
	}

	document.getElementById('Population').innerHTML = 'Population: ' + population;
}, 250);

// Booleans used for each tree type
var oakTree = true;
var spruceTree = false;

// Not currently in use, looks too buggy
var randomBackground = "";
function changeBackground() {
	var backgroundArray = ['https://i.imgur.com/5zTMOb3.png', 'https://i.imgur.com/EhUxkF0.png'];
	randomBackground = '"' + backgroundArray.splice(Math.floor(Math.random() * backgroundArray.length)) + '"';
}

/*=====================================================================================
									 BIG TREE
=======================================================================================*/
var mouseDown = 0;
document.body.onmousedown = function() { 
    mouseDown = 1;
}
document.body.onmouseup = function() {
    mouseDown = 0;
}

// Changes the cursor to an axe icon when hovering over tree
function changeToAxe() {
	if(activeTool == 'axe') {
		if(mouseDown == 0) {
			clickTreeImage.style.cursor = "url('images/axe.png'), auto";
		}
		if(mouseDown == 1) {
			clickTreeImage.style.cursor = "url('https://i.imgur.com/UOF9oDe.png'), auto";
		}
	}
	if(activeTool == 'chainsaw') {
		clickTreeImage.style.cursor = "url('images/chainsaw48.png'), auto";
	}
}

var activeTool = 'axe';
function chooseTool(which) {
	switch(which){
	case 0:
		activeTool = 'axe';
		woodYieldMultiplier = 1;
		break;
	case 1:
		if(activeTool == 'axe') {
			woodYieldMultiplier *= 1.5;
		}
		activeTool = 'chainsaw';
		break;
	}
}

var chainsawOn = false;
var cooldown = false;

async function cutTree() {
	if(activeTool == 'chainsaw') {
		if(cooldown == false) {
			clickTree();
			cooldown = true;
			await sleep(1500);
			cooldown = false;
		}
	}
	if(activeTool == 'axe') {
		clickTree();
	}
}

async function clickTree() {
		if(activeTool == 'axe') {
			axeTree();
			//document.getElementById('cutAudio').play();
		}
		if(activeTool == 'chainsaw') {
			await sleep(300);
			if(mouseDown == 1) {
				axeTree();
			}
		}
}

function axeTree() {
	if(tile1Trees > 0 && chosenTile == 1) {
		tree();
	}
	else if(tile2Trees > 0 && chosenTile == 2) {
		tree();
	} else {
		messageDisplay("No more trees left!");
	}
}

var cutStrenght = 1;
var treesCutDown = 0;
function tree() {
if(treeStage == 0 && canGo) {
			if(oakTree) {
			imageReplace('clickTreeImage', 'https://i.imgur.com/9dYxQOs.png');
			}
			else if(spruceTree) {
			imageReplace('clickTreeImage', 'https://i.imgur.com/BQMR8Uz.png');
			}
			treeStage += cutStrenght;
			canGo = false;
			setTimeout(function () {
	        	canGo = true;
	        }, delayTime)
		}
		else if(treeStage == 1 && canGo) {
			if(oakTree) {
				imageReplace('clickTreeImage', 'https://i.imgur.com/uUXjx0k.png');
			}
			else if(spruceTree) {
				imageReplace('clickTreeImage', 'https://i.imgur.com/uyMMK5D.png');
			}
			treeStage += cutStrenght;
			canGo = false;
			setTimeout(function () {
	        	canGo = true;
	        }, delayTime)
		}
		else if(treeStage == 2 && canGo) {
			if(oakTree) {
				imageReplace('clickTreeImage', 'https://i.imgur.com/RUmLW5d.png');
			}
			else if(spruceTree) {
				imageReplace('clickTreeImage', 'https://i.imgur.com/a9TLifm.png');
			}
			treeStage += cutStrenght;
			canGo = false;
			setTimeout(function () {
	        	canGo = true;
	        }, delayTime)
		}
		else if(treeStage == 3 && canGo) {
			if(oakTree) {
				imageReplace('clickTreeImage', 'https://i.imgur.com/TLJzfH6.png');
			}
			else if(spruceTree) {
				imageReplace('clickTreeImage', 'https://i.imgur.com/kFHe3gB.png');
				treeStage += 2 // Skipping two stages because spruce wood takes shorter
			}
			treeStage += cutStrenght;
			canGo = false;
			setTimeout(function () {
	        	canGo = true;
	        }, delayTime)
		}
		else if(treeStage == 4 && canGo && spruceTree != true) {
			imageReplace('clickTreeImage', 'https://i.imgur.com/9rr9haX.png');
			treeStage += cutStrenght;
			canGo = false;
			setTimeout(function () {
	        	canGo = true;
	        }, delayTime)
		}
		else if(treeStage == 5 && canGo && spruceTree != true) {
			imageReplace('clickTreeImage', 'https://i.imgur.com/ZRlTtkj.png');
			treeStage += cutStrenght;
			canGo = false;
			setTimeout(function () {
	        	canGo = true;
	        }, delayTime)
		}
		else if(treeStage >= 6 && canGo) {
			if(oakTree) {
				var oakArray = ['https://i.imgur.com/YGtLRnA.png', 'https://i.imgur.com/5A2LW1e.png']; //makes the last image random
				var randomOak = oakArray.splice(Math.floor(Math.random() * oakArray.length));
				document.getElementById('clickTreeImage').src = randomOak;
			}
			else if(spruceTree) {
				var spruceArray = ['https://i.imgur.com/pT4aSQQ.png', 'https://i.imgur.com/7s14wWl.png'];
				var randomSpruce = spruceArray.splice(Math.floor(Math.random() * spruceArray.length));
				document.getElementById('clickTreeImage').src = randomSpruce;
			}
			if(assurance == 0) {
				if(oakTree) {
					oakWood += WPT;
				}
				if(spruceTree) {
					spruceWood += WPT;
				}
				treesCutDown++;
				assurance++;
				treeLoose();
				treeStage += cutStrenght;
				messageDisplay('+' + WPT + ' wood');
				canGo = false;
				setTimeout(function () {
	        		canGo = true;
	        	}, delayTime)
			} else {
				if(oakTree) {
					imageReplace('clickTreeImage', 'https://i.imgur.com/aGBT0tm.png');
				}
				else if(spruceTree) {
					imageReplace('clickTreeImage', 'https://art.pixilart.com/3feb11b0ca2d069.png');
				}
				treeStage = 0;
				assurance--;
			}
		}
		if(mouseDown == 1 && activeTool == 'chainsaw') {
			clickTree();
		}
}

// Upgrades
function upgrade(num) {
	switch(num){
		case 0:
			break;
		case 1:
		    // Upgrade 1 = Better axe
			delayTime = 600;
			break;
		case 2:
			break;
		case 3:
			// Upgrade 3 = Lumberjack superspeed
			oakWood += 1000;
			break;
		case 10:
			// Upgrade ? = Give one wood (only for testing)
			tile1Trees += 100;
			break;
		case 20:
			// Upgrade ? = Give money (only for testing)
			money += 1000;
			break;
		default:
			console.log("error in upgrade function");
			break;
	}
}


/*=====================================================================================
									LUMBERJACK
=======================================================================================*/
async function showLumberjackUpgrades() {
	    var x = document.getElementById("lumberjackUpgrades");
	    if (x.style.display === "block") {
	        x.style.display = "none";
	    } else {
	        x.style.display = "block";
	    }
}

// On oak tree 510 milliseconds mean each tree takes 10 seconds
// 510 for spruce too
var lJackSpeed = 500; // The initial speed of the lumberjack
var lJackTreeStage = 1; // The stage of the tree, goes up for every hit from the lumberjack. Is reset for every tree.
// Lumberjack animation and tree animation
async function lumberJack() {
	if(lumberjackGO == true) {
		// Variables used to modify the lumberjack's speed
		var lJackSpeed2 = lJackSpeed;
		var lJackSpeedHalf = lJackSpeed2/2
		var lJackSpeedHalf2 = lJackSpeedHalf
		var lJackSpeedQuart = lJackSpeed2/2
		// Gets the class that dictates the lumberjac's position and allows the funcion to modify it
		var x = document.getElementById("lumberjackImage");
		Amount1 = oakTreeAmount;
		Amount2 = spruceTreeAmount;
		var totalTreeAmount = Amount1 += Amount2;
		if(totalTreeAmount > 0 && lJackTreeStage < 7) {
			await sleep(lJackSpeed);
			document.getElementById('lumberjackImage').src='https://i.imgur.com/YsM2zaK.png';
			await sleep(lJackSpeed);
			document.getElementById('lumberjackImage').src='https://i.imgur.com/2KsEfXR.png';
			await sleep(lJackSpeed);
			document.getElementById('lumberjackImage').src='https://i.imgur.com/nUiwJEV.png';
			if(lJackTreeStage == 1) {
				if(whichTile == 1) { // Checks what tree is currently displayed and changes accordingly
					document.getElementById('treeImage').src='https://i.imgur.com/wsftoQ8.png';
				} 
				else if(whichTile == 2) {
					document.getElementById('treeImage').src='https://i.imgur.com/BQMR8Uz.png';
				}
				lJackTreeStage++;
				await sleep(lJackSpeedHalf);
				x.style.left = "15px"; // Moves the lumberajack
				await sleep(lJackSpeedHalf);
				lumberJack(); // Calls the function again
			}
			else if(lJackTreeStage == 2) {
				if(whichTile == 1) {
					document.getElementById('treeImage').src='https://i.imgur.com/ta996SE.png';
				}
				else if(whichTile == 2) {
					document.getElementById('treeImage').src='https://i.imgur.com/uyMMK5D.png';
				}
				lJackTreeStage++;
				await sleep(lJackSpeedHalf);
				x.style.left = "22px";
				await sleep(lJackSpeedHalf);
				lumberJack();
			}
			else if(lJackTreeStage == 3) {
				if(whichTile == 1) {
					document.getElementById('treeImage').src='https://i.imgur.com/mQMzfS8.png';
				}
				else if(whichTile == 2) {
					document.getElementById('treeImage').src='https://i.imgur.com/a9TLifm.png';
				}
				lJackTreeStage++;
				await sleep(lJackSpeedHalf);
				x.style.left = "32px";
				await sleep(lJackSpeedHalf);
				lumberJack();
			}
			else if(lJackTreeStage == 4) {
				if(whichTile == 1) {
					document.getElementById('treeImage').src='https://i.imgur.com/3WXtrGz.png';
				}
				else if(whichTile == 2) {
					document.getElementById('treeImage').src='https://i.imgur.com/kFHe3gB.png';
				}
				lJackTreeStage++;
				await sleep(lJackSpeedHalf);
				x.style.left = "40px";
				await sleep(lJackSpeedHalf);
				lumberJack();
			}
			else if(lJackTreeStage == 5) {
				if(whichTile == 1) {
					document.getElementById('treeImage').src='https://i.imgur.com/mbMZysM.png';
				}
				else if(whichTile == 2) {
					document.getElementById('treeImage').src='https://i.imgur.com/pT4aSQQ.png';
				}
				lJackTreeStage = 1;
				await sleep(lJackSpeedQuart);
				x.style.left = "25px";
				await sleep(lJackSpeedQuart);
				x.style.left = "5px";
				await sleep(500);
				if(whichTile == 1) {
					document.getElementById('treeImage').src = 'https://i.imgur.com/aGBT0tm.png';
				}
				else if(whichTile == 2) {
					document.getElementById("treeImage").src = 'https://art.pixilart.com/3feb11b0ca2d069.png';
				}
				lumberJack();
			}
		} else {
			document.getElementById('lumberjackImage').src='images/lumberjackIdle.png';
		}
	} else {
		document.getElementById('lumberjackImage').src='images/lumberjackIdle.png';
	}
}


/*=====================================================================================
									TEXT STUFF
=======================================================================================*/

function messageDisplay(text) {
	var br = '<br>';
	if(text.length > 40) { // Giving some extra space to separate longer messages
		br = '<br>' + '<br>'
	}
	text = text + br + document.getElementById("messageSection").innerHTML
	document.getElementById("messageSection").innerHTML = ""
	showItem('infoSection'); // Closes the land menu and opens the info menu to assure the message is seen
	hideItem('landSection');
	document.getElementById("messageSection").innerHTML += text;

}

function correctPS(number) {
	if(number >= 0.01 && number <= 0.1) {
		number *= 100;
	}
	else if(number >= 0.1) {
		number *= 10;
	}

	return Math.abs(number);
}

// // Checks if there are sufficient recources for keeping the sawmill running
// // If not, the textnode changes accordingly
// // Had to place this outside of the actual function to use setInterval
// var oakTreeLandText = "";
// var spruceTreeLandText = "";

// var sawmilltextnode = document.createTextNode("");
// var lumberjacktextnode = document.createTextNode("");
// var woodText = "Sawmill inactive as there is not enough money. Sell something to get more!"
// var moneyText = "Sawmill inactive due to a shortage of wood. Get more by cutting trees!"
// setInterval(function hoverStatus() { // Dictates what info is shown when hovering over business and land
// 	if(oakLandInfo == true) {
// 		oakTreeLandText = 'A patch of land containing ' + oakTreeAmount +' oak trees.'
// 		document.getElementById('oakLandInfo').innerHTML = oakTreeLandText;
// 	}
// 	if(spruceLandInfo == true) {
// 		spruceTreeLandText = 'A patch of land containing ' + spruceTreeAmount +' spruce trees.'
// 		document.getElementById('spruceLandInfo').innerHTML = spruceTreeLandText;
// 	}

// 	if(sawmillInfo > 0) {
// 	    if(woodCount >= 0 && money >= 0) {
// 	    	sawmilltextnode = document.createTextNode("Sawmill currently producing " + correctPS(sawmillPPS) + " planks at a cost of " + sawmillMPS + "$ and " + sawmillWPS + " logs per seond");
// 	    	document.getElementById('sawmillInfo').innerHTML = "Sawmill currently producing " + correctPS(sawmillPPS) + " planks at a cost of " + correctPS(sawmillMPS) + "$ and " + correctPS(sawmillWPS) + " logs per seond";
// 		}
// 		else if(woodCount > 0 && money <= 0) {
// 			sawmilltextnode = document.createTextNode(woodText);
// 			document.getElementById('sawmillInfo').innerHTML = woodText;
// 		}
// 		else if(money > 0 && woodCount <= 0) {
// 			sawmilltextnode = document.createTextNode(moneyText);
// 			document.getElementById('sawmillInfo').innerHTML = moneyText;
// 		}
// 	}


// 	if(lumberjackInfo == true) {
// 		if(ljMoney >= 0 && ljTrees >= 0) {
// 			lumberjacktextnode = document.createTextNode("Lumberjack currently producing " + correctPS(lumberjackMPS))
// 			document.getElementById('lumberjackInfo').innerHTML = "Lumberjack currently producing " + correctPS(lumberjackMPS)
// 		}
// 	}

setInterval(function check() {
document.getElementById('howManyTrees').innerHTML = 'You have ' + Math.ceil(tile1Trees) + ' oak trees and ' + Math.ceil(tile2Trees) + ' spruce trees';

document.getElementById('oakTreeAmount').innerHTML = Math.ceil(tile1Trees) + ' oak';
document.getElementById('spruceTreeAmount').innerHTML = Math.ceil(tile2Trees) + ' spruce';

document.getElementById('sawmillPlanksPerSecond').innerHTML = '+' + sawmillPPS + ' Planks per second';
document.getElementById('sawmillMoneyPerSecond').innerHTML = sawmillMPS + ' Money per second';
document.getElementById('sawmillWoodPerSecond').innerHTML = sawmillWPS + ' Wood per second';
document.getElementById('lumberjackMoneyPerSecond').innerHTML = lumberjackMPS + ' Money per second';
document.getElementById('lumberjackWoodPerSecond').innerHTML = '+' + lumberjackWPS + ' Wood per second';
document.getElementById('lumberjackTreePerSecond').innerHTML = lumberjackTPS + ' Trees per second';

changeToAxe(); // Updates the cursor so that it's always correct
}, 100);

// // Creates info text for businesses
// var sawmillInfo = false;
// $("#sawmill").hover(function() {
// 	if(sawmillInfo == false) {
// 	    var node = document.createElement("p");
// 	    node.setAttribute('id', 'sawmillInfo')
// 	    node.appendChild(sawmilltextnode);
// 		document.getElementById('middle').appendChild(node);
// 		sawmillInfo = true;
// 	}
// });

// var lumberjackInfo = false;
// $("#treeImage").hover(function() {
// 	if(lumberjackInfo == false) {
// 	    var node = document.createElement("p");
// 	    node.setAttribute('id', 'lumberjackInfo')
// 	    node.appendChild(document.createTextNode(lumberjacktextnode));
// 		document.getElementById('lumberjackInfoContainer').appendChild(node);
// 		lumberjackInfo = true;
// 	}
// });

// var oakLandInfo = false;
// $("#oakForest").hover(function() {
// 	if(oakLandInfo == false) {
// 	    var node = document.createElement("p");
// 	    node.setAttribute('id', 'oakLandInfo')
// 	    node.appendChild(document.createTextNode(oakTreeLandText));
// 		document.getElementById('oakLandInfoContainer').appendChild(node);
// 		oakLandInfo = true;
// 	}
// });

// var spruceLandInfo = false;
// $("#spruceForest").hover(function() {
// 	if(spruceLandInfo == false) {
// 	    var node = document.createElement("p");
// 	    node.setAttribute('id', 'spruceLandInfo')
// 	    node.appendChild(document.createTextNode(spruceTreeLandText));
// 		document.getElementById('spruceLandInfoContainer').appendChild(node);
// 		spruceLandInfo = true;
// 	}
// });

// Clicking on certain elements will trigger a description in the input field
async function itemDescription(item) {
		switch(item){
		case 0:
			messageDisplay('Current amount of money.');
			break;
		case 1:
			messageDisplay("You can't select money.");
			break;
		case 2:
			messageDisplay('Oak selected.');
			break;
		case 3:
			messageDisplay('Current amount of oak logs.');
			break;
		case 4:
			messageDisplay('Current amount of spruce logs.');
			break;
		case 5:
			messageDisplay('Spruce selected.');
			break;
		case 6:
			messageDisplay('Planks selected.');
			break;
		case 7:
			messageDisplay('You try to buy the Earth. The world laughs at you and your ' + money + ' dollars. "You will all see... one day" you silently proclaim as you continue to cut down tres.')
			break;
		case 8:
	    	
			break;
		default:
			console.log("error in description function");
			break;
	}
}