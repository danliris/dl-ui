import React from 'react';
import AutoSuggestReact from './auto-suggest-react.jsx';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"
const resource = 'finishing-printing/material-by-process-types';

const empty = {
    _id:''
}

'use strict';

export default class MaterialByProcessTypeAutoSuggestReact extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    init(props) {
        var options = Object.assign({}, MaterialByProcessTypeAutoSuggestReact.defaultProps.options, props.options);
        var initialValue = Object.assign({}, empty, props.value);
        initialValue.toString = function () {
            return `${this._id}`;
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

MaterialByProcessTypeAutoSuggestReact.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

MaterialByProcessTypeAutoSuggestReact.defaultProps = {
    options: {
        readOnly: false,
        filter: {},
        suggestions:
        function (text, filter) {

            var config = Container.instance.get(Config);
            var endpoint = config.getEndpoint("production");

           return endpoint.find(resource, { keyword: text, filter: JSON.stringify(filter) })
                .then(results => {
                    return results.info.map(material => {
                        material.toString = function () {
                            return `${this._id}`;
                        }
                        return material;
                    });
                });
        }
    }
};
