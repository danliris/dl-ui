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

  // loader = info => {
  //   var order = {};
  //   if (info.sort) order[info.sort] = info.order;

  //   var arg = {
  //     page: parseInt(info.offset / info.limit, 10) + 1,
  //     size: info.limit,
  //     order: order
  //   };

  //   return this.service.search(arg).then(result => {
  //     return {
  //       total: result.info.total,
  //       data: result.data
  //     };
  //   });
  // };

  constructor(router, service) {
    this.service = service;
    this.router = router;
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
    console.log(this.data);
    this.service.getPdfByPeriod(this.data.unit._id, month, year);
  }

  searchOrderProductions(){
    
  }
}
