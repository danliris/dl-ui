import {inject, bindable} from 'aurelia-framework';

export class UomEditor {
    @bindable data = {};
    @bindable error = {};
    @bindable uom = {};
    uomApiUri = require('../../host').core + '/v1/core/uoms/categorylist';
    
    constructor() { }
    activate() { }
    attached() { }

    addUnit(default_unit) {
        if (!this.data.UoM.default)
            alert('Default Measurement must be specified.');
        else {
            var unit = {};
            unit.mainValue = default_unit.mainValue;
            unit.mainUnit = default_unit.mainUnit;
            unit.convertedValue = 0;
            unit.convertedUnit = '';

            if (!this.data.UoM.units)
                this.data.UoM.units = [];
            this.data.UoM.units.push(unit);
        }

    }

    removeUnit(unit) {
        var itemIndex = this.data.UoM.units.indexOf(unit);
        this.data.UoM.units.splice(itemIndex, 1);
    }

    create() {
        this.data.UoM = {};

    }
} 
