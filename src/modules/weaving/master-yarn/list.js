import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";

@inject(Router, Service)
export class List {
  context = ["detail"];
  columns = [
    { field: "code", title: "Kode Barang" },
    { field: "name", title: "Nama Barang" },
    {
      field: "coreUom",
      title: "Satuan Default",
      formatter: function(value, data, index) {
        return value.name;
      }
    },
    {
      field: "coreCurrency",
      title: "Mata Uang",
      formatter: function(value, data, index) {
        return value.name;
      }
    },
    { field: "price", title: "Harga Barang" }
  ];

  loader = info => {
    var order = {};
    if (info.sort) order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10),
      size: info.limit,
      keyword: "yarns",
      order: order
    };

    return this.service.search(arg).then(result => {
      return {
        total: result.info.total,
        data: result.data
      };
    });
  };

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute("view", { id: data.id });
        break;
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }
}
