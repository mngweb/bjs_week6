export default class EventEmitter{
//class EventEmitter{
    
    constructor(){
        this.events = {};

        console.log("EventEmitter created");
    }

    on(type, fn) {

        if (!type || !fn) return;

        this.events[type] = this.events[type] || [];
        this.events[type].push(fn);

    }


    emit(type, data) {

        let fns = this.events[type];

        if (!fns || !fns.length) return;

        for (let i = 0; i < fns.length; i++) {
            fns[i](data);
        }

    };


}

// export default EventEmitter;