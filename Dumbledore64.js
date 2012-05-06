 /*        DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                 Version 2, December 2004

 Copyright (C) 2012 Brett Davis <bdavis1000@gmail.com>

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.

*/
/*
	Version 0.7.0 Changes(5/6/2012):
		-Bug fixes:
			-Removed sound effect for thunderstorm because it is repetitive
			-Made tree wizard's RootBlast move easier to see, especially in ice
			-Made tree wizard's RootBlast have better collisions, specifically the 'right' part of it
			-Fixed thunderstorm sound effect
			-Fixed bug where you could hit enemies with lightning at the top of the map
			-Got rid of underscores on global names
		-Balancing:
			-Reset global and personal high scores
			-Lowered points in fire level:
				-Regular enemies give 25 base
				-Spawner enemies give 10 base
			-Air spells redirect you when you hit the edge of the map
		-Additions:
			-New website is up: glassknuckle.com
			-Added global high score board
				-Submits when you hit 'back' from the high scores
				-Only works if popups are allowed
				-Saves top 5 score/name combos
				-Changes don't show up until you refresh
				-Cannot submit with buttons, must click
			-Encrypted high score info
			-High score submit button now only shows up when your score is greater than global score 5
			-Added different text for getting global score, and added rainbow effect to it
			-Added small player animation for when Zap Trap is in effect
			-Added right-facing 'on damage' sprite for the player
			-Added 3D Compatibility
			-Added Dark Element
				-Dark = Trap: Drop a death trap. Maximum of 7 on screen. Does +1 damage
				-Dark + Dark = DeathBound: Charge for 1 second and release a wave of Spike Traps around your location. Does +1 damage
				-Dark + Fire = Flame Trap: Drop a fire trap. Max of 5 on screen. Does +1 damage and creates a +1 damage explosion
				-Dark + Ice = Ice Trap: Drop an ice trap. Max of 5 on screen. Freezes enemy for 3 seconds
				-Dark + Earth = Moonlight: Fully heals player, but reduces vision for 5 seconds. 12 second recharge
				-Dark + Lightning = Static Field: Drop a static field. Max of 2 on screen. When hit it releases a static field that can chain up to 5 times
									All static fields deal +1 extra damage
				-Dark + Air = Boosters: Drop a booster. Max of 5 on screen. Apply Dash effect to you when you walk over them.
				-Dark + Mystic = Piercing Shots: Passively icreases your damage output. Casting the spell teleports you.
				-Dark + Water = Shadow Cloak/Shield Charge: Applies a Shadow Cloak around you. Blocks 1 damage. 
								Cast again to do a Shield Charge, increasing the shield's health. Can have a max of 3 health. 
								Damages enemies on contact but loses 1 hp. Casting time of shield charge increases based on its hp.
	TODO:
		+Bugs/Other
			-High Priority:
			-Maybe issues:
				-obs always take 1 dmg, maybe an issue?
				-casting bars appear on top of everything, maybe issue?
			-Issues for later stuff:
				-Make multiples of sound effects so that hitting a bunch of people wont clip it (pierce through shots etc)
			-Current issues:
				-Ice spells make jungle trees transparent *Don't know how to fix yet*
			-Backlog:
				-Add globbly exploding on hitting you etc
				-Improve globbly and meteor explosion effects
				-Air in enemy ice is weird
		-Optimize
			-Arrays
		-Map System
		-Spells
			-Summon (?)
				-Minions
		-More enemies and AI **NOTE: ADD ALL MOVING ENEMIES TO ICELIGHTNING ARRAY**
			-Bosses:
				-Swamp boss?
				-Boss that uses stolen spells?
		-Terrain
			-Swamp level, has boardwalks and lots of water that slows you if you go in it
				-Crocodiles appear in water if you stay still
				-Flying enemy who has no speed changes
				-After Jungle?
				-Slightly haunted? Bats?
			-Each level has its own element drops and enemies
				Forest = Earth(rare), Water, Air?
*/
//----------------------------------- Setup -----------------------------------------------------------------------------------------//
// Canvas, Frames per Second, KeysDown, Global vars
var canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 576;
canvas.tabIndex = 1;
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");
var cX = new Number();
var cY = new Number();
var hX = new Number();
var hY = new Number();
var STATE = 0;
//Pause menu
var preSTATE = 0;
var keytimer = 0;
var nu = 0;
var hs = 0;
// Mouse listeners
canvas.addEventListener("mousedown", getPosition, false);
canvas.addEventListener("mousemove", getPositionhover, false);
var FPS = 30;
var keysDown = {};
var cd = 0;
var hptimer = 0;
var spell1 = "N/A";
var spell2 = "N/A";
var spell = "N/A";
var spell1pic = "N/A";
var spell2pic = "N/A";
//Score
var score = 0;
var muliplier = 1;
var multtimer = 0;
//colors
var colorz = {1: "#D0D0D0", 2: "#CC0000", 3: "#00FFFF", 4: "yellow", 5: "#33FF00", 6: "#663399"};
var colorNum = 1;
// Key Listeners
addEventListener("keydown", function (e) {keysDown[e.keyCode] = true;
											if(e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 8 || e.keyCode == 32 || e.keyCode == 13){
												e.preventDefault();}}, false);
