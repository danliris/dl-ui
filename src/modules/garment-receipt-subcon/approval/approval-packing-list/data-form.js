import {
  inject,
  bindable,
  containerless,
  computedFrom,
  BindingEngine,
} from "aurelia-framework";
import { Service } from "./service";

@inject(Service)
export class DataForm {
  @bindable readOnly = false;
  @bindable title;
  @bindable selectedLocalNote;
  @bindable itemOptions = {};
  @bindable supplier;

  constructor(service) {
    this.service = service;
  }

  formOptions = {
    cancelText: "Back",
  };

  controlOptions = {
    label: {
      length: 3,
    },
    control: {
      length: 5,
    },
  };

  footerOptions = {
    label: {
      length: 3,
    },
    control: {
      length: 2,
    },
  };

  itemsColumns = [
    // { header: "Jenis RO" },
    { header: "Packing Out No" },
    { header: "RONo" },
    { header: "SC No" },
    { header: "Buyer Brand" },
    { header: "Total Qty PackOut" },
    { header: "Komoditi Description" },
    { header: "Qty" },
    { header: "Satuan" },
    { header: "Price RO" },
    { header: "Mata Uang" },
    { header: "Amount" },
    { header: "Unit" },
    { header: "" },
  ];

  measureColumns = [
    { header: "No", value: "MeasurementIndex" },
    { header: "Length" },
    { header: "Width" },
    { header: "Height" },
    { header: "Qty Cartons" },
    { header: "CBM" },
  ];

  LocalNoteView = (no) => {
    return `${no.noteNo}`;
  };

  supplierView = (buyer) => {
    var buyerName = buyer.Name || buyer.name;
    var buyerCode = buyer.Code || buyer.code;
    return `${buyerCode} - ${buyerName}`;
  };

  transactionTypeView = (type) => {
    return `${type.code} - ${type.name}`;
  };

  async bind(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;

    this.itemOptions = {
      isCreate: this.context.isCreate,
      isView: this.context.isView,
      isEdit: this.context.isEdit,
      checkedAll: this.context.isCreate == true ? false : true,
      header: this.data,
    };

    if (this.data.items && this.data.id) {
      for (var item of this.data.items) {
      }
    }
  }
}
