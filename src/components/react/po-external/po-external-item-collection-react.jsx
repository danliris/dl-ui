import React from 'react';
import PoExternalItemReact from './po-external-item-react.jsx';
'use strict';

export default class PoExternalItemCollectionReact extends React.Component {
    constructor(props) {
        super(props);

        this.handleItemAdd = this.handleItemAdd.bind(this);
        this.handleItemRemove = this.handleItemRemove.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleItemAdd() {
        var newItem = {
            toString: function () {
                return '';
            }
        };
        this.state.value.push(newItem);
        this.setState({ value: this.state.value });

        if (this.props.onAddItem)
            this.props.onAddItem(newItem);
    }

    handleItemRemove(item) {
        var itemIndex = this.state.value.indexOf(item);
        this.state.value.splice(itemIndex, 1);
        this.setState({ value: this.state.value });
    }

    handleItemChange(item) {
        this.setState({ value: this.state.value });
    }
    componentWillMount() {
        this.setState({ value: this.props.value || [], error: this.props.error || [], options: this.props.options || {} });
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value || [], error: props.error || [], options: props.options || {} });
    }

    render() {
        var addButton = <button className="btn btn-success" onClick={this.handleItemAdd}>+</button>;
        if (this.state.options.readOnly)
            addButton = <span></span>;

        var items = (this.state.value || []).map((purchaseOrder, index) => {
            var error = this.state.error[index] || {};
            return (
                <PoExternalItemReact key={"__item" + index} value={purchaseOrder} error={error} options={this.state.options} onChange={this.handleItemChange} onItemRemove={this.handleItemRemove}></PoExternalItemReact>
            );
        })

        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th width="90%">Nomor PR - Nomor PO Internal</th> 
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