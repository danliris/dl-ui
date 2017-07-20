import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
  context = ["Rincian", "Cetak PDF"]

  columns = [
    { field: "no", title: "Nomor PR" },
    { field: "items", title: "Nomor Referensi PR" },
    { field: "roNo", title: "Nomor RO" },
    {
      field: "shipmentDate", title: "Tanggal Shipment", formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    { field: "buyer.name", title: "Buyer" },
    {
      field: "unit", title: "Unit", formatter: function (value, row, index) {
        return `${value.division.name} - ${value.name}`;
      }
    },
  ];

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;
    // console.log(info)
    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      select: ["no", "items.refNo", "roNo", "shipmentDate", "buyer", "unit.name", "unit.division.name", "isPosted"],
      order: order
    }

    return this.service.search(arg)
      .then(result => {
        var data = {}
        data.total = result.info.total;
        data.data = result.data;
        data.data.forEach(s => {
          s.items.toString = function () {
            var str = "<ul>";
            for (var item of s.items) {
              str += `<li>${item.refNo}</li>`;
            }
            str += "</ul>";
            return str;
          }
        });
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
        this.router.navigateToRoute('view', { id: data._id });
        break;
      case "Cetak PDF":
        this.service.getPdfById(data._id);
        break;
    }
  }

  contextShowCallback(index, name, data) {
    switch (name) {
      case "Cetak PDF":
        return data.isPosted;
      default:
        return true;
    }
  }

}
