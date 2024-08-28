import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service, PurchasingService } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');
var BuyerLoader = require('../../../loader/garment-buyer-brands-loader');

@inject(Service, PurchasingService)
export class DataForm {
  @bindable readOnly = false;
  @bindable isCreate = false;
  @bindable isEdit = false;
  @bindable isView = false;
  @bindable title;
  @bindable data = {};
  @bindable selectedUnit;
  @bindable itemOptions = {};

  constructor(service, purchasingService) {
    this.service = service;
    this.purchasingService = purchasingService;
  }

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  UomOptions = ['IKAT', 'COLI', 'CARTON', 'ROLL', 'PK'];
  controlOptions = {
    label: {
      length: 3
    },
    control: {
      length: 5
    }
  };

  itemsInfo = {
    columns: [
      "RO",
      "Article",
      "Unit",
      "Komoditi",
      "Quantity BJ",
      "Quantity Sample"
    ]
  }

  itemsInfo2 = {
    columns: [
      "RO",
      "Article",
      "Unit",
      "Komoditi",
      "Quantity Sample"
    ]
  }

  get buyerLoader() {
    return BuyerLoader;
  }
  buyerView = (buyer) => {
    var buyerName = buyer.Name || buyer.name;
    var buyerCode = buyer.Code || buyer.code;
    return `${buyerCode} - ${buyerName}`
  }

  filterbuyer = {
             "Code!=BuyerName": true,
             "Active" : true
       };


  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.itemOptions = {
      isCreate: this.context.isCreate,
      isEdit: this.context.isEdit,
      isView: this.context.isView,
      checkedAll: this.context.isCreate == true ? false : true
    }

  }

  unitView = (unit) => {
    return `${unit.Code} - ${unit.Name}`;
  }

  get unitLoader() {
    return UnitLoader;
  }

  selectedUnitChanged(newValue) {
    if (newValue) {
      this.data.Unit = newValue;
    }
    else {
      this.data.Items.splice(0);
    }
    this.data.Items.splice(0);
  }

  get addItems() {
    return (event) => {
      this.data.Items.push({

      });
    };
  }

  get removeItems() {
    return (event) => {
      this.error = null;
    };
  }
  // changeChecked() {
  //   if (this.data.Items) {
  //     for (var a of this.data.Items) {
  //       a.Quantity = 0;
  //       a.IsSave = false;
  //     }
  //   }
  // }

  get totalQuantity() {
    var qty = 0;
    if (this.data.Items) {
      for (var item of this.data.Items) {
        qty += item.Quantity;
      }
    }
    return qty;
  }

  // get buyerLoader() {
  //   return BuyerLoader;
  // }
  // buyerView = (buyer) => {
  //   var buyerName = buyer.Name || buyer.name;
  //   var buyerCode = buyer.Code || buyer.code;
  //   return `${buyerCode} - ${buyerName}`
  // }
}
