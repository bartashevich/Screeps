var roleHarvester = require('role.harvester');
var roleExtractor = require('role.extractor');
var roleTransporter = require('role.transporter');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleEmigrant = require('role.emigrant');
var roleFixer = require('role.fixer');

module.exports.loop = function () {
    // CLAIMER
    //Game.spawns['W26N18'].spawnCreep([CLAIM,MOVE,MOVE,MOVE,MOVE], "Claimer", {memory: {role: 'claimer'}});

    /*var creepClaimer = Game.creeps["Claimer"];

    const claimerExit = Game.map.findRoute(creepClaimer.room, "W25N19");
    if(creepClaimer.room.name == "W25N19"){
        let ctrl = creepClaimer.room.controller;
        creepClaimer.moveTo(ctrl, {visualizePathStyle: {stroke: '#ffaa00'}});
        creepClaimer.claimController(ctrl);
    }
    else if(claimerExit.length > 0) {
        const claimerRoute = creepClaimer.pos.findClosestByRange(claimerExit[0].exit);
        creepClaimer.moveTo(claimerRoute, {visualizePathStyle: {stroke: '#ffaa00'}});
    }*/

    // REMOTE BUILDER
    //Game.spawns['W26N18'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], "RemoteBuilder4", {memory: {role: 'builder', room: 'W26N18'}});
    
    var creepBuilder = Game.creeps["RemoteBuilder3"];
    var creepBuilder4 = Game.creeps["RemoteBuilder4"];
    var newRoom = "W25N19"

    if(creepBuilder && creepBuilder.room.name != newRoom){
        const builderExit = Game.map.findRoute(creepBuilder.room, newRoom);
        if(builderExit.length > 0) {
            const builderRoute = creepBuilder.pos.findClosestByRange(builderExit[0].exit);
            creepBuilder.moveTo(builderRoute, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }

    if(creepBuilder4 && creepBuilder4.room.name != newRoom){
        const builderExit = Game.map.findRoute(creepBuilder4.room, newRoom);
        if(builderExit.length > 0) {
            const builderRoute = creepBuilder4.pos.findClosestByRange(builderExit[0].exit);
            creepBuilder4.moveTo(builderRoute, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }




    //Game.spawns['Spawn1'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,ATTACK], "Attacker", {memory: {role: 'attacker'}});
    //Game.creeps['Harvester21602517'].suicide();

    //Game.spawns['W26N18'].spawnCreep([ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE], "Attacker", {memory: {role: 'attacker'}});

    /*var creepAttacker = Game.creeps["Attacker"];

    var enemy = Game.getObjectById('5bbcab6e9099fc012e6337ec');
    var shortExit = Game.getObjectById('5f0b2c5da1ac693dad87b2c2');*/
    
    // attack if find an enemy
    //var closestHostile = creepAttacker.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    /*if(enemy) {
        creepAttacker.moveTo(enemy, {visualizePathStyle: {stroke: '#ffaa00'}});
        creepAttacker.attack(enemy);
        creepAttacker.say("ATTACK");
    }
    else{
        const route = Game.map.findRoute(creepAttacker.room, "W27N18");
        if(route.length > 0) {
            const exit = creepAttacker.pos.findClosestByRange(route[0].exit);
            creepAttacker.moveTo(exit, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }*/



    /*var newSpawn = Game.getObjectById('5f7b574894ee6f7de48c04a4');

    var creepBuild = new Array();
    creepBuild = [MOVE];
    newSpawn.spawnCreep(creepBuild, "tester", {memory: {role: 'tester'}});*/

    /*var creepTester = Game.creeps["tester"];
    var testerGoal = Game.getObjectById('5f0f6b92993f98120dc20ceb');
    creepTester.moveTo(testerGoal, {visualizePathStyle: {stroke: '#ffaa00'}});
    //creepTester.moveTo(Game.map.findRoute(creepTester.room, "W27N18"), {visualizePathStyle: {stroke: '#ffaa00'}});

    const route = Game.map.findRoute(creepTester.room, "W27N18");
    if(route.length > 0) {
        //console.log(creep.name +' | Now heading to room '+route[0].room);
        const exit = creepTester.pos.findClosestByRange(route[0].exit);
        creepTester.moveTo(exit, {visualizePathStyle: {stroke: '#ffaa00'}});
    }*/

    /*var creepClaimer = Game.creeps["Claimer01"];
    let ctrl = creepClaimer.room.controller;
    creepClaimer.claimController(ctrl);

    console.log(creepClaimer.room);

    if(creepClaimer.room.name == "W26N18"){

        console.log("GOING TO CONTROLLER");

        let ctrl = creepClaimer.room.controller;

        let claimResult = creepClaimer.claimController(ctrl);

        if(claimResult == ERR_NOT_IN_RANGE){

            creepClaimer.moveTo(ctrl, {visualizePathStyle: {stroke: '#cc00cc'}});

        }
    }
    else{
        const route = Game.map.findRoute(creepClaimer.room, "W26N18");
        if(route.length > 0) {
            //console.log(creep.name +' | Now heading to room '+route[0].room);
            const exit = creepClaimer.pos.findClosestByRange(route[0].exit);
            creepClaimer.moveTo(exit, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }*/

    //Game.spawns['Spawn1'].spawnCreep([CLAIM,MOVE], "Claimer01", {memory: {role: 'claimer'}});

    // Generate 1 pixel resource unit for 5000 CPU from your bucket
    if(Game.cpu.bucket > 9000) {
        Game.cpu.generatePixel();
    }

    // Clearing non-existing creep memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var rooms = ["W26N18", "W25N17", "W27N18", "W25N19"]

    console.log("-------------------------------------------------------------------------------------")

    for (var roomsNum = 0; roomsNum < rooms.length; roomsNum++) {
    //for(var roomName in Game.rooms){
        var roomName = rooms[roomsNum];
        var currentRoom = Game.rooms[roomName];

        currentRoom.stats = new Array();
        currentRoom.stats.harvesterQuantity = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.room == roomName && creep.ticksToLive > 50).length;
        currentRoom.stats.transporterQuantity = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter' && creep.memory.room == roomName && creep.ticksToLive > 50).length;
        currentRoom.stats.upgraderQuantity = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'  && creep.memory.room == roomName && creep.ticksToLive > 50).length;
        currentRoom.stats.builderQuantity = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'  && creep.memory.room == roomName && creep.ticksToLive > 50).length;
        currentRoom.stats.extensionsQuantity = currentRoom.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION) && structure.isActive();}}).length;
        currentRoom.stats.extractorQuantity = _.filter(Game.creeps, (creep) => creep.memory.role == 'extractor' && creep.memory.room == roomName && creep.ticksToLive > 50).length;
        currentRoom.stats.mineralQuantity = currentRoom.find(FIND_MINERALS)[0].mineralAmount;
        
        currentRoom.stats.fixerQuantity = _.filter(Game.creeps, (creep) => creep.memory.role == 'fixer'  && creep.memory.room == roomName && creep.ticksToLive > 50).length;

        console.log(roomName + " | Harvesters: " + currentRoom.stats.harvesterQuantity
                             + " | Extractors: " + currentRoom.stats.extractorQuantity
                             + " | Transporters: " + currentRoom.stats.transporterQuantity
                             + " | Upgraders: " + currentRoom.stats.upgraderQuantity
                             + " | Builders: " + currentRoom.stats.builderQuantity);

        if(currentRoom.stats.spawn){
            currentRoomSpawn = currentRoom.STATS.spawn;
        }
        else{
            currentRoomSpawn = currentRoom.find(FIND_MY_SPAWNS)[0];
            currentRoom.stats.spawn = currentRoomSpawn;
        }

        // STRUCTURE STATS
        if(Game.time % 50 == 0){
            currentRoom.memory.energyLinks = new Array();
            currentRoom.memory.containers = new Array();
            currentRoom.memory.energySources = new Array();
            currentRoom.memory.towers = new Array();

            var roomSources = currentRoom.find(FIND_SOURCES);
            for(var s = 0; s < roomSources.length; s++){
                currentRoom.memory.energySources[currentRoom.memory.energySources.length] = roomSources[s].id;
            }


            var roomStructures = currentRoom.find(FIND_STRUCTURES);
            for(var s = 0; s < roomStructures.length; s++){
                var currentStructure = roomStructures[s];
                if(!currentStructure.isActive()){continue;}

                // STRUCTURE_LINK
                if(currentStructure.structureType == STRUCTURE_LINK){
                    // check if link is near storage
                    var storageLink = currentStructure.pos.findInRange(FIND_STRUCTURES, 1, { filter: (structure) => { return (structure.structureType == STRUCTURE_STORAGE) && structure.isActive()}});
                    var controllerLink = currentStructure.pos.findInRange(FIND_STRUCTURES, 2, { filter: (structure) => { return (structure.structureType == STRUCTURE_CONTROLLER) && structure.isActive()}});

                    if(storageLink.length > 0){
                        currentRoom.memory.storageLink = currentStructure.id;
                    }
                    else if(controllerLink.length > 0){
                        currentRoom.memory.controllerLink = currentStructure.id;
                    }
                    else{
                        currentRoom.memory.energyLinks[currentRoom.memory.energyLinks.length] = currentStructure.id;
                    }
                }

                // STRUCTURE_CONTAINER
                else if(currentStructure.structureType == STRUCTURE_CONTAINER){
                    currentRoom.memory.containers[currentRoom.memory.containers.length] = currentStructure.id;
                }

                // STRUCTURE_TOWER
                else if(currentStructure.structureType == STRUCTURE_TOWER){
                    currentRoom.memory.towers[currentRoom.memory.towers.length] = currentStructure.id;
                }
            }
        }

        // in case the spawn is not ready yet
        if(currentRoomSpawn == undefined){
            continue;
        }


        // rejuvenate near spawn
        /*var rejuvenateCreep = currentRoomSpawn.pos.findInRange(FIND_CREEPS, 1, {filter: (creep) => {return creep}});

        for(var rejCreep = 0; rejCreep < rejuvenateCreep.length; rejCreep++){
            currentRoomSpawn.renewCreep(rejuvenateCreep[rejCreep]);
        }*/

        /////// spawning
        // harvesters
        if(currentRoom.memory.energySources){
            roleHarvester.run("creep", currentRoomSpawn, currentRoom.memory.energySources.length*2);
        }
        else{
           roleHarvester.run("creep", currentRoomSpawn, 2);
        }

        // transporters
        if(currentRoom.memory.containers && currentRoom.memory.containers.length >= 2 || currentRoom.memory.containers && currentRoom.memory.containers.length == 1 && currentRoom.memory.storageLink){
            roleTransporter.run("creep", currentRoomSpawn, 2);
        }
        else{
            roleTransporter.run("creep", currentRoomSpawn, 1);
        }

        // upgraders
        if(currentRoom.storage){
            var storageEnergy = currentRoom.storage.store.getUsedCapacity(RESOURCE_ENERGY);
            roleUpgrader.run("creep", currentRoomSpawn, 1 + Math.floor(storageEnergy/20000));
        }
        else if(currentRoom.memory.containers){
            var containerEnergy = 0;
            for(var c = 0; c < currentRoom.memory.containers.length; c++){
                containerEnergy += Game.getObjectById(currentRoom.memory.containers[c]).store.getUsedCapacity(RESOURCE_ENERGY);
            }

            if(containerEnergy*100/2000*currentRoom.memory.containers.length > 80){
                roleUpgrader.run("creep", currentRoomSpawn, 10);
            }
            else{
                roleUpgrader.run("creep", currentRoomSpawn, 1 + Math.floor(containerEnergy/500));
            }
        }
        else{
            roleUpgrader.run("creep", currentRoomSpawn, 1);
        }

        roleBuilder.run("creep", currentRoomSpawn, 1);

        // extractors
        roleExtractor.run("creep", currentRoomSpawn, 1);

        if(currentRoomSpawn.spawning) { 
            var spawningCreep = Game.creeps[currentRoomSpawn.spawning.name];
            currentRoomSpawn.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                currentRoomSpawn.pos.x + 1, 
                currentRoomSpawn.pos.y, 
                {align: 'left', opacity: 0.8});
        }

        /*if(roomName == "W25N17"){
            var roads = currentRoom.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_ROAD) && 
                            structure.isActive();                        
                }
            });

            for(var roadI=0; roadI < roads.length; roadI++){
                roads[roadI].destroy();
            }*/

            /*var emigrant = _.filter(Game.creeps, (creep) => creep.memory.role == 'emigrant' && creep.memory.roomTo == 'W26N17');
            console.log('W26N17 | Emigrants: ' + emigrant.length);
            if(emigrant.length < 3) {
                roleEmigrant.run("creep", "W26N17", "W25N17", 40, 2, 3, 1500, currentRoomSpawn);
            }*/

            /*var emigrant = _.filter(Game.creeps, (creep) => creep.memory.role == 'emigrant' && creep.memory.roomTo == 'W25N18');
            console.log('W25N18 | Emigrants: ' + emigrant.length);
            if(emigrant.length < 4) {
                roleEmigrant.run("creep", "W25N18", "W25N17", 50, 2, 4, 1500, currentRoomSpawn);
            }*/

            // link W25N17
            /*var sourceLinks = ['5f64f50ad419d1790cd70d30'];
            var targetLinks = ['5f64fae38b713b9c6f0ccdd8'];
            var extraLinks = ['5f81fa4d6c4b0d9de9c2462e']

            for (var i = 0; i < sourceLinks.length; i++) {
                var sourceLink = Game.getObjectById(sourceLinks[i]);

                if(sourceLink) {
                    var storedEnergy = sourceLink.store.getUsedCapacity(RESOURCE_ENERGY);
                    var targetLink = Game.getObjectById(targetLinks[0])
                    var targetLinkEnergy = targetLink.store.getUsedCapacity(RESOURCE_ENERGY);

                    if(storedEnergy >= 250){
                        for (var j = 0; j < targetLinks.length; j++) {
                            sourceLink.transferEnergy(targetLink);
                        }
                    }
                    else if(targetLinkEnergy > 200){
                        var extraLink = Game.getObjectById(extraLinks[0])
                        targetLink.transferEnergy(extraLink,targetLinkEnergy/4);
                    }
                }
            }*/

            // link W26N18
            /*var storageLink = Game.getObjectById('5f828000b38a85f8cd58bb08');

            var linkTargets = ['5f88c0d65e21e2710f9e334e','5f88c65b970aee089cb91690'];

            for (var i = 0; i < linkTargets.length; i++) {
                var sourceLink = Game.getObjectById(linkTargets[i]);

                if(sourceLink) {
                    var storedEnergy = sourceLink.store.getUsedCapacity(RESOURCE_ENERGY);

                    if(storedEnergy >= 250){
                        sourceLink.transferEnergy(storageLink);
                    }
                }
            }
        }*/

        var towerEnergySumPercentage = 0;

        if(currentRoom.memory.towers){

            for(var t=0; t < currentRoom.memory.towers.length; t++){
                towerEnergySumPercentage += Game.getObjectById(currentRoom.memory.towers[t]).store.getUsedCapacity(RESOURCE_ENERGY)/10;
            }

            towerEnergySumPercentage /= currentRoom.memory.towers.length;

            console.log(towerEnergySumPercentage)
        }

        var storageLink = Game.getObjectById(currentRoom.memory.storageLink);
        var controllerLink = Game.getObjectById(currentRoom.memory.controllerLink);

        // for each energy link
        if(storageLink){
            for(var l=0; l < currentRoom.memory.energyLinks.length; l++){
                var sourceLink = Game.getObjectById(currentRoom.memory.energyLinks[l])

                if(sourceLink) {
                    var storedEnergy = sourceLink.store.getUsedCapacity(RESOURCE_ENERGY);
                    var storageEnergy = currentRoom.storage.store.getUsedCapacity(RESOURCE_ENERGY)

                    if(storedEnergy >= 250){
                        if(towerEnergySumPercentage >= 92 && controllerLink && controllerLink.store.getUsedCapacity(RESOURCE_ENERGY) < 500 && storageEnergy > 20000 && currentRoom.energyAvailable > currentRoom.energyCapacityAvailable/2){
                            sourceLink.transferEnergy(controllerLink);
                        }
                        else{
                            sourceLink.transferEnergy(storageLink);
                        }
                    }
                }
            }
        }

        // storage -> controllerLink
        if(controllerLink && controllerLink.store.getUsedCapacity(RESOURCE_ENERGY) < 500 && storageLink && storageLink.store.getUsedCapacity(RESOURCE_ENERGY) > 200){
            storageLink.transferEnergy(controllerLink,storageLink.store.getUsedCapacity(RESOURCE_ENERGY)/4);
        }

        // towers
        var towers = currentRoom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER) && 
                        structure.isActive();                        
            }
        });

        // get target
        var lowestTowerTarget;

        var towerTargets = currentRoom.find(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax && structure.hits <= 25000
        });

        if(towerTargets.length > 0){
            lowestTowerTarget = _.min( towerTargets, function( structure ){ return structure.hits; });
        }

        for(var start=0; start < towers.length; start++){
            var currentTower = towers[start];

            var closestHostile = currentTower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                currentTower.attack(closestHostile);
                continue;
            }
            
            if(lowestTowerTarget) {
                if(currentTower.store.getUsedCapacity(RESOURCE_ENERGY) <= 900 && currentTower.store.getUsedCapacity(RESOURCE_ENERGY) > 500 && lowestTowerTarget.hits < 5000){
                    currentTower.repair(lowestTowerTarget);
                }
                else if(currentTower.store.getUsedCapacity(RESOURCE_ENERGY) > 900){
                    currentTower.repair(lowestTowerTarget);
                }
            }
        }
    }


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        /*if(creep.ticksToLive < 400){
            creep.memory.rejuvenate = true;
        }

        if(creep.ticksToLive > 1400){
            creep.memory.rejuvenate = false;
        }*/

        if(creep.memory.role == 'extravester') {
            roleEmigrant.run(creep);
        }
        if(creep.memory.role == 'emigrant') {
            roleEmigrant.run(creep);
        }
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'extractor') {
            roleExtractor.run(creep);
        }
        if(creep.memory.role == 'transporter') {
            roleTransporter.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            if(roleBuilder.run(creep) == false){
                roleUpgrader.run(creep);
            }
        }
        if(creep.memory.role == 'fixer') {
            if(roleFixer.run(creep) == false){
                roleUpgrader.run(creep);
            }
        }
    }
}