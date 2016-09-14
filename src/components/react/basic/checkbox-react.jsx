import React from 'react';

'use strict';

export default class CheckboxReact extends React.Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleValueChange(event) {
        console.log(event);
        event.preventDefault();
        this.setState({value: !this.state.value });
        if (this.props.onChange)
            this.props.onChange(this.state);
    }
    componentWillMount() {
        console.log("componentWillMount");
        this.setState({ value: this.props.value || '', options: this.props.options || {} });
        console.log(this.props);
        console.log(this.state);
    }
    componentWillReceiveProps(props) {
        this.setState({ value: this.props.value || '', options: this.props.options || {} });
    }

    render() {
        console.log("render");
        console.log(this.state);
        if (this.state.options.readOnly)
            return (
                <p className="form-control-static">{(this.state.value==true ? 'Ya' : 'Tidak' || '').toString() }</p>
            );
        else
            return (
                <input type="checkbox" checked={this.state.value} onChange={this.handleValueChange} className="form-control"></input>
            );
    }
} 