addEventListener("keyup", function (e) {delete keysDown[e.keyCode];}, false);
// Environment
var planted = false;
var jungleAni = false;
// Alpha
var Alpha = 1;
//StateTimer: for staying in levels with no boss
var StateTimer = 0;
//End of game pause
var deathTimer = -1;
//------------------------------------------------------- Graphics ------------------------------------------------------------------//
//Girraffix
var WizzurdL = new Image();
WizzurdL.src = "grafix/wizzurds/wizard/wiz.l.png";
var WizzurdR = new Image();
WizzurdR.src = "grafix/wizzurds/wizard/wiz.r.png";
//Wizard Zap Trap
var WizzurdElecL1 = new Image();
WizzurdElecL1.src = "grafix/wizzurds/effects.wizard/wizzurd32.elec.l1.png";
var WizzurdElecL2 = new Image();
WizzurdElecL2.src = "grafix/wizzurds/effects.wizard/wizzurd32.elec.l2.png";
var WizzurdElecL3 = new Image();
WizzurdElecL3.src = "grafix/wizzurds/effects.wizard/wizzurd32.elec.l3.png";
var WizzurdElecL4 = new Image();
WizzurdElecL4.src = "grafix/wizzurds/effects.wizard/wizzurd32.elec.l4.png";
var WizzurdElecL5 = new Image();
WizzurdElecL5.src = "grafix/wizzurds/effects.wizard/wizzurd32.elec.l5.png";
var ZapTrapL = {1: WizzurdElecL1, 2: WizzurdElecL2, 3: WizzurdElecL3, 4: WizzurdElecL4, 5: WizzurdElecL5}; 
var WizzurdElecR1 = new Image();
WizzurdElecR1.src = "grafix/wizzurds/effects.wizard/wizzurd32.elec.r1.png";
var WizzurdElecR2 = new Image();
WizzurdElecR2.src = "grafix/wizzurds/effects.wizard/wizzurd32.elec.r2.png";
var WizzurdElecR3 = new Image();
WizzurdElecR3.src = "grafix/wizzurds/effects.wizard/wizzurd32.elec.r3.png";
var WizzurdElecR4 = new Image();
WizzurdElecR4.src = "grafix/wizzurds/effects.wizard/wizzurd32.elec.r4.png";
var WizzurdElecR5 = new Image();
WizzurdElecR5.src = "grafix/wizzurds/effects.wizard/wizzurd32.elec.r5.png";
var ZapTrapR = {1: WizzurdElecR1, 2: WizzurdElecR2, 3: WizzurdElecR3, 4: WizzurdElecR4, 5: WizzurdElecR5}; 
//Ondmg
var Wizzurd2 = new Image();
Wizzurd2.src = "grafix/wizzurds/effects.wizard/nega.wiz.l1.png";
var Wizzurd2R = new Image();
Wizzurd2R.src = "grafix/wizzurds/effects.wizard/nega.wiz.r1.png";
//menu
var menuBack = new Image();
menuBack.src = "grafix/menu/menu.png";
var Title = new Image();
Title.src = "grafix/menu/title.png";
var textmenu = new Image();
textmenu.src = "grafix/menu/mainmenu/text.png";
var creditsmenu = new Image();
creditsmenu.src = "grafix/menu/mainmenu/bkgblur.credits.png";
var helpmenu = new Image();
helpmenu.src = "grafix/menu/mainmenu/bkgblur.help.png";
var newgamemenu = new Image();
newgamemenu.src = "grafix/menu/mainmenu/bkgblur.newgame.png";
var noselectmenu = new Image();
noselectmenu.src = "grafix/menu/mainmenu/bkgblur.noneselect.png";
var optionsmenu = new Image();
optionsmenu.src = "grafix/menu/mainmenu/bkgblur.options.png";
var scoremenu = new Image();
scoremenu.src = "grafix/menu/mainmenu/bkgblur.score.png";
//Environment
var Tree = new Image();
Tree.src = "grafix/objects/tree/health.3.png";
var Tree2 = new Image();
Tree2.src = "grafix/objects/tree/health.2.png";
var Tree3 = new Image();
Tree3.src = "grafix/objects/tree/health.1.png";
var backGround1 = new Image();
backGround1.src = "grafix/background/grass1.png";
var backGround2 = new Image();
backGround2.src = "grafix/background/jungle1.png";
var backGround3 = new Image();
backGround3.src = "grafix/background/fire1.png";
//Jungle
var Jtree1 = new Image();
Jtree1.src = "grafix/objects/jungle.tree/sprout1.png";
var Jtree2 = new Image();
Jtree2.src = "grafix/objects/jungle.tree/grow1.png";
var Jtree3 = new Image();
Jtree3.src = "grafix/objects/jungle.tree/grow2.png";
var Jtree4 = new Image();
Jtree4.src = "grafix/objects/jungle.tree/grow3.png";
var Jtree5 = new Image();
Jtree5.src = "grafix/objects/jungle.tree/grow4.png";
var Jtree6 = new Image();
Jtree6.src = "grafix/objects/jungle.tree/grow5.png";
var Jtree7 = new Image();
Jtree7.src = "grafix/objects/jungle.tree/trunk.png";
var JungleTrees = {0: Jtree1, 1: Jtree2, 2: Jtree3, 3: Jtree4, 4: Jtree5, 5: Jtree6, 6: Jtree7}; 
var jungleIndex = 0;
//Lavaman
var Lavamanpic = new Image();
Lavamanpic.src = "grafix/creatures/firesprite/firesprite.l1.png";
//Tenemy
var Globbly = new Image();
Globbly.src = "grafix/creatures/globbly/globbly.r1.png";
var Globbly2 = new Image();
Globbly2.src = "grafix/creatures/globbly/globbly.r2.png";
var Globbly3 = new Image();
Globbly3.src = "grafix/creatures/globbly/globbly.r3.png";
var Globbly4 = new Image();
Globbly4.src = "grafix/creatures/globbly/globbly.r4.png";
var Globbly5 = new Image();
Globbly5.src = "grafix/creatures/globbly/globbly.r5.png";
var Globbly6 = new Image();
Globbly6.src = "grafix/creatures/globbly/globbly.r6.png";
var Globbly7 = new Image();
Globbly7.src = "grafix/creatures/globbly/globbly.r7.png";
var Globbly8 = new Image();
Globbly8.src = "grafix/creatures/globbly/globbly.r8.png";
var Globblys = {1: Globbly, 2: Globbly2, 3: Globbly3, 4: Globbly4, 5: Globbly5, 6: Globbly6, 7: Globbly7, 8: Globbly8};
//Hudge
var HudgeL = new Image();
HudgeL.src = "grafix/creatures/hudge/hudge.l1.png";
var HudgeR = new Image();
HudgeR.src = "grafix/creatures/hudge/hudge.r1.png";
//Enemy2
var Pikkit = new Image();
Pikkit.src = "grafix/creatures/pikkit/pikkit.l1.png";
var humpDumpr1 = new Image();
humpDumpr1.src = "grafix/creatures/humpdump/humpdump.r1.png";
var humpDumpr2 = new Image();
humpDumpr2.src = "grafix/creatures/humpdump/humpdump.r2.png";
var humpDumpr3 = new Image();
humpDumpr3.src = "grafix/creatures/humpdump/humpdump.r3.png";
var humpDumpl1 = new Image();
humpDumpl1.src = "grafix/creatures/humpdump/humpdump.l1.png";
var humpDumpl2 = new Image();
humpDumpl2.src = "grafix/creatures/humpdump/humpdump.l2.png";
var humpDumpl3 = new Image();
humpDumpl3.src = "grafix/creatures/humpdump/humpdump.l3.png";
var humprList = {1: humpDumpr1, 2: humpDumpr2, 3: humpDumpr3};
var humplList = {1: humpDumpl1, 2: humpDumpl2, 3: humpDumpl3};
var humpDumpd1 = new Image();
humpDumpd1.src = "grafix/creatures/humpdump/humpdump.d1.png";
var humpDumpd2 = new Image();
humpDumpd2.src = "grafix/creatures/humpdump/humpdump.d2.png";
var humpdList = {1: humpDumpd1, 2: humpDumpd2};
//Thief
var thiefPeek = new Image();
thiefPeek.src = "grafix/creatures/sneak/peek.png";
var thiefSneak = new Image();
thiefSneak.src = "grafix/creatures/sneak/hidden.l1.png";
var thiefVis = new Image();
thiefVis.src = "grafix/creatures/sneak/visible.l1.png";
var Thieves = {1: thiefPeek, 2: thiefSneak, 3: thiefVis};
//Spawner
var Splavaman = new Image();
Splavaman.src = "grafix/creatures/lavaman/lavaman.l1.png";
//Evil Wizzurd
var Sorcerorpng = new Image();
Sorcerorpng.src = "grafix/wizzurds/poison.wizard/poison.wiz.l1.png";
//Tree Wizzurd
var TWizzurd = new Image();
TWizzurd.src = "grafix/wizzurds/tree.wizard/tree.wiz.l1.png";
var TWizzurd2 = new Image();
TWizzurd2.src = "grafix/wizzurds/tree.wizard/tree.wiz.l2.png";
var TWizzurd3 = new Image();
TWizzurd3.src = "grafix/wizzurds/tree.wizard/tree.wiz.l3.png";
var TWizzurd4 = new Image();
TWizzurd4.src = "grafix/wizzurds/tree.wizard/tree.wiz.l4.png";
var TWizzurd5 = new Image();
TWizzurd5.src = "grafix/wizzurds/tree.wizard/tree.wiz.l5.png";
var TWizzurd6 = new Image();
TWizzurd6.src = "grafix/wizzurds/tree.wizard/tree.wiz.l6.png";
var TWizzurd7 = new Image();
TWizzurd7.src = "grafix/wizzurds/tree.wizard/tree.wiz.l7.png";
var TWizzurd8 = new Image();
TWizzurd8.src = "grafix/wizzurds/tree.wizard/tree.wiz.l8.png";
var Treewizzez = {1: TWizzurd, 2: TWizzurd2, 3: TWizzurd3, 4: TWizzurd4, 5: TWizzurd5, 6: TWizzurd6, 7: TWizzurd7, 8: TWizzurd8};
//Fire Demon Boss
var FbossIdle = new Image();
FbossIdle.src = "grafix/creatures/dearyrocks/drocks.idle.png";
var FbossTotemU = new Image();
FbossTotemU.src = "grafix/creatures/dearyrocks/tote.u.png";
var FbossTotemD = new Image();
FbossTotemD.src = "grafix/creatures/dearyrocks/tote.d.png";
//Monochrome Wizzurd
var MonoWizzurd = new Image();
MonoWizzurd.src = "grafix/wizzurds/effects.wizard/bw.wiz.l1.png";
//Fire powerup
var Firebox = new Image();
Firebox.src = "grafix/powers/fire/fire1.png";
var Firebox2 = new Image();
Firebox2.src = "grafix/powers/fire/fire2.png";
var Firebox3 = new Image();
Firebox3.src = "grafix/powers/fire/fire3.png";
var Firebox4 = new Image();
Firebox4.src = "grafix/powers/fire/fire4.png";
var Firebox5 = new Image();
Firebox5.src = "grafix/powers/fire/fire5.png";
var Fires = {1: Firebox, 2: Firebox2, 3: Firebox3, 4: Firebox4, 5: Firebox5};
//Ice powerup
var Icebox = new Image();
Icebox.src = "grafix/powers/ice/ice1.png";
var Icebox2 = new Image();
Icebox2.src = "grafix/powers/ice/ice2.png";
var Icebox3 = new Image();
Icebox3.src = "grafix/powers/ice/ice3.png";
var Icebox4 = new Image();
Icebox4.src = "grafix/powers/ice/ice4.png";
var Icebox5 = new Image();
Icebox5.src = "grafix/powers/ice/ice5.png";
var Ices = {1: Icebox, 2: Icebox2, 3: Icebox3, 4: Icebox4, 5: Icebox5};
//Earth powerup
var Earthbox = new Image();
Earthbox.src = "grafix/powers/earth/earth1.png";
var Earthbox2 = new Image();
Earthbox2.src = "grafix/powers/earth/earth2.png";
var Earthbox3 = new Image();
Earthbox3.src = "grafix/powers/earth/earth3.png";
var Earthbox4 = new Image();
Earthbox4.src = "grafix/powers/earth/earth4.png";
var Earthbox5 = new Image();
Earthbox5.src = "grafix/powers/earth/earth5.png";
var Earths = {1: Earthbox, 2: Earthbox2, 3: Earthbox3, 4: Earthbox4, 5: Earthbox5};
//lightning powerup
var Thunderbox = new Image();
Thunderbox.src = "grafix/powers/zap/zap1.png";
var Thunderbox2 = new Image();
Thunderbox2.src = "grafix/powers/zap/zap2.png";
var Thunderbox3 = new Image();
Thunderbox3.src = "grafix/powers/zap/zap3.png";
var Thunderbox4 = new Image();
Thunderbox4.src = "grafix/powers/zap/zap4.png";
var Thunderbox5 = new Image();
Thunderbox5.src = "grafix/powers/zap/zap5.png";
var Thunders = {1: Thunderbox, 2: Thunderbox2, 3: Thunderbox3, 4: Thunderbox4, 5: Thunderbox5};
//Air powerup
var Windbox = new Image();
Windbox.src = "grafix/powers/air/air1.png";
var Windbox2 = new Image();
Windbox2.src = "grafix/powers/air/air2.png";
var Windbox3 = new Image();
Windbox3.src = "grafix/powers/air/air3.png";
var Windbox4 = new Image();
Windbox4.src = "grafix/powers/air/air4.png";
var Windbox5 = new Image();
Windbox5.src = "grafix/powers/air/air5.png";
var Winds = {1: Windbox, 2: Windbox2, 3: Windbox3, 4: Windbox4, 5: Windbox5};
//Mystic powerup
var Mysticbox = new Image();
Mysticbox.src = "grafix/powers/mystic/mystic1.png";
var Mysticbox2 = new Image();
Mysticbox2.src = "grafix/powers/mystic/mystic2.png";
var Mysticbox3 = new Image();
Mysticbox3.src = "grafix/powers/mystic/mystic3.png";
var Mysticbox4 = new Image();
Mysticbox4.src = "grafix/powers/mystic/mystic4.png";
var Mysticbox5 = new Image();
Mysticbox5.src = "grafix/powers/mystic/mystic5.png";
var Mystics = {1: Mysticbox, 2: Mysticbox2, 3: Mysticbox3, 4: Mysticbox4, 5: Mysticbox5};
//Water powerup
var Waterbox = new Image();
Waterbox.src = "grafix/powers/water/water1.png";
var Waterbox2 = new Image();
Waterbox2.src = "grafix/powers/water/water2.png";
var Waterbox3 = new Image();
Waterbox3.src = "grafix/powers/water/water3.png";
var Waterbox4 = new Image();
Waterbox4.src = "grafix/powers/water/water4.png";
var Waterbox5 = new Image();
Waterbox5.src = "grafix/powers/water/water5.png";
var Waters = {1: Waterbox, 2: Waterbox2, 3: Waterbox3, 4: Waterbox4, 5: Waterbox5};
//Dark powerup
var Darkbox = new Image();
Darkbox.src = "grafix/powers/dark/dark1.png";
var Darkbox2 = new Image();
Darkbox2.src = "grafix/powers/dark/dark2.png";
var Darkbox3 = new Image();
Darkbox3.src = "grafix/powers/dark/dark3.png";
var Darkbox4 = new Image();
Darkbox4.src = "grafix/powers/dark/dark4.png";
var Darkbox5 = new Image();
Darkbox5.src = "grafix/powers/dark/dark5.png";
var Darks = {1: Darkbox, 2: Darkbox2, 3: Darkbox3, 4: Darkbox4, 5: Darkbox5};
//Hp up
var maxUP = new Image();
maxUP.src = "grafix/powers/heartup/treeheart.png";
var DragonmaxUP = new Image();
DragonmaxUP.src = "grafix/powers/heartup/redheart.png";
// Particle
var particle1 = new Image();
particle1.src = "grafix/effects/hpup/hpup1.png";
var particle2 = new Image();
particle2.src = "grafix/effects/hpup/hpup2.png";
var particle3 = new Image();
particle3.src = "grafix/effects/hpup/hpup3.png";
var particle4 = new Image();
particle4.src = "grafix/effects/hpup/hpup4.png";
var particle5 = new Image();
particle5.src = "grafix/effects/hpup/hpup5.png";
var particle6 = new Image();
particle6.src = "grafix/effects/hpup/hpup6.png";
var particle7 = new Image();
particle7.src = "grafix/effects/hpup/hpup7.png";
var particle8 = new Image();
particle8.src = "grafix/effects/hpup/hpup8.png";
var colorParticles = {1: particle1, 2: particle2, 3: particle3, 4: particle4, 5: particle5, 6: particle6, 7: particle7, 8: particle8};
//Bubble
var Bubble = new Image();
Bubble.src = "grafix/effects/bubble/bubble.png";
var FireBubble = new Image();
FireBubble.src = "grafix/effects/bubble/firebubble.1.png";
var FireBubble2 = new Image();
FireBubble2.src = "grafix/effects/bubble/firebubble.2.png";
var IceBubble = new Image();
IceBubble.src = "grafix/effects/bubble/icebubble.1.png";
var IceBubble2 = new Image();
IceBubble2.src = "grafix/effects/bubble/icebubble.2.png";
var IceBubble3 = new Image();
IceBubble3.src = "grafix/effects/bubble/icebubble.3.png";
var iceBpics = {0: IceBubble, 1: IceBubble2, 2: IceBubble3};
var MysticBubble = new Image();
MysticBubble.src = "grafix/effects/bubble/mysticbubble.1.png";
var MysticBubble2 = new Image();
MysticBubble2.src = "grafix/effects/bubble/mysticbubble.2.png";
//Meteor
var MeteorF0 = new Image();
MeteorF0.src = "grafix/effects/meteor/meteor.fire0.png";
var MeteorF15d = new Image();
MeteorF15d.src = "grafix/effects/meteor/meteor.fire15d.png";
var MeteorF15u = new Image();
MeteorF15u.src = "grafix/effects/meteor/meteor.fire15u.png";
var MeteorF30d = new Image();
MeteorF30d.src = "grafix/effects/meteor/meteor.fire30d.png";
var MeteorF30u = new Image();
MeteorF30u.src = "grafix/effects/meteor/meteor.fire30u.png";
var MeteorF45d = new Image();
MeteorF45d.src = "grafix/effects/meteor/meteor.fire45d.png";
var MeteorF45u = new Image();
MeteorF45u.src = "grafix/effects/meteor/meteor.fire45u.png";
var BigMeteorF0 = new Image();
BigMeteorF0.src = "grafix/effects/meteor/meteor.fire0.big.png";
var BigMeteorF15d = new Image();
BigMeteorF15d.src = "grafix/effects/meteor/meteor.fire15d.big.png";
var BigMeteorF15u = new Image();
BigMeteorF15u.src = "grafix/effects/meteor/meteor.fire15u.big.png";
var BigMeteorF30d = new Image();
BigMeteorF30d.src = "grafix/effects/meteor/meteor.fire30d.big.png";
var BigMeteorF30u = new Image();
BigMeteorF30u.src = "grafix/effects/meteor/meteor.fire30u.big.png";
var BigMeteorF45d = new Image();
BigMeteorF45d.src = "grafix/effects/meteor/meteor.fire45d.big.png";
var BigMeteorF45u = new Image();
BigMeteorF45u.src = "grafix/effects/meteor/meteor.fire45u.big.png";
//Meteor env
var Meteorcold = new Image();
Meteorcold.src = "grafix/objects/hot.rock/glow.01.png";
var Meteorcold2 = new Image();
Meteorcold2.src = "grafix/objects/hot.rock/glow.02.png";
var Meteorcold3 = new Image();
Meteorcold3.src = "grafix/objects/hot.rock/glow.03.png";
var Meteorcold4 = new Image();
Meteorcold4.src = "grafix/objects/hot.rock/glow.04.png";
var Meteorcold5 = new Image();
Meteorcold5.src = "grafix/objects/hot.rock/glow.05.png";
var Meteorcold6 = new Image();
Meteorcold6.src = "grafix/objects/hot.rock/glow.06.png";
var Meteorcold7 = new Image();
Meteorcold7.src = "grafix/objects/hot.rock/glow.07.png";
var Meteorcold8 = new Image();
Meteorcold8.src = "grafix/objects/hot.rock/glow.08.png";
var Meteorcold9 = new Image();
Meteorcold9.src = "grafix/objects/hot.rock/glow.09.png";
var Meteorcold10 = new Image();
Meteorcold10.src = "grafix/objects/hot.rock/glow.10.png";
var Meteorcold11 = new Image();
Meteorcold11.src = "grafix/objects/hot.rock/glow.11.png";
var Meteorcold12 = new Image();
Meteorcold12.src = "grafix/objects/hot.rock/glow.12.png";
var Meteorcold13 = new Image();
Meteorcold13.src = "grafix/objects/hot.rock/glow.13.png";
var Meteorcold14 = new Image();
Meteorcold14.src = "grafix/objects/hot.rock/glow.14.png";
var Meteorcold15 = new Image();
Meteorcold15.src = "grafix/objects/hot.rock/glow.15.png";
var Meteorcold16 = new Image();
Meteorcold16.src = "grafix/objects/hot.rock/glow.16.png";
var Meteorcold17 = new Image();
Meteorcold17.src = "grafix/objects/hot.rock/glow.17.png";
var Meteorcold18 = new Image();
Meteorcold18.src = "grafix/objects/hot.rock/glow.18.png";
var Meteorcold19 = new Image();
Meteorcold19.src = "grafix/objects/hot.rock/glow.19.png";
var Meteorcold20 = new Image();
Meteorcold20.src = "grafix/objects/hot.rock/glow.20.png";
var Meteorcold21 = new Image();
Meteorcold21.src = "grafix/objects/hot.rock/glow.21.png";
var Meteorcold22 = new Image();
Meteorcold22.src = "grafix/objects/hot.rock/glow.22.png";
var Meteorcold23 = new Image();
Meteorcold23.src = "grafix/objects/hot.rock/glow.23.png";
var Meteorcold24 = new Image();
Meteorcold24.src = "grafix/objects/hot.rock/glow.24.png";
var Meteorcold25 = new Image();
Meteorcold25.src = "grafix/objects/hot.rock/glow.25.png";
var Meteorcold26 = new Image();
Meteorcold26.src = "grafix/objects/hot.rock/glow.26.png";
var Meteorcold27 = new Image();
Meteorcold27.src = "grafix/objects/hot.rock/glow.27.png";
var Meteorcold28 = new Image();
Meteorcold28.src = "grafix/objects/hot.rock/glow.28.png";
var Meteorcold29 = new Image();
Meteorcold29.src = "grafix/objects/hot.rock/glow.29.png";
var Meteorcold30 = new Image();
Meteorcold30.src = "grafix/objects/hot.rock/glow.30.png";
var Meteorcold31 = new Image();
Meteorcold31.src = "grafix/objects/hot.rock/glow.31.png";
var Meteorcold32 = new Image();
Meteorcold32.src = "grafix/objects/hot.rock/glow.32.png";
var Meteorcold33 = new Image();
Meteorcold33.src = "grafix/objects/hot.rock/glow.33.png";
var EnvMeteor = {1: Meteorcold, 2: Meteorcold2, 3: Meteorcold3, 4: Meteorcold4, 5: Meteorcold5, 6: Meteorcold6, 7: Meteorcold7, 8: Meteorcold8, 9: Meteorcold9, 10: Meteorcold10, 11: Meteorcold11,
				12: Meteorcold12, 13: Meteorcold13, 14: Meteorcold14, 15: Meteorcold15, 16: Meteorcold16, 17: Meteorcold17, 18: Meteorcold18, 19: Meteorcold19, 20: Meteorcold20, 21: Meteorcold21, 22: Meteorcold22,
				23: Meteorcold23, 24: Meteorcold24, 25: Meteorcold25, 26: Meteorcold26, 27: Meteorcold27, 28: Meteorcold28, 29: Meteorcold29, 30: Meteorcold30, 31: Meteorcold31, 32: Meteorcold32, 33: Meteorcold33}; 
