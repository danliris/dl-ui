import React from 'react';

import TextboxReact from '../textbox-react.jsx';
import NumericReact from '../numeric-react.jsx'; 
import UomAutoSuggestReact from '../auto-suggests/uom-auto-suggest-react.jsx';

'use strict';

export default class PoItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
        this.handleDefaultQuantityChange = this.handleDefaultQuantityChange.bind(this);
        this.handleDealQuantityChange = this.handleDealQuantityChange.bind(this);
        this.handleDealMeasurementChange = this.handleDealMeasurementChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

        this.dealMeasurement = {};
    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    handleProductChange(event, product) {
        var value = this.state.value;
        value.product = product;
        value.defaultMeasurement = product.uom.unit;
        this.handleValueChange(value);
    }

    handleDefaultQuantityChange(quantity) {
        var value = this.state.value;
        value.defaultQuantity = quantity;
        this.handleValueChange(value);
    }
    handleDealQuantityChange(quantity) {
        var value = this.state.value;
        value.dealQuantity = quantity;
        this.handleValueChange(value);
    }
    handleDealMeasurementChange(event, uom) {
        var value = this.state.value;
        this.dealMeasurement = uom;
        value.dealMeasurement = uom.unit;
        this.handleValueChange(value);
    }
    handleDescriptionChange(desc) {
        var value = this.state.value;
        value.description = desc;
        this.handleValueChange(value);
    }
    handlePriceChange(price) {
        var value = this.state.value;
        value.price = price;
        this.handleValueChange(value);
    }

    handleRemove() {
        if (this.props.onRemove)
            this.props.onRemove(this.state.value);
    }

    componentWillMount() {
        this.setState({ value: this.props.value || '', options: this.props.options || {} });
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value, options: this.props.options || {} });
    }

    render() {
        this.options = { readOnly: (this.readOnly || '').toString().toLowerCase() === 'true' };

        var defaultMeasurementOptions = { readOnly: true };
        var dealQtyOptions = { min: 0 }

        return (
            <tr>
                <td>
                    {this.props.children}
                </td>
                <td>
                    <NumericReact value={this.state.value.defaultQuantity} onChange={this.handleDefaultQuantityChange} options={this.state.options} />
                </td>
                <td>
                    <TextboxReact value={this.state.value.defaultMeasurement} options={defaultMeasurementOptions} />
                </td>
                <td>
                    <NumericReact value={this.state.value.dealQuantity} onChange={this.handleDealQuantityChange} options={dealQtyOptions} />
                </td>
                <td>
                    <UomAutoSuggestReact value={this.dealMeasurement} onChange={this.handleDealMeasurementChange} options={this.state.options} />
                </td>
                <td>
                    <NumericReact value={this.state.value.price} onChange={this.handlePriceChange} options={this.state.options} />
                </td>
                <td>
                    <TextboxReact value={this.state.value.description} onChange={this.handleDescriptionChange} options={this.state.options} />
                </td>
                <td>
                    <button className="btn btn-danger" onClick={this.handleRemove}>-</button>
                </td>
            </tr>
        )
    }
} 