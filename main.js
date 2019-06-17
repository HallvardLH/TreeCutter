//THINGS TO ADD///////
//achievements?
////cut time can be shortened with better axes
//Add fade out effect to last tree frame https://www.w3schools.com/jquery/eff_fadeout.asp
//Golden wood
////Has a low chance of dropping
////Sappling from gold trees can be replanted in some sort of garden, or empty acres
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



/*=====================================================================================
									SALES
=======================================================================================*/

var truckAmount = 0;
var availableTrucks = 0;
var unavailableTrucks = 0;







	
var totalTreesCut;
setInterval(function() { // Updating stats values
	if(days < 1) {
		document.getElementById("timePlayed").innerHTML = new Date(secondsPlayed * 1000).toISOString().substr(11, 8);
	}else if(days == 1) {
		document.getElementById("timePlayed").innerHTML = days + ' day and ' + new Date(secondsPlayed * 1000).toISOString().substr(11, 8);
	}else {
		document.getElementById("timePlayed").innerHTML = days + ' days and ' + new Date(secondsPlayed * 1000).toISOString().substr(11, 8) + 'seconds';
	}

	var oakPlantationTrees = oakPlantations * 10 + plantationBonus * oakPlantations;
	var sprucePlantationTrees = sprucePlantations * 10 + plantationBonus * sprucePlantations;

	document.getElementById('WoodPerTree').innerHTML = WPT;
	document.getElementById('cutDownByHand').innerHTML = treesCutDown;
	document.getElementById('cutDownLumberjack').innerHTML = Math.floor(lumberjackTreesCutDown);
	totalTreesCut = Math.floor(lumberjackTreesCutDown) + treesCutDown;
	document.getElementById('cutDownTotal').innerHTML = totalTreesCut;

	document.getElementById('population').innerHTML = population;
	document.getElementById('treesGrown').innerHTML = treesGrown;
	document.getElementById('plantationTrees').innerHTML = oakPlantationTrees + sprucePlantationTrees;
	document.getElementById('moneyEarned').innerHTML = '$' + formatNumber(twoDec(moneyEarned));

	document.getElementById('oakPlantations').innerHTML = oakPlantations;
	document.getElementById('sprucePlantations').innerHTML = sprucePlantations;

	document.getElementById('oakTrees').innerHTML = oakPlantationTrees + ' trees';
	document.getElementById('spruceTrees').innerHTML = sprucePlantationTrees + ' trees';

	document.getElementById('unbuiltPlantations').innerHTML = unbuiltPlantations;

	document.getElementById("lumberjackPrice").innerHTML = '$' + oneDec(lumberjackPrice);
	document.getElementById("plantationPrice").innerHTML = '$' + plantationPrice;
	document.getElementById("sawmillPrice").innerHTML = '$' + sawmillPriceMoney + ' and ' + sawmillPriceOak + ' oak';

	// Per second values
	oakLumberjackWPS = (oakLumberjacks * baseLumberjackWPS) * lumberjackWPSPercent;
	oakLumberjackMPS = (oakLumberjacks * baseLumberjackMPS) * lumberjackMPSPercent;
	oakLumberjackTPS = (oakLumberjacks * baseLumberjackTPS) * lumberjackTPSPercent;

	spruceLumberjackWPS = (spruceLumberjacks * baseLumberjackWPS) * lumberjackWPSPercent;
	spruceLumberjackMPS = (spruceLumberjacks * baseLumberjackMPS) * lumberjackMPSPercent;
	spruceLumberjackTPS = (spruceLumberjacks * baseLumberjackTPS) * lumberjackTPSPercent;

//plankBatchSize * sawmillAmount
	moneyPerSecond = formatNumber(twoDec(oakLumberjackMPS + spruceLumberjackMPS));
	document.getElementById("moneyPS").innerHTML = 'Per second: ' + formatNumber(moneyPerSecond);
	document.getElementById("oakPS").innerHTML = 'Per second: ' + formatNumber(twoDec(oakLumberjackWPS));
	document.getElementById("sprucePS").innerHTML = 'Per second: ' + formatNumber(twoDec(spruceLumberjackWPS));
}, 100);



function replaceText(id, text) {
	document.getElementById(id).innerHTML = text;
}

var lumberjackUnlocked = false;
var plantationUnlocked = true;
var sawmillUnlocked = false;
function unlockBusiness(business) {
	switch(business){
		case 'lumberjack':
			if(moneyEarned >= 100) {
				lumberjackUnlocked = true;
				nav('lumberjackSection');
			} else {
				messageDisplay('Missing ' + (100 - moneyEarned) + '$');
			}
			break;
		case 'plantation':
			if(totalTreesCut >= 100) {
				plantationUnlocked = true;
				nav('plantationSection');
			} else {
				messageDisplay('Missing ' + (100 - totalTreesCut) + ' trees');
			}
			break;
		case 'sawmill':
			if(woodSold >= 500) {
				sawmillUnlocked = true;
				nav('sawmillSection');
			} else {
				messageDisplay('Missing ' + (500 - woodSold) + ' wood');
			}
			break;
	}
}



// Declaring some variables
var oakWoodAmount = 0;
var spruceWoodAmount = 0;
var oakWood = 0;
var spruceWood = 0;
var planks = 0;


/*=====================================================================================
									STOCK MARKET
=======================================================================================*/

