import React from 'react';
import MonitoringEventItemReact from './monitoring-event-item-react.jsx';

'use strict';

export default class MonitoringEventItemCollectionReact extends React.Component {
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
            monitoringEventType: { toString: function () { return '' } },
            monitoringEventTypeId: { toString: function () { return '' } },
            remark: ''
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
                    <MonitoringEventItemReact key={"__item" + index} value={item} error={error} options={this.state.options} onRemove={this.handleItemRemove}></MonitoringEventItemReact>
            );
        }.bind(this))

        var itemError = this.state.value.length === 0;
        var itemErrorMessage = '';
        if (itemError)
            itemErrorMessage = this.state.error;

        var style = {
            margin: 0 + 'px'
        }

        var addButton = <button className="btn btn-success" onClick={this.handleItemAdd}>+</button>;
        if (this.state.options.readOnly)
            addButton = <span></span>;
        return (
            <div className={`form-group ${itemError ? 'has-error' : ''}`} style={style}> 
                <span className="help-block">{itemErrorMessage}</span>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th width="50%">Monitoring Event Type</th>
                            <th width="40%">Ket.</th>
                            <th width="10%">
                                {addButton}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>
        )
    }
} 