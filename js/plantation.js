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