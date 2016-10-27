import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
var moment = require('moment');

@inject(Router, Service, BindingEngine, Element)
export class Create {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    constructor(router, service, bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
        this.router = router;
        this.service = service;
    }

    back() {
        this.router.navigateToRoute('list');
    }

    unitChanged(e) {
        var selectedUnit = e.detail || {};
        if (selectedUnit)
            this.data.unitId = selectedUnit._id ? selectedUnit._id : "";
    }

    removeItem(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }
    
    budgetChanged(e) {
        var selectedbudget = e.detail || {};
        this.data.budgetId = selectedbudget._id ? selectedbudget._id : "";
    }

    categoryChanged(e) {
        var selectedcategory = e.detail || {};
        if (selectedcategory)
            this.data.categoryId = selectedcategory._id ? selectedcategory._id : "";
    }

    save() {  
        if(this.data.expectedDeliveryDate=="undefined")
        {
            this.data.expectedDeliveryDate=="";
        }
        this.service.create(this.data)
            .then(result => {
                this.back();
            })
            .catch(e => { 
                this.error = e;
            })
    }
}