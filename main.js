

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
// newUpgrade('name', '"image"', 'info', 'effect', 'price', 'id' 'location')


var oakWoodAmount = 0;
var spruceWoodAmount = 0;
var oakWoood = 0;
var spruceWood = 0;

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

function hideInput(building) {
	showItem(building);
	if(building == 'sawmillInputs') {
		hideItem('lumberjackInputs');
	}
	if(building == 'lumberjackInputs') {
		hideItem('sawmillInputs');
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
async function sellWood() {
	if(resourceType == "oak") {
		var typeAmount = oakWood;
	} else
	if(resourceType == "spruce") {
		var typeAmount = spruceWood;
	} else
	if (resourceType == "planks") {
		var typeAmount = planks;
	}
	var inputValue = document.getElementById("inputAmount").value; // Gets the inputted value
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
			inputDisplay('Sold ' + inputValue + ' ' + resourceType + ' for ' + s + '$');
		}
		document.getElementById("oakAmount").innerHTML = Math.ceil(oakWood); // Updates displayed values
		document.getElementById("spruceAmount").innerHTML = Math.ceil(spruceWood);
		document.getElementById("moneyAmount").innerHTML = Math.ceil(money);
		document.getElementById("plankAmount").innerHTML = Math.floor(planks);
		document.getElementById("inputAmount").value = "";
	} else
	notEnough();
}

var ljMoney = 0;
function lumberjackInputMoney() {
	var inputValue = document.getElementById("ljMoneyInput").value;
	var m = money;
	var input = parseInt(inputValue)
	var inputSecure = m -= inputValue;
	if(inputSecure >= 0) {
		ljMoney += input;
		money -= input;
	}
	document.getElementById("ljMoneyAmount").innerHTML = 'Money: ' + ljMoney + '$';
	document.getElementById("ljMoneyInput").value = "";
}

function withdrawWood(which) { // Choose between selling all planks or withdrawing them
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
		inputDisplay('Sold ' + Math.floor(a) + ' ' + resourceType + ' for ' + Math.floor(d) + '$');
	}
	if(which == 'withdraw') {
		if(resourceType == "oak") {
			ljOak -= Math.floor(o);
			oakWood += Math.floor(o);
			inputDisplay('Withdrew ' + Math.floor(o) + ' oak wood');
		}
		if(resourceType == "spruce") {
			ljSpruce -= Math.floor(s);
			spruceWood += Math.floor(s);
			inputDisplay('Withdrew ' + Math.floor(s) + ' spruce wood');
		}
	}
}

var ljOak = 0;
var ljSpruce = 0;
var ljBirch = 0;
var ljOak = 0;
var ljSpruce = 0;

var smillMoney = 0;
function sawmillInputMoney() {
	var inputValue = document.getElementById("smillMoneyInput").value;
	var m = money;
	var input = parseInt(inputValue)
	var inputSecure = m -= inputValue;
	if(inputSecure >= 0) {
		smillMoney += input;
		money -= input;
	}
	document.getElementById("smillMoneyInput").value = "";
}

var smillOak = 0;
var smillSpruce = 0;
var smillBirch = 0;
function sawmillInputWood() {
	var inputValue = document.getElementById("smillWoodInput").value;
	if(resourceType == "oak") {
	var s = oakWood;
	}
	if(resourceType == "spruce") {
	var s = spruceWood;
	}
	var input = parseInt(inputValue)
	var inputSecure = s -= inputValue;
	if(inputSecure >= 0) {
		if(resourceType == "oak") {
			smillOak += input;
			oakWood -= input;
		}
		if(resourceType == "spruce") {
			smillSpruce += input;
			spruceWood -= input;
			
		}
		document.getElementById("smillWoodInput").value = "";
	}
}

function withdrawPlanks(which) { // Choose between selling all planks or withdrawing them
	var p = smillPlanks;
	if(which == 'sell') {
		a = p * plankValue;
		inputDisplay('Sold ' + Math.floor(p) + ' planks' + ' for ' + Math.floor(a) + '$');
		smillPlanks -= p;
		money += Math.floor(p) * plankValue;
	}
	if(which == 'withdraw') {
		smillPlanks -= Math.floor(p);
		planks += Math.floor(p);
		inputDisplay('Withdrew ' + Math.ceil(p) + ' planks');
	}
}





