var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep, spawn, num) {

        var creepNames = ["Nando", "Dario", "Zeca"];

        if(spawn){
            var roomName = spawn.room.name;
            var builderQuantity = Game.rooms[roomName].stats.builderQuantity;
            var extensionsQuantity = Game.rooms[roomName].stats.extensionsQuantity;
            var harvesterQuantity = Game.rooms[roomName].stats.harvesterQuantity;
            
            if(builderQuantity < num && harvesterQuantity > 1){
                var newName = 'Builder' + Game.time;

                // new name
                for (var i = 0; i < creepNames.length; i++) {
                    if(!Game.creeps[creepNames[i]]){
                        newName = creepNames[i];
                        break;
                    }
                }

                console.log('Spawning new builder: ' + newName);
                var creepBuild = new Array();

                for(var i=0; i < Math.floor((extensionsQuantity+6)/5); i++){
                    creepBuild[4*i] = MOVE;
                    creepBuild[4*i+1] = MOVE;
                    creepBuild[4*i+2] = CARRY;
                    creepBuild[4*i+3] = WORK;

                    if(i >= 3){break;}
                }
                
               spawn.spawnCreep(creepBuild, newName, {memory: {role: 'builder', room: spawn.room.name}});
            }
            return;
        }

        /*if(creep.name == "RemoteBuilder4" && creep.room.name != "W25N19"){
            return;
        }*/

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
            const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return;
            }

            return false;
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

            var collectTargets = [STRUCTURE_STORAGE, STRUCTURE_CONTAINER];

            for (var i = 0; i < collectTargets.length; i++) {
                var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == collectTargets[i]) && 
                                structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0 &&
                                structure.isActive();                        
                    }
                });

                if(target){
                    if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
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

            // no energy but has some in inventory, go build
            if(creep.store[RESOURCE_ENERGY] > 0){
                creep.memory.building = true;
                creep.say('🚧 build');
                return;
            }
	    }
        return true;
	}
};

module.exports = roleBuilder;