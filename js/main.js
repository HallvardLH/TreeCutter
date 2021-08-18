/*=====================================================================================
							Helper and shorthand functions
=======================================================================================*/
const storage = window.localStorage;

const byId = id => document.getElementById(id);

const byClass = className => document.getElementsByClassName(className);

const replaceText = (id, text) => byId(id).innerHTML = text;

const scale = (num, inMin, inMax, outMin, outMax) => { // For creating graphs
    return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function w(input) { // Shortcut for the winow[] function
    return window[input];
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function boolean(variable) { // Remember to input variable name as string
    window[variable] = !window[variable];
}

function randomInt(min, max) { // Retruns a number that isn't an integer
    return Math.random() * (max - min + 1) + min;
}

function oneDec(number) { // Limits a number to one decimal
    return Math.round(number * 10) / 10;
}

function twoDec(number) { // Limits a number to two decimals
    return Math.round(number * 100) / 100;
}

function threeDec(number) { // Limits a number to three decimals
    return Math.round(number * 1000) / 1000;
}

function isOdd(num) { return num % 2; }

function imageReplace(id, src) { // Rather self-explanatory
    byId(id).src = src;
}

function playSound(sound) {
    var audio = byId(sound);
    audio.currentTime = 0;
    audio.play();
}

function hide(id) { // Hides html elements
    byId(id).style.display = "none";
}

function show(id) { // Shows html elements
    byId(id).style.display = "block";
}

function changeColor(id, color) {
    byId(id).style.backgroundColor = color;
}

function brightness(id, amount) {
    byId(id).style.filter = 'brightness(' + amount + ')';
}

function toggleShow(id, collapse) {
    if (byId(id).style.display != "none") {
        hide(id);
    } else {
        show(id);
    }

    if (byId(collapse).style.transform == 'rotate(180deg)') {
        byId(collapse).style.transform = 'rotate(0deg)';
    } else {
        byId(collapse).style.transform = 'rotate(180deg)'
    }
}

function focus(id) {
    var x = byId(id);
    x.style.filter = "";
}

function sepia(id) {
    var x = byId(id);
    if (x.style.filter == "") {
        x.style.filter = "sepia(100%)";
    } else {
        x.style.filter = "";
    }
}

function notEnough() {
    messageDisplay('Not enough money!');
}

$(":button").click(function() { // Plays sound when any button is clicked
    playSound('tap');
});



// Declaring currency variables
var money = 0;
var moneyEarned = 0; // A record of how much money has been earned throughout the game

// Tree resources
var oak = 0;
var goldenWood = 0;
var trees = 500;

// Secondary tree resources
var woodchip = 0;
var woodchipEarned = 0;

// Products
var plank = 0;

// Setup variables
var resourceType = "oak";

// Resource values
var oakValue = 1; // The value of each individual piece of wood. Increased using upgrades (not yet implemented)
var goldenWoodValue = 100;
var woodchipValue = 0.01;
var plankValue = 10;

//show('marketSection');

/*=====================================================================================
									 BIG TREE
=======================================================================================*/
// Variable is changed based on whether or not the mouse button is down
var mouseDown = 0;
document.body.onmousedown = function() {
    mouseDown = 1;
}
document.body.onmouseup = function() {
    mouseDown = 0;
}

// Changes the cursor to an axe icon when hovering over tree
function changeToAxe() {
    if (activeTool == 'axe') {
        if (mouseDown == 0) {
            clickTreeImage.style.cursor = "url('images/hatchet.png'), auto";
        }
        if (mouseDown == 1) {
            clickTreeImage.style.cursor = "url('images/hatchetClick.png'), auto";
        }
    }
    if (activeTool == 'chainsaw') {
        clickTreeImage.style.cursor = "url('images/chainsaw48.png'), auto";
    }
}

var activeTool = 'axe';

function chooseTool(which) {
    activeTool = which;
    switch (which) {
        case 'axe':
            woodYieldMultiplier = 1;
            cutStrenght = 1;
            break;

        case 'chainsaw': // Consider changing - chainsaw should change speed, not yield
            woodYieldMultiplier = 2;
            break;

        case 'grenade': // Paste into console command: chooseTool('grenade')
            woodYieldMultiplier = 10;
            cutStrenght = 'all';
            break;
    }
}

var WPT; // Wood per tree
var CPH; // Woodchips per hit
var baseCPH = 10;
var baseWPT = 5;
var axePercent = 0;
var woodYieldMultiplier = 1;
setInterval(function() {
    WPT = (baseWPT + Math.trunc(money * axePercent)) * woodYieldMultiplier;
    CPH = baseCPH * woodYieldMultiplier
}, 100);

var cutStrenght = 1;
var treesCutDown = 0;
var treeStage = 0;
var chipsGained = 0;
var isGolden = false;
var hasSeenGolden = false;
var goldenChance = 0;

function clickTree() {
    if (trees > 0) {
        if (cutStrenght == 0) {
            treeStage = 'oneHit';
        }
        randomExtra = Math.floor(Math.random() * 3);
        if (treeStage < 6) {
            if (isGolden) {
                imageReplace('clickTreeImage', 'images/Trees/goldenStage' + treeStage + '.png');
            } else {
                imageReplace('clickTreeImage', 'images/Trees/redwoodStage' + treeStage + '.png');
            }
            treeStage += cutStrenght;
            woodchip += (CPH + randomExtra);
            chipsGained += (CPH + randomExtra);
        } else if (treeStage == 6) {
            if (isGolden) {
                imageReplace('clickTreeImage', 'images/Trees/goldenTreeEnd');
                goldenWood += (WPT + randomExtra);
            } else {
                imageReplace('clickTreeImage', 'images/Trees/redwoodTreeEnd' + Math.ceil(Math.random() * 2) + '.png');
                oak += (WPT + randomExtra);
                trees -= woodYieldMultiplier;
            }
            woodchip += (CPH + randomExtra);
            chipsGained += (CPH + randomExtra);
            treeStage += cutStrenght;
            if (treesCutDown == 0) {
                messageDisplay('You decide to cut a tree down.');
            }
            treesCutDown++;
            woodchipEarned += chipsGained;
            messageDisplay('+' + (WPT + randomExtra) + ' wood<br />+' + chipsGained + ' chips');
            chipsGained = 0;
        } else {
            treeStage = 0;
            if (goldenChance <= 1) {
                imageReplace('clickTreeImage', 'images/Trees/redwoodTree.png');
                isGolden = false;
                goldenChance += Math.random() * 0.07
                console.log(goldenChance)
            } else {
                imageReplace('clickTreeImage', 'images/Trees/goldenTree.png');
                messageDisplay("You've encountered a golden tree!");
                if (!hasSeenGolden) {
                    displayGold();
                }
                isGolden = true;
                hasSeenGolden = true;
                goldenChance = 0;
            }
        }
    } else {
        imageReplace('clickTreeImage', 'images/Trees/redwoodTreeEnd1.png');
        messageDisplay("You don't have any more trees!");
    }
}

function displayGold() {
    show('goldenWoodIcon');
}

/*=====================================================================================
									                 BUSINESS
=======================================================================================*/
function changeAmount(amount) {
    brightness('bulkOne', 0.4);
    brightness('bulkHundred', 0.4);
    brightness('bulkThousand', 0.4);
    brightness('bulkAll', 0.4);

    if (amount == 1) {
        brightness('bulkOne', 1.1);
    }
    if (amount == 100) {
        brightness('bulkHundred', 1.1);
    }
    if (amount == 1000) {
        brightness('bulkThousand', 1.1);
    }
    if (amount == 'all') {
        brightness('bulkAll', 1.1);
    } else {
        assignAmount = amount;
    }
}

function buyBusiness(which) {
    var ops = opsPerClick;
    if (opsPerClick == 0) {
        var localMoney = money;
        while (localMoney > 0) {
            localMoney -= window[which + 'Price']
            ops++;
        }
    }
    for (var i = 0; i < ops; i++) {
        switch (which) {
            case 'lumberjack':
                if (money > lumberjackPrice) {
                    money -= lumberjackPrice;
                    lumberjackAmount++;
                    lumberjackPrice *= 1.01;
                } else {
                    messageDisplay('Not enough money!');
                }
                break;
            case 'salesman':
                if (money > salesPrice) {
                    money -= salesPrice;
                    salesmenAmount++;
                    salesPrice += 1;
                    updateSalesmenNumbers();
                } else {
                    messageDisplay('Not enough money!');
                }
                break;
            case 'plantation':
                if (money > plantationPrice) {
                    plantationAmount++;
                    money -= plantationPrice;
                    plantationPrice *= 1.01;
                    if (!plantationOwned) {
                        plantationOwned = true;
                    }
                } else {
                    messageDisplay('Not enough money!');
                }
                break;
            case 'sawmill':
                if (money > sawmillPrice) {
                    sawmillAmount++;
                    money -= sawmillPrice;
                    sawmillPrice *= 1.01
                    plank = Math.floor(plank);
                    planksProduced = Math.floor(planksProduced);
                } else {
                    messageDisplay('Not enough money!');
                }
                break;
        }
        createBusinessMenu();
    }
}

setInterval(function showBusinessImages() {
    if (lumberjackAmount > 0) {
        show('lumberjack');
    }
    //if(salesAmount > 0) {
    //	show('sales');
    //}
    if (plantationAmount > 0) {
        show('plantation');
    }
    if (sawmillAmount > 0) {
        show('sawmill');
        show('plankIcon');
    }
}, 100);

function unlockAnim(business, reset) {
    if (reset) {
        pulsate(business, '', true);
    } else {
        pulsate(business, 1.025);
    }
}

var unlockedBusinesses = ['lumberjack'];

/*=====================================================================================
                              GOLDEN TREE
=======================================================================================*/
var effectPool = [];
var occupiedIndexes = 1;

function pickRandomGolden() {
    occupiedIndexes = 1;
    effectPool = ['apple'];
    if (Math.random() < 0.9) {
        effectPool[occupiedIndexes] = 'pear';
        occupiedIndexes++;
    }
    if (Math.random() < 0.7) {
        effectPool[occupiedIndexes] = 'sap';
        occupiedIndexes++;
    }
    if (Math.random() < 0.2) {
        effectPool[occupiedIndexes] = 'banana';
        occupiedIndexes++;
    }
    if (Math.random() < 0.05) {
        effectPool[occupiedIndexes] = 'seed';
        occupiedIndexes++;
    }
    if (Math.random() < 0.02) {
        effectPool[occupiedIndexes] = 'decay';
        occupiedIndexes++;
    }

    return effectPool[Math.floor(Math.random() * effectPool.length)];

}


//SOME IDEAS (and random things I'd like to remember until later)///////
//Garden
////Growing mechanism: random amount of time (within a certain set amount of time) before next plant stage until fully grown
//Wood related businesses
////Heat energy suppliers
////Carpentry firm
////Someone who automatically buys land for you
////When the Earth has no more trees, build rockets to other planets
//Corporate offices
//Resin
//Guerilla warfare becomes a reality as the amount of trees decline drastically
//You have to buy upgrades and troops to defend what few acres of trees are left
//Eventually you realize you need to colonized the solar system and plant trees there instead
//Sawmill Progress bar
//Several Lumberjacks with different names, personalities and traits.

//The ability to choose which axe to swing with out of all the ones you have purchased. You also have to option to use your bare hands
//and there is an achievement for cutting a tree down with only your hands because it takes a few hundred hits.

//Price of certain things fluctuate in relation to how much you sell and so forth
//Market

//Create your own currency, WoodCoin. Possibly be able to name it yourself

//Choices
////Good and bad. Choosing total deforestation or letting the world live through
////a series of choices presented throughout the game

// Pollution level 
// https://aqicn.org/map/world/
// Affects value of WoodCoin
// Affects quality of Earth
// May make your stock value go down
// Affects world population

//https://www.soundsnap.com/tags/chopping?page=4 - chopping sounds

// Third kind of quotation mark: `