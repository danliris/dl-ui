import {inject, bindable} from 'aurelia-framework';

export class DataForm {
    @bindable data = {};
    @bindable error = {};
    
    uriSupplier = require('../../host').core + "/v1/core/suppliers";
    uri= require('../../host').core + "/v1/po/garmentjoborderfabrics";
    
    showPO=false;
    
    constructor() {

    }

    activate() {
         
    }

    attached() { 
        
    } 
    
    mapSupplier(result) {
        var list = result.data.map(item => {
            var _item = item;
            _item.labelSupplier = `${_item.code} - ${_item.name}`;

            console.log(_item);
            return _item
        });

        return list;
    }
    
    addPO()
    {
        this.showPO=true;
        this.data.items = this.data.items ? this.data.items : [];
        this.data.items.push({ purchaseOrder: { RONo: '' } });
    }
    
    remove(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }
} 