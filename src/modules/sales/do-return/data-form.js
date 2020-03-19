import {
  bindable,
  inject,
  containerless,
  computedFrom,
  BindingEngine
} from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";
import { Service, ServiceSales, ServiceCore } from "./service";

import LocalSalesContractLoader from "../../../loader/shin-finishing-printing-sales-contract-loader";
import ExportSalesContractLoader from "../../../loader/shin-finishing-printing-sales-contract-loader";
import BuyersLoader from "../../../loader/buyers-loader";
import ComodityLoader from "../../../loader/comodity-loader";
import MaterialConstructionLoader from "../../../loader/material-loader";
import ShinProductionOrderLoader from "../../../loader/shin-production-order-loader";

@containerless()
@inject(Service, ServiceSales, ServiceCore, BindingSignaler, BindingEngine)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;
  @bindable selectedStorage;

  constructor(
    service,
    serviceSales,
    serviceCore,
    bindingSignaler,
    bindingEngine
  ) {
    this.service = service;
    this.serviceSales = serviceSales;
    this.serviceCore = serviceCore;
    this.signaler = bindingSignaler;
    this.bindingEngine = bindingEngine;
  }

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || "").toString() !== "";
  }
  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    var localSalesContractId = this.data.LocalSalesContractId;
    if (localSalesContractId) {
      this.selectedLocalSalesContract = await this.serviceSales.getSalesContractById(
        localSalesContractId,
        this.localSalesContractFields
      );
    }

    var exportSalesContractId = this.data.ExportSalesContractId;
    if (exportSalesContractId) {
      this.selectedExportSalesContract = await this.serviceSales.getSalesContractById(
        exportSalesContractId,
        this.exportSalesContractFields
      );
    }

    if (this.data.LocalSalesContractId) {
      this.localOptions.LocalSalesContractId = this.data.LocalSalesContractId;
      this.LocalSalesContractId = this.data.LocalSalesContractId;
    }

  }

  doSalesLocalsInfo = {
    columns: [
      "No SPP", "Jenis / Code", "Pcs / Roll / Pt", "Yds / Bale", "Mtr / Kg"
    ]
  };

  localOptions = {};

  doSalesReturnsInfo = {
    columns: [
      "Ex. Bon Pengiriman", 
      // "Konstruksi", "Motif / Warna","Jenis / Code", "Pcs / Roll / Pt", "Yds / Bale", "Mtr / Kg"
    ],
    onAdd: function () {
      this.context.DOSalesReturnsCollection.bind();
      this.data.DOSalesReturns = this.data.DOSalesReturns || [];
      this.data.DOSalesReturns.push({});
    }.bind(this),
    onRemove: function () {
      this.context.DOSalesReturnsCollection.bind();
    }.bind(this)
  };

  doSalesTypeOptions = ["", "Lokal", "Ekspor", "Retur"];
  doSalesLocalOptions = ["", "US", "UP", "UK", "RK", "USS", "UPS", "JS", "JB"];
  doSalesExportOptions = ["", "KKF", "KKP"];
  doSalesReturnOptions = ["", "FR", "PR"];
  packingUomOptions = ["", "PCS", "ROLL", "PT"];
  imperialUomOptions = ["", "YDS", "BALE"];
  metricUomOptions = ["", "MTR", "KG"];

  @bindable selectedLocalSalesContract;
  async selectedLocalSalesContractChanged(newValue, oldValue) {
    if (this.selectedLocalSalesContract && this.selectedLocalSalesContract.Id) {
      this.data.LocalSalesContractId = this.selectedLocalSalesContract.Id;
      this.data.SalesContractNo = this.selectedLocalSalesContract.CostCalculation.PreSalesContract.No;
      this.data.BuyerId = this.selectedLocalSalesContract.CostCalculation.PreSalesContract.Buyer.Id;
      this.data.BuyerCode = this.selectedLocalSalesContract.CostCalculation.PreSalesContract.Buyer.Code;
      this.data.BuyerName = this.selectedLocalSalesContract.CostCalculation.PreSalesContract.Buyer.Name;
      this.data.BuyerAddress = this.selectedLocalSalesContract.CostCalculation.PreSalesContract.Buyer.Address;
      this.data.BuyerType = this.selectedLocalSalesContract.CostCalculation.PreSalesContract.Buyer.Type;
      this.data.BuyerNPWP = this.selectedLocalSalesContract.CostCalculation.PreSalesContract.Buyer.NPWP;
      var productionOrder = await this.serviceSales.getProductionOrderBySalesContractNo(this.data.SalesContractNo);
      var orderNo = productionOrder.data;
      this.data.DOSalesLocals = [];
      for(var item of orderNo) {
        var local = {
          ProductionOrderNo : item.FinishingPrintingSalesContract.CostCalculation.ProductionOrderNo,
        }
        this.data.DOSalesLocals.push(local);
      }
      // var orderNo = productionOrder.FinishingPrintingSalesContract;
      // for (var poItems of orderNo.FinishingPrintingSalesContract) {
      //   for (var fpscItems of poItems.CostCalculation) {
      //     var ccItems = {
      //       ProductionOrderNo: fpscItems.ProductionOrderNo,
      //     }
      //   }
      // }
      console.log(orderNo);

    } else {
      this.data.LocalSalesContractId = null;
      this.data.BuyerId = null;
      this.data.BuyerCode = null;
      this.data.BuyerName = null;
      this.data.BuyerAddress = null;
      this.data.BuyerType = null;
      this.data.BuyerNPWP = null;
    }
  }

  @bindable selectedExportSalesContract;
  async selectedExportSalesContractChanged(newValue, oldValue) {
    if (this.selectedExportSalesContract && this.selectedExportSalesContract.Id) {
      this.data.ExportSalesContractId = this.selectedExportSalesContract.Id;
      this.data.ExportBuyerId = this.selectedExportSalesContract.CostCalculation.PreSalesContract.Buyer.Id;
      this.data.ExportBuyerCode = this.selectedExportSalesContract.CostCalculation.PreSalesContract.Buyer.Code;
      this.data.ExportBuyerName = this.selectedExportSalesContract.CostCalculation.PreSalesContract.Buyer.Name;
    } else {
      this.data.ExportSalesContractId = null;
      this.data.ExportBuyerId = null;
      this.data.ExportBuyerCode = null;
      this.data.ExportBuyerName = null;
    }
  }

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    } else return true;
  }

  localSalesContractNoView(scNo) {
    return scNo.CostCalculation.PreSalesContract.No;
  }
  exportSalesContractNoView(scNo) {
    return scNo.CostCalculation.PreSalesContract.No;
  }

  get buyersLoader() {
    return BuyersLoader;
  }
  get materialConstructionLoader() {
    return MaterialConstructionLoader;
  }
  get comodityLoader() {
    return ComodityLoader;
  }
  get localSalesContractLoader() {
    return LocalSalesContractLoader;
  }
  get exportSalesContractLoader() {
    return ExportSalesContractLoader;
  }
  get shinProductionOrderLoader() {
    return ShinProductionOrderLoader;
  }
}
