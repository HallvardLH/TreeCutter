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
									                 STATS
=======================================================================================*/
var totalTreesCut;
var oakSawmillWPS = 0;
setInterval(function() { // Updating stats values
    if (days < 1) {
        byId("timePlayed").innerHTML = new Date(secondsPlayed * 1000).toISOString().substr(11, 8);
    } else if (days == 1) {
        byId("timePlayed").innerHTML = days + ' day and ' + new Date(secondsPlayed * 1000).toISOString().substr(11, 8);
    } else {
        byId("timePlayed").innerHTML = days + ' days and ' + new Date(secondsPlayed * 1000).toISOString().substr(11, 8) + 'seconds';
    }

    var oakPlantationTrees = oakPlantations * 10 + plantationBonus * oakPlantations;

    byId('WoodPerTree').innerHTML = WPT;
    byId('cutDownByHand').innerHTML = treesCutDown;
    byId('cutDownLumberjack').innerHTML = Math.floor(lumberjackTreesCutDown);
    totalTreesCut = Math.floor(lumberjackTreesCutDown) + treesCutDown;
    byId('cutDownTotal').innerHTML = totalTreesCut;

    byId('population').innerHTML = population;
    byId('treesGrown').innerHTML = Math.floor(treesGrown);
    byId('plantationTrees').innerHTML = oakPlantationTrees;
    byId('rouletteProfit').innerHTML = '$' + rouletteEarned;
    byId('stockProfit').innerHTML = '$' + formatNumber(twoDec(stockSpent + stockEarned));
    byId('stocksBought').innerHTML = stocksBought;
    byId('moneyEarned').innerHTML = '$' + formatNumber(twoDec(moneyEarned));

    // byId('oakTrees').innerHTML = oakPlantationTrees + ' trees';

    // byId('unbuiltPlantations').innerHTML = unbuiltPlantations;

    // byId("lumberjackPrice").innerHTML = '$' + oneDec(lumberjackPrice);
    // byId("plantationPrice").innerHTML = '$' + plantationPrice;
    // byId("sawmillPrice").innerHTML = '$' + sawmillPrice;

    // Per second values
    for (var i = 0; i < woodTypes.length; i++) {
        if (canLumberjackRun(i)) {
            window[landType[i] + 'LumberjackWPS'] = (window[landType[i] + 'Lumberjacks'] * baseLumberjackWPS) * lumberjackWPSMult;
            window[landType[i] + 'LumberjackMPS'] = (window[landType[i] + 'Lumberjacks'] * baseLumberjackMPS) * lumberjackMPSMult;
            window[landType[i] + 'LumberjackTPS'] = (window[landType[i] + 'Lumberjacks'] * baseLumberjackTPS) * lumberjackTPSMult;
        }
    }

    // if(sawmillOn && canSawmillRun()) {
    // 	moneySawmillMPS = (plankSpeed * sawmillPercent * plankPriceMultiplier) * sawmillAmount;
    // } else {
    // 	moneySawmillMPS = 0;
    // }
    byId("moneyPS").innerHTML = 'Per second: ' + formatNumber(twoDec(lumberjackMPS + (sawmillAmount * sawmillMPS)));

    // for(var i = 0; i < woodTypes.length; i++) {
    // 	if(sawmillOn && sawmillWhichWood == woodTypes[i] && canSawmillRun()) {
    // 		oakSawmillWPS = plankBatchSize * sawmillAmount;
    // 	} else {
    // 		oakSawmillWPS = 0;
    // 	}
    // }

    byId("oakPS").innerHTML = 'Per second: ' + formatNumber(twoDec(lumberjackWPS - oakSawmillWPS));

    byId('woodchipPS').innerHTML = 'Per second: ' + formatNumber(twoDec(woodchipLastPS));

    byId("oakTreePS").innerHTML = 'Per second: ' + '~' + formatNumber(twoDec(averageTreesPS + lumberjackTPS));


    if (treesGrown != 0 || totalTreesCut != 0) {
        byId("treesGrownBar").style.width = twoDec((treesGrown / (treesGrown + totalTreesCut)) * 100) + '%';
        byId("treesCutBar").style.width = twoDec((totalTreesCut / (treesGrown + totalTreesCut)) * 100) + '%';
    }

    if (cookieOwned) {
        show('cookieIcon');
        byId('cookieAmount').innerHTML = cookie;
    } else {
        hide('cookieIcon');
    }
}, 100);


var whichIndex = 0;
var moneyOverTime = []
setInterval(function() {
    moneyOverTime[whichIndex] = money;
    whichIndex++;
}, 600);