var resourceType = "oak";
var money = 0;
var oak = 10;
var spruce = 0;

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
	if(money >= 50 && localStorage.ownedTiles == undefined) {
		money -= 50;
		var givenTrees = Math.floor(Math.random() * (1100 - 900)) + 900;
		tile2Trees += givenTrees;
		inputDisplay("+" + givenTrees + " spruce trees!");
		localStorage.ownedTiles = 1;
	}
	else if(localStorage.ownedTiles == undefined) {
		notEnough();
	}
}

function treeLoose() {
	if(chosenTile == 1) {
		//oakTreeAmount--;
		tile1Trees--;
	}
	else if(chosenTile == 2) {
		//spruceTreeAmount--;
		tile2Trees--;
	}
}

var chooseActive = false;
function lumberjackChooseTile() {
	chooseActive = true;
	inputDisplay('You are currently selecting the tile from which the lumberjack gets his trees. Simply click on a tile of land and the lumberjack will get to work!');
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
				inputDisplay('Oak tile chosen');
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
			}
			else {
				inputDisplay('Finish the tree first!');
			}
			break;
		case 2:
			if(chooseActive) {
				whichTile = 2;
				chooseActive = false;
				hideItem('chosenSpruceTile');
				showItem('chosenOakTile');
				inputDisplay('Spruce tile chosen');
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
			}
			else {
				inputDisplay('Finish the tree first!');
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

var axeUpgradeUnlocked = 0;
/*=====================================================================================
											SAVE
=======================================================================================*/

//$(window).on('load', 
async function loadUp() {
 	if(localStorage.money) { // If localStorage.money has been set the game is guaranteed to have been saved
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
 		resourceType = localStorage.resourceType; 
 		whichTile = Number(localStorage.whichTile); // The selected tile for the lumberjack
 		lumberjackGO2 = localStorage.lumberjackGO2;
 		if(localStorage.axeUpgrade >= 1) {
 			axeUpgradeUnlocked = Number(localStorage.axeUpgrade);
 		}
		if(localStorage.lumberjack == 1) {
			shopBuy(2);
		}
		if(localStorage.sawmill == 1) {
			shopBuy(1);
		}
		for(var i = 0; i < localStorage.sawmillUpgrade; i++){
			//shopBuy(100+i)
			buyUpgrade(1+i, 'sawmillOwned', 2);
		}
		for(var i = 0; i < localStorage.axeUpgrade; i++){
			buyUpgrade(1+i, 'axe', 2);
		}
		if(localStorage.ownedTiles == 1) {
			buyLand();
		}

		console.log('Welcome back!')
 	} else { // If not, it's the first time playing and these need to be set
 		money = 200;
 		oakWood = 0;
 		spruceWood = 0;
 		planks = 0;
 		localStorage.sawmillUpgrade = 0;
 		resourceType = 'oak';
 		console.log('First time load');
 		inputDisplay("You inherit your father's plot of land. There's nothing except some boring oak trees on it. You decide to cut them down.")
 	}
 	document.getElementById("plankAmount").innerHTML = Math.floor(planks);
    document.getElementById("moneyAmount").innerHTML = Math.ceil(money);
	document.getElementById("oakAmount").innerHTML = Math.ceil(oakWood);
	document.getElementById("spruceAmount").innerHTML = Math.ceil(spruceWood);
	if(resourceType == 'oak') {
		outline("oakWoodIcon");
	}
	if(resourceType == 'spruce') {
		outline("spruceWoodIcon");
	}
	if(resourceType == 'planks') {
		outline("plank");
	}
 }//);

// Saves when exiting or refreshing
window.onbeforeunload = function exitSave() {
	save();
};

// Save game manually
$("#saveGame").click(async function() {
	save();
});

// Saves automatically every set amount of time (currently 5 minutes)
setInterval(function saveRepeat() {
	save();
	document.getElementById("inputAmount").value = "";
}, 300000);

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

 	//Determine whether or not the Lumberjack animation should be active on load
 	localStorage.lumberjackGO2 = lumberjackGO2;

 	inputDisplay('Game saved.');
}


