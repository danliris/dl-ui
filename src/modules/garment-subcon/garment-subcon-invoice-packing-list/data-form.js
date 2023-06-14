import {
  bindable,
  inject,
  computedFrom,
  BindingEngine,
} from "aurelia-framework";
import { Service, CoreService } from "./service";

var BuyerLoader = require("../../../loader/garment-buyers-loader");
const SupplierLoader = require("../../../loader/garment-supplier-loader");
const ContractLoader = require("../../../loader/garment-subcon-contract-loader");
const UomLoader = require("../../../loader/uom-loader");

@inject(Service, BindingEngine, CoreService)
export class DataForm {
  @bindable readOnly = false;
  @bindable isCreate = false;
  @bindable isEdit = false;
  @bindable isView;
  @bindable title;
  @bindable data = {};
  @bindable selecteBCType;
  @bindable selectedContract;
  @bindable selectedSupplier;
  @bindable Supplier;
  @bindable selectedTypePO;

  BCType = ["", "BC 2.6.2", "BC 2.6.1", "BC 2.7 IN", "BC 2.7 OUT"];
  constructor(service, bindingEngine, CoreService) {
    this.service = service;
    this.bindingEngine = bindingEngine;
    this.CoreService = CoreService;
  }

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  };

  columns = [
    "No SJ",
    "Tanggal SJ",
    "Jumlah",
    "Perhitungan NW",
    "Perhitungan GW",
    "Harga Satuan",
    "Harga Total",
  ];

  columnsIN = [
    "No SJ",
    "Tanggal SJ",
    "Barang",
    "Qty",
    "Satuan",
    "Harga Satuan",
    "Harga Total",
  ];

  controlOptions = {
    label: {
      length: 5,
    },
    control: {
      length: 7,
    },
  };

  poTypeSelection = [
    { id: 1, label: "TANPA PO", value: "TANPA PO" },
    { id: 2, label: "DENGAN PO", value: "DENGAN PO" },
  ];

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.itemOptions = {
      datas: this.data,
      selectedContract: this.data.ContractNo,
      isCreate: this.context.isCreate,
      isView: this.context.isView,
      checkedAll: this.context.isCreate == true ? false : true,
      isEdit: this.isEdit,
    };

    if (this.data.Id) {
      this.data.ContractNo = this.selectedContract;
      this.selecteBCType = this.data.BCType;
      this.selectedContract = this.data.ContractNo;
      this.selectedSupplier = this.data.Supplier;
      this.selectedTypePO = this.data.POType;
    }
    this.error = this.context.error;

    this.data.isEdit = this.isEdit;
  }

  supplierView = (supplier) => {
    var code = supplier.code || supplier.Code;
    var name = supplier.name || supplier.Name;
    return `${code} - ${name}`;
  };

  get supplierLoader() {
    return SupplierLoader;
  }

  Supplier = null;
  selectedSupplierChanged(newValue) {
    var selectedSupplier = newValue;
    if (newValue) {
      this.Supplier = selectedSupplier;

      this.data.Supplier = this.Supplier;
    }
  }

  get contractLoader() {
    return ContractLoader;
  }

  contractView = (contract) => {
    return `${contract.ContractNo}`;
  };

  selecteBCTypeChanged(newValue) {
    if (this.data.BCType != newValue) {
      this.data.BCType = newValue;
    }
  }

  async selectedContractChanged(newValue) {
    var selectedContract = newValue;

    if (newValue && !this.data.Id) {
      this.data.Items.splice(0);
      this.data.ContractNo = selectedContract.ContractNo;
      this.data.SubconContractId = selectedContract.Id;
      this.data.CIF = newValue.CIF;
      this.data.BuyerStaff = newValue.CreatedBy;
      this.data.NW = newValue.NettWeight;
      this.data.GW = newValue.GrossWeight;
      var suppliers = await this.CoreService.GetGarmentSupplier({
        size: 1,
        keyword: "",
        filter: JSON.stringify({ Code: newValue.Supplier.Code }),
      });
      this.Supplier = suppliers.data[0];
      this.data.Supplier = this.Supplier;
      this.data.Items.push({ Supplier: this.data.Supplier });
    }
  }

  selectedTypePOChanged(e) {
    let type = e.detail ? e.detail : "";
    if (type && !this.data.Id) {
      this.data.POType = type == "TANPA PO" ? type : "DENGAN PO";
      this.data.Items.splice(0);
      this.data.Items.push({ Supplier: this.data.Supplier });
    }
  }

  get addItems() {
    return (event) => {
      this.data.Items.push({ Supplier: this.data.Supplier });
    };
  }

  get removeItems() {
    return (event) => {
      this.error = null;
    };
  }
}