//hlightning
var hlightning1 = new Image();
hlightning1.src = "grafix/effects/lightning.self/hor.1.png";
var hlightning2 = new Image();
hlightning2.src = "grafix/effects/lightning.self/hor.2.png";
var hlightning3 = new Image();
hlightning3.src = "grafix/effects/lightning.self/hor.3.png";
//vlightning
var vlightning1 = new Image();
vlightning1.src = "grafix/effects/lightning.self/ver.1.png";
var vlightning2 = new Image();
vlightning2.src = "grafix/effects/lightning.self/ver.2.png";
var vlightning3 = new Image();
vlightning3.src = "grafix/effects/lightning.self/ver.3.png";
//ehlightning
var ehlightning1 = new Image();
ehlightning1.src = "grafix/effects/lightning.enemy/hor.1.png";
var ehlightning2 = new Image();
ehlightning2.src = "grafix/effects/lightning.enemy/hor.2.png";
var ehlightning3 = new Image();
ehlightning3.src = "grafix/effects/lightning.enemy/hor.3.png";
//evlightning
var evlightning1 = new Image();
evlightning1.src = "grafix/effects/lightning.enemy/ver.1.png";
var evlightning2 = new Image();
evlightning2.src = "grafix/effects/lightning.enemy/ver.2.png";
var evlightning3 = new Image();
evlightning3.src = "grafix/effects/lightning.enemy/ver.3.png";
//Traps
//Dark1
var darkTrap = new Image();
darkTrap.src = "grafix/objects/darktrap/darktrap.png";
var darkTrapActive = new Image();
darkTrapActive.src = "grafix/objects/darktrap/darktrap.poof.png";
//Dark2
var dark2spike1 = new Image();
dark2spike1.src = "grafix/objects/spikes/spike.01.png";
var dark2spike2 = new Image();
dark2spike2.src = "grafix/objects/spikes/spike.02.png";
var dark2spike3 = new Image();
dark2spike3.src = "grafix/objects/spikes/spike.03.png";
var dark2spike4 = new Image();
dark2spike4.src = "grafix/objects/spikes/spike.04.png";
var dark2spike5 = new Image();
dark2spike5.src = "grafix/objects/spikes/spike.05.png";
var dark2img = {1: dark2spike1, 2: dark2spike2, 3: dark2spike3, 4: dark2spike4, 5: dark2spike5};
//darkfire
var darkfireimg1 = new Image();
darkfireimg1.src = "grafix/objects/firetrap/firetrap.01.png";
var darkfireimg2 = new Image();
darkfireimg2.src = "grafix/objects/firetrap/firetrap.02.png";
var darkfireimg3 = new Image();
darkfireimg3.src = "grafix/objects/firetrap/firetrap.03.png";
var darkfireimg = {0: darkfireimg1, 1: darkfireimg2, 2: darkfireimg3};
//darkice
var darkiceimg1 = new Image();
darkiceimg1.src = "grafix/objects/icetrap/icetrap.01.png";
var darkiceimg2 = new Image();
darkiceimg2.src = "grafix/objects/icetrap/icetrap.02.png";
var darkiceimg3 = new Image();
darkiceimg3.src = "grafix/objects/icetrap/icetrap.03.png";
var darkiceimg4 = new Image();
darkiceimg4.src = "grafix/objects/icetrap/icetrap.04.png";
var darkiceimg5 = new Image();
darkiceimg5.src = "grafix/objects/icetrap/icetrap.05.png";
var darkiceimg6 = new Image();
darkiceimg6.src = "grafix/objects/icetrap/icetrap.06.png";
var darkiceimg = {0: darkiceimg1, 1: darkiceimg2, 2: darkiceimg3, 3: darkiceimg4, 4: darkiceimg5, 5: darkiceimg6};
//darklightning
var darklightningimg1 = new Image();
darklightningimg1.src = "grafix/objects/zaptrap/zaptrap.01.png";
var darklightningimg2 = new Image();
darklightningimg2.src = "grafix/objects/zaptrap/zaptrap.02.png";
var darklightningimg3 = new Image();
darklightningimg3.src = "grafix/objects/zaptrap/zaptrap.03.png";
var darklightningimg = {0: darklightningimg1, 1: darklightningimg2, 2: darklightningimg3};
//darkair
var darkairimg1 = new Image();
darkairimg1.src = "grafix/objects/booster/booster.01.png";
var darkairimg2 = new Image();
darkairimg2.src = "grafix/objects/booster/booster.02.png";
var darkairimg3 = new Image();
darkairimg3.src = "grafix/objects/booster/booster.03.png";
var darkairimg4 = new Image();
darkairimg4.src = "grafix/objects/booster/booster.04.png";
var darkairimg = {1: darkairimg1, 2: darkairimg2, 3: darkairimg3, 4: darkairimg4};
//darkwater
var darkwater1img1 = new Image();
darkwater1img1.src = "grafix/objects/darksheild/darksheild1.01.png";
var darkwater1img2 = new Image();
darkwater1img2.src = "grafix/objects/darksheild/darksheild1.02.png";
var darkwater1img3 = new Image();
darkwater1img3.src = "grafix/objects/darksheild/darksheild1.03.png";
var darkwater1img4 = new Image();
darkwater1img4.src = "grafix/objects/darksheild/darksheild1.04.png";
var darksheildimg1 = {1: darkwater1img1, 2: darkwater1img2, 3: darkwater1img3, 4: darkwater1img4};
var darkwater2img1 = new Image();
darkwater2img1.src = "grafix/objects/darksheild/darksheild2.01.png";
var darkwater2img2 = new Image();
darkwater2img2.src = "grafix/objects/darksheild/darksheild2.02.png";
var darkwater2img3 = new Image();
darkwater2img3.src = "grafix/objects/darksheild/darksheild2.03.png";
var darkwater2img4 = new Image();
darkwater2img4.src = "grafix/objects/darksheild/darksheild2.04.png";
var darksheildimg2 = {1: darkwater2img1, 2: darkwater2img2, 3: darkwater2img3, 4: darkwater2img4};
var darkwater3img1 = new Image();
darkwater3img1.src = "grafix/objects/darksheild/darksheild3.01.png";
var darkwater3img2 = new Image();
darkwater3img2.src = "grafix/objects/darksheild/darksheild3.02.png";
var darkwater3img3 = new Image();
darkwater3img3.src = "grafix/objects/darksheild/darksheild3.03.png";
var darkwater3img4 = new Image();
darkwater3img4.src = "grafix/objects/darksheild/darksheild3.04.png";
var darksheildimg3 = {1: darkwater3img1, 2: darkwater3img2, 3: darkwater3img3, 4: darkwater3img4};
//--------------------------------------------------- Sounds ------------------------------------------------------------------------//
var Beam = document.getElementsByTagName("audio")[0];
var Killed = document.getElementsByTagName("audio")[1];
var Pickup = document.getElementsByTagName("audio")[2];
var Explosion = document.getElementsByTagName("audio")[3];
var Frozen = document.getElementsByTagName("audio")[4];
var Fwave = document.getElementsByTagName("audio")[5];
var Thunder = document.getElementsByTagName("audio")[6];
var Wind = document.getElementsByTagName("audio")[7];
var onDmg = document.getElementsByTagName("audio")[8];
var SpawnerSpawn = document.getElementsByTagName("audio")[9];
var zapLaser = document.getElementsByTagName("audio")[10];
var Plucky = document.getElementsByTagName("audio")[11];
var multiLaser = document.getElementsByTagName("audio")[12];
var midBoop = document.getElementsByTagName("audio")[13];
var lowDouble = document.getElementsByTagName("audio")[14];
var lowBomb = document.getElementsByTagName("audio")[15];
var highDouble = document.getElementsByTagName("audio")[16];
var flatBoop = document.getElementsByTagName("audio")[17];
var fastbeepsLow = document.getElementsByTagName("audio")[18];
var fastbeepsHigh = document.getElementsByTagName("audio")[19];
//Longsounds
var hum = document.getElementsByTagName("audio")[20];
var longfuzz = document.getElementsByTagName("audio")[21];
var longlaser = document.getElementsByTagName("audio")[22];
var longpew = document.getElementsByTagName("audio")[23];
var longpulse = document.getElementsByTagName("audio")[24];
var lowpulse = document.getElementsByTagName("audio")[25];
var radiofailure = document.getElementsByTagName("audio")[26];
var trailingbeeps = document.getElementsByTagName("audio")[27];
var AllSounds = {1: Beam, 2: Killed, 3: Pickup, 4: Explosion, 5: Frozen, 6: Fwave, 7: Thunder, 8: Wind, 9: onDmg, 10: SpawnerSpawn,
				11: zapLaser, 12: Plucky, 13: multiLaser, 14: midBoop, 15: lowDouble, 16: lowBomb, 17: highDouble, 18: flatBoop, 19: fastbeepsLow, 20: fastbeepsHigh,
				21: hum, 22: longfuzz, 23: longlaser, 24: longpew, 25: longpulse, 26: lowpulse, 27: radiofailure, 28: trailingbeeps};
//Music
var Spells = document.getElementsByTagName("audio")[28];
var OverwhelmedByGoblins = document.getElementsByTagName("audio")[29];
var BadWizards = document.getElementsByTagName("audio")[30];
var DumblebeatsNormal = document.getElementsByTagName("audio")[31];
var CaseysQuest = document.getElementsByTagName("audio")[32];
var AllMusic = {1: Spells, 2: OverwhelmedByGoblins, 3: BadWizards, 4: DumblebeatsNormal, 5: CaseysQuest};
for(M in AllMusic){
	AllMusic[M].volume = 0.5;
}
DumblebeatsNormal.volume = 0.4;
CaseysQuest.volume = 0.4;
//-------------------------------------------------------------- Library Storage ----------------------------------------------------//
//reset by changing the strings, change in gameover() too
var highscore1 = $.jStorage.get("v70highscore1");
if(!highscore1){
		var highscore1 = 0;
		$.jStorage.set("v70highscore1",highscore1);
}
var highscore2 = $.jStorage.get("v70highscore2");
if(!highscore2){
		var highscore2 = 0;
		$.jStorage.set("v70highscore2",highscore2);
}
var highscore3 = $.jStorage.get("v70highscore3");
if(!highscore3){
		var highscore3 = 0;
		$.jStorage.set("v70highscore3",highscore3);
}
var highscore4 = $.jStorage.get("v70highscore4");
if(!highscore4){
		var highscore4 = 0;
		$.jStorage.set("v70highscore4",highscore4);
}
var highscore5 = $.jStorage.get("v70highscore5");
if(!highscore5){
		var highscore5 = 0;
		$.jStorage.set("v70highscore5",highscore5);
}
//Get Initials
var hs1init = $.jStorage.get("v70hs1init");
if(!hs1init){
		var hs1init = "        ";
		$.jStorage.set("v70hs1init",hs1init);
}
var hs2init = $.jStorage.get("v70hs2init");
if(!hs2init){
		var hs2init = "        ";
		$.jStorage.set("v70hs2init",hs2init);
}
var hs3init = $.jStorage.get("v70hs3init");
if(!hs3init){
		var hs3init = "        ";
		$.jStorage.set("v70hs3init",hs3init);
}
var hs4init = $.jStorage.get("v70hs4init");
if(!hs4init){
		var hs4init = "        ";
		$.jStorage.set("v70hs4init",hs4init);
}
var hs5init = $.jStorage.get("v70hs5init");
if(!hs5init){
		var hs5init = "        ";
		$.jStorage.set("v70hs5init",hs5init);
}
//Remove _ in initials
var chars = hs1init.split('');
for(C in chars){
	if(chars[C] == "_"){
		chars[C] = " ";
	}
}
hs1init = chars[0] + chars[1] + chars[2] + chars[3] + chars[4] + chars[5] + chars[6] + chars[7];
var chars = hs2init.split('');
for(C in chars){
	if(chars[C] == "_"){
		chars[C] = " ";
	}
}
hs2init = chars[0] + chars[1] + chars[2] + chars[3] + chars[4] + chars[5] + chars[6] + chars[7];
var chars = hs3init.split('');
for(C in chars){
	if(chars[C] == "_"){
		chars[C] = " ";
	}
}
hs3init = chars[0] + chars[1] + chars[2] + chars[3] + chars[4] + chars[5] + chars[6] + chars[7];
var chars = hs4init.split('');
for(C in chars){
	if(chars[C] == "_"){
		chars[C] = " ";
	}
}
hs4init = chars[0] + chars[1] + chars[2] + chars[3] + chars[4] + chars[5] + chars[6] + chars[7];
var chars = hs5init.split('');
for(C in chars){
	if(chars[C] == "_"){
		chars[C] = " ";
	}
}
hs5init = chars[0] + chars[1] + chars[2] + chars[3] + chars[4] + chars[5] + chars[6] + chars[7];
//Get options
var dispCntrls = $.jStorage.get("cntrls");
if(!dispCntrls){
	var dispCntrls = 2;
	$.jStorage.set("cntrls", dispCntrls);
}
var vol = $.jStorage.get("vol");
if(!vol){
	var vol = 2;
	$.jStorage.set("vol", vol);
}
var Music = $.jStorage.get("Music");
if(!Music){
	var Music = 2;
	$.jStorage.set("Music", Music);
}
if(vol == 1){
	for(S in AllSounds){
		AllSounds[S].volume=0;
	}
}
if(Music == 1){
	for(M in AllMusic){
		AllMusic[M].volume=0;
	}
}
var dim = $.jStorage.get("dim");
if(!dim){
	var dim = 1;
	$.jStorage.set("dim", dim);
}
//---------------------------------------------------------------- Mouse Posn -------------------------------------------------------//
function getPosition(event){
    if (event.x != undefined && event.y != undefined){
         cX = event.x;
         cY = event.y;
        }
        else // Firefox method to get the position
        {
          cX = event.clientX + document.body.scrollLeft +
              document.documentElement.scrollLeft;
          cY = event.clientY + document.body.scrollTop +
              document.documentElement.scrollTop;
        }
        cX -= canvas.offsetLeft;
        cY -= canvas.offsetTop;
}
function getPositionhover(event){
    if (event.x != undefined && event.y != undefined){
		 hX = event.x;
         hY = event.y;
        }
        else // Firefox method to get the position
        {
		  hX = event.clientX + document.body.scrollLeft +
              document.documentElement.scrollLeft;
          hY = event.clientY + document.body.scrollTop +
              document.documentElement.scrollTop;
        }
		hX -= canvas.offsetLeft;
        hY -= canvas.offsetTop;
}
//------------------------------------------------- Menu ----------------------------------------------------------------------------//
var Menu = {
	x: canvas.width/2,
	y: canvas.height/2,
	width: 150,
	height: 30,
	newgameSelect: false,
	howtoplaySelect: false,
	optionsSelect: false,
	scoreSelect: false,
	creditSelect: false,
	draw: function(){
		var select = false;
		ctx.fillStyle = "white";
		ctx.font = "18pt Arial";
		ctx.strokeStyle = "white";
		ctx.drawImage(Title, 0, 0);
		ctx.drawImage(textmenu, 0, 0);
		ctx.fillText("Version 0.7.0 Alpha: May 6 2012", this.x-3*this.width/3, this.y+8.75*this.height);
		//Menu controls, keys is never called so copy pasted
		if(keytimer > 0){
			keytimer-=1;
		}
		//newgame
		if((hX >= this.x-this.width*4/5 && hX <=this.x + this.width && hY <= this.y + 1.75*this.height && hY>=this.y-this.height*7/6 + 2*this.height) || this.newgameSelect){
			select = true;
			this.newgameSelect = true;
			this.howtoplaySelect = false;
			this.optionsSelect = false;
			this.scoreSelect = false;
			this.creditSelect = false;
			ctx.drawImage(newgamemenu, 0, 0);
		}		
		if((cX >= this.x-this.width*4/5 && cX <=this.x + this.width && cY <= this.y + 1.75*this.height && cY>=this.y-this.height*7/6 + 2*this.height) || ((13 in keysDown || 32 in keysDown) && this.newgameSelect)){
			fastbeepsLow.currentTime=0;
			fastbeepsLow.play();
			cX = 0;
			cY = 0;
			STATE = 1;
		}
		//How to Play
		if((hX >= this.x-this.width*4/5 && hX <=this.x + this.width/2 && hY <= this.y + 6*this.height && hY>=this.y-this.height*7/6 + 6*this.height) || this.howtoplaySelect){
			select = true;
			this.newgameSelect = false;
			this.howtoplaySelect = true;
			this.optionsSelect = false;
			this.scoreSelect = false;
			this.creditSelect = false;
			ctx.drawImage(helpmenu, 0, 0);
		}		
		if((cX >= this.x-this.width*4/5 && cX <=this.x + this.width/2 && cY <= this.y + 6*this.height && cY>=this.y-this.height*7/6 + 6*this.height) || (this.howtoplaySelect && (13 in keysDown || 32 in keysDown) && keytimer <=0)){
			fastbeepsLow.currentTime=0;
			fastbeepsLow.play();
			cX = 0;
			cY = 0;
			STATE = 2;
			keytimer = 8;
		}
		//Score
		if((hX >= this.x-this.width*4/5 && hX <=this.x + this.width*3/4 && hY <= this.y + 3.25*this.height && hY>=this.y-this.height*7/5 + 3.25*this.height) || this.scoreSelect){
			select = true;
			this.newgameSelect = false;
			this.howtoplaySelect = false;
			this.optionsSelect = false;
			this.scoreSelect = true;
			this.creditSelect = false;
			ctx.drawImage(scoremenu, 0, 0);
		}		
		if((cX >= this.x-this.width*4/5 && cX <=this.x + this.width*3/4 && cY <= this.y + 3.25*this.height && cY>=this.y-this.height*7/5 + 3.25*this.height) || (this.scoreSelect && (13 in keysDown || 32 in keysDown) && keytimer <= 0)){
			fastbeepsLow.currentTime=0;
			fastbeepsLow.play();
			cX = 0;
			cY = 0;
			STATE = 5;
			wait = 8;
		}
		//Options
		if((hX >= this.x-this.width*3/5 && hX <=this.x + this.width*3/4 && hY <= this.y + 4.5*this.height && hY>=this.y-this.height*7/6 + 4.5*this.height) || this.optionsSelect){
			select = true;
			this.newgameSelect = false;
			this.howtoplaySelect = false;
			this.optionsSelect = true;
			this.scoreSelect = false;
			this.creditSelect = false;
			ctx.drawImage(optionsmenu, 0, 0);
		}		
		if((cX >= this.x-this.width*3/5 && cX <=this.x + this.width*3/4 && cY <= this.y + 4.5*this.height&& cY>=this.y-this.height*7/6 + 4.5*this.height) || (this.optionsSelect && (13 in keysDown || 32 in keysDown) && keytimer <= 0)){
			fastbeepsLow.currentTime=0;
			fastbeepsLow.play();
			cX = 0;
			cY = 0;
			STATE = 6;
			keytimer = 8;
		}
		//Credits
		if((hX >= this.x-this.width*3/5 && hX <=this.x + this.width*3/4 && hY <= this.y + 7.25*this.height && hY>=this.y-this.height*7/6 + 7.25*this.height) || this.creditSelect){
			select = true;
			this.newgameSelect = false;
			this.howtoplaySelect = false;
			this.optionsSelect = false;
			this.scoreSelect = false;
			this.creditSelect = true;
			ctx.drawImage(creditsmenu, 0, 0);
		}		
		if((cX >= this.x-this.width*3/5 && cX <=this.x + this.width*3/4 && cY <= this.y + 7.25*this.height&& cY>=this.y-this.height*7/6 + 7.25*this.height) || (this.creditSelect && (13 in keysDown || 32 in keysDown) && keytimer <= 0)){
			fastbeepsLow.currentTime=0;
			fastbeepsLow.play();
			cX = 0;
			cY = 0;
			STATE = 3;
			keytimer = 8;
		}
		//keys in menu, 40 down 38 up
		//init
		if(keytimer == 0 && !this.newgameSelect && !this.howtoplaySelect && !this.optionsSelect && !this.scoreSelect && !this.creditSelect && (38 in keysDown || 40 in keysDown)){
			keytimer = 4;
			select = true;
			this.newgameSelect = true;
		}
		//full down
		else if(keytimer == 0 && !this.howtoplaySelect && !this.optionsSelect && !this.scoreSelect && !this.creditSelect && (40 in keysDown)){
			keytimer = 4;
			select = true;
			this.newgameSelect = false;
			this.scoreSelect = true;
		}
		else if(keytimer == 0 && !this.howtoplaySelect && !this.optionsSelect && !this.creditSelect && (40 in keysDown)){
			keytimer = 4;
			select = true;
			this.scoreSelect = false;
			this.optionsSelect = true;
		}
		else if(keytimer == 0 && !this.howtoplaySelect && !this.creditSelect && (40 in keysDown)){
			keytimer = 4;
			select = true;
			this.optionsSelect = false;
			this.howtoplaySelect = true;
		}
		else if(keytimer == 0 && !this.creditSelect && (40 in keysDown)){
			keytimer = 4;
			select = true;
			this.howtoplaySelect = false;
			this.creditSelect = true;
		}
		if(keytimer == 0 && this.creditSelect && (40 in keysDown)){
			keytimer = 4;
			select = true;
			this.creditSelect = false;
			this.newgameSelect = true;
		}
		//full up
		else if(keytimer == 0 && this.creditSelect && (38 in keysDown)){
			keytimer = 4;
			select = true;
			this.creditSelect = false;
			this.howtoplaySelect = true;
		}
		else if(keytimer == 0 && this.howtoplaySelect && (38 in keysDown)){
			keytimer = 4;
			select = true;
			this.howtoplaySelect = false;
			this.optionsSelect = true;
		}
		else if(keytimer == 0 && this.optionsSelect && (38 in keysDown)){
			keytimer = 4;
			select = true;
			this.optionsSelect = false;
			this.scoreSelect = true;
		}
		else if(keytimer == 0 && this.scoreSelect && (38 in keysDown)){
			keytimer = 4;
			select = true;
			this.scoreSelect = false;
			this.newgameSelect = true;
		}
		else if(keytimer == 0 && this.newgameSelect && (38 in keysDown)){
			keytimer = 4;
			select = true;
			this.newgameSelect = false;
			this.creditSelect = true;
		}
		if(select == false){
			ctx.drawImage(noselectmenu, 0, 0);
		}
	}
};
var Info = {
	x: canvas.width/25,
	y: canvas.height/11,
	width: 20,
	height: 20,
	bx: 696,
	by: 560,
	draw: function(){
		if(keytimer > 0){
			keytimer-=1;
		}
		ctx.fillStyle = "white";
		ctx.font = "14pt Arial";
		ctx.strokeStyle = "white";
		ctx.fillText("Have you ever wanted to be just like Dumbledore?", this.x-this.width/2, this.y-this.height/2); 
		ctx.fillText("Well now you can with this AMAZING wizard simulator!", this.x-this.width/2, this.y+2*this.height/2);
		ctx.fillText("Originally released for the Nintendo 64,", this.x-this.width/2, this.y+5*this.height/2);
		ctx.fillText("this lifetime classic is now available at your leisure!",  this.x-this.width/2, this.y+8*this.height/2);
		ctx.fillText("Controls:", this.x-this.width/2, this.y+11*this.height/2);
		ctx.fillText("W: Move up", this.x-this.width/2, this.y+14*this.height/2);
		ctx.fillText("A: Move left", this.x-this.width/2, this.y+17*this.height/2);
		ctx.fillText("S: Move down", this.x-this.width/2, this.y+20*this.height/2);
		ctx.fillText("D: move right", this.x-this.width/2, this.y+23*this.height/2);
		ctx.fillText("Arrow keys: Shoot Dumblebeam", this.x-this.width/2, this.y+26*this.height/2);
		ctx.fillText("Spacebar: Use spell", this.x-this.width/2, this.y+29*this.height/2);
		ctx.fillText("Q: Drop Element 1", this.x-this.width/2, this.y+32*this.height/2);
		ctx.fillText("E: Drop Element 2", this.x-this.width/2, this.y+35*this.height/2);
		ctx.fillText("P: Pause game", this.x-this.width/2, this.y+38*this.height/2);
		ctx.fillText("How to play: ", this.x-this.width/2, this.y+41*this.height/2);
		ctx.fillText("Kill enemies! Acquire points! Pick up boxes to get elements!", this.x-this.width/2, this.y+44*this.height/2);
		ctx.fillText("Each element corresponds to a unique spell, and you can combine", this.x-this.width/2, this.y+47*this.height/2);
		ctx.fillText("up to 2 elements for MORE unique spells!!!", this.x-this.width/2, this.y+50*this.height/2);
		ctx.font = "16pt Arial";
		ctx.fillText("Back", this.bx, this.by);
		if(hX >= this.bx-10 && hX <=this.bx + 50 && hY <= this.by && hY>=this.by-this.height*7/6){
			ctx.strokeRect(this.bx-10, this.by-this.height*7/6, this.width * 3 + 10, this.height+10);
		}		
		if((cX >= this.bx-10 && cX <=this.bx + 50 && cY <= this.by && cY>=this.by-this.height*7/6) || ((13 in keysDown || 32 in keysDown) && keytimer <= 0)){
			fastbeepsLow.currentTime=0;
			fastbeepsLow.play();
			keytimer = 8;
			STATE = 0;
		}
}
};
var Credits = {
	x: 300,
	y: canvas.height/8,
	width: 20,
	height: 20,
	bx: 400-50,
	by: 560,
	draw: function(){
		if(keytimer > 0){
			keytimer-=1;
		}
		ctx.fillStyle = "white";
		ctx.font = "18pt Arial";
		ctx.strokeStyle = "white";
		ctx.fillText("Credits", this.x, this.y-this.height/2); 
		ctx.font = "16pt Arial";
		ctx.fillText("Creator/Developer:", this.x-this.width/2, this.y+4*this.height/2);
		ctx.fillText("Brett Davis", this.x-this.width/2, this.y+7*this.height/2);
		ctx.fillText("Art:",  this.x-this.width/2, this.y+12*this.height/2);
		ctx.fillText("Kyle Fleischer", this.x-this.width/2, this.y+15*this.height/2);
		ctx.fillText("Music and Sound:", this.x-this.width/2, this.y+20*this.height/2);
		ctx.fillText("Dave Gedarovich", this.x-this.width/2, this.y+23*this.height/2);
		ctx.fillText("Jack Van Oudenaren a.k.a. ABSRDST", this.x-this.width*3, this.y+26*this.height/2);
		ctx.fillText("Back", this.bx, this.by);
		if(hX >= this.bx-10 && hX <=this.bx + 50 && hY <= this.by && hY>=this.by-this.height*7/6){
			ctx.strokeRect(this.bx-10, this.by-this.height*7/6, this.width * 3 + 10, this.height+10);
		}		
		if((cX >= this.bx-10 && cX <=this.bx + 50 && cY <= this.by && cY>=this.by-this.height*7/6) || ((13 in keysDown || 32 in keysDown) && keytimer <= 0)){
			fastbeepsLow.currentTime=0;
			fastbeepsLow.play();
			STATE = 0;
			keytimer = 8;
		}
}
};
var Pause = {
	x: canvas.width/2,
	y: canvas.height/2,
	width: 800,
	height: 576,
	draw: function(){
		ctx.globalAlpha = 1;
		ctx.fillStyle = "white";
		ctx.font = "18pt Arial";
		ctx.drawImage(menuBack, this.x-this.width/2, this.y-this.height/2);
		ctx.fillText("-Paused-", this.x-64, this.y-32);
		for(S in AllSounds){
			AllSounds[S].pause();
		}
		for(S in AllMusic){
			AllMusic[S].pause();
		}
	}
};

