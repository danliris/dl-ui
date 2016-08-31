import {inject, bindable, BindingEngine, bindingMode, observable} from 'aurelia-framework'


@inject(BindingEngine, Element)
export class PodlItem {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) data;
    @bindable uri;
    
    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
    }

    attached() {

        this.bindingEngine.propertyObserver(this, "data").subscribe((newValue, oldValue) => {
            
        });
    }

    remove() {
        console.log(this.data);
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
            _item.label = `${_item.RefPONo}`;
            return _item
        });
        
        return list;
    }
}