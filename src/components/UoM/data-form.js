import {inject, bindable} from 'aurelia-framework';

export class DataForm {
    @bindable data = {};
    @bindable error = {};

    constructor() {

    }

    activate() {
         
    }

    attached() { 
        
    } 
    
    addUnit(default_unit) {
        if (!this.data.default)
            alert('Default Measurement must be specified.');
        else {
            var unit = {};
            unit.mainValue = default_unit.mainValue;
            unit.mainUnit = default_unit.mainUnit;
            unit.convertedValue = 0;
            unit.convertedUnit = '';

            if (!this.data.units)
                this.data.units = [];
            this.data.units.push(unit);
        }

    }

    removeUnit(unit) {
        var itemIndex = this.data.units.indexOf(unit);
        this.data.units.splice(itemIndex, 1);
    }
    
    bindDefaultMainValue(defaultMainValue) {
        this.data.default.convertedValue = defaultMainValue;
    }
    
    bindDefaultMainUnit(defaultMainUnit) {
        this.data.default.convertedUnit = defaultMainUnit;
    }
    

    create() {
        this.data = {};

    }
} 