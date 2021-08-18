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

    //byId('clickTreeImage').src = 'images/Trees/' + whichTree + 'Tree.png';

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