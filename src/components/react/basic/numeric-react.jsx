import React from 'react';

'use strict';

export default class NumericReact extends React.Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleValueChange(event) {
        event.preventDefault();
        this.setState({ value: event.target.value });
        if (this.props.onChange)
            this.props.onChange(event.target.value);
    }
    componentWillMount() {
        this.setState({ value: this.props.value || 0, options: this.props.options || {} });
    }
    componentWillReceiveProps(props) {
        this.setState({ value: props.value || 0, options: this.props.options || {} });
    }

    render() {
        var options = Object.assign({ min: '0' }, this.options);

        if (this.state.options.readOnly)
            return (
                <p className="form-control-static">{(this.state.value || 0) }</p>
            );
        else
            return (
                <input type="number" value={this.state.value} onChange={this.handleValueChange} className="form-control" min={options.min} style={{ textAlign: "right" }}></input>
            );
    }
} 