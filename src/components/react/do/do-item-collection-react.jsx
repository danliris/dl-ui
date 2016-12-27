import React from 'react';
import DoItemReact from './do-item-react.jsx';

'use strict';

export default class DoItemCollectionReact extends React.Component {
    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.handleItemAdd = this.handleItemAdd.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleItemRemove = this.handleItemRemove.bind(this);

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
    
    handleItemChange(doItem) { 
        var i = this.state.value[0] == doItem;
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
        var addButton = <button className="btn btn-success" onClick={this.handleItemAdd}>+</button>;
        if (this.state.options.readOnly || this.state.options.filter==null)
            addButton = <span></span>;
        var items = (this.state.value || []).map((doItem, index) => {
            var error = this.state.error[index] || {};
            return (
                <DoItemReact key={"__item" + index} value={doItem} error={error} options={this.state.options} onChange={this.handleItemChange} onRemove={this.handleItemRemove}></DoItemReact>
            );
        })

        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th width="90%">Nomor PO External</th>
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

DoItemCollectionReact.propTypes = {
    value: React.PropTypes.array,
    error: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.string]),
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool
    }),
    children: React.PropTypes.arrayOf(React.PropTypes.element)
};

DoItemCollectionReact.defaultProps = {
    value: [],
    error: [],
    options: {
        readOnly: false,
    }
};
