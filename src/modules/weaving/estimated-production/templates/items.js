import { inject, BindingEngine } from "aurelia-framework";

@inject(BindingEngine)
export class Items {
  constructor(bindingEngine) {
    this.bindingEngine = bindingEngine;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;

    // if (this.data.FabricConstructionDocument) {
    //   this.data.ConstructionNumber = this.data.FabricConstructionDocument.ConstructionNumber;
    //   parseFloat(
    //     (this.data.TotalGramEstimation =
    //       this.data.WholeGrade * this.data.FabricConstructionDocument.TotalYarn)
    //   );
    //   this.data.TotalYarn = parseFloat(
    //     this.data.FabricConstructionDocument.TotalYarn
    //   );
    // }

    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }
}
