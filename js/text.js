/*=====================================================================================
									               TEXT STUFF
=======================================================================================*/
var messageId = 0;
var previousMessage;
var duplicates;

function messageDisplay(text, color) {
    var br = '<br />';
    if (text.length > 40 && color != 'custom') { // Giving some extra space to separate longer messages
        br = '<br />' + '<br />'
    }

    if (color == 'green') { // Nicer colors
        color = '#3dc62b; text-shadow: 0 0 3px green;';
    }
    if (color == 'red') {
        color = '#6d0000; text-shadow: 0 0 3px #FF0000;';
    }

    color = 'white';

    message = $.parseHTML('<div id="' + messageId + 'm" class="message" onclick="hide(this.id)"><font style="color:' + color + '">' + text + '</font></div>')

    if (text == previousMessage) {
        duplicates++;
        message = text + '<br />x' + (duplicates + 1);
        byId((messageId - 1) + 'm').innerHTML = message;
    } else {
        previousMessage = text;
        $("#messageSection").prepend(message);

        duplicates = 0;
        messageId++;
    }

}

function getCutVsGrownInfo(which) {
    if (which == 'image') {
        if (totalTreesCut > treesGrown) {
            return 'images/deadEarth.png'
        } else {
            return 'images/earth.png'
        }
    }
    if (which == 'stats') {
        if (totalTreesCut > treesGrown) {
            return '<font color="#e80000">\n\u2022 ' + totalTreesCut + ' trees cut<br />\n\u2022 ' + Math.floor(treesGrown) + ' trees grown</font>'
        } else {
            return '<font color="#11ad14">\n\u2022 ' + totalTreesCut + ' trees cut<br />\n\u2022 ' + Math.floor(treesGrown) + ' trees grown</font>'
        }
    }
    if (which == 'info') {
        if (totalTreesCut > treesGrown) {
            return 'You have cut more trees than you have planted. With this business practice, you are putting the world, and humanity with it, at risk. Your decision will probably have negative impacts on you, both morally and economically. Or not.'
        } else if (treesGrown != 0) {
            return 'You have planted more trees than you have cut. The world is a green and luxuriant place, partly thanks to you.'
        } else {
            return 'You have neither cut nor grown any trees. Better get to it!'
        }
    }
}

var earthActive = false;

