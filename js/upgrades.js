/*=====================================================================================
									 UPGRADES
=======================================================================================*/
//========= TREE =======
var treeUpgrade0 = {
    name: [
        'Stone axe',
        'Hatchet',
        'Battle axe',
        'Tomahawk',
        'Cleaving axe',
        'Medieval axe',
        'Felling axe',
        'Splitting maul',
        'Double-bladed axe',
        'Tactical axe',
        'Royal axe',
        'Futuristic axe',
        'Firefighter axe',
        'Golden axe'
    ],

    description: [
        "A rock attatched to a stick with a rope. You've got to start somewhere, I guess...",
        'A standard axe, its grip feels good in your hand.',
        'An axe rather unfit for chopping wood. Perfect for killing though.',
        'Small, lightwieght and perfect for a camping trip!',
        'Much like a hatchet, but heavier. Its weight allows for a heavy swing.',
        'You found this cool axe at the antique store.',
        'A heavy, wedge shaped axe used to split wood lengthways.',
        'Heavy like a felling axe, this axe is used to split wood into kindling for bonfires.',
        "Another one of those axes that you really shouldn't be cutting trees with. Looks pretty cool though.",
        "Axe used by the military and police to do all sorts of things, usually not chopping trees.",
        "An axe worthy of a king.", "An axe 200 years younger than you. How did you get ahold of this?",
        'Why would you cut wood with this?',
        "It's not really made out of gold, just sprayed with gold paint..."
    ],

    image: 'hatchet',
    price: 10,
    priceInc: 1.02,
    priceMin: 10,
    effect: '\n\u2022 +1 wood per tree.<br />\n\u2022 +10 woodchips per chop.',
    effectVar: ['baseWPT', 'baseCPH'],
    effectVal: [1, 10],
    effectTexts: 2,
    effectPrefix: ['', ''],
    effectSuffix: [' wood per tree.', ' chips per chop.'],
    id: 0,
    tier: 0
};
var treeUpgrades = 1;

//========= PLANTATION =======
var plantationUpgrade0 = {
    name: [
        'Better organizing',
        'Land enlargement',
        'Court ruling',
        'Corruption'
    ],

    description: [
        'Better organized plantations allow each plantation to grow 1 more tree.',
        'A contract that allows you to increase the size of each plantation by 10%',
        'After a lenghty court case, the judge rules in your favor and you are allowed to expand your plantations.',
        'You bribe a government official to increase the size of your plantations.'
    ],

    image: 'document',
    price: 10,
    priceInc: 1.02,
    priceMin: 100,
    effect: '\n\u2022 +1 tree for each plantation.',
    effectVar: ['plantationBonus'],
    effectVal: [1],
    effectTexts: 1,
    effectPrefix: [''],
    effectSuffix: [' extra trees.'],
    id: 0,
    tier: 0
};
var plantationUpgrades = 1;

//========= LUMBERJACK =======
var lumberjackUpgrade0 = {
    name: [
        'Coffee',
        'Cocaine supply',
        'Heroin supply'
    ],

    description: [
        'A nice cup of coffe to quicken your lumberjacks.',
        'You start to regularly administer cocaine to your lumberjacks in order to increase their work speed.',
        "The cocaine high just isn't enough. The lumberjacks start to shoot heroin up their arms to further increase their work speed."
    ],

    image: 'pills',
    price: 100,
    priceInc: 1.1,
    priceMin: 100,
    effect: '\n\u2022 Doubles production.',
    effectVar: ['lumberjackWPSMult', 'lumberjackMPSMult', 'lumberjackTPSMult'],
    effectVal: [1, 1, 1],
    effectTexts: 1,
    effectPrefix: ['Multiplier: '],
    effectSuffix: [''],
    id: 0,
    tier: 0
};
var lumberjackUpgrades = 1;


//========= SAWMILL =======
var sawmillUpgrade0 = {
    name: [
        'Better machinery',
        'How do you cut the sea in half? With a sea-saw'
    ],

    description: [
        'Better gears allow for faster saws.',
        "A horrible joke..."
    ],
    image: 'grayCog',
    price: 1000,
    priceInc: 1.03,
    priceMin: 1000,
    effect: '\n\u2022 10% speed increase.',
    effectVar: ['sawmillPercent'],
    effectVal: [0.1],
    effectTexts: 1,
    effectPrefix: ['Speed multiplier: '],
    effectSuffix: [''],
    id: 0,
    tier: 0
};
var sawmillUpgrades = 1;


function createUpgrades(menu) {
    byId('upgradeAnchor').innerHTML = '';
    for (var i = 0; i < window[menu + 'Upgrades']; i++) {
        var upgrade = window[menu + 'Upgrade' + i];
        var tier = upgrade.tier;
        if (money - upgrade.price >= 0) {
            var afford = 'color:#3dc62b; text-shadow: 0 0 3px green';
        } else {
            var afford = 'color:#fc4f49; text-shadow: 0 0 3px #FF0000';
        }
        var effectStr = '';
        for (var j = 0; j < upgrade.effectTexts; j++) {
            effectStr += '\n\u2022 ' + upgrade.effectPrefix[j] + oneDec(window[upgrade.effectVar[j]]) + upgrade.effectSuffix[j];
            if (j + 1 != upgrade.effectTexts) {
                effectStr += '<br />';
            }
        }

        if (upgrade.name[tier] == undefined) {
            var name = 'Upgrade ' + tier;
            var desc = '';
        } else {
            var name = upgrade.name[tier];
            var desc = '<hr /><div class="upgradeDesc">' + upgrade.description[tier] + '</div>';
        }
        createMenuBox('<font style="color:white; font-size:20px;">' + name + '</font>', upgrade.image, 'upgrade', '<font style="font-size:14px; position:relative; bottom:22px;">Level: ' + tier + '</font><br /><font style="font-size:25px; position:relative; bottom:12px;' + afford + ';">$' + upgrade.price + '</font><hr /><font style="color:#d98d0f;">' + upgrade.effect + '</font><hr />Current values:<br />' + effectStr, '', '', '', desc, 'upgradeDesc', '', ['buyUpgrade(`' + (menu + 'Upgrade' + upgrade.id) + '`, `' + menu + '`,' + upgrade.id + ')'], 'upgradeAnchor', ['Purchase'], 'landBoxBtn1', menu + 'Upgrade' + upgrade.id);
    }
}

async function buyUpgrade(id, menu, number) {
    upgrade = window[id];
    if (money - upgrade.price >= 0) {
        money -= upgrade.price;
        console.log(upgrade.priceInc)
        upgrade.price *= upgrade.priceInc;
        upgrade.price = Math.ceil(upgrade.price);
        upgrade.price += upgrade.priceMin;
        upgrade.tier++;
        createUpgrades(menu);
        determinePS(id);
    } else {
        if (Math.random() > 0.01) {
            messageDisplay('You need $' + twoDec(Math.abs(money - upgrade.price)) + ' more.');
        } else {
            messageDisplay("Clicking it over and over won't change the price...");
        }
    }
}

function determinePS(which) {
    upgrade = window[which];
    for (var i = 0; i < upgrade.effectVar.length; i++) {
        window[upgrade.effectVar[i]] += upgrade.effectVal[i];
    }
}