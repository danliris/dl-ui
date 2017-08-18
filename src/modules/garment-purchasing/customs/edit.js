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
    async activate(params) {
        var locale = 'id-ID';
        var moment = require('moment');
        moment.locale(locale);
        var id = params.id;
        this.data = await this.service.getById(id);
        var dataDelivery = await this.service.searchDeliveryOrder({ "supplier" : `${this.data.supplier.code}`, "currency" : `${this.data.currency.code}` });
        var items = [];
        for(var a of this.data.deliveryOrders){
            a["selected"] = true;
            a["isView"] = true;
            var quantity = 0;
            var totPrice = 0;
            for(var b of a.items){
                for(var c of b.fulfillments){
                    quantity += c.deliveredQuantity;
                    var priceTemp = c.deliveredQuantity * c.pricePerDealUnit;
                    totPrice += priceTemp;
                }
            }
            a["quantity"] = quantity;
            a["price"] = totPrice;
            items.push(a);
        }
        console.log(dataDelivery);
        for(var a of dataDelivery.data){
            a["selected"] = false;
            a["isView"] = true;
            var quantity = 0;
            var totPrice = 0;
            for(var b of a.items){
                for(var c of b.fulfillments){
                    quantity += c.deliveredQuantity;
                    var priceTemp = c.deliveredQuantity * c.pricePerDealUnit;
                    totPrice += priceTemp;
                }
            }
            a["quantity"] = quantity;
            a["price"] = totPrice;
            items.push(a);
        }
        this.data.deliveryOrders = items;
        this.data.customsDate = moment(this.data.customsDate).format("YYYY-MM-DD");
        this.data.validateDate = moment(this.data.validateDate).format("YYYY-MM-DD");
    }

    bind() {
        this.error = {};
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data._id });;
    }

    // determineActivationStrategy() {
    //     return activationStrategy.replace; 
    //     //replace the viewmodel with a new instance
    //     // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    //     // or activationStrategy.noChange to explicitly use the default behavior
    //     // return activationStrategy.invokeLifecycle;
    // }

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