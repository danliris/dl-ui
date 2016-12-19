import {inject, bindable, BindingEngine, observable, computedFrom,Lazy} from 'aurelia-framework'
var moment = require('moment');
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service,BindingEngine, Element,Service)
export class Edit {

    constructor(router, service,bindingEngine, element,) {
        this.router = router;
        this.service = service;
        this.bindingEngine = bindingEngine;
        this.element = element;
    }
    processOptions = ['Finishing','Printing','Yarn Dyed'];
    RUNOptions=['Tanpa RUN','1 RUN', '2 RUN'];

    async activate(params) {
        var orderNo = params.no;
        var id=params.id;
        var dataSales=await this.service.getById(id);
        for(var i of dataSales.productionOrders){
            if(i.orderNo==orderNo)
            {
                i.dataId=id;
                this.data=i;
                this.data.deliveryDate=new Date(this.data.deliveryDate);
                break;
            }
            
        }
    }

    view(data,no) {
        this.router.navigateToRoute('view', { id: this.data.dataId, no: `${this.data.orderNo}` });
    }

    save() {
        this.service.update(this.data,this.data.dataId).then(result => {
            this.view();
        }).catch(e => {
            this.error = e;
        })
    }

    qtyOrder=0;
    exportChanged(e){
        var selectedExport =  e.srcElement.checked || false;
        this.data.isExport=selectedExport;
    }

    qtyChange(e){
        this.qtyOrder=this.data.orderQuantity;
    }

    uomChanged(e) {
        var selectedUom = e.detail;
        if (selectedUom)
        {
            this.data.uomId = selectedUom._id;
            for(var i of this.data.details){
                i.uom=selectedUom;
            }
        }
    }

    buyerChanged(e){
        var selectedBuyer = e.detail;
        if (selectedBuyer)
            this.data.buyerId = selectedBuyer._id;
    }

    lampStandardChanged(e){
        var selectedLamp = e.detail;
        if (selectedLamp)
            this.data.lampStandardId = selectedLamp._id;
    }

    addDetail(e){
        for(var i=0;i<this.data.details.length;i++){
            this.data.details[i].uom=this.data.uom;
        }
        
    }
}