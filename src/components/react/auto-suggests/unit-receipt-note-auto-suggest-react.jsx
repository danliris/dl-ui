import React from 'react';
import AutoSuggestReact from './auto-suggest-react.jsx';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"
const resource = 'unit-receipt-notes';

const empty = {
    no: ''
}
'use strict';

export default class UnitReceiptNoteAutoSuggestReact extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    init(props) {
        var options = Object.assign({}, UnitReceiptNoteAutoSuggestReact.defaultProps.options, props.options);
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

UnitReceiptNoteAutoSuggestReact.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

UnitReceiptNoteAutoSuggestReact.defaultProps = {
    options: {
        readOnly: false,
        suggestions:
        function (text) {

            var config = Container.instance.get(Config);
            var endpoint = config.getEndpoint("purchasing");

            return endpoint.find(resource, { keyword: text })
                .then(results => {
                    return results.data.map(receiptNote => {
                        receiptNote.toString = function () {
                            return `${this.no}`;
                        }
                        return receiptNote;
                    })
                })
        }
    }
};
