import React from 'react';
import ReactDOM from 'react-dom';
import {customElement, inject, bindable, bindingMode, noView} from 'aurelia-framework';

import FieldReact from '../../react/basic/field-react.jsx';
import DoBySupplierandUnitAutoSuggestReact from '../../react/auto-suggests/delivery-order-auto-suggest-by-supplier-unit-react.jsx';

@noView()
@inject(Element)
@customElement('delivery-order-by-supplier-unit-auto-suggest')
export class DeliveryOrderBySupplierUnitAutoSuggest {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) filter;
    reactComponent = {};

    constructor(element) {
        this.element = element;
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleValueChange(event, value) {
        this.value = value;
        // if(this.value instanceof Object)
        // {
        //     Object.assign(this.value, value);
        //     this.valueChanged(value);
        // }        
        // else 
        //     this.value = value; 
    }

    render() {
        this.options = { readOnly: (this.readOnly || '').toString().toLowerCase() === 'true' };
        if (this.filter)
            this.options.filter = this.filter;
        else
            this.options.filter = null;
            
        this.reactComponent = ReactDOM.render(
            <FieldReact label={this.label} error={this.error}>
                <DoBySupplierandUnitAutoSuggestReact value={this.value} options={this.options} onChange={this.handleValueChange}/>
            </FieldReact>,
            this.element
        );
    }

    bind() {
        this.render();
    }

    unbind() {
        ReactDOM.unmountComponentAtNode(this.element);
    }

    /**
     * Data Changed
     * 
     * An automatic callback function when our "data"
     * bindable value changes. We need to rebind the React
     * element to get the new data from the ViewModel.
     * 
     * @param {any} newVal The updated data
     * @returns {void}
     * 
     */
    valueChanged(newVal) {
        // console.log(`${this.no} - changed`); 
        this.bind();

        var event;

        if (document.createEvent) {
            event = document.createEvent("CustomEvent");
            event.initCustomEvent("change", true, true, newVal);
        } else {
            event = document.createEventObject();
            event.eventType = "change";
        }

        event.eventName = "change";

        if (document.createEvent) {
            this.element.dispatchEvent(event);
        } else {
            this.element.fireEvent("on" + event.eventType, event);
        }
    }
    errorChanged(newError) {
        this.bind();
    }

}