// Wipes saved data and relads the page
$("#title").click(function() {
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
	document.getElementById("moneyAmount").innerHTML = Math.ceil(money);
	document.getElementById("ljMoneyAmount").innerHTML = 'Money: ' + Math.ceil(ljMoney) + '$';
	document.getElementById("oakAmount").innerHTML = Math.ceil(oakWood);
	document.getElementById("spruceAmount").innerHTML = Math.ceil(spruceWood);
	document.getElementById('WoodPerTree').innerHTML = 'Wood Per Tree: ' + WPT;
	unlocker();

	// Only allows you to pick a tile if the Lumberjack has money
	// To prevent a weird bug, will look into. Probably.
	if(ljMoney > 0) {
		showItem('ljChooseTile');
	}
	else {
		hideItem('ljChooseTile');
	}

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

	// Updating shown Lumberjack values
	if(ljOak >= 0) {
		document.getElementById("ljOakTreeAmount").innerHTML = 'Oak: ' + Math.floor(ljOak);
	}
	if(ljSpruce >= 0) {
		document.getElementById("ljSpruceTreeAmount").innerHTML = 'Spruce: ' + Math.floor(ljSpruce);
	}

}, 100);

/*=====================================================================================
									 UPGRADES
=======================================================================================*/
//newUpgrade('Better machinery', '"https://art.pixilart.com/be7630d7b1fa991.png"', 'Better machinery that turn your saws faster.', '+0.1 sawmill efficiency', '2000$', 'sawmill1', 1);

function newUpgrade(name, image, info, effect, price, id, location, shopID) {
	if(location == 1) { // When the upgrade is firts created
		var $itemSection = $(".itemSection")
		var button = '"onclick="shopBuy(';
	}
	else if(location == 2) { // A copy placed in the "owned" section
		var $itemSection = $(".sawmillSection")
		var button = "";
		console.log('incorrect')
	}
	else if(location == 3) { // A copy placed in the "owned" section
		console.log('correct')
		var $itemSection = $(".axeUpgradeSection")
		var button = "";
	}
	 	str = '<div class="tooltip">' 
	        + '<img class="small" id="'
	        + id
	        + button
	        + shopID
	        + ');" src='
            + image
            + '>'
            + '<div class="tooltiptext">'
            + '<ins><u><b>'
            + name
            + '</b></u></ins>'
            + '<div>Price: <font color="#11ad14">'
            + price
            + '</font><div>'
            + '<div class="effect">'
            + effect
            + '</div>'
            + '<div class="description">'
            + info
            + '</div>'
            + '</div>'
            + '</div>';
		html = $.parseHTML(str),
	 
	// Append the parsed HTML
	$itemSection.append(html);
	//refresh();
}

// function refresh() { // Have to update because the id is now actually assigned to an element

// 	$("#sawmill1").click(function () {
// 		shopBuy(100);
// 	});

// }


//Items, buildings and such start from 0
//Upgrades start from 100

function shopBuy(itemNum) {
	switch(itemNum) {
		case 0:
			buyLand();
			break;
		case 1:
			//money >= 3000 && woodCount >= 200 // this one is supposed to be in there (that's what she said)
			if(localStorage.sawmill == 1 || money >= 3000 && oakWood >= 200) {
				hideItem("sawmillBuilding");
				showItem("sawmill");
				showItem("plank");
				showItem("plankAmount");
				showItem("sectionRight2");
				showItem("sectionRight3");
				showItem("sawmillInputs");
				hideItem("lumberjackInputs");
				sawmillBuilding();
				if(localStorage.sawmill == undefined) {
					money -= 3000;
					oakWood -= 200;
				}
				//sawmillBar();
				//move();
				localStorage.sawmill = 1;


			}
			else {
				inputDisplay('Insufficient funds!');
			}


			break;
		case 2:
			if(1==1 || localStorage.lumberjack == 1) {
				showItem("treeAndLumber");
				showItem("sectionRight2");
				showItem("lumberjackInputs");
				showItem("sectionRight3");
				hideItem("sawmillInputs");
				hideItem("lumImage");
				lumberjackBuilding();
				localStorage.lumberjack = 1;
				lumberjackGO = true;
				if(ljMoney >= 1) { // Makes sure the animation starts if it should
					if(ljOak >= 1 || ljSpruce >= 1) {
						lumberJack();
					}
				}
			}
			break;


			// Sawmill upgrades
		case 100:
			if(1 == 1||money >= 2000) {
				buyUpgrade(1, 'sawmill', 2);
				//sawmillBar();
				//move(); // These two restart the bar, making it look more smooth.
				//if(localStorage.sawmillUpgrade <= 2) { // If the upgrade is not owned
					money -= 2000;
					hideItem("sawmill1");
				//}
				//if(localStorage.sawmillUpgrade == 0) {
					localStorage.sawmillUpgrade = 1; // To save it being bought for next load
				//}
			}else {
				notEnough();
			}
			break;
		case 101:
			if(1==1 || money >= 10000) {
				buyUpgrade(2, 'sawmill', 2);
				//if(localStorage.sawmillUpgrade <= 3) {
					money -= 10000;
					hideItem("sawmill2");
				//}
				localStorage.sawmillUpgrade = 2;
				
			}
			break;
		case 102:
			if(1==1 || money >= 100000) {
				buyUpgrade(3, 'sawmill', 2);
				money -= 100000;
				hideItem("sawmill3");
				localStorage.sawmillUpgrade = 3;
			}


			// Axe upgrades
		case 110:
			if(money >= 2000) {
				buyUpgrade(1, 'axeOwned', 3);
				lumberjackDouble();
				//if(localStorage.sawmillUpgrade <= 3) {
					money -= 2000;
					hideItem("axe1");
				//}
				localStorage.axeUpgrade = 1;
				
			}
			break;

		document.getElementById("moneyAmount").innerHTML = Math.ceil(money);
	}
}

