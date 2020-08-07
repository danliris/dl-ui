import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service } from "./service";

let WarehouseBonAreaLoader = require("../../../loader/input-warehouses-bon-loader");
let FilterSPPLoader = require("../../../loader/pre-output-warehouse-spp-loader");
@inject(Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;
  @bindable selectedWarehouse;

  constructor(service) {
    this.service = service;
  }

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    // deleteText: "Hapus",
    // editText: "Ubah",
  };

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };
  destinationAreas = ["INSPECTION MATERIAL", "SHIPPING", "PACKING", "TRANSIT"];
  adjItemColumns = ["No. SPP", "Qty Order", "Jenis Order", "Material", "Unit", "Buyer", "Warna", "Motif", "Grade", "QTY Pack", "Satuan Pack", "Satuan", "QTY Satuan", "QTY Total", "No Dokumen"];
  itemColumns = [
    "No. SPP",
    "Qty Order",
    "Jenis Order",
    // "Qty Order",
    // "Material",
    // "Unit",
    // "Buyer",
    // "Warna",
    // "Motif",
    // "Qty Packaging",
    // "Packaging",
    // "Jenis",
    // "Grade",
    // "Satuan",
    // "Qty Masuk",
    // "Zona Asal",
    ""
  ];

  shifts = ["PAGI", "SIANG"];
  groups = ["A", "B"];
  types = ["OUT", "ADJ"];
  detailOptions = {};

  areaMovementTextFormatter = (areaInput) => {
    return `${areaInput.bonNo}`;
  };

  @computedFrom("data.id")
  get isEdit() {
    return (this.data.id || "").toString() != "";
  }

  @computedFrom("data.type")
  get isAdj() {
    return this.data && this.data.type == "ADJ";
  }

  get bonWarehouseLoader() {
    return WarehouseBonAreaLoader;
  }

  async bind(context) {
    this.context = context;
    this.data = this.context.data;

    this.data.area = "GUDANG JADI";

    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
    // if (this.data.bon) {

    //   // this.data.selectedWarehouse = this.data.bon;
    //   // selectedWarehouseChanged(this.data.bon,"");
    //   // this.service.getProductionOrderInputv2(this.data.selectedWarehouse.id).then(result =>{
    //   //   this.data.warehousesProductionOrders = result;
    //   // });
    //   // this.data.warehousesProductionOrders

    //   if (this.data.type == "OUT") {
    //     this.data.warehousesProductionOrders = await this.service.getProductionOrderOutput(this.data.bon.id);
    //     // this.service.getProductionOrderOutput(this.data.bon.id).then(result => {
    //     //   this.data.warehousesProductionOrders = result;
    //     // });
    //   } else {
    //     if (this.data.warehousesProductionOrders) {
    //       this.data.adjWarehousesProductionOrders = this.data.warehousesProductionOrders;
    //     }

    //   }
    // }
    this.detailOptions = {
      isEdit: this.isEdit,
      readOnly: this.readOnly
    };

    if (this.readOnly) {
      this.adjItemColumns = ["No. SPP", "Qty Order", "Jenis Order", "Material", "Unit", "Buyer", "Warna", "Motif", "Grade", "QTY Pack", "Satuan Pack", "Satuan", "QTY Satuan", "QTY Total", "No Dokumen"];
    } else {
      this.adjItemColumns = ["No. SPP", "Qty Order", "Jenis Order", "Material", "Unit", "Buyer", "Warna", "Motif", "Grade", "QTY Pack", "Satuan Pack", "Satuan", "QTY Satuan", "Saldo", "QTY Total", "No Dokumen"];
    }

    if (this.data.type == "ADJ") {
      if (this.data.warehousesProductionOrders) {
        this.data.adjWarehousesProductionOrders = this.data.warehousesProductionOrders;
      }
    } else {
      if (this.data.warehousesProductionOrders) {
        this.data.displayWarehousesProductionOrders = this.data.warehousesProductionOrders;
      }
    }

    if (this.ItemsCollection) {
      this.ItemsCollection.bind();
    }

  }

  addItemCallback = (e) => {
    this.data.adjWarehousesProductionOrders =
      this.data.adjWarehousesProductionOrders || [];
    this.data.adjWarehousesProductionOrders.push({});
  };
  selectedWarehouseChanged(n, o) {
    if (n != o) {

      this.service.getProductionOrderInputv2(n.id).then(result => {
        this.data.warehousesProductionOrders = result;
      });
    }
  }

  ExportToExcel() {
    this.service.generateExcel(this.data.id);
  }

  get filterSPPLoader() {
    return FilterSPPLoader;
  }
  sppTextFormatter = (spp) => {
    return `${spp.productionOrder.no}`
  }

  @bindable selectedFilterSPP;
  async selectedFilterSPPChanged(n, o) {
    if (this.selectedFilterSPP) {

      this.data.displayWarehousesProductionOrders = await this.service.getProductionOrderInputv2ById(this.selectedFilterSPP.productionOrder.id);
     
    } else {

      this.data.displayWarehousesProductionOrders = await this.service.getProductionOrderInputv2();
      
    }
  }
}
