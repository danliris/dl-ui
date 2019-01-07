import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  context = ["detail"];

  columns = [
    { field: "orderNumber", title: "No SOP" },
    {
      field: "dateOrdered",
      title: "Tanggal SOP",
      formatter: function(value, data, index) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    {
      field: "weavingUnit",
      title: "Unit",
      formatter: function(value, data, index) {
        return value.name;
      }
    },
    {
      field: "fabricSpecification",
      title: "Konstruksi",
      formatter: function(value, data, index) {
        return value.constructionNumber;
      }
    },
    {
      field: "composition",
      title: "Blended (%)",
      formatter: function(value, data, index) {
        return (
          value.compositionOfPoly +
          " " +
          value.compositionOfCotton +
          " " +
          value.otherComposition
        );
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
      select: [
        "orderNumber",
        "dateOrdered",
        "weavingUnit",
        "fabricSpecification",
        "composition"
      ],
      order: order
    };

    return this.service.search(arg).then(result => {
      console.log(result);
      return {
        total: result.info.count,
        data: result.data
      };
    });
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
        this.router.navigateToRoute("view", { id: data.id });
        break;
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }
}
