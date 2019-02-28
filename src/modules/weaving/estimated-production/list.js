import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  context = ["detail"];

  columns = [
    { field: "estimationNumber", title: "No Estimasi Produksi" },
    {
      field: "dateEstimated",
      title: "Tanggal Estimasi Produksi",
      formatter: function(value, data, index) {
        return moment(value).format("DD MMM YYYY");
      }
    }
    // {
    //   field: "EstimationProducts",
    //   title: "No. Estimasi Produksi",
    //   formatter: function(value, data, index) {
    //     return value.OrderNumber;
    //   }
    // },
    // {
    //   field: "EstimationProducts",
    //   title: "Tanggal Estimasi Produksi",
    //   formatter: function(value, data, index) {
    //     return value.DateOrdered;
    //   }
    // }
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

    return this.service.searchEP(arg).then(result => {
      // console.log(result);
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
        this.router.navigateToRoute("view", { Id: data.Id });
        break;
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }
}
