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
  }

  get totalCuttingOutQuantity() {
    const totalQuantity = this.context.items.reduce(
      (acc, cur) => (acc += this.Quantity(cur.data)),
      0
    );
    return totalQuantity;
  }

  get totalRealOutQty() {
    const totalQuantity = this.context.items.reduce(
      (acc, cur) => (acc += this.RealQtyOut(cur.data)),
      0
    );
    return totalQuantity;
  }

  Quantity = (data) => {
    return parseFloat(data.Quantity);
  };

  RealQtyOut = (data) => {
    return parseFloat(data.RealQtyOut);
  };

  get error() {
    return this.context.options.error
      ? this.context.options.error.TotalQuantity
      : null;
  }
}
