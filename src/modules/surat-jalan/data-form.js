import {inject, bindable} from 'aurelia-framework';

export class DataForm {
    @bindable data = {};
    @bindable error = {};

    uriSupplier = require('../../host').core + "/v1/core/suppliers";
    uri = require('../../host').core + "/v1/po/garmentjoborderfabrics";

    constructor() {

    }

    activate() {

    }

    attached() {
        if (this.data.items) {
            this.data.items.forEach(item => {
                item.showDetails = true
            })
        }
    }

    mapSupplier(result) {
        var list = result.data.map(item => {
            var _item = item;
            _item.labelSupplier = `${_item.code} - ${_item.name}`;
            return _item
        });
        return list;
    }

    addPO() {
        if (!this.data.items)
            this.data.items = [];
        this.data.items.push({ showDetails: false } );
    }

    removePO(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }

    horseyChanged(index, event) {
        Object.assign(this.data.items[index], event.detail);
    }

    showDetail(item) {
        if (item.showDetails)
            item.showDetails = false;
        else
            item.showDetails = true;
    }

    removeProduct(po, poItem) {
        var poIndex = this.data.items.indexOf(po);
        var poItemIndex = this.data.items[poIndex].indexOf(poItem);
        this.data.items[poIndex].items.splice(poItemIndex, 1);
    }
} 