export class MonitoringSpecificationMachineItem {
  activate(context) {
    this.item = context.data;
    this.error = context.error;
    this.options = context.options;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}