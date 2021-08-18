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