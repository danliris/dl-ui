import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service } from "./service";

let WarehouseBonAreaLoader = require("../../../loader/input-warehouses-bon-loader");

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
  destinationAreas = ["INSPECTION MATERIAL", "SHIPPING","PACKING","TRANSIT"];
  
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

  detailOptions = {};

  areaMovementTextFormatter = (areaInput) => {
    return `${areaInput.bonNo}`;
  };

  @computedFrom("data.id")
  get isEdit() {
    return (this.data.id || "").toString() != "";
  }

  get bonWarehouseLoader(){
    return WarehouseBonAreaLoader;
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;

    this.data.area = "GUDANG JADI";

    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
    if(this.data.bon){
      // console.log("bonexist");
      // this.data.selectedWarehouse = this.data.bon;
      // selectedWarehouseChanged(this.data.bon,"");
      // this.service.getProductionOrderInputv2(this.data.selectedWarehouse.id).then(result =>{
      //   this.data.warehousesProductionOrders = result;
      // });
      // this.data.warehousesProductionOrders
      // console.log(this.data.bon);
      this.service.getProductionOrderOutput(this.data.bon.id).then(result =>{
        this.data.warehousesProductionOrders = result;
      });
    }
    if (this.ItemsCollection) {
        this.ItemsCollection.bind();
    }
    
  }

  addItemCallback = (e) => {
    this.data.warehousesProductionOrders =
      this.data.warehousesProductionOrders || [];
    this.data.warehousesProductionOrders.push({});
  };
  selectedWarehouseChanged(n,o){
    if(n!=o){
      // console.log(n);
      this.service.getProductionOrderInputv2(n.id).then(result =>{
        this.data.warehousesProductionOrders = result;
      });
    }
  }
}
