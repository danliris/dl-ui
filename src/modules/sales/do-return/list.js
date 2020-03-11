import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
var moment = require("moment");

@inject(Router, Service)
export class List {
  rowFormatter(data, index) {
    if (data.accepted) return { classes: "success" };
    else return {};
  }

  dataToBeCompleted = [];

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  bind() {
    this.setContext();
    this.setColumns();
  }

  setContext() {
    this.context = ["Detail", "Cetak DO Penjualan"];
  }

  setColumns() {
    this.columns = [
      { field: "DOSalesNo", title: "No. DO Penjualan" },
      {
        field: "DOSalesDate",
        title: "Tanggal",
        formatter: (value, data) => {
          return moment(value).format("DD-MMM-YYYY");
        }
      },
      { field: "BuyerName", title: "Buyer" },
      { field: "ProductionOrderNo", title: "No. SPP" },
      {
        field: "Accepted",
        title: "Diterima",
        formatter: function(value, row, index) {
          return value ? "SUDAH" : "BELUM";
        }
      }
    ];
  }

  loadData = info => {
    var order = {};
    if (info.sort) order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    };

    return this.service.search(arg).then(result => {
      return {
        total: result.info.total,
        data: result.data
      };
    });
  };

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Detail":
        this.router.navigateToRoute("view", { id: data.Id });
        break;
      case "Cetak DO Penjualan":
        this.service.getPdfById(data.Id);
        break;
    }
  }

  contextShowCallback(index, name, data) {
    switch (name) {
      case "Cetak DO Penjualan":
        return data;
      default:
        return true;
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }
}
