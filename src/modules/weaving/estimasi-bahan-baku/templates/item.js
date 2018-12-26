import { inject, BindingEngine } from "aurelia-framework";

// var EBBLoader = require('../../../../loader/ebb-loader');

@inject(BindingEngine)
export class Item {
  constructor(bindingEngine) {
    this.bindingEngine = bindingEngine;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }


  // -------------------------------- //

  // get ebbLoader() {
  //     return EBBLoader;
  // }

  // get addItems() {
  //     return (event) => {
  //         this.data.Items.push({})
  //     };
  // }
}
