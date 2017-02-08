import { bindable, bindingMode, containerless, inject, computedFrom, customElement } from "aurelia-framework";
import { _Control } from "./_control";

@containerless()
@customElement("au-dropdown")
@inject(Element)
export class Dropdown extends _Control {
  // control properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;

  // dropdown properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) items;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) key;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) text;

  constructor(element) {
    super(element);
  }

  @computedFrom("key", "text")
  get _selector() {
    var selector = { key: "key", text: "text" };
    if (this.key)
      selector.key = this.key;

    if (this.text)
      selector.text = this.text;
    return selector;
  }

  _matcher = (option, current) => {
    var result = false;
    if (!option || !current)
      return result;

    result = option[this._selector.key] === current[this._selector.key];
    return result;
  }

  _getSuggestionText(suggestion) {
    if (!suggestion)
      return "";
    else if (typeof suggestion === "string")
      return suggestion;
    else if (typeof suggestion === "object" && this.text) {
      return suggestion[this.text];
    }
    else
      return suggestion.toString();
  }

  _getSuggestionKey(suggestion) {
    if (!suggestion)
      return null;
    else if (typeof suggestion === "string")
      return suggestion;
    else if (typeof suggestion === "object" && this.key) {
      return suggestion[this.key];
    }
    else
      return suggestion;
  }
}
