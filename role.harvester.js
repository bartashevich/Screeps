var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, spawn, num) {

        if(spawn){
            var creepNames = ["Abilio", "Mario", "Julio", "Xico", "Vito"];
            var roomName = spawn.room.name;
            var harvesterQuantity = Game.rooms[roomName].stats.harvesterQuantity;
            var transporterQuantity = Game.rooms[roomName].stats.transporterQuantity;
            var extensionsQuantity = Game.rooms[roomName].stats.extensionsQuantity;

            if(harvesterQuantity < num){
                var newName = 'Harvester' + Game.time;

                // new name
                for (var i = 0; i < creepNames.length; i++) {
                    if(!Game.creeps[creepNames[i]]){
                        newName = creepNames[i];
                        break;
                    }
                }

                console.log('Spawning new harvester: ' + newName);
                var creepBuild = new Array();
                creepBuild[0] = CARRY;
                creepBuild[1] = WORK;
                creepBuild[2] = MOVE;

                for(var i=0; i < Math.floor((spawn.room.energyAvailable/50-4)/3); i++){
                    creepBuild[creepBuild.length] = WORK;
                    creepBuild[creepBuild.length] = MOVE;

                    if(i >= 1){break;}
                }

                // set harvest target
                var sources = spawn.room.find(FIND_SOURCES);

                for (var i = 0; i < sources.length; i++) {
                    var harvesterTargets = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.room == roomName && creep.memory.target == sources[i].id).length;
                    if(harvesterTargets < 2){
                        var sourceTarget = sources[i].id;
                        break;
                    }
                }

                if(sourceTarget){
                    spawn.spawnCreep(creepBuild, newName, {memory: {role: 'harvester', room: spawn.room.name, target: sourceTarget}});
                }
            }
            return;
        }

        // rejuvenate
        /*if(creep.memory.rejuvenate && creep.store.getUsedCapacity() == 0){
            var spawnTarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN) && 
                            structure.isActive();
                }
            });

            creep.moveTo(spawnTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
            creep.say("Rejuvenate");
            return;
        }*/

        var transporterQuantity = Game.rooms[creep.room.name].stats.transporterQuantity;

        // decide current creep state
        if(creep.store.getFreeCapacity() == 0){
            creep.say("Dump");
            creep.memory.harvest = false;
        }
        else if(creep.store.getUsedCapacity() == 0){
            creep.say("Harvest");
            creep.memory.harvest = true;
        }

        // execute current state
        if(creep.memory.harvest) {
            if(!creep.memory.target){
                var sources = creep.room.find(FIND_SOURCES);
                creep.memory.target = sources[0].id
            }

            var target = Game.getObjectById(creep.memory.target);

            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var buildTarget = creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 1, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_LINK) || (structure.structureType == STRUCTURE_CONTAINER)
                }
            });

            if (buildTarget.length) {
                if(creep.build(buildTarget[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(buildTarget[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return;
            }

            var repairTarget = creep.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && structure.hits < (structure.hitsMax/2)
                }
            });

            if (repairTarget.length) {
                if(creep.repair(repairTarget[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairTarget[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return;
            }

            var dumpTargets = [STRUCTURE_LINK, STRUCTURE_CONTAINER];

            for (var i = 0; i < dumpTargets.length; i++) {
                var target = creep.pos.findInRange(FIND_STRUCTURES, 5, {
                    filter: (structure) => {
                        return (structure.structureType == dumpTargets[i]) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 &&
                                structure.isActive();
                    }
                });

                if(target.length > 0) {
                    if(creep.transfer(target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    return;
                }
            }
        }
	}
};

module.exports = roleHarvester;