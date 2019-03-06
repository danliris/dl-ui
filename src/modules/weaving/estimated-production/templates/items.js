import { inject, BindingEngine } from "aurelia-framework";

@inject(BindingEngine)
export class ItemView {
  readOnly = true;
  constructor(bindingEngine) {
    this.bindingEngine = bindingEngine;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;

    if (this.data.fabricConstructionDocument) {
      this.data.constructionNumber = this.data.fabricConstructionDocument.constructionNumber;
      parseFloat(
        (this.data.totalGramEstimation =
          this.data.wholeGrade * this.data.fabricConstructionDocument.totalYarn)
      );
      this.data.totalYarn = parseFloat(
        this.data.fabricConstructionDocument.totalYarn
      );
    }

    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
    // console.log(this.options);
  }
}
