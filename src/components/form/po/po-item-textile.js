import React from 'react';
import ReactDOM from 'react-dom';
import {customElement, inject, bindable, bindingMode, noView} from 'aurelia-framework';

import TextboxReact from '../react/textbox-react.jsx';
import NumericReact from '../react/numeric-react.jsx';
import TextileAutoSuggestReact from '../react/auto-suggests/textile-auto-suggest-react.jsx';
import UomAutoSuggestReact from '../react/auto-suggests/uom-auto-suggest-react.jsx';
import PoItemTextileReact from '../react/po/po-item-textile-react.jsx';


@noView()
@inject(Element)
@customElement('po-item-textile')
export class PoItemTextile {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;

    reactComponent = {};
    constructor(element) {
        this.element = element;
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
        this.handleDefaultQuantityChange = this.handleDefaultQuantityChange.bind(this);
        this.handleDealQuantityChange = this.handleDealQuantityChange.bind(this);
        this.handleDealMeasurementChange = this.handleDealMeasurementChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);

        this.dealMeasurement = {};
    }

    handleValueChange(value) {
        this.value = value;
    }

    handleProductChange(event, value) {
        this.value.product = value;
        this.value.defaultMeasurement = value.uom.unit;
        this.bind();
    }

    handleDefaultQuantityChange(value) {
        this.value.defaultQuantity = value;
        this.bind();
    }
    handleDealQuantityChange(value) {
        this.value.dealQuantity = value;
        this.bind();
    }
    handleDealMeasurementChange(event, value) {
        this.dealMeasurement = value;
        this.value.dealMeasurement = value.unit;
        this.bind();
    }
    handleDescriptionChange(value) {
        this.value.description = value;
        this.bind();
    }
    handlePriceChange(value) {
        this.value.price = value;
        this.bind();
    }
    handleRemove() {

        var event;

        if (document.createEvent) {
            event = document.createEvent("CustomEvent");
            event.initCustomEvent("remove", true, true, this.value);
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

    render() {
        this.options = { readOnly: (this.readOnly || '').toString().toLowerCase() === 'true' };

        var defaultMeasurementOptions = { readOnly: true };
        var dealQtyOptions = { min: 0 }

        this.reactComponent = ReactDOM.render(
            <PoItemTextileReact value={this.value} options={this.options}/>
            // <tr>
            //     <td>
            //         <TextileAutoSuggestReact value={this.value.product} onChange={this.handleProductChange} options={this.options} />
            //     </td>
            //     <td>
            //         <NumericReact value={this.value.defaultQuantity} onChange={this.handleDefaultQuantityChange} options={this.options} />
            //     </td>
            //     <td>
            //         <TextboxReact value={this.value.defaultMeasurement} options={defaultMeasurementOptions} />
            //     </td>
            //     <td>
            //         <NumericReact value={this.value.dealQuantity} onChange={this.handleDealQuantityChange} options={dealQtyOptions} />
            //     </td>
            //     <td>
            //         <UomAutoSuggestReact value={this.dealMeasurement} onChange={this.handleDealMeasurementChange} options={this.options} />
            //     </td>
            //     <td>
            //         <NumericReact value={this.value.price} onChange={this.handlePriceChange} options={this.options} />
            //     </td>
            //     <td>
            //         <TextboxReact value={this.value.description} onChange={this.handleDescriptionChange} options={this.options} />
            //     </td>
            //     <td>
            //         <button onClick={this.handleRemove}>remove</button>
            //     </td>
            // </tr>
            ,
            this.element
        );
    }

    bind() {
        this.value.defaultQuantity = this.value.defaultQuantity || 1;
        this.value.dealQuantity = this.value.dealQuantity || 1;
        this.value.price = this.value.price || 0;
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
        this.bind();
    }
    errorChanged(newError) {
        this.bind();
    }

}
