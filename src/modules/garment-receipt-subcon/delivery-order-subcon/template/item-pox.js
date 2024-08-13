import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service, SalesService } from "../service";

@inject(Service, SalesService)
export class ItemPOX {
  @bindable selectedProduct;
  @bindable selectedPO;
  @bindable selectedEPO;
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
    this.RONo = this.options.RONo;
    this.SupplierId = this.options.SupplierId;
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
      this.selectedEPO = {
        EPONo: this.data.EPONo,
      };
      
    }
  }

  removeItems = function () {
    this.bind();
  };

  productView = (pro) => {
    return `${pro.Product.Name}`;
  };

  epoView = (epo) => { 
    return `${epo.EPONo}`;
  }

  get EPOLoader() {
    return (keyword) => {
      var info = {
        keyword: keyword,
        filter: JSON.stringify({
          SupplierId : this.SupplierId,
          [`Items.Any(RONo == "${this.RONo}")`]: true ,
        }),
      };
      return this.service.getEPO(info).then((result) => {
        var EPOList = [];
        for (var a of result.data) {
          //filter epo agar tidak duplicate
          var dup = EPOList.find((d) => d.EPONo == a.EPONo);
          if (!dup) {
            EPOList.push(a);
          }
        }
        return EPOList;
      });
    };
  }

  selectedEPOChanged(newValue) {
    if (newValue) {
      this.data.EPOId = newValue.EPOId;
      this.data.EPONo = newValue.EPONo;
    } 
  }


  get productLoader() {
    return (keyword) => {
      var info = {
        keyword: keyword,
        filter: JSON.stringify({
          SupplierId : this.SupplierId,
          [`Items.Any(RONo == "${this.RONo}")`]: true,
          EPONo : this.data.EPONo
        }),
      };
      return this.service.getEPO(info).then((result) => {
        var EPOList = [];
        for (var a of result.data) {

          //filter epo agar tidak duplicate
          var dup = EPOList.find((d) => d.Product.Name == a.Product.Name);
          if (!dup) {
            EPOList.push(a);
          }
        }
        return EPOList;
      });
    };
  }

  selectedProductChanged(newValue) {
    if (newValue) {
      this.data.Product = newValue.Product;
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
          EPONo : this.data.EPONo,
        }),
      };
      return this.service.getEPO(info).then((result) => {
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
      this.data.POSerialNumber = newValue.PO_SerialNumber;
      this.data.BudgetQuantity = newValue.BudgetQuantity;
      this.data.PricePerDealUnit = newValue.PricePerDealUnit * newValue.CurrencyRate;
      this.data.Uom = newValue.Uom;
      this.data.CurrencyCode = "IDR";
      this.data.EPOItemId = newValue.EPOItemId;
    }
  }
}
