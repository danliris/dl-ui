import {inject, bindable, BindingEngine, observable} from 'aurelia-framework'


@inject(BindingEngine, Element)
export class PoItem {
    @bindable data;
    @bindable uri;
    @bindable error;
    
    uriUom = require('../../host').core + "/v1/core/uoms";
    
    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
    }

    attached() {
        // console.log(this.data);
        this.bindingEngine.propertyObserver(this.data, "product").subscribe((newValue, oldValue) => {
            // console.log(newValue.UoM.unit);
            this.data.defaultMeasurement = newValue.UoM.unit;
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

    map(result) {
        var list = result.data.map(item => {
            var _item = item;
            _item.label = `${_item.code} - ${_item.name}`;
            return _item
        });
        console.log(list);
        return list;
    }

    mapUom(result) {
        console.log(result.data);
        var list = result.data.map(item => {
            var _item = item;
            console.log(_item);
            _item.labelUom = `${_item.unit}`;
            return _item
        });
        // console.log(list);
        return list;
    }
}