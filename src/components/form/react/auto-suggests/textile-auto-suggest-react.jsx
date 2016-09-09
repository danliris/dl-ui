import React from 'react';
import AutoSuggestReact from './auto-suggest-react.jsx';

const serviceUri = require('../../../../host').core + '/v1/core/textiles';

'use strict';

export default class TextileAutoSuggestReact extends React.Component {
    constructor(props) {
        super(props);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    getTextileSuggestions(text) { 
        return fetch(serviceUri).then(results => results.json()).then(json => {
            return json.data.map(textile => {
                textile.toString = function () {
                    return `${this.code} - ${this.name}`;
                }
                return textile;
            })
        })
    }

    componentWillMount() {
        var _options = Object.assign({ suggestions: this.getTextileSuggestions }, this.props.options)
        this.setState({ value: this.props.value, options: _options });
    }
    componentWillReceiveProps(props) {
        var _options = Object.assign({ suggestions: this.getTextileSuggestions }, props.options)
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

