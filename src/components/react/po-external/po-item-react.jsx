import React from 'react';

import TextboxReact from '../basic/textbox-react.jsx';
import NumericReact from '../basic/numeric-react.jsx';
import UomAutoSuggestReact from '../auto-suggests/uom-auto-suggest-react.jsx';
import ProductAutoSuggestReact from '../auto-suggests/product-auto-suggest-react.jsx';

'use strict';

export default class PoItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleValueChange = this.handleValueChange.bind(this);

        this.handleDealQuantityChange = this.handleDealQuantityChange.bind(this);
        this.handleDealUomChange = this.handleDealUomChange.bind(this);
        this.handlePricePerDealUnitChange = this.handlePricePerDealUnitChange.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    handleDealQuantityChange(quantity) {
        var value = this.state.value;
        value.dealQuantity = quantity;
        this.handleValueChange(value);
    }

    handleDealUomChange(event, uom) {
        var value = this.state.value;
        value.dealUom = uom;
        this.handleValueChange(value);
    }

    handlePricePerDealUnitChange(price) {
        var value = this.state.value;
        value.pricePerDealUnit = price;
        this.handleValueChange(value);
    }

    componentWillMount() {
        this.setState({ value: this.props.value || {}, error: this.props.error || {}, options: this.props.options || {} });
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value || {}, error: props.error || {}, options: props.options || {} });
    }

    render() {
        var readOnlyOptions = Object.assign({}, this.state.options, { readOnly: true });
        var dealQtyOptions = Object.assign({}, this.state.options, { min: 0 });
        var dealUomOptions = this.state.options;
        var style = {
            margin: 0 + 'px'
        }

        return (
            <tr>
                <td>
                    <div className={`form-group ${this.state.error.product ? 'has-error' : ''}`} style={style}>
                        <ProductAutoSuggestReact value={this.state.value.product} options={readOnlyOptions}></ProductAutoSuggestReact>
                        <span className="help-block">{this.state.error.product}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.defaultQuantity ? 'has-error' : ''}`} style={style}>
                        <NumericReact value={this.state.value.defaultQuantity} options={readOnlyOptions}/>
                        <span className="help-block">{this.state.error.defaultQuantity}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.defaultUom ? 'has-error' : ''}`} style={style}>
                        <UomAutoSuggestReact value={this.state.value.defaultUom} options={readOnlyOptions} />
                        <span className="help-block">{this.state.error.defaultUom}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.dealQuantity ? 'has-error' : ''}`} style={style}>
                        <NumericReact value={this.state.value.dealQuantity} options={dealQtyOptions} onChange={this.handleDealQuantityChange}/>
                        <span className="help-block">{this.state.error.dealQuantity}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.dealUom ? 'has-error' : ''}`} style={style}>
                        <UomAutoSuggestReact value={this.state.value.dealUom} options={dealUomOptions} onChange={this.handleDealUomChange}/>
                        <span className="help-block">{this.state.error.dealUom}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.pricePerDealUnit ? 'has-error' : ''}`} style={style}>
                        <NumericReact value={this.state.value.pricePerDealUnit} options={this.state.options} onChange={this.handlePricePerDealUnitChange}/>
                        <span className="help-block">{this.state.error.pricePerDealUnit}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.remark ? 'has-error' : ''}`} style={style}>
                        <TextboxReact value={this.state.value.remark} options={readOnlyOptions}/>
                        <span className="help-block">{this.state.error.remark}</span>
                    </div>
                </td>
            </tr>
        )
    }
} 