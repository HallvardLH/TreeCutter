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
////Growing mechanism: random amount of time (withing a certin set amount of time) before next plant stage until fully grown
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


//////////////////////
//ADDED FEATURES/////
//Lumberjack that enters the frame and cuts the tree automatically
//something that tells you what you got from every click (added this to show in the inout bar, might change.)
//upgrades (got the geral things to work for this)
//feature that makes cutting trees take longer
//Pressing the "sell wood" button with an empty input field sells all wood (changed this to instead ask how mich wood to sell)
//////////////////

// Used to delay... certain things... :)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Basically updates stuff
setInterval(function repeat() {
	document.getElementById("treeAmount").innerHTML = Math.ceil(treeAmount);
	document.getElementById("moneyAmount").innerHTML = Math.ceil(money);
	document.getElementById("plankAmount").innerHTML = Math.floor(planks);
	document.getElementById("woodAmount").innerHTML = Math.ceil(woodCount);
}, 10);

// Adds money, wood and so fourth every second
var woodPerSecond = 0;
var moneyPerSecond = 0;
var planksPerSecond = 0;
setInterval(function addValue() {
	planks += planksPerSecond;
	money += moneyPerSecond;
	woodCount += woodPerSecond;
}, 1000);


function shopBuy(itemNum) {
	switch(itemNum) {
		case 100:
			if(money >= 50) {
				if(treeAmount === 0 && Lumberjack == true) {
				lumberJack();
				}
				money -= 50;
				var givenTrees = Math.floor(Math.random() * (110 - 90)) + 90;
				treeAmount += givenTrees
				hideItem("sprucePatch")
				showItem("spruceForest")
				document.getElementById("inputAmount").value = "+" + givenTrees + " trees!";
			}
			else {
				document.getElementById("inputAmount").value = "Not enough money!";
			}
			break;
		case 1:
			if(1==1||money >= 3000 && woodCount >= 200) {
				// money -= 3000;
				// woodCount -= 200;
				hideItem("sawmillBuilding");
				showItem("sawmill");
				showItem("plank")
				showItem("plankAmount")
				sawmillBuilding();
			}
			else {
				document.getElementById("inputAmount").value = "Not enough money!";
			}

			break;
	}
}

// Hides html objects
function hideItem(ID) {
    var x = document.getElementById(ID);
    console.log(x.style.display);
    x.style.display = "none";
}

// Shows html objects
function showItem(ID) {
    var x = document.getElementById(ID);
    console.log(x.style.display);
    x.style.display = "block";
}

// Used to switch between dispalying the different shops
function hideShop() {
    var x = document.getElementById(itemShop);
    console.log(x.style.display);
    x.style.display = "none";
}

var planks = 0;
function sawmillBuilding() {
	planksPerSecond += 0.1;
	moneyPerSecond -= 0.1;
	woodPerSecond -= 0.1;
}

var treeGenArray = ['https://i.imgur.com/S4qPteW.png', 'https://i.imgur.com/4XNkniK.png', 'https://i.imgur.com/ZzEWXuy.png'];
function randomTree () {
	var randomTreeGen = treeGenArray.splice(Math.floor(Math.random() * treeGenArray.length));
}

// Used for delaying each axe swing
var delayTime = 10; //usually 750, 0 when testing the game
var canGo = true;
// uUpgrade affected variables
var woodValue = 2; // The value of each individual piece of wood. Increased using upgrades (not yet implemented)
var treeAmount = 10; // Amount of trees owned
var Lumberjack = false; //if true, disables clicking the tree
// Currency variables and such
var treeStage = 0;
var woodCount = 200; // The amount of wood
var splinters = 0; // The amount of splinters
var treesCutDown = 0; // The amount of trees cut down (duh)
var money = 3000; // The amount of money
var assurance = 0;

// Shows the upgrade box (will probably be replaced)
function showUpgrades() {
    var x = document.getElementById("upgradesContainer");
    console.log(x.style.display);
    if (x.style.display === "block") {
        x.style.display = "none";
        document.getElementById("showUpgrades").innerHTML = "Show upgrades";
    } else {
        x.style.display = "block";
        document.getElementById("showUpgrades").innerHTML = "Hide upgrades";
    }
}

// Realized there wasn't really a need for this but I'll keep it here anyway
	// Restrict input field to numbers (better this way ;-P)
	// function isNumberKey(evt){
	//     var charCode = (evt.which) ? evt.which : event.keyCode
	//     if (charCode > 31 && (charCode < 48 || charCode > 57))
	//         return false;
	//     return true;
	// }

// Prevents "-" (dash) from being written in the input filed
function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    var charStr = String.fromCharCode(charCode);
    if (charStr == "-")
        return false;
    return true;
}

