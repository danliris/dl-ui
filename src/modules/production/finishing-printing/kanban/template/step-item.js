export class StepItem {
  activate(context) {
    console.log("step-Items")
    this.step = context.data;
    this.error = context.error;
    this.options = context.options;
  } 

  stepIndicatorColumns = [
    { header: "Name", value: "name" },
    { header: "Value", value: "value" },
  ]

  controlOptions = {
    control: {
      length: 12
    }
  };
}