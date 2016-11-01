import React from 'react';
import ReactDOM from 'react-dom';
import {customElement, inject, bindable, bindingMode, noView} from 'aurelia-framework';

import AutoSuggestReact from '../../react/auto-suggests/auto-suggest-react.jsx';

@noView()
@inject(Element)
@customElement('auto-suggest')
export class AutoSuggest {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
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
        this.reactComponent = ReactDOM.render(
            <AutoSuggestReact value={this.value} options={this.options} onChange={this.handleValueChange} />,
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
        this.bind();
    }

}
