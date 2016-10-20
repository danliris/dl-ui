import React from 'react';
import TextboxReact from '../basic/textbox-react.jsx';
import NumericReact from '../basic/numeric-react.jsx';
import UomAutoSuggestReact from '../auto-suggests/uom-auto-suggest-react.jsx';
import ProductAutoSuggestReact from '../auto-suggests/product-auto-suggest-react.jsx';

'use strict';

export default class UnitPaymentPriceCorrectionNoteItemReact extends React.Component {
    constructor(props) {
        super(props);

        this.handleValueChange = this.handleValueChange.bind(this);

        this.handlePricePerUnit = this.handlePricePerUnit.bind(this);
        this.handlePriceTotal = this.handlePriceTotal.bind(this);
        
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    handlePricePerUnit(_pricePerUnit) {
        var value = this.state.value;
        value.pricePerUnit = _pricePerUnit;
        this.handleValueChange(value);
    }

    handlePriceTotal(_priceTotal) {
        var value = this.state.value;
        value.priceTotal = _priceTotal;
        this.handleValueChange(value);
    }

    componentWillMount() {
        var _value = this.props.value;
        this.setState({ value: _value || {}, error: this.props.error || {}, options: this.props.options || {} });
    }

    componentWillReceiveProps(props) {
        var _value = props.value;
        this.setState({ value: _value || {}, error: props.error || {}, options: props.options || {} });
    }

    render() {
        var readOnlyOptions = Object.assign({}, this.state.options, { readOnly: true });
        var style = {
            margin: 0 + 'px'
        }
        return (
            <tr>
                <td >
                    <div className={`form-group`} style={style}>
                        <TextboxReact value={this.state.value.purchaseOrderExternal.no} options={readOnlyOptions} ></TextboxReact>
                    </div>
                </td>
                <td>
                    <div className={`form-group`} style={style}>
                        <TextboxReact value={this.state.value.purchaseRequest.no} options={readOnlyOptions} ></TextboxReact>
                    </div>
                </td>
                <td>
                    <div className={`form-group`} style={style}>
                        <ProductAutoSuggestReact value={this.state.value.product} options={readOnlyOptions} ></ProductAutoSuggestReact>
                    </div>
                </td>
                <td>
                    <div className={`form-group `} style={style}>
                        <NumericReact value={this.state.value.quantity} options={readOnlyOptions}/>
                    </div>
                </td>
                <td>
                    <div className={`form-group`} style={style}>
                        <UomAutoSuggestReact value={this.state.value.uom} options={readOnlyOptions}/>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.pricePerUnit ? 'has-error' : ''}`} style={style}>
                        <NumericReact value={this.state.value.pricePerUnit} options={this.state.options} onChange={this.handlePricePerUnit}/>
                        <span className="help-block">{this.state.error.pricePerUnit}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.priceTotal ? 'has-error' : ''}`} style={style}>
                        <NumericReact value={this.state.value.priceTotal} options={this.state.options} onChange={this.handlePriceTotal}/>
                        <span className="help-block">{this.state.error.priceTotal}</span>
                    </div>
                </td>
            </tr>
        )
    }
} 