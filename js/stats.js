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