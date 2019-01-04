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
    { field: "fabricSpecificationId", title: "Konstruksi" },
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
        "fabricSpecificationId",
        "composition"
      ],
      order: order
    };

    return this.service.search(arg).then(result => {
      return {
        total: result.info.total,
        data: result.data
      };
    });

    // return {
    //   total: 2,
    //   // total: result.info.total,
    //   data: [
    //     {
    //       sopNo: "1",
    //       tglsp: new Date(),
    //       unit: "Weaving 1",
    //       konstruksi: "CD 133 73 63 RfRf Rf AB B",
    //       blended: {
    //         poly: "60%",
    //         cotton: "30%",
    //         lainnya: "10%"
    //       }
    //     },
    //     {
    //       sopNo: "2",
    //       tglsp: new Date(),
    //       unit: "Weaving 2",
    //       konstruksi: "CD 132 73 63 RfRf Rf A B",
    //       blended: {
    //         poly: "60%",
    //         cotton: "30%",
    //         lainnya: "10%"
    //       }
    //     }
    //   ]
    // };

    // return this.service.search(arg)
    //   .then(result => {
    //     return {
    //       total: result.info.total,
    //       data: result.data
    //     }
    //     // .catch(error=>{
    //     //     console.log(error);
    //     // })
    //   });
  }

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
        this.router.navigateToRoute("view", { id: data._id });
        break;
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }
}
