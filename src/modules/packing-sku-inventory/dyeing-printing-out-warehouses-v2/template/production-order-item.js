import { inject, bindable, computedFrom } from 'aurelia-framework'
let DOSalesLoader = require("../../../../loader/do-sales-loader");

export class ProductionOrderItem {
    @bindable product;

    // isAval = false;
    // remarks = [];
    packingItems = [];
    
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        if (this.data.deliveryOrderSalesId && this.data.deliveryOrderSalesNo) {
            this.selectedDeliveryOrderSales = {};
      
            this.selectedDeliveryOrderSales.Id = this.data.deliveryOrderSalesId;
            this.selectedDeliveryOrderSales.DOSalesNo = this.data.deliveryOrderSalesNo;
          }
    }

    controlOptions = {
        control: {
            length: 12
        }
    };

    get doSalesLoader() {
        return DOSalesLoader;
      }

      doSalesQuery = { DOSalesCategory: "DYEINGPRINTING" };

      @bindable selectedDeliveryOrderSales;
  selectedDeliveryOrderSalesChanged(newValue, oldValue) {
    if (this.selectedDeliveryOrderSales && this.selectedDeliveryOrderSales.Id) {
      this.data.deliveryOrderSalesId = this.selectedDeliveryOrderSales.Id;
      this.data.deliveryOrderSalesNo = this.selectedDeliveryOrderSales.DOSalesNo;
    }
  }
  changeCheckBox() {
    this.context.context.options.checkedAll = this.context.context.items.reduce(
      (acc, curr) => acc && curr.data.IsSave,
      true
    );
  }
}