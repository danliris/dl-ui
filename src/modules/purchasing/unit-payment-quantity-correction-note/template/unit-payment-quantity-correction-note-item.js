var ProductLoader = require('../../../../loader/product-purchasing-loader');

export class UnitPaymentQuantityCorrectionNoteItem {
  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    // this.data.ProductRemark = this.data.remark;
    // console.log(context);
    // console.log(this.data);
  }

  quantityChanged(e) {
    // console.log(e.target.value);
    this.data.priceTotalAfter = this.data.pricePerDealUnitAfter * e.target.value;
    // console.log(this.data);
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}