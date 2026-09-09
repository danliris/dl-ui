import { inject, bindable } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";
import { Base64Helper } from '../../../utils/base-64-coded-helper';

@inject(Router, Service)
export class List {
  @bindable storage;



  context = ["Update Racking", "Kartu Stelling", "Cetak Barcode"];

  columns = [
    { field: "NoPackage", title: "No Package" },
    { field: "ProductCode", title: "Kode Barang" },
    { field: "POSerialNumber", title: "Nomor PO" },
    { field: "RONoMaster", title: "Nomor RO" },
    { field: "UnitName", title: "Nama Unit" },
    { field: "ProductName", title: "Nama Barang" },
    { field: "RemainingQuantity", title: "Quantity", align: "right" },
    { field: "SmallUomUnit", title: "Satuan" },
    { field: "Colour", title: "Warna" },
    { field: "Lot", title: "Lot" },
    { field: "Batch",title: "Batch",
      formatter: value =>
        value
          ? moment.parseZone(value).utcOffset(7).format("YYYY-MM-DD")
          : "-"
    },
    { field: "HandlingUnit", title: "Handling Unit" },
    { field: "Rack", title: "Rak" },
    { field: "Level", title: "Level" },
    { field: "Box", title: "Box" },
    { field: "Area", title: "Area" },
  ];

  @bindable UnitItem;
  UnitItems = [
    "",
    "KONFEKSI 2A",
    "KONFEKSI 2B",
    "KONFEKSI 2C",
    "KONFEKSI 1A",
    "KONFEKSI 1B",
  ];
  rackOptions = [
    "",
    "-",
    "R01",
    "R02",
    "R03",
    "R04",
    "R05",
    "R06",
    "R07",
    "R08",
    "R09",
    "R10",
    "R11",
    "R12",
    "R13",
    "R14",
    "R15",
    "R16",
    "R17",
    "R18",
    "R19",
    "R20",
    "R21",
    "R22",
    "R23",
    "R24",
    "R25",
    "R26",
    "R27",
    "R28",
    "R29",
    "R30",
    "R31",
    "R32",
    "R33",
    "R34",
    "R35",
    "R36",
    "R37",
    "R38",
    "R39",
    "R40",
    "R41",
    "R42",
  ];
  storageOptions  = ["GUDANG BAHAN BAKU", "GUDANG INTERLINING","GUDANG ACCESSORIES", "GUDANG EMBALASE"];

  constructor(router, service) {
    this.service = service;
    this.router = router;
    this.error = {};
  }

  tableOptions = {
    showColumns: false,
    search: false,
    showToggle: false,
    sortable: false,
  };


  loader = (info) => {

  if (!this.flag) {
      return { data: [] };
    }

    let params = {
      po: this.po ? this.po : "",
      rack: this.rack ? this.rack : "",
      productcode: this.code ? this.code : "",
      storage: this.storage
    };

    return this.service.search(params).then((result) => {
      return {
        data: result.data
      };
    });
  };

  search() {
    this.error = {};
    this.flag = true;
    this.tableList.refresh();
  }

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    const encoded = Base64Helper.encode(data.Id);
    switch (arg.name) {
      case "Update Racking":
        if (data.RemainingQuantity > 0) {
          this.router.navigateToRoute("edit", { id: encoded });
        } else {
          alert("Maaf, Quantity 0 hanya bisa melihat Kartu Stelling");
        }
        break;
      case "Kartu Stelling":
        this.router.navigateToRoute("stelling", { id: encoded });
        break;
      case "Cetak Barcode":
        this.service
          .getBarcodeById(data.Id)
          .then((result) => {})
          .catch((e) => {});
        break;
    }
  }

  UnitItemChanged(newvalue) {
    if (newvalue) {
      this.rack = newvalue;
    } else {
      this.rack = null;
    }
  }

  ExportToExcel() {
  this.error = {};

  let args = {
    po: this.po ? this.po : "",
    rack: this.rack ? this.rack : "",
    productcode: this.code ? this.code : "",
    storage: this.storage
  };

  this.service.generateExcel(args);
}

  reset() {
  this.po = null;
  this.rack = null;
  this.code = null;
  this.data = [];
  this.flag = false;

  this.tableList.refresh();
}


}
