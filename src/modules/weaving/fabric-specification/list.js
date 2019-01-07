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
    { field: "totalGr", title: "Total Gr" },
  ];

  loader = info => {
    var order = {};
    if (info.sort) order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      // select: ["", "", "", "", "", ""],
      order: order
    };

    return {
      total: 2,
      // total: result.info.total,
      data: [
        {
            // noMKB: 1,
            // konstruksi: "CD 133 72 63 Rf Rf B B",
            // kdBenang: "Rf RcRf",
            // kdLusi: "CD01",
            // jnsLusi: "CD17",
            // qtyLusi: 75.98293,
            // kdPakan: "CD03",
            // jnsPakan: "CD17",
            // qtyPakan: 65.98293,
            // totalBenang: 220.7084,
            // ketMKB: ""
            date: "02/01/2018",
            konstruksi: "000002 CD 133 72 63 Rf Rf B B",
            totalGr: "220.7084"
        },
        {
            // noMKB: 2,
            // konstruksi: "CD 133 71 64 Rf Rf A A",
            // kdBenang: "Rf RcRf",
            // kdLusi: "CD01",
            // jnsLusi: "CD17",
            // qtyLusi: 75.98293,
            // kdPakan: "CD03",
            // jnsPakan: "CD17",
            // qtyPakan: 65.98293,
            // totalBenang: 220.7084,
            // ketMKB: ""
            date: "02/02/2018",
            konstruksi: "000003 CD 133 71 64 Rf Rf A A",
            totalGr: "220.7084"
        }
      ]
    };

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
        this.router.navigateToRoute("view", { id: data.noMKB });
        // this.router.navigateToRoute('view', { id: data._id });
        break;
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }
}
