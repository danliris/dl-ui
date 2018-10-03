import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
  context = ["Rincian"]

  columns = [
    { field: "PRNo", title: "Nomor PR" },
    {
      field: "Date", title: "Tanggal Validasi", formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    { field: "RONo", title: "Nomor RO" },
    { field: "Buyer.Code", title: "Kode Buyer" },
    { field: "Buyer.Name", title: "Nama Buyer" },
    { field: "Article", title: "Artikel" },
    {
      field: "ShipmentDate", title: "Tanggal Shipment", formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      }
    },
  ];

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;
    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      // select: ["PRNo", "RONo", "ShipmentDate", "Buyer.Name", "Unit.Name", "IsPosted"],
      order: order
    }

    return this.service.search(arg)
      .then(result => {
        var data = {}
        data.total = result.info.total;
        data.data = result.data;
        // return data;
        return {
          total: result.info.total,
          data: result.data
        }
      });
  }

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Rincian":
        this.router.navigateToRoute('view', { id: data.Id });
        break;
    }
  }

}
