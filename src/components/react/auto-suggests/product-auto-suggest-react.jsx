import React from 'react';
import AutoSuggestReact from './auto-suggest-react.jsx';

const serviceUri = require('../../../host').core + '/v1/master/products';
const empty = {
    code: '',
    name: ''
}
'use strict';

export default class ProductAutoSuggestReact extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    init(props) {
        var options = Object.assign({}, ProductAutoSuggestReact.defaultProps.options, props.options);
        var initialValue = Object.assign({}, empty, props.value);
        initialValue.toString = function () {
            return `${this.code} - ${this.name}`;
        };
        this.setState({ value: initialValue, options: options });
    }

    componentWillMount() {
        this.init(this.props);
    }

    componentWillReceiveProps(props) {
        this.init(props);
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

ProductAutoSuggestReact.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

ProductAutoSuggestReact.defaultProps = {
    options: {
        readOnly: false,
        suggestions:
        function (text) {
            return fetch(serviceUri).then(results => results.json()).then(json => {
                return json.data.map(product => {
                    product.toString = function () {
                        return `${this.code} - ${this.name}`;
                    }
                    product.uom = product.uom || { unit: '' };
                    product.uom.toString = function () {
                        return this.unit;
                    }
                    return product;
                })
            })
        }
    }
};
