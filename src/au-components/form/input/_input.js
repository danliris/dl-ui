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
<<<<<<< HEAD
  @bindable type;
  element;
  invoke = false;

=======
  @bindable editorValue;
  @bindable type;
  element;
   
>>>>>>> 273ef1284e3ce96e54163e8a36c01a4d9e73e181
  constructor(component) {
    this.component = component;
  }

  _defaultOptions = {
    selectOnFocus: true
  }

  bind() {
    this.placeholder = this.placeholder || "enter value";
<<<<<<< HEAD
=======
    this.editorValue = this.value;
>>>>>>> 273ef1284e3ce96e54163e8a36c01a4d9e73e181
    this._options = Object.assign(this._defaultOptions, this._options);
  }

  onBlur(event) {
    this.editorState = STATE.VIEW;
  }

  onFocus(event) {
    this.editorState = STATE.EDIT;
  }

<<<<<<< HEAD
  editorStateChanged(newValue, oldValue) {
    dispatchCustomEvent("statechange", this.component, this);
  }

  @computedFrom("editorState", "_options.selectOnFocus")
  get select() {
    return this.editorState === STATE.EDIT && this._options.selectOnFocus
  }
=======
  editorValueChanged(newValue) {
    this.value = this.editorValue;
  }

  editorStateChanged(newValue) {
    dispatchCustomEvent("statechange", this.component, this);

    if (this.element && this.editorState === STATE.EDIT && this._options.selectOnFocus) {
      this.element.select();
    }
  } 
>>>>>>> 273ef1284e3ce96e54163e8a36c01a4d9e73e181
}