function spawnTooltip(which, achievement) {
    switch (which) {
        case 'achievement':
            if (achievement != -1) {
                tooltip("images/" + achievementImages[achievement] + ".png", '<font style="color:white">' + achievementNames[achievement] + '</font>', '', '', '<font style="font-family:Tahoma">' + achievementTexts[achievement] + '</font>');
            } else {
                tooltip("images/info.png", 'Locked', '', '', '???');
            }
            break;

        case 'earth':
            tooltip("images/earth.png", 'Earth', 'Price: <font color="#11ad14">5,000,000,000,000,000$</font>', '+1,040,000,000,000 trees', 'A spherical plot of land containing about 1,04 trillion trees but mostly useless water.<br /><font color="#11ad14" id="Population">Population: ' + population + '</font>');
            earthActive = true;
            break;

        case 'cutVsGrown':
            tooltip(getCutVsGrownInfo('image'), 'Trees cut vs trees grown', getCutVsGrownInfo('stats'), '', getCutVsGrownInfo('info'));
            break;

        case 'spruceTile':
            tooltip("images/spruceTile.png", 'Spruce forest', '<font color="#11ad14">500$</font>', '+900 to 1100 trees', 'A patch of forest containing about 1000 trees.');
            break;

        case 'lumberjack':
            tooltip('images/lumberjack.png', 'Lumberjack', 'Unlock requirements:<br /> \n\u2022 Earn 100$', 'Unlock progress:<br /> \n\u2022 ' + twoDec(moneyEarned) + '$ earned', 'Lumberjacks cut trees for you.')
            break;

        case 'sales':
            tooltip('images/sales.png', 'Sales', 'Unlock requirements:<br /> \n\u2022 Earn 200$', 'Unlock progress:<br /> \n\u2022 ' + twoDec(moneyEarned) + '$ earned', 'Everything you need to distribute your product!')
            break;

        case 'plantation':
            tooltip('images/plantation.png', 'Plantation', 'You have:<br /> \n\u2022 ' + plantationAmount + ' plantations<br /> \n\u2022 ' + ((plantationAmount * 10) + (plantationBonus * plantationAmount)) + ' growing trees', '', 'Plantations allow you to grow trees. Each plantation contains a minimum of ten trees, a value which can be increased through upgrades.<hr /><i>Wast acres of land dedicated to growing the finest of trees.</i>')
            break;

        case 'sawmill':
            tooltip('images/sawmillShopIcon.png', 'Sawmill', 'Unlock requirements:<br /> \n\u2022 Sell 500 wood', 'Unlock progress:<br /> \n\u2022 ' + woodSold + ' wood sold', 'Old fashioned, but efficient. This water-powered sawmill will do just fine until you can afford better.')
            break;

        case 'money':
            tooltip('images/money.png', 'Money', '', '', "The stuff that gets you somewhere in life.");
            break;

        case 'oak':
            tooltip('images/oak.png', 'Oak wood', 'Value: <span class="oakValue"></span>', '', 'A strong type of wood with a wide range of use.')
            updateTooltipValue('oakValue');
            break;

        case 'goldenWood':
            tooltip('images/oak.png', 'Golden wood', 'Value: <span class="goldenWoodValue"></span>', '', 'Wood obtained from the rare golden tree. Sought after by anyone with enough wealth and respect for themselves.')
            updateTooltipValue('goldenWoodValue');
            break;

        case 'spruce':
            tooltip('images/spruce.png', 'Spruce wood', 'Value: <span class="spruceValue"></span>', '', 'A beautiful dark wood perfect for indoor buidling.')
            updateTooltipValue('spruceValue');
            break;

        case 'redwood':
            tooltip('images/redwood.png', 'Redwood', 'Value: <span class="redwoodValue"></span>', '', 'Huge, old logs from the mighty redwood. The wood has a deep crimson hue to it.')
            updateTooltipValue('redwoodValue');
            break;

        case 'woodchip':
            tooltip('images/woodchip.png', 'Woodchip', 'Value: <span class="woodchipValue"></span>', '', 'A secondary resource gained when cutting trees. Alone, a woodchip is not worth much, but they can be sold in large numbers for a range of uses.');
            updateTooltipValue('woodchipValue');
            break;

        case 'planks':
            tooltip('images/plank.png', 'Planks', 'Value: <span class="plankValue"></span>', '', 'Logs processed into sturdy planks.')
            updateTooltipValue('plankValue');
            break;

        case 'cookie':
            tooltip('images/cookie.png', 'Cookies', 'Value: <span class="cookieValue"></span>', '', 'Some say this delicious snack may one day be the dominant world currency.');
            updateTooltipValue('cookieValue');
            break;

        case 'ljChooseTile':
            tooltip('images/info.png', 'Lumberjack tile', '', '', 'The lumberjacks only cut one type of tree at a time. If there is no more of that type, they will simply stop until there is more or they are assigned to a new type of tree. To change type click this button and choose a plot of land.')
            break;

        case 'lumberjackSkillTree':
            tooltip('images/lumberjack.png', 'Skill tree', '', '', 'You have unlocked lumberjacks! Through achievements, you earn skill points with which you can unlock skills.')
            break;

        case 'lumberjackPS':
            tooltip('images/lumberjack.png', 'Stats', '', '<font color="green"">\n\u2022 +' + twoDec(lumberjackWPS) + ' Wood per second <br /></font><font color="red">\n\u2022 ' + twoDec(lumberjackMPS) + ' Money per second <br />\n\u2022 ' + threeDec(lumberjackTPS) + ' Trees per second</font>', '')
            break;

        case 'unassigned':
            tooltip('images/info.png', 'Unassigned personnel', '', '', 'These are unassigned personnel, they cost no money and do no work. They can be assigned and removed from any job.');
            break;

        case 'shopButton':
            tooltip('images/money.png', 'Shop', '', '', "This is the shop, it's where you buy upgrades. Items are unlocked as you progress.")
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
        case 'ljPause':
            tooltip('images/lumberjack.png', 'Pausing', '', '', "Making the lumberjacks stop working might be a good idea at times. As long as you have trees and money available, the lumberjacks will keep on  working. If you're trying to save money it will be better to keep them from working to cut down on expenses.")
            break;
        case 'ljBulk':
            tooltip('images/lumberjack.png', 'Bulk', '', '', 'Choose how many lumberjacks you will be hiring, adding or removing with each click.')
            break;
        case 'ljAddRemove':
            tooltip('images/lumberjack.png', 'Adding or removing', '', '', 'Adding a lumberjack to a plot of land makes him cut trees there. Removing him allows you to assign him elsewhere.')
            break;
        case 'sawmillOak':
            tooltip('images/oak.png', 'Oak wood', '', '\n\u2022 1 plank per batch', '')
            break;
        case 'sawmillSpruce':
            tooltip('images/spruce.png', 'Spruce wood', '', '\n\u2022 2 planks per batch', '')
            break;
        case 'sawmillRedwood':
            tooltip('images/redwood.png', 'Redwood', '', '\n\u2022 3 planks per batch', '')
            break;

        case 'plantationBuild':
            tooltip('images/plantation.png', 'Build plantation', '', '', 'For your plantation to grow trees, you first have to build it.')
            break;

        case 'oakTree':
            tooltip('images/Tree.png', 'Oak tree', '', '', 'Tree growth is random, therefore trees per second is displayed using the average past tree growth minus the amount of trees lumberjacks chop down per second.<hr /><i>The oak towers over you, its leaves rustling with the fleeting joy of summer. A lone acorn falls down and hits you in the head.</i>')
            break;
        case 'spruceTree':
            tooltip('images/info.png', 'Spruce tree', '', '', 'Spruce trees are solemn but sincere, often adorned with a layer of snow.')
            break;
        case 'redwoodTree':
            tooltip('images/Trees/redwoodTree.png', 'Redwood tree', '', '', "The tallest tree in the world, so tall in fact that it doesn't even fit on the screen.")
            break;

        case 'oakTile':
            tooltip('images/oakTile.png', 'Oak forest', '', '<span class="oakTreeAmount"></span>', "")
            break;

        case 'resourceSection':
            tooltip('images/info.png', 'Resources', '', '<font size="1px;">(Click to hide/show)</font>', "An overview of all the resources you have in stock. These can be used in building, or sold for profit.");
            break;
        case 'treeSection':
            tooltip('images/info.png', 'Trees', '', '<font size="1px;">(Click to hide/show)</font>', "An overview of all the trees you own. These can be cut down to collect their resources.");
            break;
        case 'businessSection':
            tooltip('images/info.png', 'Businesses', '', '<font size="1px;">(Click to hide/show)</font>', "An overview of all available businesses. Once you've met the requirements, simply click the business to unlock it.");
            break;

        case 'restart':
            tooltip('images/deadEarth.png', '<font color="blue;">Warning!</font>', '', '', '<font color="blue;">Restarting the game means your progress will be lost.</font>');
            break;
        case 'saveBtn':
            tooltip('images/info.png', 'Saving', '', '', 'Shortcut: ctrl + s');
            break;
        case 'opsPerClick':
            tooltip('images/info.png', 'Operations per click', '', '', 'Operations per click is the amount of operations each click does. This is relevant when buying or selling things, such as businesses. Click this button to cycle through the available values. <i>All</i> means every possible operations.<hr />The current amount of operations per click is displayed to the left.');
            break;
        case 'colorPicker':
            tooltip('images/info.png', 'Changing graph color', '', '', 'Click to change the color of the graph to any color you want!');
            break;
        case 'sell':
            tooltip('images/' + resourceType + '.png', 'Selling', '', 'Selected: ' + resourceType, 'Sell all or half of the chosen resource.<hr />Click a resource box below to choose a resource for selling.');
            break;

    }
}

