import React from 'react';
import AutoSuggestReact from '../../../form/basic/react/auto-suggest-react.jsx';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'sales/color-type-by-material-order-type-constructions';

const empty = {
    colorType :{name: ''}
}

'use strict';

export default class SalesColorTypeAutoSuggestReactByOrderTypeByMaterialByConstruction extends AutoSuggestReact {
    constructor(props) {
        super(props);
    }

    init(props) {
        var options = Object.assign({}, SalesColorTypeAutoSuggestReactByOrderTypeByMaterialByConstruction.defaultProps.options, props.options);
        var initialValue = Object.assign({}, empty, props.value);
        initialValue.toString = function () {
            return `${this.colorType.name}`;
        };
        this.setState({ value: initialValue, label: initialValue.toString(), options: options, suggestions: [initialValue] });
    }
}

SalesColorTypeAutoSuggestReactByOrderTypeByMaterialByConstruction.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

SalesColorTypeAutoSuggestReactByOrderTypeByMaterialByConstruction.defaultProps = {
    options: {
        readOnly: false,
        suggestions:
        function (keyword, filter) {
            var config = Container.instance.get(Config);
            var endpoint = config.getEndpoint("production");

            return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
                .then(results => {
                    return results.data.map(color => {
                        color.toString = function () {
                            return `${this.colorType.name}`;
                        }
                        return color;
                    })
                })
        }
    }
};
