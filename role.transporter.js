var roleTransporter = {

    /** @param {Creep} creep **/
    run: function(creep, spawn, num) {

        if(spawn){
            var creepNames = ["Jason", "Staten"];
            var roomName = spawn.room.name;
            var transporterQuantity = Game.rooms[roomName].stats.transporterQuantity;
            var harvesterQuantity = Game.rooms[roomName].stats.harvesterQuantity;
            
            if(transporterQuantity < num && harvesterQuantity > 0){

                var newName = 'Transporter' + Game.time;

                // new name
                for (var i = 0; i < creepNames.length; i++) {
                    if(!Game.creeps[creepNames[i]]){
                        newName = creepNames[i];
                        break;
                    }
                }

                console.log('Spawning new transporter: ' + newName);
                var creepBuild = new Array();

                for(var i=0; i < Math.floor((spawn.room.energyAvailable/50)/2); i++){
                    creepBuild[2*i] = MOVE;
                    creepBuild[2*i+1] = CARRY;

                    if(i >= 5){break;}
                }

                spawn.spawnCreep(creepBuild, newName, {memory: {role: 'transporter', room: spawn.room.name}});
            }
            return;
        }

        // decide current creep state
        if(creep.store.getFreeCapacity() == 0){
            creep.memory.withdraw = false;
        }
        else if(creep.store.getUsedCapacity() == 0){
            creep.memory.withdraw = true;
        }

        if(creep.memory.withdraw){
            if(!creep.memory.target){
                // check if storage link exist
                var storageLink = Game.getObjectById(creep.room.memory.storageLink);
                if(storageLink && storageLink.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
                    creep.memory.target = creep.room.memory.storageLink;
                }
                // try to obtain resources from a container
                else{
                    var currentMaxContainerUsedCapacity = 0;
                    creep.room.memory.containerSum = 0;
                    for(var c = 0; c < creep.room.memory.containers.length; c++){
                        var roomContainerUsedCapacity = Game.getObjectById(creep.room.memory.containers[c]).store.getUsedCapacity(RESOURCE_ENERGY);

                        if(currentMaxContainerUsedCapacity < roomContainerUsedCapacity){
                            currentMaxContainerUsedCapacity = roomContainerUsedCapacity;
                            creep.memory.target = creep.room.memory.containers[c];
                        }

                        creep.room.memory.containerSum += roomContainerUsedCapacity;
                    }
                }
            }

            if(creep.memory.target){
                if(creep.withdraw(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                else if(creep.withdraw(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
                    creep.memory.withdraw = false;
                    creep.memory.target = undefined;
                }
            }
        }

        /*if(creep.room.name == "W25N17"){
            var storageLink = Game.getObjectById('5f64fae38b713b9c6f0ccdd8');
            var storageLinkEnergy = storageLink.store.getUsedCapacity(RESOURCE_ENERGY);
        }
        else if(creep.room.name == "W26N18"){
            var storageLink = Game.getObjectById('5f828000b38a85f8cd58bb08');
            var storageLinkEnergy = storageLink.store.getUsedCapacity(RESOURCE_ENERGY);
        }

        // TMP: get container
        var containers = creep.room.find(FIND.structures, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && 
                        structure.isActive();                        
            }
        });

        if(containers.length > 0){
            var highestContainer = _.max( containers, function( container ){ return container.store.getUsedCapacity(); });
        }

        // execute current state
        if(highestContainer && creep.store.getUsedCapacity() == 0 && creep.room.name == "W27N18"){
            if(creep.withdraw(highestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(highestContainer, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else if(storageLinkEnergy > 0 && creep.store.getUsedCapacity() == 0) {
            if(storageLinkEnergy > 0){
                if(creep.withdraw(storageLink, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storageLink, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }*/
        else {
            var dumpTargets = [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_TOWER, STRUCTURE_STORAGE];
            var dumpTargetsMinCapacity = [0, 0, 90, 0];

            for (var i = 0; i < dumpTargets.length; i++) {
                var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == dumpTargets[i]) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > dumpTargetsMinCapacity[i] &&
                                structure.isActive();                        
                    }
                });

                if(target) {
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#FF0000'}});
                    }
                    return;
                }
            }
        }
	}
};

module.exports = roleTransporter;