var Options = {
	x: 300,
	y: canvas.height/8,
	width: 20,
	height: 20,
	bx: 400-50,
	by: 560,
	draw: function(){
		if(keytimer > 0){
			keytimer-=1;
		}
		ctx.fillStyle = "white";
		ctx.font = "18pt Arial";
		ctx.strokeStyle = "white";
		ctx.fillText("Options", this.x, this.y-this.height/2); 
		ctx.font = "16pt Arial";
		if(hX >= this.x-20 && hX <=this.x + this.width*4 && hY <= this.y+5*this.height/2 && hY>=this.y+this.height/2){
			ctx.strokeRect(this.x-20, this.y + this.height, this.width * 6, this.height+10);
		}		
		if(cX >= this.x-20 && cX <=this.x + this.width*4 && cY <= this.y+5*this.height/2 && cY>=this.y+this.height/2){
			fastbeepsLow.currentTime=0;
			fastbeepsLow.play();
			if(vol == 1){
				vol = 2;
				$.jStorage.set("vol",vol);
				cX = 0;
				cY = 0;
			}
			else if(vol == 2){
				vol = 1;
				$.jStorage.set("vol",vol);
				cX = 0;
				cY = 0;
			}
		}
		if(vol == 2){
			ctx.fillText("Sound: On", this.x-this.width/2, this.y+4*this.height/2);
			for(S in AllSounds){
				AllSounds[S].volume=0.8;
			}
		}
		if(vol == 1){
			ctx.fillText("Sound: Off", this.x-this.width/2, this.y+4*this.height/2);
			for(S in AllSounds){
				AllSounds[S].volume=0;
			}
		}
		if(hX >= this.x-20 && hX <=this.x + this.width*5 && hY <= this.y+7*this.height/2 && hY>=this.y+4*this.height/2){
			ctx.strokeRect(this.x-20, this.y + 2.5*this.height, this.width * 6, this.height+10);
		}		
		if(cX >= this.x-20 && cX <=this.x + this.width*5 && cY <= this.y+7*this.height/2 && cY>=this.y+4*this.height/2){
			fastbeepsLow.currentTime=0;
			fastbeepsLow.play();
			if(Music == 1){
				Music = 2;
				$.jStorage.set("Music",Music);
				cX = 0;
				cY = 0;
			}
			else if(Music == 2){
				Music = 1;
				$.jStorage.set("Music",Music);
				cX = 0;
				cY = 0;
			}
		}
		if(Music == 2){
			ctx.fillText("Music: On", this.x-this.width/2, this.y+7*this.height/2);
			for(M in AllMusic){
				AllMusic[M].volume = 0.5;
			}
			DumblebeatsNormal.volume = 0.4;
			CaseysQuest.volume = 0.4;
		}
		if(Music == 1){
			ctx.fillText("Music: Off", this.x-this.width/2, this.y+7*this.height/2);
			for(M in AllMusic){
				AllMusic[M].volume=0;
			}
		}
		if(hX >= this.x-20 && hX <=this.x + this.width*10 && hY <= this.y+10*this.height/2 && hY>=this.y+7*this.height/2){
			ctx.strokeRect(this.x-20, this.y + 4*this.height, this.width * 12, this.height+10);
		}		
		if(cX >= this.x-20 && cX <=this.x + this.width*10 && cY <= this.y+10*this.height/2 && cY>=this.y+7*this.height/2){
			fastbeepsLow.currentTime=0;
			fastbeepsLow.play();
			if(dispCntrls == 1){
				dispCntrls = 2;
				$.jStorage.set("cntrls",dispCntrls);
				cX = 0;
				cY = 0;
			}
			else if(dispCntrls == 2){
				dispCntrls = 1;
				$.jStorage.set("cntrls",dispCntrls);
				cX = 0;
				cY = 0;
			}
		}
		if(dispCntrls == 2){
			ctx.fillText("Display Controls: Yes", this.x-this.width/2, this.y+10*this.height/2);
		}
		if(dispCntrls == 1){
			ctx.fillText("Display Controls: No", this.x-this.width/2, this.y+10*this.height/2);
		}
		if(hX >= this.x-20 && hX <=this.x + this.width*7 && hY <= this.y+13*this.height/2 && hY>=this.y+10*this.height/2){
			ctx.strokeRect(this.x-20, this.y + 5.5*this.height, this.width * 7, this.height+10);
		}		
		if(cX >= this.x-20 && cX <=this.x + this.width*7 && cY <= this.y+13*this.height/2 && cY>=this.y+10*this.height/2){
			fastbeepsLow.currentTime=0;
			fastbeepsLow.play();
			if(dim == 1){
				dim = 2;
				$.jStorage.set("dim",dim);
				cX = 0;
				cY = 0;
			}
			else if(dim == 2){
				dim = 1;
				$.jStorage.set("dim",dim);
				cX = 0;
				cY = 0;
			}
		}
		if(dim == 2){
			ctx.fillText("3D Mode: On", this.x-this.width/2, this.y+13*this.height/2);
		}
		if(dim == 1){
			ctx.fillText("3D Mode: Off", this.x-this.width/2, this.y+13*this.height/2);
		}
		ctx.fillText("Back", this.bx, this.by);
		if(hX >= this.bx-10 && hX <=this.bx + 50 && hY <= this.by && hY>=this.by-this.height*7/6){
			ctx.strokeRect(this.bx-10, this.by-this.height*7/6, this.width * 3 + 10, this.height+10);
		}		
		if((cX >= this.bx-10 && cX <=this.bx + 50 && cY <= this.by && cY>=this.by-this.height*7/6) || ((13 in keysDown || 32 in keysDown) && keytimer <= 0)){
			fastbeepsLow.currentTime=0;
			fastbeepsLow.play();
			keytimer = 8;
			STATE = 0;
		}
}
};
//------------------------------------------------- Player --------------------------------------------------------------------------//
// Player
var player = {
	x: 400,
	y: 256,
	width: 32,
	height: 32,
	speed: 8,
	speed2: 2,
	dirct: 0,
	hp: 3,
	maxhp: 3,
	power: 1,
	currpower: 1,
	dmg: false,
	dir: "W",
	LR: "",
	zapIndex: 1,
	ox: 0,
	oy: 0,
	// Draws the player on the canvas when called
	draw: function(){
		// Flash if the player has been hit
		if (hptimer/2 != Math.round(hptimer/2)){
			if(this.dir == "WA" || this.dir == "AS" || this.dir == "A"){
				this.LR = "Left";
				ctx.drawImage(Wizzurd2, this.x - this.width / 2, this.y - this.height / 2);
			}
			else if(this.dir == "WD" || this.dir == "SD" || this.dir == "D"){
				ctx.drawImage(Wizzurd2R, this.x - this.width / 2, this.y - this.height / 2);
				this.LR = "Right";
			}
			else if(this.LR == "Left"){
				ctx.drawImage(Wizzurd2, this.x - this.width / 2, this.y - this.height / 2);
			}
			else{
				ctx.drawImage(Wizzurd2R, this.x - this.width / 2, this.y - this.height / 2);
			}
		}
		else if(waterlightning.onScreen == 1){
			if(this.dir == "WA" || this.dir == "AS" || this.dir == "A"){
				this.LR = "Left";
				ctx.drawImage(ZapTrapL[this.zapIndex], this.x - this.width / 2, this.y - this.height / 2);
			}
			else if(this.dir == "WD" || this.dir == "SD" || this.dir == "D"){
				ctx.drawImage(ZapTrapR[this.zapIndex], this.x - this.width / 2, this.y - this.height / 2);
				this.LR = "Right";
			}
			else if(this.LR == "Left"){
				ctx.drawImage(ZapTrapL[this.zapIndex], this.x - this.width / 2, this.y - this.height / 2);
			}
			else{
				ctx.drawImage(ZapTrapR[this.zapIndex], this.x - this.width / 2, this.y - this.height / 2);
			}
			this.zapIndex++;
			if(this.zapIndex > 5){
				this.zapIndex = 1;
			}
		}
		else{
			if(this.dir == "WA" || this.dir == "AS" || this.dir == "A"){
				this.LR = "Left";
				ctx.drawImage(WizzurdL, this.x - this.width / 2, this.y - this.height / 2);
			}
			else if(this.dir == "WD" || this.dir == "SD" || this.dir == "D"){
				ctx.drawImage(WizzurdR, this.x - this.width / 2, this.y - this.height / 2);
				this.LR = "Right";
			}
			else if(this.LR == "Left"){
				ctx.drawImage(WizzurdL, this.x - this.width / 2, this.y - this.height / 2);
			}
			else{
				ctx.drawImage(WizzurdR, this.x - this.width / 2, this.y - this.height / 2);
			}
		}
		ctx.fillStyle = "red";
		if(this.hp == 6){
			ctx.fillStyle = "yellow";
			ctx.fillRect(this.x - this.width/2 + 4, this.y - this.height/2 - this.height/4, this.width/4, this.height/4);
			ctx.fillRect(this.x - (this.width/2 - this.width/4)+5, this.y - this.height/2 - this.height/4, this.width/4, this.height/4);
			ctx.fillRect(this.x - (this.width/2 - this.width/2) + 6, this.y - this.height/2 - this.height/4, this.width/4, this.height/4);
		}
		else if(this.hp == 5){
			ctx.fillStyle = "yellow";
			ctx.fillRect(this.x - this.width/2 + 4, this.y - this.height/2 - this.height/4, this.width/4, this.height/4);
			ctx.fillRect(this.x - (this.width/2 - this.width/4)+5, this.y - this.height/2 - this.height/4, this.width/4, this.height/4);
			ctx.fillStyle = "red";
			ctx.fillRect(this.x - (this.width/2 - this.width/2) + 6, this.y - this.height/2 - this.height/4, this.width/4, this.height/4);
		}
		else if(this.hp == 4){
			ctx.fillStyle = "yellow";
			ctx.fillRect(this.x - this.width/2 + 4, this.y - this.height/2 - this.height/4, this.width/4, this.height/4);
			ctx.fillStyle = "red";
			ctx.fillRect(this.x - (this.width/2 - this.width/4)+5, this.y - this.height/2 - this.height/4, this.width/4, this.height/4);
			ctx.fillRect(this.x - (this.width/2 - this.width/2) + 6, this.y - this.height/2 - this.height/4, this.width/4, this.height/4);
		}
		else if(this.hp == 3){
			ctx.fillRect(this.x - this.width/2 + 4, this.y - this.height/2 - this.height/4, this.width/4, this.height/4);
			ctx.fillRect(this.x - (this.width/2 - this.width/4)+5, this.y - this.height/2 - this.height/4, this.width/4, this.height/4);
			ctx.fillRect(this.x - (this.width/2 - this.width/2) + 6, this.y - this.height/2 - this.height/4, this.width/4, this.height/4);
		}
		else if(this.hp == 2){
			ctx.fillRect(this.x - this.width/2 + 4, this.y - this.height/2 - this.height/4, this.width/4, this.height/4);
			ctx.fillRect(this.x - (this.width/2 - this.width/4)+5, this.y - this.height/2 - this.height/4, this.width/4, this.height/4);
		}
		else{
			ctx.fillRect(this.x - this.width/2 + 4, this.y - this.height/2 - this.height/4, this.width/4, this.height/4);
		}
	},
	onhit: function(){
		if(this.dirct > 0){
			this.dirct-=1;
		}
		if(hptimer > 0){
			hptimer-=1;
		}
		else{
			for(E in AllEnemies){
				if(collision(AllEnemies[E].dir, AllEnemies[E], this) || collision(this.dir, this, AllEnemies[E])){
					if(AllEnemies[E].onTree == 0){
						if(darkwater.onScreen == 1){
							darkwater.hptimer = 20;
							darkwater.hp-=1;
							hptimer = 20;
							onHit(AllEnemies[E]);
						}
						else{
							onDmg.currentTime=0;
							onDmg.play();
							this.dmg = true;
						}
					}
				}
			}
			for(E in EMeteors){
				if(collision(EMeteors[E].dir, EMeteors[E], this) || collision(this.dir, this, EMeteors[E])){
					if(EMeteors[E].timeLeft > 0){
						if(darkwater.onScreen == 1){
							darkwater.hptimer = 20;
							darkwater.hp-=1;
							hptimer = 20;
						}
						else{
							onDmg.currentTime=0;
							onDmg.play();
							this.dmg = true;
						}
					}
				}
			}
			if(STATE == "Scorched"){
				for(O in ObsList){
					if(collision(this.dir, this, ObsList[O])){
						if(darkwater.onScreen == 1){
							darkwater.hptimer = 20;
							darkwater.hp-=1;
							hptimer = 20;
							obsHit(ObsList[O]);
						}
						else{
							onDmg.currentTime=0;
							onDmg.play();
							this.dmg = true;
						}
					}
				}
			}
			if(this.dmg == true){
				this.hp-=1;
				hptimer = 30;
				this.dmg = false;
			}
			else{
				this.hp = this.hp;
			}
		}
	}
};
//----------------------------------------------- Casting Bar -----------------------------------------------------------------------//
var castingBar = {
	x: player.x - player.width/2,
	y: player.y + player.height/2,
	width: player.width,
	height: player.height/4,
	width2: 0,
	onScreen: 0,
	cast: -1,
	castmax: 0,
	draw: function(){
		this.x = player.x - player.width/2;
		this.y = player.y + player.height/2;
		if(this.onScreen == 1){
			ctx.fillStyle = "#0404B4";
			ctx.strokeStyle = "black";
			ctx.strokeRect(this.x, this.y, this.width, this.height);
			ctx.fillRect(this.x + 2, this.y + 2, this.width2, this.height - 2);
		}
	},
	tick: function(){
		if(this.cast > 0){
			player.speed = 0;
			this.cast-=1;
			this.width2 = this.cast/this.castmax * this.width;
		}
		if(this.cast == 0){
			this.cast-=1;
			player.speed = 8;
			this.onScreen = 0;
		}
	}
}
var TreecastingBar = {
	x: treeWizz.x - treeWizz.width/2,
	y: treeWizz.y + treeWizz.height/2,
	width: treeWizz.width,
	height: treeWizz.height/4,
	width2: 0,
	onScreen: 0,
	cast: -1,
	castmax: 0,
	draw: function(){
		this.x = treeWizz.x - treeWizz.width/2;
		this.y = treeWizz.y + treeWizz.height/2;
		if(this.onScreen == 1){
			ctx.fillStyle = "#0404B4";
			ctx.strokeStyle = "black";
			ctx.strokeRect(this.x, this.y, this.width, this.height);
			ctx.fillRect(this.x + 2, this.y + 2, this.width2, this.height - 2);
		}
	},
	tick: function(){
		if(this.cast > 0){
			treeWizz.speed = 0;
			this.cast-=1;
			this.width2 = this.cast/this.castmax * this.width;
		}
		if(this.cast == 0){
			this.cast-=1;
			treeWizz.speed = treeWizz.speed2*2;
			this.onScreen = 0;
		}
	}
}
var SorcCastingBar = {
	x: -100,
	y: -200,
	width: Sorceror.width,
	height: Sorceror.height/4,
	width2: 0,
	onScreen: 0,
	cast: -1,
	castmax: 0,
	draw: function(){
		this.x = Sorceror.x - Sorceror.width/2;
		this.y = Sorceror.y + Sorceror.height/2;
		if(this.onScreen == 1){
			ctx.fillStyle = "#0404B4";
			ctx.strokeStyle = "black";
			ctx.strokeRect(this.x, this.y, this.width, this.height);
			ctx.fillRect(this.x + 2, this.y + 2, this.width2, this.height - 2);
		}
	},
	tick: function(){
		if(this.cast > 0){
			Sorceror.speed = 0;
			this.cast-=1;
			this.width2 = this.cast/this.castmax * this.width;
		}
		if(this.cast == 0){
			this.cast-=1;
			Sorceror.speed = Sorceror.speed2*2;
			this.onScreen = 0;
		}
	}
}
//------------------------------------------------- Collision Detection -------------------------------------------------------------//
// Collision detection
function collision(dir, one, two){
	if(dir == "W"){
		if(one.y <= two.y + two.height/2){
			return false;
		}
		if((one.x-one.width/2<two.x+two.width/2 && one.x+one.width/2>two.x-two.width/2) &&
			one.y - (one.height / 2) - one.speed < two.y + two.height / 2){
			return true;
		}else{
			return false;
		}
	}
	if(dir == "A" || dir == "AS" || dir == "WA"){
		if(one.x <= two.x - two.width/2){
			return false;
		}
		if((one.y-one.height/2 < two.y+two.height/2 && one.y+one.height/2>two.y-two.height/2) &&
			one.x - (one.width / 2) - one.speed < two.x + two.width / 2){
			return true;
		}else{
			return false;
		}
	}
	if(dir == "S"){
		if(one.y >= two.y + two.height/2){
			return false;
		}
		if((one.x-one.width/2 < two.x+two.width/2 && one.x+one.width/2>two.x-two.width/2) &&
			one.y + (one.height / 2) + one.speed > two.y - two.height / 2){
			return true;
		}else{
			return false;
		}
	}
	if(dir == "D" || dir == "WD" || dir == "SD"){
		if(one.x >= two.x + two.width/2){
			return false;
		}
		if((one.y-one.height/2 < two.y+two.height/2 && one.y+one.height/2>two.y-two.height/2) &&
			one.x + (one.height / 2) + one.speed > two.x - two.width / 2){
			return true;
		}else{
			return false;
		}
	}
	else{
		return contained(two, one);
	}
}

