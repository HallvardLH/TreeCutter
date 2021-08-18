/*=====================================================================================
									STOCK MARKET
=======================================================================================*/
var stockAmount = 12; // The amount of stocks that will be generated (starts at 0, meaning 0 will generate one stock)

var whichStock;
var stockDisplayed = false;
var stockShowing = 0;

function switchGraph(num) {
    stockShowing = num;
    var stock = window['stock' + num];
    show('stockInfo');
    whichStock = num;
    stockDisplayed = true;

    $("#stockInfoAnchor").empty();

    message = $.parseHTML('<div class="stockBanner" onclick="switchGraph(' + num + ')"><div class="stockBannerHeader"><font size="3px";>' + stock.name + '</font></div><hr /><div class="stockBannerBtn"><button class="graphBtn" style="width:45%; margin-right:5px" onclick="buyStock(' + num + ')">Buy Stock</button><button class="graphBtn" style="width:45%; margin-left:5px;" onclick="sellStock(' + num + ')">Sell Stock</button></div><hr /><span class="amount stockText" style="bottom:8px;">Price: </span><span class="stockVal" id="stockPriceDisplay' + num + '">' + twoDec(stock.price) + '</span><hr />   <div><span class="stockText">Bought for: </span><span class="stockVal" id="boughtForDisplay">0</span></div><hr />   <div><span class="stockText">Value: </span><span class="stockVal" id="totalValueDisplay">$' + twoDec(stock.price * stock.owned) + '</span></div><hr />    <div><span class="stockText">Currently owned:</span><span class="stockVal" id="stocksOwnedDisplay">' + stock.owned + '</span></div><hr />   </div>'),

        $("#stockInfoAnchor").append(message);

    drawGraph(whichStock);
    byId('stockPriceDisplay' + whichStock).innerHTML = '$' + twoDec(stock.price);
}

function exitStock() {
    hide('stockInfo');
    stockDisplayed = false;
}

var period = 'week';
var stockGraphPeriod = 40;

function changePeriod(which) {
    stockGraphPeriod = which;
    drawGraph(whichStock);
}

colorPicker.addEventListener("change", watchColorPicker, false); // Detects change in the color picker
var graphColor = 'white';

function watchColorPicker(event) { // Changes the color accordingly
    graphColor = colorPicker.value;
    drawGraph(whichStock);
}
var myChart;

function drawGraph(num) {
    index = 0;
    var stockValues = window['stock' + num].historicPrice;

    var stockValues = stockValues.slice(stock0.historicPrice.length - stockGraphPeriod, stock0.historicPrice.length)

    var sorted = stockValues.slice().sort(function(a, b) {
        return a - b;
    });

    if (window.myChart != undefined) {
        window.myChart.destroy();
    }
    console.log(stockValues)
    var labels = [];
    for (var i = 0; i < stockValues.length; i++) {
        labels.push('');
    }
    var ctx = document.getElementById('stockCanvas').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: window['stock' + num].name,
                data: stockValues,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1,
                tension: 0.1,
                pointRadius: 0,
            }]
        },
        options: {
            animation: false,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });

    // OLD, MANUALLY MADE GRAPH CODE

    // var canvas = byId("stockCanvas");
    // var ctx = canvas.getContext("2d");
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // var smallest = sorted[0];
    // var largest = sorted[sorted.length - 1];
    // var height = 200;
    // var start = 2;
    // ctx.beginPath();
    // ctx.fillStyle = 'white';
    // ctx.strokeStyle = 'black';
    // ctx.moveTo(330, height);
    // ctx.lineTo(330, 0);
    // ctx.lineTo(start, 0);
    // ctx.lineTo(start, 200);
    // ctx.lineTo(330, 200);
    // ctx.moveTo(start, 200);

    // ctx.fillText(twoDec(largest), 340, 10);
    // ctx.fillText(twoDec(((largest - smallest) / 2) + smallest), 340, height / 2);
    // ctx.fillText(twoDec(smallest), 340, height);
    // ctx.stroke();

    // ctx.beginPath();
    // for (var i = 3; i < 331; i += 330 / stockValues.length) {
    //     ctx.lineTo(i, 200 - scale(stockValues[index], smallest, largest, 0, 200));
    //     ctx.stroke();
    //     ctx.strokeStyle = graphColor;
    //     index++;
    // }
}

function Stock() {
    this.owned = 0,
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
        this.id,
        this.idIter = 0,
        this.save = function() { saveStock(this.objectName) }
}

