import {
  bindable,
  inject,
  containerless,
  computedFrom,
  BindingEngine
} from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";
import { Service, ServiceCore } from "./service";

import LocalSalesContractLoader from "../../../loader/finishing-printing-sales-contract-loader";
import ExportSalesContractLoader from "../../../loader/finishing-printing-sales-contract-loader";

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

    if (this.data.DOSalesType == "Lokal" && this.data.LocalSalesContract.Id) {
      this.selectedLocalSalesContract = await this.service.getSalesContractById(
        this.data.LocalSalesContract.Id,
        this.localSalesContractFields
      );
    }
    else {
      this.selectedLocalSalesContract = this.data.LocalSalesContract;
    }

    if (this.data.DOSalesType == "Ekspor" && this.data.ExportSalesContract.Id) {
      this.selectedExportSalesContract = await this.service.getSalesContractById(
        this.data.ExportSalesContract.Id,
        this.exportSalesContractFields
      );
    }
  }

  doSalesLocalItemsInfo = {
    columns: [
      "No SPP", "Material Konstruksi", "Jenis / Code", "Pcs / Roll / Pt", "Yds / Bale", "Mtr / Kg"
    ],
    onAdd: function () {
      this.context.DOSalesLocalItemsCollection.bind();
      this.data.DOSalesLocalItems = this.data.DOSalesLocalItems || [];
      this.data.DOSalesLocalItems.push({});
    }.bind(this),
    onRemove: function () {
      this.context.DOSalesLocalItemsCollection.bind();
    }.bind(this)
  };

  localOptions = {};

  doSalesTypeOptions = ["", "Lokal", "Ekspor"];
  doSalesLocalOptions = ["", "US", "UP", "UK", "RK", "USS", "UPS", "JS", "JB"];
  doSalesExportOptions = ["", "KKF", "KKP"];
  packingUomOptions = ["", "PCS", "ROLL", "PT"];
  imperialUomOptions = ["", "YDS", "BALE"];
  metricUomOptions = ["", "MTR", "KG"];

  @bindable selectedLocalSalesContract;
  async selectedLocalSalesContractChanged(newValue, oldValue) {
    if (this.selectedLocalSalesContract && this.selectedLocalSalesContract.Id) {
      this.data.LocalSalesContract = this.selectedLocalSalesContract;
      this.data.LocalMaterial = this.selectedLocalSalesContract.Material;
      this.data.LocalMaterialConstruction = this.selectedLocalSalesContract.MaterialConstruction;
      this.data.MaterialWidth = this.selectedLocalSalesContract.MaterialWidth;

      if (this.selectedLocalSalesContract.Buyer.Id) {
        this.selectedBuyer = await this.serviceCore.getBuyerById(this.selectedLocalSalesContract.Buyer.Id);
        this.data.LocalBuyer = this.selectedBuyer;
      } else {
        this.selectedBuyer = this.selectedLocalSalesContract.Buyer;
        this.data.LocalBuyer = this.selectedLocalSalesContract.Buyer;
      }

      if (!this.data.Id) {
        var salesContract = await this.service.getProductionOrderBySalesContractId(this.data.LocalSalesContract.Id);
        var scData = salesContract.data;
        this.data.DOSalesLocalItems = [];
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
            this.data.DOSalesLocalItems.push(sc);
          }
        }
      }
    } else {
      this.data.LocalSalesContract = null;
      this.data.LocalBuyer = null;
    }
  }

  @bindable selectedExportSalesContract;
  async selectedExportSalesContractChanged(newValue, oldValue) {
    if (this.selectedExportSalesContract && this.selectedExportSalesContract.Id) {
      this.data.ExportSalesContract = this.selectedExportSalesContract;

      if (this.selectedExportSalesContract.Buyer.Id) {
        this.selectedBuyer = await this.serviceCore.getBuyerById(this.selectedExportSalesContract.Buyer.Id);
        this.data.ExportBuyer = this.selectedBuyer
      } else {
        this.selectedBuyer = this.selectedExportSalesContract.Buyer;
        this.data.ExportBuyer = this.selectedExportSalesContract.Buyer;
      }

    } else {
      this.data.ExportSalesContract = null;
      this.data.ExportBuyer = null;
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

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    } else return true;
  }

  localSalesContractNoView(sc) {
    return sc.SalesContractNo;
  }
  exportSalesContractNoView(sc) {
    return sc.SalesContractNo;
  }

  get localSalesContractLoader() {
    return LocalSalesContractLoader;
  }
  get exportSalesContractLoader() {
    return ExportSalesContractLoader;
  }
}
