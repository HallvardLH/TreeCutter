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