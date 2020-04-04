import {
  bindable,
  inject,
  containerless,
  computedFrom,
  BindingEngine
} from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";
import { Service, ServiceCore } from "./service";

import SalesContractLoader from "../../../loader/finishing-printing-sales-contract-loader";

@containerless()
@inject(Service, ServiceCore, BindingSignaler, BindingEngine)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;

  @bindable disp;
  @bindable op;
  @bindable sc;
  @bindable fillEachBale;
  @bindable LengthUom;
  @bindable WeightUom;
  @bindable selectedSalesContract;
  
  constructor(
    service,
    serviceCore,
    bindingSignaler,
    bindingEngine
  ) {
    this.service = service;
    this.serviceCore = serviceCore;
    this.signaler = bindingSignaler;
    this.bindingEngine = bindingEngine;
  }

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || "").toString() !== "";
  }
  async bind(context) {
    // debugger
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    if (this.data.Disp) {
      this.disp = this.data.Disp;
    }
    if (this.data.Op) {
      this.op = this.data.Op;
    }
    if (this.data.Sc) {
      this.sc = this.data.Sc;
    }
    if (this.data.FillEachBale) {
      this.fillEachBale = this.data.FillEachBale;
    }

    // if (this.data.SalesContract) {
    //   this.selectedSalesContract = this.data.SalesContract;
    // }

    var salesContract = this.data.SalesContract;
    if (salesContract) {
      this.selectedSalesContract = await this.service.getSalesContractById(
        salesContract.Id,
        this.salesContractFields
      );
    }
    else {
      this.selectedSalesContract = this.data.SalesContract;
    }

    if (this.data.LengthUom) {
      this.detailOptions.LengthUom = this.data.LengthUom;
      this.LengthUom = this.data.LengthUom;
    }

    if (this.data.WeightUom) {
      this.detailOptions.WeightUom = this.data.WeightUom;
      this.WeightUom = this.data.WeightUom;
    }
  }

  doSalesLocalItemsInfo = {
    columns: [
      "No SPP", "Material Konstruksi", "Jenis / Code", "Jumlah Packing", "Panjang", "Hasil Konversi"
    ],
    onRemove: function () {
      this.context.ItemsCollection.bind();
    }.bind(this)
  };

  doSalesExportItemsInfo = {
    columns: [
      "No SPP", "Material Konstruksi", "Jenis / Code", "Jumlah Packing", "Berat", "Hasil Konversi"
    ],
    onRemove: function () {
      this.context.ItemsCollection.bind();
    }.bind(this)
  };

  detailOptions = {};

  doSalesTypeOptions = ["", "Lokal", "Ekspor"];
  doSalesLocalOptions = ["", "US", "UP", "UK", "RK", "USS", "UPS", "JS", "JB"];
  doSalesExportOptions = ["", "KKF", "KKP"];
  packingUomOptions = ["", "PCS", "ROLL", "PT"];
  lengthUomOptions = ["", "YDS", "MTR"];
  weightUomOptions = ["", "BALE", "KG"];

  async selectedSalesContractChanged(newValue, oldValue) {
    // if (this.selectedSalesContract && this.selectedSalesContract.Id) {
    if (newValue) {
      this.data.SalesContract = this.selectedSalesContract;
      this.data.Material = this.selectedSalesContract.Material;
      this.data.MaterialConstruction = this.selectedSalesContract.MaterialConstruction;
      this.data.MaterialWidth = this.selectedSalesContract.MaterialWidth;

      if (this.selectedSalesContract.Buyer.Id) {
        this.selectedBuyer = await this.serviceCore.getBuyerById(this.selectedSalesContract.Buyer.Id);
        this.data.Buyer = this.selectedBuyer;
      } else {
        this.selectedBuyer = this.selectedSalesContract.Buyer;
        this.data.Buyer = this.selectedSalesContract.Buyer;
      }

      if (!this.data.Id) {
        var salesContract = await this.service.getProductionOrderBySalesContractId(this.data.SalesContract.Id);
        var scData = salesContract.data;
        this.data.DOSalesDetailItems = [];
        for (var item of scData) {
          for (var detailItem of item.Details) {
            var sc = {
              Material: item.Material,
              MaterialConstruction: item.MaterialConstruction,
              MaterialWidth: item.MaterialWidth,
              ColorRequest: detailItem.ColorRequest,
              ColorTemplate: detailItem.ColorTemplate,
              ProductionOrder: item,
              ConstructionName: `${item.Material.Name} / ${item.MaterialConstruction.Name} / ${item.MaterialWidth} / ${detailItem.ColorRequest}`,
            }
            this.data.DOSalesDetailItems.push(sc);
          }
        }
      }
    } else {
      this.data.SalesContract = null;
      this.data.Buyer = null;
      this.data.DOSalesDetailItems = [];
    }
  }

  dispChanged(newValue, OldValue) {
    this.data.Disp = this.disp;
  }
  opChanged(newValue, OldValue) {
    this.data.Op = this.op;
  }
  scChanged(newValue, OldValue) {
    this.data.Sc = this.sc;
  }
  fillEachBaleChanged(newValue, OldValue) {
    this.data.FillEachBale = this.fillEachBale;
  }

  LengthUomChanged(newValue, oldValue) {
    if (newValue) {
      this.detailOptions.LengthUom = newValue;
    }
    this.data.LengthUom = this.LengthUom;
  }

  WeightUomChanged(newValue, oldValue) {
    if (newValue) {
      this.detailOptions.WeightUom = newValue;
    }
    this.data.WeightUom = this.WeightUom;
  }

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    } else return true;
  }

  salesContractNoView(sc) {
    return sc.SalesContractNo;
  }

  get salesContractLoader() {
    return SalesContractLoader;
  }
}
