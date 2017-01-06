import React from 'react';
import ProductionOrderDetailReact from './production-order-detail-react.jsx';

'use strict';

export default class ProductionOrderDetailCollectionReact extends React.Component {
    constructor(props) {
        super(props);

        this.handleItemAdd = this.handleItemAdd.bind(this);
        this.handleItemRemove = this.handleItemRemove.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }


    componentWillMount() {
        this.setState({ value: this.props.value || [], error: this.props.error || [], options: this.props.options || {} });
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value || [], error: props.error || [], options: props.options || {} });
    }

    handleItemAdd() {
        var newItem = {
            uom: { toString: function () { return '' } },
            uomId: { toString: function () { return '' } },
            colorRequest: '',
            colorTemplate: '',
            quantity: 0
        };
        this.state.value.push(newItem);
        this.setState({ value: this.state.value });

        if (this.props.onAddItem)
            this.props.onAddItem(newItem);
    }

    handleItemRemove(item) {
        var value = this.state.value;
        var itemIndex = value.indexOf(item);
        value.splice(itemIndex, 1);
        this.setState({ value: value });
    }

    render() {
        var items = (this.state.value || []).map(function (item, index) {
            var error = this.state.error[index] || {};
            return (
                <ProductionOrderDetailReact key={"__item" + index} value={item} error={error} options={this.state.options} onRemove={this.handleItemRemove}></ProductionOrderDetailReact>
            );
        }.bind(this))

        var addButton = <button className="btn btn-success" onClick={this.handleItemAdd}>+</button>;
        if (this.state.options.readOnly)
            addButton = <span></span>;
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th width="40%">Warna yang Diminta</th>
                        <th width="30%">Acuan Warna/Desain</th>
                        <th width="14%">Jumlah</th>
                        <th width="6%">Satuan</th>
                        <th width="10%">
                            {addButton}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        )
    }
} 