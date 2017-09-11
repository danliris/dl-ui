import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {activationStrategy} from 'aurelia-router';

var moment = require('moment');

@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    activate(params) {

    }
    bind() {
        this.data = { deliveryOrders: [] };
        this.error = {};
        this.item = "";
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; 
        //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
        // return activationStrategy.invokeLifecycle;
    }

    save(event) {
        if (this.data.customsDate == "undefined") {
            delete this.data.customsDate;
        }
        if (this.data.validateDate == "undefined") {
            delete this.data.validateDate;
        }
        if(this.data.customsDate && this.data.customsDate !== "")
            this.data.customsDate = moment(this.data.customsDate).format("YYYY-MM-DD");
        if(this.data.validateDate && this.data.validateDate !== "")
            this.data.validateDate = moment(this.data.validateDate).format("YYYY-MM-DD");
        var dataCustoms = Object.assign({}, this.data);
        var items = [];
        var isSelectedData = false;
        if(dataCustoms.deliveryOrders && dataCustoms.deliveryOrders.length > 0){
            this.item = "";
            for(var a of dataCustoms.deliveryOrders){
                if(a && a.selected){
                    items.push(a);
                    isSelectedData = true;
                }
            }
            dataCustoms.deliveryOrders = items;
        }
        if(isSelectedData){
            this.service.create(dataCustoms)
                .then(result => {
                    alert("Data berhasil dibuat");
                    this.router.navigateToRoute('create',{}, { replace: true, trigger: true });
                })
                .catch(e => {
                    this.error = e;
                    if(e.deliveryOrders.lenght > 0){
                        var itemErrors = [];
                        for(var a of this.data.deliveryOrders){
                            var error = {};
                            var item = e.deliveryOrders.find(dataItem => dataItem.dOrderNumber === a.no)
                            if(item)
                                error["no"] = item.no;
                            itemErrors.push(error);
                        }
                        this.error.deliveryOrders = itemErrors;
                    }
                })
        }else{
            this.item = "Surat Jalan Harus dipilih";
        }
    }
}