var whichSawmillOwned = 0;
function buyUpgrade(id, id2, location) {
	if(id2 == 'sawmillOwned' || id2 == 'sawmill') {
		sawmillDouble();
		whichSawmillOwned += id;
	}
	if(id2 == 'axeOwned' || id2 == 'axe') {
		axePercent += 0.0001;
		//whichAxeOwned += id;
	}
	var theID = id2+id;
	upgrades(theID, location);
}

var sawmillUpgradeUnlocked = 0;
function unlocker() {//Shows upgrades as the player is about to be able to buy them
	if(money >= 1000 && axeUpgradeUnlocked < 1 || axeUpgradeUnlocked == NaN) {
		axeUpgradeUnlocked += 1;
		upgrades('axe1', 1);
	}
	if(localStorage.sawmill == 1)  {
		if(money >= 100 && sawmillUpgradeUnlocked < 1 && whichSawmillOwned < 1) { // && localStorage.sawmillUpgrade == 1 ) {
			sawmillUpgradeUnlocked = 1;
			upgrades('sawmill1', 1);
		}
		if(money >= 8000 && sawmillUpgradeUnlocked < 2 && whichSawmillOwned < 2) {
			sawmillUpgradeUnlocked = 2;
			upgrades('sawmill2', 1);
		}
		if(money >= 80000 && sawmillUpgradeUnlocked < 3 && whichSawmillOwned < 3) {
			sawmillUpgradeUnlocked = 3;
			upgrades('sawmill3', 1);
		}
	}
}

function upgrades(id, location) { //locations: buy page = 1, owned page = 2
	if(id == 'sawmill1' || id == 'sawmillOwned1') {
		newUpgrade('Better machinery', '"https://art.pixilart.com/be7630d7b1fa991.png"', 'Better machinery for faster saws.', '+0.1 planks per second', '2000$', id, location, 100);
	}
	if(id == 'sawmill2' || id == 'sawmillOwned2') {
		newUpgrade('How do you cut the sea in half? With a sea-saw', '"https://art.pixilart.com/30f75d2e3951da5.png"', 'Better machinery for faster saws.', 'Doubles planks per second', '10000$', id, location, 101);
	}
	if(id == 'sawmill3' || id == 'sawmillOwned3') {
		newUpgrade('Upgrade 3', '"https://art.pixilart.com/927d9032bc5f7e4.png"', 'Better machinery for faster saws.', 'Doubles planks per second', '100000$', id, location, 102);
	}


	if(id == 'axe1' || id == 'axeOwned1') {
		newUpgrade('Cleaving axe', '"https://art.pixilart.com/ba86f4c24bab46e.png"', 'A sturdy axe, its grip feels good in your hand.', '+0.1% of your total money in bank for each tree cut down. <br> Doubles lumberjack efficiency.', '2000$', id, location, 110);
	}
}

var lumberjackWPS = 0; // Wood per second
var lumberjackMPS = 0; // Money per second
var lumberjackTPS = 0; // Trees per second

var sawmillWPS = 0;
var sawmillMPS = 0;
var sawmillPPS = 0; // Planks per second
var planks = 0;

var WPT = 0; // Wood per tree
var baseWPT = 5;
var axePercent = 0;
setInterval(function axePercentUpgrade() {
	m = money;
	m *= axePercent;
	b = baseWPT;
	WPT = b += Math.trunc(m);
}, 100);

