import React from 'react';
import AutoSuggestReact from './auto-suggest-react.jsx';

const serviceUri = require('../../../host').core + '/v1/core/suppliers';

'use strict';

export default class SupplierAutoSuggestReact extends React.Component {
    constructor(props) {
        super(props);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    getSupplierSuggestions(text) { 
        return fetch(serviceUri).then(results => results.json()).then(json => {
            return json.data.map(supplier => {
                supplier.toString = function () {
                    return `${this.code} - ${this.name}`;
                }
                return supplier;
            })
        })
    }

    componentWillMount() {
        var _options = Object.assign({ suggestions: this.getSupplierSuggestions }, this.props.options)
        this.setState({ value: this.props.value, options: _options });
    }
    componentWillReceiveProps(props) {
        var _options = Object.assign({ suggestions: this.getSupplierSuggestions }, props.options)
        this.setState({ value: props.value, options: _options });
    }

    render() { 
        return (
            <AutoSuggestReact
                value={this.state.value}
                onChange={this.props.onChange}
                options={this.state.options}
                />
        );
    }
}