function saveStock(thing) {
    storage.removeItem(thing);
    storage.setItem(thing, JSON.stringify(window[thing]));
}

function saveStocks() {
    for (var it = 0; it <= stockAmount; it++) {
        window['stock' + it].save();
    }
}

var firstNames = ["Asgeir's", 'Big', "Jose's", "Amir's", 'E-Legal', "Mike Hunt", "Gabe Bolles", 'Mike Rotch', 'I. C. Weiner', 'I. P. Freely', 'Organic', 'American', "Emil's", 'Hardone', 'Peter File', 'Jack Mehoff', 'Heywood Jablome', 'Car', 'Animal', 'Weird', 'European', "Pat McGroin", "John's"];
var secondNames = [' Oil', ' Wood', ' Recycling', ' Irrigation', ' Mining', ' Toys', ' Cat Food', ' Engineering', ' Petrol', ' Cookies', ' Insulation', ' Paper', ' Games', ' Technologies', ' Computing', ' Woodworks', ' White Cars', ' Raw meat'];
var stockSuffixes = [' Ltd.', ' Inc.', ' Corp.', '', ' Holdings'];

stockGenerator();

function stockGenerator() {
    for (var i = 0; i <= stockAmount; i++) {
        if (storage.treesCutDown == undefined) { // Checks if it's the initial load
            window['stock' + i] = new Stock()
            var lastName = secondNames.splice(Math.floor(Math.random() * secondNames.length), 1)[0];
            window['stock' + i].name = firstNames.splice(Math.floor(Math.random() * firstNames.length), 1)[0] + lastName + stockSuffixes[Math.floor(Math.random() * stockSuffixes.length)];
            window['stock' + i].type = lastName;
            window['stock' + i].business = lastName;
            window['stock' + i].price = twoDec(Math.random() * 50);
            window['stock' + i].owned = 0;
            window['stock' + i].id = i;
            window['stock' + i].boughtFor = [];
            window['stock' + i].boughtForTotal = 0;

            var num = growthFactor = oneDec(Math.random() * 2);
            num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; // adds minus sign in 50% of cases
            window['stock' + i].growthFactor = num;

            window['stock' + i].direction = Math.round(Math.random() * 2);
            window['stock' + i].startingPrice = window['stock' + i].price;

            window['stock' + i].objectName = 'stock' + i;
        } else {
            window['stock' + i] = eval('JSON.parse(storage.getItem("stock' + i + '"))');
            window['stock' + i].save = function() { saveStock(this.objectName) };
        }
    }
}

function calculateStockGrowth(which, what) {
    var stock = window['stock' + which];

    if (stock.historicPrice[stock.historicPrice.length - stockGraphPeriod] - stock.historicPrice[stock.historicPrice.length - 1] < 0) { // Negative
        if (what == 'value') {
            return '+' + (((stock.historicPrice[stock.historicPrice.length - 1] - stock.historicPrice[stock.historicPrice.length - stockGraphPeriod]) / stock.historicPrice[stock.historicPrice.length - stockGraphPeriod]) * 100).toFixed(2)
        } else {
            return 'positive';
        }
    } else { // Positive
        if (what == 'value') {
            return '-' + (((stock.historicPrice[stock.historicPrice.length - stockGraphPeriod] - stock.historicPrice[stock.historicPrice.length - 1]) / stock.historicPrice[stock.historicPrice.length - stockGraphPeriod]) * 100).toFixed(2)
        } else {
            return 'negative';
        }

    }

}

createStockDiv();

function createStockDiv() {
    for (var i = 0; i <= stockAmount; i++) {
        message = $.parseHTML('<div class="section" id="stock' + i + '" onclick="switchGraph(' + i + ')"><font size="3px";>' + window['stock' + i].name + '</font><br /><img id="stockImage' + i + '" style="width:20px; height:20px;" src="images/neutral.png"/><span class="amount" id="stockPrice' + i + '" style="bottom:8px;">' + window['stock' + i].price + '$</span><span class="percent" id="stockPercentage' + i + '" style="bottom:8px;">' + calculateStockGrowth(i) + '%</span></div>'),

            $("#stockAnchor").append(message);
    }
}