var scale = (num, inMin, inMax, outMin, outMax) => {
  return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

var stockAmount = 12; // The amount of stocks that will be generated

var whichStock;
function switchGraph(num) {
	showItem('stockInfo');
	whichStock = num

	$( "#stockInfoAnchor" ).empty();

	message = $.parseHTML('<div style="background:url(images/grayTexture.png) repeat-y bottom;" class="" id="" onclick="switchGraph(' + num +')"><font size="3px";>' + window['stock' + num].name + '</font><br /><img id="stockImage' + num + '" style="width:20px; height:20px;" src="images/neutral.png"/><span class="amount" id="stockPrice' + num + '" style="bottom:8px;" onclick="3);">' + window['stock' + num].price + '$</span><span class="percent" id="stockPercentage' + num + '" style="bottom:8px;">' + window['stock' + num].growthFactor + '%</span></div>'),

	$("#stockInfoAnchor").append(message);
}

setInterval(function stockChange() {
	if(whichStock != undefined)
	drawGraph(whichStock);
}, 10); // 9100



var period = 'all';
period = 'week'
//var index = 0;
function drawGraph(num) {
	index = 0;
	var stockValues = window['stock' + num].historicPrice;
	if(period == 'day') {
		var stockValues = stockValues.slice(stock1.historicPrice.length-100,stock1.historicPrice.length)
	}
	if(period == 'week') {
		var stockValues = stockValues.slice(stock1.historicPrice.length-700,stock1.historicPrice.length)
	}
	if(period == 'month') {
		var stockValues = stockValues.slice(stock1.historicPrice.length-3000,stock1.historicPrice.length)
	}
	if(period == 'sixMonths') {
		var stockValues = stockValues.slice(stock1.historicPrice.length-13000,stock1.historicPrice.length)
	}

	var sorted = stockValues.slice().sort(function(a, b) {
  		return a - b;
	});

	var canvas = document.getElementById("stockCanvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var smallest = sorted[0];                  
	var largest  = sorted[sorted.length - 1];
	var height = 200;
	var start = 2;
	ctx.beginPath();
	ctx.fillStyle = "white";
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
	for (var i = 0; i < 331; i += 330 / stockValues.length) {
		ctx.lineTo(i, 200-scale(stockValues[index], smallest, largest, 0, 200));
		ctx.stroke();
		ctx.strokeStyle = graphColor;
		index++;
	}
}

var graphColor = 'white';

//switchGraph(0)

function Stock(){
  this.player_owns_x_stocks = 0,
  this.name,
  this.price,
  this.growthFactor,
  this.direction,
  this.historicPrice = [],
  this.objectName,
  this.iterations = 0,
  this.period = 0,
  this.rangeMin,
  this.rangeMax,
  this.save = function() { saveStock(this.objectName)}
}

function saveStock(thing) {
	localStorage.removeItem(thing);
	localStorage.setItem(thing, JSON.stringify(window[thing]));
}

function saveStocks() {
		for (var it = 0; it <= stockAmount; it++) {
			window['stock' + it].save();
		}
}




var firstNames = ["Asgeir's", 'Big', 'E-Legal', "Mike Hunt", "Gabe Bolles", 'Mike Rotch', 'I. C. Weiner', 'I. P. Freely', 'Jonetesdal', 'Organic', 'American', "Emil's", 'Hardone', 'Peter File', "Sakaratte's", 'Jack Mehoff', 'Heywood Jablome', 'Yuri Nator', 'Car', 'Animal', 'Weird', 'European', "Pat McGroin's"];
var secondNames = [' Oil', ' Wood', ' Recycling', ' Irrigation', ' Mining', ' Toys', ' Cat Food', ' Engineering', ' Petrol', ' Cookies', ' Insulation', ' Paper Company', ' Games', ' Technologies', ' Computing', ' Woodworks'];


stockGenerator();
function stockGenerator() {
	for (var i = 0; i <= stockAmount; i++) {
		if(localStorage.treesCutDown == undefined) { // Simply checks if it's the initial load
			window['stock' + i] = new Stock()
			var lastName = secondNames.splice(Math.floor(Math.random() * secondNames.length), 1)[0];
			window['stock' + i].name = firstNames.splice(Math.floor(Math.random() * firstNames.length), 1)[0] + lastName;
			window['stock' + i].type = lastName;
			window['stock' + i].business = lastName;
			window['stock' + i].price = twoDec(Math.random() * 50);

			var num = growthFactor = oneDec(Math.random() * 2);
			num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // adds minus sign in 50% of cases
			window['stock' + i].growthFactor = num;

			//window['stock' + i].growthFactor = oneDec(Math.random() * 2);

			window['stock' + i].direction = Math.round(Math.random() * 2);
			window['stock' + i].startingPrice = window['stock' + i].price;
			window['stock' + i].type = Math.floor(Math.random() * 3); // 0 - good // 1 - average // 2 - bad

			window['stock' + i].objectName = 'stock' + i;
		} else {
			window['stock' + i] = eval('JSON.parse(localStorage.getItem("stock' + i + '"))');
			window['stock' + i].save = function() {saveStock(this.objectName)};
		}
	}
}


createStockDiv();
function createStockDiv() {
	for (var i = 0; i <= stockAmount; i++) {
		message = $.parseHTML('<div onmouseover="" onmouseout="" class="section" id="stock' + i + '" onclick="switchGraph(' + i +')"><font size="3px";>' + window['stock' + i].name + '</font><br /><img id="stockImage' + i + '" style="width:20px; height:20px;" src="images/neutral.png"/><span class="amount" id="stockPrice' + i + '" style="bottom:8px;" onclick="3);">' + window['stock' + i].price + '$</span><span class="percent" id="stockPercentage' + i + '" style="bottom:8px;">' + window['stock' + i].growthFactor + '%</span></div>'),

		$("#stockAnchor").append(message);
	}
}

var oldStockValues = [];

var goodNews = [' prices soaring.'];
var badNews = [' prices fall as high-ranking official is fired over social media scandal.'];


//Saka's rules
// Assign the stock a price between 0 and 50
// Assign the stock a value between 10 and -10
// This value determine the growth of the stock. If bigger than 8 or -8 we get a boom/crash
// if the number is below 8 or -8, the growth will be a number between 0 and 5. Else it will be a number between 5 and 10
// Approval is a number between 1 and -1, it determines how well the stock is going. 

// If the stock price reaches 0, remove stock and spawn scandalous news report.

function changeStock2() {
	for (var i = 0; i <= stockAmount; i++) { // Loop through all stocks
		var stock = window['stock' + i];

		if(stock.iterations == 0) {
			num = Math.random()
			if(Math.random() <= 0.5) {
				stock.approval = -Math.abs(num);
			}
		}

		factor = Math.random() * 10;
		if(Math.random() <= 0.5) {
			factor = -Math.abs(factor);
		}
		stock.growthFactor = num;

		stock.price += Math.random() * stock.approval;

		stock.iterations++;
		if(Math.random() <= 0.1) {
			stock.iterations = 0;
		}
	}
}






// Determine if this line of business will be going well or bad for a while
// It can also be neutral with minimal growth and fall
// 25% chance of good, 25% chance of bad and 50% chance of neutral
// Create a news post that takes from either an array of good news or bad news, so that the player can determine which stocks will go well.
// The news section is also filled with non-stock news to make it harder to guess the market.
// The period can last for maximum 7 days, minimum 1 day.
// The stock is assigned a range, if the range is 1 to 4 the stock will increase or decrease with a number between
// If good, the stock will have 60% chance to increase. 40% chance to decrease, the decrease that is determined based on the range will be divided by 4 so as to not have very big decreases in a good period. Vice versa with bad period.
// If neutral, the range will not be larger than 10 and there is a 50% chance of increase or decrease.

function changeStock() {
	for (var i = 0; i <= stockAmount; i++) { // Loop through all stocks
		var stock = window['stock' + i];
		if(stock.iterations == stock.period) { // Define new period
			random = Math.random();
			if(random <= 0.25) { 
				createNews(stock.type + goodNews[0]);
				stock.direction = 'positive';
			}
			if(random > 0.25 && random <= 0.5) { 
				createNews(stock.type + badNews[0]);
				stock.direction = 'negative';
			}
			if(random > 0.5) { 
				stock.direction = 'neutral';
			}
			if(stock.direction == 'positive' || stock.direction == 'negative') {
				stock.rangeMin = Math.random();
				stock.rangeMax = Math.random() * 2 + stock.rangeMin;
			}else {
				stock.rangeMin = Math.random();
				stock.rangeMax = Math.random() * 2 + stock.rangeMin;
			}
			stock.period = Math.floor(Math.random() * 20) + 1 // Number between 1 and 20

			stock.iterations = 0;

			
		}
		else {
			random = Math.random();
			if(random <= 0.6) { 
				if(stock.direction == 'positive') {
					stock.price += Math.floor(Math.random() * (stock.rangeMax - stock.rangeMin + 1)) + stock.rangeMin;
				}else { 
					stock.price -= Math.floor(Math.random() * (stock.rangeMax - stock.rangeMin + 1)) + stock.rangeMin;
				}
			} else {
				if(stock.direction == 'positive') {
					stock.price += (Math.floor(Math.random() * (stock.rangeMax - stock.rangeMin + 1)) + stock.rangeMin) / 2;
				} else {
					stock.price -= (Math.floor(Math.random() * (stock.rangeMax - stock.rangeMin + 1)) + stock.rangeMin) / 2;
				}
			}
		}

		stock.iterations++;


		document.getElementById('stockPrice' + i).innerHTML = twoDec(window['stock' + i].price) + '$';
		if(window['stock' + i].price > window['oldPrice' + i]) {
			document.getElementById('stockImage' + i).src = "images/positive.png";
		}
		else if (window['stock' + i].price < window['oldPrice' + i]) {
			document.getElementById('stockImage' + i).src = "images/negative.png";
		} else {
			document.getElementById('stockImage' + i).src = "images/neutral.png";
		}

		window['stock' + i].percent = twoDec(((window['oldPrice' + i] - window['stock' + i].price) / window['oldPrice' + i]) * 100);


		if(window['oldPrice' + i] < window['stock' + i].price) {
			document.getElementById('stockPercentage' + i).innerHTML = '+' + Math.abs(window['stock' + i].percent) + '%';
		}else if(window['oldPrice' + i] == window['stock' + i].price) {
			
		} else {
			document.getElementById('stockPercentage' + i).innerHTML = '-' + window['stock' + i].percent + '%';
		}

		window['oldPrice' + i] = window['stock' + i].price;
		
		window['stock' + i].historicPrice[valueIter] = window['stock' + i].price;
	}
	valueIter++;
}

function createNews(news) {
	//console.log(news)
}





// Stock change rules

// Price addition is a number between 0 and 10;
// Add or subtract to price = growth factor * price addition.




// A stock is assigned a range on which it will sit for x amount of iterations, to give a sense of the stock being consistent. Once x time is up, it is given a new range. 

// If the range is bigger than the pervious one, positive news will appear and vice versa.

// News will have to play a role. This allows the player to actually predict the stock market.

	//stock.range = Math.floor(Math.random()*2) 
	//	if(Math.random() <= 0.01) {

		

		// if(Math.random() <= 0.5) {
		// 	stock.rangeMin = stock.price - Math.ceil((Math.random() * 50));
		// }else {
		// 	stock.rangeMin = stock.price + Math.ceil((Math.random() * 50));
		// }

		// stock.rangeMax = 

valueIter = stock1.historicPrice.length;
function stockChangeAlternate() {
	for (var i = 0; i <= stockAmount; i++) { // Loop through all stocks
		var stock = window['stock' + i];

		if(Math.random() <= 0.01) { // The growth factor has a 1% change to be redrawn every iteration
			var num = growthFactor = oneDec(Math.random() * 2);
			num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // adds minus sign in 50% of cases
			window['stock' + i].growthFactor = num;
		}

		if(Math.random() <= 0.3) { // 30% chance for growth factor to have 1 added to or subtracted from it
			if(Math.sign(stock.growthFactor) == -1) { // If negative, make positive
				stock.growthFactor++;
			}else { // Vice versa
				stock.growthFactor--;
			}
		}

		stock.price += stock.growthFactor * Math.round(Math.random() * 2);

		// if(Math.random() <= 0.001) { // 0.1% chance for stock price to gain or lose a number between 50 and 100
		// 	if(Math.random() <= 0.5) {
		// 		stock.price += Math.floor(Math.random() * 51) + 50;
		// 	}else {
		// 		stock.price -= Math.floor(Math.random() * 51) + 50;
		// 	}
		// }



		if(window['stock' + i].price < Math.ceil(Math.random() * 50) && Math.sign(stock.growthFactor) == -1) {
			if(Math.random() < 0.5) {
				window['stock' + i].growthFactor = 1;
			}
		}




		document.getElementById('stockPrice' + i).innerHTML = twoDec(window['stock' + i].price) + '$';
		if(window['stock' + i].price > window['oldPrice' + i]) {
			document.getElementById('stockImage' + i).src = "images/positive.png";
		}
		else if (window['stock' + i].price < window['oldPrice' + i]) {
			document.getElementById('stockImage' + i).src = "images/negative.png";
		} else {
			document.getElementById('stockImage' + i).src = "images/neutral.png";
		}

		window['stock' + i].percent = twoDec(((window['oldPrice' + i] - window['stock' + i].price) / window['oldPrice' + i]) * 100);


		if(window['oldPrice' + i] < window['stock' + i].price) {
			document.getElementById('stockPercentage' + i).innerHTML = '+' + Math.abs(window['stock' + i].percent) + '%';
		}else if(window['oldPrice' + i] == window['stock' + i].price) {
			
		} else {
			document.getElementById('stockPercentage' + i).innerHTML = '-' + window['stock' + i].percent + '%';
		}

		window['oldPrice' + i] = window['stock' + i].price;
		
		window['stock' + i].historicPrice[valueIter] = window['stock' + i].price;

	}
	valueIter++;
}


intervalTime = 100;
function stockChange() {
	for (var i = 0; i <= stockAmount; i++) {
		if(Math.random() <= 0.8) {
			if(Math.random() <= 0.5) {
				if(window['stock' + i].direction == 1 || window['stock' + i].direction == 2) {
					window['stock' + i].price += twoDec(Math.random() / 1.1) * window['stock' + i].growthFactor;
				}else {
					window['stock' + i].price += twoDec(Math.random() / 1.1)
				}
				if(window['stock' + i].direction == 2 && window['stock' + i].price > 100) {
					if(Math.random() < 0.7) {
						window['stock' + i].direction == 0;
					}else {
						window['stock' + i].direction == 1;
					}
				}
			}else {
				if(window['stock' + i].direction == 0) {
					window['stock' + i].price -= twoDec(Math.random() / 1.1) * window['stock' + i].growthFactor;
				}else {
					window['stock' + i].price -= twoDec(Math.random() / 1.1)
				}
			}
		}else if(Math.random() <= 0.2) {
			window['stock' + i].price += twoDec(Math.random() * 2);
		}



		document.getElementById('stockPrice' + i).innerHTML = twoDec(window['stock' + i].price) + '$';
		if(window['stock' + i].price > window['oldPrice' + i]) {
			document.getElementById('stockImage' + i).src = "images/positive.png";
		}
		else if (window['stock' + i].price < window['oldPrice' + i]) {
			document.getElementById('stockImage' + i).src = "images/negative.png";
		} else {
			document.getElementById('stockImage' + i).src = "images/neutral.png";
		}

		window['stock' + i].percent = twoDec(((window['oldPrice' + i] - window['stock' + i].price) / window['oldPrice' + i]) * 100);


 
		if(window['oldPrice' + i] < window['stock' + i].price) {
			document.getElementById('stockPercentage' + i).innerHTML = '+' + Math.abs(window['stock' + i].percent) + '%';
		}else if(window['oldPrice' + i] == window['stock' + i].price) {
			
		} else {
			document.getElementById('stockPercentage' + i).innerHTML = '-' + window['stock' + i].percent + '%';
		}

		window['oldPrice' + i] = window['stock' + i].price;
		
		window['stock' + i].historicPrice[valueIter] = window['stock' + i].price;


		if(i == 2) {
			//console.log(i * 10 + valueIter)
		}
		chance = 0.1
		if(window['stock' + i].price < Math.ceil(Math.random() * 50) && window['stock' + i].direction == 0) {
			if(Math.random() < 0.5) {
				window['stock' + i].growthFactor = 1;
				window['stock' + i].direction = 2; //Lets the stock grow again, but only for a while
			}
		}
		else if(window['stock' + i].price > 800) {
			chance = 0.7
		}
		else if(window['stock' + i].price > 700) {
			chance = 0.5
		}
		else if(window['stock' + i].price > 600) {
			chance = 0.4
		}
		else if(window['stock' + i].price > 500) {
			chance = 0.3
		}
		else if(window['stock' + i].price > 400) {
			chance = 0.2
		}
		if(Math.random() < chance) {
			window['stock' + i].growthFactor = Math.floor(Math.random() * 5);
			window['stock' + i].direction = Math.round(Math.random());
			window['stock' + i].turbulence = Math.floor(Math.random() * 5);
		}

	}
	valueIter++
	if(valueIter >= 11) {
		intervalTime = 1000;
	}
}

setInterval(function() {
	if(valueIter < 3000) {
		//stockChangeAlternate();
		//stockChange();
		changeStock();
	}
}, 10);

setInterval(function() {
	if(valueIter >= 3000) {
		//stockChangeAlternate();
		//stockChange();
		changeStock();
	}
}, 9100); //  9100

// 1 month - // 7.3 hours // 438 minutes // 26280 seconds
// 1 day - 14.4 minutes // 864 seconds
// 1 hour - 0.6 minutes // 36 seconds
// 1 minute - 0.025 minutes // 1.5 second
// 1 second - 0.025 seconds

// 200 stock changes a day - stock change every 0.23 second 
// 100 stock changes - stock change every 9100 milliseconds
// 50 stock changes a day - stock change every 0.057 second // a change in stock every 17547 millisecond

var inGameTime;
setInterval(function() {

	inGameTime = new Date((secondsPlayed * 1000) * 100).toISOString().substr(11, 8);
}, 1000);


/*=====================================================================================
										INPUTS
=======================================================================================*/

function buildingSwitch(item) {
	hideItem('lumberjackSection');
	hideItem('sawmillSection');
	hideItem('plantationSection');
switch(item){
		case 'lumberjack':
			showItem('lumberjackSection');
			break;
		case 'sawmill':
			showItem('sawmillSection');
			break;
		case 'plantation':
			showItem('plantationSection');
			break;
		case 40:
			break;
	}
}

function switchResourceType(type) {
	switch(type) {
		case 0:
			resourceType = "oak";
			break;
		case 1:
			resourceType = "spruce";
			break;
		case 2:
			resourceType = "planks";
			break;
		}
}

function imageReplace(id, src) {
	document.getElementById(id).src = src;
}

// Reads the input value and subtracts it from the chosen type
// Only sells if there is enough wood
var woodSold = 0;
var inputValue = "";
async function sellWood(number, auto) {
	if(resourceType == "oak") {
		var typeAmount = oakWood;
	} else
	if(resourceType == "spruce") {
		var typeAmount = spruceWood;
	} else
	if (resourceType == "planks") {
		var typeAmount = planks;
	}

	if(number == 'all') {
		var inputValue = Math.floor(typeAmount);
	}
	else if(number == 'half') {
		var inputValue = Math.floor(typeAmount / 2);
	}else {
		var inputValue = number;
	}

	var inputSecure = typeAmount -= inputValue;
	woodSold += inputValue;
	if(inputSecure >= 0) {
		if(resourceType == "oak") {
			oakWood = inputSecure;
			s = inputValue * oakValue;
			money += s;
			moneyEarned += s;
		} else
		if(resourceType == "spruce") {
			spruceWood = inputSecure;
			s = inputValue * spruceValue;
			money += s;
			moneyEarned += s;
		} else
		if (resourceType == "planks") {
			planks = inputSecure;
			s = inputValue * plankValue;
			money += s;
			moneyEarned += s;
		}
		if(resourceType == 'planks' || resourceType == 'oak' || resourceType == 'spruce') { 
			if(auto != 'auto') {
				messageDisplay('Sold ' + inputValue + ' ' + resourceType + ' for ' + s + '$');
			}
		}
	}
}


var lumberjackOn = 1; // If this value is 1, the lumberjack can operate, if it is 0 it cannot
function lumberjackOnOff() {
	var x = document.getElementById('lumberjackOnOff'); // Gets the element for easy access
	if(lumberjackOn == 1) {
		lumberjackOn = 0;
		x.innerHTML = 'Turn on'
	}
	else if(lumberjackOn == 0) {
		lumberjackOn = 1;
		x.innerHTML = 'Turn off'
	}
}


var ljOak = 0;
var ljSpruce = 0;
var ljBirch = 0;
var ljOak = 0;
var ljSpruce = 0;

var smillMoney = 0;
var calculatedSawmillPercent;
function sawmillInputMoney(number) {
	var inputValue = number;
	var m = money;
	var input = parseInt(inputValue)
	var inputSecure = m -= inputValue;
	WPS = Math.abs(sawmillWPS);
	if(oakWood >= WPS || spruceWood >= WPS) {
		if(inputSecure >= 0 && sawmillOn == 1) {
			smillMoney += input;
			money -= input;
		}
	}
}

var smillPercentage = 10;
function sawmillPercentage(which) {
	if(which == 0 && smillPercentage < 100) {
		smillPercentage++;
	}
	if(which == 1 && smillPercentage > 0) {
		smillPercentage--;
	}
}

var sawmillOn = 1;
function sawmillOnOff() {
	var x = document.getElementById('sawmillOnOff'); // Gets the element for easy access
	if(sawmillOn == 1) {
		sawmillOn = 0;
		x.innerHTML = 'Turn on'
	}
	else if(sawmillOn == 0) {
		sawmillOn = 1;
		x.innerHTML = 'Turn off'
	}
}


var smillOak = 0;
var smillSpruce = 0;
var smillBirch = 0;
function sawmillInputWood(number) {
	WPS = Math.abs(sawmillWPS);
	if(oakWood >= WPS || spruceWood >= WPS)
		if(oakWood >= spruceWood && sawmillOn == 1) {
			smillOak += number;
			oakWood -= number;
		}
		else if(spruceWood > oakWood && sawmillOn == 1) {
			smillSpruce += number;
			spruceWood -= number;
		}
}

var resourceType = "oak";
var money = 0;
var moneyEarned = 0;

// Use later for window resizing to adjust resolutions
document.body.style.zoom=1;this.blur();
//

/*=====================================================================================
									 TILES (LAND)
=======================================================================================*/
var oakTileTrees = 500;
var spruceTileTrees = 0;

function buyLand() {
	defocus('spruceForest');
	hideItem("sprucePatch");
	showItem("spruceForest");
	showItem('spruceWoodIcon');
	showItem('spruceChoose');
	showItem('spruceBuild');
	if(money >= 500 && localStorage.ownedTiles == undefined) {
		money -= 500;
		var givenTrees = Math.floor(Math.random() * (1100 - 900)) + 900;
		spruceTileTrees += givenTrees;
		messageDisplay("+" + givenTrees + " spruce trees!", 'green');
		localStorage.ownedTiles = 1;
	}
	else if(localStorage.ownedTiles == undefined) {
		notEnough();
	}
}

function treeLoose() {
	if(chosenTile == 1) {
		oakTileTrees--;
	}
	else if(chosenTile == 2) {
		spruceTileTrees--;
	}
}

var chooseActive = false;
function lumberjackChooseTile() {
	hideItem('navSection');
	showItem('landSection');
	chooseActive = true;
}

var whichTile = 1;
var chosenTile = 1;
//1 = Oak tree
//2 = Spruce tree
function switchTree(treeNum) {
	var x = document.getElementById("clickTreeImage");
	switch(treeNum){
		case 1:
			if(chooseActive) {
				whichTile = 1;
				chooseActive = false;
				hideItem('chosenOakTile');
				showItem('chosenSpruceTile');
			}
			else if(chooseActive == false) {
				defocus('spruceForest');
				defocus('oakForest');
				focus('oakForest');
				oakTree = true;
				spruceTree = false;
				chosenTile = treeNum;
				x.src = 'https://i.imgur.com/aGBT0tm.png';
				//x.style.backgroundImage = "";
				if(oakTileTrees < 1) {
					x.src = 'https://i.imgur.com/5A2LW1e.png';
				}
			}
			else {
				messageDisplay('Finish the tree first!', 'red');
			}
			break;
		case 2:
			if(chooseActive) {
				whichTile = 2;
				chooseActive = false;
				hideItem('chosenSpruceTile');
				showItem('chosenOakTile');
			}
			else if(chooseActive == false) {
				defocus('spruceForest');
				defocus('oakForest');
				focus('spruceForest');
				spruceTree = true;
				oakTree = false;
				chosenTile = treeNum;
				x.src = 'images/spruceTree.png';
				//x.style.backgroundImage = "url('https://i.imgur.com/5zTMOb3.png')";
				if(oakTileTrees < 1) {
					x.src = 'https://i.imgur.com/pT4aSQQ.png';
				}
			}
			else {
				messageDisplay('Finish the tree first!', 'red');
			}
			break;
	}
}

function defocus(id) {
    var x = document.getElementById(id);
    //if(x.style.filter == "grayscale(100%)") {
    //	x.style.filter = "";
    //}
    //else {
    	x.style.filter = "grayscale(100%)";
    //}
}

function focus(id) {
    var x = document.getElementById(id);
    x.style.filter = "";
}

function sepia(id) {
    var x = document.getElementById(id);
    if(x.style.filter == "") {
    	x.style.filter =  "sepia(100%)";
    }
    else {
    	x.style.filter = "";
    }
}

/*=====================================================================================
											SAVE
=======================================================================================*/
 
async function loadUp() {
 	if(localStorage.length != 0) {
		money = Number(localStorage.money);
		moneyEarned = Number(localStorage.moneyEarned);
		oakWood = Number(localStorage.oak);
		spruceWood = Number(localStorage.spruce);
		planks = Math.floor(Number(localStorage.planks));
		oakTileTrees = Number(localStorage.oakTileTrees); // Land
 		spruceTileTrees = Number(localStorage.spruceTileTrees);
 		ljOak = Number(localStorage.ljOak);
 		ljSpruce = Number(localStorage.ljSpruce);
 		smillMoney = Number(localStorage.smillMoney);
 		whichTile = Number(localStorage.whichTile); // The selected tile for the lumberjack
 		lumberjackGO2 = localStorage.lumberjackGO2;
 		population = Number(localStorage.population);
 		treesCutDown = Number(localStorage.treesCutDown);
 		ownedUpgrades = JSON.parse(localStorage.getItem("ownedUpgrades"));
 		//unlockedUpgrades = JSON.parse(localStorage.getItem("unlockedUpgrades"));
 		lumberjackMPS = Number(localStorage.lMPS);
 		lumberjackWPS = Number(localStorage.lWPS);
 		lumberjackTPS = Number(localStorage.lTPS);
 		axePercent = Number(localStorage.axePercent);
 		baseWPT = Number(localStorage.baseWPT);
 		//lumberjack per secon values
		baseLumberjackWPS = Number(localStorage.baseLumberjackWPS);
		baseLumberjackMPS = Number(localStorage.baseLumberjackMPS);
		baseLumberjackTPS = Number(localStorage.baseLumberjackTPS);

		availableLumberjacks = Number(localStorage.availableLumberjacks);
		oakLumberjacks = Number(localStorage.oakLumberjacks);
		spruceLumberjacks = Number(localStorage.spruceLumberjacks);

		lumberjackWPSPercent = Number(localStorage.lumberjackWPSPercent);
		lumberjackMPSPercent = Number(localStorage.lumberjackMPSPercent);
		lumberjackTPSPercent = Number(localStorage.lumberjackTPSPercent);

		//sawmill per second values
		sawmillWPSMultiply = Number(localStorage.sawmillWPSMultiply);
		sawmillMPSMultiply = Number(localStorage.sawmillMPSMultiply);
		sawmillPPSMultiply = Number(localStorage.sawmillPPSMultiply);
		baseSawmillWPS = Number(localStorage.baseSawmillWPS);
		baseSawmillMPS = Number(localStorage.baseSawmillMPS);
		baseSawmillPPS = Number(localStorage.baseSawmillPPS);

		//plantation per time values
		plantationTPSAdd = Number(localStorage.plantationTPSAdd);
		plantationTPSMultiply = Number(localStorage.plantationTPSMultiply);
		basePlantationTPS = Number(localStorage.basePlantationTPS);

		resourceType = localStorage.resourceType;

		lumberjackPrice = Number(localStorage.lumberjackPrice);
		plantationPrice = Number(localStorage.plantationPrice);

		secondsPlayed = Number(localStorage.secondsPlayed);
		days = Number(localStorage.days);

		plantationAmount = Number(localStorage.plantationAmount);

		//initialTimer = Number(localStorage.initialTimer);

		sawmillOn = Number(localStorage.sawmillOn);
		lumberjackOn = Number(localStorage.lumberjackOn);

		lJackSpeed = Number(localStorage.lJackSpeed);

		planksProduced = Math.floor(Number(localStorage.planksProduced));

		lumberjackAxeUpgrade = Number(localStorage.lumberjackAxeUpgrade);

		sawmillAmount = Number(localStorage.sawmill);

		autoSellAmount = Number(localStorage.autoSellAmount);

		sawmillPercent = Number(localStorage.sawmillPercent);

		sawmillWhichWood = localStorage.sawmillWhichWood;

		woodSold = Number(localStorage.woodSold);

		plantationChance = Number(localStorage.plantationChance);
		plantationBonus = Number(localStorage.plantationBonus);
		oakPlantations = Number(localStorage.oakPlantations);
		sprucePlantations = Number(localStorage.sprucePlantations);

		treesGrown = Number(localStorage.treesGrown);
		lumberjackTreesCutDown = Number(localStorage.lumberjackTreesCutDown);
		cutDownByHand = Number(localStorage.cutDownByHand)

		lumberjackUnlocked = JSON.parse(localStorage.lumberjackUnlocked);
		plantationUnlocked = JSON.parse(localStorage.plantationUnlocked);
		sawmillUnlocked = JSON.parse(localStorage.sawmillUnlocked);

		plantationOwned = Number(localStorage.plantationOwned);
		if(plantationOwned == 1) {
			activatePlantation();
		}

		if(lumberjackOn == 0) {
			document.getElementById('lumberjackOnOff').innerHTML = 'Turn on';
		}


		updateType();
 		function updateType() { // Correctly shows which resource type is chosen
 			if(resourceType == 'oak') {
				switchResourceType(0);
 			}
 			if(resourceType == 'spruce') {
				switchResourceType(1);
 			}
 			if(resourceType == 'planks') {
				switchResourceType(2);
 			}
 		}	

		autoLumberjackInput = Number(localStorage.autoLumberjackInput);

		if(Number(localStorage.chainsaw) == 1) {
			showItem('chainsawTool');
		}

		chosenTile = Number(localStorage.chosenTile) // The selected tile for the player
		switchTree(chosenTile);
		if(chosenTile == 1) {
			focus('oakForest');
		}
		if(chosenTile == 2) {
			focus('spruceForest');
		}


		if(localStorage.lumberjack >= 1) {
			activateLumberjack();
			lumberjackAmount = Number(localStorage.lumberjack);
		}
		if(localStorage.sawmill >= 1) {
			activateSawmill();
		}
		if(localStorage.ownedTiles == 1) {
			buyLand();
		}
		if(whichTile == 1) {

		}
		if(whichTile == 2) {

			document.getElementById("treeImage").src = 'images/spruceTree.png';
		}
		for(var i = 0; i < 500; i++){ //Loops 200 times
			if(ownedUpgrades[i] == 0) { //If index is 1, the upgrade is owned
				if(i <= 50) {
					spawnUpgrade(i, 2)
				}
				if(i >= 51 && i <= 100) {
					spawnUpgrade(i, 3)
				}
				if(i >= 101 && i <= 150) {
					spawnUpgrade(i, 2);
				}
				if(i >= 151 && i <= 200) {
					spawnUpgrade(i, 4);
				}
				if(i >= 201 && i <= 250) {
					spawnUpgrade(i, 5);
				}
			}
		}
		console.log('Welcome back!')
 	} else { // If not, it's the first time playing and these need to be set
 		money = 0 //twoDec(Math.random() * 10);
 		moneyEarned = money;
 		oakWood = 0;
 		spruceWood = 0;
 		planks = 0;
 		localStorage.sawmillUpgrade = 0;
 		resourceType = 'oak';
 		save();
 		console.log('First time load');
 		messageDisplay("You buy a plot of land. It's empty except for some boring old trees. You contemplate what to do with them...")
 	}
 }


 // Updates localStorage values
async function save() {
	//Values in bank
 	localStorage.money = money;
 	localStorage.moneyEarned = moneyEarned;
 	localStorage.oak = oakWood;
 	localStorage.spruce = spruceWood;
 	localStorage.planks = planks;
 	//Lumberjack values
 	localStorage.ljOak = ljOak;
 	localStorage.ljSpruce = ljSpruce;

 	localStorage.lMPS = lumberjackMPS;
 	localStorage.lWPS = lumberjackWPS;
 	localStorage.lTPS = lumberjackTPS;


 	//Sawmill values
 	localStorage.smillMoney = smillMoney;

 	localStorage.sawmillUpgrade = localStorage.sawmillUpgrade;

 	//Tile values
 	localStorage.oakTileTrees = oakTileTrees;
 	localStorage.spruceTileTrees = spruceTileTrees;

 	//Chosen resource
 	localStorage.resourceType = resourceType;

 	//Chosen lumberjack tile
 	localStorage.whichTile = whichTile;

 	localStorage.chosenTile = chosenTile;

 	//Determine whether or not the Lumberjack animation should be active on load
 	localStorage.lumberjackGO2 = lumberjackGO2;

 	//Upgrades
 	localStorage.ownedUpgrades = JSON.stringify(ownedUpgrades);

 	//localStorage.unlockedUpgrades = JSON.stringify(unlockedUpgrades);

 	//Axe
 	localStorage.axePercent = axePercent;
 	localStorage.baseWPT = baseWPT;

 	//lumberjack per secon values
	localStorage.baseLumberjackWPS = baseLumberjackWPS;
	localStorage.baseLumberjackMPS = baseLumberjackMPS;
	localStorage.baseLumberjackTPS = baseLumberjackTPS;

	localStorage.availableLumberjacks = availableLumberjacks;
	localStorage.oakLumberjacks = oakLumberjacks;
	localStorage.spruceLumberjacks = spruceLumberjacks;

	localStorage.lumberjackWPSPercent = lumberjackWPSPercent;
	localStorage.lumberjackMPSPercent = lumberjackMPSPercent;
	localStorage.lumberjackTPSPercent = lumberjackTPSPercent;

	//sawmill per second values
	localStorage.sawmillWPSMultiply = sawmillWPSMultiply;
	localStorage.sawmillMPSMultiply = sawmillMPSMultiply;
	localStorage.sawmillPPSMultiply = sawmillPPSMultiply;
	localStorage.baseSawmillWPS = baseSawmillWPS;
	localStorage.baseSawmillMPS = baseSawmillMPS;
	localStorage.baseSawmillPPS = baseSawmillPPS;

	localStorage.sawmillPercent = sawmillPercent;

	//plantation per time values
	localStorage.plantationTPSAdd = plantationTPSAdd;
	localStorage.plantationTPSMultiply = plantationTPSMultiply;
	localStorage.basePlantationTPS = basePlantationTPS;

	//Stats
	localStorage.population = population;
	localStorage.treesCutDown = treesCutDown;

	//Automation upgrade effects
	localStorage.autoLumberjackInput = autoLumberjackInput;

	localStorage.lumberjackPrice = lumberjackPrice;
	localStorage.plantationPrice = plantationPrice;

	localStorage.secondsPlayed = secondsPlayed;
	localStorage.days = days;

	localStorage.plantationOwned = plantationOwned;

	localStorage.plantationAmount = plantationAmount;

	//localStorage.initialTimer = initialTimer;

	localStorage.sawmillOn = sawmillOn;
	localStorage.lumberjackOn = lumberjackOn;

	localStorage.lJackSpeed = lJackSpeed;

	localStorage.planksProduced = planksProduced;

	localStorage.lumberjack = lumberjackAmount;

	localStorage.lumberjackAxeUpgrade = lumberjackAxeUpgrade;

	localStorage.autoSellAmount = autoSellAmount;

	localStorage.sawmill = sawmillAmount;

	localStorage.sawmillWhichWood = sawmillWhichWood;

	localStorage.woodSold = woodSold;

	localStorage.plantationChance = plantationChance;
	localStorage.plantationBonus = plantationBonus;
	localStorage.oakPlantations = oakPlantations;
	localStorage.sprucePlantations = sprucePlantations;

	localStorage.treesGrown = treesGrown;
	localStorage.lumberjackTreesCutDown = lumberjackTreesCutDown;
	localStorage.cutDownByHand = cutDownByHand;

	localStorage.lumberjackUnlocked = lumberjackUnlocked;
	localStorage.plantationUnlocked = plantationUnlocked;
	localStorage.sawmillUnlocked = sawmillUnlocked;

	//saving stocks

	saveStocks();

}

// Saves when exiting or refreshing
var saveTimer = 0;
window.onbeforeunload = function exitSave() {
	//save();
	if(saveTimer > 300) {
		alert('You have not saved in the last five minutes, are you sure you want to close this tab?');
	}
};

// Save game manually
$("#saveGame").click(async function() {
	save();
	messageDisplay('Game saved', 'orange');
	saveTimer = 0;
});

// Saves automatically every set amount of time (currently 5 minutes)
setInterval(function saveRepeat() {
	save();
	messageDisplay('Game saved', 'orange');
}, 300000);

// Wipes saved data and relads the page
$("#restartGame").click(async function() {
	localStorage.clear();
	location.reload();
});

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
            sellWood(1);
            break;
        case '2':
            event.preventDefault();
            sellWood(10);
            break;
        case '3':
            event.preventDefault();
            sellWood(100);
            break;
        case '4':
            event.preventDefault();
            sellWood(1000);
            break;
        case '5':
            event.preventDefault();
            sellWood(10000);
            break;
        case '6':
            event.preventDefault();
            sellWood(100000);
            break;
        case '7':
            event.preventDefault();
            sellWood(1000000);
            break;
        case '8':
            event.preventDefault();
            sellWood(10000000);
            break;
        case '9':
            event.preventDefault();
            sellWood(100000000);
            break;
        }
    }
});


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var woodCount = 0;
var totalTreeAmount = 0;
setInterval(function repeat() {

	// Changing the cursor when picking land
	if(chooseActive) {
		document.getElementById("sectionRight").style.cursor = "copy";
		document.getElementById("sectionBusiness").style.cursor = "copy";
	}
	if(chooseActive == false) {
		document.getElementById("sectionRight").style.cursor = "auto";
		document.getElementById("sectionBusiness").style.cursor = "auto";
	}


	if(resourceType == 'oak') {
		bright('oakWoodIcon');
	}else {
		bright('oakWoodIcon', 'remove')
	}
	if(resourceType == 'spruce') {
		bright('spruceWoodIcon');
	}else {
		bright('spruceWoodIcon', 'remove')
	}
	if(resourceType == 'planks') {
		bright('plank');
	}else {
		bright('plank', 'remove')
	}


}, 100);

