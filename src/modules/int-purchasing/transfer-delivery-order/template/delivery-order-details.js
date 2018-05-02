import { bindable } from 'aurelia-framework'
// var ProductLoader = require('../../../../loader/product-loader');

export class DeliveryOrderItem {
  isWarning = false;
  // @bindable deliveredQuantity;

  grades = ["", "A", "B", "C"];

  activate(context) {
    this.context = context;
    
    this.data = context.data;
    // console.log(this.context);
    this.error = context.error;
    console.log(this.context);
    this.options = context.options;
    // console.log(this.data);
      
    // this.isEdit = this.context.context.options.isEdit || false;

    // if (this.isEdit) {
    // var toItem = this.data.ExternalTransferOrderItems.find(item => item.Id.toString() === this.data.ExternalTransferOrderItems.ExternalTransferOrderDetails.ExternalTransferOrderItemId.toString())
    //   var qty = toItem.ExternalTransferOrderDetails
    //     .map((ExternalTransferOrderDetail) => ExternalTransferOrderDetail.deliveryOrderDeliveredQuantity)
    //     .reduce((prev, curr, index) => {
    //       if (index === (poItem.fulfillments.length - 1)) {
    //         return prev + 0
    //       } else {
    //         return prev + curr
    //       }
    //     }, 0);

    //   var correctionQty = poItem.fulfillments
    //     .map(itemFulfillmentsPO => {
    //       if (itemFulfillmentsPO.correction) {
    //         var cQty = itemFulfillmentsPO.correction
    //           .map(c => {
    //             if (c.correctionRemark) {
    //               if (c.correctionRemark === "Koreksi Jumlah") {
    //                 return c.correctionQuantity;
    //               } else {
    //                 return 0;
    //               }
    //             } else {
    //               return 0;
    //             }
    //           })
    //           .reduce((prev, curr, index) => {
    //             return prev + curr;
    //           }, 0);
    //         return cQty;
    //       } else {
    //         return 0;
    //       }
    //     })
    //     .reduce((prev, curr, index) => {
    //       return prev + curr;
    //     }, 0);

    //   this.data.remainingQuantity = poItem.dealQuantity - qty - correctionQty;
    // // }

  //   if (this.data) {
  //     this.deliveredQuantity = this.data.deliveredQuantity;
  //   } else {
  //     this.deliveredQuantity = 0;
  //   }
  //   if (!this.options.readOnly) {
  //     if (this.data.remainingQuantity < this.data.deliveredQuantity) {
  //       this.isWarning = true
  //     }
  //     else {
  //       this.isWarning = false;
  //     }
  //   }
  }

  // get productLoader() {
  //   return ProductLoader;
  // }

  productView = (product) => {
    return `${product.ProductCode}-${product.ProductName}`;
  }

  deliveredQuantityChanged(newValue) {
    if (typeof newValue === "number") {
      this.data.deliveredQuantity = newValue
      if (!this.options.readOnly) {
        if (this.data.remainingQuantity < this.data.deliveredQuantity) {
          this.isWarning = true
        }
        else {
          this.isWarning = false;
        }
      }
    } else {
      if (this.isWarning) {
        this.isWarning = false;
      }
      if (newValue === null) {
        this.deliveredQuantity = 0
      } else {
        this.deliveredQuantity = this.data.deliveredQuantity;
      }
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}