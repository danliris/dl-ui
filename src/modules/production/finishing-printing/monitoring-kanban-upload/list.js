import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  context = ["detail"];
  columns = [
    { field: "area", title: "Area" },
    { field: "date", title: "Periode Kanban"},
    { field: "createdDate", title: "Tanggal Update", formatter: function (value, data, index) {
        return moment.utc(value).local().format('D MMMM YYYY');
    }},
    { field: "createdBy", title: "Staff" },
  ];

  loader = (info) => {
    var order = {};
    if (info.sort) {
        order[info.sort] = info.order;
    }
    var arg = {
        page: parseInt(info.offset / info.limit, 10) + 1,
        size: info.limit,
        keyword: info.search,
        order: order,
    };

    return this.service.search(arg).then((result) => {
      var resultPromise = [];
      if (result && result.data && result.data.length > 0) {
        resultPromise = result.data;
      }
      return Promise.all(resultPromise).then((newResult) => {
        for(var a of newResult){
            a.date= a.monthPeriode + " " + a.yearPeriode;
        }
        return {
            
          total: result.info.total,
          data: newResult,
        };
      });
    });
  };

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
        case "detail":
            this.router.navigateToRoute('view', { monthId: data.monthPeriodeId, year: data.yearPeriode, area: data.area });
            break;
    }
  }

  upload() {
    this.router.navigateToRoute("upload");
  }
}