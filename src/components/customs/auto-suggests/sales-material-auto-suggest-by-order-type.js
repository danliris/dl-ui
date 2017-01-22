import { customElement, inject, bindable, bindingMode, noView } from 'aurelia-framework';

import FinishingPrintingMaterialAutoSuggestReactByOrderType from './react/sales-material-auto-suggest-react-by-order-type.jsx';
import BaseAutoSuggest from '../../form/basic/base-auto-suggest';

@noView()
@inject(Element)
@customElement('sales-material-auto-suggest-by-order-type')
export default class SalesMaterialAutoSuggestByOrderType extends BaseAutoSuggest {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) filter;

    constructor(element) {
        super(element);
        this.control = SalesMaterialAutoSuggestReactByOrderType;
    }
} 