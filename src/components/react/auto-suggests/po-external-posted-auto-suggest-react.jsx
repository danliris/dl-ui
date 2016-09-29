import React from 'react';
import AutoSuggestReact from './auto-suggest-react.jsx';

const serviceUri = require('../../../host').core + '/v1/purchasing/po/externals/posted';
const empty = {
    no: '',
    refNo: ''
}

'use strict';

export default class PoExternalPostedAutoSuggestReact extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    init(props) {
        var options = Object.assign({}, PoExternalPostedAutoSuggestReact.defaultProps.options, props.options);
        console.log(options);
        var initialValue = Object.assign({}, empty, props.value);
        initialValue.toString = function () {
            return `${this.no} - ${this.refNo}`;
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

PoExternalPostedAutoSuggestReact.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

PoExternalPostedAutoSuggestReact.defaultProps = {
    options: {
        readOnly: false,
        filter: {},
        suggestions:
        function (text, filter) {
            var uri = `${serviceUri}?keyword=${text}&filter=${JSON.stringify(filter)}`;
            return fetch(uri).then(results => results.json()).then(json => {
                return json.data.map(poExternal => {
                    poExternal.toString = function () {
                        return `${this.no} - ${this.refNo}`;
                    }
                    return poExternal;
                })
            })
        }
    }
};
