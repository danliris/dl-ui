import numeral from "numeral";

export class DetailFooter {
  controlOptions = {
    label: {
      length: 12,
      align: "right",
    },
    control: {
      length: 0,
    },
  };

  activate(context) {
    this.context = context;
    this.options = context.options;
    this.readOnly = context.options.readOnly;
  }

  get totalCuttingOutQuantity() {
    const totalCuttingOutQuantity = this.context.items.reduce(
      (acc, cur) => (acc += this.cuttingOutQuantity(cur.data)),
      0
    );
    return totalCuttingOutQuantity;
  }

  cuttingOutQuantity = (data) => {
    return parseFloat(data.CuttingOutQuantity.toFixed(2));
  };

  get totalRealOutQty() {
    const totalQuantity = this.context.items.reduce(
      (acc, cur) => (acc += this.RealQtyOut(cur.data)),
      0
    );
    return totalQuantity;
  }

  RealQtyOut = (data) => {
    return parseFloat(data.RealQtyOut);
  };

  get error() {
    return this.context.options.error
      ? this.context.options.error.TotalCuttingOutQuantity
      : null;
  }
}
