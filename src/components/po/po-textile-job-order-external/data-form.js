import {inject, bindable} from 'aurelia-framework';

export class DataForm {
    @bindable data = {};
    @bindable error = {};

    uri = "http://dl-core-api.mybluemix.net/v1/core/textiles";

    constructor() {

    }

    addItem() {
        this.data.items = this.data.items ? this.data.items : [];
        this.data.items.push({product:{name:'santos'}});
        console.log(this.data);
    }
    removeItem(item)
    {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }
} 