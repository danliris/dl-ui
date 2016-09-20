import React from 'react';

import DoItemCollectionReact from './do-item-collection-react.jsx';
import DoItemTextileReact from './do-item-textile-react.jsx';

'use strict';

export default class DoItemTextileCollectionReact extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
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


    init(props) {
        var value = props.value || DoItemCollectionReact.defaultProps.value;
        var error = props.error || DoItemCollectionReact.defaultProps.error;
        var options = Object.assign({}, DoItemCollectionReact.defaultProps.options, props.options);

        this.setState({ value: value, error: error, options: options });
    }

    componentWillMount() {
        this.init(this.props);
    }

    componentWillReceiveProps(props) {
        this.init(props);
    }

    render() {
        console.log(this.state.value)
        var items = (this.state.value || []).map((item, index) => {
            var error = this.state.error[index] || {};
            return (
                <DoItemTextileReact key={"__item" + index} value={item} error={error} options={this.state.options} onRemove={this.handleItemRemove}></DoItemTextileReact>
            );
        })

        return (
            <DoItemCollectionReact value={this.state.value} error={this.props.error} options={this.state.options} onAddItem={this.handleItemAdd} >
                {items}
            </DoItemCollectionReact>
        )
    }
}

DoItemTextileCollectionReact.propTypes = {
    value: React.PropTypes.array,
    error: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.string]),
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool
    })
};

DoItemTextileCollectionReact.defaultProps = {
    value: [],
    error: [],
    options: {
        readOnly: false,
    }
};
