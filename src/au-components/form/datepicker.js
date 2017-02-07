import { bindable, bindingMode, containerless, inject, computedFrom, customElement } from "aurelia-framework";
import { _Control } from "./_control";

@containerless()
@customElement("au-datepicker")
@inject(Element)
export class Datepicker extends _Control {
  // control properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;

  // datepicker properties

  constructor(element) {
    super(element);
  }
}
