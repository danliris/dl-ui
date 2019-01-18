import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";

@inject(Router, Service)
export class List {
  context = ["detail"];
  columns = [
    { field: "yarnCode", title: "Kode Barang" },
    { field: "yarnName", title: "Nama Barang" },
    { field: "yarnUnit", title: "Satuan Default" },
    { field: "yarnCurrencyCode", title: "Mata Uang" },
    { field: "yarnPrice", title: "Harga Barang" }
  ];

  loader = info => {
    var order = {};
    if (info.sort) order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: "yarn-weaving",
      //   select: [
      //     "yarnCode",
      //     "yarnName",
      //     "yarnUnit",
      //     "yarnCurrencyCode",
      //     "yarnPrice"
      //   ],
      order: order
    };

    return this.service.search(arg).then(result => {
      return {
        total: result.info.total,
        data: result.data
        // data: [
        //   {
        //     id: 1,
        //     yarnCode: "PC45",
        //     yarnName: "Cotton",
        //     yarnUnit: "Bale",
        //     yarnCurrencyCode: "IDR",
        //     yarnPrice: 70000
        //   },
        //   {
        //     id: 2,
        //     yarnCode: "PC21",
        //     yarnName: "Poly",
        //     yarnUnit: "Bale",
        //     yarnCurrencyCode: "IDR",
        //     yarnPrice: 120000
        //   }
        // ]
      };
    });

    // return {
    //   total: 2,
    //   // data: result.data
    //   data: [
    //     {
    //       id: 1,
    //       yarnCode: "01",
    //       yarnName: "PC45",
    //       yarnUnit: "Bale",
    //       yarnCurrencyCode: "IDR",
    //       yarnPrice: 70000
    //     },
    //     {
    //       id: 2,
    //       yarnCode: "02",
    //       yarnName: "PC21",
    //       yarnUnit: "Bale",
    //       yarnCurrencyCode: "IDR",
    //       yarnPrice: 120000
    //     }
    //   ]
    // };
  };

  constructor(router, service) {
    this.service = service;
    this.router = router;
    // this.accessoriesId = "";
    // this.accessories = [];
  }

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute("view", { id: data.yarnCode });
        break;
    }
  }

  // upload() {
  //     this.router.navigateToRoute('upload');
  // }

  create() {
    this.router.navigateToRoute("create");
  }
}
