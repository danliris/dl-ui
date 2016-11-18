import React from 'react';
import AutoSuggestReact from './auto-suggest-react.jsx';
import {Session} from '../../../utils/session';
const serviceUri = require('../../../host').purchasing+ '/v1/delivery-orders/by-supplier';
const empty = {
    no: ''
}

'use strict';

export default class DoBySupplierandUnitAutoSuggestReact extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    init(props) {
        var options = Object.assign({}, DoBySupplierandUnitAutoSuggestReact.defaultProps.options, props.options);
        var initialValue = Object.assign({}, empty, props.value);
        initialValue.toString = function () {
            return `${this.no}`;
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

DoBySupplierandUnitAutoSuggestReact.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

DoBySupplierandUnitAutoSuggestReact.defaultProps = {
    options: {
        readOnly: false,
        filter: {},
        suggestions:
        function (text, filter) {
            var uri = `${serviceUri}?keyword=${text}&filter=${JSON.stringify(filter)}`;
            
            
            var session = new Session();
            var requestHeader = new Headers();
            requestHeader.append('Authorization', `JWT ${session.token}`);
            
            return fetch(uri, { headers: requestHeader }).then(results => results.json()).then(json => {
                return json.data.map(deliveryOrder => {
                    deliveryOrder.toString = function () {
                        return `${this.no}`;
                    }
                    return deliveryOrder;
                })
            })
        }
    }
};
    