import React from 'react';

import TextboxReact from '../basic/textbox-react.jsx';
import RadiobuttonReact from '../basic/radiobutton-react.jsx';
import NumericReact from '../basic/numeric-react.jsx';
import PoUnpostedAutoSuggestReact from '../auto-suggests/po-unposted-auto-suggest-react.jsx';
import ProductAutoSuggestReact from '../auto-suggests/product-auto-suggest-react.jsx';
import UomAutoSuggestReact from '../auto-suggests/uom-auto-suggest-react.jsx';
import PoItemReact from './po-item-react.jsx';

'use strict';

export default class PoExternalItemReact extends React.Component {
    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handlePoChange = this.handlePoChange.bind(this);
        this.handlePoItemChange = this.handlePoItemChange.bind(this);
        this.handleToggleDetail = this.handleToggleDetail.bind(this);
        // this.handleUseVatChange = this.handleUseVatChange.bind(this);
        // this.handleUseIncomeTaxChange = this.handleUseIncomeTaxChange.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    handleRemove() {
        if (this.props.onItemRemove)
            this.props.onItemRemove(this.state.value);
    }

    handlePoChange(event, purchaseOrder) {
        var value = this.state.value;
        Object.assign(value, purchaseOrder);
        this.handleValueChange(value);
    }

    handlePoItemChange(poItem) {
        var purchaseOrder = this.state.value;
        var itemIndex = purchaseOrder.items.indexOf(poItem);
        var item = purchaseOrder.items[itemIndex];
        this.handlePoChange(null, purchaseOrder);
    }

    handleToggleDetail() {
        this.setState({ showDetail: !this.state.showDetail });
    }

    init(props) {
        var showDetail = (this.state || this.props).showDetail || true;
        this.setState({ value: props.value, error: props.error, options: props.options || {}, showDetail: showDetail });
    }

    componentWillMount() {
        this.init(this.props);
    }

    componentWillReceiveProps(props) {
        this.init(props);
    }

    render() {

        var removeButton = <button className="btn btn-danger" onClick={this.handleRemove}>-</button>;
        if (this.state.options.readOnly)
            removeButton = <span></span>;

        var details = null;
        var purchaseOrder = Object.assign({ items: [], purchaseRequest: { no: '' } }, this.state.value);
        if (this.state.showDetail) {
            var items = purchaseOrder.items.map((poItem, index) => {
                var error = (this.state.error.items || [])[index] || {};
                return (
                    <PoItemReact key={`__item_${purchaseOrder.no}_${poItem.product._id}_${index}`} value={poItem} error={error} options={this.state.options} onChange={this.handlePoItemChange} />
                );
            });

            details = <tr>
                <td colSpan="5">
                    <table className="table">
                        <thead>
                            <tr>
                                <th rowSpan="2" width="15%">Barang</th>
                                <th colSpan="2" width="15%">Default</th>
                                <th colSpan="2" width="20%">Deal</th>
                                <th rowSpan="2" width="11%">Konversi</th>
                                <th rowSpan="2" width="24%">Harga</th>
                                <th rowSpan="2" width="15%">Ket.</th>
                            </tr>
                            <tr>
                                <th width="7%">Jumlah</th>
                                <th width="8%">Satuan</th>
                                <th width="9%">Jumlah</th>
                                <th width="11%">Satuan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </table>
                </td>
            </tr>
        }

        var prNoOptions = Object.assign({}, this.state.options, { readOnly: true });
        var style = {
            margin: 0 + 'px'
        }

        return (
            <tr>
                <td colSpan="5">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td width="90%">
                                    <div className={`form-group ${this.state.error.no ? 'has-error' : ''}`}style={style}>
                                        <PoUnpostedAutoSuggestReact value={purchaseOrder} options={this.state.options} onChange={this.handlePoChange} />
                                        <span className="help-block">{this.state.error.no}</span>
                                    </div>
                                </td>
                                <td width="10%">
                                    {removeButton}
                                    <button className="btn btn-info" onClick={this.handleToggleDetail}>i</button>
                                </td>
                            </tr>
                            {details}
                        </tbody>
                    </table>
                </td>
            </tr>
        )
    }
} 