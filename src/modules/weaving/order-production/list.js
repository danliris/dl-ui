import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  context = ["detail"];

  columns = [
    [
      {
        field: "orderNumber",
        title: "No. SP",
        rowspan: "2",
        valign: "top",
        sortable: true
      },
      {
        field: "dateOrdered",
        title: "Tanggal SP",
        rowspan: "2",
        valign: "top",
        formatter: function(value, data, index) {
          return moment(value).format("DD MMMM YYYY");
        },
        sortable: true
      },
      {
        field: "weavingUnit",
        title: "Unit",
        rowspan: "2",
        valign: "top",
        formatter: function(value, data, index) {
          return value.name;
        }
      },
      {
        field: "constructionNumber",
        title: "Konstruksi",
        rowspan: "2",
        valign: "top"
      },
      {
        title: "Blended (%)",
        colspan: "3",
        valign: "middle"
      }
    ],
    [
      {
        field: "composition",
        title: "Poly",
        valign: "middle",
        formatter: function(value, data, index) {
          return value.compositionOfPoly;
        }
      },
      {
        field: "composition",
        title: "Cotton",
        valign: "middle",
        formatter: function(value, data, index) {
          return value.compositionOfCotton;
        }
      },
      {
        field: "composition",
        title: "Lainnya",
        valign: "middle",
        formatter: function(value, data, index) {
          return value.otherComposition;
        }
      }
    ]
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
