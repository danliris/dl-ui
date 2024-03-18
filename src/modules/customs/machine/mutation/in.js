import { inject, bindable, computedFrom } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
const BrandLoader = require("../../../../loader/machine-brand-loader");
const CategoryLoader = require("../../../../loader/machine-category-loader");
const SuppierLoader = require("../../../../loader/garment-supplier-loader");

@inject(Router, Service)
export class In {
  hasCancel = true;
  hasSave = true;
  hasView = false;
  hasCreate = true;
  hasEdit = false;

  @bindable title;
  @bindable readOnly;
  @bindable SupItem;
  @bindable KlasItem;
  @bindable category;
  @bindable brand;
  @bindable supplier;
  @bindable type;
  @bindable bcno;

  SupItems = ["", "LOKAL", "IMPORT"];
  KlasItems = ["", "Machine", "Tools"];
  typeItems = ["PEMBELIAN", "PEMINJAMAN"];

  constructor(router, service) {
    this.service = service;
    this.router = router;

    this.formOptions = {
      cancelText: "Kembali",
      saveText: "Simpan",
    };
  }

  controlOptions = {
    label: {
      align: "left",
      length: 4,
    },
    control: {
      length: 5,
      align: "right",
    },
  };

  get categoryLoader() {
    return CategoryLoader;
  }

  get brandLoader() {
    return BrandLoader;
  }

  get supplierLoader() {
    return SuppierLoader;
  }

  categoryView = (cat) => {
    return `${cat.CategoryName}`;
  };

  brandView = (brand) => {
    return `${brand.BrandName}`;
  };

  supplierView = (supplier) => {
    if (!supplier.code) return `${supplier.Code} - ${supplier.Name}`;
    else return `${supplier.code} - ${supplier.name}`;
  };

  SupItemChanged(newvalue) {
    if (newvalue) {
      if (newvalue === "LOKAL") {
        this.data.SupplierType = "LOKAL";
      } else if (newvalue === "IMPORT") {
        this.data.SupplierType = "IMPORT";
      } else {
        this.data.SupplierType = "-";
      }
    } else {
      this.data.SupplierType = "-";
    }
  }

  typeChanged(newvalue) {
    if (newvalue) {
      this.data.Type = newvalue;
      this.supplier = null;
      this.data.Buyer = {};
      this.data.BCNumber = "";
      this.brand = null;
      this.category = null;
      this.data.MachineCategory = "";
      this.data.MachineBrand = "";
      this.data.IDNumber = "";
      this.KlasItem = "";
      this.data.MachineType = "";
      this.data.UnitQuantity = "";
      this.data.PurchaseYear = "";
      this.data.SupplierType = "";
      this.data.MachineID = "";
    }
  }

  KlasItemChanged(newvalue) {
    if (newvalue) {
      if (newvalue === "Machine") {
        this.data.Classification = "Machine";
      } else if (newvalue === "Tools") {
        this.data.Classification = "Tools";
      } else {
        this.data.Classification = "-";
      }
    } else {
      this.data.Classification = "-";
    }
  }

  categoryChanged(newValue) {
    if (newValue) {
      this.data.MachineCategory = newValue.CategoryName;
    }
  }

  brandChanged(newValue) {
    if (newValue) {
      this.data.MachineBrand = newValue.BrandName;
    }
  }

  supplierChanged(newValue, oldValue) {
    var selectedSupplier = newValue;
    if (selectedSupplier) {
      if (selectedSupplier.Id) {
        this.data.Buyer = selectedSupplier;
      }
    } else {
      this.data.Buyer = {};
    }
  }

  save(event) {
    this.data.TransactionType = "IN";
    this.service
      .createIN(this.data)
      .then((result) => {
        alert("Data berhasil dibuat");
        this.router.navigateToRoute("list");
      })
      .catch((e) => {
        this.error = e;
      });
  }

  cancel(event) {
    this.router.navigateToRoute("list");
  }

  bind(context) {
    this.context = context;
    this.data = {
      items: [],
    };
    this.error = {};
    this.cancelCallback = this.context.cancelCallback;
    // this.deleteCallback = this.context.deleteCallback;
    // this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  bcOutView = (bc) => {
    return `${bc.BCOutNumber} - ${bc.PurchaseYear}`;
  };

  get getBCNo() {
    return (keyword) => {
      var info = {
        bcNo: keyword,
      };
      return this.service.MutationByBCNo(info).then((result) => {
        var bcList = [];
        for (var a of result.data) {
          if (a.TransactionType == "OUT") {
            if (bcList.length == 0) {
              bcList.push(a);
            } else {
              var dup = bcList.find((d) => d.BCOutNumber == a.BCOutNumber);
              if (!dup) {
                bcList.push(a);
              }
            }
          }
        }
        return bcList;
      });
    };
  }

  async bcnoChanged(newValue, oldValue) {
    var selectedSupplier = newValue;
    if (selectedSupplier) {
      let qtyReturn = 0;
      Promise.resolve(
        this.service.MutationByBCNo({ machineId: newValue.MachineID })
      ).then((result) => {
        result.data.forEach((element) => {
          if (element.TransactionType == "IN") {
            qtyReturn += element.QtyOut;
          }
        });

        this.data.QtyOut = newValue.QtyOut - qtyReturn;
      });

      this.supplier = newValue.Buyer;
      this.data.Buyer = newValue.Buyer;
      this.data.BCNumber = newValue.BCNumber;
      this.brand = newValue.MachineBrand;
      this.category = newValue.MachineCategory;
      this.data.MachineCategory = newValue.MachineCategory;
      this.data.MachineBrand = newValue.MachineBrand;

      this.data.IDNumber = newValue.IDNumber;
      this.KlasItem = newValue.Classification;

      this.data.MachineType = newValue.MachineType;

      this.data.UnitQuantity = newValue.UnitQuantity;
      this.data.PurchaseYear = newValue.PurchaseYear;
      this.data.SupplierType = newValue.SupplierType;
      this.data.MachineID = newValue.MachineID;
    } else {
      this.data.Buyer = {};
    }
  }
}
