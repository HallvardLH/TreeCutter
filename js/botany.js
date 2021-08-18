/*=====================================================================================
                                    BOTANY
=======================================================================================*/
// var whichSeedBox;
// window.onresize = function(event) {
//   if(byId('botanySection').style.display != 'none') {
//     seedMenu(whichSeedBox); // Resizes the box to match window
//   }
// }

// var boxWidth = 0;
// var boxHeight = 50;
// var hasResources = 0;
// function seedMenu(box) {
//   boxWidth = 0;
//   boxHeight = 50;
//   whichSeedBox = box;
//   const elem = byId('mixBox' + box);
//   const rect = elem.getBoundingClientRect();
//   byId('seedBox').style.top = (rect.top + (elem.clientHeight + 5)) + 'px';
//   byId('seedBox').style.right = rect.right + 'px';
//   byId('seedBox').style.left = (rect.left) + 'px';

//   for(let i = 0; i < landType.length; i++) {
//     if(unlockedResources[i])  {
//       if(boxWidth < 185) {
//         boxWidth += 37;
//       }
//       hasResources++;
//     }
//   }
//   if(hasResources >= 5) {
//     boxHeight * 2;
//   }
//   byId('seedBox').style.width = boxWidth + 'px';
//   byId('seedBox').style.height = boxHeight + 'px';

//   $("#seedAnchor").empty();
//   var html = '<div>';
//   for(let i = 0; i < landType.length; i++) {
//     if(unlockedResources[i]) {
//       if(seedSlot1 != landType[i] || seedSlot2 != landType[i]) {
//         html += '<img class="treeSize" onclick="insertSeed(' + i + ',' + box + ')" src="images/Trees/' + landType[i] + 'Tree.png"/>';
//       }
//     }
//   }
//   html += '</div>';
//   if(html.length > 20) { // Prevents empty box from appearing
//     show('seedBox');
//   }

//   html = $.parseHTML(html);

//   $("#seedAnchor").append(html);
// }

// var seedSlot1 = 'empty';
// var seedSlot2 = 'empty';
// function insertSeed(whichSeed, whichBox) {
//   hide('seedBox');
//   whichSeed = resources[whichSeed];
//   if(whichBox == 1) {
//     seedSlot1 = whichSeed;
//   } else {
//     seedSlot2 = whichSeed;
//   }
//   byId('boxImg' + whichBox).src = 'images/Trees/' + whichSeed + 'Tree.png';

//   if(seedSlot1 != 'empty' && seedSlot2 != 'empty') {
//     pulsate('botanyBtn');
//   }
// }

// researchPrice = 100;
// function checkSeeds() {
//   if(seedSlot1 != 'empty' && seedSlot2 != 'empty' && createdSeed == 'none') {
//     if(money >=  researchPrice) {
//       money -= researchPrice;
//       researchPrice *= 1.0169;
//       researchPrice = Math.round(researchPrice);
//       byId('botanyBtn').innerHTML = 'Research!<br />$' + researchPrice;
//       if(seedSlot1 == 'oak' && seedSlot2 == 'oak') {
//         createNewSeed('spruce');
//       } else if(seedSlot1 == 'spruce' && seedSlot2 == 'oak' || seedSlot2 == 'spruce' && seedSlot1 == 'oak') {
//         createNewSeed('redwood');
//       } else {
//         messageDisplay('This combination has no effect. Try a different one!');
//       }
//     } else {
//       notEnough();
//     }
//   }else if(createdSeed != 'none' && seedSlot1 != 'empty'){ 
//     messageDisplay('You have already performed research and created a new seed. Pick it up.')
//   }else if(seedSlot1 != 'empty' || seedSlot2 != 'empty') { 
//     messageDisplay('You need two or more plants to do research.');
//   }else {
//     messageDisplay('You have not put in any seeds for research.');
//   }
// }

// var createdSeed = 'none';
// function createNewSeed(which) {
//     byId('boxImg3').src = 'images/Trees/' + which + 'Tree.png';
//     byId('mixBox3').onmouseover = function() {spawnTooltip(which + 'Tree')};
//     createdSeed = resources.indexOf(which);
//     pulsate('botanyBtn', '', true);
//     pulsate('mixBox3');
// }

// function takeSeed() {
//   if(createdSeed != 'none') {
//     byId('boxImg1').src = 'images/void.png';
//     byId('boxImg2').src = 'images/void.png';
//     byId('boxImg3').src = 'images/void.png';
//     byId('mixBox3').onmouseover = '';
//     tooltip(-1);
//     seedSlot1 = 'empty';
//     seedSlot2 = 'empty';
//     buyLand(createdSeed);
//     createdSeed = 'none';
//     hide('seedBox');
//     pulsate('mixBox3', '', true);
//   }
// }

// hoverEffect('botanyBtn', 'transform', 'scale(1.05)', 'scale(1)');
// hoverEffect('mixBox3', 'transform', 'scale(1.05)', 'scale(1)');