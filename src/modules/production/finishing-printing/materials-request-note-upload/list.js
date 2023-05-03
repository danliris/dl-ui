import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  context = ["detail"];
  columns = [
    { field: "unit", title: "Unit" },
    { field: "date", title: "Tanggal", formatter: function (value, data, index) {
        return moment.utc(value).local().format('D MMMM YYYY');
    }},
    { field: "createdDate", title: "Tanggal Upload", formatter: function (value, data, index) {
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
    this.uomId = "";
    this.uoms = [];
  }

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
        case "detail":
            this.router.navigateToRoute('view', { id: data.unitId, date: data.date });
            break;
    }
  }

  upload() {
    this.router.navigateToRoute("upload");
  }
}
