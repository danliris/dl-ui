import {
  inject,
  bindable,
  containerless,
  computedFrom,
  BindingEngine,
} from "aurelia-framework";
import { Service } from "./service";
var SupplierLoader = require("../../../loader/garment-supplier-loader");

@containerless()
@inject(BindingEngine, Element)
export class DataForm {
  @bindable readOnly = false;
  @bindable data = {};
  @bindable error = {};
  @bindable title;
  @bindable supplier;
  @bindable options = {};

  shipmentTypes = ["By Air", "By Sea"];
  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 3,
    },
  };
  itemsInfo = {
    columns: [
      { header: "Keterangan" },
      { header: "Qty" },
      { header: "Satuan" },
      { header: "Harga" },
      { header: "Mata Uang" },
    ],

    onAdd: function () {
      this.context.ItemsCollection.bind();
      this.data.items.push({});
    }
    .bind(this),
  };


  constructor(bindingEngine, element) {
    this.bindingEngine = bindingEngine;
    this.element = element;
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    var hasItems = true;
    if (this.data.items.length == 0) hasItems = false;

    this.options = {
      hasCreate: this.context.hasCreate,
      hasEdit: this.context.hasEdit,
      hasView: this.context.hasView,
    }
  }

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || "").toString() != "";
  }

  @computedFrom("data.supplier")
  get supplierType() {
    if (this.context.hasCreate) {
      if (!this.data.supplier.import)
        return this.data.supplier.Import || false ? "Import" : "Lokal";
      else return this.data.supplier.import || false ? "Import" : "Lokal";
    } else {
      return this.data.shipmentNo || "" ? "Import" : "Lokal";
    }
  }

  @computedFrom("data.supplier")
  get isImport() {
    if (this.data.supplier) {
      return this.data.supplier.import || false;
    } else {
      return false;
    }
  }

  supplierChanged(newValue, oldValue) {
    var selectedSupplier = newValue;
    if (selectedSupplier) {
      if (selectedSupplier.Id) {
        this.data.supplier = selectedSupplier;
        this.data.supplierId = selectedSupplier.Id;
      }
    } else {
      this.data.supplier = {};
      this.data.supplierId = undefined;
    }
    this.data.shipmentType = "";
    this.data.shipmentNo = "";
    this.data.items = [];
    this.resetErrorItems();
  }

  get supplierLoader() {
    return SupplierLoader;
  }

  get supplierQuery(){
    var result = { "Active" : true }
    return result;   
  }
  

  supplierView = (supplier) => {
    if (!supplier.code) return `${supplier.Code} - ${supplier.Name}`;
    else return `${supplier.code} - ${supplier.name}`;
  };

  resetErrorItems() {
    if (this.error) {
      if (this.error.items) {
        this.error.items = [];
      }
    }
  }

  shipmentTypeChanged(e) {
    var selectedPayment = e.srcElement.value;
    if (selectedPayment) {
      this.data.shipmentNo = "";
    }
  }

  itemChanged(e) {
    console.log("after change parent", this);
    console.log("after change parent event", e);
  }

  get removeItems() {
    return (event) => {
      this.error = null;
    };
  }
}
