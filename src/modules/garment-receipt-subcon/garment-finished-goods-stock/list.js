import { inject, bindable } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";
import { Base64Helper } from '../../../utils/base-64-coded-helper';


@inject(Router, Service)
export class List {
  //context = ["Update Racking", "Kartu Stelling", "Cetak Barcode"];
  context = ["Update Racking"];

  columns = [
    { field: "Comodity.Name", title: "Komoditi" },
    { field: "Article", title: "Artikel" },
    { field: "RONo", title: "Nomor RO" },
    { field: "Unit.Name", title: "Nama Unit" },
    { field: "Quantity", title: "Quantity", align: "right" },
    { field: "Uom.Unit", title: "Satuan" },
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
    const encoded = Base64Helper.encode(data.RONo);
    switch (arg.name) {
      case "Update Racking":
        if (data.Quantity > 0) {
          this.router.navigateToRoute("edit", { ro: encoded });
        } else {
          alert("Maaf, Quantity 0 hanya bisa melihat Kartu Stelling");
        }
        break;
      case "Kartu Stelling":
        this.router.navigateToRoute("stelling", { ro: encoded });
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
    let args = {
      ro: this.ro ? this.ro : "",
    };

    this.service.generateExcel(args);
  }

  reset() {
    this.ro = null;
    this.data = [];
    this.flag = false;
    this.tableList.refresh();
  }
}