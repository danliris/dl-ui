import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {activationStrategy} from 'aurelia-router';

var moment = require('moment');

@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;
    
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    async activate(params) {
        
        var locale = 'id-ID';
        var moment = require('moment');
        this.item = "";
        moment.locale(locale);
        var id = params.id;
       
        this.data = await this.service.getById(id);
        var supplierId=this.data.supplier._id ? this.data.supplier._id : this.data.supplier.Id;
        var currencyCode=this.data.currency.code ? this.data.currency.code : this.data.currency.Code;
        //Get Data DO
        var dataDelivery = await this.service.searchDeliveryOrder({ "supplier" : `${supplierId}`, "currency" : `${currencyCode}` });
        var dataDeliveryNonPO = await this.service.searchDeliveryOrderNonPO({ "supplier" : `${supplierId}`, "currency" : `${currencyCode}` });

        //Mapping items table by data Items
        this.data.deliveryOrders = this.data.items.filter(x => x.deliveryOrderNonPO == null);
        this.data.deliveryOrderNonPO = this.data.items.filter(x => x.deliveryOrderNonPO != null);

        //Mapping data DO With PO
        var items = [];
        for(var a of this.data.deliveryOrders){
            a["selected"] = true;
            a["isView"] = true;
            a["doNo"]=a.deliveryOrder.doNo;
            a["doDate"]=a.deliveryOrder.doDate;
            a["arrivalDate"]=a.deliveryOrder.arrivalDate;
            a["quantity"] = a.quantity;
            a["price"] = a.deliveryOrder.totalAmount;
            a["doId"]=a.deliveryOrder.Id;
            a["IsPO"]=a.deliveryOrder.IsPO;
           
            items.push(a);
        }
        for(var a of dataDelivery.data){
            a["doId"]=a.Id;
            a["selected"] = false;
            a["isView"] = true;
            var quantity = 0;
            var totPrice = 0;
            for(var b of a.items){
                for(var c of b.fulfillments){
                    quantity += c.doQuantity;
                    var priceTemp = c.doQuantity * c.pricePerDealUnit;
                    totPrice += priceTemp;
                }
             }
            a["quantity"] = quantity;
            a["price"] = totPrice;
            a["IsPO"]=true;
            a.Id=0;
            a._id=0;
            items.push(a);
        }
        this.data.deliveryOrders = items;
 
        //Mapping data DO Non PO
        var itemsNonPO = [];
        for(var a of this.data.deliveryOrderNonPO){
            a["selected"] = true;
            a["isView"] = true;
            a["doNo"]=a.deliveryOrderNonPO.doNo;
            a["doDate"]=a.deliveryOrderNonPO.doDate;
            a["arrivalDate"]=a.deliveryOrderNonPO.arrivalDate;
            a["quantity"] = a.quantity;
            a["price"] = a.deliveryOrderNonPO.totalAmount;
            a["doId"]=a.deliveryOrderNonPO.Id;
            a["IsPO"]=a.deliveryOrderNonPO.IsPO;
           
            itemsNonPO.push(a);
        }

        for(var a of dataDeliveryNonPO.data){
            a["doId"]=a.Id;
            a["selected"] = false;
            a["isView"] = true;
            var quantity = 0;
            var totPrice = 0;
            for (var b of a.items) {
                quantity += b.Quantity;
                var priceTemp = b.Quantity * b.PricePerDealUnit;
                totPrice += priceTemp;
            }
            a["quantity"] = quantity;
            a["price"] = totPrice.toFixed(3);
            a["IsPO"]=false;
            a.Id=0;
            a._id=0;
            itemsNonPO.push(a);
        }
        this.data.deliveryOrderNonPO = itemsNonPO;
      
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
            delete this.data.customsDate
        }
        if (this.data.validateDate == "undefined") {
            delete this.data.validateDate == "";
        }
        if(this.data.customsDate && this.data.customsDate !== "")
            this.data.customsDate = moment(this.data.customsDate).format("YYYY-MM-DD");
        if(this.data.validateDate && this.data.validateDate !== "")
            this.data.validateDate = moment(this.data.validateDate).format("YYYY-MM-DD");
        var dataCustoms = Object.assign({}, this.data);

        var items = [];
        var isSelectedData = false;
        //Mapping DO with PO
        if(dataCustoms.deliveryOrders && dataCustoms.deliveryOrders.length > 0){
            for(var a of dataCustoms.deliveryOrders){
                if(a){
                    var deliveryOrder={};
                    deliveryOrder.doNo=a.doNo;
                    deliveryOrder.Id=a.doId;
                    deliveryOrder.doDate=a.doDate;
                    deliveryOrder.totalAmount=a.totalAmount;
                    deliveryOrder.arrivalDate=a.arrivalDate;
                    deliveryOrder.IsPO=a.IsPO;
                    a.deliveryOrder=deliveryOrder;
                    items.push(a);
                    isSelectedData = true;
                }
            }
            dataCustoms.deliveryOrders = items.filter(x => x.deliveryOrder.IsPO == true);

        }

        //Mapping DO Non PO
        if(dataCustoms.deliveryOrderNonPO && dataCustoms.deliveryOrderNonPO.length > 0){
            for(var a of dataCustoms.deliveryOrderNonPO){
                if(a){
                    var deliveryOrderNonPO={};
                    deliveryOrderNonPO.doNo=a.doNo;
                    deliveryOrderNonPO.Id=a.doId;
                    deliveryOrderNonPO.doDate=a.doDate;
                    deliveryOrderNonPO.totalAmount=a.totalAmount;
                    deliveryOrderNonPO.arrivalDate=a.arrivalDate;
                    deliveryOrderNonPO.IsPO=a.IsPO;
                    a.deliveryOrder=deliveryOrderNonPO;
                    // items.push({deliveryOrder : deliveryOrderNonPO});
                    items.push(a);
                    isSelectedData = true;
                }
            }
            dataCustoms.deliveryOrderNonPO = items.filter(x => x.deliveryOrder.IsPO == false);
        }
  
        if(items.length > 0){
            dataCustoms.items = items;
        }

        if(isSelectedData){
            this.service.update(dataCustoms)
                .then(result => {
                    alert("Data berhasil diubah");
                    this.router.navigateToRoute('view', { id: this.data._id });
                })
                .catch(e => {
                    this.error = e;
                    if(e.deliveryOrders.length > 0){
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