import React from 'react';

import PoItemCollectionReact from './po-item-collection-react.jsx';
import PoItemTextileReact from './po-item-textile-react.jsx';

'use strict';

export default class PoItemTextileCollectionReact extends React.Component {
    constructor(props) {
        super(props);
        this.handleItemAdd = this.handleItemAdd.bind(this);
        this.handleItemRemove = this.handleItemRemove.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleItemAdd(newItem) {
        this.setState({ value: this.state.value });
    }

    handleItemRemove(item) {
        var itemIndex = this.state.value.indexOf(item);
        this.state.value.splice(itemIndex, 1);
        this.setState({ value: this.state.value });
    }

    componentWillMount() {
        this.setState({ value: this.props.value || [], error: this.props.error || [], options: this.props.options || {} });
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value || [], error: props.error || [], options: props.options || {} });
    }

    render() {
        var items = (this.state.value || []).map((item, index) => {
            var error = this.state.error[index] || {};
            return (
                <PoItemTextileReact key={"__item" + index} value={item} error={error} options={this.state.options} onRemove={this.handleItemRemove}></PoItemTextileReact>
            );
        })

        return (
            <PoItemCollectionReact value={this.state.value} error={this.props.error} options={this.state.options} onChange={this.handleValueChange} onAddItem={this.handleItemAdd} >
                {items}
            </PoItemCollectionReact>
        )
    }
} 