var goodNews = [' prices soaring.', ' stock predicted to rise.', ' to be the next big trend claims social media influencer.', ' shown to alleviate stress.'];
var badNews = [' prices fall as high-ranking official is fired over social media scandal.', ' companies in trouble as civil war breaks out.', ' businesses impeded as new legislation is passed.', ' bad for the environment says scientist', ' shown to be major cause of illness.', ' shown to cause disease, according to recent study.'];
var unrelatedNews = ['"We do not give a f*ck anymore." says politician as Brexit is extended for the 23rd time.', 'Cookie Clicker banned in several countries due to widespread addiction.', '10 ways your boyfriend may be cheating on you', 'test test 1234 afdafagdbvbv is this working?', 'Pluto once again becomes a planet!', "Ninth planet has been discovered and it's nothing like what we expected!", 'International community outraged as reports confirm the king of Sweden has been farted on by the king of Norway. Another argument for the abolition of monarchies?', 'Queen Elizabeth II celebrates her 112th birthday. Calls Brexit "lame" in speech.', 'Factory workers demand to be payed less.', '10 reasons why farting ought to be outlawed!', 'Breaking news: there are no news!']


function changeStock() {
    for (var i = 0; i <= stockAmount; i++) { // Loop through all stocks
        var stock = window['stock' + i];
        if (stock.iterations == stock.period) { // Define new period
            random = Math.random();
            if (random <= 0.1) {
                createNews(stock.type + goodNews[Math.floor(Math.random() * goodNews.length)]);
                stock.direction = 'positive';
            }
            if (random > 0.1 && random <= 0.2) {
                createNews(stock.type + badNews[Math.floor(Math.random() * badNews.length)]);
                stock.direction = 'negative';
            }
            if (random > 0.2) {
                stock.direction = 'neutral';
            }
            if (stock.direction == 'positive' || stock.direction == 'negative') {
                stock.rangeMin = Math.random();
                stock.rangeMax = Math.random() * 2 + stock.rangeMin;
            } else {
                stock.rangeMin = Math.random();
                stock.rangeMax = Math.random() * 2 + stock.rangeMin;
            }
            stock.period = Math.floor(randomInt(1, 200)); // Number between 1 and 20
            if (Math.random() > 0.95) {
                stock.period = 200;
            }

            stock.iterations = 0;

        } else {
            random = Math.random();
            if (random <= 0.5) {
                var divideBy = 1;
            } else {
                var divideBy = 2;
            }
            value = Math.floor(Math.random() * ((stock.rangeMax - stock.rangeMin + 1)) + stock.rangeMin) / divideBy
            if (stock.direction == 'positive' || stock.price < Math.round(randomInt(1, 20))) {
                if (Math.random() < 0.7) {
                    stock.price += Math.random() * 0.01;
                } else {
                    stock.price -= Math.random() * 0.01;
                }
            } else if (stock.direction == 'negative') {
                if (Math.random() < 0.7) {
                    stock.price -= Math.random() * 0.01;
                } else {
                    stock.price += Math.random() * 0.01;
                }
            } else {
                if (Math.random() < 0.5) {
                    stock.price += Math.random() * 0.01;
                } else {
                    stock.price -= Math.random() * 0.01;
                }
            }
        }

        stock.iterations++;

        byId('stockPrice' + i).innerHTML = twoDec(window['stock' + i].price) + '$';

        // if(stock.historicPrice[stock.historicPrice.length-1] > stock.historicPrice[stock.historicPrice.length-2]) {
        // 	byId('stockImage' + i).src = "images/positive.png";
        // 	byId('stockPercentage' + i).innerHTML = '+' + twoDec(stock.historicPrice[stock.historicPrice.length-1] - stock.historicPrice[stock.historicPrice.length-2]);
        // } else if (stock.historicPrice[stock.historicPrice.length-1] < stock.historicPrice[stock.historicPrice.length-2]) {
        // 	byId('stockImage' + i).src = "images/negative.png";
        // 	byId('stockPercentage' + i).innerHTML = '-' + twoDec(stock.historicPrice[stock.historicPrice.length-2] - stock.historicPrice[stock.historicPrice.length-1]);
        // } else {
        // 	byId('stockImage' + i).src = "images/neutral.png";
        // 	byId('stockPercentage' + i).innerHTML = 0;
        // }

        byId('stockPercentage' + i).innerHTML = calculateStockGrowth(i, 'value') + '%';
        byId('stockImage' + i).src = "images/" + calculateStockGrowth(i, 'img') + ".png";

        window['stock' + i].percent = twoDec(((window['oldPrice' + i] - window['stock' + i].price) / window['oldPrice' + i]) * 100);


        // if(window['oldPrice' + i] < window['stock' + i].price) {
        // 	byId('stockPercentage' + i).innerHTML = '+' + Math.abs(window['stock' + i].percent) + '%';
        // }else if(window['oldPrice' + i] == window['stock' + i].price) {

        // } else {
        // 	byId('stockPercentage' + i).innerHTML = '-' + window['stock' + i].percent + '%';
        // }

        window['oldPrice' + i] = window['stock' + i].price;

        window['stock' + i].historicPrice[valueIter] = window['stock' + i].price;

    }
    valueIter++;
}

