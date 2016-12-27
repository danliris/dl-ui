import React from 'react';

'use strict';

export default class DropdownEnumReact extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    init(props) {
        var options = Object.assign({}, DropdownEnumReact.defaultProps.options, props.options);
        var selections = options.selections;
        var defaultValue = selections.find((item, index) => {
            return -1;
        })
        var initialValue = props.value || defaultValue;
        if (props.value != initialValue && props.onChange)
            props.onChange(initialValue);

        this.setState({ value: initialValue, options: options });
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
        if (this.state.options.readOnly)
            return (
                <p className="form-control-static">{(this.state.value || '').toString() }</p>
            );
        else {
            var items = this.state.options.selections.map((item, index) => {
                return (
                    <option key={`__option_${index}`} value={item.value}>{item.name.toString() }</option>
                );
            });
            return (
                <select value={this.state.value} onChange={this.handleValueChange} className="form-control">
                    {
                        items
                    }
                </select>
            );
        }
    }
}

DropdownEnumReact.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        selections: React.PropTypes.array
    })
};
DropdownEnumReact.defaultProps = {
    options: {
        readOnly: false,
        selections: []
    }
};