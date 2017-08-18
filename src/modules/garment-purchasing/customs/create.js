import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {activationStrategy} from 'aurelia-router';

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
            this.data.expectedDeliveryDate == "";
        }
        if (this.data.validateDate == "undefined") {
            this.data.expectedDeliveryDate == "";
        }
        var dataCustoms = Object.assign({}, this.data);
        var items = [];
        if(dataCustoms.deliveryOrders && dataCustoms.deliveryOrders.lenght > 0){
            for(var a of dataCustoms.deliveryOrders){
                if(a && a.selected)
                    items.push(a);
            }
            dataCustoms.deliveryOrders = items;
        }
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
    }
}