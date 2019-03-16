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
        field: "OrderNumber",
        title: "No. SPP",
        rowspan: "2",
        valign: "top",
        sortable: true
      },
      {
        field: "DateOrdered",
        title: "Tanggal SPP",
        rowspan: "2",
        valign: "top",
        formatter: function(value, data, index) {
          return moment(value).format("DD MMMM YYYY");
        },
        sortable: true
      },
      {
        field: "WeavingUnit",
        title: "Unit",
        rowspan: "2",
        valign: "top",
        formatter: function(value, data, index) {
          return value.Name;
        }
      },
      {
        field: "ConstructionNumber",
        title: "Konstruksi",
        rowspan: "2",
        valign: "top"
      },
      {
        title: "Komposisi Lusi (%)",
        colspan: "3",
        valign: "middle"
      },
      {
        title: "Komposisi Pakan (%)",
        colspan: "3",
        valign: "middle"
      }
    ],
    [
      {
        field: "WarpComposition",
        title: "Poly",
        valign: "middle",
        formatter: function(value, data, index) {
          return value.CompositionOfPoly;
        }
      },
      {
        field: "WarpComposition",
        title: "Cotton",
        valign: "middle",
        formatter: function(value, data, index) {
          return value.CompositionOfCotton;
        }
      },
      {
        field: "WarpComposition",
        title: "Lainnya",
        valign: "middle",
        formatter: function(value, data, index) {
          return value.OtherComposition;
        }
      },
      {
        field: "WeftComposition",
        title: "Poly",
        valign: "middle",
        formatter: function(value, data, index) {
          return value.CompositionOfPoly;
        }
      },
      {
        field: "WeftComposition",
        title: "Cotton",
        valign: "middle",
        formatter: function(value, data, index) {
          return value.CompositionOfCotton;
        }
      },
      {
        field: "WeftComposition",
        title: "Lainnya",
        valign: "middle",
        formatter: function(value, data, index) {
          return value.OtherComposition;
        }
      }
    ]
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
      if (result.data && result.data.length > 0) {
        let getUnitPromises = result.data.map(datum =>
          this.service.getUnitById(datum.WeavingUnit)
        );

        return Promise.all(getUnitPromises).then(units => {
          for (var datum of result.data) {
            let unit = units.find(
              unitResult => datum.WeavingUnit == unitResult.Id
            );
            datum.WeavingUnit = unit;
          }

          return {
            total: result.info.count,
            data: result.data
          };
        });
      }
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