function statsGraph(which) {
    index = 0;
    var dataArray = window[which];
    if (period == 'day') {
        var dataArray = dataArray.slice(dataArray.length - 100, dataArray.length)
    }
    if (period == 'week') {
        var dataArray = dataArray.slice(dataArray.length - 700, dataArray.length)
    }
    if (period == 'month') {
        var dataArray = dataArray.slice(dataArray.length - 3000, dataArray.length)
    }
    if (period == 'sixMonths') {
        var dataArray = dataArray.slice(dataArray.length - 13000, dataArray.length)
    }

    var sorted = dataArray.slice().sort(function(a, b) {
        return a - b;
    });

    var canvas = byId("statsCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var smallest = sorted[0];
    var largest = sorted[sorted.length - 1];
    var height = 200;
    var start = 2;
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.moveTo(330, height);
    ctx.lineTo(330, 0);
    ctx.lineTo(start, 0);
    ctx.lineTo(start, 200);
    ctx.lineTo(330, 200);
    ctx.moveTo(start, 200);

    ctx.fillText(twoDec(largest), 340, 10);
    ctx.fillText(twoDec(((largest - smallest) / 2) + smallest), 340, height / 2);
    ctx.fillText(twoDec(smallest), 340, height);
    ctx.stroke();

    ctx.beginPath();
    for (var i = 3; i < 331; i += 330 / dataArray.length) {
        console.log(dataArray[index], dataArray.length)
        ctx.beginPath();
        ctx.lineTo(i, 200 - scale(dataArray[index], smallest, largest, 0, 200));
        ctx.stroke();
        ctx.strokeStyle = graphColor;
        index++;
    }
}


/*=====================================================================================
									ROULETTE
=======================================================================================*/
$(document).ready(function() {
    $('#rouletteTable').on("click", function(event) {
        bounds = this.getBoundingClientRect();
        var left = bounds.left;
        var top = bounds.top;
        var x = event.pageX - left;
        var y = event.pageY - top;
        var cw = this.clientWidth
        var ch = this.clientHeight
        var iw = this.naturalWidth
        var ih = this.naturalHeight
        var px = x / cw * iw
        var py = y / ch * ih
        if (!isSpinning) {
            roulettePlace(px, py);
        }
    });
});

var betValues = [];
var specialPaid = [];

function resetBetArray() {
    for (var i = 0; i <= 45; i++) {
        betValues[i] = 0;
        specialPaid[i] = false;
        byId('rouletteBets').innerHTML = '';
    }
}
resetBetArray();

var inHand = 1;
var chipVals = [1, 5, 10, 50, 100, 1000];
switchInHand(1);

function switchInHand(which) {
    for (var i = 0; i < chipVals.length; i++) {
        byId('ro' + chipVals[i]).style.width = '40px';
        byId('ro' + chipVals[i]).style.height = '40px';
    }
    inHand = which;
    byId('ro' + which).style.width = '50px';
    byId('ro' + which).style.height = '50px';
}

var betsDisplay = '';
var betting = 0;
var placed = 0;
var rouletteEarned = 0;

function roulettePlace(x, y) {
    if (((money - placed) - inHand) >= 0) {
        if (x > 0 && x < 90 && y > 15 && y < 315) { chosenBet = 0 };
        //top row 3 - 12
        if (x > 90 && x < 190 && y > 15 && y < 115) { chosenBet = 3 };
        if (x > 190 && x < 290 && y > 15 && y < 115) { chosenBet = 6 };
        if (x > 290 && x < 390 && y > 15 && y < 115) { chosenBet = 9 };
        if (x > 390 && x < 490 && y > 15 && y < 115) { chosenBet = 12 };
        // top row 15 - 24
        if (x > 520 && x < 620 && y > 15 && y < 115) { chosenBet = 15 };
        if (x > 620 && x < 720 && y > 15 && y < 115) { chosenBet = 18 };
        if (x > 720 && x < 820 && y > 15 && y < 115) { chosenBet = 21 };
        if (x > 820 && x < 920 && y > 15 && y < 115) { chosenBet = 24 };
        // top row 27 - 36
        if (x > 940 && x < 1040 && y > 15 && y < 115) { chosenBet = 27 };
        if (x > 1040 && x < 1140 && y > 15 && y < 115) { chosenBet = 30 };
        if (x > 1120 && x < 1240 && y > 15 && y < 115) { chosenBet = 33 };
        if (x > 1240 && x < 1340 && y > 15 && y < 115) { chosenBet = 36 };

        // middle row 2 - 11
        if (x > 90 && x < 190 && y > 115 && y < 215) { chosenBet = 2 };
        if (x > 190 && x < 290 && y > 115 && y < 215) { chosenBet = 5 };
        if (x > 290 && x < 390 && y > 115 && y < 215) { chosenBet = 8 };
        if (x > 390 && x < 490 && y > 115 && y < 215) { chosenBet = 11 };
        // middle row 14 - 23
        if (x > 520 && x < 620 && y > 115 && y < 215) { chosenBet = 14 };
        if (x > 620 && x < 720 && y > 115 && y < 215) { chosenBet = 17 };
        if (x > 720 && x < 820 && y > 115 && y < 215) { chosenBet = 20 };
        if (x > 820 && x < 920 && y > 115 && y < 215) { chosenBet = 23 };
        // middle row 26 - 35
        if (x > 940 && x < 1040 && y > 115 && y < 215) { chosenBet = 26 };
        if (x > 1040 && x < 1140 && y > 115 && y < 215) { chosenBet = 29 };
        if (x > 1120 && x < 1240 && y > 115 && y < 215) { chosenBet = 32 };
        if (x > 1240 && x < 1340 && y > 115 && y < 215) { chosenBet = 35 };

        // bottom row 1 - 10
        if (x > 90 && x < 190 && y > 215 && y < 315) { chosenBet = 1 };
        if (x > 190 && x < 290 && y > 215 && y < 315) { chosenBet = 4 };
        if (x > 290 && x < 390 && y > 215 && y < 315) { chosenBet = 7 };
        if (x > 390 && x < 490 && y > 215 && y < 315) { chosenBet = 10 };
        // bottom row 13 - 22
        if (x > 520 && x < 620 && y > 215 && y < 315) { chosenBet = 13 };
        if (x > 620 && x < 720 && y > 215 && y < 315) { chosenBet = 16 };
        if (x > 720 && x < 820 && y > 215 && y < 315) { chosenBet = 19 };
        if (x > 820 && x < 920 && y > 215 && y < 315) { chosenBet = 22 };
        // bottom row 25 - 34
        if (x > 940 && x < 1040 && y > 215 && y < 315) { chosenBet = 25 };
        if (x > 1040 && x < 1140 && y > 215 && y < 315) { chosenBet = 28 };
        if (x > 1120 && x < 1240 && y > 215 && y < 315) { chosenBet = 31 };
        if (x > 1240 && x < 1340 && y > 215 && y < 315) { chosenBet = 34 };

        //12s
        if (x > 90 && x < 490 && y > 315 && y < 415) { chosenBet = 37; };
        if (x > 520 && x < 920 && y > 315 && y < 415) { chosenBet = 38; };
        if (x > 940 && x < 1340 && y > 315 && y < 415) { chosenBet = 39; };

        //1-18 and 19-36
        if (x > 90 && x < 290 && y > 430 && y < 540) { chosenBet = 40; };
        if (x > 1090 && x < 1290 && y > 430 && y < 540) { chosenBet = 45; };
        // Even and odd
        if (x > 290 && x < 490 && y > 430 && y < 540) { chosenBet = 41; };
        if (x > 890 && x < 1090 && y > 430 && y < 540) { chosenBet = 44; };
        // Red and black
        if (x > 490 && x < 690 && y > 430 && y < 540) { chosenBet = 42; };
        if (x > 690 && x < 890 && y > 430 && y < 540) { chosenBet = 43; };


        placed += inHand;
        betValues[chosenBet] += inHand;
        betting += inHand;
        byId('rouletteBets').innerHTML = '';

        var specialBets = ['1-12', '13-24', '25-36', '1-18', 'Even', 'Red', 'Black', 'Odd', '19-36'];
        for (var i = 0; i < betValues.length; i++) {
            if (betValues[i] != 0) {
                if (i <= 36) {
                    betsDisplay += '<span class="stockText">$' + betValues[i] + '</span><span class="stockVal">' + i + '</span><hr />';
                } else {
                    betsDisplay += '<span class="stockText">$' + betValues[i] + '</span><span class="stockVal">' + specialBets[i - 37] + '</span><hr />';
                }
            }
        }

        byId('rouletteBets').innerHTML = betsDisplay;
        betsDisplay = '';
    } else {
        notEnough();
    }
}

function rouletteSpinInitial() {
    money -= betting;
    rouletteSpin();
}

function endSpin() {
    sleepTime = 100;
}

var sleepTime = 10;
var rouletteLanded = 0;
var isSpinning = false;
var rouletteNoWait = false;
var red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
var black = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
async function rouletteSpin() {
    if (rouletteNoWait) {
        sleepTime = 100;
    }
    if (sleepTime < 100) {
        isSpinning = true;
        byId('spinBtn').disabled = true;
        byId('clearBtn').disabled = true;
        sleepTime *= 1.03;
        random = Math.round(Math.random() * 36);
        byId('rouletteNumber').innerHTML = random;
        for (var i = 0; i < 36; i++) { // Might removem, looks somewhat funky
            if (random == red[i]) { byId('rouletteNumber').style.color = '#d50000'; }
            if (random == black[i]) { byId('rouletteNumber').style.color = 'black'; }
            if (random == 0) { byId('rouletteNumber').style.color = '#1b5e20'; }
        }
        await sleep(sleepTime);
        rouletteSpin();
    } else {
        isSpinning = false;
        byId('spinBtn').disabled = false;
        byId('clearBtn').disabled = false;
        sleepTime = 10;
        rouletteLanded = Math.round(Math.random() * 36)
        byId('rouletteNumber').innerHTML = rouletteLanded;

        byId('rouletteBets').innerHTML = '';

        placed = 0;
        var pot = 0;

        for (var i = 0; i < 36; i++) {
            if (rouletteLanded == red[i]) { byId('rouletteNumber').style.color = '#d50000'; }
            if (rouletteLanded == black[i]) { byId('rouletteNumber').style.color = 'black'; }
            if (rouletteLanded == 0) { byId('rouletteNumber').style.color = '#1b5e20'; }
        }


        for (var i = 0; i < betValues.length; i++) {
            if (betValues[i] != 0) {
                if (i <= 36) {
                    if (i == rouletteLanded) {
                        pot += betValues[i] * 36;
                    }
                } else if (rouletteLanded != 0) {
                    // 1/3s
                    if (!specialPaid[37] && rouletteLanded < 13 && betValues[37] != 0) {
                        specialPaid[37] = true;
                        pot += betValues[i] * 3;
                    };
                    if (!specialPaid[38] && rouletteLanded > 12 && rouletteLanded < 25 && betValues[38] != 0) {
                        specialPaid[38] = true;
                        pot += betValues[i] * 3;
                    };
                    if (!specialPaid[39] && rouletteLanded > 24 && betValues[39] != 0) {
                        specialPaid[39] = true;
                        pot += betValues[i] * 3;
                    };

                    // 1-18 and 19-36
                    if (!specialPaid[40] && rouletteLanded < 19 && betValues[40] != 0) {
                        specialPaid[40] = true;
                        pot += betValues[i] * 2;
                    };
                    if (!specialPaid[45] && rouletteLanded > 18 && betValues[45] != 0) {
                        specialPaid[45] = true;
                        pot += betValues[i] * 2;
                    };

                    // Even and odd
                    if (!specialPaid[41] && isOdd(rouletteLanded) == 0 && betValues[41] != 0) {
                        specialPaid[41] = true;
                        pot += betValues[i] * 2;
                    };
                    if (!specialPaid[44] && isOdd(rouletteLanded) == 1 && betValues[44] != 0) {
                        specialPaid[44] = true;
                        pot += betValues[i] * 2;
                    };

                    for (var j = 0; j < 36; j++) {
                        // Changes the color of the big number

                        if (!specialPaid[42] && rouletteLanded == red[j] && betValues[42] != 0) {
                            specialPaid[42] = true;
                            pot += betValues[i] * 2;
                        }
                        if (!specialPaid[43] && rouletteLanded == black[j] && betValues[43] != 0) {
                            specialPaid[43] = true;
                            pot += betValues[i] * 2;
                            byId('rouletteNumber').style.color = 'black';

                        }
                    }
                }
            }
        }
        messageDisplay(pot);
        moneyEarned -= betting - pot;
        rouletteEarned -= betting - pot;
        // if(pot < betting) {
        // 	moneyEarned -= (betting - pot);
        // } else {
        // 	moneyEarned += (pot - betting);
        // }
        money += pot;
        pot = 0;
        betting = 0;
        resetBetArray();
    }
}

/*=====================================================================================
									 TILES (LAND)
=======================================================================================*/

var whichTree = 'oak';




/*=====================================================================================
											Saving
=======================================================================================*/
// Every variable to save
var saveNumber = ['money', 'moneyEarned', 'oak', 'goldenWood', 'woodchip', 'plank', 'lumberjackMPS', 'lumberjackWPS', 'lumberjackTPS', 'baseLumberjackWPS', 'baseLumberjackMPS', 'baseLumberjackTPS', 'lumberjackWPSMult', 'lumberjackMPSMult', 'lumberjackTPSMult', 'oakLumberjacks', 'sawmillUpgrade', 'trees', 'axePercent', 'baseWPT', 'baseCPH', 'sawmillWPSMultiply', 'sawmillMPSMultiply', 'sawmillPPSMultiply', 'baseSawmillWPS', 'baseSawmillMPS', 'baseSawmillPPS', 'sawmillPercent', 'plantationTPSAdd', 'plantationTPSMultiply', 'basePlantationTPS', 'population', 'treesCutDown', 'lumberjackPrice', 'plantationPrice', 'secondsPlayed', 'days', 'plantationAmount', 'lumberjackOn', 'planksProduced', 'lumberjackAmount', 'lumberjackAxeUpgrade', 'sawmillAmount', 'woodSold', 'otherSold', 'plantationChance', 'plantationBonus', 'oakPlantations', 'treesGrown', 'lumberjackTreesCutDown', 'cutDownByHand', 'whichIndex', 'stocksSold', 'stockSpent', 'stockEarned', 'stocksBought', 'cookie', 'screenClicks', 'oakSalesmen', 'plankSalesmen', 'woodchipSalesmen', 'researchPrice', 'ownedStocks', 'rouletteEarned', 'opsPerClick'];
var saveString = ['graphColor', 'resourceType', 'plantationOwned', 'sawmillOn', 'cookieOwned', 'treeUpgrade0', 'plantationUpgrade0', 'lumberjackUpgrade0', 'settingAutoSave', 'settingButtonHover', 'hasSeenGolden'];
var saveArray = ['moneyOverTime', 'awardedAchievements', 'unlockedResources', 'unlockedBusinesses', 'pastGrowths'];

function save() {
    for (var i = 0; i < saveNumber.length; i++) {
        storage.setItem(saveNumber[i], window[saveNumber[i]]);
    }
    for (var i = 0; i < saveString.length; i++) {
        storage.setItem(saveString[i], JSON.stringify(window[saveString[i]]));
    }
    for (var i = 0; i < saveArray.length; i++) {
        storage.setItem(saveArray[i], JSON.stringify(window[saveArray[i]]));
    }
    saveStocks();
}

function loadUp() {
    if (saveNumber == undefined) {
        settingAutoSave = false;
        storage.clear();
        location.reload();
    }
    if (storage.length != 0) {
        for (var i = 0; i < saveNumber.length; i++) {
            window[saveNumber[i]] = Number(storage.getItem(saveNumber[i]));
        }
        for (var i = 0; i < saveString.length; i++) {
            window[saveString[i]] = JSON.parse(storage.getItem(saveString[i]));
        }
        for (var i = 0; i < saveArray.length; i++) {
            window[saveArray[i]] = JSON.parse(storage.getItem(saveArray[i]));
        }

        setupFunctions();
    } else {
        money = 0; //10000
        moneyEarned = money;
        oak = 0;
        plank = 0;
        resourceType = 'oak';
        switchResourceType(resourceType);
        randomStock = Math.ceil(Math.random() * stockAmount)
        for (var i = 0; i < 1000; i++) {
            changeStock();
        }
        //for (var j = 0; j < Math.ceil(Math.random() * 10); j++) { // Gives the player some free stocks at the start of the game
        //	buyStock(randomStock, true);
        //}
        save();
        console.log('First time load');
        messageDisplay("You buy a plot of land. It's empty except for some boring old trees. You contemplate what to do with them...")
    }

    nav('tree');
    changeOpsPerClick(true);

    createMenuBox('Oak forest', 'oakTile', '', '', '', 'oakTreeAmount', ' trees', '', 'oakLumberjacks', ' lumberjacks assigned', ["assign(true, 'oak', 'lumberjack')", "assign(false, 'oak', 'lumberjack')"], 'lumberjackTileAnchor', ['Assign', 'Remove'], 'landBoxBtn2');

    //byId('botanyBtn').innerHTML = 'Research!<br />$' + researchPrice;

    var nameArray = ['Tree', 'Wood'];
    var woodOrTree = nameArray[Math.floor(randomInt(0, 1))];
    for (var i = 0; i < byClass('name').length; i++) {
        byClass('name')[i].innerHTML = woodOrTree + ' Cutter';
    }
}

var previousString;

function setupFunctions() {
    byId('colorPicker').value = graphColor;

    if (hasSeenGolden) {
        show('goldenWoodIcon');
    }

    if (lumberjackOn == 0) {
        document.getElementById('lumberjackPause').innerHTML = 'Resume';
    }

    switchResourceType(resourceType);

    if (Number(storage.chainsaw) == 1) {
        show('chainsawTool');
    }

    byId('clickTreeImage').src = 'images/Trees/' + whichTree + 'Tree.png';

    for (let i = 0; i < stockAmount; i++) {
        var stock = window['stock' + i]
        if (stock.owned > 0) {
            createPortfolio(i);
        }
    }

    for (let i = 0; i < 10; i++) {
        string = Math.floor(Math.random() * unrelatedNews.length);
        if (string == previousString) {
            string = Math.floor(Math.random() * unrelatedNews.length);
        }
        previousString = string;
        createNews(unrelatedNews[string]);
    }
    console.log('Welcome back!')
}

// Saves when exiting or refreshing
window.onbeforeunload = function exitSave() {
    if (settingAutoSave) {
        save();
    }
}

// Save game manually
$("#saveGame").click(async function() {
    save();
    messageDisplay('Game saved', 'orange');
})

// Saves automatically every set amount of time (currently 5 minutes)
setInterval(function saveRepeat() {
    save();
    messageDisplay('Game saved', 'orange');
}, 300000);

// Wipes saved data and reloads the page
$("#restartGame").click(async function() {
    settingAutoSave = false;
    storage.clear();
    location.reload();
});

/*=====================================================================================
									 UPGRADES
=======================================================================================*/
//========= TREE =======
var treeUpgrade0 = {
    name: [
        'Stone axe',
        'Hatchet',
        'Battle axe',
        'Tomahawk',
        'Cleaving axe',
        'Medieval axe',
        'Felling axe',
        'Splitting maul',
        'Double-bladed axe',
        'Tactical axe',
        'Royal axe',
        'Futuristic axe',
        'Firefighter axe',
        'Golden axe'
    ],

    description: [
        "A rock attatched to a stick with a rope. You've got to start somewhere, I guess...",
        'A standard axe, its grip feels good in your hand.',
        'An axe rather unfit for chopping wood. Perfect for killing though.',
        'Small, lightwieght and perfect for a camping trip!',
        'Much like a hatchet, but heavier. Its weight allows for a heavy swing.',
        'You found this cool axe at the antique store.',
        'A heavy, wedge shaped axe used to split wood lengthways.',
        'Heavy like a felling axe, this axe is used to split wood into kindling for bonfires.',
        "Another one of those axes that you really shouldn't be cutting trees with. Looks pretty cool though.",
        "Axe used by the military and police to do all sorts of things, usually not chopping trees.",
        "An axe worthy of a king.", "An axe 200 years younger than you. How did you get ahold of this?",
        'Why would you cut wood with this?',
        "It's not really made out of gold, just sprayed with gold paint..."
    ],

    image: 'hatchet',
    price: 10,
    priceInc: 1.02,
    priceMin: 10,
    effect: '\n\u2022 +1 wood per tree.<br />\n\u2022 +10 woodchips per chop.',
    effectVar: ['baseWPT', 'baseCPH'],
    effectVal: [1, 10],
    effectTexts: 2,
    effectPrefix: ['', ''],
    effectSuffix: [' wood per tree.', ' chips per chop.'],
    id: 0,
    tier: 0
};
var treeUpgrades = 1;

//========= PLANTATION =======
var plantationUpgrade0 = {
    name: [
        'Better organizing',
        'Land enlargement',
        'Court ruling',
        'Corruption'
    ],

    description: [
        'Better organized plantations allow each plantation to grow 1 more tree.',
        'A contract that allows you to increase the size of each plantation by 10%',
        'After a lenghty court case, the judge rules in your favor and you are allowed to expand your plantations.',
        'You bribe a government official to increase the size of your plantations.'
    ],

    image: 'document',
    price: 10,
    priceInc: 1.02,
    priceMin: 100,
    effect: '\n\u2022 +1 tree for each plantation.',
    effectVar: ['plantationBonus'],
    effectVal: [1],
    effectTexts: 1,
    effectPrefix: [''],
    effectSuffix: [' extra trees.'],
    id: 0,
    tier: 0
};
var plantationUpgrades = 1;

//========= LUMBERJACK =======
var lumberjackUpgrade0 = {
    name: [
        'Coffee',
        'Cocaine supply',
        'Heroin supply'
    ],

    description: [
        'A nice cup of coffe to quicken your lumberjacks.',
        'You start to regularly administer cocaine to your lumberjacks in order to increase their work speed.',
        "The cocaine high just isn't enough. The lumberjacks start to shoot heroin up their arms to further increase their work speed."
    ],

    image: 'pills',
    price: 100,
    priceInc: 1.1,
    priceMin: 100,
    effect: '\n\u2022 Doubles production.',
    effectVar: ['lumberjackWPSMult', 'lumberjackMPSMult', 'lumberjackTPSMult'],
    effectVal: [1, 1, 1],
    effectTexts: 1,
    effectPrefix: ['Multiplier: '],
    effectSuffix: [''],
    id: 0,
    tier: 0
};
var lumberjackUpgrades = 1;


//========= SAWMILL =======
var sawmillUpgrade0 = {
    name: [
        'Better machinery',
        'How do you cut the sea in half? With a sea-saw'
    ],

    description: [
        'Better gears allow for faster saws.',
        "A horrible joke..."
    ],
    image: 'grayCog',
    price: 1000,
    priceInc: 1.03,
    priceMin: 1000,
    effect: '\n\u2022 10% speed increase.',
    effectVar: ['sawmillPercent'],
    effectVal: [0.1],
    effectTexts: 1,
    effectPrefix: ['Speed multiplier: '],
    effectSuffix: [''],
    id: 0,
    tier: 0
};
var sawmillUpgrades = 1;


function createUpgrades(menu) {
    byId('upgradeAnchor').innerHTML = '';
    for (var i = 0; i < window[menu + 'Upgrades']; i++) {
        var upgrade = window[menu + 'Upgrade' + i];
        var tier = upgrade.tier;
        if (money - upgrade.price >= 0) {
            var afford = 'color:#3dc62b; text-shadow: 0 0 3px green';
        } else {
            var afford = 'color:#fc4f49; text-shadow: 0 0 3px #FF0000';
        }
        var effectStr = '';
        for (var j = 0; j < upgrade.effectTexts; j++) {
            effectStr += '\n\u2022 ' + upgrade.effectPrefix[j] + oneDec(window[upgrade.effectVar[j]]) + upgrade.effectSuffix[j];
            if (j + 1 != upgrade.effectTexts) {
                effectStr += '<br />';
            }
        }

        if (upgrade.name[tier] == undefined) {
            var name = 'Upgrade ' + tier;
            var desc = '';
        } else {
            var name = upgrade.name[tier];
            var desc = '<hr /><div class="upgradeDesc">' + upgrade.description[tier] + '</div>';
        }
        createMenuBox('<font style="color:white; font-size:20px;">' + name + '</font>', upgrade.image, 'upgrade', '<font style="font-size:14px; position:relative; bottom:22px;">Level: ' + tier + '</font><br /><font style="font-size:25px; position:relative; bottom:12px;' + afford + ';">$' + upgrade.price + '</font><hr /><font style="color:#d98d0f;">' + upgrade.effect + '</font><hr />Current values:<br />' + effectStr, '', '', '', desc, 'upgradeDesc', '', ['buyUpgrade(`' + (menu + 'Upgrade' + upgrade.id) + '`, `' + menu + '`,' + upgrade.id + ')'], 'upgradeAnchor', ['Purchase'], 'landBoxBtn1', menu + 'Upgrade' + upgrade.id);
    }
}

async function buyUpgrade(id, menu, number) {
    upgrade = window[id];
    if (money - upgrade.price >= 0) {
        money -= upgrade.price;
        console.log(upgrade.priceInc)
        upgrade.price *= upgrade.priceInc;
        upgrade.price = Math.ceil(upgrade.price);
        upgrade.price += upgrade.priceMin;
        upgrade.tier++;
        createUpgrades(menu);
        determinePS(id);
    } else {
        if (Math.random() > 0.01) {
            messageDisplay('You need $' + twoDec(Math.abs(money - upgrade.price)) + ' more.');
        } else {
            messageDisplay("Clicking it over and over won't change the price...");
        }
    }
}

function determinePS(which) {
    upgrade = window[which];
    for (var i = 0; i < upgrade.effectVar.length; i++) {
        window[upgrade.effectVar[i]] += upgrade.effectVal[i];
    }
}

/*=====================================================================================
									 MISCELLANEOUS
=======================================================================================*/
var colorArray = ['blue', 'red', 'pink', 'green', 'orange', 'purple', 'yellow']
    // var prevColor;
    // setInterval(function rainbow() {
    // 	var elem = document.getElementById('rainbowFont');
    //     elem.style.color = colorArray[Math.floor(Math.random() * 8)];
    //    	if(prevColor == elem.style.color) {
    //    		elem.style.color = colorArray[Math.floor(Math.random() * 8)]; //Lowers the chance
    //    	}
    //     prevColor = elem.style.color;
    // }, 50);

var suffixes = [' million', ' billion', ' trillion', ' quadrillion', ' quintillion', ' sextillion', ' septillion', ' octillion', ' nonillion']

function formatNumber(number, money) {
    if (number < 1000000) {
        if (money) {
            return '$' + number.toFixed(2);
        } else {
            return number;
        }
    }
    var arrayIndex = -4;
    number++;
    for (var compare = 1; arrayIndex < 20; compare *= 1000) {
        arrayIndex++;
        if (compare >= number) {
            compare /= 1000;
            number /= compare
            number = Math.round(number * 100) / 100
            if (money) {
                return '$' + number.toFixed(2) + suffixes[arrayIndex];
            }
            return number + suffixes[arrayIndex];
        }
    }
}

var oldValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var animationSpeed = 0.3;

function animateNumber(variable, id, num, round) {
    displayedValue = oldValues[num];
    var actualValue = window[variable];

    if (round) {
        document.getElementById(id).innerHTML = formatNumber(Math.floor(displayedValue += (actualValue - displayedValue) * animationSpeed + 0.05))
    } else {
        document.getElementById(id).innerHTML = formatNumber(displayedValue += (actualValue - displayedValue) * animationSpeed, true)
    }
    oldValues[num] = twoDec(displayedValue += (actualValue - displayedValue) * animationSpeed);
}

setInterval(function() {
    animateNumber('money', 'moneyAmount', 0, false);
    animateNumber('oak', 'oakWoodAmount', 1, true);
    animateNumber('woodchip', 'woodchipAmount', 2, true);
    animateNumber('plank', 'planksAmount', 3, true);
    animateNumber('planksProduced', 'planksProduced', 4, true);
    animateNumber('goldenWood', 'goldenWoodAmount', 5, true);
    animateNumber('trees', 'treeAmount', 6, true);

}, 33);

hide('treeSpectrum'); // Hiding this for now.

var opsPerClick = 1;

function changeOpsPerClick(load) {
    console.log(opsPerClick)
    if (!load) {
        if (opsPerClick == 1) {
            opsPerClick = 10;
        } else if (opsPerClick == 10) {
            opsPerClick = 100;
        } else if (opsPerClick == 100) {
            opsPerClick = 1000;
        } else if (opsPerClick == 1000) {
            opsPerClick = 0;
        } else if (opsPerClick == 0) {
            opsPerClick = 1;
        }
    }
    if (opsPerClick != 0) {
        byId('opsPerClickDisplay').innerHTML = opsPerClick;
    } else {
        byId('opsPerClickDisplay').innerHTML = 'All';
    }
}

// Options
var settingAutoSave = false;
var settingButtonHover = false;

function settingChange(setting) {
    boolean('setting' + setting);
    console.log(setting)
    byId(setting).innerHTML = window['setting' + setting];
}

function createBusinessMenu() {
    byId('businessPanelAnchor').innerHTML = ''; // Clears the menu to avoid duplicates
    for (var i = 0; i < unlockedBusinesses.length; i++) { // Loops through unlocked businesses and creates their menu
        createBusinessPanel(unlockedBusinesses[i]);
    }
}
//createBusinessPanel('lumberjack', 'lumberjack', 'Test')
//createBusinessPanel('sales', 'sales', 'Test')
//createBusinessPanel('plantation', 'plantation', 'Test')

function createBusinessPanel(business) {
    createMenuBox(business.charAt(0).toUpperCase() + business.slice(1), business, business + 'Panel', window[business + 'Price'], '', '', '$', window[business + 'Amount'] + ' owned', '', '', ['buyBusiness(`' + business + '`)', 'createUpgrades(`' + business + '`)'], 'businessPanelAnchor', ['Purchase', 'View upgrades'], 'landBoxBtn2', '');
}

var buttonId = 0;

function createMenuBox(name, image, id, price, priceId, priceClass, priceFill, description, descriptionId, descriptionFill, onclick, location, button, buttonClass, nameTag) {
    idWas = id;
    if (id != '') {
        id = 'id="' + id + '" ';
    } else {
        id = '';
    }

    if (nameTag != '' && nameTag != undefined) {
        nameTag = 'name="' + nameTag + '" ';
    } else {
        nameTag = '';
    }

    if (description != '' || descriptionId != '') {
        description = '<span id="' + descriptionId + '">' + description + '</span> ';
    } else {
        description = '';
    }
    var buttonStr;
    if (button != '') {
        buttonStr = '<hr />';
        buttonAmt = buttonClass.substr(buttonClass.length - 1, buttonClass.length);
        for (let i = 0; i < buttonAmt; i++) {
            buttonStr += '<button onclick="' + onclick[i] + '" class="' + buttonClass + '">' + button[i] + '</button>';
        }
        thisButtonId = buttonId + 'b';
        buttonId++;
        if (settingButtonHover) {
            buttonHover = 'onmouseover="show(`' + thisButtonId + '`)" onmouseout="hide(`' + thisButtonId + '`)" ';
            buttonStr = '<div style="display:none" id="' + thisButtonId + '">' + buttonStr + '</div>';
        } else {
            buttonHover = '';
            buttonStr = '<div id="' + thisButtonId + '">' + buttonStr + '</div>';
        }
    } else {
        buttonStr = '';
        buttonHover = '';
    }

    if (idWas == 'upgrade') {
        str = $.parseHTML('<div ' + buttonHover + nameTag + id + ' class="landBox">' + name + '<br /><img class="tile" src="images/' + image + '.png"/><br /><span id="' + priceId + '" class="' + priceClass + '">' + price + '</span>' + priceFill + '<br /><span id="' + descriptionId + '">' + description + '</span>' + descriptionFill + buttonStr + '</div>');
    } else {
        str = $.parseHTML('<div ' + buttonHover + nameTag + id + ' class="landBox"><img class="tile" src="images/' + image + '.png"/>' + name + '<br /><span id="' + priceId + '" class="' + priceClass + '">' + price + '</span>' + priceFill + '<br />' + description + descriptionFill + buttonStr + '</div>');
    }

    $('#' + location).append(str);
}

var screenClicks = 0;
jQuery('*').on('click', function(e) { // Logs clicks for achievement
    e.stopPropagation();
    screenClicks++;
})

// To add a menu, remember to also at it to the navigation buttons
var sections = ['tree', 'lumberjack', 'sales', 'plantation', 'sawmill', 'options', 'achievements', 'upgrades', 'stock', 'info', 'stats', 'business', 'roulette'];
var currentMenu;

function nav(menu) {
    currentMenu = menu;
    var noUpgrade = false;
    //if(window[menu + 'Unlocked'] == false) {
    //	messageDisplay("You have not unlocked " + menu.replace('Section','') + " yet.");
    //	noUpgrade = true;
    //}
    //else {
    for (let i = 0; i < sections.length; i++) {
        hide(sections[i] + 'Section');
        brightness(sections[i] + 'SectionBtn', 1);

        if (sections[i] == menu) {
            hoverEffect(menu + 'SectionBtn', 'filter', 'brightness(1.5)', 'brightness(1)', true);
            brightness(menu + 'SectionBtn', 1.5);
            hoverEffect(sections[i] + 'SectionBtn', 'color', 'white', 'gray', true);
        } else {
            hoverEffect(sections[i] + 'SectionBtn', 'filter', 'brightness(1.5)', 'brightness(1)');
            hoverEffect(sections[i] + 'SectionBtn', 'color', 'white', 'gray');
            byId(sections[i] + 'SectionBtn').style.color = 'gray';
        }
    }
    show(menu + 'Section');
    //}
    if (menu == 'stock') {
        show('stocksSection');
        hide('upgradeSection');
    } else {
        show('upgradeSection');
        hide('stocksSection');
        hide('stockInfo');
    }
    if (menu == 'sales') {
        showSalesBoxes();
        updateSalesmenNumbers();
    }
    if (menu != 'stockInfo') {
        stockDisplayed = false;
    }

    if (!noUpgrade) {
        createUpgrades(menu);
    }
    if (menu == 'business') {
        createBusinessMenu();
    }
}

var secondsPlayed = 0;
var days = 0;
var planksProduced = 0;
setInterval(function() {
    if (secondsPlayed < 86400) {
        secondsPlayed++;
    } else {
        secondsPlayed = 1;
        days++;
    }

}, 1000);

var pulsatingElements = [];
var pulsatingValues = [];
var pulseActive = false;
async function pulsate(startNew, scale, stop) {
    if (scale == undefined || scale == '') {
        scale = 1.1;
    }
    if (stop == true) {
        byId(startNew).style.transform = 'scale(1)';
        byId(startNew).style.filter = 'brightness(1)';
        byId(startNew).style.transition = 'all 0s';
        pulsatingElements[pulsatingElements.indexOf(startNew)] = 'stopped';
    }
    if (startNew != undefined && stop == undefined) {
        pulsatingElements[pulsatingElements.length] = startNew;
        pulsatingValues[pulsatingElements.length - 1] = scale;
    } else {
        for (var i = 0; i < pulsatingElements.length; i++) {
            if (pulsatingElements[i] != 'stopped') {
                byId(pulsatingElements[i]).style.transition = 'all 0.8s';
                byId(pulsatingElements[i]).style.transform = 'scale(' + pulsatingValues[i] + ')';
                byId(pulsatingElements[i]).style.filter = 'brightness(' + (pulsatingValues[i] * 1.5) + ')';
            }
        }
        await sleep(800);
        for (var i = 0; i < pulsatingElements.length; i++) {
            if (pulsatingElements[i] != 'stopped') {
                byId(pulsatingElements[i]).style.transform = 'scale(1)';
                byId(pulsatingElements[i]).style.filter = 'brightness(1)';
            }
        }
    }
    await sleep(500);
    if (!pulseActive || stop == 'initial') {
        pulsate(undefined, scale, 'initial');
        pulseActive = true;
    }
}

var landType = 'oak';

function hoverEffect(element, effect, value, value2, exempt) {
    if (exempt) {
        value2 = value;
    }
    $('#' + element).hover(function() {
        $(this).css(effect, value);
    }, function() {
        $(this).css(effect, value2);
    });
}

var resources = ['oak', 'plank', 'woodchip', 'goldenWood'];

function switchResourceType(type) {
    resourceType = type;
    for (var i = 0; i < resources.length; i++) {
        brightness(resources[i] + 'Icon', 1);
    }
    brightness(type + 'Icon', 1.25);
}

var woodSold = 0;
var otherSold = 0;

function sell(number, auto, sales) {
    if (sales != undefined) {
        chosenResource = sales;
    } else {
        chosenResource = resourceType;
    }
    var resourceTypeLocal = chosenResource;
    isWood = false;
    for (let i = 0; i < landType.length; i++) {
        if (chosenResource == landType[i]) {
            isWood = true;
        }
    }
    if (number == 'all') {
        number = Math.floor(window[resourceTypeLocal]);
    } else if (number == 'half') {
        number = Math.ceil(window[resourceTypeLocal] / 2);
    }

    if (window[resourceTypeLocal] - number >= 0) {
        if (isWood) {
            woodSold += number;
        } else {
            otherSold += number;
        }
        window[resourceTypeLocal] -= number;
        var gain = number * window[chosenResource + 'Value'];
        money += gain;
        moneyEarned += gain;
        if (!auto && number != 0) {
            if (resourceType == 'goldenWood') {
                messageDisplay('Sold ' + number + ' golden wood for ' + twoDec(gain) + '$');
            } else {
                messageDisplay('Sold ' + number + ' ' + chosenResource + ' for ' + twoDec(gain) + '$');
            }
        }
    }
    createUpgrades(currentMenu); // Creates new upgrade box, ensures that the price is green when upgrade can be afforded
}

//'I met a traveller from an antique land who said "Two vast and trunkless legs of stone stand in the desert. Near them, on the sand, Half sunk, a shattered visage lies, whose frown, And wrinkled lip, and sneer of cold command, Tell that its sculptor well those passions read Which yet survive, stamped on these lifeless things The hand that mocked them and the heart that fed. And on the pedestal these words appear "My name is Ozymandias, King of kings, look on my work ye mighty and despair!" Nothing beside remains. Round the decay Of that colossal wreck, boundless and bare, The lone and level sands stretch far away.'

var cheatProgress = [];

function cheatCode(which) { // Click money icon, then woodchip, then wood to open/close cheat menu
    cheatProgress[cheatProgress.length] = which;

    for (var i = 0; i < cheatProgress.length; i++) { // This accounts for entering the wrong code
        if (cheatProgress[i] != i + 1) {
            cheatProgress = [];
        }
    }

    if (cheatProgress.length == 3) {
        if (cheatProgress[0] == 1 && cheatProgress[1] == 2 && cheatProgress[2] == 3) {
            showCheats();
            cheatProgress = [];
        } else {
            cheatProgress = [];
        }
    }
}

var cheat = { c: 0, h: 0, e: 0, a: 0, t: 0, s: 0 }

// Allows you to use the "enter" key when writing sell amount
document.onkeydown = function(e) {
    e = e || window.event;
    var key = e.which || e.keyCode;
    if (key === 13) {
        if (document.getElementById("inputAmount").value != "") {
            sell();
        }
    } else if (key == 67) { // Typing 'cheat' on the keyboard will bring up the cheat menu
        cheat.c = 1;
    } else if (key == 72 && cheat.c == 1) {
        cheat.h = 1;
    } else if (key == 69 && cheat.c == 1 && cheat.h == 1) {
        cheat.e = 1;
    } else if (key == 65 && cheat.c == 1 && cheat.h == 1 && cheat.e == 1) {
        cheat.a = 1;
    } else if (key == 84 && cheat.c == 1 && cheat.h == 1 && cheat.e == 1 && cheat.a == 1) {
        cheat.t = 1;
    } else if (key == 83 && cheat.c == 1 && cheat.h == 1 && cheat.e == 1 && cheat.a == 1 && cheat.t == 1) {
        cheat.c = 0;
        cheat.h = 0;
        cheat.e = 0;
        cheat.a = 0;
        cheat.t = 0;
        showCheats();
    } else {
        cheat.c = 0;
        cheat.h = 0;
        cheat.e = 0;
        cheat.a = 0;
        cheat.t = 0;
    }

}

$(window).bind('keydown', function(event) {
    if (event.ctrlKey || event.metaKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
            case 's':
                messageDisplay('Game saved', 'black')
                event.preventDefault();
                save();
                break;
            case '1':
                event.preventDefault();
                sell(1);
                break;
            case '2':
                event.preventDefault();
                sell(10);
                break;
            case '3':
                event.preventDefault();
                sell(100);
                break;
            case '4':
                event.preventDefault();
                sell(1000);
                break;
            case '5':
                event.preventDefault();
                sell(10000);
                break;
            case '6':
                event.preventDefault();
                sell(100000);
                break;
            case '7':
                event.preventDefault();
                sell(1000000);
                break;
            case '8':
                event.preventDefault();
                sell(10000000);
                break;
            case '9':
                event.preventDefault();
                sell(100000000);
                break;
        }
    }
});