// Changes the cursor to an axe icon when hovering over tree
function changeToAxe() {
	if(Lumberjack == false) {
	treeImage.style.cursor = "url('https://i.imgur.com/fbAJUwR.png'), auto";
	} else {
	treeImage.style.cursor = "";
	}
}

// Booleans used for each tree type
var oakTree = true;
var spruceTree = false;

//0 = Oak tree
//1 = Spruce tree 
async function switchTree(treeNum) {
	switch(treeNum){
		case 0:
			if(treeStage == 0 || treeStage == 7) {
				document.getElementById("treeImage").src = 'https://i.imgur.com/aGBT0tm.png';
				oakTree = true;
				spruceTree = false;
			}
			else {
				document.getElementById("inputAmount").value = "Finish the tree first!";
	    		await sleep(2000);
				document.getElementById("inputAmount").value = "";
			}
			break;
		case 1:
			if(treeStage == 0 || treeStage == 7) {
				document.getElementById("treeImage").src = 'https://art.pixilart.com/3feb11b0ca2d069.png';
				spruceTree = true;
				oakTree = false;
			}
			else {
				document.getElementById("inputAmount").value = "Finish the tree first!";
	    		await sleep(2000);
				document.getElementById("inputAmount").value = "";
			}
			break;
	}
}


async function clickTree() {
	if(treeAmount > 0 && Lumberjack == false) {
		if(treeStage == 0 && canGo) {
			if(oakTree) {
			document.getElementById('treeImage').src='https://i.imgur.com/9dYxQOs.png';
			}
			else if(spruceTree) {
			document.getElementById('treeImage').src='https://i.imgur.com/BQMR8Uz.png';
			}
			treeStage++;
			//document.getElementById("splinterAmount").innerHTML = splinters; //used later for splinters
			canGo = false;
			setTimeout(function () {
	        	canGo = true;
	        }, delayTime)
		}
		else if(treeStage == 1 && canGo) {
			if(oakTree) {
				document.getElementById('treeImage').src='https://i.imgur.com/uUXjx0k.png';
			}
			else if(spruceTree) {
				document.getElementById('treeImage').src='https://i.imgur.com/uyMMK5D.png';
			}
			treeStage++;
			canGo = false;
			setTimeout(function () {
	        	canGo = true;
	        }, delayTime)
		}
		else if(treeStage == 2 && canGo) {
			if(oakTree) {
				document.getElementById('treeImage').src='https://i.imgur.com/RUmLW5d.png';
			}
			else if(spruceTree) {
				document.getElementById('treeImage').src='https://i.imgur.com/a9TLifm.png';
			}
			treeStage++;
			//document.getElementById("woodAmount").innerHTML = woodCount;
			canGo = false;
			setTimeout(function () {
	        	canGo = true;
	        }, delayTime)
		}
		else if(treeStage == 3 && canGo) {
			if(oakTree) {
				document.getElementById('treeImage').src='https://i.imgur.com/TLJzfH6.png';
			}
			else if(spruceTree) {
				document.getElementById('treeImage').src='https://i.imgur.com/kFHe3gB.png';
				treeStage += 2 // Skipping two stages because spruce wood takes shorter
			}
			treeStage++;
			//document.getElementById("woodAmount").innerHTML = woodCount;
			canGo = false;
			setTimeout(function () {
	        	canGo = true;
	        }, delayTime)
		}
		else if(treeStage == 4 && canGo && spruceTree != true) {
			document.getElementById('treeImage').src='https://i.imgur.com/9rr9haX.png';
			treeStage++;
			//document.getElementById("woodAmount").innerHTML = woodCount;
			canGo = false;
			setTimeout(function () {
	        	canGo = true;
	        }, delayTime)
		}
		else if(treeStage == 5 && canGo && spruceTree != true) {
			document.getElementById('treeImage').src='https://i.imgur.com/ZRlTtkj.png';
			treeStage++;
			//document.getElementById("woodAmount").innerHTML = woodCount;
			canGo = false;
			setTimeout(function () {
	        	canGo = true;
	        }, delayTime)
		}
		else if(treeStage == 6 && canGo || treeStage == 7 && canGo) {
			if(oakTree) {
				var oakArray = ['https://i.imgur.com/YGtLRnA.png', 'https://i.imgur.com/5A2LW1e.png']; //makes the last image random
				var randomOak = oakArray.splice(Math.floor(Math.random() * oakArray.length));
				document.getElementById('treeImage').src = randomOak;
			}
			else if(spruceTree) {
				var spruceArray = ['https://i.imgur.com/pT4aSQQ.png', 'https://i.imgur.com/7s14wWl.png'];
				var randomSpruce = spruceArray.splice(Math.floor(Math.random() * spruceArray.length));
				document.getElementById('treeImage').src = randomSpruce;
			}
			if(assurance == 0) {
				woodCount += 5;
				document.getElementById("woodAmount").innerHTML = woodCount;
				assurance++;
				treesCutDown++;
				treeAmount--;
				treeStage++;
				document.getElementById("treeAmount").innerHTML = treeAmount;
				howMuch();
				canGo = false;
				setTimeout(function () {
	        		canGo = true;
	        	}, delayTime)
			} else {
				if(oakTree) {
					document.getElementById('treeImage').src='https://i.imgur.com/aGBT0tm.png';
				}
				else if(spruceTree) {
					document.getElementById("treeImage").src = 'https://art.pixilart.com/3feb11b0ca2d069.png';
				}
				treeStage = 0;
				assurance--;
			}
		}
	} else {
		if(Lumberjack == false) {
		document.getElementById("inputAmount").value = "No more trees left!";
		await sleep(3000);
		document.getElementById("inputAmount").value = "";
		}
		else {
		document.getElementById("inputAmount").value = "He prefers to work alone.";
		await sleep(3000);
		document.getElementById("inputAmount").value = "";
		}
	}
}

