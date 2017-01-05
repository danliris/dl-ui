import React from 'react';
import AutoSuggestReact from '../../../form/basic/react/auto-suggest-react.jsx';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'finishing-printing/material-by-order-types';

const empty = {
    _id: {
        name: ''
    },
}


'use strict';

export default class FinishingPrintingMaterialAutoSuggestReactByOrderType extends AutoSuggestReact {
    constructor(props) {
        super(props);
    }

    init(props) {
        var options = Object.assign({}, FinishingPrintingMaterialAutoSuggestReactByOrderType.defaultProps.options, props.options);
        var initialValue = Object.assign({}, empty, props.value);
        initialValue.toString = function () {
            return `${this._id.name}`;
        };
        this.setState({ value: initialValue, label: initialValue.toString(), options: options, suggestions: [initialValue] });
    }
}

FinishingPrintingMaterialAutoSuggestReactByOrderType.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

FinishingPrintingMaterialAutoSuggestReactByOrderType.defaultProps = {
    options: {
        readOnly: false,
        suggestions: function (text, filter) {

            var config = Container.instance.get(Config);
            var endpoint = config.getEndpoint("production");

            return endpoint.find(resource, { keyword: text, filter: JSON.stringify(filter) })
                .then(results => {
                    return results.info.map(material => {
                        material.toString = function () {
                            return `${this._id.name}`;
                        }
                        return material;
                    });
                });
        }
    }
};
