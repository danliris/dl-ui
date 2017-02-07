import { bindable, bindingMode, containerless, inject, computedFrom, customElement } from "aurelia-framework";
import { _Control } from "./_control";
import numeral from 'numeral';

const VIEW_STATE = 0;
const EDIT_STATE = 1;

@containerless()
@customElement("au-numeric")
@inject(Element)
export class Numeric extends _Control {
  // control properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;

  // numeric properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) placeholder;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) step;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) min;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) max;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) format;

  @bindable state = VIEW_STATE;
  constructor(element) {
    super(element);
  }

  bind() {
    this.value = this.value || 0;
    this.editValue = this.value || 0;
    this.format = this.format || "0,000.000";
    this.stateChanged(null);
  }

  onBlur(event) {
    this.state = VIEW_STATE;
  }

  onFocus(event) {
    this.state = EDIT_STATE;
  }

  stateChanged(newValue) {
    this.editValue = this.state === VIEW_STATE ? numeral(this.editValue).format(this.format) : numeral(this.editValue).value(this.format);
    this.value = numeral(this.editValue).value(this.format);
  }

}
