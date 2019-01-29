import { inject, BindingEngine } from "aurelia-framework";

var YarnLoader = require("../../../../loader/weaving-yarns-loader");

@inject(BindingEngine)
export class ItemsWarp {
  constructor(bindingEngine) {
    this.bindingEngine = bindingEngine;
  }
  
  get yarns() {
    return YarnLoader;
  }

  activate(context) {
    this.warpData = context.weftData;
    this.error = context.error;
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }

  // -------------------------------- //

  // get mkbLoader() {
  //     return MKBLoader;
  // }
}