// Shows the cheat interface
async function showCheats() {
    var x = document.getElementById("upgradesContainer");
    if (x.style.display === "block") {
        x.style.display = "none";
        document.getElementById("showCheats").innerHTML = "Cheats";
    } else {
        x.style.display = "block";
        document.getElementById("showCheats").innerHTML = "Hide cheats";
    }
}

var population = 7691230161;
setInterval(function() {
    if (Math.floor(Math.random() * 100) <= 90) {
        population = population += Math.floor(Math.random() * 2);
    } else {
        population--;
    }
    if (earthActive == true) {
        document.getElementById('Population').innerHTML = 'Population: ' + population;
    }
}, 250);

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
                imageReplace('clickTreeImage', 'images/Trees/oakStage' + treeStage + '.png');
            }
            treeStage += cutStrenght;
            woodchip += (CPH + randomExtra);
            chipsGained += (CPH + randomExtra);
        } else if (treeStage == 6) {
            if (isGolden) {
                imageReplace('clickTreeImage', 'images/Trees/goldenTreeEnd');
                goldenWood += (WPT + randomExtra);
            } else {
                imageReplace('clickTreeImage', 'images/Trees/oakTreeEnd' + Math.ceil(Math.random() * 2) + '.png');
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
                imageReplace('clickTreeImage', 'images/Trees/oakTree.png');
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
        imageReplace('clickTreeImage', 'images/Trees/oakTreeEnd1.png');
        messageDisplay("You don't have any more trees!");
    }
}

