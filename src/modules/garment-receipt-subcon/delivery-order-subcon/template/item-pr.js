import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service } from "../service";
import { forEach } from "../../../../routes/master";

@inject(Service)
export class ItemPR {
  @bindable selectedProduct;
  @bindable selectedPO;

  constructor(service) {
    this.service = service;
  }

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
    this.hasCreate = context.context.options.hasCreate;
    this.hasEdit = context.context.options.hasEdit;
    this.isEdit = context.context.options.isEdit;
    this.hasView = context.context.options.hasView;
    this.items = this.context.context.items;

    this.itemOptions = {
      error: this.error,
      isCreate: this.isCreate,
      isEdit: this.isEdit,
      readOnly: this.readOnly,
      isView: this.isView,
    };

    if (this.data.POSerialNumber) {
      this.selectedPO = {
        PO_SerialNumber: this.data.POSerialNumber,
      };
      this.selectedProduct = {
        Product: this.data.Product,
      };
    }
  }

  removeItems = function () {
    this.bind();
  };

  productView = (pro) => {
    return `${pro.Product.Name}`;
  };

  get productLoader() {
    return (keyword) => {
      var info = {
        keyword: keyword,
        filter: JSON.stringify({}),
      };
      return this.service.getPR(info).then((result) => {
        var productList = [];
        for (var a of result.data) {
          var dup = productList.find((d) => d.Product.Name == a.Product.Name);

          if (!dup) {
            productList.push(a);
          }
        }
        return productList;
      });
    };
  }

  selectedProductChanged(newValue) {
    if (newValue) {
      this.data.Product = {};
      this.data.Product.Id = newValue.Product.Id;
      this.data.Product.Code = newValue.Product.Code;
      this.data.Product.Name = newValue.Product.Name;
      this.data.ProductRemark = newValue.ProductRemark;
    } else {
      this.data.Product = {};
      this.data.ProductRemark = null;
    }
  }

  POView = (po) => {
    return `${po.PO_SerialNumber}`;
  };

  @computedFrom("data.Product")
  get PONumberLoader() {
    return (keyword) => {
      var info = {
        keyword: keyword,
        filter: JSON.stringify({}),
      };
      return this.service.getPR(info).then((result) => {
        var POList = [];
        for (var a of result.data) {
          var dup = POList.find((d) => d.PO_SerialNumber == a.PO_SerialNumber);
          if (!dup && a.Product.Name == this.data.Product.Name) {
            var dupPOs = this.items.find(
              (s) => s.data.POSerialNumber == a.PO_SerialNumber
            );

            if (!dupPOs) {
              POList.push(a);
            }
          }
        }
        return POList;
      });
    };
  }

  selectedPOChanged(newValue) {
    if (newValue) {
      this.data.Uom = {};
      this.data.PRItemId = newValue.Id;
      this.data.POSerialNumber = newValue.PO_SerialNumber;
      this.data.BudgetQuantity = newValue.RemainingQuantity;
      this.data.PricePerDealUnit = newValue.BudgetPrice;
      this.data.Uom.Id = newValue.Uom.Id;
      this.data.Uom.Unit = newValue.Uom.Unit;
      this.data.CurrencyCode = "IDR";
    }
  }
}