// Displays how much wood was gained from each tree in the input field
async function howMuch() {
	document.getElementById("inputAmount").value = "+5 wood";
	await sleep(1000);
	document.getElementById("inputAmount").value = "";
}

// Reads the input value and subtracts it from "woodCount"
// Only sells if there is enough wood
var inputValue = document.getElementById("inputAmount").value;
async function sellWood() {
	var inputValue = document.getElementById("inputAmount").value;
	var woodCountAmount = woodCount;
	var inputSecure = woodCountAmount -= inputValue;
	if(inputValue == "") {
		document.getElementById("inputAmount").value = "How much wood? Type here.";
	}
	if(inputSecure >= 0) {
		woodCount = inputSecure;
		money += inputValue * woodValue;
		document.getElementById("woodAmount").innerHTML = woodCount;
		document.getElementById("moneyAmount").innerHTML = money;
	} else 
	document.getElementById("inputAmount").value = "Not enough wood!";
	await sleep(1000);
	document.getElementById("inputAmount").value = "";
}

// Allows you to use the "enter" key when writing sell amount
document.onkeydown = function(e){
    e = e || window.event;
    var key = e.which || e.keyCode;
    if(key===13){
 		sellWood();
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
			money += 100;
			break;
		default:
			console.log("error in upgrade function");
			break;
	}
}

async function showLumberjackUpgrades() {
	if(treeStage == 0 || treeStage == 7) {
	    var x = document.getElementById("lumberjackUpgrades");
	    console.log(x.style.display);
	    if (x.style.display === "block") {
	        x.style.display = "none";
	    } else {
	        x.style.display = "block";
	    }
    } else {
    	document.getElementById("inputAmount").value = "Finish the tree first!";
    	await sleep(2000);
		document.getElementById("inputAmount").value = "";
    }
}

// Unhides the lumberjack if hidden
// Hides him if he is not hidden
// Calls the "lumberJack" function once to get it started
function showLumberjack() {
	if(treeStage == 0 || treeStage == 7) {
	    var x = document.getElementById("lumberjackImage");
	    console.log(x.style.display);
	    console.log(Lumberjack);
	    if (x.style.display === "block") {
	        x.style.display = "none";
	        Lumberjack = false;
	    } else {
	        x.style.display = "block";
	        Lumberjack = true;
	        lumberJack();
	    }
	}
}

