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
        var initialValue = props.value;
        if (props.value != initialValue && props.onChange)
            props.onChange(initialValue);

        var options = Object.assign({}, NumericReact.defaultProps.options, props.options);
        this.setState({ value: initialValue, options: options });
    }

    handleValueChange(event) {
        event.preventDefault();
        var value = parseInt(event.target.value);
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    componentWillMount() {
        this.init(this.props);
    }

    componentWillReceiveProps(props) {
        this.init(props);
    }

    render() {
        var control = null;
        var usePostFix = this.state.options.postFix.trim() != '';
        var postFix = usePostFix ? this.state.options.postFix : '';
        if (this.state.options.readOnly) {
            control = <p className="form-control-static">{ this.state.value } {postFix}</p>;
        }
        else {
            control = <input type="number" value={this.state.value} onChange={this.handleValueChange} className="form-control" min={this.state.options.min} max={this.state.options.max instanceof Number ? this.state.options.max : "" } style={{ textAlign: "right" }}></input>;

            if (this.state.options.postFix.trim() != '') {
                control = <div className="input-group">
                    {control}
                    <span className="input-group-addon">{postFix}</span>
                </div>;
            }
        }

        return control;
    }
}

NumericReact.propTypes = {
    value: React.PropTypes.number,
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        min: React.PropTypes.number,
        max: React.PropTypes.number,
        postFix: React.PropTypes.string
    })
};

NumericReact.defaultProps = {
    value: 0,
    options: {
        readOnly: false,
        min: 0,
        postFix: "",
    }
};