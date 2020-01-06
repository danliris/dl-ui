import numeral from "numeral";
export class DOSalesItem {
  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;

    if (!this.data.PackingQuantity) {
      this.data.PackingQuantity = 0;
    }
    if (!this.data.ImperialQuantity) {
      this.data.ImperialQuantity = 0;
    }
    if (!this.data.MetricQuantity) {
      this.data.MetricQuantity = 0;
    }
  }

  get PackingQuantity() {
    return numeral(this.data.PackingQuantity).format("0,0.00");
  }

  get ImperialQuantity() {
    return numeral(this.data.ImperialQuantity).format("0,0.00");
  }

  get MetricQuantity() {
    return numeral(this.data.MetricQuantity).format("0,0.00");
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}
