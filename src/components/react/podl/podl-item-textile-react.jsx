import React from 'react';

import PodlItemReact from './podl-item-react.jsx';
import POTextileAutoSuggestReact from '../auto-suggests/po-textile-auto-suggest-react.jsx';

'use strict';

export default class PodlItemTextileReact extends React.Component {
    constructor(props) {
        super(props);

        this.handleValueChange = this.handleValueChange.bind(this);
        this.handlePOTextileChange = this.handlePOTextileChange.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    handlePOTextileChange(event, poTextile) {
        var value = this.state.value;
        Object.assign(value, poTextile);
        this.handleValueChange(value);
    }

    componentWillMount() {
        this.setState({ value: this.props.value || [], error: this.props.error || [], options: this.props.options || {} });
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value || [], error: props.error || [], options: props.options || {} });
    }

    render() {
        return (
            <PodlItemReact value={this.state.value} error={this.state.error} options={this.state.options} onChange={this.handleValueChange}>
                <POTextileAutoSuggestReact value={this.state.value} options={this.state.options} onChange={this.handlePOTextileChange} />
            </PodlItemReact>
        )
    }
} 