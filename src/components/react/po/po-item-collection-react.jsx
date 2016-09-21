import React from 'react';

import PoItemTextileReact from './po-item-textile-react.jsx';

'use strict';

export default class PoItemCollectionReact extends React.Component {
    constructor(props) {
        super(props);

        this.handleItemAdd = this.handleItemAdd.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    componentWillMount() {
        this.setState({ value: this.props.value || {}, options: this.props.options || {} });
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value || {}, options: props.options || {} });
    }

    handleItemAdd() {
        var newItem = {
            product: { toString: function () { return '' } },
            defaultQuantity: 0,
            defaultMeasurement: { toString: function () { return '' } },
            dealQuantity: 0,
            dealMeasurement: { toString: function () { return '' } },
            price: 0,
            description: ''
        };
        this.state.value.push(newItem);

        if (this.props.onAddItem)
            this.props.onAddItem(newItem);
    }

    render() {
        var addButton = <button className="btn btn-success" onClick={this.handleItemAdd}>+</button>;
        if (this.state.options.readOnly || this.state.options.isSplit)
            addButton = <span></span>;
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th rowSpan="2" width="20%">Textile</th>
                        <th colSpan="2" width="20%">Default</th>
                        <th colSpan="2" width="20%">Deal</th>
                        <th rowSpan="2" width="10%">Harga</th>
                        <th rowSpan="2" width="20%">Ket.</th>
                        <th rowSpan="2" width="10%">
                            {addButton}
                        </th>
                    </tr>
                    <tr>
                        <th width="10%">Qty.</th>
                        <th width="10%">Uom.</th>
                        <th width="10%">Qty.</th>
                        <th width="10%">Uom.</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.children}
                </tbody>
            </table>
        )
    }
} 