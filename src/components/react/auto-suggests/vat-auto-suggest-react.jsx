import React from 'react';
import AutoSuggestReact from './auto-suggest-react.jsx';

const serviceUri = require('../../../host').core + '/v1/master/vats';

const empty = {
    name: '',
    rate: 0,
    toString: function () {
        return '';
    }
}
'use strict';

export default class VatAutoSuggestReact extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    init(props) {
        var options = Object.assign({}, VatAutoSuggestReact.defaultProps.options, props.options);
        var initialValue = Object.assign({}, empty, props.value);
        initialValue.toString = function () {
             return [this.name, this.rate]
                .filter((item, index) => {
                    return item && item.toString().trim().length > 0;
                }).join(" - ");
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

VatAutoSuggestReact.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

VatAutoSuggestReact.defaultProps = {
    options: {
        readOnly: false,
        suggestions:
        function (text) {
            var uri = serviceUri+'?keyword='+text; 
            return fetch(uri).then(results => results.json()).then(json => {
                return json.data.map(vat => {
                    vat.toString = function () {
                       return [this.name, this.rate]
                            .filter((item, index) => {
                                return item && item.toString().trim().length > 0;
                            }).join(" - ");
                    }
                    return vat;
                })
            })
        }
    }
};
