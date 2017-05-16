import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

var StorageLoader = require('../../../../loader/storage-loader');

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    statusOptions = ['IN','OUT','ADJ'];

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }

    selectedStorage = {};
   

    columns = [
      { field: "storageName", title: "Storage"},
      { field: "date", title: "Tanggal", 
        formatter: (value, data) => {
          return moment(value).format("DD-MMM-YYYY");
        }
      },
      { field: "productName", title: "Nama Barang"},
      { field: "uom", title: "UOM"},
      { field: "before", title: "Before"},
      { field: "quantity", title: "Kuantiti"},
      { field: "after", title: "After"},
      { field: "type", title: "Tipe"}
    ]

    bind() {
        
    }

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        this.arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            dateFrom : moment(this.dateFrom).format("YYYY-MM-DD"),
            dateTo : moment(this.dateTo).format("YYYY-MM-DD"),
            storageId : this.selectedStorage._id ? this.selectedStorage._id : "",
            type : this.statusOpt
        }

        return this.service.search(this.arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    contextShowCallback(index, name, data) {
        return true;
    }

    search() {
        this.movementTable.refresh();
    }

    reset() {
        this.selectedStorage = "";
        this.statusOpt = this.statusOptions[0];
        this.dateFrom = null;
        this.dateTo = null;
    }

    ExportToExcel() {
        this.service.generateExcel(this.arg);
    }

    get storageLoader() {
        return StorageLoader;
    }

    storageView = (storage) => {
        return storage.code ? `${storage.code} - ${storage.name}` : "";
    }
}
