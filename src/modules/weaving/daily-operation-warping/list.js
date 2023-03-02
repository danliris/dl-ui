import {
  inject
} from "aurelia-framework";
import {
  Service
} from "./service";
import {
  Router
} from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  tableOptions = {
    search: true,
    showToggle: false,
    showColumns: false,
    pagination: true,
    sortable: true
  };

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

 // context = ["detail"];

  columns = [{
      field: "MCNo",
      title: "MC No"
    }, {
      field: "Name",
      title: "Nama"
    },
    {
      field: "Group",
      title: "Group"
    },
    {
      field: "YearPeriode",
      title: "Tahun"
    },
    {
      field: "CreatedDate",
      title: "Tanggal Update"
    }
  ];

  loader = (info) => {
    var order = {};
    if (info.sort) order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    }

    return this.service.search(arg).then(result => {
      if (result.data && result.data.length > 0) {
        console.log(result);
        return {
          total: result.info.total,
          data: result.data
        };
      } else {
        return {
          total: 0,
          data: {}
        };
      }
    });
  }

  // contextCallback(event) {
  //   var arg = event.detail;
  //   var data = arg.data;
  //   switch (arg.name) {
  //     case "detail":
  //       this.router.navigateToRoute("update", {
  //         Id: data.Id
  //       });
  //       break;
  //   }
  // }

  // create() {
  //   this.router.navigateToRoute("create");
  // }
  upload() {
    this.router.navigateToRoute("upload");
  }
}
