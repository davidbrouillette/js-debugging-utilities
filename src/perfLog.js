const PerfLog = {
    groups: {},

    now: () => {
        return performance.now();
    },
    mark: (name) => {
        if(name){
            performance.mark(`start ${name}`)
        }
    },
    stop: (name) => {
        if (name) {
            performance.mark(`end ${name}`);
            performance.measure(name, `start ${name}`, `end ${name}`);
            let entries = performance.getEntriesByName(name);
            return entries[entries.length - 1];
        }
        return {};
    },
    markGroup: function(groupName, markName) {
        if(groupName && markName){
            if(!this.groups[groupName]){
                this.groups[groupName] = []
            }

            let markTag = `${groupName}:${markName}`;
            performance.mark(markTag);
            this.groups[groupName].push(markTag);
        }
    },
    stopGroup: function(groupName) {
        if(groupName && this.groups[groupName]){
            let measureNames = [];
            let endMark = `${groupName} end`;
            performance.mark(endMark);

            let startMark = this.groups[groupName][0];
            let currentName;
            this.groups[groupName].forEach((current, index, arr) => {
                    if(index !== 0){
                        let markName = current.split(':')[1];
                        currentName = `${startMark} -> ${markName}`;
                        measureNames.push(currentName);
                        performance.measure(currentName, startMark, current);
                    }
            });
            
            let beginningToEnd = `${startMark} -> ${groupName} end`;
            performance.measure(beginningToEnd, startMark, endMark);
            measureNames.push(beginningToEnd);

            let output = measureNames.map((entry, index, arr) => {
                return performance.getEntriesByName(entry)[0];
            });

            console.log(`Performance Group ${groupName}: %o`, output);
            
            console.table(output, ["name", "duration"]);
        } else {
            console.error(`${groupName} does not exist. Use 'markGroup' to begin tracking`);
        }
    },
    clearAll: () => {
        performance.clearMarks();
        performance.measures();
    },
    getEntries: () => {
        return performance.getEntriesByType('measure');
    },
    getMemory: () => {
        return performance.memory;
    },
    getTimings: () => {
        return performance.timing;
    }
}


export default PerfLog;