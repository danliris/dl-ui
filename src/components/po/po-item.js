import {inject, bindable, BindingEngine, observable} from 'aurelia-framework'


@inject(BindingEngine, Element)
export class PoItem {
    @bindable data;
    @bindable uri;

    // @observable quantity;

    // quantityChanged(newValue, oldValue) {
    //     this.data.price = this.data.product.price * newValue;
    //     this.data.qty = newValue;
    // }

    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
    }

    attached() {
        this.data.qty = this.data.qty || 1;

        this.bindingEngine.propertyObserver(this.data, "product").subscribe((newValue, oldValue) => {
            this.updatePrice(newValue, this.data.qty);
        });
        this.bindingEngine.propertyObserver(this.data, "qty").subscribe((newValue, oldValue) => {
            this.updatePrice(this.data.product, newValue);
        });
    }

    updatePrice(product, qty) {
        console.log('update')
        this.data.price = product.price * qty;
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
    }

    map(result) {
        var list = result.data.map(item => {
            var _item = item;
            _item.label = `${_item.code} - ${_item.name} @ ${_item.price}`;
            return _item
        });
        console.log(list);
        return list;
    }
}