import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service } from "./service";

const SubconContractLoader = require("../../../loader/garment-subcon-contract-loader");

@inject(Service)
export class DataForm {
  @bindable readOnly = false;
  @bindable isCreate = false;
  @bindable isView = false;
  @bindable isEdit = false;
  @bindable title;
  @bindable data = {};
  @bindable itemOptions = {};
  @bindable selectedSubconType;
  @bindable selectedSubconContract;
  @bindable selectedSupplier;

  constructor(service) {
    this.service = service;
  }

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  };
  bcTypes = ["2.6.2", "2.7 - In"];
  subconTypes = ["SUBCON BAHAN BAKU", "SUBCON CUTTING", "SUBCON JASA"];
  controlOptions = {
    label: {
      length: 2,
    },
    control: {
      length: 5,
    },
  };

  itemsInfo = {
    columns: ["Supplier", "No SJ Masuk", "Jumlah", ""],
  };

  @computedFrom("data.SubconType")
  get contractFilter() {
    return {
      ContractType: this.data.SubconType,
    };
  }

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.itemOptions = {
      isCreate: this.context.isCreate,
      isView: this.context.isView,
      checkedAll: this.context.isCreate == true ? false : true,
      isEdit: this.isEdit,
    };

    if (this.data && this.data.Id) {
      this.selectedSubconType = this.data.SubconType;
      this.selectedSubconContract = {
        Supplier: this.data.Supplier,
        Id: this.data.SubconContractId,
        ContractNo: this.data.SubconContractNo,
      };
    }
  }

  get subconContractLoader() {
    return SubconContractLoader;
  }

  selectedSubconTypeChanged(newValue, oldValue) {
    if (newValue != this.data.SubconType) {
      this.data.SubconType = newValue;
      this.selectedSubconContract = null;
      this.selectedSupplier = null;
    }
  }

  selectedSubconContractChanged(newValue) {
    if (newValue) {
      this.data.Supplier = newValue.Supplier;
      this.data.SubconContractId = newValue.Id;
      this.data.SubconContractNo = newValue.ContractNo;
      this.selectedSupplier =
        newValue.Supplier.Code + " - " + newValue.Supplier.Name;
    }
  }

  get addItems() {
    return (event) => {
      this.data.Items.push({});
    };
  }

  get removeItems() {
    return (event) => {
      this.error = null;
    };
  }

  get totalQuantity() {
    return this.data.Items.reduce((acc, cur) => (acc += cur.Quantity), 0);
  }
}