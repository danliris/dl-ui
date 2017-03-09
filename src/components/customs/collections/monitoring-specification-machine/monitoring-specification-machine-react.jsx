import React from 'react';

import TextboxReact from '../../../form/basic/react/textbox-react.jsx';
import NumericReact from '../../../form/basic/react/numeric-react.jsx';
import DropDownReact from '../../../form/basic/react/dropdown-react.jsx';

'use strict';

export default class MonitoringSpecificationMachineReact extends React.Component {
    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleIndicatorChange = this.handleIndicatorChange.bind(this);
        // this.handleDataTypeChange = this.handleDataTypeChange.bind(this);
        this.handleIndicatorValueChange = this.handleIndicatorValueChange.bind(this);


        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    handleIndicatorChange(indicator) {
        var value = this.state.value;
        value.indicator = indicator;
        // value.productId = product._id;
        this.handleValueChange(value);
    }

    // handleDataTypeChange(dataType) {
    //     var value = this.state.value;
    //     value.dataType = dataType;
    //     this.handleValueChange(value);
    // }

    handleIndicatorValueChange(data) {
        var value = this.state.value;
        // value.value=this.state.value.defaultValue;
        value.value = (data);
        this.handleValueChange((value));
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
        var valueBox = null;

        var readOnlyOptions = this.state.options.isMaster == true ? this.state.options : Object.assign({}, this.state.options, { readOnly: true });


        if (this.state.value.dataType == "input teks") {

            valueBox = <TextboxReact value={this.state.value.value} placeholder="input teks" options={this.state.options} onChange={this.handleIndicatorValueChange} />

        } else if (this.state.value.dataType == "input angka") {
            valueBox = <NumericReact value={this.state.value.value} placeholder="input angka" options={this.state.options} onChange={this.handleIndicatorValueChange} />
        } else if (this.state.value.dataType == "input pilihan" || this.state.value.dataType == "option") {

            var items = this.state.value.defaultValue.split(",");
            var valueOptions = Object.assign({}, this.state.options, { selections: items });
            valueBox = <DropDownReact value={this.state.value.value} options={valueOptions} onChange={this.handleIndicatorValueChange}/>

        } else {
            var skala = "skala: " + this.state.value.defaultValue;
            valueBox = <NumericReact value={this.state.value.value} placeholder={skala} options={this.state.options} onChange={this.handleIndicatorValueChange} />
        }


        var style = {
            margin: 0 + 'px'
        }

        return (
            <tr>
                <td>
                    <div className={`form-group ${this.state.error.indicator ? 'has-error' : ''}`} style={style}>
                        <TextboxReact value={this.state.value.indicator} options={readOnlyOptions} />
                        <span className="help-block">{this.state.error.indicator}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.value ? 'has-error' : ''}`} style={style}>
                        {valueBox}
                        <span className="help-block">{this.state.error.value} </span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.uom ? 'has-error' : ''}`} style={style}>
                        <TextboxReact value={this.state.value.uom} options = { readOnlyOptions } />
                        <span className="help-block">{this.state.error.uom} </span>
                    </div>
                </td>
            </tr>
        )
    }
} 