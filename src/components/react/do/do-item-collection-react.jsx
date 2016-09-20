import React from 'react';

'use strict';

export default class DoItemCollectionReact extends React.Component {
    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.handleItemAdd = this.handleItemAdd.bind(this);

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

        if (this.props.onAddItem)
            this.props.onAddItem(newItem);
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
        if (this.state.options.readOnly)
            addButton = <span></span>;
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th width="25%">No.PO.int</th>
                        <th width="25%">No.PR.</th>
                        <th width="20%">PPH</th>
                        <th width="20%">PPN</th>
                        <th width="10%">
                            {addButton}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.children}
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
