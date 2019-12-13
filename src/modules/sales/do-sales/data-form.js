import {
  bindable,
  inject,
  containerless,
  computedFrom,
  BindingEngine
} from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";
import { Service, ServiceSales, ServiceCore } from "./service";

var ProductionOrderLoader = require("../../../loader/production-order-azure-loader");
var BuyersLoader = require("../../../loader/buyers-loader");
var MaterialConstructionLoader = require("../../../loader/material-loader");
var StorageLoader = require("../../../loader/storage-loader");

@containerless()
@inject(Service, ServiceSales, ServiceCore, BindingSignaler, BindingEngine)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;
  // @bindable items;

  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 5
    }
  };

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
    this.context._this = this;
    this.data = this.context.data;
    this.error = this.context.error;

    var productionOrderId = this.data.ProductionOrderId;
    // var productionOrderId = "58c8f8287b915900364dd2b0";
    if (productionOrderId) {
      this.selectedProductionOrder = await this.serviceSales.getProductionOrderById(
        productionOrderId,
        this.productionOrderFields
      );
    }

    var buyerId = this.data.BuyerId;
    if (buyerId) {
      this.selectedBuyer = await this.serviceCore.getBuyerById(
        buyerId,
        this.buyerFields
      );
    } else {
      this.selectedBuyer = {
        Id: this.data.BuyerId,
        Code: this.data.BuyerCode,
        Name: this.data.BuyerName,
        Address: this.data.BuyerAddress,
        Type: this.data.BuyerType
      };
    }

    var materialConstructionId = this.data.MaterialConstructionFinishId;
    if (materialConstructionId) {
      this.selectedMaterialConstructionFinish = await this.serviceCore.getMaterialConstructionById(
        materialConstructionId,
        this.materialConstructionFields
      );
    }

    var storageId = this.data.StorageId;
    if (storageId) {
      this.selectedStorage = await this.serviceCore.getStorageById(
        storageId,
        this.storageFields
      );
    }
  }

  errorChanged() {
    console.log(this.error);
  }

  doSalesDetailsInfo = {
    columns: [
      "Nama Barang",
      "Kuantitas",
      "Berat Satuan",
      "Panjang Satuan",
      "Remark"
    ],
    onAdd: function() {
      this.context.DOSalesDetailsCollection.bind();
      this.data.DOSalesDetails = this.data.DOSalesDetails || [];
      this.data.DOSalesDetails.push({});
    }.bind(this),
    onRemove: function() {
      this.context.DOSalesDetailsCollection.bind();
    }.bind(this)
  };
  packingUomOptions = [
    "",
    "ROLL",
    "PCS",
    "POT",
    "SETS",
    "SLP",
    "BDL",
    "KRG",
    "LBR"
  ];

  @bindable selectedProductionOrder;
  async selectedProductionOrderChanged(newValue, oldValue) {
    if (this.selectedProductionOrder && this.selectedProductionOrder.Id) {
      this.data.ProductionOrderId = this.selectedProductionOrder.Id;
      this.data.ProductionOrderNo = this.selectedProductionOrder.OrderNo;

      var material =
        this.selectedProductionOrder.Material &&
        this.selectedProductionOrder.Material.Name
          ? this.selectedProductionOrder.Material
          : "";

      this.data.MaterialId = material.Id;
      this.data.Material = material.Name;

      if (!this.context.hasEdit) {
        if (this.selectedProductionOrder.Buyer.Id) {
          this.selectedBuyer = await this.serviceCore.getBuyerById(
            this.selectedProductionOrder.Buyer.Id
          );
          this.data.BuyerId = this.selectedBuyer.Id;
          this.data.BuyerCode = this.selectedBuyer.Code;
          this.data.BuyerName = this.selectedBuyer.Name;
          this.data.BuyerAddress = this.selectedBuyer.Address;
          this.data.BuyerType = this.selectedBuyer.Type;
        } else {
          this.selectedBuyer = this.selectedProductionOrder.Buyer;
          this.data.BuyerId = this.selectedProductionOrder.Buyer.Id;
          this.data.BuyerCode = this.selectedProductionOrder.Buyer.Code;
          this.data.BuyerName = this.selectedProductionOrder.Buyer.Name;
          this.data.BuyerAddress = this.selectedProductionOrder.Buyer.Address;
          this.data.BuyerType = this.selectedProductionOrder.Buyer.Type;
        }
        this.data.MaterialWidthFinish = this.selectedProductionOrder.FinishWidth;
      }
    } else {
      this.data.ProductionOrderId = null;
      this.data.ProductionOrderNo = null;
    }
  }

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    } else return true;
  }

  @bindable selectedBuyer;
  selectedBuyerChanged(newValue, oldValue) {
    if (this.selectedBuyer && this.selectedBuyer.Id) {
      console.log(this.selectedBuyer); //Buyer Changed
      this.data.BuyerId = this.selectedBuyer.Id;
      this.data.BuyerCode = this.selectedBuyer.Code;
      this.data.BuyerName = this.selectedBuyer.Name;
      this.data.BuyerAddress = this.selectedBuyer.Address;
      this.data.BuyerType = this.selectedBuyer.Type;
    } else {
      this.data.BuyerId = null;
      this.data.BuyerCode = null;
      this.data.BuyerName = null;
      this.data.BuyerAddress = null;
      this.data.BuyerType = null;
    }
  }

  @bindable selectedStorage;
  selectedStorageChanged(newValue, oldValue) {
    if (this.selectedStorage && this.selectedStorage._id) {
      // console.log(this.selectedStorage); //Storage Changed)
      this.data.StorageId = this.selectedStorage._id;
      this.data.StorageName = this.selectedStorage.name;
    } else {
      this.data.StorageId = null;
      this.data.StorageName = null;
    }
  }

  @bindable selectedMaterialConstructionFinish;
  selectedMaterialConstructionFinishChanged(newValue, oldValue) {
    if (
      this.selectedMaterialConstructionFinish &&
      this.selectedMaterialConstructionFinish.Id
    ) {
      // console.log(this.selectedMaterialConstructionFinish); //Material Changed)
      this.data.MaterialConstructionFinishId = this.selectedMaterialConstructionFinish.Id;
      this.data.MaterialConstructionFinishName = this.selectedMaterialConstructionFinish.Name;
    } else {
      this.data.MaterialConstructionFinishId = null;
      this.data.MaterialConstructionFinishName = null;
    }
  }

  productionOrderTextFormatter = productionOrder => {
    return `${productionOrder.OrderNo}`;
  };

  get productionOrderLoader() {
    return ProductionOrderLoader;
  }
  get buyersLoader() {
    return BuyersLoader;
  }
  get materialConstructionFinishLoader() {
    return MaterialConstructionLoader;
  }

  get storageLoader() {
    return StorageLoader;
  }

  console() {
    console.log(this.data);
  }
  widthChanged(e) {
    console.log(this.data.MaterialWidthFinish);
  }
}