var lJackSpeed = 600; // The initial speed of the lumberjack
var lJackTreeStage = 1; // The stage of the tree, goes up for every hit from the lumberjack. Is reset for every tree.
// Lumberjack animation and tree animation
// Recursion :O
async function lumberJack() {
	if(treeStage == 0 || treeStage == 7) {
		// Variables used to modify the lumberjack's speed
		var lJackSpeed2 = lJackSpeed;
		var lJackSpeedHalf = lJackSpeed2/2
		var lJackSpeedHalf2 = lJackSpeedHalf
		var lJackSpeedQuart = lJackSpeed2/2
		// Gets the class that dictates the lumberjac's position and allows the funcion to modify it
		var x = document.getElementById("lumberjackImage");
		if(Lumberjack == true && treeAmount > 0 && lJackTreeStage < 7) {
			await sleep(lJackSpeed);
			document.getElementById('lumberjackImage').src='https://i.imgur.com/YsM2zaK.png';
			await sleep(lJackSpeed);
			document.getElementById('lumberjackImage').src='https://i.imgur.com/2KsEfXR.png';
			await sleep(lJackSpeed);
			document.getElementById('lumberjackImage').src='https://i.imgur.com/nUiwJEV.png';
			if(lJackTreeStage == 1) {
				if(oakTree) { // Checks what tree is currently displayed and changes accordingly
					document.getElementById('treeImage').src='https://i.imgur.com/wsftoQ8.png';
				} 
				else if(spruceTree) {
					document.getElementById('treeImage').src='https://i.imgur.com/BQMR8Uz.png';
				}
				lJackTreeStage++;
				await sleep(lJackSpeedHalf);
				x.style.left = "20px"; // Moves the lumberajack
				await sleep(lJackSpeedHalf);
				lumberJack(); // Calls the function again
			}
			else if(lJackTreeStage == 2) {
				if(oakTree) {
					document.getElementById('treeImage').src='https://i.imgur.com/ta996SE.png';
				}
				else if(spruceTree) {
					document.getElementById('treeImage').src='https://i.imgur.com/uyMMK5D.png';
				}
				lJackTreeStage++;
				await sleep(lJackSpeedHalf);
				x.style.left = "30px";
				await sleep(lJackSpeedHalf);
				lumberJack();
			}
			else if(lJackTreeStage == 3) {
				if(oakTree) {
					document.getElementById('treeImage').src='https://i.imgur.com/mQMzfS8.png';
				}
				else if(spruceTree) {
					document.getElementById('treeImage').src='https://i.imgur.com/a9TLifm.png';
				}
				lJackTreeStage++;
				await sleep(lJackSpeedHalf);
				x.style.left = "45px";
				await sleep(lJackSpeedHalf);
				lumberJack();
			}
			else if(lJackTreeStage == 4) {
				if(oakTree) {
					document.getElementById('treeImage').src='https://i.imgur.com/3WXtrGz.png';
				}
				else if(spruceTree) {
					document.getElementById('treeImage').src='https://i.imgur.com/kFHe3gB.png';
				}
				lJackTreeStage++;
				await sleep(lJackSpeedHalf);
				x.style.left = "60px";
				await sleep(lJackSpeedHalf);
				lumberJack();
			}
			else if(lJackTreeStage == 5) {
				if(oakTree) {
					document.getElementById('treeImage').src='https://i.imgur.com/mbMZysM.png';
				}
				else if(spruceTree) {
					document.getElementById('treeImage').src='https://i.imgur.com/pT4aSQQ.png';
				}
				lJackTreeStage = 1;
				treeAmount--;
				woodCount += 5;
				document.getElementById("treeAmount").innerHTML = treeAmount;
				document.getElementById("woodAmount").innerHTML = woodCount;
				await sleep(lJackSpeedQuart);
				x.style.left = "25px";
				await sleep(lJackSpeedQuart);
				x.style.left = "5px";
				await sleep(500);
				if(oakTree) {
					document.getElementById('treeImage').src='https://i.imgur.com/aGBT0tm.png';
				}
				else if(spruceTree) {
					document.getElementById("treeImage").src = 'https://art.pixilart.com/3feb11b0ca2d069.png';
				}
				lumberJack();
			}
		} else {
			document.getElementById('lumberjackImage').src='https://i.imgur.com/UCmm79r.png';
		}
	}
}

// Clicking on certain elements will trigger a description in the input field
async function itemDescription(item) {
		switch(item){
		case 0:
	    	document.getElementById("inputAmount").value = "Current amount of money.";
	    	await sleep(2000);
			document.getElementById("inputAmount").value = "";
			break;
		case 1:
	    	document.getElementById("inputAmount").value = "Money";
	    	await sleep(2000);
			document.getElementById("inputAmount").value = "";
			break;
		case 2:
	    	document.getElementById("inputAmount").value = "Logs";
	    	await sleep(2000);
			document.getElementById("inputAmount").value = "";
			break;
		case 3:
	    	document.getElementById("inputAmount").value = "Current amount of logs.";
	    	await sleep(2000);
			document.getElementById("inputAmount").value = "";
			break;
		case 4:
	    	document.getElementById("inputAmount").value = "Trees";
	    	await sleep(2000);
			document.getElementById("inputAmount").value = "";
			break;
		case 5:
	    	document.getElementById("inputAmount").value = "Current amount of trees.";
	    	await sleep(2000);
			document.getElementById("inputAmount").value = "";
			break;
		case 6:
	    	document.getElementById("inputAmount").value = "Current amount of planks.";
	    	await sleep(2000);
			document.getElementById("inputAmount").value = "";
			break;
		default:
			console.log("error in description function");
			break;
		case 10:
			hideItem("itemShop");
			showItem("upgradeShop");
			break;
		case 20:
			hideItem("upgradeShop");
			showItem("itemShop");
			break;
	}
}
