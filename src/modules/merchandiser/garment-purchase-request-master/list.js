import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
  dataToBePosted = [];
  context = ["Rincian", "Cetak PDF"]

  columns = [
    {
      field: "isPosting", title: "Post", checkbox: true, sortable: false,
      formatter: function (value, data, index) {
        this.checkboxEnabled = !data.IsPosted;
        return ""
      }
    },
    { field: "SCNo", title: "No Sales Contract" },
    { field: "PRNo", title: "No PR" },
    { field: "PRType", title: "Jenis PR" },
    { field: "RONo", title: "No RO" },
    {
      field: "Date", title: "Tanggal PR", formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    { field: "BuyerCode", title: "Kode Buyer" },
    { field: "BuyerName", title: "Nama Buyer" },
    { field: "Article", title: "Artikel" },
    {
      field: "ExpectedDeliveryDate", title: "Tanggal Diminta Datang", formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      }
    },
  ];

  rowFormatter(data, index) {
    if (data.IsPosted)
      return { classes: "success" }
    else
      return {}
  }

  loader = (info) => {
    let order = {};
    if (info.sort) {
      order[info.sort] = info.order;
    }
    let filter = {};
    filter["PRType == \"MASTER\" || PRType == \"SAMPLE\""] = true;
    let arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      // select: ["PRNo", "RONo", "ShipmentDate", "Buyer.Name", "Unit.Name", "IsPosted"],
      order: order,
      filter: JSON.stringify(filter)
    }

    return this.service.search(arg)
      .then(result => {
        result.data.forEach(data => {
          data.isPosting = data.IsPosted;
          data.BuyerCode = data.Buyer.Code;
          data.BuyerName = data.Buyer.Name;
        });
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
    let arg = event.detail;
    let data = arg.data;
    switch (arg.name) {
      case "Rincian":
        this.router.navigateToRoute('view', { id: data.Id });
        break;
      case "Cetak PDF":
        this.service.getPdf(data.Id);
        break;
    }
  }

  contextShowCallback(index, name, data) {
    switch (name) {
      case "Cetak PDF":
        return data.IsPosted;
      default:
        return true;
    }
  }

  posting() {
    if (this.dataToBePosted.length > 0) {
      this.service.post(this.dataToBePosted.map(d => d.Id))
        .then(result => {
          this.table.refresh();
        }).catch(e => {
          this.error = e;
        })
    }
  }

  create() {
    this.router.navigateToRoute('create');
  }
}