function lumberjackBuilding() {
	lumberjackWPS += 0.2;
	lumberjackMPS -= 0.1;
	lumberjackTPS -= 0.1;
}

function lumberjackDouble() {
	lumberjackWPS *= 0.2;
	lumberjackMPS *= 0.1;
	lumberjackTPS *= 0.1;
}

function sawmillBuilding() {
	sawmillPPS += 0.1;
	sawmillMPS -= 0.1;
	sawmillWPS -= 0.1;
}

function sawmillDouble() {
	sawmillPPS *= 2;
	sawmillMPS *= 2;
	sawmillWPS *= 2;
}

var smillPlanks = 0;
setInterval(function addValue() {
	var o = smillOak;
	var s = smillSpruce;
	var smillWoodCount = o += s;
	if(smillWoodCount > 0 && smillMoney > 0) { // Sawmill
		smillPlanks += oneDec(sawmillPPS);
		smillMoney += oneDec(sawmillMPS);
		if(resourceType == "oak") {
			smillOak += oneDec(sawmillWPS);
		}
		if(resourceType == "spruce") {
			smillSpruce += oneDec(sawmillWPS);
		}
	}
	document.getElementById("smillMoneyAmount").innerHTML = 'Money: ' + Math.ceil(smillMoney) + '$';
	document.getElementById("smillPlankAmount").innerHTML = 'Planks: ' + Math.floor(smillPlanks);
	document.getElementById("plankAmount").innerHTML = Math.floor(planks);
   	document.getElementById("moneyAmount").innerHTML = Math.ceil(money);
	document.getElementById("oakAmount").innerHTML = Math.ceil(oakWood);
	document.getElementById("spruceAmount").innerHTML = Math.ceil(spruceWood);
	if(smillOak >= 1) {
		document.getElementById("smillWoodAmount").innerHTML = 'Oak: ' + Math.ceil(smillOak);
	}
	if(smillSpruce >= 1) {
		document.getElementById("smillWoodAmount").innerHTML = 'Spruce: ' + Math.ceil(smillSpruce);
	}
		
}, 1000);