function createNews(news) {
    if (Math.random() < 0.5) {
        message = $.parseHTML('<div style="background:url(images/menuTexture2.png) repeat-x bottom; color:white;" class="section"><b>' + news + '</b></div>');
    } else if (Math.random() < 0.5) {
        message = $.parseHTML('<div class="section">' + news + '</div>');
    } else if (Math.random() < 0.9) {
        message = $.parseHTML('<div class="section"><i>' + news + '</i></div>');
    } else if (Math.random() < 0.569) {
        message = $.parseHTML('<div style="font-family:Comic Sans MS;" class="section">' + news + '</div>');
    } else {
        message = $.parseHTML('<div style="font-family:Papyrus;" class="section">' + news + '</div>');
    }

    $("#ecNews").prepend(message);
}

function createPortfolio(id) {
    stock = window['stock' + id]
    id = stock.idIter + 's' + id;
    if (byId(id) != undefined) {
        hide(id)
    }
    stock.idIter++;
    id = stock.idIter + 's' + stock.id;

    var str = document.createElement('div');
    str.setAttribute('id', id);
    str.setAttribute('onclick', 'switchGraph(' + stock.id + ')');
    str.setAttribute('class', 'portSection');
    str.innerHTML = stock.name + '<hr />Owned: ' + stock.owned;

    byId("portfolioAnchor").prepend(str);

    if (ownedStocks == 0) {
        show('noStocks');
    } else {
        hide('noStocks');
    }
}

var stocksBought = 0;
var stockSpent = 0;
var stockEarned = 0;
var ownedStocks = 0;
var boughtForTotal = 0;

function buyStock(which, free) {
    var stock = window['stock' + which];
    if (money >= stock.price || free) {
        stock.owned++;
        if (!free) {
            if (stock.price <= 10 && !awardedAchievements[22]) { awardAchievement(22) };
            if (stock.price >= 100 && !awardedAchievements[23]) { awardAchievement(23) };
            money -= stock.price;
            stock.boughtFor[stock.boughtFor.length] = stock.price;
            stockSpent -= stock.price;
            ownedStocks++;
            stocksBought++;
            byId('stocksOwnedDisplay').innerHTML = stock.owned;
            for (var i = 0; i < stock.boughtFor.length; i++) {
                stock.boughtForTotal += stock.boughtFor[i];
            }
            //byId('boughtForDisplay').innerHTML = twoDec(boughtForTotal);
        }
        createPortfolio(stock.id);
    } else {
        messageDisplay("You can't afford " + stock.name + " stock.")
    }
}

var stocksSold = 0;

function sellStock(which) {
    var stock = window['stock' + which];
    if (stock.owned > 0) {
        money += stock.price;
        moneyEarned += stock.price;
        stockEarned += stock.price;
        stock.owned--;
        stock.boughtFor.pop();
        ownedStocks--;
        stocksSold++;
        byId('stocksOwnedDisplay').innerHTML = stock.owned;
        for (var i = 0; i < stock.boughtFor.length; i++) {
            stock.boughtForTotal += stock.boughtFor[i];
        }
        //byId('boughtForDisplay').innerHTML = '$' + twoDec(boughtForTotal);
        if (stock.owned == 0) {
            hide(stock.idIter + 's' + stock.id)
            if (ownedStocks == 0) {
                show('noStocks');
            }
        } else {
            createPortfolio(stock.id);
        }
    } else {
        messageDisplay("You don't own any of this stock.");
    }
}

switchGraph(0);
setInterval(function() {
    byId('boughtForDisplay').innerHTML = '$' + twoDec(window['stock' + stockShowing].boughtForTotal);
}, 10);

valueIter = stock0.historicPrice.length;

// setInterval(function() {
// 	if(valueIter < 200) {
// 		changeStock();
// 	}
// }, 1000);

changeStock();
setInterval(function() {
    if (valueIter >= 200) {
        changeStock();
        if (Math.random() < 0.3) {
            createNews(unrelatedNews[Math.floor(Math.random() * unrelatedNews.length)]);
        }
    }

    if (stockDisplayed && whichStock != undefined) {
        switchGraph(whichStock);
        byId('stockPriceDisplay' + whichStock).innerHTML = 'Price: $' + twoDec(window['stock' + whichStock].price);
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