import React from 'react';
import ReactDOM from 'react-dom';
import {customElement, inject, bindable, bindingMode, noView} from 'aurelia-framework';

import PodlItemTextileReact from '../../react/podl/podl-item-textile-react.jsx';


@noView()
@inject(Element)
@customElement('podl-item-textile-collection')
export class PodlItemTextileCollection {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;

    reactComponent = {};
    constructor(element) {
        this.element = element;
        this.handleItemAdd = this.handleItemAdd.bind(this);
        this.handleItemRemove = this.handleItemRemove.bind(this);
    }

    handleItemAdd() {

        this.value.push({     
            usePPh:false,
            usePPn:false
        });
        this.bind();
    }

    handleItemRemove(item) {
        var itemIndex = this.value.indexOf(item);
        this.value.splice(itemIndex, 1);
        this.bind();
    }

    render() {
        this.options = { readOnly: (this.readOnly || '').toString().toLowerCase() === 'true' };

        var items = this.value.map((item, index) => {
            var error = this.error[index] || {};
            return (
                <PodlItemTextileReact key={'__item_' + index} value={item} error={error} onRemove={this.handleItemRemove}/>
            );
        });

        if (items.length < 1)
            items = <tr><td colSpan="5">No Item</td></tr>;

        this.reactComponent = ReactDOM.render(
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>No. Internal PO</th>
                        <th>No. PR</th>
                        <th>Dikenakan PPn?</th>
                        <th>Dikenakan PPh?</th>
                        <th>
                            <button className="btn btn-success" onClick={this.handleItemAdd}>+</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>,
            this.element
        );
    }

    bind() {
        this.value = this.value || [];
        this.error = this.error || [];
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
