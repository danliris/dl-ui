import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  context = ["Detail", "Cetak Surat Jalan", "Cetak Faktur Penjualan"];

  columns = [
    { field: "SalesInvoiceNo", title: "No. Faktur Penjualan" },
    {
      field: "Buyer.Name",
      title: "Buyer",
    },
    {
      field: "SalesInvoiceDate",
      title: "Tgl Faktur Penjualan",
      formatter: (value, data, index) => {
        return moment(value).format("DD-MMM-YYYY");
      },
    },
    { field: "DeliveryOrderNo", title: "No. Surat Jalan" },
    { field: "VatType", title: "Jenis PPN" },
  ];

  rowFormatter(data, index) {
    if (data.isClosed) return { classes: "danger" };
    else return {};
  }

  loader = (info) => {
    var order = {};
    if (info.sort) order[info.sort] = info.order;
    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order,
    };

    return this.service.search(arg).then((result) => {
      var data = {};
      data.total = result.info.total;
      data.data = result.data;
      return data;
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
      case "Detail":
        this.router.navigateToRoute("view", { id: data.Id });
        break;
      case "Cetak Surat Jalan":
        this.service.getDeliveryOrderPdfById(data.Id);
        break;
      case "Cetak Faktur Penjualan":
        this.service.getSalesInvoicePdfById(data.Id);
        break;
    }
  }

  contextShowCallback(index, name, data) {
    switch (name) {
      case "Cetak Surat Jalan":
        return data;
      case "Cetak Faktur Penjualan":
        return data;
      default:
        return true;
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }
}
