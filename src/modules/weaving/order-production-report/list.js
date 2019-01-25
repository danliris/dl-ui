import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
var moment = require("moment");
var UnitLoader = require("../../../loader/unit-loader");

@inject(Router, Service)
export class List {

  data = {};
  tableOptions = {
    search: false,
    showToggle: false,
    showColumns: false,
    pagination: false
  };

  columns = [
    [
      { field: "spNumber", title: "No. SP", rowspan: "2", valign: "top" },
      { field: "spDate", title: "Tanggal SP", rowspan: "2", valign: "top" },
      {
        field: "construction",
        title: "Konstruksi",
        rowspan: "2",
        valign: "top"
      },
      { field: "yarnNumber", title: "No. Benang", rowspan: "2", valign: "top" },
      { title: "Blended (%)", colspan: "3", valign: "middle" },
      { title: "Estimasi Produksi", colspan: "4", valign: "middle" },
      { field: "total", title: "Total ALL", rowspan: "2", valign: "top" },
      { title: "Kebutuhan Benang", colspan: "3", valign: "middle" }
    ],
    [
      {
        field: "blendedPoly",
        title: "Poly",
        valign: "middle"
      },
      { field: "blendedCotton", title: "Cotton", valign: "middle" },
      { field: "blendedOthers", title: "Lainnya", valign: "middle" },
      { field: "epGradeA", title: "Grade A", valign: "middle" },
      { field: "epGradeB", title: "Grade B", valign: "middle" },
      { field: "epGradeC", title: "Grade C", valign: "middle" },
      { field: "epOthers", title: "Aval", valign: "middle" },
      { field: "yarnWeft", title: "Lusi", valign: "middle" },
      { field: "yarnWarp", title: "Pakan", valign: "middle" },
      { field: "yarnWhole", title: "Total", valign: "middle" }
    ]
  ];

  loader = info => {
    var order = {};
    if (info.sort) order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
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
      };
    });

    // return {
    //   total: 1,
    //   // data: result.data
    //   data: [
    //     {
    //       spNumber: "0515/00.2018",
    //       spDate: "01-10-18",
    //       construction: "PC OX 100 48 63 DhMz B AH",
    //       yarnNumber: "TC45XCM16",
    //       blendedPoly: "65 %",
    //       blendedCotton: "35 %",
    //       blendedOthers: "100 %",
    //       epGradeA: 42500,
    //       epGradeB: 5000,
    //       epGradeC: 1500,
    //       epOthers: 1000,
    //       total: 50000,
    //       yarnWeft: 26.9,
    //       yarnWarp: 36.97,
    //       yarnWhole: 63.87
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

  // contextClickCallback(event) {
  //   let arg = event.detail;
  //   let data = arg.data;

  //   switch (arg.name) {
  //     case "print PDF":
  //       this.service.getPdfById(data.Id);
  //       break;
  //   }
  // }

  getYear(now) {
    var year = moment(now).format("YYYY");
    return year;
  }

  getMonth(now) {
    var month = moment(now).format("MMMM");
    return month;
  }

  get units() {
    return UnitLoader;
  }

  printPdf() {
    var month = this.getMonth(this.data);
    // console.log(month);
    var year = this.getYear(this.data);
    // console.log(year);
    this.service.getPdfByPeriod(this.data.unit._id, month, year);
  }

  // upload() {
  //     this.router.navigateToRoute('upload');
  // }

  //   create() {
  //     this.router.navigateToRoute("create");
  //   }
}
