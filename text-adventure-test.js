//Our main js code called by Jquery on doc ready
$(document).ready(function () {
    //game variables    
    var message,                //screen message to display
    hits = 10,                  //hit points for the player
    lightLevel = 100,           //current light level
    items = [];
    currentRoom = 0,            //initial room  
    exitRoom = 31,              //final room of the dungeon
    IsGameOver = false,         //Maintain the state of the game
    IsOgreAlive = true,         //Stores the state of the Ogre - Alive/Dead
    IsDragonAlive = true;       //this is the gameover state

    //All the commands we use in the game. These don't match the commands actually used
    var gameWords = ["HELP", "Find/earch", "N-orth", "S-outh", "W-est", "E-east','A-About"];
    var items = [
        {
            name:"Knife",
            objectId:0,
            src:"./icons/delapouite/originals/svg/scabbard.svg",
            inInventory:false
        },
        {
            name:"Painting",
            objectId:1,
            src:"./icons/delapouite/originals/svg/rolled-cloth.svg",
            inInventory:false
        },
        {
            name:"Wand of Firebolts",
            objectId:2,
            src:"./icons/delapouite/originals/svg/flaming-trident.svg",
            inInventory:false
        },
        {
            name:"Goblet",
            objectId:3,
            src:"./icons/delapouite/originals/svg/porcelain-vase.svg",
            inInventory:false
        },
        {
            name:"Wand of Wind",
            objectId:4,
            src:"./icons/delapouite/originals/svg/lunar-wand.svg",
            inInventory:false
        },
        {
            name:"Coins",
            objectId:5,
            src:"./icons/delapouite/originals/svg/coins.svg",
            inInventory:false
        },
        {
            name:"Helmet",
            objectId:6,
            src:"./icons/carl-olsen/originals/svg/brutal-helm.svg",
            inInventory:false
        },
        {
            name:"Candle",
            objectId:7,
            src:"./icons/delapouite/originals/svg/candles.svg",
            inInventory:false
        },
        {
            name:"Key",
            objectId:8,
            src:"./icons/delapouite/originals/svg/boss-key.svg",
            inInventory:false
        },
        {
            name:"Torch",
            objectId:9,
            src:"./icons/delapouite/originals/svg/torch.svg",
            inInventory:false
        },
        {
            name:"Iron Shield",
            objectId:10,
            src:"./icons/delapouite/originals/svg/viking-shield.svg",
            inInventory:false
        },
        {
            name:"Axe",
            objectId:11,
            src:"./icons/delapouite/originals/svg/sharp-axe.svg",
            inInventory:false
        },
        {
            name:"Oil",
            objectId:12,
            src:"./icons/delapouite/originals/svg/jerrycan.svg",
            inInventory:false
        },
        {
            name:"Armour",
            objectId:13,
            src:"./icons/delapouite/originals/svg/shoulder-armor.svg",
            inInventory:false
        },
        {
            name:"Aerosol",
            objectId:14,
            src:"./icons/lorc/originals/svg/aerosol.svg",
            inInventory:false
        },
        {
            name:"Candle",
            objectId:15,
            src:"./icons/delapouite/originals/svg/candles.svg",
            inInventory:false
        },
        {
            name:"Rope",
            objectId:16,
            src:"./icons/delapouite/originals/svg/rope-coil.svg",
            inInventory:false
        },
        {
            name:"Boat",
            objectId:17,
            src:"./icons/delapouite/originals/svg/canoe.svg",
            inInventory:false
        }
    ];
    var rooms = [
                    {
                        name:"Dungeon Entrance",
                        roomIndex:0,
                        src:"./icons/delapouite/originals/svg/cave-entrance.svg",
                        exits: "E",
                        object:{
                            name:"Knife",
                            objectId:0,
                            src:"./icons/delapouite/originals/svg/scabbard.svg",
                            inInventory:false
                        }
                    },
                    {
                        name:"Corridor of uncertainty",
                        roomIndex:1,
                        src:"./icons/delapouite/originals/svg/dungeon-gate.svg",
                        exits:"SWE",
                        object:{
                            name:"Painting",
                            objectId:1,
                            src:"./icons/delapouite/originals/svg/rolled-cloth.svg",
                            inInventory:false
                        }
                    },
                    {
                        name:'Ancient old cavern',
                        roomIndex:2,
                        src:"./icons/delapouite/originals/svg/castle-ruins.svg",
                        exits:"WE",
                        object:{
                            name:"",
                            src:"",
                            inInventory:false
                        }
                    },
                    {
                        name:"Great Cavern",
                        roomIndex:3,
                        src:"./icons/delapouite/originals/svg/castle-ruins.svg",
                        exits:"SWE",
                        object:{
                            name:"Wand of Firebolts",
                            objectId:2,
                            src:"./icons/delapouite/originals/svg/flaming-trident.svg",
                            inInventory:false
                        }
                    },
                    {
                        name:"Underground River",
                        roomIndex:4,
                        src:"./icons/delapouite/originals/svg/river.svg",
                        exits:"WE",
                        object:{
                            name:"Goblet",
                            objectId:3,
                            src:"./icons/delapouite/originals/svg/porcelain-vase.svg",
                            inInventory:false
                        }
                    },
                    {
                        name:"Stream",
                        roomIndex:5,
                        src:"./icons/delapouite/originals/svg/river.svg",
                        exits:"WE",
                        object:{
                            name:"Wand of Wind",
                            objectId:4,
                            src:"./icons/delapouite/originals/svg/lunar-wand.svg",
                            inInventory:false
                        }
                    },
                    {
                        name:'Dungeon Stream',
                        roomIndex:6,
                        src:"./icons/delapouite/originals/svg/river.svg",
                        exits:"SWE",
                        object:{
                            name:"Coins",
                            objectId:5,
                            src:"./icons/delapouite/originals/svg/coins.svg",
                            inInventory:false
                        }
                    },
                    {
                        name:"Dungeon Pool",
                        roomIndex:7,
                        src:"./icons/delapouite/originals/svg/swamp.svg",
                        exits:"WS",
                        object:{
                            name:"Helmet",
                            objectId:6,
                            src:"./icons/carl-olsen/originals/svg/brutal-helm.svg",
                            inInventory:false
                        }
                    },
                    {
                        name:"Large Cavern",
                        roomIndex:8,
                        src:"./icons/delapouite/originals/svg/castle-ruins.svg",
                        exits:"NSE",
                        object:{
                            name:"Candle",
                            objectId:7,
                            src:"./icons/delapouite/originals/svg/candles.svg",
                            inInventory:false
                        }
                    },
                    {
                        name:"Rough Tunnell",
                        roomIndex:9,
                        src:"./icons/delapouite/originals/svg/castle-ruins.svg",
                        exits:"SE",
                        object:{
                            name:"Key",
                            objectId:8,
                            src:"./icons/delapouite/originals/svg/boss-key.svg",
                            inInventory:false
                        }
                    },
                    {
                        name:"Ogre Tunnell",
                        roomIndex:10,
                        src:"./icons/delapouite/originals/svg/ogre.svg",
                        exits:"WE",
                        object:{
                            name:"Torch",
                            objectId:9,
                            src:"./icons/delapouite/originals/svg/torch.svg",
                            inInventory:false
                        }
                    },
                    {
                        name:"Dark Room",
                        roomIndex:11,
                        src:"./icons/delapouite/originals/svg/night-vision.svg",
                        exits:"NW",
                        object:{
                            name:"Iron Shield",
                            objectId:10,
                            src:"./icons/delapouite/originals/svg/viking-shield.svg",
                            inInventory:false
                        }
                    },
                    {
                        name:"Dark Room",
                        roomIndex:12,
                        src:"./icons/delapouite/originals/svg/castle-ruins.svg",
                        exits:"SE",
                        object:{
                            name:"Axe",
                            objectId:11,
                            src:"./icons/delapouite/originals/svg/sharp-axe.svg",
                            inInventory:false
                        }
                    },
                    {
                        name:"Cold Room",
                        roomIndex:13,
                        src:"./icons/delapouite/originals/svg/frozen-block.svg",
                        exits:"W",
                        object:{
                            name:"",
                            src:"",
                            inInventory:false
                        }
                    },
                    {
                        name:"Old Tunnel",
                        roomIndex:14,
                        src:"./icons/delapouite/originals/svg/gold-mine.svg",
                        exits:"SNE",
                        object:{
                            name:"Oil",
                            objectId:12,
                            src:"./icons/delapouite/originals/svg/jerrycan.svg",
                            inInventory:false
                        }
                    },
                    {
                        name:"Cold Room",
                        roomIndex:15,
                        src:"./icons/delapouite/originals/svg/frozen-block.svg",
                        exits:"NSW",
                        object:{
                            name:"Armour",
                            objectId:13,
                            src:"./icons/delapouite/originals/svg/shoulder-armor.svg",
                            inInventory:false
                        }
                    },
                    {
                        name:"Old Cavern",
                        roomIndex:16,
                        src:"./icons/delapouite/originals/svg/ancient-ruins.svg",
                        exits:"NS",
                        object:{
                            name:"Aerosol",
                            objectId:14,
                            src:"./icons/lorc/originals/svg/aerosol.svg",
                            inInventory:false
                        }
                    },
                    {
                        name:"Short Corridor",
                        roomIndex:17,
                        src:"./icons/delapouite/originals/svg/dungeon-gate.svg",
                        exits:"NS",
                        object:{
                            name:"Candle",
                            objectId:15,
                            src:"./icons/delapouite/originals/svg/candles.svg",
                            inInventory:false
                        }
                    },
                    {
                        name:"Short Corridor",
                        roomIndex:18,
                        src:"./icons/delapouite/originals/svg/dungeon-gate.svg",
                        exits:"SE",
                        object:{
                            name:"Rope",
                            objectId:16,
                            src:"./icons/delapouite/originals/svg/rope-coil.svg",
                            inInventory:false
                        }
                    },
                    {
                        name:"Grey Room",
                        roomIndex:19,
                        src:"./icons/delapouite/originals/svg/castle-ruins.svg",
                        exits:"WE",
                        object:{
                            name:"Boat",
                            objectId:17,
                            src:"./icons/delapouite/originals/svg/canoe.svg",
                            inInventory:false
                        }
                    },
                    {
                        name:"Green Room",
                        roomIndex:20,
                        src:"./icons/delapouite/originals/svg/castle-ruins.svg",
                        exits:"NWE",
                        object:{
                            name:"",
                            src:"",
                            inInventory:false
                        }
                    },
                    {
                        name:"Old Prison Cell",
                        roomIndex:21,
                        src:"./icons/delapouite/originals/svg/dungeon-light.svg",
                        exits:"SWE",
                        object:{
                            name:"",
                            src:"",
                            inInventory:false
                        }
                    },
                    {
                        name:"Underground River",
                        roomIndex:22,
                        src:"./icons/delapouite/originals/svg/castle-ruins.svg",
                        exits:"WS",
                        object:{
                            name:"",
                            src:"",
                            inInventory:false
                        }
                    },
                    {
                        name:"Large Cavern",
                        roomIndex:23,
                        src:"./icons/delapouite/originals/svg/castle-ruins.svg",
                        exits:"N",
                        object:{
                            name:"",
                            src:"",
                            inInventory:false
                        }
                    },
                    {
                        name:"Rough Tunnell",
                        roomIndex:24,
                        src:"./icons/delapouite/originals/svg/gold-mine.svg",
                        exits:"N",
                        object:{
                            name:"",
                            src:"",
                            inInventory:false
                        }
                    },
                    {
                        name:"Long Tunnell",
                        roomIndex:25,
                        src:"./icons/delapouite/originals/svg/castle-ruins.svg",
                        exits:"NWE",
                        object:{
                            name:"",
                            src:"",
                            inInventory:false
                        }
                    },
                    {
                        name:"Dark Room",
                        roomIndex:26,
                        src:"./icons/delapouite/originals/svg/night-vision.svg",
                        exits:"NWE",
                        object:{
                            name:"",
                            src:"",
                            inInventory:false
                        }
                    },
                    {
                        name:"Graveyard",
                        roomIndex:27,
                        src:"./icons/delapouite/originals/svg/graveyard.svg",
                        exits:"WE",
                        object:{
                            name:"",
                            src:"",
                            inInventory:false
                        }
                    },
                    {
                        name:"Cold Room",
                        roomIndex:28,
                        src:"./icons/delapouite/originals/svg/frozen-block.svg",
                        exits:"WE",
                        object:{
                            name:"",
                            src:"",
                            inInventory:false
                        }
                    },
                    {
                        name:"Old Tunnel",
                        roomIndex:29,
                        src:"./icons/delapouite/originals/svg/dungeon-gate.svg",
                        exits:"NW",
                        object:{
                            name:"",
                            src:"",
                            inInventory:false
                        }
                    },
                    {
                        name:"Dragons Room",
                        roomIndex:30,
                        src:"./icons/delapouite/originals/svg/drakkar-dragon.svg",
                        exits:"NE",
                        object:{
                            name:"",
                            src:"",
                            inInventory:false
                        }
                    },
                    {
                        name:"Rogue Room / END??",
                        roomIndex:31,
                        src:"./icons/delapouite/originals/svg/throne-king.svg",
                        exits:"W",
                        object:{
                            name:"",
                            src:"",
                            inInventory:false
                        }
                    }
                ];























    //Each exit relates to the index ie. Exits[0] SE which means rooms[0] the long path has two exits on the  South and East. If we look
    //down to the //Movement Code section you can see how we work out which rooms are connected to which
/*
    var exits = ["E", "SWE", "WE", "SWE", "WE", "WE", "SWE", "WS",
                    "NSE", "SE", "WE", "NW", "SE", "W", "SNE", "NSW",
                    "NS", "NS", "SE", "WE", "NWE", "SWE", "WS", "N",
                    "N", "NWE", "NWE", "WE", "WE", "NW", "NE", "W"];


    //All out game objects
    //     var GameObjects = ['', "Painting", "Knife", "Wand of Firebolts", "Goblet", "Wand of Wind", "Coins", "Helmet", "Candle", "Torch", "Iron Shield", "Armour", "Oil", "AXE", "ROPE", "BOAT", "AEROSOL", "CANDLE", "KEY"];

    //Inventory array Contains all the things you can carry
    var inventory = [];
    inventory[0] = 2; //lets start our player off with a knife


    //location of game objects - these objects relate to a array index - so Object[1] the Painting is located
    //in rooms[2] the small garden - 999 indicates out of play 
    //    var objectLocations = [999, 1, 999, 3, 4, 5, 6, 7, 8, 10, 11, 15, 14, 12, 18, 19, 16, 17, 9]
    var objectLocations = [0, 1, 3, 4, 5, 6, 7, 8, 10, 11, 15, 14, 12, 18, 19, 16, 17, 9]
*/
    //hiding mobile only controllers
    /*
    //This function detects if the browser if a mobile - you'll see when we call this we apply the 
    function isMobile() {
        return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i)
            || navigator.userAgent.match(/Opera Mini/i) || navigator.userAgent.match(/IEMobile/i);
        }

    //The next line checks for a mobile browser and if it find st it will hide the buttons or hide the text box
    if (isMobile()) {
        //hide the text box - we dont need that for a mobile browser as its hard to use mobile keyboard for lots of commands
        $("#Keyboard").hide();
    } else {
        //hide the buttons as we don't want that for the normal web experience
        $('#controllers').hide();

        //jquery command to force the textbox to take focus  
        $("#userInput").focus();
    }
    */

    //javascript function to pickup the object in this room
    function pickup(roomIndex) {
        console.log("roomIndex: " + roomIndex);
        if(rooms[currentRoom].object.name !== "" && rooms[currentRoom].object.inInventory === false){
            rooms[currentRoom].object.inInventory = true;
            update();
        } else {
            message = "Nothing to pick up";
            update();
        }
    }

    //This is a method/function that shows the game screen. If we look in detail at this function we can see that 
    //it uses another function displayText to show each line of the screen.
    function update() {

        //clear the output div
        $output.empty();
        //$inventory.empty();
        $status.empty();

        //Display the status
        displayStatus('DB:' + currentRoom + 'Light:' + lightLevel + "Hits:" + hits);

        //Display the screen output text - note this does not include the buttons
        displayText("You are now in the :");
        displayText(rooms[currentRoom].name);
        displayText("Exits: " + ShowAdjacentRooms(rooms[currentRoom].exits) + "<br />");
        if (rooms[currentRoom].object.name !== "" && rooms[currentRoom].object.inInventory == false) {
            displayText("You can see " + rooms[currentRoom].object.name);
        }

        //If there is something in our inventory then display it
        displayInventory();

        if (message != null)
            displayText(message.toUpperCase());

        //Game over code
        if (IsDragonAlive) {
            $('#GameOverDiv').hide();
            $('#GameDiv').show();
        }
        else {
            $('#GameOverDiv').show();
            $('#GameDiv').hide();
        }
        // message = "What?";
    }

    //Replaces the indexOf js function as i have found it doesn't always work for me!!!!!!!!
    function checkIndex(issFullArray, issToCheck) {
        for (i = 0; i < issFullArray.length; i++) {
            if (issFullArray[i] == issToCheck) {
                return true;
            }
        }
        return false;
    }

    //Uses the text for a room to build a string that shows which rooms are next to the current room
    function ShowAdjacentRooms(e) {
        var newExits = "";
        if (e != null) {
            for (i = 0; i < e.length; i++) {
                if (i === e.length - 1) {
                    newExits += e.substring(i, i + 1);
                } else if (i === e.length - 2) {
                    newExits += e.substring(i, i + 1) + " & ";
                } else {
                    newExits += e.substring(i, i + 1) + ", ";
                }
            }
        }
        return newExits;
    }

    //Simple js function to display a line of text
    function displayText(text) {
        $output.html($output.html().toString() + "<p>" + text + "</p>");
    }

    //Display inventory text
    function displayInventory(){
        //var itemGrid = document.getElementById("inventory").childNodes;
        //console.log(itemGrid);
        for (var i = 0; i<items.length; i++){
            $inventory.createElement("img")appendChild("<div class='col-xs-1 col-md-2 square item'><img src=" + items[i].src + "></div>")
        }
        //$inventory.html($inventory.html().toString() + "<p>" + text + "</p>");
    }

    //Display status text
    function displayStatus(text){
        $status.html($status.html().toString() + "<p>" + text + "</p>");
    }

    //Each round we call this function to do all the main game processing 
    function ProcessGameRound(command) {

        //Remove any spaces from the command text
        trimCommand = $.trim(command);

        //Process command takes the players action
        ProcessCommand(command);

        //Now that we have taken the players logic we need to activate the main game room logic
        if (currentRoom == 10 && OgreAlive) {

            //if you are fighting the ogre and you have the spells
            if (checkIndex(inventory, 3)) {
                message += "\<br\>YOU attack the ogre with magic spells and kill him!";
                OgreAlive = false;
            }
            else {
                message += "\<br\>Ogre attacks you!";
                hits--;
            }
        }

        //If you are in the final room and the dragon is still alive
        if (currentRoom == 31 && IsDragonAlive) {
            //if you are fighting the dragon and you have the oil, burning torch
            if (checkIndex(inventory, 5) && checkIndex(inventory, 9) && checkIndex(inventory, 12)) {
                message += "\<br\>You attack the dragon with oil, burning torch and the wand of Wind - It creates and kill him!";
                IsDragonAlive = false; //End Game           
            }
            else {
                message += "\<br\>The dragon attacks you with firebreath and kills you!";
                hits--;
            }
        }

        if (currentRoom == 25) {
            //if you are fighting the gas room burning torch
            if (checkIndex(inventory, 10)) {
                message += "\<br\>The gas in the room is ignited by the torch - You become a human BBQ and die!";
                hits--;
            }
        }
        update();
    }

    function ProcessCommand(command) {
        var direction = command;
        message = "OK";
        switch (command) {
            //Movement Code
            case "N":
            case "NORTH":
                if (rooms[currentRoom].exits.indexOf(direction) > -1)
                    currentRoom -= 8;
                else
                    message = "Can't move there";
                break;
            case "S":
            case "SOUTH":
                if (rooms[currentRoom].exits.indexOf(direction) > -1)
                    currentRoom += 8;
                else
                    message = "Can't move there";
                break;
            case "E":
            case "EAST":
                if (rooms[currentRoom].exits.indexOf(direction) > -1)
                    currentRoom++;
                else
                    message = "Can't move there";
                break;
            case "W":
            case "WEST":
                if (rooms[currentRoom].exits.indexOf(direction) > -1)
                    currentRoom--;
                else
                    message = "Can't move there";
                break;
            //End of Movement Code
            case "P":
            case "PICKUP":
            case "PICK UP":
            case "GET":
            case "GET ITEM":
                pickup(currentRoom);
                break;
            case "A":
                message = "About ... Game built for #1GAM, LD48 (failed) and my friend Hilary";
                break;
            case "?":
            case "HELP":
            default:
                message = "The following commands are valid: N S E W P A ?";
                break;
        }
    }
    //JQuery selector that handles the form submit - 
    $('#input form').submit(function (evt) {
        ProcessGameRound($('#userInput').val().toUpperCase());

        $('#userInput').val('');

        //disabling preventDefault because added default to help
        //evt.preventDefault();
    });

    //sets display divs to variable
    $output = $('#output');
    $inventory = $('#inventory');
    $status = $('#status');

    // This is jQuery selector that picks up an event from the button - in this case we look at the value of the button ie. its text and use that 
    //to call the same function as we would call from the equivalent keyboard command
    $(".button").click(function (e) {
        switch (this.value) {
            case "N":
            case "NORTH":
                ProcessGameRound('N');
                break;
            case "S":
            case "SOUTH":
                ProcessGameRound('S');
                break;
            case "E":
            case "EAST":
                ProcessGameRound('E');
                break;
            case "W":
            case "WEST":
                ProcessGameRound('W');
                break;
/* unsure what F command does, commenting out for now
            case "F":
                ProcessGameRound('F');
                break;
*/
            case "P":
            case "PICKUP":
            case "PICK UP":
            case "GET":
                pickup(currentRoom);
                break;
            case "A":
            case "ABOUT":
                ProcessGameRound('A');
                break;
            case "?":
            case "HELP":
            default:
                ProcessGameRount('?');
                break;
        }
    });

    update();

});
