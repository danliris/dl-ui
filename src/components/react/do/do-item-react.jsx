import React from 'react';

import TextboxReact from '../basic/textbox-react.jsx';
import RadiobuttonReact from '../basic/radiobutton-react.jsx';
import NumericReact from '../basic/numeric-react.jsx';
import POTextileAutoSuggestReact from '../auto-suggests/po-textile-auto-suggest-react.jsx';
import ProductAutoSuggestReact from '../auto-suggests/product-auto-suggest-react.jsx';
import UomAutoSuggestReact from '../auto-suggests/uom-auto-suggest-react.jsx';

'use strict';

export default class DoItemReact extends React.Component {
    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleToggleDetail = this.handleToggleDetail.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    handleRemove() {
        if (this.props.onRemove)
            this.props.onRemove(this.state.value);
    }

    handleToggleDetail() {
        this.setState({ showDetail: !this.state.showDetail });
    } 

    init(props) {
        var value = Object.assign({}, DoItemReact.defaultProps.value, props.value);
        var error = Object.assign({}, DoItemReact.defaultProps.error, props.error);
        var options = Object.assign({}, DoItemReact.defaultProps.options, props.options);

        this.setState({ value: value, error: error, options: options }); 
    }

    componentWillMount() {
        this.init(this.props);
    }

    componentWillReceiveProps(props) {
        this.init(props);
    }


    render() {
        this.options = { readOnly: (this.readOnly || '').toString().toLowerCase() === 'true' };
        var details = null;
        if (this.state.showDetail) {
            var items = this.state.value.items.map((item, index) => {
                var itemOptions = { readOnly: true };
                var realizationQtyOptions = { readOnly: false };
                return (
                    <tr key={`__item_${item.PONo}_${index}`}>
                        <td>
                            <ProductAutoSuggestReact value={item.product} options={itemOptions} />
                        </td>
                        <td>
                            <NumericReact value={item.dealQuantity} options={itemOptions} />
                        </td>
                        <td>
                            <UomAutoSuggestReact value={item.dealMeasurement} options={itemOptions} />
                        </td>
                        <td>
                            <NumericReact value={item.realizationQuantity} options={realizationQtyOptions} />
                        </td>
                    </tr>);
            });

            details = <tr>
                <td colSpan="5">
                    <table className="table">
                        <thead>
                            <tr>
                                <th width="40%">Barang</th>
                                <th width="20%">Jumlah</th>
                                <th width="20%">Satuan</th>
                                <th width="20%">Diterima</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </table>
                </td>
            </tr>
        }
        var options = {
            selections: [
                { value: true, label: 'YA' },
                { value: false, label: 'TIDAK' },
            ]
        };
        return (
            <tr>
                <td colSpan="5">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td width="25%">
                                    {this.props.children}
                                </td>
                                <td width="25%">
                                    <TextboxReact value={this.state.value.PRNo} options={this.state.options} />
                                </td>
                                <td width="20%">
                                </td>
                                <td width="20%">
                                </td>
                                <td width="10%">
                                    <button className="btn btn-danger" onClick={this.handleRemove}>-</button>
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

DoItemReact.propTypes = {
    value: React.PropTypes.object,
    error: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.string]),
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool
    }),
    children: React.PropTypes.element.isRequired
};

DoItemReact.defaultProps = {
    value: {},
    error: {},
    options: {
        readOnly: false,
    }
};
