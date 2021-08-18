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