// Collision detection cont'd
function contained(a, b){
	var dist = Math.sqrt(((b.x - a.x)*(b.x - a.x)) + ((b.y - a.y)*(b.y - a.y)));
	if(dist <= b.width/2 || dist <= b.height/2 ||
		dist <= a.width/2 || dist <= a.height/2){
		return true;
	}
	else{
		return false;
	}
}
//dragon flame
function Hcontained(a, b){
	if(a.y >= b.y-b.height/2 && a.y <= b.y + b.height/2 && a.x <= b.x + b.width/2 && a.x >= b.x-b.width/2){
		return true;
	}
	else{
		return false;
	}
}
//DiffDir for rootstrike
function DiffDir(dir){
	if(dir == "W"){
		if(Math.floor(Math.random() * 2) + 1 == 2){
			return "A";
		}
		else{
			return "D";
		}
	}
	else if(dir == "A"){
		if(Math.floor(Math.random() * 2) + 1 == 2){
			return "W";
		}
		else{
			return "S";
		}
	}
	else if(dir == "S"){
		if(Math.floor(Math.random() * 2) + 1 == 2){
			return "A";
		}
		else{
			return "D";
		}
	}
	else if(dir == "D"){
		if(Math.floor(Math.random() * 2) + 1 == 2){
			return "W";
		}
		else{
			return "S";
		}
	}
	else if(dir == "WD"){
		if(Math.floor(Math.random() * 2) + 1 == 2){
			return "WA";
		}
		else{
			return "SD";
		}
	}
	else if(dir == "AS"){
		if(Math.floor(Math.random() * 2) + 1 == 2){
			return "AS";
		}
		else{
			return "WA";
		}
	}
	else if(dir == "WA"){
		if(Math.floor(Math.random() * 2) + 1 == 2){
			return "AS";
		}
		else{
			return "WD";
		}
	}
	else if(dir == "SD"){
		if(Math.floor(Math.random() * 2) + 1 == 2){
			return "AS";
		}
		else{
			return "WD";
		}
	}
}
//------------------------------------------------- Point and Element Markers -------------------------------------------------------//
// Fancyness
var marker = {
	color: "#00FF00",
	speed: 4,
	timeLeft: 0,
	x: -100,
	y: -100,
	points: 0,
	mult: 1
};

var marker2 = {
	color: "#00FF00",
	speed: 4,
	timeLeft: 0,
	x: -100,
	y: -100,
	points: 0,
	mult: 1
};

var marker3 = {
	color: "#00FF00",
	speed: 4,
	timeLeft: 0,
	x: -100,
	y: -100,
	points: 0,
	mult: 1
};

var marker4 = {
	color: "#00FF00",
	speed: 4,
	timeLeft: 0,
	x: -100,
	y: -100,
	points: 0,
	mult: 1
};
var markerlist = {1: marker, 2: marker2, 3: marker3, 4: marker4};
var typemarker = {
	color: "#00FF00",
	speed: 4,
	timeLeft: 0,
	x: -100,
	y: -100,
	text: ""
};

var typemarker2 = {
	color: "#00FF00",
	speed: 4,
	timeLeft: 0,
	x: -100,
	y: -100,
	text: ""
};

var typemarker3 = {
	color: "#00FF00",
	speed: 4,
	timeLeft: 0,
	x: -100,
	y: -100,
	text: ""
};

var typemarker4 = {
	color: "#00FF00",
	speed: 4,
	timeLeft: 0,
	x: -100,
	y: -100,
	text: ""
};

var typemarker5 = {
	color: "#00FF00",
	speed: 4,
	timeLeft: 0,
	x: -100,
	y: -100,
	text: ""
};

var typemarker6 = {
	color: "#00FF00",
	speed: 4,
	timeLeft: 0,
	x: -100,
	y: -100,
	text: ""
};
var typemarkerlist = {1: typemarker, 2: typemarker2, 3: typemarker3, 4: typemarker4, 5: typemarker5, 6: typemarker6};
function drawtypeMarker(M){
	if(M.timeLeft == 0){
		M.x = -100;
		M.y = -100;
	}
	if (M.timeLeft != 0){
		if(M.text == "+ Air" || M.text == "+ Time"){
			M.color = "#D0D0D0";
		}
		else if(M.text == "+ Fire"){
			M.color = "#CC0000";
		}
		else if(M.text == "+ Ice"){
			M.color = "#00FFFF";
		}
		else if(M.text == "+ Lightning"){
			M.color = "yellow";
		}
		else if(M.text == "+ Earth"){
			M.color = "#33FF00";
		}
		else if(M.text == "+ Mystic"){
			M.color = "#663399";
		}
		else if(M.text == "+ Water"){
			M.color = "#0000FF";
		}
		else if(M.text == "+ Dark"){
			M.color = "black";
		}
		else if(M.text == "Dead!"){
			M.color = "#CC0000";
		}
		else if(M.text == "+1"){
			M.color = "#00FFFF";
		}
		else if(M.text == "+ Max Hp" || M.text == "+ Damage"){
			M.color = colorz[colorNum];
			colorNum++;
			if(colorNum > 6){
				colorNum = 1;
			}
		}
	ctx.fillStyle = M.color;
	if(M.text == "+1"){
		ctx.font = "18pt Arial";
	}
	else{
		ctx.font = "32pt Arial";
	}
	ctx.fillText(M.text, M.x, M.y);
	}
}

function drawMarker(M){
	if(M.timeLeft == 0){
		M.x = -100;
		M.y = -100;
		M.speed = 4;
	}
	if (M.timeLeft != 0){
		if(M.mult == 1){
			M.color = "#00FF00";
		}
		else if(M.mult == 2){
			M.color = "#FFFF00";
		}
		else if(M.mult == 3){
			M.color = "#FF6600";
		}
		else if(M.mult == 4){
			M.color = "#CC0000";
		}
		else if(M.mult >= 5){
			M.color = "#FF99FF";
		}
	ctx.fillStyle = M.color;
	ctx.font = "32pt Arial";
	ctx.fillText(M.points * (M.mult), M.x, M.y);
	}
}

function moveMarker(M){
	if (M.timeLeft > 0){
		M.y -= M.speed;
		M.timeLeft--;}
	}
