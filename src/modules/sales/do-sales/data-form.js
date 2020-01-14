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

  storageQuery = {
    "DivisionName" : "DYEING & PRINTING"
  }

  async bind(context) {
    this.context = context;
    this.context._this = this;
    this.data = this.context.data;
    this.error = this.context.error;

    var productionOrderId = this.data.ProductionOrderId;
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
        Type: this.data.BuyerType,
        NPWP: this.data.BuyerNPWP
      };
    }

    var destinationBuyerId = this.data.DestinationBuyerId;
    if (destinationBuyerId) {
      this.selectedDestinationBuyer = await this.serviceCore.getBuyerById(
        destinationBuyerId,
        this.destinationBuyerFields
      );
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
      "Kode Barang",
      "Keterangan Barang",
      "Total Packing",
      "Total Panjang (m)",
      "Total Panjang (yard)"
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

  doSalesTypeOptions = ["", "UP", "US", "JS", "USS", "JB", "UPS"];
  packingUomOptions = ["", "PCS", "ROLL"];
  lengthUomOptions = ["", "MTR"];

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
          this.data.BuyerNPWP = this.selectedBuyer.NPWP;
        } else {
          this.selectedBuyer = this.selectedProductionOrder.Buyer;
          this.data.BuyerId = this.selectedProductionOrder.Buyer.Id;
          this.data.BuyerCode = this.selectedProductionOrder.Buyer.Code;
          this.data.BuyerName = this.selectedProductionOrder.Buyer.Name;
          this.data.BuyerAddress = this.selectedProductionOrder.Buyer.Address;
          this.data.BuyerType = this.selectedProductionOrder.Buyer.Type;
          this.data.BuyerNPWP = this.selectedProductionOrder.Buyer.NPWP;
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
      this.data.BuyerId = this.selectedBuyer.Id;
      this.data.BuyerCode = this.selectedBuyer.Code;
      this.data.BuyerName = this.selectedBuyer.Name;
      this.data.BuyerAddress = this.selectedBuyer.Address;
      this.data.BuyerType = this.selectedBuyer.Type;
      this.data.BuyerNPWP = this.selectedBuyer.NPWP;
    } else {
      this.data.BuyerId = null;
      this.data.BuyerCode = null;
      this.data.BuyerName = null;
      this.data.BuyerAddress = null;
      this.data.BuyerType = null;
      this.data.BuyerNPWP = null;
    }
  }

  @bindable selectedDestinationBuyer;
  selectedDestinationBuyerChanged(newValue, oldValue) {
    if (this.selectedDestinationBuyer && this.selectedDestinationBuyer.Id) {
      this.data.DestinationBuyerId = this.selectedDestinationBuyer.Id;
      this.data.DestinationBuyerCode = this.selectedDestinationBuyer.Code;
      this.data.DestinationBuyerName = this.selectedDestinationBuyer.Name;
      this.data.DestinationBuyerAddress = this.selectedDestinationBuyer.Address;
      this.data.DestinationBuyerType = this.selectedDestinationBuyer.Type;
      this.data.DestinationBuyerNPWP = this.selectedDestinationBuyer.NPWP;
    }
  }

  @bindable selectedStorage;
  selectedStorageChanged(newValue, oldValue) {
    if (this.selectedStorage && this.selectedStorage._id) {
      this.data.StorageId = this.selectedStorage._id;
      this.data.StorageName = this.selectedStorage.name;
      this.data.StorageDivision = this.selectedStorage.unit.division.Name;
    } else {
      this.data.StorageId = null;
      this.data.StorageName = null;
      this.data.StorageDivision = null;
    }
  }

  @bindable selectedMaterialConstructionFinish;
  selectedMaterialConstructionFinishChanged(newValue, oldValue) {
    if (
      this.selectedMaterialConstructionFinish &&
      this.selectedMaterialConstructionFinish.Id
    ) {
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

  storageView = (storage) => {
    return `${storage.unit.division.Name} - ${storage.name}`;
}

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
  doSalesNoChanged(e) {
    console.log(this.data.DOSalesNo);
  }
  doSalesTypeChanged(e) {
    console.log(this.data.DOSalesType);
  }
  headOfStorageChanged(e) {
    console.log(this.data.HeadOfStorage);
  }
  remarkChanged(e) {
    console.log(this.data.Remark);
  }
  packingUomChanged(e) {
    console.log(this.data.PackingUom);
  }
  lengthUomChanged(e) {
    console.log(this.data.LengthUom);
  }
  dispChanged(e) {
    console.log(this.data.Disp);
  }
  opChanged(e) {
    console.log(this.data.Op);
  }
  scChanged(e) {
    console.log(this.data.Sc);
  }
}