/*=====================================================================================
									 UPGRADES
=======================================================================================*/
var suffixes = [' million', ' billion', ' trillion', ' quadrillion', ' quintillion', ' sextillion', ' septillion', ' octillion', ' nonillion'];
function formatNumber(number, param) {
	if(number < 1000000) {
		if(param == 'money') {
			return '$' + number.toFixed(2);
		}else {
			return number;
		}
	}
	var arrayIndex = -4;
	number++;
	for(var compare = 1; arrayIndex < 20; compare *= 1000){
		arrayIndex++;
		if(compare >= number) {
			compare /= 1000;
			number /= compare
			number = Math.round(number * 100) / 100
			return number + suffixes[arrayIndex];
		}
	}
}

var oldValues = [money, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var animationSpeed = 0.15;
function animateNumber(variable, id, num) {

	displayedValue = oldValues[num];
	var actualValue = window[variable]; 
	
	if(variable != 'money') {
		//if(displayedValue < actualValue) {
		//	document.getElementById(id).innerHTML = formatNumber(Math.ceil(displayedValue += (actualValue - displayedValue) * animationSpeed));

		//}
		//if(displayedValue > actualValue) {
			document.getElementById(id).innerHTML = formatNumber(Math.floor(displayedValue += (actualValue - displayedValue) * animationSpeed + 0.05));
		//}
	}else {
		document.getElementById(id).innerHTML = formatNumber(displayedValue += (actualValue - displayedValue) * animationSpeed, 'money')
		//console.log(twoDec(displayedValue += (actualValue - displayedValue) * animationSpeed))
	}
	oldValues[num] = twoDec(displayedValue += (actualValue - displayedValue) * animationSpeed);
}

setInterval(function () {
	animateNumber('money', 'moneyAmount', 0);
	animateNumber('oakWood', 'oakWoodAmount', 1);
	animateNumber('spruceWood', 'spruceWoodAmount', 2);
	animateNumber('planks', 'planksAmount', 3);
	animateNumber('lumberjackAmount', 'lumberjackAmount', 4);
	animateNumber('planksProduced', 'planksProduced', 5);


	p = smillPercentage;
	p /= 100;
	m = money;
	var percent = m * p;
	calculatedSawmillPercent = Math.floor(percent);

	//document.getElementById("SawmillPercent").innerHTML = smillPercentage + '%:' + calculatedSawmillPercent;
}, 33);


var ownedUpgrades = [];
for(var ii = 0; ii < 500; ii++){ // Fills the array with values because the splice method only works with a filled array
	ownedUpgrades.splice(0+ii, 0, 1+ii);
}

function upgradePurchase(price, id) {
	if(money >= price) {
		hideItem(id);
		if(id <= 50) {
			spawnUpgrade(id, 2, 1);
		}
		if(id >= 51 && id <= 100) {
			spawnUpgrade(id, 3, 1);
		}
		if(id >= 101 && id <= 150) {
			spawnUpgrade(id, 2, 1);
		}
		if(id >= 151 && id <= 200) {
			spawnUpgrade(id, 4, 1);
		}
		if(id >= 201 && id <= 250) {
			spawnUpgrade(id, 5, 1);
		}
		var index = ownedUpgrades.indexOf(id+1);
		ownedUpgrades[index] = 0;
		id = id + 'owned';
	}
	else {
		messageDisplay('Not enough money!', 'red');
	}
}

function spawnUpgrade(id, location, purchase) {
	var object = whichObject(id);
	if(object != undefined) {
		if(purchase == 1) {
			money -= object.price;
			messageDisplay(object.name + ' purchased!', '#4ea1d8; text-shadow: 0 0 3px blue;');
		}
		newUpgrade(object.name, object.image, object.info, object.price, id, location, object.effect);
	}
}

var lumberjackWPSPercent = 1;
var	lumberjackMPSPercent = 1;
var lumberjackTPSPercent = 1;

var autoSellAmount = 0;
function upgradeEffect(number, price) {
	if(price <= money) {
		if(number == 1) {
			axePercent += 0.0001;
		}
		if(number == 2) {
			baseLumberjackWPS *= 2;
			baseLumberjackMPS *= 2;
			baseLumberjackTPS *= 2;
			lJackSpeed /= 2;
		}
		if(number == 3) {
			sawmillSpeedIncrease();
		}
		if(number == 4) {
			baseWPT++;
			lumberjackWPSPercent += 0.01;
			lumberjackMPSPercent += 0.01;
			lumberjackTPSPercent += 0.01;
		}
		if(number == 5) {
			autoSellAmount++;
		}
		if(number == 6) {
			localStorage.chainsaw = 1;
			showItem('chainsawTool');
		}
		if(number == 7) {
			//plantationTPSPercent += 0.1;
			plantationBonus++;
		}
	}
}

function whichEffect(effect, param) {
	if(effect == 'axePercent') {
		effectInfo = '+0.01% of your total money in bank for each tree cut down.'
		effectId = 1
	}
	if(effect == 'lumberjackDouble') {
		effectInfo = 'Lumberjacks are twice as effective at twice the cost.'
		effectId = 2
	}
	if(effect == 'sawmillIncrease') {
		effectInfo = 'Sawmill production is 10% faster.'
		effectId = 3
	}
	if(effect == 'axeAdd') {
		effectInfo = '\n\u2022 +1 wood per tree.<br />\n\u2022 +1% lumberjack efficiecy.'
		effectId = 4
	}
	if(effect == 'autoSell') {
		effectInfo = 'Sells 1 resource every second.'
		effectId = 5
	}
	if(effect == 'unlockChainsaw') {
		effectInfo = 'Cut trees by simply holding down the left button. Yields 50% more wood than the axe at the cost of gasoline. Select in tool tab.'
		effectId = 6
	}
	if(effect == 'plantationIncrease') {
		effectInfo = 'Each plantation produces +1 more tree.'
		effectId = 7
	}

	if(param == 'id') {
		return effectId
	}
	if(param == 'info') {
		return effectInfo
	}
}

function newUpgrade(name, image, info, price, id, location, effect) {

	effectId = whichEffect(effect, 'id');

	if(location == 1) { // When the upgrade is firts created
		var $itemSection = $(".itemSection");
		var button = ');upgradePurchase(';
	}
	else if(location == 2) { // A copy placed in the "owned" section
		var $itemSection = $(".axeUpgradeSection");
		var button = "";
	}
	else if(location == 3) {
		var $itemSection = $(".sawmillSection");
		var button = "";
	}
	else if(location == 4) {
		var $itemSection = $(".lumberjackSection");
		var button = "";
	}
	else if(location == 5) {
		var $itemSection = $(".plantationSection");
		var button = "";
	}
	 	str = '<img class="small" id="'
	        + id
	        + '" onclick="upgradeEffect('
	        + effectId
	        + ', '
	        + price
	        + button
	        + price
	        + ', '
	        + id
	        + ');" onmouseover="tooltip('
	        + id
	        + ');" onmouseout="tooltip(-1);"'
	        + ' src="'
            + image
            + '">'
		html = $.parseHTML(str),
	 
	// Append the parsed HTML
	$itemSection.append(html);

}
function whichObject(number) {
	if(number <= number) {
		var object = window['axeUpgrade' + number]; //window[] accesses a global variable from a string
	}
	if(number >= 51 && number <= 100) {
		if(sawmillAmount >= 1) {
			var object = window['sawmillUpgrade' + number];
		}
	}
	if(number >= 101 && number <= 150) {
		var object = window['automationUpgrade' + number];
	}
	if(number >= 151 && number <= 200) {
		var object = window['lumberjackUpgrade' + number];
	}
	if(number >= 201 && number <= 250) {
		if(localStorage.plantationOwned == 1 || plantationOwned == 1) {
			var object = window['plantationUpgrade' + number];
		}
	}

	return object;
}

//buyable();
function buyable() {
	for(var i = 0; i < 500; i++){
		var id = document.getElementById(window["'" + i + "'"]);
		console.log(id, "'" + i + "'")
		//console.log(window[unlockedUpgrades.upgrade + i])
		if(window[unlockedUpgrades.upgrade + i] == 1) {
			console.log('tr')
			if(money >= whichObject("'" + i + "'").price) {
				id.style.filter = "brightness(100%)";
			}else {
				id.style.filter = "brightness(80%)";
			}
		}
		if(i == 499) {
			//i = 0;
			//buyable();
			console.log('loop complete')
		}
	}
}

setInterval(function () {
	unlocker();
	buildingUnlocker();
}, 500);

var unlockedUpgrades = {};
function unlocker() {
	for(var i = 1; i < 500; i++){
		var object = whichObject(i);
		if(object != undefined) {
			var price = object.price - object.price / 4; //Calculating 25% of the price
			// Upgrades are unlocked when you have 75% or more of its price in bank
			// Using the eval method allows for dynamic if statements
			eval("if(money >= price && ownedUpgrades[" + i + "] != 0 && unlockedUpgrades.upgrade" + i + " != 1){ unlockedUpgrades.upgrade" + i + " = 1; spawnUpgrade(" + i + ", 1);}");
		}
	}
}

function buildingUnlocker() {
	if(money >= 0 || plantationOwned == 1) { // 250
		showItem('plantationIcon');
	}
	if(money >= 0 || sawmillAmount >= 1) { // 250
		showItem('sawmillIcon');
	}
}

/* Template
var axeUpgrade = {
	name:    ,
	image:   ,
	info:    ,
	effect:  ,
	price:   ,
	id:      
};
*/

//=========AXE=========
var axeUpgrade1 = {
	name:    'Hatchet',
	image:   'images/hatchet.png',
	info:    'A standard axe, its grip feels good in your hand.',
	effect:  'axeAdd',
	price:   20,
	id:      1
};

var axeUpgrade2 = {
	name:    'Battle axe',
	image:   'images/battleaxe.png',
	info:    'An axe rather unfit for chopping wood. Perfect for killing though.',
	effect:  'axeAdd',
	price:   50,
	id:      2
};

var axeUpgrade3 = {
	name:    'Tomahawk',
	image:   'images/tomahawk.png',
	info:    'Small, lightwieght and perfect for a camping trip!',
	effect:  'axeAdd',
	price:   100,
	id:      3
};

var axeUpgrade4 = {
	name:    'Cleaving axe',
	image:   'images/hatchet.png',
	info:    'A heavy, wedge shaped axe used to split wood lengthways.',
	effect:  'axeAdd',
	price:   200,
	id:      4
};

var axeUpgrade5 = {
	name:    'Felling axe',
	image:   'images/hatchet.png',
	info:    'Much like a hatchet, but heavier. Its weight allows for a heavy swing.',
	effect:  'axeAdd',
	price:   300,
	id:      5
};

var axeUpgrade6 = {
	name:    'Splitting maul',
	image:   'images/hatchet.png',
	info:    'Heavy like a felling axe, this axe is used to split wood into kindling for bonfires.',
	effect:  'axeAdd',
	price:   500,
	id:      6
};

var axeUpgrade8 = {
	name:    'Double-bladed axe',
	image:   'images/hatchet.png',
	info:    "Another one of those axes that you really shouldn't be cutting trees with. Looks pretty cool though.",
	effect:  'axeAdd',
	price:   1000,
	id:      8
};

var axeUpgrade9 = {
	name:    'Royal axe',
	image:   'images/hatchet.png',
	info:    "An axe worthy of a king.",
	effect:  'axeAdd',
	price:   1500,
	id:      9
};

var axeUpgrade10 = {
	name:    'Futuristic axe',
	image:   'images/hatchet.png',
	info:    "An axe 200 years younger than you. How did you get ahold of this?",
	effect:  'axeAdd',
	price:   2000,
	id:      10
};

var axeUpgrade11 = {
	name:    'Saw',
	image:   'images/saw.png',
	info:    'Requires finesse to use, jams easily.',
	effect:  'axeAdd',
	price:   3000,
	id:      11
};

var axeUpgrade12 = {
	name:    'Firefighter axe',
	image:   'images/hatchet.png',
	info:    'Why would you cut wood with this?',
	effect:  'axeAdd',
	price:   4000,
	id:      12
};

var axeUpgrade50 = {
	name:    'Chainsaw',
	image:   'images/chainsaw.png',
	info:    'No more clicking to cut trees!',
	effect:  'unlockChainsaw',
	price:   5000,
	id:      50
};

//=========SAWMILL=========
var sawmillUpgrade51 = {
	name:    'Better machinery',
	image:   'images/grayCog.png',
	info:    'Better gears allow for faster saws.',
	effect:  'sawmillIncrease',
	price:   100,
	id:      51
};

var sawmillUpgrade52 = {
	name:    'How do you cut the sea in half? With a sea-saw',
	image:   'images/blueCog.png',
	info:    'Better gears allow for faster saws.',
	effect:  'sawmillIncrease',
	price:   200,
	id:      52
};

var sawmillUpgrade53 = {
	name:    'Upgrade 3',
	image:   'images/pinkCog.png',
	info:    'Better gears allow for faster saws.',
	effect:  'sawmillIncrease',
	price:   300,
	id:      53
};
var sawmillUpgrade54 = {
	name:    'Upgrade 4',
	image:   'images/greenCog.png',
	info:    'Better gears allow for faster saws.',
	effect:  'sawmillIncrease',
	price:   400,
	id:      54
};
var sawmillUpgrade55 = {
	name:    'Upgrade 5',
	image:   'images/yellowCog.png',
	info:    'Better gears allow for faster saws.',
	effect:  'sawmillIncrease',
	price:   500,
	id:      55
};
var sawmillUpgrade56 = {
	name:    'Upgrade 6',
	image:   'images/purpleCog.png',
	info:    'Better gears allow for faster saws.',
	effect:  'sawmillIncrease',
	price:   600,
	id:      56
};

//=========AUTOMATION=========
var automationUpgrade101 = {
	name:    'Salesman',
	image:   'images/salesman.png',
	info:    'A charismatic person that will sell your products for you. For a perfectly reasonable fee, of course. His name is Emil.',
	effect: 'autoSell',
	price:   500,
	id:      101
};

//=========LUMBERJACK=========
var lumberjackUpgrade151 = {
	name:    'Cocaine supply',
	image:   'images/pills.png',
	info:    'You start to regularly administer cocaine to your lumberjacks in order to increase their work speed.',
	effect: 'lumberjackDouble',
	price:   2500,
	id:      151
};
var lumberjackUpgrade152 = {
	name:    'Heroine supply',
	image:   'images/pills.png',
	info:    "The cocaine high just isn't enough. The lumberjacks start to shoot heroin up their arms to increase work speed further",
	effect: 'lumberjackDouble',
	price:   5000,
	id:      152
};

//=========PLANTATION=========
var plantationUpgrade201 = {
	name:    'Land enlargement',
	image:   'images/document.png',
	info:    'A contract that allows you to increase the size of each plantation by 10%',
	effect:  'plantationIncrease',
	price:    oneDec(Math.random() * 400),
	id:      201
};
var plantationUpgrade202 = {
	name:    'Court ruling',
	image:   'images/document.png',
	info:    'After a lenghty court case, the judge rules in your favor and you are allowed to expand your plantations.',
	effect:  'plantationIncrease',
	price:    oneDec(randomInt(600, 1400)),
	id:      202
};
var plantationUpgrade203 = {
	name:    'Corruption',
	image:   'images/document.png',
	info:    'You bribe a government official to increase the size of your plantations.',
	effect:  'plantationIncrease',
	price:    oneDec(randomInt(1000, 4000)),
	id:      203
};

function randomInt (min, max) {
    return Math.random() * (max - min + 1) + min;
}

var lumberjackPrice = 20;
var lumberjackAmount = 0;

var plantationPrice = 250;
var plantationAmount = 0;

var sawmillPriceMoney = 500
var sawmillPriceOak = 100
//Items, buildings and such start from 0
function shopBuy(itemNum) {
	switch(itemNum) {
		case 'spruceTile':
			if(money >= 500) {
				buyLand();
			} else {
				notEnough();
			}
			break;
		case 'sawmill':
			if(money >= sawmillPriceMoney && oakWood >= sawmillPriceOak) {
				if(sawmillAmount == 0) {
					activateSawmill();
				}
				sawmillAmount++;
				money -= sawmillPriceMoney;
				oakWood -= sawmillPriceOak;
				producingPlank = 0;
				planksProducedNow = 0;
				planks = Math.floor(planks);
				planksProduced = Math.floor(planksProduced);
				nav('sawmillSection');
			}
			else {
				messageDisplay('Insufficient funds!', 'red');
			}
			break;
		case 'lumberjack':
			if(money >= lumberjackPrice) {
				if(lumberjackAmount == 0) {
					activateLumberjack();
					buildingSwitch('lumberjack');
				}
				money -= lumberjackPrice;
				showItem('lumberjackImage');
				lumberjackAmount++;
				//document.getElementById('lumberjackTooltipAmount').innerHTML = lumberjackAmount;
				lumberjackBuy();
			}
			break;
		case 'plantation':
			if(money >= plantationPrice) {
					plantationBuy();
				if(plantationOwned != 1) {
					activatePlantation();
					plantationOwned = 1;
				}
			}
			break;
	}
}

function activatePlantation() {
	showItem("plantation");
	showItem("sectionBusiness");
}

function activateSawmill() {
	showItem("sawmill");
	showItem("plank");
	showItem("planksAmount");
}


var sawmillWPS = 0;
var sawmillMPS = 0;
var sawmillPPS = 0; // Planks per second

var baseSawmillWPS = -2;
var baseSawmillMPS = -1;
var baseSawmillPPS = 2;
setInterval(function sawmillPSCalculator() { // Calculates per second values for lumberjack
	//Wood per second
	sawmillWPS = baseSawmillWPS * sawmillWPSMultiply;
	//Money per second
	sawmillMPS = baseSawmillMPS * sawmillMPSMultiply;
	//Trees per second
	sawmillPPS = baseSawmillPPS * sawmillPPSMultiply;
}, 100);


sawmillPPSMultiply = 1;
sawmillMPSMultiply = 1;
sawmillWPSMultiply = 1;
function sawmillDouble() {
	sawmillPPSMultiply *= 2;
	sawmillMPSMultiply *= 2;
	sawmillWPSMultiply *= 2;
}

// Different wood types affect production speed and batch size.

function sawmillSpeedIncrease() {
	sawmillPercent += 0.1; // 10 percent faster
}

var sawmillWhichWood = 'oakWood';
var currentSawmillType = sawmillWhichWood;
function sawmillWoodType(type) {
	if(currentSawmillType != type) {
		producingPlank = 0;
		planksProducedNow = 0;
		currentSawmillType = type;
		if(type == 'oak') {
			sawmillWhichWood = 'oakWood';
			plankPriceMultiplier = 2;
		}
		if(type == 'spruce') {
			sawmillWhichWood = 'spruceWood';
			plankPriceMultiplier = 2;
		}
	}
}

var sawmillPercent = 1;
var producingPlank = 0;
var plankSpeed = 0.1;
var plankBatchSize = 0.1;
var plankPriceMultiplier = 2;
var sawmillAmount = 0;
var planksProducedNow = 0;
function sawmillProduce(focus) {
	percent = sawmillPercent;
	if(sawmillWhichWood == 'spruceWood') { percent += 0.2};
	var speed = plankSpeed * percent;
	if(sawmillAmount >= 1 && sawmillOn == 1) {
		if(focus && money - (speed * plankPriceMultiplier) * sawmillAmount / 10 >= 0 && window[sawmillWhichWood] - (plankBatchSize * sawmillAmount) / 10 >= 0){
			producingPlank += speed / 10;
			money -= (speed * plankPriceMultiplier) * sawmillAmount / 10;
			planksProducedNow += ((plankBatchSize * percent) * sawmillAmount) / 10;
			window[sawmillWhichWood] -= (plankBatchSize * sawmillAmount) / 10;
		}else if(money - (speed * plankPriceMultiplier) * sawmillAmount >= 0 && window[sawmillWhichWood] - plankBatchSize * sawmillAmount >= 0){
			producingPlank += speed;
			money -= (speed * plankPriceMultiplier) * sawmillAmount;
			planksProducedNow += (plankBatchSize * percent) * sawmillAmount;
			window[sawmillWhichWood] -= plankBatchSize * sawmillAmount;
		}
		document.getElementById('barTime').innerHTML = Math.floor(planksProducedNow) + '/' + sawmillAmount;

		var bar = document.getElementById('sawmillBar').style;
		bar.width = twoDec((producingPlank) * 100) + '%';
		bar.transition = '.1s ease';

		if(planksProducedNow >= (plankBatchSize * 10) * sawmillAmount + 0.01) {
			planks += (plankBatchSize * 10) * sawmillAmount;

			planksProduced += (plankBatchSize * 10) * sawmillAmount;

			producingPlank = 0;
			bar.width = twoDec((producingPlank) * 100) + '%'; 
			bar.transition = '.0s ease' // Disables the transition so that the bar doesn't visibly go back to start
			planksProducedNow = 0;
		}

		document.getElementById('sawmill').src = 'images/sawmillActive.png';
	} else {
		document.getElementById('sawmill').src = 'images/sawmill.png';
	}

}


var secondsPlayed = 0;
var days = 0;
var planksProduced = 0;
setInterval(function() {
	// Incremetally increase varible to create a timer to check if you have saved
	saveTimer++;

	if(secondsPlayed < 86400) {
		secondsPlayed++;
	} else {
		secondsPlayed = 1;
		days++;
	}

	//For the salesman
	sellWood(autoSellAmount, 'auto');
		
}, 1000);

var autoLumberjackInput;
var lumberjackGO2 = true;
var lumberjackGO = false;
var ljTrees = 0;
var activeType = "";
var lumberjackActive = '';



var plantationOwned = 0;
var unbuiltPlantations = 0;
var basePlantationTPS = 0;
function plantationBuy() {
	plantationAmount++;
	unbuiltPlantations++;
	money -= plantationPrice;
	plantationPrice += 2;
}

var plantationTPSMultiply = 1;
var plantationTPSAdd = 0;
var plantationTPS = 0;
setInterval(function plantationPSCalculator() { // Calculates per second values for lumberjack
	plantationTPS = ((basePlantationTPS * plantationTPSMultiply) + plantationTPSAdd) + plantationTPSAdd * plantationAmount;
}, 100);


var plantationSize = 100;

setInterval(function() {
	addPlantationValue('oak');
	addPlantationValue('spruce');
}, 1000);

var treesGrown = 0;
var plantationChance = 0.01;
var plantationBonus = 0;
var oakPlantations = 0;
var sprucePlantations = 0;
function addPlantationValue(type) {
	for (var i = 1; i <= window[type + 'Plantations'] * 10 + plantationBonus * window[type + 'Plantations']; i++) {
		if(Math.random() < plantationChance) {
			window[type + 'TileTrees']++;
			treesGrown++;
		}
	}
}



/*=====================================================================================
									 MISCELLANEOUS
=======================================================================================*/
// var prevColor;
 var colorArray = ['blue', 'red', 'pink', 'green', 'orange', 'purple', 'yellow']
// setInterval(function rainbow() {
// 	var elem = document.getElementById('rainbowFont');
//     elem.style.color = colorArray[Math.floor(Math.random() * 8)];
//    	if(prevColor == elem.style.color) {
//    		elem.style.color = colorArray[Math.floor(Math.random() * 8)]; //Lowers the chance
//    	}
//     prevColor = elem.style.color;
// }, 50);

function boolean(variable) {
	window[variable] = !window[variable];
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


function toggleShow(ID) {
var x = document.getElementById(ID).style;
	if(x.display != "none") {
		x.display = "none";
	} else {
		x.display = "block";
	}
}


function nav(menu) {
	if(menu == 'lumberjackSection' && lumberjackUnlocked == false) {
		messageDisplay("You have not unlocked lumberjacks yet.");
	}
	else if(menu == 'plantationSection' && plantationUnlocked == false) {
		messageDisplay("You have not unlocked plantations yet.");
	}
	else if(menu == 'sawmillSection' && sawmillUnlocked == false) {
		messageDisplay("You have not unlocked sawmills yet.");
	}
	else {
		hideItem('optionsSection');
		hideItem('sawmillSection');
		hideItem('lumberjackSection');
		hideItem('plantationSection');
		hideItem('plantationBuildSection');
		hideItem('stockSection');
		hideItem('stockInfo');
		hideItem('infoSection');
		hideItem('statsSection');
		shopSwitch(10);
		showItem(menu);
	}
}

function shopSwitch(item) {
	hideItem('itemShop');
	hideItem('ownedItems');
	hideItem('Marketsection');
	hideItem('stocksSection');

	hideItem('stockSection');
	showItem('treeSection');
	switch(item){
		case 10:
			showItem('itemShop');
			break;
		case 20:
			showItem('ownedItems');
			break;
		case 30:
			showItem('Marketsection');
			break;
		case 40:
			showItem('stocksSection');
			showItem('stockSection');
			break;
	}
}

function infoSwitch(item) {
	hideItem('navSection');
	hideItem('landSection');
switch(item){
		case 10:
			showItem('navSection');
			break;
		case 20:
			showItem('landSection');
			break;
		case 30:
			break;
		case 40:
			break;
	}
}

//'I once met a traveller from an antique land who said "Two vast and trunkless legs of stone stand in the desert. Near them, on the sand, Half sunk, a shattered visage lies, whose frown, And wrinkled lip, and sneer of cold command, Tell that its sculptor well those passions read Which yet survive, stamped on these lifeless things The hand that mocked them and the heart that fed. And on the pedestal these words appear "My name is Ozymandias, Kind of kings, look on my work ye mighty and despair!" Nothing beside remains. Round the decay Of that colossal wreck, boundless and bare, The lone and level sands stretch far away.'

function changeColor(ID, color) {
    var x = document.getElementById(ID);
    x.style.backgroundColor = color;
}

var cheat = {c: 0, h: 0, e: 0, a: 0, t: 0, s: 0}

// Allows you to use the "enter" key when writing sell amount
document.onkeydown = function(e){
	e = e || window.event;
	var key = e.which || e.keyCode;
	if(key === 13){
		if(document.getElementById("inputAmount").value != "") {
 			sellWood();
 		}
    }
	else if(key == 67) { // Typing 'cheat' on the keyboard will bring up the cheat menu
 		cheat.c = 1;
	}
	else if(key == 72 && cheat.c == 1) {
		cheat.h = 1;
	}
	else if(key == 69 && cheat.c == 1 && cheat.h == 1) {
		cheat.e = 1;
	}
	else if(key == 65 && cheat.c == 1 && cheat.h == 1 && cheat.e == 1) {
		cheat.a = 1;
	}
	else if(key == 84 && cheat.c == 1 && cheat.h == 1 && cheat.e == 1 && cheat.a == 1) {
		cheat.t = 1;
	}
	else if(key == 83 && cheat.c == 1 && cheat.h == 1 && cheat.e == 1 && cheat.a == 1 && cheat.t == 1) {
		cheat.c = 0; cheat.h = 0; cheat.e = 0; cheat.a = 0; cheat.t = 0;
		showCheats();
	}
	else {
		cheat.c = 0; cheat.h = 0; cheat.e = 0; cheat.a = 0; cheat.t = 0;
	}

}

function bright(ID, remove) {
	var x = document.getElementById(ID);
	if(remove != 'remove') {
		x.style.filter =  "brightness(125%)";
	} else {
		x.style.filter =  "brightness(100%)";
	}
}

// Hides html elements
function hideItem(ID) {
    var x = document.getElementById(ID);
    x.style.display = "none";
}

// Shows html elements
function showItem(ID) {
    var x = document.getElementById(ID);
    x.style.display = "block";
}

// Used to switch between dispalying the different shops
function hideShop() {
    var x = document.getElementById(itemShop);
    x.style.display = "none";
}

function notEnough() {
	messageDisplay('Not enough money!', '#CC0000');
}

// Used for delaying each axe swing
var delayTime = 10; //usually 750, 0 when testing the game
var canGo = true;
// Upgrade affected variables
var oakValue = 1; // The value of each individual piece of wood. Increased using upgrades (not yet implemented)
var spruceValue = 1.5;
var plankValue = 10;
var oakTreeAmount = 50; // Amount of trees owned
var spruceTreeAmount = 0;
// Currency variables and such
var treeStage = 0;
var assurance = 0;

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
setInterval(function () {
	if(Math.floor(Math.random() * 100) <= 90) {
		population = population += Math.floor(Math.random() * 2);
	}
	else {
		population--;
	}
	if(earthActive == true) {
		document.getElementById('Population').innerHTML = 'Population: ' + population;
	}
}, 250);

// Booleans used for each tree type
var oakTree = true;
var spruceTree = false;

// Not currently in use, looks too buggy
var randomBackground = "";
function changeBackground() {
	var backgroundArray = ['https://i.imgur.com/5zTMOb3.png', 'https://i.imgur.com/EhUxkF0.png'];
	randomBackground = '"' + backgroundArray.splice(Math.floor(Math.random() * backgroundArray.length)) + '"';
}

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
	if(activeTool == 'axe') {
		if(mouseDown == 0) {
			clickTreeImage.style.cursor = "url('images/hatchet.png'), auto";
		}
		if(mouseDown == 1) {
			clickTreeImage.style.cursor = "url('images/hatchetClick.png'), auto";
		}
	}
	if(activeTool == 'chainsaw') {
		clickTreeImage.style.cursor = "url('images/chainsaw48.png'), auto";
	}
}

var activeTool = 'axe';
function chooseTool(which) {
	switch(which){
	case 0:
		activeTool = 'axe';
		woodYieldMultiplier = 1;
		break;
	case 1:
		if(activeTool == 'axe') {
			woodYieldMultiplier *= 1.5;
		}
		activeTool = 'chainsaw';
		break;
	}
}

var chainsawOn = false;
var cooldown = false;

async function cutTree() {
	if(activeTool == 'chainsaw') {
		if(cooldown == false) {
			clickTree();
			cooldown = true;
			await sleep(1500);
			cooldown = false;
		}
	}
	if(activeTool == 'axe') {
		clickTree();
	}
}

async function clickTree() {
		if(activeTool == 'axe') {
			axeTree();
			//document.getElementById('cutAudio').play();
		}
		if(activeTool == 'chainsaw') {
			await sleep(300);
			if(mouseDown == 1) {
				axeTree();
			}
		}
}

function axeTree() {
	if(oakTileTrees > 0 && chosenTile == 1) {
		tree();
	}
	else if(spruceTileTrees > 0 && chosenTile == 2) {
		tree();
	} else {
		messageDisplay("No more trees left!", 'red');
	}
}

var cutStrenght = 1;
var treesCutDown = 0;
function tree() {
if(treeStage == 0 && canGo) {
			if(oakTree) {
			imageReplace('clickTreeImage', 'https://i.imgur.com/9dYxQOs.png');
			}
			else if(spruceTree) {
			imageReplace('clickTreeImage', 'https://i.imgur.com/BQMR8Uz.png');
			}
			treeStage += cutStrenght;
			canGo = false;
			setTimeout(function () {
	        	canGo = true;
	        }, delayTime)
		}
		else if(treeStage == 1 && canGo) {
			if(oakTree) {
				imageReplace('clickTreeImage', 'https://i.imgur.com/uUXjx0k.png');
			}
			else if(spruceTree) {
				imageReplace('clickTreeImage', 'https://i.imgur.com/uyMMK5D.png');
			}
			treeStage += cutStrenght;
			canGo = false;
			setTimeout(function () {
	        	canGo = true;
	        }, delayTime)
		}
		else if(treeStage == 2 && canGo) {
			if(oakTree) {
				imageReplace('clickTreeImage', 'https://i.imgur.com/RUmLW5d.png');
			}
			else if(spruceTree) {
				imageReplace('clickTreeImage', 'https://i.imgur.com/a9TLifm.png');
			}
			treeStage += cutStrenght;
			canGo = false;
			setTimeout(function () {
	        	canGo = true;
	        }, delayTime)
		}
		else if(treeStage == 3 && canGo) {
			if(oakTree) {
				imageReplace('clickTreeImage', 'https://i.imgur.com/TLJzfH6.png');
			}
			else if(spruceTree) {
				imageReplace('clickTreeImage', 'https://i.imgur.com/kFHe3gB.png');
				treeStage += 2 // Skipping two stages because spruce wood takes shorter
			}
			treeStage += cutStrenght;
			canGo = false;
			setTimeout(function () {
	        	canGo = true;
	        }, delayTime)
		}
		else if(treeStage == 4 && canGo && spruceTree != true) {
			imageReplace('clickTreeImage', 'https://i.imgur.com/9rr9haX.png');
			treeStage += cutStrenght;
			canGo = false;
			setTimeout(function () {
	        	canGo = true;
	        }, delayTime)
		}
		else if(treeStage == 5 && canGo && spruceTree != true) {
			imageReplace('clickTreeImage', 'https://i.imgur.com/ZRlTtkj.png');
			treeStage += cutStrenght;
			canGo = false;
			setTimeout(function () {
	        	canGo = true;
	        }, delayTime)
		}
		else if(treeStage >= 6 && canGo) {
			if(oakTree) {
				var oakArray = ['https://i.imgur.com/YGtLRnA.png', 'https://i.imgur.com/5A2LW1e.png']; //makes the last image random
				var randomOak = oakArray.splice(Math.floor(Math.random() * oakArray.length));
				document.getElementById('clickTreeImage').src = randomOak;
			}
			else if(spruceTree) {
				var spruceArray = ['https://i.imgur.com/pT4aSQQ.png', 'https://i.imgur.com/7s14wWl.png'];
				var randomSpruce = spruceArray.splice(Math.floor(Math.random() * spruceArray.length));
				document.getElementById('clickTreeImage').src = randomSpruce;
			}
			if(assurance == 0) {
				if(oakTree) {
					oakWood += WPT;
				}
				if(spruceTree) {
					spruceWood += WPT;
				}
				if(treesCutDown == 0) {
					messageDisplay('You decide to cut them down.', 'green');
				}
				treesCutDown++;
				assurance++;
				treeLoose();
				treeStage += cutStrenght;
				messageDisplay('+' + WPT + ' wood', 'green');
				canGo = false;
				setTimeout(function () {
	        		canGo = true;
	        	}, delayTime)
			} else {
				if(oakTree) {
					imageReplace('clickTreeImage', 'https://i.imgur.com/aGBT0tm.png');
				}
				else if(spruceTree) {
					imageReplace('clickTreeImage', 'images/spruceTree.png');
				}
				treeStage = 0;
				assurance--;
			}
		}
		if(mouseDown == 1 && activeTool == 'chainsaw') {
			clickTree();
		}
}

// Upgrades
function upgrade(num) {
	switch(num){
		case 0:
			break;
		case 1:
		    // Upgrade 1 = Better axe
			delayTime = 600;
			break;
		case 2:
			break;
		case 3:
			oakWood += 1000;
			break;
		case 4:
			spruceWood += 1000;
			break;
		case 10:
			oakTileTrees += 1000;
			break;
		case 20:
			money += 1000;
			moneyEarned += 1000;
			break;
	}
}


/*=====================================================================================
									LUMBERJACK
=======================================================================================*/
var oakLumberjacks = 0;
var spruceLumberjacks = 0;
var availableLumberjacks = 0;

var addRemove = 1;
var assignAmount = 1;

function changeAmount(amount) {
	brightness('bulkOne', 0.4);
	brightness('bulkHundred', 0.4);
	brightness('bulkThousand', 0.4);
	brightness('bulkAll', 0.4);

	if(amount == 1) {
		brightness('bulkOne', 1.1);
	}
	if(amount == 100) {
		brightness('bulkHundred', 1.1);
	}
	if(amount == 1000) {
	brightness('bulkThousand', 1.1);
	}
	if(amount == 'all') {
		assignAmount = availableLumberjacks;
		brightness('bulkAll', 1.1);
	} else {
		assignAmount = amount;
	}
}

function brightness(ID, amount) {
	document.getElementById(ID).style.filter = "brightness(" + amount + ")";
}

function buyBusiness(which) {
	for (var i = 0; i < assignAmount; i++) {
		shopBuy(which);
	}
}

function assign(tile, business) {
	for (var i = 0; i < assignAmount; i++) {
		if(addRemove) {
			if(business == 'lumberjack') {
				if(availableLumberjacks > 0) {
					window[tile + 'Lumberjacks']++;
					availableLumberjacks--;
				}
			}else {
				if(unbuiltPlantations > 0) {
					window[tile + 'Plantations']++;
					unbuiltPlantations--;
				}
			}
		}else if(window[tile + 'Lumberjacks'] >= 1) {
			console.log(window[tile + 'Lumberjacks'])
			window[tile + 'Lumberjacks']--;
			availableLumberjacks++;
		}
	}


	// Lumberjack animation
	// Not sure if I will keep it or not
	// Will come back to
	if(money >= Math.abs(baseLumberjackMPS) && lumberjackOn == 1) { // Makes sure the animation starts if it should
		if(whichTile > 0) { // If a tile is chosen
			if(oakWood >= Math.abs(lumberjackWPS) || spruceWood >= Math.abs(lumberjackWPS)) {
				//lumberJack();
			}
		}
	}
}


function activateLumberjack() {
	lumberjackGO = true;
	showItem('lumberjackImage');
	showItem("sectionBusiness");
}


//   					Axe upgrades
var WPT = 0; // Wood per tree
var baseWPT = 5;
var axePercent = 0;
var woodYieldMultiplier = 1;
setInterval(function axePercentUpgrade() {
	WPT = (baseWPT + Math.trunc(money * axePercent)) * woodYieldMultiplier;
}, 100);


//						Lumberjack upgrades
var lumberjackWPS = 0;
var lumberjackMPS = 0;
var lumberjackTPS = 0;

var baseLumberjackWPS = 0.1; // Wood per second
var baseLumberjackMPS = -0.05; // Money per second
var baseLumberjackTPS = -0.01; // Trees per second

//priceIncrease

function lumberjackBuy() {
	buildingSwitch('lumberjack');
	var oldPrice = lumberjackPrice;
	lumberjackPrice += 1;
	availableLumberjacks++;

	//baseLumberjackWPS += 0.1; //old value 0.4 || 0.05
	//baseLumberjackMPS += -0.5; // -0.1 || -0.03
	//baseLumberjackTPS += -0.05; // -0.1 || -0.003
}

var lumberjackAxeUpgrade = 0;

// Cheks if the game is in focus or not, only runs smoothly if in focus
setInterval(function focus() {
	if (!document.hidden) {
		lumberjackProduce(true);
		sawmillProduce(true);
	}
}, 100);

setInterval(function defocus() {
	if (document.hidden) {
		lumberjackProduce();
		sawmillProduce();
	}
}, 1000);

var lumberjackTreesCutDown = 0;

var oakLumberjackWPS = 0;
var oakLumberjackMPS = 0;
var oakLumberjackTPS = 0;

var spruceLumberjackWPS = 0;
var spruceLumberjackMPS = 0;
var spruceLumberjackTPS = 0;

function lumberjackProduce(focus) {
	autoLumberjackInput = Math.abs(baseLumberjackMPS);
	var positiveMPS = Math.abs(baseLumberjackMPS);
	var positiveTPS = Math.abs(baseLumberjackTPS);

	if(lumberjackOn == 1) {
		lumberjackActive = true;

		if(focus) {
			var subtractOakWood = ((oakLumberjacks * baseLumberjackWPS) * lumberjackWPSPercent) / 10;
			var subtractOakMoney = ((oakLumberjacks * baseLumberjackMPS) * lumberjackMPSPercent) / 10;
			var subtractOakTrees = ((oakLumberjacks * baseLumberjackTPS) * lumberjackTPSPercent) / 10;
		}else {
			var subtractOakWood = (oakLumberjacks * baseLumberjackWPS) * lumberjackWPSPercent;
			var subtractOakMoney = (oakLumberjacks * baseLumberjackMPS) * lumberjackMPSPercent;
			var subtractOakTrees = (oakLumberjacks * baseLumberjackTPS) * lumberjackTPSPercent;
		}
		if(oakTileTrees >= positiveTPS) {
			if(money + subtractOakMoney >= 0) {
				oakWood += subtractOakWood;
				oakTileTrees += subtractOakTrees;
				lumberjackTreesCutDown += Math.abs(subtractOakTrees);
				money += subtractOakMoney;
			}
		}

		if(focus) {
			var subtractSpruceWood = ((spruceLumberjacks * baseLumberjackWPS) * lumberjackWPSPercent) / 10;
			var subtractSpruceMoney = ((spruceLumberjacks * baseLumberjackMPS) * lumberjackMPSPercent) / 10;
			var subtractSpruceTrees = ((spruceLumberjacks * baseLumberjackTPS) * lumberjackTPSPercent) / 10;
		}else {
			var subtractSpruceWood = (spruceLumberjacks * baseLumberjackWPS) * lumberjackWPSPercent;
			var subtractSpruceMoney = (spruceLumberjacks * baseLumberjackMPS) * lumberjackMPSPercent;
			var subtractSpruceTrees = (spruceLumberjacks * baseLumberjackTPS) * lumberjackTPSPercent;
		}
		if(spruceTileTrees >= positiveTPS) {
			if(money + subtractSpruceMoney >= 0) {
				spruceWood += subtractSpruceWood;
				spruceTileTrees += subtractSpruceTrees;
				lumberjackTreesCutDown += Math.abs(subtractSpruceTrees);
				money += subtractSpruceMoney;
			}
		}

		oakTileTrees = twoDec(oakTileTrees);
		spruceTileTrees = twoDec(spruceTileTrees);
		ljOak = oneDec(ljOak);
		ljSpruce = oneDec(ljSpruce);

		lumberjackGO = true;
		if(lumberjackGO2 == false) {
			//lumberJack();
			lumberjackGO2 = true;
		}
	}
	else {
		lumberjackGO = false;
		lumberjackGO2 = false;
	}
}


setInterval(function() {
	document.getElementById('lumberjackNumber').innerHTML = lumberjackAmount;
	document.getElementById('lumberjackAvailable').innerHTML = availableLumberjacks;
	document.getElementById('oakLumberjacks').innerHTML = oakLumberjacks;
	document.getElementById('spruceLumberjacks').innerHTML = spruceLumberjacks;
	document.getElementById('plantationNumber').innerHTML = plantationAmount;
}, 100);




async function showLumberjackUpgrades() {
	    var x = document.getElementById("lumberjackUpgrades");
	    if (x.style.display === "block") {
	        x.style.display = "none";
	    } else {
	        x.style.display = "block";
	    }
}

// On oak tree 510 milliseconds mean each tree takes 10 seconds
// 510 for spruce too
var lJackSpeed = 500; // The initial speed of the lumberjack
var lJackTreeStage = 1; // The stage of the tree, goes up for every hit from the lumberjack. Is reset for every tree.
// Lumberjack animation and tree animation

/*async function lumberJack() {
	if(lumberjackGO == true) {
		// Variables used to modify the lumberjack's speed
		var lJackSpeed2 = lJackSpeed;
		var lJackSpeedHalf = lJackSpeed2/2
		var lJackSpeedHalf2 = lJackSpeedHalf
		var lJackSpeedQuart = lJackSpeed2/2
		// Gets the class that dictates the lumberjack's position and allows the funcion to modify it
		var x = document.getElementById("lumberjackImage");
		Amount1 = oakTreeAmount;
		Amount2 = spruceTreeAmount;
		var totalTreeAmount = Amount1 += Amount2;
		if(totalTreeAmount > 0 && lJackTreeStage < 7) {
			x.style.transform = 'scaleX(1)';
			await sleep(lJackSpeed);
			document.getElementById('lumberjackImage').src='https://i.imgur.com/YsM2zaK.png';
			await sleep(lJackSpeed);
			document.getElementById('lumberjackImage').src='https://i.imgur.com/2KsEfXR.png';
			await sleep(lJackSpeed);
			document.getElementById('lumberjackImage').src='https://i.imgur.com/nUiwJEV.png';
			if(lJackTreeStage == 1) {
				if(whichTile == 1) { // Checks what tree is currently displayed and changes accordingly
					document.getElementById('treeImage').src='https://i.imgur.com/wsftoQ8.png';
				} 
				else if(whichTile == 2) {
					document.getElementById('treeImage').src='https://i.imgur.com/BQMR8Uz.png';
				}
				lJackTreeStage++;
				await sleep(lJackSpeedHalf);
				x.style.left = "15px"; // Moves the lumberajack
				await sleep(lJackSpeedHalf);
				lumberJack(); // Calls the function again
			}
			else if(lJackTreeStage == 2) {
				if(whichTile == 1) {
					document.getElementById('treeImage').src='https://i.imgur.com/ta996SE.png';
				}
				else if(whichTile == 2) {
					document.getElementById('treeImage').src='https://i.imgur.com/uyMMK5D.png';
				}
				lJackTreeStage++;
				await sleep(lJackSpeedHalf);
				x.style.left = "22px";
				await sleep(lJackSpeedHalf);
				lumberJack();
			}
			else if(lJackTreeStage == 3) {
				if(whichTile == 1) {
					document.getElementById('treeImage').src='https://i.imgur.com/mQMzfS8.png';
				}
				else if(whichTile == 2) {
					document.getElementById('treeImage').src='https://i.imgur.com/a9TLifm.png';
				}
				lJackTreeStage++;
				await sleep(lJackSpeedHalf);
				x.style.left = "32px";
				await sleep(lJackSpeedHalf);
				lumberJack();
			}
			else if(lJackTreeStage == 4) {
				if(whichTile == 1) {
					document.getElementById('treeImage').src='https://i.imgur.com/3WXtrGz.png';
				}
				else if(whichTile == 2) {
					document.getElementById('treeImage').src='https://i.imgur.com/kFHe3gB.png';
				}
				lJackTreeStage++;
				await sleep(lJackSpeedHalf);
				x.style.left = "40px";
				await sleep(lJackSpeedHalf);
				lumberJack();
			}
			else if(lJackTreeStage == 5) {
				if(whichTile == 1) {
					document.getElementById('treeImage').src='https://i.imgur.com/mbMZysM.png';
				}
				else if(whichTile == 2) {
					document.getElementById('treeImage').src='https://i.imgur.com/pT4aSQQ.png';
				}
				lJackTreeStage = 1;	
				await sleep(lJackSpeedQuart);
				x.style.transform = 'scaleX(-1)';
				await sleep(lJackSpeedQuart);
				x.style.left = "5px";
				await sleep(500);
				if(whichTile == 1) {
					document.getElementById('treeImage').src = 'https://i.imgur.com/aGBT0tm.png';
				}
				else if(whichTile == 2) {
					document.getElementById("treeImage").src = 'images/spruceTree.png';
				}
				lumberJack();
			}
		} else {
			document.getElementById('lumberjackImage').src='images/lumberjackIdle.png';
		}
	} else {
		document.getElementById('lumberjackImage').src='images/lumberjackIdle.png';
	}
}*/


/*=====================================================================================
									TEXT STUFF
=======================================================================================*/

function messageDisplay(text, color) {
	var br = '<br />';
	if(text.length > 40 && color != 'custom') { // Giving some extra space to separate longer messages
		br = '<br />' + '<br />'
	}

	showItem('navSection'); // Closes the land menu and opens the info menu to assure the message is seen
	hideItem('landSection');

	if(color == 'green') { // Nicer colors
		color = '#3dc62b; text-shadow: 0 0 3px green;';
	}
	if(color == 'red') {
		color = '#6d0000; text-shadow: 0 0 3px #FF0000;';
	}

	color = 'white';

	message = $.parseHTML('<div class="message"><font style=" color:' + color + '">' + text + '</font></div>'),

	$("#messageSection").prepend(message);

}

var earthActive = false;
function spawnTooltip(which) {
	switch(which){
		case 'earth':
			tooltip("images/earth.png", 'Earth', 'Price: <font color="#11ad14">5,000,000,000,000,000$</font>', '+1,040,000,000,000 trees', 'A spherical plot of land containing about 1,04 trillion trees but mostly useless water.<br /><font color="#11ad14" id="Population">Population: ' + population + '</font>')
			earthActive = true;
			break;

		case 'spruceTile':
			tooltip("images/spruceTile.png", 'Spruce forest', 'Price: <font color="#11ad14">500$</font>', '+900 to 1100 trees', 'A patch of forest containing about 1000 trees.')
			break;

		case 'lumberjack':
			tooltip('images/lumberjackProfile.png', 'Lumberjack', 'Earn 100$ to unlock', twoDec(moneyEarned) + '$ earned', 'A sturdy fellow wearing a checkerd shirt and jeans. His face is covered by a huge fuzzy beard and his arms are bulging with muscle.')
			break;

		case 'plantation':
			tooltip('images/plantation.png', 'Plantation', 'Cut 100 trees to unlock', totalTreesCut + ' trees cut down', 'Wast acres of land dedicated to growing the finest of trees.')
			break;

		case 'sawmill':
			tooltip('images/sawmillShopIcon.png', 'Sawmill', 'Sell 500 wood to unlock', woodSold + ' wood sold', 'Old fashioned, but efficient. This water-powered sawmill will do just fine until you can afford better.')
			break;

		case 'oak':
			tooltip('images/oakLog.png', 'Oak wood', 'Value: <span class="oakValue"></span>', '', 'A strong type of wood with a wide range of use.')
			updateTooltipValue('oakValue');

			break;

		case 'spruce':
			tooltip('images/spruceLog.png', 'Spruce wood', 'Value: <span class="spruceValue"></span>', '', 'A beautiful dark wood perfect for indoor buidling.')
			updateTooltipValue('spruceValue');
			break;

		case 'planks':
			tooltip('images/plank.png', 'Planks', 'Value: <span class="plank"></span>', '', 'Logs processed into sturdy planks.')
			updateTooltipValue('plank');
			break;

		case 'ljChooseTile':
			tooltip('images/info.png', 'Lumberjack tile', '', '', 'The lumberjacks only cut one type of tree at a time. If there is no more of that type, they will simply stop until there is more or they are assigned to a new type of tree. To change type click this button and choose a plot of land.')
			break;

		case 'lumberjackSkillTree':
			tooltip('images/lumberjackProfile.png', 'Skill tree', '', '', 'You have unlocked lumberjacks! Through achievements, you earn skill points with which you can unlock skills.')
			break;

		case 'lumberjackPS':
			tooltip('images/lumberjackProfile.png', 'Stats', '', '<font color="green"">\n\u2022 +' + twoDec(lumberjackWPS) + ' Wood per second <br /></font><font color="red">\n\u2022 ' + twoDec(lumberjackMPS) + ' Money per second <br />\n\u2022 ' + threeDec(lumberjackTPS) + ' Trees per second</font>', '')
			break;

		case 'shopButton':
			tooltip('images/money.png', 'Shop', '', '', 'This is the shop, you can buy upgrades and land here. Items are unlocked as you progress.')
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
		case 'ljOnOff':
			tooltip('images/lumberjackProfile.png', 'On and Off', '', '', "Making the lumberjacks stop working might be a good idea at times. As long as you have trees and money available, the lumberjacks will keep on  working. If you're trying to save money it will be better to keep them from working to cut down on expenses.")
			break;
		case 'ljBulk':
			tooltip('images/lumberjackProfile.png', 'Bulk', '', '', 'Choose how many lumberjacks you will be hiring, adding or removing with each click.')
			break;
		case 'ljAddRemove':
			tooltip('images/lumberjackProfile.png', 'Adding or removing', '', '', 'Adding a lumberjack to a plot of land makes him cut trees there. Removing him allows you to assign him elsewhere.')
			break;
		case 'sawmillOak':
			tooltip('images/oakLog.png', 'Oak wood', 'Price: 2$/batch', '\n\u2022 Production time: 10 seconds<br />\n\u2022 1 plank per batch', '')
			break;
		case 'sawmillSpruce':
			tooltip('images/spruceLog.png', 'Spruce wood', 'Price: 2$/batch', '\n\u2022 Production time: 8 seconds', '')
			break;

			break;
		case 'plantationBuild':
			tooltip('images/plantation.png', 'Build plantation', '', '', 'For your plantation to grow trees, you first have to build it.')
			break;


	}
}

function updateTooltipValue(which) {
	var x = document.getElementsByClassName(which);
	for (var i = 0; i < x.length; i++) {
	  x[i].innerHTML = window[which] + '$';
	}
}

tooltipArray = [];
whichMenu = 0;
function tooltip(image, title, price, effect, description) {

	if(isNaN(image) == false && image > 0) { // Because upgrades all have the same layout
		object = whichObject(image)
		image = object.image;
		title = object.name;
		price = object.price + '$';
		effect = whichEffect(object.effect, 'info');
		description = object.info;
	}
	if(price == '') {
		price = '<section style="margin-top:-15px;"></section>';
	}
	if(effect == '') {
		//effect = '<section style="margin-top:-15px;"></section>';
	}
	if(image == -1) { // on mouseout, hide
		hideItem('tooltipBox');
		hideItem('tooltipBoxLumberjack');
		hideItem('tooltipBoxPlantation');
		hideItem('tooltipBoxPlantationBuild');
		hideItem('tooltipBoxSawmill');
		hideItem('tooltipBoxStock');
		hideItem('tooltipBoxStockInfo');
		hideItem('tooltipBoxSettings');
		hideItem('tooltipBoxInfo');
		hideItem('tooltipBoxStats');
		earthActive = false;
	}else {
		for(var i = 0; i <= 10; i++) {
		tooltipArray[i] = $.parseHTML(
			'<img id="small" align="right" style="position:relative; right:8px; padding-left:10px;" src="' 
			+ image 
			+ '">'
			+ title
			+ '<br /><span class="price">'
			+ price
			+ '</span><br /><div class="effect">'
			+ effect
			+ '</div><div class="description" style="font-size:13px">'
			+ description
			+ '</div>'
			);
		}
			showItem('tooltipBox');
			$("#tooltipBox").empty();
			$("#tooltipBox").prepend(tooltipArray[0]);

			showItem('tooltipBoxLumberjack');
			$("#tooltipBoxLumberjack").empty();
			$("#tooltipBoxLumberjack").prepend(tooltipArray[1]);

			showItem('tooltipBoxPlantation');
			$("#tooltipBoxPlantation").empty();
			$("#tooltipBoxPlantation").prepend(tooltipArray[3]);

			showItem('tooltipBoxPlantationBuild');
			$("#tooltipBoxPlantationBuild").empty();
			$("#tooltipBoxPlantationBuild").prepend(tooltipArray[4]);

			showItem('tooltipBoxSawmill');
			$("#tooltipBoxSawmill").empty();
			$("#tooltipBoxSawmill").prepend(tooltipArray[5]);

			showItem('tooltipBoxStock');
			$("#tooltipBoxStock").empty();
			$("#tooltipBoxStock").prepend(tooltipArray[6]);

			showItem('tooltipBoxStockInfo');
			$("#tooltipBoxStockInfo").empty();
			$("#tooltipBoxStockInfo").prepend(tooltipArray[7]);

			showItem('tooltipBoxSettings');
			$("#tooltipBoxSettings").empty();
			$("#tooltipBoxSettings").prepend(tooltipArray[8]);

			showItem('tooltipBoxInfo');
			$("#tooltipBoxInfo").empty();
			$("#tooltipBoxInfo").append(tooltipArray[9]);

			showItem('tooltipBoxStats');
			$("#tooltipBoxStats").empty();
			$("#tooltipBoxStats").append(tooltipArray[10]);
	}
}

function correctPS(number) {
	if(number >= 0.01 && number <= 0.1) {
		number *= 100;
	}
	else if(number >= 0.1) {
		number *= 10;
	}

	return Math.abs(number);
}

setInterval(function check() {
	document.getElementById('howManyTrees').innerHTML = 'You have ' + Math.ceil(oakTileTrees) + ' oak trees and ' + Math.ceil(spruceTileTrees) + ' spruce trees';

	document.getElementById('oakTreeAmount').innerHTML = Math.ceil(oakTileTrees) + ' trees';
	document.getElementById('spruceTreeAmount').innerHTML = Math.ceil(spruceTileTrees) + ' trees';

	document.getElementById('sawmillPlanksPerSecond').innerHTML = '+' + sawmillPPS + ' Planks per second';
	document.getElementById('sawmillMoneyPerSecond').innerHTML = sawmillMPS + ' Money per second';
	document.getElementById('sawmillWoodPerSecond').innerHTML = sawmillWPS + ' Wood per second';

	changeToAxe(); // Updates the cursor
}, 100);