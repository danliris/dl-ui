import { bindable, bindingMode, containerless, inject, computedFrom, customElement } from "aurelia-framework";
import { _Control } from "./_control";

@containerless()
@customElement("au-multiline")
@inject(Element)
export class Multiline extends _Control {
  // control properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;

  // multiline properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) placeholder;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) size;
  constructor(element) {
    super(element);
  }
  bind() {
    this.size = !this.size || this.size < 1 ? 3 : this.size;
  }
}
