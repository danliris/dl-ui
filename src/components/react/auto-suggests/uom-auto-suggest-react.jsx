import React from 'react';
import AutoSuggestReact from './auto-suggest-react.jsx';
import {Session} from '../../../utils/session';

const serviceUri = require('../../../host').core + '/v1/master/uoms';

const empty = {
    unit: ''
}
'use strict';

export default class UomAutoSuggestReact extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    init(props) {
        var options = Object.assign({}, UomAutoSuggestReact.defaultProps.options, props.options);
        var initialValue = Object.assign({}, empty, props.value);
        initialValue.toString = function () {
            return `${this.unit}`;
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

UomAutoSuggestReact.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

UomAutoSuggestReact.defaultProps = {
    options: {
        readOnly: false,
        suggestions:
        function (text) {
            var uri = serviceUri + '?keyword=' + text;
            
            var session = new Session();
            var requestHeader = new Headers();
            requestHeader.append('Authorization', `JWT ${session.token}`);

            return fetch(uri, { headers: requestHeader }).then(results => results.json()).then(json => {
                return json.data.map(uom => {
                    uom.toString = function () {
                        return `${this.unit}`;
                    }
                    return uom;
                })
            })
        }
    }
};
