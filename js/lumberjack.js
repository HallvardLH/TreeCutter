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