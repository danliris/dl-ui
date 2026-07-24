import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import { Base64Helper } from '../../../utils/base-64-coded-helper';

@inject(Router, Service)
export class List {
  // data = [];
  // info = { page: 1, keyword: '' };
  context = ["detail"];
  columns = [
    { field: "Code", title: "Kode" },
    { field: "Category", title: "Kategori" },
    { field: "TransactionType", title: "Tipe Transaksi" },
    { field: "VatRate", title: "Tarif PPN", formatter: function (value, data, index) {
      return value ? `${value} %` : "-";
    } },
    { field: "IncomeTaxName", title: "Nama PPH" },
    { field: "IncomeTaxRate", title: "Tarif PPH", formatter: function (value, data, index) {
      return value ? `${value} %` : "-";
    } },  
    { field: "Description", title: "Deskripsi" },
  ]

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      select: ['Unit'],
      order: order
    }

    return this.service.search(arg)
      .then(result => {
        return {
          total: result.info.total,
          data: result.data
        }
      });
  }

  constructor(router, service) {
    this.service = service;
    this.router = router;
    // this.uomId = "";
    // this.uoms = [];
  }

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        const encoded = Base64Helper.encode(data.Id);
        this.router.navigateToRoute('view', { id: encoded });
        break;
    }
  }

  create() {
    this.router.navigateToRoute('create');
  }

  upload() {
    this.router.navigateToRoute('upload');
  }

  downloadTemplate() {
    this.service.downloadTemplate();
  }
}