function displayGold() {
    show('goldenWoodIcon');
}

// Upgrades
function cheatMenu(num) {
    switch (num) {
        case 0:
            if (rouletteNoWait) {
                rouletteNoWait = false;
            } else {
                rouletteNoWait = true;
            }

            break;
        case 1:
            // Upgrade 1 = Better axe
            delayTime = 600;
            break;
        case 2:
            break;
        case 3:
            oak += 1000;
            break;
        case 4:

            break;
        case 5:
            treesCutDown += 100;
            break;
        case 10:
            trees += 1000;
            break;
        case 20:
            money += 1000;
            moneyEarned += 1000;
            break;
    }
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
									                 LUMBERJACK
=======================================================================================*/
var n = lumberjackAmount;
var a = [];
while (n > 0) {
    var s = Math.round(Math.random() * n);
    a.push(s);
    n -= s;
}


var oakLumberjacks = 0;
var lumberjackPrice = 50;
var lumberjackAmount = 0;

//	Lumberjack upgrades
var lumberjackWPS = 0;
var lumberjackMPS = 0;
var lumberjackTPS = 0;

var baseLumberjackWPS = 0.1; // Wood per second
var baseLumberjackMPS = -0.05; // Money per second
var baseLumberjackTPS = -0.01; // Trees per second

var lumberjackWPSMult = 1;
var lumberjackMPSMult = 1;
var lumberjackTPSMult = 1;

var lumberjackAxeUpgrade = 0;

// Cheks if the game is in focus or not, only runs smoothly if in focus
setInterval(function focus() {
    if (!document.hidden) {
        lumberjackProduce(true);
        //sawmillProduce(true);
    }
}, 100);

setInterval(function defocus() {
    if (document.hidden) {
        lumberjackProduce();
        sawmillProduce();
    }
}, 1000);

var lumberjackTreesCutDown = 0;

function canLumberjackRun() {
    return (trees >= Math.abs(baseLumberjackTPS) && money + subtractMoney >= 0)
}

var subtractMoney;
var woodchipLastPS = 0;
var woodTypes = ['oak'];

function lumberjackProduce(focus) {
    subtractWood = (lumberjackAmount * baseLumberjackWPS) * lumberjackWPSMult;
    subtractMoney = (lumberjackAmount * baseLumberjackMPS) * lumberjackMPSMult;
    subtractTrees = (lumberjackAmount * baseLumberjackTPS) * lumberjackTPSMult;
    if (focus) {
        subtractWood = subtractWood / 10;
        subtractMoney = subtractMoney / 10;
        subtractTrees = subtractTrees / 10;
    }

    if (canLumberjackRun() && lumberjackOn == 1) {
        oak += subtractWood;
        woodchip += subtractWood * 10;
        woodchipLastPS = subtractWood * 100;
        trees += subtractTrees;
        lumberjackTreesCutDown += Math.abs(subtractTrees);
        money += subtractMoney;
    }
    lumberjackWPS = subtractWood * 10;
    lumberjackMPS = subtractMoney * 10;
    lumberjackTPS = subtractTrees * 10;

    trees = twoDec(trees);
}

var lumberjackOn = 1; // If this value is 1, the lumberjack can operate, if it is 0 it cannot
function lumberjackPause() {
    var x = byId('lumberjackPause'); // Gets the element for easy access
    if (lumberjackOn == 1) {
        lumberjackOn = 0;
        x.innerHTML = 'Resume'
    } else if (lumberjackOn == 0) {
        lumberjackOn = 1;
        x.innerHTML = 'Pause'
    }
}

/*=====================================================================================
                  SALES
=======================================================================================*/
var unlockedResources = [true, false, false, false, true];
var salesmen = 1;

var resourcesAmount = 0;
var availableResources = [];

var oakSalesmen = 0;
var plankSalesmen = 0;
var woodchipSalesmen = 0;

var salesMultiplier = 1;

var salesPrice = 1;
var salesmenAmount = 0;

function determineSales() {
    unlockedResources.forEach(countTrue);

    function countTrue(item, index) {
        if (item) {
            availableResources[resourcesAmount] = resources[index];
            resourcesAmount++;
        }
    }

    for (var i = 0; i < availableResources.length; i++) {
        sell(salesmen / resourcesAmount, true, availableResources[i]);
    }
    resourcesAmount = 0;
}


var oakRange = 0;
byId('oakRange').addEventListener("input", function() {
    oakRange = byId('oakRange').value;
    byId('oakAssignedDisplay').innerHTML = oakRange;
}, false);

var unassignedSales = 0;


var oakSales = 0;
var woodchipSales = 0;
var plankSales = 0;
var goldenWoodSales = 0;

function assignSalesmen(which) {
    switch (which) {
        case 'oak':
            oakSales = parseInt(byId('oakRange').value);
            unassignedSales -= parseInt(byId('oakRange').value);
            break;
        case 'woodchip':
            woodchipSales = parseInt(byId('woodchipRange').value);
            unassignedSales -= parseInt(byId('oakRange').value);
            break;
    }

    var x = document.getElementsByClassName('slider');
    for (var i = 0; i < x.length; i++) {
        x[i].max = unassignedSales;
    }
}
assignSalesmen();


function createSalesBox(num) {
    createMenuBox('Sell ' + resources[num], resources[num], resources[num] + num, '', '', '', '', 'salesmen assigned', resources[num] + 'Salesmen', '', ["assign(true,'" + resources[num] + "', 'sales')", "assign(false,'" + resources[num] + "', 'sales')"], 'salesAnchor', ['Assign', 'Remove'], 'landBoxBtn2');
}

function showSalesBoxes() {
    byId('salesAnchor').innerHTML = '';
    byId('salesMotherAnchor').innerHTML = '';
    createMenuBox('Hire salesman', 'salesman', '', '', 'salesmanPrice', 'price', '', '', '', '', ['buyBusiness(`salesman`)'], 'salesMotherAnchor', ['Purchase'], 'landBoxBtn1');
    for (var i = 0; i < resources.length; i++) {
        if (unlockedResources[i]) {
            createSalesBox(i);
        }
    }
}

function updateSalesmenNumbers() {
    //byId('salesmanPrice').style.fontSize = '24px';
    //byId('salesmanPrice').style.bottom = '18px';
    //byId('salesmanPrice').style.position = 'relative';
    byId('salesmanPrice').innerHTML = '<br />Price: $' + salesPrice;
    for (var i = 0; i < resources.length; i++) {
        if (unlockedResources[i]) {
            //byId(resources[i] + 'Salesmen').style.position = 'relative';
            //byId(resources[i] + 'Salesmen').style.botton = '18px';
            //byId(resources[i] + 'Salesmen').style.fontSize = '24px';
            byId(resources[i] + 'Salesmen').innerHTML = 'Assigned: ' + w(resources[i] + 'Salesmen');
        }
    }
}

var batchValues = [1, 1, 1, 1, 10];

function salesmenSell() {
    for (var i = 0; i < resources.length; i++) {
        if (w(resources[i] + 'Salesmen') > 0 && window[resources[i]] - (salesMultiplier * w(resources[i] + 'Salesmen')) >= 1) {
            window[resources[i]] -= salesMultiplier * w(resources[i] + 'Salesmen');
            money += w(resources[i] + 'Value') * w(resources[i] + 'Salesmen');
            moneyEarned += w(resources[i] + 'Value') * w(resources[i] + 'Salesmen');

        } else if (w(resources[i] + 'Salesmen') > 0 && window[resources[i]] - (salesMultiplier * w(resources[i] + 'Salesmen')) < 0) {
            money += w(resources[i] + 'Value') * window[resources[i]];
            moneyEarned += w(resources[i] + 'Value') * window[resources[i]];
            window[resources[i]] -= window[resources[i]];
        }
    }
}

setInterval(function() {
    salesmenSell();
}, 1000);

/*=====================================================================================
                                    PLANTATION
=======================================================================================*/
var plantationPrice = 250;
var plantationAmount = 0;
var plantationOwned = false;
var basePlantationTPS = 0;

var pastGrowths = [];
var averageTreesPS = 0;

function growTrees() {
    if (Math.random() > 0.6) { factor = 10; } else if (Math.random() > 0.6) { factor = 5; } else if (Math.random() > 0.5) { factor = 3.3; } else if (Math.random() > 0.5) { factor = 2.5; } else if (Math.random() > 0.4) { factor = 2; } else if (Math.random() > 0.2) { factor = 1.66; } else if (Math.random() > 0.95) { factor = 1; } else if (Math.random() > 0.98) { factor = 0.9; } // Lucky!
    else if (plantationAmount.toString().endsWith(7)) { factor = 0.777; } // Get an impossibly lucky amount
    else { factor = 1.42; }
    var grow = (((plantationAmount * 10) + plantationBonus) / factor) + Math.round(Math.random()) * (((plantationAmount * 10) + plantationBonus)) / 100;
    grow = Math.round(grow);
    if (pastGrowths.length == 100) {
        pastGrowths.shift();
    }
    trees += grow;
    treesGrown += grow;
    pastGrowths[pastGrowths.length] = grow;

    var i = 0;
    var sum = 0
    while (i < pastGrowths.length) {
        sum = sum + pastGrowths[i++];
    }
    averageTreesPS = sum / pastGrowths.length;

    if (plantationAmount > 0) {
        byId('newGrowthDisplay').innerHTML = 'One second passed and <span class="inlineHighlight">' + grow + '</span> new trees matured, making your total trees <span class="inlineHighlight">' + Math.round(trees) + '</span>!';
    }
}

setInterval(function plantationDisplayUpdater() {
    byId('plantationTreeAmountDisplay').innerHTML = (plantationAmount * 10) + (plantationBonus * plantationAmount);
    byId('plantationAmountDisplay').innerHTML = plantationAmount;
    byId('plantationPriceDisplay').innerHTML = '$' + twoDec(plantationPrice);
}, 100);

var plantationTPSMultiply = 1;
var plantationTPSAdd = 0;
var plantationTPS = 0;
setInterval(function plantationPSCalculator() { // Calculates per second values for lumberjack
    plantationTPS = ((basePlantationTPS * plantationTPSMultiply) + plantationTPSAdd) + plantationTPSAdd * plantationAmount;
}, 100);


var plantationSize = 100;

setInterval(function() {
    addPlantationValue('oak');
    growTrees();
}, 1000);

var treesGrown = 0;
var plantationChance = 0.01;
var plantationBonus = 0;
var oakPlantations = 0;

var oakPlantationPS = 0;

function addPlantationValue(type) {
    howMany = (window[type + 'Plantations'] * (10 + plantationBonus)) * plantationChance
    window[type + 'TileTrees'] += howMany;
    treesGrown += howMany;
    window[type + 'PlantationPS'] = howMany;
}

/*=====================================================================================
                                      SAWMILL
=======================================================================================*/
var sawmillPrice = 500

var sawmillWPS = 0;
var sawmillMPS = 0;
var sawmillPPS = 0; // Planks per second

sawmillPPSMultiply = 1;
sawmillMPSMultiply = 1;
sawmillWPSMultiply = 1;

function sawmillDouble() {
    sawmillPPSMultiply *= 2;
    sawmillMPSMultiply *= 2;
    sawmillWPSMultiply *= 2;
}

var baseSawmillWPS = -2; // wood per second
var baseSawmillMPS = -1; // money per second
var baseSawmillPPS = 1;
setInterval(function sawmillPSCalculator() {
    //Wood per second
    sawmillWPS = baseSawmillWPS * sawmillWPSMultiply;
    //Money per second
    sawmillMPS = baseSawmillMPS * sawmillMPSMultiply;
    //Trees per second
    sawmillPPS = baseSawmillPPS * sawmillPPSMultiply;
}, 100);


var sawmillAmount = 0;
setInterval(function sawmillProduceNew() {
    if (money + (sawmillAmount * sawmillMPS) >= 0 && oak + (sawmillAmount * sawmillWPS) >= 0 && sawmillOn) {
        money += (sawmillAmount * sawmillMPS);
        oak += (sawmillAmount * sawmillWPS);
        plank += (sawmillAmount * sawmillPPS);
    }
}, 1000);

var sawmillOn = true;

function sawmillOnOff() {
    var x = byId('sawmillOnOff');
    if (sawmillOn) {
        sawmillOn = false;
        x.innerHTML = 'Turn on'
    } else if (!sawmillOn) {
        sawmillOn = true;
        x.innerHTML = 'Turn off'
    }
}

setInterval(function plantationDisplayUpdater() {
    byId('sawmillMoneyDisplay').innerHTML = '$' + sawmillAmount * Math.abs(sawmillMPS);
    byId('sawmillWoodDisplay').innerHTML = sawmillAmount * Math.abs(sawmillWPS) + ' wood';
    byId('sawmillPlankDisplay').innerHTML = sawmillAmount * sawmillPPS + ' planks';
    byId('sawmillAmountDisplay').innerHTML = sawmillAmount;
    byId('sawmillPriceDisplay').innerHTML = '$' + sawmillPrice;
}, 100);

// Different wood types affect production speed and batch size.

// var sawmillWhichWood = 'oakWood';
// var currentSawmillType = sawmillWhichWood;
// function sawmillWoodType(type) {
//   if(currentSawmillType != type) {
//     producingPlank = 0;
//     planksProducedNow = 0;
//     currentSawmillType = type;
//     sawmillWhichWood = type;
//     plankPriceMultiplier = 2;
//     if(type == 'oak') {
//       plankBatchSize = 0.1;
//     }
//   }
// }

// function canSawmillRun(focus) { // Shortcut to avoid having to write so much for every check
//   if(focus) {
//     return money - (plankSpeed * sawmillPercent * plankPriceMultiplier) * sawmillAmount / 10 >= 0 && window[sawmillWhichWood] - (plankBatchSize * sawmillAmount) / 10 >= 0
//   } else {
//     return money - (plankSpeed * sawmillPercent * plankPriceMultiplier) * sawmillAmount >= 0 && window[sawmillWhichWood] - plankBatchSize * sawmillAmount >= 0
//   }
// }

// var sawmillPercent = 1;
// var producingPlank = 0;
// var plankSpeed = 0.1;
// var plankBatchSize = 0.1;
// var plankPriceMultiplier = 2;
// var planksProducedNow = 0;
// function sawmillProduce(focus) {
//   var speed = plankSpeed * sawmillPercent;
//   if(sawmillAmount >= 1 && sawmillOn) {
//     if(focus && canSawmillRun(true)){
//       producingPlank += speed / 10;
//       money -= (speed * plankPriceMultiplier) * sawmillAmount / 10;
//       planksProducedNow += ((plankBatchSize * sawmillPercent) * sawmillAmount) / 10;
//       window[sawmillWhichWood] -= (plankBatchSize * sawmillAmount) / 10;
//     }else if(canSawmillRun()){
//       producingPlank += speed;
//       money -= (speed * plankPriceMultiplier) * sawmillAmount;
//       planksProducedNow += (plankBatchSize * sawmillPercent) * sawmillAmount;
//       window[sawmillWhichWood] -= plankBatchSize * sawmillAmount;
//     }
//     byId('barTime').innerHTML = '<font size="2px"> Batch progress: </font>' + Math.floor(planksProducedNow) + '/' + sawmillAmount * (plankBatchSize * 10);

//     var bar = document.getElementById('sawmillBar').style;
//     bar.width = twoDec((producingPlank) * 100) + '%';
//     bar.transition = '.1s ease';

//     if(planksProducedNow >= (plankBatchSize * 10) * sawmillAmount + 0.01) {
//       plank += (plankBatchSize * 10) * sawmillAmount;

//       planksProduced += (plankBatchSize * 10) * sawmillAmount;

//       producingPlank = 0;
//       bar.width = twoDec((producingPlank) * 100) + '%'; 
//       bar.transition = '.0s ease' // Disables the transition so that the bar doesn't visibly go back to start
//       planksProducedNow = 0;
//     }

//     byId('sawmill').src = 'images/sawmillActive.png';
//   } else {
//     byId('sawmill').src = 'images/sawmill.png';
//   }
// }

// var smillPercentage = 10;
// function sawmillPercentage(which) {
//   if(which == 0 && smillPercentage < 100) {
//     smillPercentage++;
//   }
//   if(which == 1 && smillPercentage > 0) {
//     smillPercentage--;
//   }
// }

/*=====================================================================================
									               TEXT STUFF
=======================================================================================*/
var messageId = 0;
var previousMessage;
var duplicates;

function messageDisplay(text, color) {
    var br = '<br />';
    if (text.length > 40 && color != 'custom') { // Giving some extra space to separate longer messages
        br = '<br />' + '<br />'
    }

    if (color == 'green') { // Nicer colors
        color = '#3dc62b; text-shadow: 0 0 3px green;';
    }
    if (color == 'red') {
        color = '#6d0000; text-shadow: 0 0 3px #FF0000;';
    }

    color = 'white';

    message = $.parseHTML('<div id="' + messageId + 'm" class="message" onclick="hide(this.id)"><font style="color:' + color + '">' + text + '</font></div>')

    if (text == previousMessage) {
        duplicates++;
        message = text + '<br />x' + (duplicates + 1);
        byId((messageId - 1) + 'm').innerHTML = message;
    } else {
        previousMessage = text;
        $("#messageSection").prepend(message);

        duplicates = 0;
        messageId++;
    }

}

function getCutVsGrownInfo(which) {
    if (which == 'image') {
        if (totalTreesCut > treesGrown) {
            return 'images/deadEarth.png'
        } else {
            return 'images/earth.png'
        }
    }
    if (which == 'stats') {
        if (totalTreesCut > treesGrown) {
            return '<font color="#e80000">\n\u2022 ' + totalTreesCut + ' trees cut<br />\n\u2022 ' + Math.floor(treesGrown) + ' trees grown</font>'
        } else {
            return '<font color="#11ad14">\n\u2022 ' + totalTreesCut + ' trees cut<br />\n\u2022 ' + Math.floor(treesGrown) + ' trees grown</font>'
        }
    }
    if (which == 'info') {
        if (totalTreesCut > treesGrown) {
            return 'You have cut more trees than you have planted. With this business practice, you are putting the world, and humanity with it, at risk. Your decision will probably have negative impacts on you, both morally and economically. Or not.'
        } else if (treesGrown != 0) {
            return 'You have planted more trees than you have cut. The world is a green and luxuriant place, partly thanks to you.'
        } else {
            return 'You have neither cut nor grown any trees. Better get to it!'
        }
    }
}

var earthActive = false;

function spawnTooltip(which, achievement) {
    switch (which) {
        case 'achievement':
            if (achievement != -1) {
                tooltip("images/" + achievementImages[achievement] + ".png", '<font style="color:white">' + achievementNames[achievement] + '</font>', '', '', '<font style="font-family:Tahoma">' + achievementTexts[achievement] + '</font>');
            } else {
                tooltip("images/info.png", 'Locked', '', '', '???');
            }
            break;

        case 'earth':
            tooltip("images/earth.png", 'Earth', 'Price: <font color="#11ad14">5,000,000,000,000,000$</font>', '+1,040,000,000,000 trees', 'A spherical plot of land containing about 1,04 trillion trees but mostly useless water.<br /><font color="#11ad14" id="Population">Population: ' + population + '</font>');
            earthActive = true;
            break;

        case 'cutVsGrown':
            tooltip(getCutVsGrownInfo('image'), 'Trees cut vs trees grown', getCutVsGrownInfo('stats'), '', getCutVsGrownInfo('info'));
            break;

        case 'spruceTile':
            tooltip("images/spruceTile.png", 'Spruce forest', '<font color="#11ad14">500$</font>', '+900 to 1100 trees', 'A patch of forest containing about 1000 trees.');
            break;

        case 'lumberjack':
            tooltip('images/lumberjack.png', 'Lumberjack', 'Unlock requirements:<br /> \n\u2022 Earn 100$', 'Unlock progress:<br /> \n\u2022 ' + twoDec(moneyEarned) + '$ earned', 'Lumberjacks cut trees for you.')
            break;

        case 'sales':
            tooltip('images/sales.png', 'Sales', 'Unlock requirements:<br /> \n\u2022 Earn 200$', 'Unlock progress:<br /> \n\u2022 ' + twoDec(moneyEarned) + '$ earned', 'Everything you need to distribute your product!')
            break;

        case 'plantation':
            tooltip('images/plantation.png', 'Plantation', 'You have:<br /> \n\u2022 ' + plantationAmount + ' plantations<br /> \n\u2022 ' + ((plantationAmount * 10) + (plantationBonus * plantationAmount)) + ' growing trees', '', 'Plantations allow you to grow trees. Each plantation contains a minimum of ten trees, a value which can be increased through upgrades.<hr /><i>Wast acres of land dedicated to growing the finest of trees.</i>')
            break;

        case 'sawmill':
            tooltip('images/sawmillShopIcon.png', 'Sawmill', 'Unlock requirements:<br /> \n\u2022 Sell 500 wood', 'Unlock progress:<br /> \n\u2022 ' + woodSold + ' wood sold', 'Old fashioned, but efficient. This water-powered sawmill will do just fine until you can afford better.')
            break;

        case 'money':
            tooltip('images/money.png', 'Money', '', '', "The stuff that gets you somewhere in life.");
            break;

        case 'oak':
            tooltip('images/oak.png', 'Oak wood', 'Value: <span class="oakValue"></span>', '', 'A strong type of wood with a wide range of use.')
            updateTooltipValue('oakValue');
            break;

        case 'goldenWood':
            tooltip('images/oak.png', 'Golden wood', 'Value: <span class="goldenWoodValue"></span>', '', 'Wood obtained from the rare golden tree. Sought after by anyone with enough wealth and respect for themselves.')
            updateTooltipValue('goldenWoodValue');
            break;

        case 'spruce':
            tooltip('images/spruce.png', 'Spruce wood', 'Value: <span class="spruceValue"></span>', '', 'A beautiful dark wood perfect for indoor buidling.')
            updateTooltipValue('spruceValue');
            break;

        case 'redwood':
            tooltip('images/redwood.png', 'Redwood', 'Value: <span class="redwoodValue"></span>', '', 'Huge, old logs from the mighty redwood. The wood has a deep crimson hue to it.')
            updateTooltipValue('redwoodValue');
            break;

        case 'woodchip':
            tooltip('images/woodchip.png', 'Woodchip', 'Value: <span class="woodchipValue"></span>', '', 'A secondary resource gained when cutting trees. Alone, a woodchip is not worth much, but they can be sold in large numbers for a range of uses.');
            updateTooltipValue('woodchipValue');
            break;

        case 'planks':
            tooltip('images/plank.png', 'Planks', 'Value: <span class="plankValue"></span>', '', 'Logs processed into sturdy planks.')
            updateTooltipValue('plankValue');
            break;

        case 'cookie':
            tooltip('images/cookie.png', 'Cookies', 'Value: <span class="cookieValue"></span>', '', 'Some say this delicious snack may one day be the dominant world currency.');
            updateTooltipValue('cookieValue');
            break;

        case 'ljChooseTile':
            tooltip('images/info.png', 'Lumberjack tile', '', '', 'The lumberjacks only cut one type of tree at a time. If there is no more of that type, they will simply stop until there is more or they are assigned to a new type of tree. To change type click this button and choose a plot of land.')
            break;

        case 'lumberjackSkillTree':
            tooltip('images/lumberjack.png', 'Skill tree', '', '', 'You have unlocked lumberjacks! Through achievements, you earn skill points with which you can unlock skills.')
            break;

        case 'lumberjackPS':
            tooltip('images/lumberjack.png', 'Stats', '', '<font color="green"">\n\u2022 +' + twoDec(lumberjackWPS) + ' Wood per second <br /></font><font color="red">\n\u2022 ' + twoDec(lumberjackMPS) + ' Money per second <br />\n\u2022 ' + threeDec(lumberjackTPS) + ' Trees per second</font>', '')
            break;

        case 'unassigned':
            tooltip('images/info.png', 'Unassigned personnel', '', '', 'These are unassigned personnel, they cost no money and do no work. They can be assigned and removed from any job.');
            break;

        case 'shopButton':
            tooltip('images/money.png', 'Shop', '', '', "This is the shop, it's where you buy upgrades. Items are unlocked as you progress.")
            break;

        case 'ownedButton':
            tooltip('images/pinkCog.png', 'Owned items', '', '', "All the upgrades you've purchased are displayed here.")
            break;

        case 'marketButton':
            tooltip('images/money.png', 'Market', '', '', 'This has not yet been implemented. The idea is to make selling items more complex, but I am yet to decide if I want to add it.')
            break;

        case 'stocksButton':
            tooltip('images/stockMarket.png', 'Stock market', '', '', 'The stock market is a volatile and risky way to earn money, but very profitable if you know how to use it. This part is still in development.')
            break;
        case 'ljPause':
            tooltip('images/lumberjack.png', 'Pausing', '', '', "Making the lumberjacks stop working might be a good idea at times. As long as you have trees and money available, the lumberjacks will keep on  working. If you're trying to save money it will be better to keep them from working to cut down on expenses.")
            break;
        case 'ljBulk':
            tooltip('images/lumberjack.png', 'Bulk', '', '', 'Choose how many lumberjacks you will be hiring, adding or removing with each click.')
            break;
        case 'ljAddRemove':
            tooltip('images/lumberjack.png', 'Adding or removing', '', '', 'Adding a lumberjack to a plot of land makes him cut trees there. Removing him allows you to assign him elsewhere.')
            break;
        case 'sawmillOak':
            tooltip('images/oak.png', 'Oak wood', '', '\n\u2022 1 plank per batch', '')
            break;
        case 'sawmillSpruce':
            tooltip('images/spruce.png', 'Spruce wood', '', '\n\u2022 2 planks per batch', '')
            break;
        case 'sawmillRedwood':
            tooltip('images/redwood.png', 'Redwood', '', '\n\u2022 3 planks per batch', '')
            break;

        case 'plantationBuild':
            tooltip('images/plantation.png', 'Build plantation', '', '', 'For your plantation to grow trees, you first have to build it.')
            break;

        case 'oakTree':
            tooltip('images/Tree.png', 'Oak tree', '', '', 'Tree growth is random, therefore trees per second is displayed using the average past tree growth minus the amount of trees lumberjacks chop down per second.<hr /><i>The oak towers over you, its leaves rustling with the fleeting joy of summer. A lone acorn falls down and hits you in the head.</i>')
            break;
        case 'spruceTree':
            tooltip('images/info.png', 'Spruce tree', '', '', 'Spruce trees are solemn but sincere, often adorned with a layer of snow.')
            break;
        case 'redwoodTree':
            tooltip('images/Trees/redwoodTree.png', 'Redwood tree', '', '', "The tallest tree in the world, so tall in fact that it doesn't even fit on the screen.")
            break;

        case 'oakTile':
            tooltip('images/oakTile.png', 'Oak forest', '', '<span class="oakTreeAmount"></span>', "")
            break;

        case 'resourceSection':
            tooltip('images/info.png', 'Resources', '', '<font size="1px;">(Click to hide/show)</font>', "An overview of all the resources you have in stock. These can be used in building, or sold for profit.");
            break;
        case 'treeSection':
            tooltip('images/info.png', 'Trees', '', '<font size="1px;">(Click to hide/show)</font>', "An overview of all the trees you own. These can be cut down to collect their resources.");
            break;
        case 'businessSection':
            tooltip('images/info.png', 'Businesses', '', '<font size="1px;">(Click to hide/show)</font>', "An overview of all available businesses. Once you've met the requirements, simply click the business to unlock it.");
            break;

        case 'restart':
            tooltip('images/deadEarth.png', '<font color="blue;">Warning!</font>', '', '', '<font color="blue;">Restarting the game means your progress will be lost.</font>');
            break;
        case 'saveBtn':
            tooltip('images/info.png', 'Saving', '', '', 'Shortcut: ctrl + s');
            break;
        case 'opsPerClick':
            tooltip('images/info.png', 'Operations per click', '', '', 'Operations per click is the amount of operations each click does. This is relevant when buying or selling things, such as businesses. Click this button to cycle through the available values. <i>All</i> means every possible operations.<hr />The current amount of operations per click is displayed to the left.');
            break;
        case 'colorPicker':
            tooltip('images/info.png', 'Changing graph color', '', '', 'Click to change the color of the graph to any color you want!');
            break;
        case 'sell':
            tooltip('images/' + resourceType + '.png', 'Selling', '', 'Selected: ' + resourceType, 'Sell all or half of the chosen resource.<hr />Click a resource box below to choose a resource for selling.');
            break;

    }
}

function updateTooltipValue(which) {
    var x = document.getElementsByClassName(which);
    for (var i = 0; i < x.length; i++) {
        x[i].innerHTML = window[which] + '$';
    }
}

var xpos;
var ypos;

function findDocumentCoords(mouseEvent) { // Thanks to https://nerdparadise.com/programming/javascriptmouseposition !
    if (mouseEvent) {
        xpos = mouseEvent.pageX;
        ypos = mouseEvent.pageY;
    } else {
        xpos = window.event.x + document.body.scrollLeft - 2;
        ypos = window.event.y + document.body.scrollTop - 2;
    }
}
document.getElementsByTagName("BODY")[0].onmousemove = findDocumentCoords;

whichMenu = 0;

function tooltip(image, title, price, effect, description) {
    if (isNaN(image) == false && image > 0) { // Because upgrades all have the same layout
        object = whichObject(image)
        image = object.image;
        title = object.name;
        price = object.price + '$';
        effect = whichEffect(object.effect, 'info');
        description = object.info;
    }
    if (price == '') {
        price = '<section style="margin-top:-15px;"></section>';
    }
    if (effect == '') {
        //effect = '<section style="margin-top:-15px;"></section>';
    }
    if (image == -1) { // on mouseout, hide
        hide('tooltipBox');
        earthActive = false;
    } else {

        if (effect != '') {
            effectCode = '</span><hr /><div class="effect">'
        } else {
            effectCode = '</span><br /><div class="effect">'
        }
        if (price == '<section style="margin-top:-15px;"></section>') {
            effectCode = '</span><br /><div class="effect">'
        }

        tooltipStr = $.parseHTML(
            '<img id="small" align="right" style="position:relative; right:8px; padding-left:10px;" src="' +
            image +
            '"><b><font color="#bfbfbf">' +
            title +
            '</font></b><br /><span class="price">' +
            price +
            effectCode +
            effect +
            '</div><div class="description" style="font-size:13px"><hr>' +
            description +
            '</div>'
        );
        show('tooltipBox');
        $("#tooltipBox").empty();
        $("#tooltipBox").prepend(tooltipStr);
    }
}

setInterval(function() { // Updates tooltip position
    if (xpos < byId('sideBar').clientWidth) {
        byId('tooltipBox').style.left = (byId('sideBar').clientWidth + 10) + 'px';
    } else if (xpos > byId('topBar').clientWidth - byId('navSection').clientWidth) {

        byId('tooltipBox').style.left = ((byId('topBar').clientWidth - byId('navSection').clientWidth) - byId('tooltipBox').clientWidth - 18) + 'px';
    } else {
        byId('tooltipBox').style.left = (xpos + 20) + 'px';
    }
    if (ypos > byId('sideBar').clientHeight - byId('tooltipBox').clientHeight + 40) {
        byId('tooltipBox').style.top = (byId('sideBar').clientHeight - byId('tooltipBox').clientHeight - 8) + 'px';
    } else if (ypos < 60) {
        byId('tooltipBox').style.top = 5 + 'px';
    } else {
        byId('tooltipBox').style.top = (ypos - 50) + 'px';
    }
}, 10);

var cookie = 0;
var cookieOwned = false;
var cookieValue = 1000;

/*=====================================================================================
                                    BOTANY
=======================================================================================*/
// var whichSeedBox;
// window.onresize = function(event) {
//   if(byId('botanySection').style.display != 'none') {
//     seedMenu(whichSeedBox); // Resizes the box to match window
//   }
// }

// var boxWidth = 0;
// var boxHeight = 50;
// var hasResources = 0;
// function seedMenu(box) {
//   boxWidth = 0;
//   boxHeight = 50;
//   whichSeedBox = box;
//   const elem = byId('mixBox' + box);
//   const rect = elem.getBoundingClientRect();
//   byId('seedBox').style.top = (rect.top + (elem.clientHeight + 5)) + 'px';
//   byId('seedBox').style.right = rect.right + 'px';
//   byId('seedBox').style.left = (rect.left) + 'px';

//   for(let i = 0; i < landType.length; i++) {
//     if(unlockedResources[i])  {
//       if(boxWidth < 185) {
//         boxWidth += 37;
//       }
//       hasResources++;
//     }
//   }
//   if(hasResources >= 5) {
//     boxHeight * 2;
//   }
//   byId('seedBox').style.width = boxWidth + 'px';
//   byId('seedBox').style.height = boxHeight + 'px';

//   $("#seedAnchor").empty();
//   var html = '<div>';
//   for(let i = 0; i < landType.length; i++) {
//     if(unlockedResources[i]) {
//       if(seedSlot1 != landType[i] || seedSlot2 != landType[i]) {
//         html += '<img class="treeSize" onclick="insertSeed(' + i + ',' + box + ')" src="images/Trees/' + landType[i] + 'Tree.png"/>';
//       }
//     }
//   }
//   html += '</div>';
//   if(html.length > 20) { // Prevents empty box from appearing
//     show('seedBox');
//   }

//   html = $.parseHTML(html);

//   $("#seedAnchor").append(html);
// }

// var seedSlot1 = 'empty';
// var seedSlot2 = 'empty';
// function insertSeed(whichSeed, whichBox) {
//   hide('seedBox');
//   whichSeed = resources[whichSeed];
//   if(whichBox == 1) {
//     seedSlot1 = whichSeed;
//   } else {
//     seedSlot2 = whichSeed;
//   }
//   byId('boxImg' + whichBox).src = 'images/Trees/' + whichSeed + 'Tree.png';

//   if(seedSlot1 != 'empty' && seedSlot2 != 'empty') {
//     pulsate('botanyBtn');
//   }
// }

// researchPrice = 100;
// function checkSeeds() {
//   if(seedSlot1 != 'empty' && seedSlot2 != 'empty' && createdSeed == 'none') {
//     if(money >=  researchPrice) {
//       money -= researchPrice;
//       researchPrice *= 1.0169;
//       researchPrice = Math.round(researchPrice);
//       byId('botanyBtn').innerHTML = 'Research!<br />$' + researchPrice;
//       if(seedSlot1 == 'oak' && seedSlot2 == 'oak') {
//         createNewSeed('spruce');
//       } else if(seedSlot1 == 'spruce' && seedSlot2 == 'oak' || seedSlot2 == 'spruce' && seedSlot1 == 'oak') {
//         createNewSeed('redwood');
//       } else {
//         messageDisplay('This combination has no effect. Try a different one!');
//       }
//     } else {
//       notEnough();
//     }
//   }else if(createdSeed != 'none' && seedSlot1 != 'empty'){ 
//     messageDisplay('You have already performed research and created a new seed. Pick it up.')
//   }else if(seedSlot1 != 'empty' || seedSlot2 != 'empty') { 
//     messageDisplay('You need two or more plants to do research.');
//   }else {
//     messageDisplay('You have not put in any seeds for research.');
//   }
// }

// var createdSeed = 'none';
// function createNewSeed(which) {
//     byId('boxImg3').src = 'images/Trees/' + which + 'Tree.png';
//     byId('mixBox3').onmouseover = function() {spawnTooltip(which + 'Tree')};
//     createdSeed = resources.indexOf(which);
//     pulsate('botanyBtn', '', true);
//     pulsate('mixBox3');
// }

// function takeSeed() {
//   if(createdSeed != 'none') {
//     byId('boxImg1').src = 'images/void.png';
//     byId('boxImg2').src = 'images/void.png';
//     byId('boxImg3').src = 'images/void.png';
//     byId('mixBox3').onmouseover = '';
//     tooltip(-1);
//     seedSlot1 = 'empty';
//     seedSlot2 = 'empty';
//     buyLand(createdSeed);
//     createdSeed = 'none';
//     hide('seedBox');
//     pulsate('mixBox3', '', true);
//   }
// }

// hoverEffect('botanyBtn', 'transform', 'scale(1.05)', 'scale(1)');
// hoverEffect('mixBox3', 'transform', 'scale(1.05)', 'scale(1)');

/*=====================================================================================
                                ACHIEVEMENTS
=======================================================================================*/
var achId = 0; // The ID of each achievement notice is different
function createAchievementNotice(name, image, id) {
    message = $.parseHTML('<div id="Notice' + achId + '" class="achievementNotice"><span class="hideAchievement" onclick="hideNote(' + achId + ')">x</span><img class="achievementImage" src="images/' + image + '.png"/><b>Achievement gained!</b><hr />' + name + '<br /></div>'),

        $("#achievementNoticeAnchor").append(message);
    visibleNotes[achId] = true;
    achId++;
}

function createAchievement(image, id) {
    if (image == 'info') {
        message = $.parseHTML('<img draggable="false"; onclick="awardAchievement(' + id + ', true)" class="achievementImage" id="achievement' + id + '" src="images/' + image + '.png" onmouseover="spawnTooltip(`achievement`,' + -1 + ');" onmouseout="tooltip(-1);"/>');
    } else {
        message = $.parseHTML('<img draggable="false"; onclick="awardAchievement(' + id + ', true)" class="achievementImage" id="achievement' + id + '" src="images/' + image + '.png" onmouseover="spawnTooltip(`achievement`,' + id + ');" onmouseout="tooltip(-1);"/>');
    }
    $("#achievementAnchor").append(message);
}

var unlockByClick = false;

function awardAchievement(num, click) {
    if (click) {
        if (unlockByClick) {
            if (awardedAchievements[num]) {
                awardedAchievements[num] = false;
            } else {
                createAchievementNotice(achievementNames[num], achievementImages[num], num);
                awardedAchievements[num] = true;
            }
        }
    } else {
        createAchievementNotice(achievementNames[num], achievementImages[num], num);
        awardedAchievements[num] = true;
    }
    updateAchievements();
    checkAll();
}

function updateAchievements() {
    $("#achievementAnchor").empty();
    for (var i = 0; i < achievementAmount; i++) {
        if (awardedAchievements[i]) {
            createAchievement(achievementImages[i], i);
        } else {
            createAchievement('info', i);
        }
    }
}

var isTrue = 0;

function checkAll() {
    for (var i = 0; i < visibleNotes.length; i++) {
        if (visibleNotes[i]) {
            isTrue++;
        }
        if (isTrue >= 2) {
            i = visibleNotes.length // Ends loop
        }
    }
    if (isTrue >= 2) {
        show('hideAllNotices');
    } else {
        hide('hideAllNotices');
    }
    isTrue = 0;
}

function hideAll() {
    for (var i = 0; i < visibleNotes.length; i++) {
        if (byId('Notice' + i).style.display != 'none') {
            hideNote(i);
        }
    }
}

var visibleNotes = [];

function hideNote(id) {
    hide('Notice' + id);
    playSound('tap');
    visibleNotes[id] = false;
    checkAll();
}

function positionNote() { // Stacks achievement notices
    margin = 0;
    if (byId('hideAllNotices').style.display == 'block') {
        var bottom = 3;
    } else {
        var bottom = 0.5;
    }
    for (var i = 0; i < visibleNotes.length; i++) {
        if (byId('Notice' + i).style.display != 'none') {
            byId('Notice' + i).style.bottom = (bottom + (i - margin) / 1) + '%'; // Margins make every notification slightly smaller...
            byId('Notice' + i).style.width = (27.2 - (i - margin) / 10) + '%'; // ...the higher up it is
            byId('Notice' + i).style.left = (39 + (i - margin) / 20) + '%';
        } else {
            margin++;
        }
    }
}

setInterval(function() { // Calls the above function 1000 times every second
    positionNote();
}, 1);


var achievementNames = ['Your first tree!', 'Glade', 'Minor deforestation', 'Clearcut', 'Major deforestation', 'If a tree falls in the forest...', 'Major deforestation', "Wooden't you believe?", 'Ecological footprint', 'Immense deforestation', 'My first dollar', 'Pocket change', 'Cheddar', 'Fat stacks', 'Small business', 'Steady flow', "Congrats, you're a millionaire!", 'Outsourcing', 'Ten strong', 'The 100', 'Big workforce', 'Wall Street level', 'Starting small', 'High stakes', 'Cookie-worthy', 'Clicking', "It just clicked"];
var achievementImages = ['Tree', 'Tree', 'Tree', 'Tree', 'Tree', 'Tree', 'Tree', 'Tree', 'Tree', 'Tree', 'money', 'money', 'money', 'money', 'money', 'money', 'money', 'lumberjack', 'lumberjack', 'lumberjack', 'lumberjack', 'stockMarket', 'stockMarket', 'stockMarket', 'cookie', 'cookie', 'cookie'];
var achievementTexts = ['Cut <b>1</b> tree.', 'Cut <b>10</b> trees.', 'Cut <b>100</b> trees.', 'Cut <b>1000</b> trees.', 'Cut <b>10000</b> trees.', 'Cut <b>100000</b> trees.', 'Cut <b>1 million</b> trees.', 'Cut <b>10 million</b> trees.', 'Cut <b>100 million</b> trees.', 'Cut <b>1 billion</b> trees.', 'Earn <b>$1</b>', 'Earn <b>$10</b>', 'Earn <b>$100</b>.', 'Earn <b>$1000</b>.', 'Earn <b>$10000</b>.', 'Earn <b>$100000</b>.', 'Earn <b>$1 Million</b>.', 'Hire <b>1</b> lumberjack.', 'Hire <b>10</b> lumberjacks.', 'Hire <b>100</b> lumberjacks.', 'Hire <b>1000</b> lumberjacks.', 'Sell a stock within the first <b>10</b> seconds of playing.', 'Buy a stock worth <b>$10 or less</b>.', 'Buy a stock worth <b>$100 or more</b>.', 'Click anywhere <b>1000 times</b>.', 'Click anywhere <b>10000 times</b>.', 'Click anywhere <b>100000 times</b>.'];
var awardedAchievements = [];
var achievementAmount = achievementNames.length;
setInterval(function() {
    if (totalTreesCut >= 1 && !awardedAchievements[0]) { awardAchievement(0) }; // I
    if (totalTreesCut >= 10 && !awardedAchievements[1]) { awardAchievement(1) }; // met
    if (totalTreesCut >= 100 && !awardedAchievements[2]) { awardAchievement(2) }; // a
    if (totalTreesCut >= 1000 && !awardedAchievements[3]) { awardAchievement(3) }; // traveller
    if (totalTreesCut >= 10000 && !awardedAchievements[4]) { awardAchievement(4) }; // from
    if (totalTreesCut >= 100000 && !awardedAchievements[5]) { awardAchievement(5) }; // an
    if (totalTreesCut >= 1000000 && !awardedAchievements[6]) { awardAchievement(6) }; // antique
    if (totalTreesCut >= 10000000 && !awardedAchievements[7]) { awardAchievement(7) }; // land
    if (totalTreesCut >= 100000000 && !awardedAchievements[8]) { awardAchievement(8) }; // who
    if (totalTreesCut >= 1000000000 && !awardedAchievements[9]) { awardAchievement(9) }; // said

    if (moneyEarned >= 1 && !awardedAchievements[10]) { awardAchievement(10) };
    if (moneyEarned >= 10 && !awardedAchievements[11]) { awardAchievement(11) };
    if (moneyEarned >= 100 && !awardedAchievements[12]) { awardAchievement(12) };
    if (moneyEarned >= 1000 && !awardedAchievements[13]) { awardAchievement(13) };
    if (moneyEarned >= 10000 && !awardedAchievements[14]) { awardAchievement(14) };
    if (moneyEarned >= 100000 && !awardedAchievements[15]) { awardAchievement(15) };
    if (moneyEarned >= 1000000 && !awardedAchievements[16]) { awardAchievement(16) };

    if (lumberjackAmount >= 1 && !awardedAchievements[17]) { awardAchievement(17) };
    if (lumberjackAmount >= 10 && !awardedAchievements[18]) { awardAchievement(18) };
    if (lumberjackAmount >= 100 && !awardedAchievements[19]) { awardAchievement(19) };
    if (lumberjackAmount >= 1000 && !awardedAchievements[20]) { awardAchievement(20) };

    if (stocksSold >= 1 && secondsPlayed <= 10 && !awardedAchievements[21]) { awardAchievement(21) };
    //22
    //23

    if (screenClicks >= 1000 && !awardedAchievements[24]) { awardAchievement(24) };
    if (screenClicks >= 10000 && !awardedAchievements[25]) { awardAchievement(25) };
    if (screenClicks >= 100000 && !awardedAchievements[26]) { awardAchievement(26) };
}, 100);

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