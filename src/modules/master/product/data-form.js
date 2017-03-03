import {inject, bindable, computedFrom} from 'aurelia-framework';

export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    constructor() { }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }
    activate() { }

    attached() {
    }

    bind() {
        if (this.data && this.data.uom)
            this.data.uom.toString = function () {
                return this.unit;
            };
    }

    uomChanged(e) {
        var selectedUom = e.detail;
        if (selectedUom)
            this.data.uomId = selectedUom._id;
    }

}
