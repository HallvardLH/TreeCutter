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