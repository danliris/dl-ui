import { bindable, bindingMode, containerless, inject, computedFrom, customElement } from "aurelia-framework";
import dispatchCustomEvent from "../../../lib/dispatch-custom-event";
var STATE = require("../_state");

@containerless()
@customElement("au-input")
@inject(Element)
export class _Input {
  // control properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) placeholder;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) inputOptions;

  @bindable editorState = STATE.VIEW;
  @bindable editorValue;
  @bindable type;
  element;
   
  constructor(component) {
    this.component = component;
  }

  _defaultOptions = {
    selectOnFocus: true
  }

  bind() {
    this.placeholder = this.placeholder || "enter value";
    this.editorValue = this.value;
    this._options = Object.assign(this._defaultOptions, this._options);
  }

  onBlur(event) {
    this.editorState = STATE.VIEW;
  }

  onFocus(event) {
    this.editorState = STATE.EDIT;
  }

  editorValueChanged(newValue) {
    this.value = this.editorValue;
  }

  editorStateChanged(newValue) {
    dispatchCustomEvent("statechange", this.component, this);

    if (this.element && this.editorState === STATE.EDIT && this._options.selectOnFocus) {
      this.element.select();
    }
  } 
}
