import React from 'react';

import TextboxReact from '../basic/textbox-react.jsx';
import RadiobuttonReact from '../basic/radiobutton-react.jsx';
import NumericReact from '../basic/numeric-react.jsx';
import ProductAutoSuggestReact from '../auto-suggests/product-auto-suggest-react.jsx';
import PoAutoSuggestReact from '../auto-suggests/po-auto-suggest-react.jsx';
import UomAutoSuggestReact from '../auto-suggests/uom-auto-suggest-react.jsx';

'use strict';

export default class DoItemFulfillmentReact extends React.Component {
    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleItemFulfillmentRemove = this.handleItemFulfillmentRemove.bind(this);
        this.handleDeliveredQuantityChanged = this.handleDeliveredQuantityChanged.bind(this);
        this.handleRemarkChanged = this.handleRemarkChanged.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }
    
    handleItemFulfillmentRemove() {
        if (this.props.onItemFulfillementRemove)
            this.props.onItemFulfillementRemove(this.state.value);
    }

    handleDeliveredQuantityChanged(quantity) {
        var value = this.state.value;
        value.deliveredQuantity = quantity;
        this.handleValueChange(value);
    }

    handleRemarkChanged(remark) {
        var value = this.state.value;
        value.remark = remark;
        this.handleValueChange(value);
    }

    init(props) {
        var value = props.value;
        var error = props.error;
        var options = props.options;

        this.setState({ value: value, error: error, options: options });
    }

    componentWillMount() {
        this.init(this.props);
    }

    componentWillReceiveProps(props) {
        this.init(props);
    }

    render() {
        var readOnlyOptions = { readOnly: true };
        var style = {
            margin: 0 + 'px'
        }
        var removeButton = <button className="btn btn-danger" onClick={this.handleItemFulfillmentRemove}>-</button>;
        if (this.state.options.readOnly)
            removeButton = <span></span>;
        return (
            <tr >
                <td>
                    <PoAutoSuggestReact value={this.state.value.purchaseOrder} options={readOnlyOptions} />
                </td>
                <td>
                    <ProductAutoSuggestReact value={this.state.value.product} options={readOnlyOptions} />
                </td>
                <td>
                    <NumericReact value={this.state.value.purchaseOrderQuantity} options={readOnlyOptions} />
                </td>
                <td>
                    <UomAutoSuggestReact value={this.state.value.purchaseOrderUom} options={readOnlyOptions} />
                </td>
                <td>
                    <div className={`form-group ${this.state.error.deliveredQuantity ? 'has-error' : ''}`} style={style}>
                        <NumericReact value={this.state.value.deliveredQuantity} options={this.state.options} onChange={this.handleDeliveredQuantityChanged} />
                        <span className="help-block">{this.state.error.deliveredQuantity}</span>
                    </div>
                </td>
                <td>
                    <TextboxReact value={this.state.value.remark} options={this.state.options} onChange={this.handleRemarkChanged}  />
                </td>
                <td>{removeButton}</td>
            </tr>);

    }
}