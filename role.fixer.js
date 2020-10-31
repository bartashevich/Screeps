var roleFixer = {

    /** @param {Creep} creep **/
    run: function(creep, spawn, num) {
        var creepNames = ["Blabla", "awfgawfa", "xfafwa", "gawgaw", "wagawgwa"];

        if(spawn){
            var roomName = spawn.room.name;
            var fixerQuantity = Game.rooms[roomName].stats.fixerQuantity;
            var extensionsQuantity = Game.rooms[roomName].stats.extensionsQuantity;

            if(fixerQuantity < num){
                var newName = 'Fixer' + Game.time;

                // new name
                for (var i = 0; i < creepNames.length; i++) {
                    if(!Game.creeps[creepNames[i]]){
                        newName = creepNames[i];
                        break;
                    }
                }

                console.log('Spawning new fixer: ' + newName);
                var creepBuild = new Array();

                for(var i=0; i < Math.floor((extensionsQuantity+6)/5); i++){
                    creepBuild[4*i] = MOVE;
                    creepBuild[4*i+1] = MOVE;
                    creepBuild[4*i+2] = CARRY;
                    creepBuild[4*i+3] = WORK;

                    if(i >= 2){break;}
                }

                spawn.spawnCreep(creepBuild, newName, {memory: {role: 'fixer', room: spawn.room.name}});
            }
            return;
        }

        if(creep.memory.fixing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.fixing = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.fixing && creep.store.getFreeCapacity() == 0) {
	        creep.memory.fixing = true;
	        creep.say('⚡ fixing');
	    }

	    if(creep.memory.fixing) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                //filter: object => object.hits < (object.hitsMax/2) && object.hits < 25000
                filter: object => object.hits < (object.hitsMax) && object.hits < 25000
            });

            targets.sort((a,b) => a.hits - b.hits);

            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});    
                }
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

            var collectTargets = [STRUCTURE_STORAGE, STRUCTURE_CONTAINER];

            for (var i = 0; i < collectTargets.length; i++) {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == collectTargets[i]) && 
                                structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0 &&
                                structure.isActive();                        
                    }
                });

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

module.exports = roleFixer;