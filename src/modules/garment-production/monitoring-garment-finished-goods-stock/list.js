import { inject, bindable } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";
import { Base64Helper } from '../../../utils/base-64-coded-helper';


@inject(Router, Service)
export class List {

  columns = [
    { field: "Comodity.Name", title: "Komoditi" },
    { field: "Article", title: "Artikel" },
    { field: "RONo", title: "Nomor RO" },
    { field: "Unit.Name", title: "Nama Unit" },
    { field: "Size.Size", title: "Size" },
    { field: "Colour", title: "Warna" },
    { field: "Quantity", title: "Quantity", align: "right" },
    { field: "Uom.Unit", title: "Satuan" },
    { field: "Box", title: "Box" },
    { field: "Rack", title: "Rak" },
  ];

  rackOptions = [
    "",
    "-",
    "R1",
    "R2",
    "R3",
    "R4",
    "R5",
    "R6",
    "R7",
    "R8",
    "R9",
    "R10",
    "R13",
    "R14",
    "R15",
    "R16",
    "R17",
    "R18",
    "R19",
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
      ro: this.ro ? this.ro : "",
      rack: this.rack ? this.rack : "",
    };

    return this.flag
      ? this.service.search(params).then((result) => {
          return {
            data: result.data,
          };
        })
      : { data: [] };
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
  }

  UnitItemChanged(newvalue) {
    if (newvalue) {
      this.rack = newvalue;
    } else {
      this.rack = null;
    }
  }

  ExportToExcel() {
    let args = {
      ro: this.ro ? this.ro : "",
      rack: this.rack ? this.rack : "",
    };

    this.service.generateExcel(args);
  }

  reset() {
    this.ro = null;
    this.rack = null;
    this.data = [];
    this.flag = false;
    this.tableList.refresh();
  }
}