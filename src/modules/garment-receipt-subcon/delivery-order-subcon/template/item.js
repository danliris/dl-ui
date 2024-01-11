import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service, SalesService } from "../service";

@inject(Service, SalesService)
export class Item {
  @bindable selectedProduct;
  @bindable selectedPO;
  constructor(service, salesService) {
    this.service = service;
    this.salesService = salesService;
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
    this.CostCalculationId = this.options.CostCalculationId;

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
        CategoryName: this.data.Product.Name,
      };
    }
  }

  removeItems = function () {
    this.bind();
  };

  productView = (pro) => {
    return `${pro.CategoryName}`;
  };

  get productLoader() {
    return (keyword) => {
      var info = {
        keyword: keyword,
        filter: JSON.stringify({
          CostCalculationGarmentId: this.CostCalculationId,
        }),
      };
      return this.salesService.getMatelialCCbyId(info).then((result) => {
        var productList = [];
        for (var a of result.data) {
          var dup = productList.find((d) => d.CategoryName == a.CategoryName);
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
      this.data.Product.Id = newValue.ProductId;
      this.data.Product.Code = newValue.ProductCode;
      this.data.Product.Name = newValue.CategoryName;
      this.data.Product.Remark = newValue.ProductRemark;
    } else {
      this.data.Product = {};
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
        filter: JSON.stringify({
          CostCalculationGarmentId: this.CostCalculationId,
          CategoryName: this.data.Product.Name,
        }),
      };
      return this.salesService.getMatelialCCbyId(info).then((result) => {
        var POList = [];
        for (var a of result.data) {
          var dup = POList.find((d) => d.PO_SerialNumber == a.PO_SerialNumber);
          if (!dup) {
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
      this.data.POSerialNumber = newValue.PO_SerialNumber;
      this.data.BudgetQuantity = newValue.BudgetQuantity;
      this.data.PricePerDealUnit = newValue.Price;
      this.data.Uom.Id = newValue.UOMPriceId;
      this.data.Uom.Unit = newValue.UOMPriceName;
      this.data.CurrencyCode = "IDR";
    }
  }
}
