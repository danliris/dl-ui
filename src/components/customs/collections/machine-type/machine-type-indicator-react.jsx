import React from 'react';

import TextboxReact from '../../../form/basic/react/textbox-react.jsx';
import NumericReact from '../../../form/basic/react/numeric-react.jsx';
import DropDownReact from '../../../form/basic/react/dropdown-react.jsx';

'use strict';

export default class MachineTypeIndicatorReact extends React.Component {
    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleIndicatorChange = this.handleIndicatorChange.bind(this);
        this.handleDataTypeChange = this.handleDataTypeChange.bind(this);
        this.handleIndicatorValueChange = this.handleIndicatorValueChange.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    handleIndicatorChange( indicator) {
        var value = this.state.value;
        value.indicator = indicator;
        // value.productId = product._id;
        this.handleValueChange(value);
    }

    handleDataTypeChange(dataType) {
        var value = this.state.value;
        value.dataType = dataType;
        this.handleValueChange(value);
    }


    handleIndicatorValueChange(data) {
        var value = this.state.value;
        value.value = data;
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

        var removeButton = null

        if (!this.state.options.readOnly)
            removeButton = <button className="btn btn-danger" onClick={this.handleRemove}>-</button>;

        var style = {
            margin: 0 + 'px'
        }

        return (
            <tr>
                <td>
                    <div className={`form-group ${this.state.error.indicator ? 'has-error' : ''}`} style={style}>
                        <TextboxReact value={this.state.value.indicator} options={this.state.options} onChange={this.handleIndicatorChange}/>
                        <span className="help-block">{this.state.error.indicator}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.dataType ? 'has-error' : ''}`} style={style}>                      
                        <TextboxReact value={this.state.value.dataType} options={this.state.options} onChange={this.handleDataTypeChange} /> 
                        <span className="help-block">{this.state.error.dataType}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.value ? 'has-error' : ''}`} style={style}>
                        <TextboxReact value={this.state.value.value} options={this.state.options} onChange={this.handleIndicatorValueChange}/>
                        <span className="help-block">{this.state.error.value}</span>
                    </div>
                </td>
                <td>
                    {removeButton}
                </td>
            </tr>
        )
    }
} 