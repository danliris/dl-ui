import {
  inject,
  bindable,
  containerless,
  computedFrom,
  BindingEngine,
} from "aurelia-framework";
var SupplierLoader = require("../../../loader/garment-supplier-loader");
var CCLoader = require("../../../loader/cost-calculation-garment-loader");

@containerless()
@inject(BindingEngine, Element)
export class DataForm {
  @bindable readOnly = false;
  @bindable data = {};
  @bindable error = {};
  @bindable title;
  @bindable supplier;
  @bindable options = {};
  @bindable cc;

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
      { header: "Barang" },
      { header: "Nomor PO" },
      { header: "Keterangan" },
      { header: "Qty Budget" },
      { header: "Qty SJ" },
      { header: "Satuan" },
      { header: "Harga" },
      { header: "Mata Uang" },
    ],

    onAdd: function () {
      this.context.ItemsCollection.bind();
      this.data.items.push({});
    }.bind(this),
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
      isEdit: this.context.isEdit,
    };

    if (this.data.Id) {
      this.options.CostCalculationId = this.data.costCalculationId;
    }

    this.filterCC = {
      CCType: "SUBCON",
      IsPosted: true,
      IsApprovedKadivMD: true,
    };
  }

  // @computedFrom("data.Id")
  // get isEdit() {
  //   return (this.data.Id || "").toString() != "";
  // }

  supplierChanged(newValue, oldValue) {
    var selectedSupplier = newValue;
    if (selectedSupplier) {
      if (selectedSupplier.Id) {
        this.data.supplier = selectedSupplier;
      }
    } else {
      this.data.supplier = {};
    }
    this.data.items = [];
    this.resetErrorItems();
  }

  get supplierLoader() {
    return SupplierLoader;
  }

  supplierView = (supplier) => {
    if (!supplier.code) return `${supplier.Code} - ${supplier.Name}`;
    else return `${supplier.code} - ${supplier.name}`;
  };

  get ccLoader() {
    return CCLoader;
  }

  ccView = (cc) => {
    return `${cc.RO_Number}`;
  };

  ccChanged(newValue, oldValue) {
    var selectedCC = newValue;
    if (selectedCC) {
      this.data.roNo = selectedCC.RO_Number;
      this.data.costCalculationId = selectedCC.Id;
      this.data.article = selectedCC.Article;
      //inject CC id for Filter Item
      this.options.CostCalculationId = this.data.costCalculationId;
    }
    this.data.items = [];
    this.resetErrorItems();
  }

  resetErrorItems() {
    if (this.error) {
      if (this.error.items) {
        this.error.items = [];
      }
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
