import {inject, bindable, computedFrom} from 'aurelia-framework';

export class DataForm {
    @bindable title;
    @bindable readOnly = false;
    @bindable data = { "import": true };
    @bindable error = {};
    // @bindable Options = {
    //     "readOnly": false,
    //     "isMaster": true
    // }



    constructor() {

    }
    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
    }

    activate() {

    }

    listIndicatorsColumns = [
      { header: "Indikator", value: "indicator" },
      { header: "Tipe Data", value: "dataType" },
      { header: "Petunjuk Data", value: "defaultValue" },
      { header: "Satuan", value: "uom" },
    ]

    

    get addListIndicators() {
      return (event) => {
        this.data.indicators.push({})
      };
    }

    attached() {

    }



} 
