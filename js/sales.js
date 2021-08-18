/*=====================================================================================
                  SALES
=======================================================================================*/
var unlockedResources = [true, false, false, false, true];
var salesmen = 1;

var resourcesAmount = 0;
var availableResources = [];

var oakSalesmen = 0;
var plankSalesmen = 0;
var woodchipSalesmen = 0;

var salesMultiplier = 1;

var salesPrice = 1;
var salesmenAmount = 0;

function determineSales() {
    unlockedResources.forEach(countTrue);

    function countTrue(item, index) {
        if (item) {
            availableResources[resourcesAmount] = resources[index];
            resourcesAmount++;
        }
    }

    for (var i = 0; i < availableResources.length; i++) {
        sell(salesmen / resourcesAmount, true, availableResources[i]);
    }
    resourcesAmount = 0;
}


var oakRange = 0;
byId('oakRange').addEventListener("input", function() {
    oakRange = byId('oakRange').value;
    byId('oakAssignedDisplay').innerHTML = oakRange;
}, false);

var unassignedSales = 0;


var oakSales = 0;
var woodchipSales = 0;
var plankSales = 0;
var goldenWoodSales = 0;

function assignSalesmen(which) {
    switch (which) {
        case 'oak':
            oakSales = parseInt(byId('oakRange').value);
            unassignedSales -= parseInt(byId('oakRange').value);
            break;
        case 'woodchip':
            woodchipSales = parseInt(byId('woodchipRange').value);
            unassignedSales -= parseInt(byId('oakRange').value);
            break;
    }

    var x = document.getElementsByClassName('slider');
    for (var i = 0; i < x.length; i++) {
        x[i].max = unassignedSales;
    }
}
assignSalesmen();


function createSalesBox(num) {
    createMenuBox('Sell ' + resources[num], resources[num], resources[num] + num, '', '', '', '', 'salesmen assigned', resources[num] + 'Salesmen', '', ["assign(true,'" + resources[num] + "', 'sales')", "assign(false,'" + resources[num] + "', 'sales')"], 'salesAnchor', ['Assign', 'Remove'], 'landBoxBtn2');
}

function showSalesBoxes() {
    byId('salesAnchor').innerHTML = '';
    byId('salesMotherAnchor').innerHTML = '';
    createMenuBox('Hire salesman', 'salesman', '', '', 'salesmanPrice', 'price', '', '', '', '', ['buyBusiness(`salesman`)'], 'salesMotherAnchor', ['Purchase'], 'landBoxBtn1');
    for (var i = 0; i < resources.length; i++) {
        if (unlockedResources[i]) {
            createSalesBox(i);
        }
    }
}

function updateSalesmenNumbers() {
    //byId('salesmanPrice').style.fontSize = '24px';
    //byId('salesmanPrice').style.bottom = '18px';
    //byId('salesmanPrice').style.position = 'relative';
    byId('salesmanPrice').innerHTML = '<br />Price: $' + salesPrice;
    for (var i = 0; i < resources.length; i++) {
        if (unlockedResources[i]) {
            //byId(resources[i] + 'Salesmen').style.position = 'relative';
            //byId(resources[i] + 'Salesmen').style.botton = '18px';
            //byId(resources[i] + 'Salesmen').style.fontSize = '24px';
            byId(resources[i] + 'Salesmen').innerHTML = 'Assigned: ' + w(resources[i] + 'Salesmen');
        }
    }
}

var batchValues = [1, 1, 1, 1, 10];

function salesmenSell() {
    for (var i = 0; i < resources.length; i++) {
        if (w(resources[i] + 'Salesmen') > 0 && window[resources[i]] - (salesMultiplier * w(resources[i] + 'Salesmen')) >= 1) {
            window[resources[i]] -= salesMultiplier * w(resources[i] + 'Salesmen');
            money += w(resources[i] + 'Value') * w(resources[i] + 'Salesmen');
            moneyEarned += w(resources[i] + 'Value') * w(resources[i] + 'Salesmen');

        } else if (w(resources[i] + 'Salesmen') > 0 && window[resources[i]] - (salesMultiplier * w(resources[i] + 'Salesmen')) < 0) {
            money += w(resources[i] + 'Value') * window[resources[i]];
            moneyEarned += w(resources[i] + 'Value') * window[resources[i]];
            window[resources[i]] -= window[resources[i]];
        }
    }
}

setInterval(function() {
    salesmenSell();
}, 1000);