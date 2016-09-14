import React from 'react';

'use strict';

export default class NumericReact extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    init(props) {
        var initialValue = props.value || 0;
        if (props.value != initialValue && props.onChange)
            props.onChange(initialValue);

        this.setState({ value: initialValue, options: props.options || {} });
    }

    handleValueChange(event) {
        event.preventDefault();
        this.setState({ value: event.target.value });
        if (this.props.onChange)
            this.props.onChange(event.target.value);
    }

    componentWillMount() {
        this.init(this.props);
    }

    componentWillReceiveProps(props) {
        this.init(props);
    }

    render() {
        var options = Object.assign({ min: '0' }, this.state.options);

        if (this.state.options.readOnly)
            return (
                <p className="form-control-static">{(this.state.value || 0) }</p>
            );
        else {
            var postFix = this.state.options.postFix || '';
            var input = <input type="number" value={this.state.value} onChange={this.handleValueChange} className="form-control" min={options.min} style={{ textAlign: "right" }}></input>
            if (postFix.trim() != '') {
                input = <div className="input-group">
                    {input}
                    <span className="input-group-addon">{postFix}</span>
                </div>;
            }
            return input;
        }
    }
} 