//------------------------------------------------- Keep Track of Score Multiplier --------------------------------------------------//
//Multiply
var multiply = function(){
	if(multtimer <= 0){
		multiplier = 1;
	}
	else{
		multtimer-=1;
	}
}
//------------------------------------------------- Clear Canvas Each Frame ---------------------------------------------------------//
// Clear the canvas - draw a white rectangle over everything
var clear = function(){
// Border
if(ctx.globalAlpha == 1){
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
}
	if(STATE != 1 && STATE != "Jungle" && STATE != "Scorched"){
		ctx.drawImage(menuBack, 0, 0);
	}
	else if(STATE == 1){
		ctx.drawImage(backGround1, 0, 0);
	}
	else if(STATE == "Jungle"){
		ctx.drawImage(backGround2, 0, 0);
	}
	else if(STATE == "Scorched"){
		ctx.drawImage(backGround3, 0, 0);
	}
};
//-------------------------------------------------- HUD and Spell Calculation ------------------------------------------------------//
function UI(){
	//Calculate spell
	if(spell2 == "N/A"){
		if(spell1 == "Fire"){
			spell = "Fire";
		}
		if(spell1 == "Ice"){
			spell = "Ice";
		}
		if(spell1 == "Earth"){
			spell = "Earth Heal";
		}
		if(spell1 == "Lightning"){
			spell = "Lightning";
		}	
		if(spell1 == "Air"){
			spell = "Dash";
		}
		if(spell1 == "Mystic"){
			spell = "Teleport";
		}
		if(spell1 == "Water"){
			spell = "Bubble Shield";
		}
		if(spell1 == "Dark"){
			spell = "Traps";
		}		
	}
	if(spell1 == "N/A" && spell2 != "N/A"){
		if(spell2 == "Fire"){
			spell = "Fire";
		}
		if(spell2 == "Ice"){
			spell = "Ice";
		}
		if(spell2 == "Earth"){
			spell = "Earth Heal";
		}
		if(spell2 == "Lightning"){
			spell = "Lightning";
		}	
		if(spell2 == "Air"){
			spell = "Dash";
		}
		if(spell2 == "Mystic"){
			spell = "Teleport";
		}
		if(spell2 == "Water"){
			spell = "Bubble Shield";
		}
		if(spell2 == "Dark"){
			spell = "Traps";
		}
	}
	if(spell1 == "Fire" && spell2 == "Fire"){
		spell = "Inferno";
	}
	if((spell1 == "Fire" && spell2 == "Ice") || (spell1 == "Ice" && spell2 == "Fire")){
		spell = "Frozen Fireball";
	}
	if(spell1 == "Ice" && spell2 == "Ice"){
		spell = "Absolute Zero";
	}
	if(spell1 == "Earth" && spell2 == "Earth"){
		spell = "Synthesis";
	}
	if((spell1 == "Earth" && spell2 == "Fire") || (spell2 == "Earth" && spell1 == "Fire")){
		spell = "Fire and Heal";
	}
	if((spell1 == "Earth" && spell2 == "Ice") || (spell2 == "Earth" && spell1 == "Ice")){
		spell = "Ice and Heal";
	}
	if(spell1 == "Lightning" && spell2 == "Lightning"){
		spell = "Chain Lightning";
	}
	if((spell1 == "Earth" && spell2 == "Lightning") || (spell2 == "Earth" && spell1 == "Lightning")){
		spell = "Lightning and Heal";
	}
	if((spell1 == "Fire" && spell2 == "Lightning") || (spell2 == "Fire" && spell1 == "Lightning")){
		spell = "Ragnarok";
	}
	if((spell1 == "Ice" && spell2 == "Lightning") || (spell2 == "Ice" && spell1 == "Lightning")){
		spell = "Frozen Web";
	}
	if(spell1 == "Air" && spell2 == "Air"){
		spell = "Twister";
	}
	if((spell1 == "Fire" && spell2 == "Air") || (spell2 == "Fire" && spell1 == "Air")){
		spell = "Fire Wave";
	}
	if((spell1 == "Ice" && spell2 == "Air") || (spell2 == "Ice" && spell1 == "Air")){
		spell = "Maelstrom";
	}
	if((spell1 == "Earth" && spell2 == "Air") || (spell2 == "Earth" && spell1 == "Air")){
		spell = "Dash and Heal";
	}
	if((spell1 == "Lightning" && spell2 == "Air") || (spell2 == "Lightning" && spell1 == "Air")){
		spell = "Thunderstorm";
	}
	if(spell1 == "Mystic" && spell2 == "Mystic"){
		spell = "Mirage";
	}
	if((spell1 == "Fire" && spell2 == "Mystic") || (spell2 == "Fire" && spell1 == "Mystic")){
		spell = "Explosive Shots";
	}
	if((spell1 == "Ice" && spell2 == "Mystic") || (spell2 == "Ice" && spell1 == "Mystic")){
		spell = "Ice Shots";
	}
	if((spell1 == "Earth" && spell2 == "Mystic") || (spell2 == "Earth" && spell1 == "Mystic")){
		spell = "Teleport and Heal";
	}
	if((spell1 == "Lightning" && spell2 == "Mystic") || (spell2 == "Lightning" && spell1 == "Mystic")){
		spell = "Conductive Shots";
	}
	if((spell1 == "Air" && spell2 == "Mystic") || (spell2 == "Air" && spell1 == "Mystic")){
		spell = "Homing Shots";
	}
	if(spell1 == "Water" && spell2 == "Water"){
		spell = "Heavy Bubble Shield";
	}
	if((spell1 == "Water" && spell2 == "Fire") || (spell2 == "Water" && spell1 == "Fire")){
		spell = "Explosive Orbs";
	}
	if((spell1 == "Water" && spell2 == "Ice") || (spell2 == "Water" && spell1 == "Ice")){
		spell = "Frozen Orbs";
	}
	if((spell1 == "Water" && spell2 == "Earth") || (spell2 == "Water" && spell1 == "Earth")){
		spell = "Bubble Shield and Heal";
	}
	if((spell1 == "Water" && spell2 == "Lightning") || (spell2 == "Water" && spell1 == "Lightning")){
		spell = "Zap Trap";
	}
	if((spell1 == "Water" && spell2 == "Air") || (spell2 == "Water" && spell1 == "Air")){
		spell = "Bubble Blast";
	}
	if((spell1 == "Water" && spell2 == "Mystic") || (spell2 == "Water" && spell1 == "Mystic")){
		spell = "Bubblebeam";
	}
	if(spell1 == "Dark" && spell2 == "Dark"){
		spell = "Deathbound";
	}
	if((spell1 == "Dark" && spell2 == "Fire") || (spell2 == "Dark" && spell1 == "Fire")){
		spell = "Flame Trap";
	}
	if((spell1 == "Dark" && spell2 == "Ice") || (spell2 == "Dark" && spell1 == "Ice")){
		spell = "Ice Trap";
	}
	if((spell1 == "Dark" && spell2 == "Earth") || (spell2 == "Dark" && spell1 == "Earth")){
		spell = "Moonlight";
	}
	if((spell1 == "Dark" && spell2 == "Lightning") || (spell2 == "Dark" && spell1 == "Lightning")){
		spell = "Static Field";
	}
	if((spell1 == "Dark" && spell2 == "Air") || (spell2 == "Dark" && spell1 == "Air")){
		spell = "Boosters";
	}
	if((spell1 == "Dark" && spell2 == "Mystic") || (spell2 == "Dark" && spell1 == "Mystic")){
		spell = "Piercing Shots";
	}
	if((spell1 == "Dark" && spell2 == "Water") || (spell2 == "Dark" && spell1 == "Water")){
		spell = "Shadow Cloak";
	}
	if(darkwater.onScreen == 1){
		spell = "Shield Charge";
	}
	if(spell1 == "Fire"){
		spell1pic = Firebox;
	}
	else if(spell1 == "Ice"){
		spell1pic = Icebox;
	}
	else if(spell1 == "Earth"){
		spell1pic = Earthbox;
	}
	else if(spell1 == "Lightning"){
		spell1pic = Thunderbox;
	}
	else if(spell1 == "Air"){
		spell1pic = Windbox;
	}
	else if(spell1 == "Mystic"){
		spell1pic = Mysticbox;
	}
	else if(spell1 == "Water"){
		spell1pic = Waterbox;
	}
	else if(spell1 == "Dark"){
		spell1pic = Darkbox;
	}		
	else{
		spell1pic = "N/A";
	}
	if(spell2 == "Fire"){
		spell2pic = Firebox;
	}
	else if(spell2 == "Ice"){
		spell2pic = Icebox;
	}
	else if(spell2 == "Earth"){
		spell2pic = Earthbox;
	}
	else if(spell2 == "Lightning"){
		spell2pic = Thunderbox;
	}
	else if(spell2 == "Air"){
		spell2pic = Windbox;
	}
	else if(spell2 == "Mystic"){
		spell2pic = Mysticbox;
	}
	else if(spell2 == "Water"){
		spell2pic = Waterbox;
	}
	else if(spell2 == "Dark"){
		spell2pic = Darkbox;
	}
	else{
		spell2pic = "N/A";
	}
	// Text
	ctx.fillStyle = "black";
	if(darkearth.blackTimer > 0){
		ctx.fillStyle = "white";
	}
	ctx.font = "18pt Arial";
	ctx.fillText("Spell:", 32, 512);
	ctx.strokeStyle = "#000000";
	if(darkearth.blackTimer > 0){
		ctx.strokeStyle = "white";
	}
	ctx.strokeRect(92, 476, 32, 48);
	ctx.strokeRect(124, 476, 32, 48);
	if(spell1pic != "N/A"){
		ctx.drawImage(spell1pic, 90, 484);
	}
	if(spell2pic != "N/A"){
		ctx.drawImage(spell2pic, 122, 484);
	}
	ctx.fillText("= " + spell, 160, 512);
	// Recharge
	if(spell == "Fire"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(fire.cd/30) + "s", 32, 544);
	}
	else if(spell == "Inferno"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(fire2.cd/30) + "s", 32, 544);
	}
	else if(spell == "Frozen Fireball"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(fireice.cd/30) + "s", 32, 544);
	}
	else if(spell == "Ice"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(ice.cd/30) + "s", 32, 544);
	}
	else if(spell == "Absolute Zero"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(ice2.cd/30) + "s", 32, 544);
	}
	else if(spell == "Earth Heal"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(earth.cd/30) + "s", 32, 544);
	}
	else if(spell == "Synthesis"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(earth2.cd/30) + "s", 32, 544);
	}
	else if(spell == "Fire and Heal"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(fireheal.cd/30) + "s", 32, 544);
	}
	else if(spell == "Ice and Heal"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(iceheal.cd/30) + "s", 32, 544);
	}
	else if(spell == "Lightning"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(lightning.cd/30) + "s", 32, 544);
	}
	else if(spell == "Chain Lightning"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(lightning2.cd/30) + "s", 32, 544);
	}
	else if(spell == "Frozen Web"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(icelightning.cd/30) + "s", 32, 544);
	}
	else if(spell == "Ragnarok"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(firelightning.cd/30) + "s", 32, 544);
	}
	else if(spell == "Lightning and Heal"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(lightningheal.cd/30) + "s", 32, 544);
	}
	else if(spell == "Dash"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(air.cd/30) + "s", 32, 544);
	}
	else if(spell == "Twister"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(air2.cd/30) + "s", 32, 544);
	}
	else if(spell == "Fire Wave"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(airfire.cd/30) + "s", 32, 544);
	}
	else if(spell == "Maelstrom"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(airice.cd/30) + "s", 32, 544);
	}
	else if(spell == "Dash and Heal"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(airearth.cd/30) + "s", 32, 544);
	}
	else if(spell == "Thunderstorm"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(airlightning.cd/30) + "s", 32, 544);
	}
	else if(spell == "Teleport"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(mystic.cd/30) + "s", 32, 544);
	}
	else if(spell == "Mirage"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(mystic2.cd/30) + "s", 32, 544);
	}
	else if(spell == "Teleport and Heal"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(mysticearth.cd/30) + "s", 32, 544);
	}
	else if(spell == "Explosive Shots"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(mystic.cd/30) + "s", 32, 544);
	}
	else if(spell == "Ice Shots"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(mystic.cd/30) + "s", 32, 544);
	}
	else if(spell == "Conductive Shots"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(mystic.cd/30) + "s", 32, 544);
	}
	else if(spell == "Homing Shots"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(mystic.cd/30) + "s", 32, 544);
	}
	else if(spell == "Bubble Shield"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(water.cd/30) + "s", 32, 544);
	}
	else if(spell == "Heavy Bubble Shield"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(water.cd/30) + "s", 32, 544);
	}
	else if(spell == "Explosive Orbs"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(waterfire.cd/30) + "s", 32, 544);
	}
	else if(spell == "Frozen Orbs"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(waterfire.cd2/30) + "s", 32, 544);
	}
	else if(spell == "Bubble Shield and Heal"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(waterearth.cd/30) + "s", 32, 544);
	}
	else if(spell == "Zap Trap"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(waterlightning.cd/30) + "s", 32, 544);
	}
	else if(spell == "Bubble Blast"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(waterair.cd/30) + "s", 32, 544);
	}
	else if(spell == "Bubblebeam"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(mystic.cd/30) + "s", 32, 544);
	}
	else if(spell == "Traps"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(dark.cd/30) + "s Traps: " + dark.inventory, 32, 544);
	}
	else if(spell == "Deathbound"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(dark2.cd/30) + "s", 32, 544);
	}
	else if(spell == "Flame Trap"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(darkfire.cd/30) + "s Traps: " + darkfire.inventory, 32, 544);
	}
	else if(spell == "Ice Trap"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(darkice.cd/30) + "s Traps: " + darkice.inventory, 32, 544);
	}
	else if(spell == "Moonlight"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(darkearth.cd/30) + "s", 32, 544);
	}
	else if(spell == "Static Field"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(darklightning.cd/30) + "s Traps: " + darklightning.inventory, 32, 544);
	}
	else if(spell == "Boosters"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(darkair.cd/30) + "s Boosters: " + darkair.inventory, 32, 544);
	}
	else if(spell == "Piercing Shots"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(mystic.cd/30) + "s", 32, 544);
	}
	else if(spell == "Shadow Cloak" || spell == "Shield Charge"){
		ctx.font = "16pt Arial";
		ctx.fillText("Recharge: " + Math.round(darkwater.cd/30) + "s", 32, 544);
	}
	ctx.fillStyle = "black";
	if(darkearth.blackTimer > 0){
		ctx.fillStyle = "white";
	}
	ctx.font = "16pt Arial";
	if(dispCntrls == 2){
		ctx.fillText("Q: Drop Spell 1", 576, 496);
		ctx.fillText("E: Drop Spell 2", 576, 528);
		ctx.fillText("Spacebar: Use spell", 576, 464);
		ctx.fillText("P: Pause", 576, 560);
	}
}
//----------------------------------------------------- Score -----------------------------------------------------------------------//
function SCORE(){
	ctx.fillStyle = "black";
	if(darkearth.blackTimer > 0){
		ctx.fillStyle = "white";
	}
	ctx.font = "18pt Arial";
	ctx.fillText("Score: " + score, 32, 48);
}

