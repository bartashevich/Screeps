var roleExtractor = {

    /** @param {Creep} creep **/
    run: function(creep, spawn, num) {

        if(spawn){
            var creepNames = ["Digger", "Diggor", "Diggar"];
            var roomName = spawn.room.name;
            var extractorQuantity = Game.rooms[roomName].stats.extractorQuantity;
            var transporterQuantity = Game.rooms[roomName].stats.transporterQuantity;
            var extensionsQuantity = Game.rooms[roomName].stats.extensionsQuantity;
            var mineralQuantity = Game.rooms[roomName].stats.mineralQuantity;
            var controllerLevel = Game.rooms[roomName].controller.level;

            if(extractorQuantity < num && mineralQuantity > 0 && controllerLevel >= 6){

                var newName = 'Extractor' + Game.time;

                // new name
                for (var i = 0; i < creepNames.length; i++) {
                    if(!Game.creeps[creepNames[i]]){
                        newName = creepNames[i];
                        break;
                    }
                }

                console.log('Spawning new extractor: ' + newName);
                var creepBuild = new Array();

                for(var i=0; i < Math.floor((extensionsQuantity+6)/5); i++){
                    creepBuild[4*i] = MOVE;
                    creepBuild[4*i+1] = MOVE;
                    creepBuild[4*i+2] = CARRY;
                    creepBuild[4*i+3] = WORK;

                    if(i >= 4){break;}
                }
                spawn.spawnCreep(creepBuild, newName, {memory: {role: 'extractor', room: spawn.room.name}});
            }
            return;
        }

        if(creep.memory.extracting && creep.carryCapacity == _.sum(creep.carry)){
            creep.memory.extracting = false;
        }

        if(!creep.memory.extracting && 0 == _.sum(creep.carry)){
            creep.memory.extracting = true;
        }

        // execute current state
        if(creep.memory.extracting) {
            var target = creep.room.find(FIND_MINERALS);
            creep.memory.mineralType = target[0].mineralType;

            if(creep.harvest(target[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var dumpTargets = [STRUCTURE_STORAGE];

            for (var i = 0; i < dumpTargets.length; i++) {
                var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == dumpTargets[i]) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 &&
                                structure.isActive();
                    }
                });

                if(targets) {
                    if(creep.transfer(targets, creep.memory.mineralType) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                        return;
                    }
                }
            }
        }
	}
};

module.exports = roleExtractor;