function updateTooltipValue(which) {
    var x = document.getElementsByClassName(which);
    for (var i = 0; i < x.length; i++) {
        x[i].innerHTML = window[which] + '$';
    }
}

var xpos;
var ypos;

function findDocumentCoords(mouseEvent) { // Thanks to https://nerdparadise.com/programming/javascriptmouseposition !
    if (mouseEvent) {
        xpos = mouseEvent.pageX;
        ypos = mouseEvent.pageY;
    } else {
        xpos = window.event.x + document.body.scrollLeft - 2;
        ypos = window.event.y + document.body.scrollTop - 2;
    }
}
document.getElementsByTagName("BODY")[0].onmousemove = findDocumentCoords;

whichMenu = 0;

function tooltip(image, title, price, effect, description) {
    if (isNaN(image) == false && image > 0) { // Because upgrades all have the same layout
        object = whichObject(image)
        image = object.image;
        title = object.name;
        price = object.price + '$';
        effect = whichEffect(object.effect, 'info');
        description = object.info;
    }
    if (price == '') {
        price = '<section style="margin-top:-15px;"></section>';
    }
    if (effect == '') {
        //effect = '<section style="margin-top:-15px;"></section>';
    }
    if (image == -1) { // on mouseout, hide
        hide('tooltipBox');
        earthActive = false;
    } else {

        if (effect != '') {
            effectCode = '</span><hr /><div class="effect">'
        } else {
            effectCode = '</span><br /><div class="effect">'
        }
        if (price == '<section style="margin-top:-15px;"></section>') {
            effectCode = '</span><br /><div class="effect">'
        }

        tooltipStr = $.parseHTML(
            '<img id="small" align="right" style="position:relative; right:8px; padding-left:10px;" src="' +
            image +
            '"><b><font color="#bfbfbf">' +
            title +
            '</font></b><br /><span class="price">' +
            price +
            effectCode +
            effect +
            '</div><div class="description" style="font-size:13px"><hr>' +
            description +
            '</div>'
        );
        show('tooltipBox');
        $("#tooltipBox").empty();
        $("#tooltipBox").prepend(tooltipStr);
    }
}

setInterval(function() { // Updates tooltip position
    if (xpos < byId('sideBar').clientWidth) {
        byId('tooltipBox').style.left = (byId('sideBar').clientWidth + 10) + 'px';
    } else if (xpos > byId('topBar').clientWidth - byId('navSection').clientWidth) {

        byId('tooltipBox').style.left = ((byId('topBar').clientWidth - byId('navSection').clientWidth) - byId('tooltipBox').clientWidth - 18) + 'px';
    } else {
        byId('tooltipBox').style.left = (xpos + 20) + 'px';
    }
    if (ypos > byId('sideBar').clientHeight - byId('tooltipBox').clientHeight + 40) {
        byId('tooltipBox').style.top = (byId('sideBar').clientHeight - byId('tooltipBox').clientHeight - 8) + 'px';
    } else if (ypos < 60) {
        byId('tooltipBox').style.top = 5 + 'px';
    } else {
        byId('tooltipBox').style.top = (ypos - 50) + 'px';
    }
}, 10);

var cookie = 0;
var cookieOwned = false;
var cookieValue = 1000;