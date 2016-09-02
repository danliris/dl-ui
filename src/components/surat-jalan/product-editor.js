import {inject, bindable, BindingEngine, observable} from 'aurelia-framework'
@inject(BindingEngine, Element)

export class productEditor{
    @bindable data;
    @bindable uri;
    
    dataPO = {};
    
    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
    }
    
    remove() {
        var event; // The custom event that will be created

        if (document.createEvent) {
            event = document.createEvent("HTMLEvents");
            event.initEvent("remove", true, true);
        } else {
            event = document.createEventObject();
            event.eventType = "remove";
        }

        event.eventName = "remove";

        if (document.createEvent) {
            this.element.dispatchEvent(event);
        } else {
            this.element.fireEvent("on" + event.eventType, event);
        }
        this.showProductDetail=false;
    }
    
    addPO()
    {
        this.showPO=true;
        var PO ={};
        PO.RONo='';
        if (!this.data.items)
                this.data.items = [];
        console.log("items "+this.data.items);
           this.data.items.push(PO);
    }
    
    hideDetail() {
        this.showProductDetail=false;
   }
   showDetail(item) {
        this.showProductDetail=true;
        this.dataPO=item;
   }
   
   removeProduct(poItem, product) {
        var itemIndex = poItem.items.indexOf(product);
        //var index = this.data.items[items].indexOf(product);
        
       var poItemIndex = this.data.items.indexOf(poItem);
        
       console.log(this.data);
       console.log(poItem);
       console.log(poItemIndex);
        //this.this.data.items[items].items.splice(itemIndex, 1);
    }
    
}