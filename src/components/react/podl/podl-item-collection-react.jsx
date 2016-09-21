import React from 'react';

'use strict';

export default class PodlItemCollectionReact extends React.Component {
    constructor(props) {
        super(props);

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

    componentWillMount() {
        this.setState({ value: this.props.value || [], error: this.props.error || [], options: this.props.options || {} });
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value || [], error: props.error || [], options: props.options || {} });
    }

    render() {
        var addButton = <button className="btn btn-success" onClick={this.handleItemAdd}>+</button>;
        if (this.state.options.readOnly || this.state.options.isSplit)
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