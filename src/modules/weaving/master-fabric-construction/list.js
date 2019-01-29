import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  context = ["detail"];

  columns = [
    // { field: "noMKB", title: "No Konstruksi" },
    // { field: "konstruksi", title: "Konstruksi" },
    // { field: "kdBenang", title: "Kode Benang" },
    // { field: "kdLusi", title: "Kode Lusi" },
    // { field: "jnsLusi", title: "Jenis Lusi" },
    // { field: "qtyLusi", title: "Qty(Gr/Mtr)" },
    // { field: "kdPakan", title: "Kode Pakan" },
    // { field: "jnsPakan", title: "Jenis Pakan" },
    // { field: "qtyPakan", title: "Qty(Gr/Mtr)" },
    // { field: "totalBenang", title: "Total(Gr)" },
    // { field: "ketMKB", title: "Keterangan" }
    { field: "date", title: "Date" },
    { field: "konstruksi", title: "Konstruksi" },
    { field: "totalGr", title: "Total Gr" }
  ];

  loader = info => {
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
      // .catch(error=>{
      //     console.log(error);
      // })
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
