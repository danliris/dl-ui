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
    { field: "Code", title: "Kode Barang" },
    { field: "Name", title: "Nama Barang" },
    { field: "UomUnit", title: "Satuan Default" },
    { field: "CurrencyCode", title: "Mata Uang" },
    {
        field: "Price",
        title: "Harga Barang",
        formatter: function (value, data, index) {
            return value != null
                ? Number(value).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })
                : "";
        }
    },
    { field: "Tags", title: "Tags" },
    { field: "ManufactureType", title: "Tipe Barang" },
    { field: "OriginType", title: "Asal Barang" },
    { field: "ItemType", title: "Kategori" },
    {
      field: "IsPosted", title: "Active",
      formatter: function (value, row, index) {
        return value ? "SUDAH" : "BELUM";
      }
    }
  ];

  rowFormatter(data, index) {
    if (data.IsPosted)
      return { classes: "success" }
    else
      return {}
  }

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    }

    return this.service.search(arg)
      .then(result => {
        for(var a of result.data){
          a.UomUnit=a.UOM.Unit;
          a.CurrencyCode=a.Currency.Code;
        }
        return {
          total: result.info.total,
          data: result.data
        }
      });
  }

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.accessoriesId = "";
        this.accessories = [];
    }

    contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    var id = Base64Helper.encode(data.Id);
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute('view', { id: id });
        break;
    }
  }
  download() {
    this.service.download();
}
}
