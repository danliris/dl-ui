import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  context = ["detail"];

  columns = [
    { field: "orderNumber", title: "No Estimasi Produksi" },
    {
      field: "dateOrdered",
      title: "Tanggal Estimasi Produksi",
      formatter: function(value, data, index) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    {
      field: "orderTotal",
      title: "Jumlah Order (Gr)",
      formatter: function(value, data, index) {
        return value.name;
      }
    }
  ];

  loader = info => {
    var order = {};
    if (info.sort) order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
    //   select: [
    //     "",
    //     "",
    //     "",
    //     "",
    //     ""
    //   ],
      order: order
    };

    return{
        total:1,
        data:[{
            orderNumber:1,
            dateOrdered:new Date(),
            orderTotal: {
                name: 3500
            }
        }]
    };

    // return this.service.search(arg).then(result => {
    //   console.log(result);
    //   return {
    //     total: result.info.count,
    //     data: result.data
    //   };
    // });
  };

  constructor(router, service) {
    this.service = service;
    this.router = router;
    // this.orderId = "";
    // this.orders = [];
  }

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute("view", { id: data.orderNumber });
        break;
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }
}
