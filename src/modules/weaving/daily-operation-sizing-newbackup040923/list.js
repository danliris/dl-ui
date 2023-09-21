import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  context = ["detail"];

  columns = [
    {
      field: "month",
      title: "Periode"
    },
    {
      field: "yearPeriode",
      title: "Tahun"
    },
    {
      field: "createdDate",
      title: "Tanggal Upload"
    }
  ];

  loader = info => {
    var order = {};
    if (info.sort) order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10),
      size: info.limit,
      keyword: info.search,
      order: order
    };

    return this.service.searchEstimatedProductions(arg).then(result => {
      //console.log(result.data);
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
        this.router.navigateToRoute("view", { month: data.month, yearPeriode : data.yearPeriode, page : "1" });
        break;
    }
  }

  upload() {
    this.router.navigateToRoute("upload");
  }
}
