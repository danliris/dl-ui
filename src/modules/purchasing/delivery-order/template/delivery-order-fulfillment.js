import {bindable} from 'aurelia-framework'
var ProductLoader = require('../../../../loader/product-loader');

export class DeliveryOrderItem {
  isWarning = false;
  @bindable deliveredQuantity;
  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;

    if (this.data) {
      var poItem = this.data.purchaseOrder.items.find(item => item.product._id.toString() === this.data.productId.toString())

      var correctionQty = [];
      poItem.fulfillments.map((fulfillment) => {
        if (fulfillment.correction) {
          fulfillment.correction.map((correction) => {
            if (correction.correctionRemark == "Koreksi Jumlah") {
              correctionQty.push(correction.correctionQuantity < 0 ? correction.correctionQuantity * -1 : correction.correctionQuantity)
            }
          })
        }
      })

      var isQuantityCorrection = correctionQty.length > 0;
      if ((poItem.dealQuantity - poItem.realizationQuantity) > 0) {
        this.data.remainingQuantity = poItem.dealQuantity - poItem.realizationQuantity;
        if (isQuantityCorrection) {
          this.data.remainingQuantity += correctionQty.reduce((prev, curr) => prev + curr);
        }
      } else if (isQuantityCorrection) {
        this.data.remainingQuantity = poItem.dealQuantity + correctionQty[correctionQty.length - 1];
      } else {
        this.data.remainingQuantity = poItem.dealQuantity;
      }
    }

    if (this.data) {
      this.deliveredQuantity = this.data.deliveredQuantity;
    } else {
      this.deliveredQuantity = 0;
    }
    if (!this.options.readOnly) {
      if (this.data.remainingQuantity < this.data.deliveredQuantity) {
        this.isWarning = true
      }
      else {
        this.isWarning = false;
      }
    }
  }

  get productLoader() {
    return ProductLoader;
  }

  productView = (product) => {
    return `${product.code} - ${product.name}`
  }

  deliveredQuantityChanged(newValue, oldValue) {
    if (!isNaN(newValue)) {
      this.data.deliveredQuantity = newValue
      if (!this.options.readOnly) {
        if (this.data.remainingQuantity < this.data.deliveredQuantity) {
          this.isWarning = true
        }
        else {
          this.isWarning = false;
        }
      }
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}