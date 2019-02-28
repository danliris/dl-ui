import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  context = ["detail"];

  columns = [
    { field: "runningMachineNumber", title: "No. Mesin" },
    { field: "area", title: "Area" },
    { field: "block", title: "Blok" },
    { field: "kaizenBlock", title: "Blok Kaizen" },
    { field: "maintenance", title: "Maintenance" },
    { field: "operator", title: "Operator" }
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

    //   return this.service.search(arg).then(result => {
    //     return {
    //       total: result.info.total,
    //       data: result.data
    //     };
    //     // .catch(error=>{
    //     //     console.log(error);
    //     // })
    //   });
    // };

    return {
      total: 1,
      data: [
        {
          Id: 1,
          runningMachineNumber: "1/2",
          area: "Area 1",
          block: "Blok 2",
          kaizenBlock: "Blok 4",
          maintenance: "ABC",
          operator: "DEF"
        }
      ]
    };
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
