// Player stats
let playerHeatlh = 100;
let xp = 0;
let gold = 10;

let currentWeapon = 0;
let currentArmor = 0;

// monster stats
let monsterHealth;
let monsterAttack;
let monsterName;

// variables for state of play
let fighting;
let currentLocation;
let quest =[0, 0, 0]; //which quests have been completed [nessie, zombies, princess]
let princess; //has the princess been saved

// vaviables for updating the viewer
const xpText = document.querySelector('#xp');
const heatlhText = document.querySelector('#health');
const goldText = document.querySelector('#gold');

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const button4 = document.querySelector('#button4');
const button5 = document.querySelector('#button5');

const weaponText = document.querySelector('#weapon');
const armorText = document.querySelector('#armor');

const monsterNameText = document.querySelector('#monster_name');
const monsterHealthText = document.querySelector('#monster_health');
const monsterLevelText = document.querySelector('#monster_level');

const playerStory = document.querySelector('#text');


// monster list
const monsters = [
    {
        name: "orc",
        level: 1,
        mHealth: 10
    },
    {
        name: "wolf",
        level: 1,
        mHealth: 8
    },
    {
        name: "bear",
        level: 1,
        mHealth: 15
    },
    {
        name: "thif",
        level: 3,
        mHealth: 10
    },
    {
        name: "slime",
        level: 2,
        mHealth: 20
    },
    {
        name: "centaur",
        level: 10,
        mHealth: 60
    },
    {
        name: "zombie",
        level: 5,
        mHealth: 50
    },
    {
        name: "Nessie",
        level: 60,
        mHealth: 900
    },
    {
        name: "snakes",
        level: 10,
        mHealth: 20
    },
    {
        name: "goblins",
        level: 15,
        mHealth: 60
    },
    {
        name: "troll",
        level: 40,
        mHealth: 200
    }
];

// weapon types
const weapon = [
    {
        name: "Stick",
        attack: 1
    },
    {
        name: "Large Club",
        attack: 3
    },
    {
        name: "Bronze Sword",
        attack: 5
    },
    {
        name: "Steel Sword",
        attack: 8
    },
    {
        name: "Amazing Sword",
        attack: 15
    }
];

// armor types
const armor = [
    {
        name: "None",
        armor: 0
    },
    {
        name: "Leather",
        armor: 2
    },
    {
        name:  "Bronze",
        armor:10
    },
    {
        name: "Steel",
        armor: 15
    },
    {
        name: "Greater",
        armor: 20
    },
    {
        name: "Legendary",
        armor: 50
    }
];

// location information
const location = [
    {
        name: "Town Square",
        "button text": ["Go to Shop", "Go to Tavern", "Go to Fountain", "Go to Wilderness", "Show Current Quests"],
        "button function": [goShop, goTavern, goFountain, goWilderness, showQuest],
        text: "You return to town"
    },
    {
        name: "Wilderness",
        "button text": ["Return to Town", "Go to the Woods", "Go to the Lake", "Enter the Cave", "Approach the hill"],
        "button function": [goSquare, goWoods, goLake, goCave, goHill],
        text: "You enter the wilderness. Before you see a bunch of woods, a lake in the distance, a suspicious cave, and a pleasent looking hill"
    }, 
    {
        name: "Shop",
        "button text": ["Buy Weapon", "Buy Armor", "Buy 10 Health (10 gold)", "Go to Square", ""],
        "button fuction": [buyWeapon, buyArmor, buyHealth, goSquare],
        text: "You enter the shop"
    },
    {
        name: "Tavern",
        "button text": ["Talk to Innkeeper", "Talk to Adventurer", "Leave"],
        "button function": [innkeeper, adventurer, goSquare],
        text: "You enter the tavern, a smell of sweat, blood, and old beer is abundant in the air."
    },
    {
        name: "Fountain",
        "button text": ["Accept Princess Quest", "Leave"],
        "button function": [princessQuest, goSquare],
        text: "A crier in front of the fountain shouts to a reluctant crowd. 'Wont anyone be brave enough to save the princess? The reward will be subsancial!'"
    },
    {
        name: "Innkeeper",
        "button text": ["Accept Nessie Quest", "Leave"],
        "button function": [nessieQuest, goTavern],
        text: "You listen to the Innkeeper as he describes a monster in the lake that has makeing obtaining food more difficult."
    },
    {
        name: "Adventurer",
        "button text": ["Accept Zombie quest", "Leave"],
        "button function": [zombieQuest, goTavern],
        text: "You listen as the weary adventurer tells of his misfortune finding zombies on a hill outside of town."
    },
    {
        name: "Pleasent Hill",
        "button text": ["Fight Zombie", "Leave Hill"],
        "button function": [fightZombie, goWilderness],
        text: "As you approach the top of a rather plesent hill, you spot a zombie nearby. What will you do?"
    },
    {
        name: "Dark Cave",
        "button text": ["Go further into the cave", "Leave Cave"],
        "button function": [fightSnakes, goWilderness],
        text: "As you peer into the cave, you see a handful of snakes. They shouldnt be too difficult to defeat."
    },
    {
        name: "Snake Pit",
        "button text": ["Go further into the cave", "Leave Cave"],
        "button function": [fightGoblins, goWilderness],
        text: "That was more difficult than you thouht. Will you go further into the cave?"
    },
    {
        name: "Goblin Camp",
        "button text": ["Go further into the cave", "Leave"],
        "button function": [fightTroll, goWilderness],
        text: "Damn goblins. Hard to take down in the best of circumstances. Wait...\nWhats that noise?"
    },
    {
        name: "Troll Lair",
        "button text": ["Go further into the cave", "Leave"],
        "button function": [findPrincess, goWilderness],
        text: "You sit down to rest as you have just defeated a troll. The thought occurs to you that only a handful of adventureres in the entire kingdom have faced a troll and lived. Now what would a troll be doing here?"
    },
    {
        name: "Princess",
        "button text": "Leave with the princess",
        "button function": [goWilderness],
        text: ""
    },
    {
        name: "Vacant Chamber",
        "button text": ["return to the wilderness"],
        "button function": [goWilderness],
        text: ""
    },
    
];

// update location
function updateLocation(playerLocation){
    // dont display monster stats banner
    monsterStats.style.display = "none";

    // update button text
    button1.innerText = playerLocation["button text"][0];
    button2.innerText = playerLocation["button text"][1];
    button3.innerText = playerLocation["button text"][2];
    button4.innerText = playerLocation["button text"][3];
    button5.innerText = playerLocation["button text"][4];

    // update fuctions
    button1.onclick = playerLocation["button function"][0];
    button2.onclick = playerLocation["button function"][1];
    button3.onclick = playerLocation["button function"][2];
    button4.onclick = playerLocation["button function"][3];
    button5.onclick = playerLocation["button function"][4];

    // update box text
    playerStory.innerHTML = playerLocation.text;
}

// initialize buttons
button1.onclick = goShop;
button2.onclick = goFountain;
button3.onclick = goTavern;
button4.onclick = goWilderness;
button5.onclick = showQuest;

function goShop(){
    updateLocation(location[2]);
}

function goFountain(){
    updateLocation(location[4]);
}

function goTavern(){
    updateLocation(location[3]);
}

function goWilderness(){
    updateLocation(location[1]);
}

function innkeeper(){
    updateLocation(location[5]);
}

function adventurer(){
    updateLocation(location[6]);
}

function goSquare(){
    updateLocation(location(0));
}

function goHill(){
    updateLocation(location(7));
}