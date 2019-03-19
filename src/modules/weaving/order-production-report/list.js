import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
var moment = require("moment");
var UnitLoader = require("../../../loader/unit-loader");

@inject(Router, Service)
export class List {
  // @bindable loader;
  data = {};
  tableOptions = {
    search: false,
    showToggle: false,
    showColumns: false,
    pagination: false
  };

  columns = [
    [
      { field: "OrderNumber", title: "No. SPP", rowspan: "2", valign: "top" },
      {
        field: "DateOrdered",
        title: "Tanggal SP",
        rowspan: "2",
        valign: "top"
      },
      {
        field: "ConstructionNumber",
        title: "Konstruksi",
        rowspan: "2",
        valign: "top"
      },
      { field: "YarnNumber", title: "No. Benang", rowspan: "2", valign: "top" },
      { title: "Komposisi Lusi (%)", colspan: "3", valign: "middle" },
      { title: "Komposisi Pakan (%)", colspan: "3", valign: "middle" },
      { title: "Estimasi Produksi", colspan: "4", valign: "middle" },
      {
        field: "OrderProduction.WholeGrade",
        title: "Total Gram",
        rowspan: "2",
        valign: "top"
      },
      { title: "Kebutuhan Benang", colspan: "3", valign: "middle" }
    ],
    [
      {
        field: "OrderProduction.WarpComposition.CompositionOfPoly",
        title: "Poly",
        valign: "middle"
      },
      {
        field: "OrderProduction.WarpComposition.CompositionOfCotton",
        title: "Cotton",
        valign: "middle"
      },
      {
        field: "OrderProduction.WarpComposition.OtherComposition",
        title: "Lainnya",
        valign: "middle"
      },
      {
        field: "OrderProduction.WeftComposition.CompositionOfPoly",
        title: "Poly",
        valign: "middle"
      },
      {
        field: "OrderProduction.WeftComposition.CompositionOfCotton",
        title: "Cotton",
        valign: "middle"
      },
      {
        field: "OrderProduction.WeftComposition.OtherComposition",
        title: "Lainnya",
        valign: "middle"
      },
      {
        field: "EstimatedProduction.GradeA",
        title: "Grade A",
        valign: "middle"
      },
      {
        field: "EstimatedProduction.GradeB",
        title: "Grade B",
        valign: "middle"
      },
      {
        field: "EstimatedProduction.GradeC",
        title: "Grade C",
        valign: "middle"
      },
      {
        field: "EstimatedProduction.GradeD",
        title: "Grade D",
        valign: "middle"
      },
      {
        field: "FabricConstructionDocument.ItemsWarp.Quantity",
        title: "Lusi",
        valign: "middle"
      },
      {
        field: "FabricConstructionDocument.ItemsWeft.Quantity",
        title: "Pakan",
        valign: "middle"
      },
      {
        field: "FabricConstructionDocument.TotalYarn",
        title: "Total",
        valign: "middle"
      }
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
    var Month = this.getMonth(this.data);
    // console.log(Month);
    var Year = this.getYear(this.data);
    // console.log(Year);
    var UnitId = this.data.Unit.Id;
    // console.log(UnitId);
    this.service.getPdfByPeriod(Month, Year, UnitId);
  }

  searchOrderProductions() {
    var Month = this.getMonth(this.data);
    var Year = this.getYear(this.data);
    var UnitId = this.data.Unit.Id;
    this.service.searchSOP(Month, Year, UnitId).then(result => {
      this.loader = result.data;
    });
    // loader = info => {
    //   var order = {};
    //   if (info.sort) order[info.sort] = info.order;

    //   var arg = {
    //     page: parseInt(info.offset / info.limit, 10) + 1,
    //     size: info.limit,
    //     keyword: info.search,
    //     order: order
    //   };

    //   return this.service
    //     .searchSOP(
    //       this.data.Period.Month,
    //       this.data.Period.Year,
    //       this.data.Unit.Id
    //     )
    //     .then(result => {
    //       return {
    //         total: result.info.total,
    //         data: result.data
    //       };
    //     });
    // };
    // }
  }
}