//--------------------------------------------- Keys and Activation -----------------------------------------------------------------//
// Key bindings
var keys = function(){
	if(keytimer > 0){
		keytimer-=1;
	}
	if(STATE == "PAUSE"){
		if (80 in keysDown && keytimer == 0){
			STATE = preSTATE;
			keytimer = 20;
			ctx.globalAlpha = Alpha;
		}
	}
	else if(player.hp>0){
		var Up = true;
		var Down = true;
		var Left = true;
		var Right = true;
		if (80 in keysDown && keytimer == 0){
			preSTATE = STATE;
			STATE = "PAUSE";
			keytimer = 20;
		}
		if (87 in keysDown && player.dirct <= 0){
			player.dir = "W";
		}
		if (65 in keysDown && player.dirct <= 0){
			player.dir = "A";
		}
		if (83 in keysDown && player.dirct <= 0){
			player.dir = "S";
		}
		if (68 in keysDown && player.dirct <= 0){
			player.dir = "D";
		}
		if(87 in keysDown && player.dirct <= 0){
			for(O in ObsList){
				if(collision("W", player, ObsList[O])){
					Up = false;
				}
			}
		}
		if(68 in keysDown && player.dirct <= 0){
			for(O in ObsList){
				if(collision("D", player, ObsList[O])){
					Right = false;
				}
			}
		}
		if(83 in keysDown && player.dirct <= 0){
			for(O in ObsList){
				if(collision("S", player, ObsList[O])){
					Down = false;
				}
			}
		}
		if(65 in keysDown && player.dirct <= 0){
			for(O in ObsList){
				if(collision("A", player, ObsList[O])){
					Left = false;
				}
			}
		}
		if ((87 in keysDown || (player.dirct > 0 && player.dir == "W")) && player.y - player.speed > 4 && Up == true){
			if(player.dirct <= 0 || player.dir == "W"){
				player.y-=player.speed;
				for(W in bubbleRotate){
					if(bubbleRotate[W].onScreen == 1){
						bubbleRotate[W].y-=player.speed;
					}
				}
				for(W in wairParticles){
					if(wairParticles[W].onScreen == 1){
						wairParticles[W].y-=player.speed;
					}
				}
				player.dir = "W";
			}
		}
		if ((65 in keysDown || (player.dirct > 0 && player.dir == "A")) && player.x - player.speed > 4 && Left == true){
			if(player.dirct <= 0 || player.dir == "A"){
				player.x-=player.speed;
				for(W in bubbleRotate){
					if(bubbleRotate[W].onScreen == 1){
						bubbleRotate[W].x-=player.speed;
					}
				}
				for(W in wairParticles){
					if(wairParticles[W].onScreen == 1){
						wairParticles[W].x-=player.speed;
					}
				}
				player.dir = "A";
			}
		}
		if ((83 in keysDown || (player.dirct > 0 && player.dir == "S")) && player.y + player.speed < canvas.height - 4 && Down == true){
			if(player.dirct <= 0 || player.dir == "S"){
				player.y+=player.speed;
				for(W in bubbleRotate){
					if(bubbleRotate[W].onScreen == 1){
						bubbleRotate[W].y+=player.speed;
					}
				}
				for(W in wairParticles){
					if(wairParticles[W].onScreen == 1){
						wairParticles[W].y+=player.speed;
					}
				}
				player.dir = "S";
			}
		}
		if ((68 in keysDown || (player.dirct > 0 && player.dir == "D")) && player.x + player.speed < canvas.width - 4 && Right == true){
			if(player.dirct <= 0 || player.dir == "D"){
				player.x+=player.speed;
				for(W in bubbleRotate){
					if(bubbleRotate[W].onScreen == 1){
						bubbleRotate[W].x+=player.speed;
					}
				}
				for(W in wairParticles){
					if(wairParticles[W].onScreen == 1){
						wairParticles[W].x+=player.speed;
					}
				}
				player.dir = "D";
			}
		}
		if (37 in keysDown && 38 in keysDown){
			bullet.shoot("WA", 4, 4);
		}	
		if (37 in keysDown && 40 in keysDown){
			bullet.shoot("AS", 4, 4);
		}	
		if (39 in keysDown && 40 in keysDown){
			bullet.shoot("SD", 4, 4);
		}	
		if (38 in keysDown && 39 in keysDown){
			bullet.shoot("WD", 4, 4);
		}	
		if (38 in keysDown){
			bullet.shoot("W", 32, 4);
		}	
		if (37 in keysDown){
			bullet.shoot("A", 4, 32);
		}	
		if (40 in keysDown){
			bullet.shoot("S", 32, 4);
		}	
		if (39 in keysDown){
			bullet.shoot("D", 4, 32);
		}
		if(81 in keysDown){
			if(spell1 != "N/A"){
				spell1 = "N/A";
				spell = spell2;
			}
		}
		if(69 in keysDown){
			if(spell2 != "N/A"){
				spell2 = "N/A";
				spell = spell1;
			}
		}
		if(32 in keysDown && spell1 != "N/A" && spell2 == "N/A"){
			if(spell1 == "Fire"){
				fire.shoot();
			}
			if(spell1 == "Ice"){
				ice.shoot();
			}
			if(spell1 == "Earth"){
				earth.shoot();
			}
			if(spell1 == "Lightning"){
				lightning.shoot();
			}
			if(spell1 == "Air"){
				air.shoot();
			}
			if(spell1 == "Mystic"){
				mystic.shoot();
			}
			if(spell1 == "Water"){
				water.shoot();
			}
			if(spell1 == "Dark"){
				dark.shoot();
			}
		}
		if(32 in keysDown && spell2 != "N/A" && spell1 == "N/A"){
			if(spell2 == "Fire"){
				fire.shoot();
			}
			if(spell2 == "Ice"){
				ice.shoot();
			}
			if(spell2 == "Earth"){
				earth.shoot();
			}
			if(spell2 == "Lightning"){
				lightning.shoot();
			}
			if(spell2 == "Air"){
				air.shoot();
			}
			if(spell2 == "Mystic"){
				mystic.shoot();
			}
			if(spell2 == "Water"){
				water.shoot();
			}
			if(spell2 == "Dark"){
				dark.shoot();
			}
		}
		if(32 in keysDown && spell1 != "N/A" && spell2 != "N/A"){
			if(spell1 == "Fire" && spell2 == "Fire"){
				fire2.shoot();
			}
			if((spell1 == "Ice" && spell2 == "Fire") || (spell1 == "Fire" && spell2 == "Ice")){
				fireice.shoot();
			}
			if(spell1 == "Ice" && spell2 == "Ice"){
				ice2.shoot();
			}
			if(spell1 == "Earth" && spell2 == "Earth"){
				earth2.shoot();
			}
			if((spell1 == "Earth" && spell2 == "Ice") || (spell2 == "Earth" && spell1 == "Ice")){
				iceheal.shoot();
			}
			if((spell1 == "Fire" && spell2 == "Earth") || (spell2 == "Fire" && spell1 == "Earth")){
				fireheal.shoot();
			}
			if(spell1 == "Lightning" && spell2 == "Lightning"){
				lightning2.shoot();
			}
			if((spell1 == "Fire" && spell2 == "Lightning") || (spell2 == "Fire" && spell1 == "Lightning")){
				firelightning.shoot();
			}
			if((spell1 == "Ice" && spell2 == "Lightning") || (spell2 == "Ice" && spell1 == "Lightning")){
				icelightning.shoot();
			}
			if((spell1 == "Earth" && spell2 == "Lightning") || (spell2 == "Earth" && spell1 == "Lightning")){
				lightningheal.shoot();
			}
			if(spell1 == "Air" && spell2 == "Air"){
				air2.shoot();
			}
			if((spell1 == "Air" && spell2 == "Fire") || (spell2 == "Air" && spell1 == "Fire")){
				airfire.shoot();
			}
			if((spell1 == "Air" && spell2 == "Ice") || (spell2 == "Air" && spell1 == "Ice")){
				airice.shoot();
			}
			if((spell1 == "Air" && spell2 == "Lightning") || (spell2 == "Air" && spell1 == "Lightning")){
				airlightning.shoot();
			}
			if((spell1 == "Air" && spell2 == "Earth") || (spell2 == "Air" && spell1 == "Earth")){
				airearth.shoot();
			}
			if(spell1 == "Mystic" && spell2 == "Mystic"){
				mystic2.shoot();
			}
			if((spell1 == "Mystic" && spell2 == "Earth") || (spell2 == "Mystic" && spell1 == "Earth")){
				mysticearth.shoot();
			}
			if((spell1 == "Mystic" && spell2 == "Fire") || (spell2 == "Mystic" && spell1 == "Fire")){
				mystic.shoot();
			}
			if((spell1 == "Mystic" && spell2 == "Ice") || (spell2 == "Mystic" && spell1 == "Ice")){
				mystic.shoot();
			}
			if((spell1 == "Mystic" && spell2 == "Lightning") || (spell2 == "Mystic" && spell1 == "Lightning")){
				mystic.shoot();
			}
			if((spell1 == "Mystic" && spell2 == "Air") || (spell2 == "Mystic" && spell1 == "Air")){
				mystic.shoot();
			}
			if(spell1 == "Water" && spell2 == "Water"){
				water.shoot();
			}
			if((spell1 == "Water" && spell2 == "Earth") || (spell2 == "Water" && spell1 == "Earth")){
				waterearth.shoot();
			}
			if((spell1 == "Water" && spell2 == "Fire") || (spell2 == "Water" && spell1 == "Fire")){
				waterfire.shoot();
			}
			if((spell1 == "Water" && spell2 == "Ice") || (spell2 == "Water" && spell1 == "Ice")){
				waterfire.shoot();
			}
			if((spell1 == "Water" && spell2 == "Lightning") || (spell2 == "Water" && spell1 == "Lightning")){
				waterlightning.shoot();
			}
			if((spell1 == "Water" && spell2 == "Air") || (spell2 == "Water" && spell1 == "Air")){
				waterair.shoot();
			}
			if((spell1 == "Water" && spell2 == "Mystic") || (spell2 == "Water" && spell1 == "Mystic")){
				mystic.shoot();
			}
			if(spell1 == "Dark" && spell2 == "Dark"){
				dark2.shoot();
			}
			if((spell1 == "Dark" && spell2 == "Earth") || (spell2 == "Dark" && spell1 == "Earth")){
				darkearth.shoot();
			}
			if((spell1 == "Dark" && spell2 == "Fire") || (spell2 == "Dark" && spell1 == "Fire")){
				darkfire.shoot();
			}
			if((spell1 == "Dark" && spell2 == "Ice") || (spell2 == "Dark" && spell1 == "Ice")){
				darkice.shoot();
			}
			if((spell1 == "Dark" && spell2 == "Lightning") || (spell2 == "Dark" && spell1 == "Lightning")){
				darklightning.shoot();
			}
			if((spell1 == "Dark" && spell2 == "Air") || (spell2 == "Dark" && spell1 == "Air")){
				darkair.shoot();
			}
			if((spell1 == "Dark" && spell2 == "Mystic") || (spell2 == "Dark" && spell1 == "Mystic")){
				mystic.shoot();
			}
			if((spell1 == "Dark" && spell2 == "Water") || (spell2 == "Dark" && spell1 == "Water")){
				darkwater.shoot();
			}
		}
	}
};
//-------------------------------------------------------------- Game Over ----------------------------------------------------------//
//array of init
var inits = {1: "_", 2: "_", 3: "_", 4: "_", 5: "_", 6: "_", 7: "_", 8: "_"};
var init = "_____";
var initsInd = 1;
var hsColor = 1;
var hsNum = 0;
var wait = 0;
var lowestScore = highscore5;
function gameOver(){
	ctx.fillStyle = "white";
	ctx.globalAlpha = 1;
	ctx.font = "14pt Arial";
	var bx = 350;
	var by = 560;
	var width = 20;
	var height = 20;
	init = inits[1] + inits[2] + inits[3] + inits[4] + inits[5] + inits[6] + inits[7] + inits[8];
	multiplier = 1;
	if(wait > 0){
		wait-=1;
	}
	if(STATE != 5){
		ctx.fillText("Score: " + score, 320, 144);
		if(score > lowestScore){
			if(initsInd <= 8 && wait <= 0){
				inits[initsInd] = printAlphabet();
				if(inits[initsInd] != "_"){
					initsInd++;
					wait = 4;
				}
			}
			if(13 in keysDown){
				for(H in inits){
					if(inits[H] == "_"){
						inits[H] = " ";
					}
				}
				wait = 4;
				initsInd = 9;
			}
			if(8 in keysDown && wait <= 0){
				initsInd--;
				inits[initsInd] = "_";
				wait = 4;
			}
		}
		else{
			var init = " ";
		}
	}
	if(highscore1 < score && nu == 1){
		$.jStorage.set("v70highscore5",highscore4);
		$.jStorage.set("v70hs5init",hs4init);
		highscore5 = highscore4;
		hs5init = hs4init;
		$.jStorage.set("v70highscore4",highscore3);
		$.jStorage.set("v70hs4init",hs3init);
		hs4init = hs3init;
		highscore4 = highscore3;
		$.jStorage.set("v70highscore3",highscore2);
		highscore3 = highscore2;
		$.jStorage.set("v70hs3init",hs2init);
		hs3init = hs2init;
		$.jStorage.set("v70highscore2",highscore1);
		highscore2 = highscore1;
		$.jStorage.set("v70hs2init",hs1init);
		hs2init = hs1init;
		$.jStorage.set("v70highscore1",score);
		highscore1 = score;
		hs = 1;
		nu = 0;
		hsNum = 1;
	}
	else if(highscore2 < score && nu == 1){
		$.jStorage.set("v70highscore5",highscore4);
		highscore5 = highscore4;
		$.jStorage.set("v70hs5init",hs4init);
		hs5init = hs4init;
		$.jStorage.set("v70highscore4",highscore3);
		highscore4 = highscore3;
		$.jStorage.set("v70hs4init",hs3init);
		hs4init = hs3init;
		$.jStorage.set("v70highscore3",highscore2);
		highscore3 = highscore2;
		$.jStorage.set("v70hs3init",hs2init);
		hs3init = hs2init;
		$.jStorage.set("v70highscore2",score);
		highscore2 = score;
		hs = 1;
		nu = 0;
		hsNum = 2;
	}
	else if(highscore3 < score && nu == 1){
		$.jStorage.set("v70highscore5",highscore4);
		highscore5 = highscore4;
		$.jStorage.set("v70hs5init",hs4init);
		hs5init = hs4init;
		$.jStorage.set("v70highscore4",highscore3);
		highscore4 = highscore3;
		$.jStorage.set("v70hs4init",hs3init);
		hs4init = hs3init;
		$.jStorage.set("v70highscore3",score);
		highscore3 = score;
		hs = 1;
		nu = 0;
		hsNum = 3;
	}
	else if(highscore4 < score && nu == 1){
		$.jStorage.set("v70highscore5",highscore4);
		highscore5 = highscore4;
		$.jStorage.set("v70hs5init",hs4init);
		hs5init = hs4init;
		$.jStorage.set("v70highscore4",score);
		highscore4 = score;
		hs = 1;
		nu = 0;
		hsNum = 4;
	}
	else if(highscore5 < score && nu == 1){
		$.jStorage.set("v70highscore5",score);
		highscore5 = score;
		hs = 1;
		nu = 0;
		hsNum = 5;
	}
	if(hsNum == 1){
		$.jStorage.set("v70hs1init",init);
		hs1init = init;
	}
	if(hsNum == 2){
		$.jStorage.set("v70hs2init",init);
		hs2init = init;
	}
	if(hsNum == 3){
		$.jStorage.set("v70hs3init",init);
		hs3init = init;
	}
	if(hsNum == 4){
		$.jStorage.set("v70hs4init",init);
		hs4init = init;
	}
	if(hsNum == 5){
		$.jStorage.set("v70hs5init",init);
		hs5init = init;
	}
	if(hs == 1){
		ctx.fillStyle = colorz[hsColor];
		hsColor++;
		if(hsColor > 6){
			hsColor = 1;
		}
		ctx.font = "18pt Arial";
		if(!(score > gscore5)){
			ctx.fillText("New High Score! Please Enter Your Name!", 176, 64);
		}
		else{
			ctx.fillText("New Global High Score!", 240, 32);
			ctx.fillText("Enter Your Name and Submit!", 240, 64);
		}
	}
	ctx.fillStyle = "white";
	ctx.strokeStyle = "white";
	ctx.font = "18pt Arial";
	ctx.fillText("Version 0.7.0 Alpha: May 6 2012", 244, 96);
	ctx.fillText("Personal High Scores:", 128, 208);
	ctx.fillText("Global High Scores:", 450, 208);
	ctx.font = "16pt Arial";
	if(hsNum == 1){
		ctx.fillStyle = colorz[hsColor];
	}
	ctx.fillText("1st: " + highscore1 + "    " + hs1init, 128, 240);
	ctx.fillStyle = "white";
	if(hsNum == 2){
		ctx.fillStyle = colorz[hsColor];
	}
	ctx.fillText("2nd: " + highscore2 + "    " + hs2init, 128, 272);
	ctx.fillStyle = "white";
	if(hsNum == 3){
		ctx.fillStyle = colorz[hsColor];
	}
	ctx.fillText("3rd: " + highscore3 + "    " + hs3init, 128, 304);
	ctx.fillStyle = "white";
	if(hsNum == 4){
		ctx.fillStyle = colorz[hsColor];
	}
	ctx.fillText("4th: " + highscore4 + "    " + hs4init, 128, 336);
	ctx.fillStyle = "white";
	if(hsNum == 5){
		ctx.fillStyle = colorz[hsColor];
	}
	ctx.fillText("5th: " + highscore5 + "    " + hs5init, 128, 368);
	//Global scores
	//remove underscores
	var gnamez1 = gname1.split('');
	for(H in gnamez1){
		if(gnamez1[H] == "_"){
			gnamez1[H] = " ";
		}
	}
	gname1 = gnamez1[0] + gnamez1[1] + gnamez1[2] + gnamez1[3] + gnamez1[4] + gnamez1[5] + gnamez1[6] + gnamez1[7];
	var gnamez2 = gname2.split('');
	for(H in gnamez2){
		if(gnamez2[H] == "_"){
			gnamez2[H] = " ";
		}
	}
	gname2 = gnamez2[0] + gnamez2[1] + gnamez2[2] + gnamez2[3] + gnamez2[4] + gnamez2[5] + gnamez2[6] + gnamez2[7];
	var gnamez3 = gname3.split('');
	for(H in gnamez3){
		if(gnamez3[H] == "_"){
			gnamez3[H] = " ";
		}
	}
	gname3 = gnamez3[0] + gnamez3[1] + gnamez3[2] + gnamez3[3] + gnamez3[4] + gnamez3[5] + gnamez3[6] + gnamez3[7];
	var gnamez4 = gname4.split('');
	for(H in gnamez4){
		if(gnamez4[H] == "_"){
			gnamez4[H] = " ";
		}
	}
	gname4 = gnamez4[0] + gnamez4[1] + gnamez4[2] + gnamez4[3] + gnamez4[4] + gnamez4[5] + gnamez4[6] + gnamez4[7];
	var gnamez5 = gname5.split('');
	for(H in gnamez5){
		if(gnamez5[H] == "_"){
			gnamez5[H] = " ";
		}
	}
	gname5 = gnamez5[0] + gnamez5[1] + gnamez5[2] + gnamez5[3] + gnamez5[4] + gnamez5[5] + gnamez5[6] + gnamez5[7];
	ctx.fillStyle = "white";
	ctx.fillText("1st: " + gscore1 + "    " + gname1, 450, 240);
	ctx.fillText("2nd: " + gscore2 + "    " + gname2, 450, 272);
	ctx.fillText("3rd: " + gscore3 + "    " + gname3, 450, 304);
	ctx.fillText("4th: " + gscore4 + "    " + gname4, 450, 336);
	ctx.fillText("5th: " + gscore5 + "    " + gname5, 450, 368);
	ctx.fillStyle = "white";
	ctx.font = "16pt Arial";
	if(score > gscore5){
		ctx.fillStyle = colorz[hsColor];
		ctx.fillText("Submit", bx-8, by);
	}
	else{
		ctx.fillText("Back", bx, by);
	}
	if(hX >= bx-10 && hX <=bx + 50 && hY <= by && hY>=by-height*7/6){
		ctx.strokeRect(bx-10, by-height*7/6, width * 3 + 10, height+10);
	}
	if((cX >= bx-10 && cX <=bx + 50 && cY <= by && cY>=by-height*7/6) || ((13 in keysDown || 32 in keysDown) && wait <= 0 && STATE==5)){
		cX=0;
		cY=0;
		fastbeepsLow.currentTime=0;
		fastbeepsLow.play();
		if(STATE == 4){
			if(score > gscore5){
				phpwindow = window.open("submit.php?name=" + init + "&score=" + score + "&hash=" + Stacktrace(score));
				setTimeout("phpwindow.close()",500);
			}
			reset();
		}
		else{
			STATE = 0;
		}
		Menu.scoreSelect = true;
	} 
}
//---------------------------------------------------------- Alphabet Print ---------------------------------------------------------//
function printAlphabet(){
	if(65 in keysDown){
		return "A";
	}
	else if(66 in keysDown){
		return "B";
	}
	else if(67 in keysDown){
		return "C";
	}
	else if(68 in keysDown){
		return "D";
	}
	else if(69 in keysDown){
		return "E";
	}
	else if(70 in keysDown){
		return "F";
	}
	else if(71 in keysDown){
		return "G";
	}
	else if(72 in keysDown){
		return "H";
	}
	else if(73 in keysDown){
		return "I";
	}
	else if(74 in keysDown){
		return "J";
	}
	else if(75 in keysDown){
		return "K";
	}
	else if(76 in keysDown){
		return "L";
	}
	else if(77 in keysDown){
		return "M";
	}
	else if(78 in keysDown){
		return "N";
	}
	else if(79 in keysDown){
		return "O";
	}
	else if(80 in keysDown){
		return "P";
	}
	else if(81 in keysDown){
		return "Q";
	}
	else if(82 in keysDown){
		return "R";
	}
	else if(83 in keysDown){
		return "S";
	}
	else if(84 in keysDown){
		return "T";
	}
	else if(85 in keysDown){
		return "U";
	}
	else if(86 in keysDown){
		return "V";
	}
	else if(87 in keysDown){
		return "W";
	}
	else if(88 in keysDown){
		return "X";
	}
	else if(89 in keysDown){
		return "Y";
	}
	else if(90 in keysDown){
		return "Z";
	}
	else{
		return "_";
	}
}		
//---------------------------------------------------------- Music Player -----------------------------------------------------------//
function MusicPlayer(){
if(Music==2 && STATE != "PAUSE"){
	if(STATE == 1 && treeWizz.onScreen == 0 && Dragon.onScreen == 0){
		DumblebeatsNormal.pause();
		Spells.pause();
		BadWizards.pause();
		CaseysQuest.pause();
		OverwhelmedByGoblins.play();
	}
	else if(STATE == "Jungle"){
		OverwhelmedByGoblins.pause();
		Spells.pause();
		BadWizards.pause();
		CaseysQuest.pause();
		DumblebeatsNormal.play();
	}
	else if(treeWizz.onScreen==1){
		OverwhelmedByGoblins.pause();
		Spells.pause();
		DumblebeatsNormal.pause();
		CaseysQuest.pause();
		BadWizards.play();
	}
	else if(Dragon.onScreen==1){
		OverwhelmedByGoblins.pause();
		Spells.pause();
		DumblebeatsNormal.pause();
		CaseysQuest.pause();
		BadWizards.play();
	}
	else if(STATE=="Scorched"){
		OverwhelmedByGoblins.pause();
		Spells.pause();
		DumblebeatsNormal.pause();
		BadWizards.pause();
		CaseysQuest.play();
	}
	else{
		DumblebeatsNormal.pause();
		OverwhelmedByGoblins.pause();
		BadWizards.pause();
		CaseysQuest.pause();
		Spells.play();
	}
}
}
//---------------------------------------------------------- Big-Bang ---------------------------------------------------------------//
setInterval(function(){
	clear();
	MusicPlayer();
	if(STATE == 0){
		Menu.draw();
		if(dim == 2){
			ctx.globalAlpha = Alpha*0.25;
			ctx.fillStyle = "#FF0000";
			ctx.fillRect(0,0,400,576);
			ctx.fillStyle = "#000099";
			ctx.fillRect(400,0,400,576);
			ctx.globalAlpha = Alpha;
		}
	}
	else if(STATE == 2){
		Info.draw();
		if(dim == 2){
			ctx.globalAlpha = Alpha*0.25;
			ctx.fillStyle = "#FF0000";
			ctx.fillRect(0,0,400,576);
			ctx.fillStyle = "#000099";
			ctx.fillRect(400,0,400,576);
			ctx.globalAlpha = Alpha;
		}
	}
	else if(STATE == 3){
		Credits.draw();
		if(dim == 2){
			ctx.globalAlpha = Alpha*0.25;
			ctx.fillStyle = "#FF0000";
			ctx.fillRect(0,0,400,576);
			ctx.fillStyle = "#000099";
			ctx.fillRect(400,0,400,576);
			ctx.globalAlpha = Alpha;
		}
	}
	else if(STATE == 4 || STATE == 5){
		gameOver();
		if(dim == 2){
			ctx.globalAlpha = Alpha*0.25;
			ctx.fillStyle = "#FF0000";
			ctx.fillRect(0,0,400,576);
			ctx.fillStyle = "#000099";
			ctx.fillRect(400,0,400,576);
			ctx.globalAlpha = Alpha;
		}
	}
	else if(STATE == "PAUSE"){
		keys();
		Pause.draw();
		if(dim == 2){
			ctx.globalAlpha = Alpha*0.25;
			ctx.fillStyle = "#FF0000";
			ctx.fillRect(0,0,400,576);
			ctx.fillStyle = "#000099";
			ctx.fillRect(400,0,400,576);
			ctx.globalAlpha = Alpha;
		}
	}
	else if(STATE == 6){
		Options.draw();
		if(dim == 2){
			ctx.globalAlpha = Alpha*0.25;
			ctx.fillStyle = "#FF0000";
			ctx.fillRect(0,0,400,576);
			ctx.fillStyle = "#000099";
			ctx.fillRect(400,0,400,576);
			ctx.globalAlpha = Alpha;
		}
	}
	else if(STATE == 1 || STATE == "Jungle" || STATE == "Scorched"){
		if(deathTimer > 0){
			deathTimer-=1;
		}
		if(deathTimer == 0){
			deathTimer-=1;
			STATE = 4;
		}
		else{
			if(STATE == "Jungle" || STATE == "Scorched"){
				StateTimer+=1;
			}
			//enemy pts change
			if(STATE == "Scorched"){
				Enemy.pts = 25;
				EnemyA.pts = 25;
				EnemyB.pts = 25;
				EnemyC.pts = 25;
			}
			ctx.globalAlpha = Alpha;
			keys();
			multiply();
			if(player.hp <= 0){
				if(nu != 1){
					deathTimer = 30;
					typemarker3.x = player.x-player.width/2 - 32;
					typemarker3.y = player.y-player.height/2;
					typemarker3.timeLeft = 30;
					typemarker3.text = "Dead!";
				}
				nu = 1;
			}
			else{
				player.draw();
				player.onhit();
			}
			rePlant();
			for(B in Boxes){
				Boxes[B].draw();
				pickup(Boxes[B]);
			}
			RandEffect.draw();
			for(H in hpParticles){
				hpParticles[H].draw();
				hpParticles[H].onHit();
				HpMove(hpParticles[H]);
				HpAi(hpParticles[H]);
			}
			for(B in Bullets){
				drawBullet(Bullets[B]);
				Bulletmove(Bullets[B]);
			}
			for(F in AllFire){
				AllFire[F].draw();
				AllFire[F].move();
			}
			ice.draw();
			ice.move();
			ice.effect();
			ice2.draw();
			ice2.move();
			ice2.effect();
			sIce.draw();
			sIce.move();
			sIce.effect();
		
			earth.draw();
			earth.move();
			for(R in earth2roots1){
				earth2roots1[R].draw();
			}
			for(R in earth3roots1){
				earth3roots1[R].draw();
			}
			earth2rootStrike.draw();
			earth2Move(earth2rootStrike);
			earth2AI(earth2rootStrike);
			earth2rootStrike2.draw();
			earth2Move(earth2rootStrike2);
			earth2AI(earth2rootStrike2);
			earth2rootStrike3.draw();
			earth2Move(earth2rootStrike3);
			earth2AI(earth2rootStrike3);
			earth2rootStrike4.draw();
			earth2Move(earth2rootStrike4);
			earth2AI(earth2rootStrike4);
			earth2rootStrike5.draw();
			earth2Move(earth2rootStrike5);
			earth2AI(earth2rootStrike5);
			earth2rootStrike6.draw();
			earth2Move(earth2rootStrike6);
			earth2AI(earth2rootStrike6);
			earth2rootStrike7.draw();
			earth2Move(earth2rootStrike7);
			earth2AI(earth2rootStrike7);
			earth2rootStrike8.draw();
			earth2Move(earth2rootStrike8);
			earth2AI(earth2rootStrike8);
			earth2.tick();
			//All Tick spells, in mystic class do to imports
			for(T in Ticks){
				Ticks[T].tick();
			}		
			lightning.draw();
			lightning.effect();
		
			lightning12.draw();
			lightning12.effect();
		
			lightning2.draw();
			lightning2.effect();
		
			lightning22.draw();
			lightning22.effect();
		
			lightning23.draw();
			lightning23.effect();
		
			firelightning.draw();
			firelightning.effect();
		
			icelightning.effect();
			horil.draw();
			vertil.draw();
			horil2.draw();
			vertil2.draw();
			horil3.draw();
			vertil3.draw();
			horil4.draw();
			vertil4.draw();
			horil5.draw();
			vertil5.draw();

			air.draw();
			air.effect();
			air2.draw();
			air2.effect();
			airfire.draw();
			airfire.effect();
			airfire12.draw();
			airfire12.effect();
			airfire13.draw();
			airfire13.effect();
			
			airice.draw();
			airice.effect();
			
			airlightning.draw();
			airlightning.effect();
			
			mystic.move();
			mystic.draw();
			Mice.draw();
			Mice.move();
			Mice2.draw();
			Mice2.move();
			Mice3.draw();
			Mice3.move();
			Mice4.draw();
			Mice4.move();
			mystic2.draw();
			mystic2.move();
			Illusion.draw();
			Illusion.shoot();
			IllusionBlast.draw();
			IllusionBlast.move();
			
			for(W in bubbleRotate){
				bubbleRotate[W].draw();
				bubbleRotate[W].effect();
			}
			for(W in waterFires){
				waterFires[W].draw();
				waterFires[W].effect();
			}
			for(W in WFires){
				WFires[W].draw();
				WFires[W].move();
			}
			for(I in IBubbles){
				IBubbles[I].draw();
				IBubbles[I].move();
			}
			
			waterair.draw();
			for(W in wairParticles){
				wairParticles[W].draw();
				wairParticles[W].onHit();
				HpAi(wairParticles[W]);
				HpMove(wairParticles[W]);
			}
			for(W in Wpools){
				Wpools[W].draw();
				Wpools[W].move();
			}
			
			for(S in darkSpikes){
				spikeDraw(darkSpikes[S]);
				spikeMove(darkSpikes[S]);
			}
			for(S in dark2Spikes){
				spikeDraw(dark2Spikes[S]);
				spikeMove(dark2Spikes[S]);
			}
			for(S in darkfireSpikes){
				spikeDraw(darkfireSpikes[S]);
				firespikeMove(darkfireSpikes[S]);
			}
			for(S in darkfireExplosions){
				darkfireExplosions[S].draw();
				darkfireExplosions[S].move();
			}
			for(S in darkiceSpikes){
				spikeDraw(darkiceSpikes[S]);
				firespikeMove(darkiceSpikes[S]);
			}
			for(S in darkiceEffects){
				darkiceEffects[S].draw();
			}
			for(S in darklightningSpikes){
				spikeDraw(darklightningSpikes[S]);
				firespikeMove(darklightningSpikes[S]);
			}
			for(S in darklightningExplosions){
				darklightningExplosions[S].draw();
				darklightningExplosions[S].move();
			}
			darkwater.draw();
			darkwater.effect();
			
			darkair.draw();
			darkair.effect();
			
			sFire.draw();
			sFire.move();
			
			sLightning.draw();
			sLightning.effect();
			
			rootBlastW.draw();
			rootBlastW.effect();
			rootBlastA.draw();
			rootBlastA.effect();
			rootBlastS.draw();
			rootBlastS.effect();
			rootBlastD.draw();
			rootBlastD.effect();
			LeafHeal.draw();
			LeafHeal.move();
			for(R in roots1){
				roots1[R].draw();
			}
			treeWizz.spawn();
			Dragon.spawn();
			Dragon.draw();
			DragonR.spawn();
			DragonR.draw();
			DragonL.spawn();
			DragonL.draw();
			Dragon.attack();
			DragonR.attack();
			DragonL.attack();
			for(D in Dragonflame){
				Dragonflame[D].draw();
				Dragonflame[D].effect();
			}
			//put here to negate ice abilities
			TreecastingBar.tick();	
			SorcCastingBar.tick();
			for(E in AllEnemies){
				if(AllEnemies[E].onTree == 0){
					AllEnemies[E].draw();
					move(AllEnemies[E]);
				}
				if(AllEnemies[E].type != "Dragon" && AllEnemies[E].type != "DragonL" && AllEnemies[E].type != "DragonR"){
					AI(AllEnemies[E]);
					spawn(AllEnemies[E]);
				}
			}
			for(M in BigMeteors){
				MeteorAI(BigMeteors[M]);
			}
			for(E in EMeteors){
				EMeteors[E].draw();
				MeteorMove(EMeteors[E]);
			}
			for(E in EMplosions){
				EMplosions[E].draw();
				EMplosions[E].move();
			}
			DragonEffect.draw();
			Thief.steal();
			ThiefA.steal();
			ThiefB.steal();
		
			Spawner.fire();
			SmokeBomb.draw();
			SmokeBombA.draw();
			SmokeBombB.draw();
			
			for(O in allObs){
				drawObstacle(allObs[O]);
				obsTick(allObs[O]);
			}
			if(STATE == "Jungle" && jungleAni == true){
				for(O in obstacle1){
					if(obstacle1[O].growTimer > 0){
						obstacle1[O].growTimer-=1;
					}
					else if(obstacle1[O].index<12){
						obstacle1[O].index+=1;
					}
				}
			}
			for(E in AllEnemies){
				if(AllEnemies[E].onTree == 1){
					AllEnemies[E].draw();
					move(AllEnemies[E]);
				}
			}
			TwizEffect.draw();
			DragonEffect2.draw();
			
			// black out screen
			ctx.globalAlpha = 1;
			if(darkearth.blackTimer > 0){
				darkearth.blackDraw();
			}
			darkearth.draw();
			darkearth.move();
			
			UI();
			SCORE();
			
			ctx.globalAlpha = Alpha;
			
			drawMarker(marker);
			moveMarker(marker);
		
			drawMarker(marker2);
			moveMarker(marker2);
		
			drawMarker(marker3);
			moveMarker(marker3);
		
			drawMarker(marker4);
			moveMarker(marker4);
			
			drawtypeMarker(typemarker);
			moveMarker(typemarker);
		
			drawtypeMarker(typemarker2);
			moveMarker(typemarker2);
		
			drawtypeMarker(typemarker3);
			moveMarker(typemarker3);
			
			drawtypeMarker(typemarker4);
			moveMarker(typemarker4);
			
			drawtypeMarker(typemarker5);
			moveMarker(typemarker5);
			
			drawtypeMarker(typemarker6);
			moveMarker(typemarker6);
			
			castingBar.draw();
			castingBar.tick();
			TreecastingBar.draw();
			SorcCastingBar.draw();

			if(dim == 2){
				ctx.globalAlpha = Alpha*0.25;
				ctx.fillStyle = "#FF0000";
				ctx.fillRect(0,0,400,576);
				ctx.fillStyle = "#000099";
				ctx.fillRect(400,0,400,576);
				ctx.globalAlpha = Alpha;
			}
			// Cooldown calculation
			if(cd <= 0){
				cd = cd;
			}
			else{
				cd--;
			}
		}
	}
}, 1000/FPS);
