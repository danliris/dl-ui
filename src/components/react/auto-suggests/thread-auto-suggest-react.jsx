import React from 'react';
import AutoSuggestReact from './auto-suggest-react.jsx'; 
import {Session} from '../../../utils/session';

const serviceUri = require('../../../host').core + '/v1/master/products';
const empty = {
        code: '',
        name: '',
    toString: function () {
        return '';
    }
}
'use strict';


export default class ThreadAutoSuggestReact extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    init(props) {
        var options = Object.assign({}, ThreadAutoSuggestReact.defaultProps.options, props.options);
        var initialValue = Object.assign({}, empty, props.value);
        initialValue.toString = function () {
            return [this.code, this.name]
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

ThreadAutoSuggestReact.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

ThreadAutoSuggestReact.defaultProps = {
    options: {
        readOnly: false,
        filter :{
            tags:"benang spinning"
        },
        suggestions:
        function (text,filter) {
            var uri = `${serviceUri}?keyword=${text}&filter=${JSON.stringify(filter)}`;

            var session = new Session();
            var requestHeader = new Headers();
            requestHeader.append('Authorization', `JWT ${session.token}`);

            return fetch(uri, { headers: requestHeader }).then(results => results.json()).then(json => {
                return json.data.map(thread => {
                    thread.toString = function () {
                        return [this.code, this.name]
                            .filter((item, index) => {
                                return item && item.toString().trim().length > 0;
                            }).join(" - ");
                    }
                    return thread;
                })
            })
        }
    }
};
