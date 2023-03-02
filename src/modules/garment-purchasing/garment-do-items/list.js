import {
  inject, bindable
} from 'aurelia-framework';
import {
  Service
} from "./service";
import {
  Router
} from 'aurelia-router';
import moment from 'moment';
// import { any } from 'bluebird';
// const CategoryLoader = require('../../../../loader/machine-category-loader');
// const MachineLoader = require('../../../../loader/machine-custom-loader');
// const MachineTypeLoader = require('../../../../loader/machine-custom-type-loader');
// const BrandLoader = require('../../../../loader/machine-brand-loader');

@inject(Router, Service)
export class List {
  context = ["Update Racking", "Kartu Stelling"];

  columns = [
    { field: "ProductCode", title: "Kode Barang" },
    { field: "POSerialNumber", title: "Nomor PO" },
    { field: "RO", title: "Nomor RO" },
    { field: "UnitName", title: "Nama Unit" },
    { field: "ProductName", title: "Nama Barang" },
    { field: "RemainingQuantity", title: "Quantity", align: "right" },
    { field: "SmallUomUnit", title: "Satuan" },
    { field: "Colour", title: "Warna" },
    { field: "Rack", title: "Rak" },
    { field: "Level", title: "Level" },
    { field: "Box", title: "Box" },
    { field: "Area", title: "Area" },
  ];

  @bindable UnitItem;
  UnitItems = ['', 'KONFEKSI 2A', 'KONFEKSI 2B', 'KONFEKSI 2C', 'KONFEKSI 1A', 'KONFEKSI 1B']

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }



  tableOptions = {
    showColumns: false,
    search: false,
    showToggle: false,
    sortable: false,
  };

  loader = (info) => {
    let params = {
      po: this.po ? this.po : "",
      unitcode: this.unit ? this.unit : "",
      productcode: this.code ? this.code : "",
    };

    return this.flag
      ? this.service.search(params).then((result) => {

        return {
          data: result.data
        };
      })
      : { data: [] };
  }

  search() {
    this.error = {};
    this.flag = true;
    this.tableList.refresh();
  }

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;

    switch (arg.name) {
      case "Update Racking":
        if (data.RemainingQuantity > 0) {
          this.router.navigateToRoute('edit', { id: data.Id });
        }
        else {
          alert("Maaf, Quantity 0 hanya bisa melihat Kartu Stelling");
        }
        break;
      case "Kartu Stelling":
        this.router.navigateToRoute('stelling', { id: data.Id });
        break;
    }
  }

  UnitItemChanged(newvalue) {

    if (newvalue) {
      if (newvalue === "KONFEKSI 2A") {
        this.unit = "C2A";
      }
      else if (newvalue === "KONFEKSI 2B") {
        this.unit = "C2B";
      }
      else if (newvalue === "KONFEKSI 2C") {
        this.unit = "C2C";
      } else if (newvalue === "KONFEKSI 1A") {
        this.unit = "C1A";
      } else if (newvalue === "KONFEKSI 1B") {
        this.unit = "C1B";
      } else {
        this.unit = "";
        this.unitname = "";
      }
    } else {
      this.unit = "";
      this.unitname = "";
    }
  }

  ExportToExcel() {
    let args = {
      po: this.po ? this.po : "",
      unitcode: this.unit ? this.unit : "",
      productcode: this.code ? this.code : "",
    };

    this.service.generateExcel(args);
  }

  reset() {
    this.po = null;
    this.unit = null;
    this.productcode = null;
    this.data = [];
    this.flag = false;
    this.tableList.refresh();
  }

}
