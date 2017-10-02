import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

var StorageLoader = require('../../../../loader/storage-loader');
var ProductLoader = require('../../../../loader/product-loader');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    statusOptions = ['','IN','OUT','ADJ'];

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }

    selectedStorage = "";

    listDataFlag = false;

    columns = [
      { field: "storageName", title: "Storage"},
      { field: "referenceNo", title: "Nomor Referensi"},
      { field: "referenceType", title: "Jenis Referensi"},
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
      { field: "type", title: "Status"}
    ]

    bind() {
        
    }

    fillValues() {
        this.arg.dateFrom = this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : undefined;
        this.arg.dateTo = this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : undefined;
        this.arg.storageId = this.selectedStorage ? this.selectedStorage._id : undefined;
        this.arg.productId = this.selectedProduct ? this.selectedProduct._id : undefined;
        this.arg.type = this.statusOpt;
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        this.arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        };

        return this.listDataFlag ? (
            this.fillValues(),
            this.service.search(this.arg)
                .then(result => {
                    return {
                        total: result.info.total,
                        data: result.data
                    }
            })
        ) : { total: 0, data: {} };
    }

    search() {
        this.listDataFlag = true;
        this.movementTable.refresh();
    }

    reset() {
        this.selectedStorage = "";
        this.selectedProduct = "";
        this.statusOpt = this.statusOptions[0];
        this.dateFrom = null;
        this.dateTo = null;
        this.listDataFlag = false;
        this.movementTable.refresh();
    }

    ExportToExcel() {
        this.fillValues();
        this.service.generateExcel(this.arg);
    }

    get storageLoader() {
        return StorageLoader;
    }

    storageView = (storage) => {
        return `${storage.code} - ${storage.name}`;
    }

    get productLoader() {
        return ProductLoader;
    }

    productView = (product) => {
        return `${product.code} - ${product.name}`;
    }

    autocomplete_change(e) {
        if(e.au.controller.view.bindingContext.value == undefined || e.au.controller.view.bindingContext.value == "")
            e.au.controller.view.bindingContext.value = e.au.controller.view.bindingContext.value == undefined ? "" : undefined;
    }
}
