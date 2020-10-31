var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep, spawn, num) {
        var creepNames = ["Tonio", "Ze", "Jaquim", "Manel", "Casimiro"];

        if(spawn){
            var roomName = spawn.room.name;
            var upgraderQuantity = Game.rooms[roomName].stats.upgraderQuantity;
            var extensionsQuantity = Game.rooms[roomName].stats.extensionsQuantity;
            var harvesterQuantity = Game.rooms[roomName].stats.harvesterQuantity;

            if(upgraderQuantity < num && harvesterQuantity > 1){
                var newName = 'Upgrader' + Game.time;

                // new name
                for (var i = 0; i < creepNames.length; i++) {
                    if(!Game.creeps[creepNames[i]]){
                        newName = creepNames[i];
                        break;
                    }
                }

                console.log('Spawning new upgrader: ' + newName);
                var creepBuild = new Array();

                for(var i=0; i < Math.floor((extensionsQuantity+6)/5); i++){
                    creepBuild[4*i] = MOVE;
                    creepBuild[4*i+1] = MOVE;
                    creepBuild[4*i+2] = CARRY;
                    creepBuild[4*i+3] = WORK;

                    if(i >= 2){break;}
                }
                
                spawn.spawnCreep(creepBuild, newName, {memory: {role: 'upgrader', room: spawn.room.name}});
            }
            return;
        }

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            // if find dropped energy
            var dropenergy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 3, {
                filter: (d) => {return d}});

            if (dropenergy.length > 0) {
                if (creep.pickup(dropenergy[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropenergy[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.say("PICKING");
                }
                return;
            }

            var controllerLink = Game.getObjectById(creep.room.memory.controllerLink);

            if(controllerLink && controllerLink.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
                if(creep.withdraw(controllerLink, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(controllerLink, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return;
            }

            var collectTargets = [STRUCTURE_STORAGE, STRUCTURE_CONTAINER];

            for (var i = 0; i < collectTargets.length; i++) {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == collectTargets[i]) && 
                                structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0 &&
                                structure.isActive();                        
                    }
                });

                targets.sort((a,b) => b.store.getUsedCapacity(RESOURCE_ENERGY) - a.store.getUsedCapacity(RESOURCE_ENERGY));

                if(targets.length > 0){
                    if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    return;
                }
            }
            
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (source) {
                if(creep.harvest(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return;
            }
        }
	}
};

module.exports = roleUpgrader;