var lumberjackGO2 = true;
var lumberjackGO = false;
var ljTrees = 0;
var activeType = "";
var lumberjackActive = '';
setInterval(function addLumValue() {

	if(whichTile == 1) {
		ljTrees = tile1Trees;
	}
	if(whichTile == 2) {
		ljTrees = tile2Trees;
	}

	if(ljMoney > 0 && ljTrees > 0) { // Lumberjack
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


/*=====================================================================================
									 MISCELLANEOUS
=======================================================================================*/

function oneDec(number) { // Limits a number to one decimal
	return Math.round(number * 10) / 10;
}

function help() {
	inputDisplay('Click an object to get more information (not yet functional)');
}

function format(number) {
	for(i = 1; i < number; i *= 1000) {
		
	}
	if(number >= 1 && number < 1000000) {
		return number
	}
	if(number >= 1000000 && number < 1000000000) {
		number /= 1000000
		return Math.round(number * 1000) / 1000 + ' Million'
	}
	if(number >= 1000000000) {
		number /= 1000000000
		return number.toFixed(3)
	}
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
 		if(document.getElementById("ljMoneyInput").value != "") {
 			lumberjackInputMoney();
 		}
  		if(document.getElementById("smillMoneyInput").value != "") {
 			sawmillInputMoney();
 		}
  		if(document.getElementById("smillWoodInput").value != "") {
 			sawmillInputWood();
 		}
    }
}

// Adds outline to element that have transparency around them
function outline(ID, clear) {
    var x = document.getElementById(ID);
    if(x.style.filter == "") {
    	x.style.filter =  "drop-shadow(2px 2px 0 white) drop-shadow(-2px 2px 0 white) drop-shadow(2px -2px 0 white) drop-shadow(-2px -2px 0 white)"
    }
    else {
    	x.style.filter = "";
    }
    if(clear == 'clear') {
    	x.style.filter = "";
    }
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
	inputDisplay('Not enough money!', '#CC0000');
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
function showCheats() {
    var x = document.getElementById("upgradesContainer");
    if (x.style.display === "block") {
        x.style.display = "none";
        document.getElementById("showCheats").innerHTML = "Cheats";
    } else {
        x.style.display = "block";
        document.getElementById("showCheats").innerHTML = "Hide";
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
			clickTreeImage.style.cursor = "url('https://i.imgur.com/fbAJUwR.png'), auto";
		}
		if(mouseDown == 1) {
			clickTreeImage.style.cursor = "url('https://i.imgur.com/UOF9oDe.png'), auto";
		}
	}
	if(activeTool == 'chainsaw') {
		clickTreeImage.style.cursor = "url('https://i.imgur.com/IlbnMq9.png'), auto";
	}
}

var activeTool = 'axe';
function chooseTool(which) {
	switch(which){
	case 0:
		activeTool = 'axe';
		break;
	case 1:
		activeTool = 'chainsaw';
		break;
	}
}

var chainsawOn = false;
async function clickTree() {

	if(activeTool == 'axe') {
		axeTree();
		//document.getElementById('cutAudio').play();
	}
	if(activeTool == 'chainsaw') {
		await sleep(200);
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
		inputDisplay("No more trees left!");
	}
}

function tree() {
if(treeStage == 0 && canGo) {
			if(oakTree) {
			imageReplace('clickTreeImage', 'https://i.imgur.com/9dYxQOs.png');
			}
			else if(spruceTree) {
			imageReplace('clickTreeImage', 'https://i.imgur.com/BQMR8Uz.png');
			}
			treeStage++;
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
			treeStage++;
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
			treeStage++;
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
			treeStage++;
			canGo = false;
			setTimeout(function () {
	        	canGo = true;
	        }, delayTime)
		}
		else if(treeStage == 4 && canGo && spruceTree != true) {
			imageReplace('clickTreeImage', 'https://i.imgur.com/9rr9haX.png');
			treeStage++;
			canGo = false;
			setTimeout(function () {
	        	canGo = true;
	        }, delayTime)
		}
		else if(treeStage == 5 && canGo && spruceTree != true) {
			imageReplace('clickTreeImage', 'https://i.imgur.com/ZRlTtkj.png');
			treeStage++;
			canGo = false;
			setTimeout(function () {
	        	canGo = true;
	        }, delayTime)
		}
		else if(treeStage == 6 && canGo || treeStage == 7 && canGo) {
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
				assurance++;
				treeLoose();
				treeStage++;
				inputDisplay('+' + WPT + ' wood');
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
			console.log(delayTime);
			break;
		case 2:
			// Upgrade 2 = Faster Lumberjack
			lJackSpeed = 300;
			console.log(lJackSpeed);
			break;
		case 3:
			// Upgrade 3 = Lumberjack superspeed
			lJackSpeed = 50;
			console.log(lJackSpeed);
			break;
		case 10:
			// Upgrade ? = Give one wood (only for testing)
			treeAmount++;
			if(treeAmount <= 1) {
				lumberJack();
			}
			break;
		case 20:
			// Upgrade ? = Give money (only for testing)
			money += 10000;
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
var lJackSpeed = 510; // The initial speed of the lumberjack
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
				//treeLoose();
				//oak += 5;
				document.getElementById("moneyAmount").innerHTML = Math.ceil(money);
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
			document.getElementById('lumberjackImage').src='https://i.imgur.com/UCmm79r.png';
		}
	} else {
		document.getElementById('lumberjackImage').src='https://i.imgur.com/UCmm79r.png';
	}
}


/*=====================================================================================
									TEXT STUFF
=======================================================================================*/

function inputDisplay(text) {
	text = text + '<br>' + document.getElementById("messageSection").innerHTML
	document.getElementById("messageSection").innerHTML = ""
	document.getElementById("messageSection").innerHTML += text;
}

setInterval(function saveRepeat() {
	//save();
	//document.getElementById("messageSection").innerHTML = "";
}, 10000);

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

document.getElementById('sawmillPerSecond').innerHTML = sawmillPPS + ' Planks per second';
document.getElementById('lumberjackMoneyPerSecond').innerHTML = lumberjackMPS + ' Money per second';
document.getElementById('lumberjackWoodPerSecond').innerHTML = lumberjackWPS + ' Wood per second';
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
			inputDisplay('Current amount of money.');
			break;
		case 1:
			inputDisplay("You can't choose money.");
			break;
		case 2:
			inputDisplay('Oak chosen.');
			break;
		case 3:
			inputDisplay('Current amount of oak logs.');
			break;
		case 4:
			inputDisplay('Current amount of spruce logs.');
			break;
		case 5:
			inputDisplay('Spruce chosen.');
			break;
		case 6:
			inputDisplay('Planks chosen.');
			break;
		case 7:
			
			break;
		case 8:
	    	
			break;
		default:
			console.log("error in description function");
			break;
	}
}
