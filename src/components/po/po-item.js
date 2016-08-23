import {inject, bindable, BindingEngine, observable} from 'aurelia-framework'


@inject(BindingEngine, Element)
export class PoItem {
    @bindable data;
    @bindable uri;

    @observable quantity;

    quantityChanged(newValue, oldValue) {
        this.data.price = this.data.product.price * newValue;
        this.data.qty = newValue;
    }

    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
        console.log(element);
    }

    attached() {
        this.bindingEngine.propertyObserver(this.data, "product").subscribe((newValue, oldValue) => {
            this.quantityChanged(this.data.qty, this.data.qty);
        });
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

    map(result)
    {
        var list = result.data.map(item=>{
            var _item = item;
            _item.label = `${_item.code} - ${_item.name} @ ${_item.price}`;
            return _item
        });
        console.log(list);
        return list;
    }
}