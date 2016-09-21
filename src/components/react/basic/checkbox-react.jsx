import React from 'react';

'use strict';

export default class CheckboxReact extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    init(props) {
        var options = Object.assign({}, CheckboxReact.defaultProps.options, props.options);
        this.setState({ value: props.value, options: options });
    }

    handleValueChange(event) {
        this.setState({ value: event.target.checked });
        if (this.props.onChange)
            this.props.onChange(event.target.checked);
    }

    componentWillMount() {
        this.init(this.props);
    }

    componentWillReceiveProps(props) {
        this.init(props);
    }

    render() {
        if (this.state.options.readOnly)
            return (
                <p className="form-control-static">{(this.state.value == true ? 'Ya' : 'Tidak' || '').toString() }</p>
            );
        else
            return (
                <input type="checkbox" checked={this.state.value} onChange={this.handleValueChange}></input>
            );
    }
}

CheckboxReact.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool
    })
};
CheckboxReact.defaultProps = {
    options: {
        readOnly: false
    }
};