import React from 'react';

import TextboxReact from '../../../form/basic/react/textbox-react.jsx';
import MonitoringEventTypeAutoSuggestReact from '../../auto-suggests/react/monitoring-event-type-auto-suggest-react.jsx';

'use strict';

export default class MonitoringEventItemReact extends React.Component {
    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleMonitoringEventTypeChange = this.handleMonitoringEventTypeChange.bind(this);
        this.handleRemarkChange = this.handleRemarkChange.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    handleMonitoringEventTypeChange(event, monitoringEventType) {
        var value = this.state.value;
        value.monitoringEventType = monitoringEventType;
        value.monitoringEventTypeId = monitoringEventType._id;
        this.handleValueChange(value);
    }

    handleRemarkChange(remark) {
        var value = this.state.value;
        value.remark = remark;
        this.handleValueChange(value);
    }

    handleRemove() {
        if (this.props.onRemove)
            this.props.onRemove(this.state.value);
    }

    componentWillMount() {
        this.setState({ value: this.props.value || {}, error: this.props.error || {}, options: this.props.options || {} });
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value || {}, error: props.error || {}, options: props.options || {} });
    }

    render() { 
        var readOnlyOptions = { readOnly: this.state.options.readOnly || this.state.options.isSplit };
        var descOptions = readOnlyOptions;
        var removeButton = null

        if (!this.state.options.readOnly)
            removeButton = <button className="btn btn-danger" onClick={this.handleRemove}>-</button>;

        var style = {
            margin: 0 + 'px'
        }

        return (
            <tr>
                <td>
                    <div className={`form-group ${this.state.error.monitoringEventType ? 'has-error' : ''}`} style={style}> 
                        <MonitoringEventTypeAutoSuggestReact value={this.state.value.monitoringEventType} options={readOnlyOptions} onChange={this.handleMonitoringEventTypeChange}></MonitoringEventTypeAutoSuggestReact>
                        <span className="help-block">{this.state.error.monitoringEventType}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.remark ? 'has-error' : ''}`} style={style}>
                        <TextboxReact value={this.state.value.remark} options={this.state.options} onChange={this.handleRemarkChange}/>
                        <span className="help-block">{this.state.error.remark}</span>
                    </div>
                </td>
                <td>
                    {removeButton}
                </td>
            </tr>
        )
    }
} 