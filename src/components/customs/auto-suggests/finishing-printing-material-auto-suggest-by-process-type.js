import { customElement, inject, bindable, bindingMode, noView } from 'aurelia-framework';

import FinishingPrintingMaterialAutoSuggestReactByProcessType from './react/finishing-printing-material-auto-suggest-react-by-process-type.jsx';
import BaseAutoSuggest from '../../form/basic/base-auto-suggest';

@noView()
@inject(Element)
@customElement('finishing-printing-material-auto-suggest-by-process-type')
export default class FinishingPrintingMaterialAutoSuggestByProcessType extends BaseAutoSuggest {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) filter;

    constructor(element) {
        super(element);
        this.control = FinishingPrintingMaterialAutoSuggestReactByProcessType;
    }
} 