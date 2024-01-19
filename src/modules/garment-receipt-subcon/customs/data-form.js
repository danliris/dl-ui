import {
  inject,
  bindable,
  containerless,
  computedFrom,
  BindingEngine,
} from "aurelia-framework";
import { Service } from "./service";
var SupplierLoader = require("../../../loader/garment-supplier-loader");

@inject(Service)
export class DataForm {
  @bindable readOnly = false;
  @bindable isEdit = false;
  @bindable title;
  @bindable supplier;
  @bindable selectedCategory;

  constructor(service) {
    this.service = service;
  }

  controlOptions = {
    label: {
      length: 3,
    },
    control: {
      length: 5,
    },
  };

  bcTypeOptions = ["BC 41", "BC 27 OUT"];
  categoryOptions = ["JASA", "SISA"];

  async bind(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;

    this.options = {
      isCreate: this.context.isCreate,
      isEdit: this.context.isEdit,
      isView: this.context.isView,
    };
  }

  get supplierLoader() {
    return SupplierLoader;
  }

  supplierView = (buyer) => {
    var buyerName = buyer.Name || buyer.name;
    var buyerCode = buyer.Code || buyer.code;
    return `${buyerCode} - ${buyerName}`;
  };

  supplierChanged(newValue, oldValue) {
    var selectedSupplier = newValue;
    if (selectedSupplier) {
      if (selectedSupplier.Id) {
        this.data.productOwner = selectedSupplier;

        this.data.items.splice(0);
      }
    } else {
      this.data.buyer = {};
      // this.data.items.splice(0);
    }
  }

  selectedCategoryChanged(newValue) {
    var _selectedCategory = newValue;
    if (_selectedCategory) {
      this.data.category = _selectedCategory;
      this.data.items.splice(0);
    } else {
      this.data.category = "";
    }
  }

  itemsInfo = {
    columnsService: [
      { header: "Nota Jual Lokal" },
      { header: "Jumlah (PCS)" },
      { header: "Jumlah Kemasan" },
      { header: "Satuan Kemasan" },
    ],
    columnsLeftOver: [{ header: "No Bon Unit Keluar" }, { header: "" }],
    onAdd: function () {
      this.context.ItemsCollection.bind();
      this.data.items.push({
        productOwnerId: this.data.productOwner ? this.data.productOwner.Id : 0,
      });
    }.bind(this),
    onRemove: function () {
      return (event) => {
        this.error = null;
      };
    }.bind(this),
  };
}
