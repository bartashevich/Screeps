var roleEmigrant = {

    /** @param {Creep} creep **/
    run: function(creep, roomTo, roomFrom, tickDistance, tripsNum, creepNum, resourceAmount, spawn) {

        //var creep2 = Game.creeps["Borys"];

        if(creep != "creep" && creep.room.name == "W26N18"){
            if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.building = false;
                creep.say('🔄 harvest');
            }
            if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
                creep.memory.building = true;
                creep.say('🚧 build');
            }

            if(creep.memory.building){
                var target = Game.getObjectById('5f7b35160a16d530c2781f3c');
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return;
            }
            else{
                var source = Game.getObjectById('5bbcab7c9099fc012e6339bf');

                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                return;
            }
        }

        var creepNames = ["Sergei", "Yuri", "Borys", "Eugene", "Fedor", "Wolodymyr", "Igor", "Viktor", "Yevheniy"];

        var emigrantQuanty = _.filter(Game.creeps, (creep) => creep.memory.role == 'emigrantQuanty' && creep.memory.roomTo == roomTo);

        if(spawn){
            if(emigrantQuanty < creepNum){
                var energyPerTicksToHarvest = Math.ceil(resourceAmount/(300-tickDistance*2*tripsNum));
                var workPerCreep = Math.ceil(energyPerTicksToHarvest/creepNum/tripsNum);
                var carryPerCreep = Math.ceil(resourceAmount/creepNum/tripsNum/50);
                var movePerCreep = Math.ceil(workPerCreep + carryPerCreep + 3); // +3 ATTACK
                var totalCreepCost = workPerCreep * 100 + carryPerCreep * 50 + movePerCreep * 50 + 80 * 3; // +80*3 ATTACK

                var creepBuild = new Array();
                creepBuild[0] = HEAL;
                creepBuild[1] = RANGED_ATTACK;
                creepBuild[2] = RANGED_ATTACK;

                while(workPerCreep > 0 || carryPerCreep > 0 || movePerCreep > 0){
                    if (workPerCreep > 0){creepBuild[creepBuild.length] = WORK; workPerCreep--;}
                    if (movePerCreep > 0){creepBuild[creepBuild.length] = MOVE; movePerCreep--;}
                    if (carryPerCreep > 0){creepBuild[creepBuild.length] = CARRY; carryPerCreep--;}
                }

                // reverse array
                creepBuild.reverse();

                var newName = 'Emigrant' + Game.time;

                // new name
                for (var i = 0; i < creepNames.length; i++) {
                    if(!Game.creeps[creepNames[i]]){
                        newName = creepNames[i];
                        break;
                    }
                }

                console.log('Spawning new emigrant: ' + newName);
                spawn.spawnCreep(creepBuild, newName, {memory: {role: 'emigrant', room: spawn.room.name, roomTo: roomTo, roomFrom: roomFrom}});
            }
            return;
        }

        creep.heal();

        // attack if find an enemy
        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            //creep.moveTo(closestHostile, {visualizePathStyle: {stroke: '#ffaa00'}});
            creep.rangedAttack(closestHostile);
            creep.say("ATTACK");
            return;
        }

        // decide current creep state
        if(creep.store.getFreeCapacity() == 0){
            creep.say("Dump");
            creep.memory.harvest = false;
        }
        else if(creep.store.getUsedCapacity() == 0){
            creep.say("Harvest");
            creep.memory.harvest = true;
        }

        if(creep.memory.harvest) {
            if(creep.room.name != creep.memory.roomTo){
                // go to another room
                const route = Game.map.findRoute(creep.room, creep.memory.roomTo);
                if(route.length > 0) {
                    const exit = creep.pos.findClosestByRange(route[0].exit);
                    creep.moveTo(exit, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                return;
            }

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
            
            // if creep room is not original, break
            if(creep.room.name != creep.memory.roomFrom){
                const route = Game.map.findRoute(creep.room, creep.memory.roomFrom);
                if(route.length > 0) {
                    //console.log(creep.name +' | Now heading to room '+route[0].room);
                    const exit = creep.pos.findClosestByRange(route[0].exit);
                    creep.moveTo(exit, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                return;
            }

            var dumpTargets = [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_STORAGE];

            for (var i = 0; i < dumpTargets.length; i++) {
                var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == dumpTargets[i]) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 &&
                                structure.isActive();                        
                    }
                });

                if(targets) {
                    if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    return;
                }
            }
        }
	}
};

module.exports = roleEmigrant;