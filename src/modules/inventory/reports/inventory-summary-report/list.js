import { inject } from 'aurelia-framework';
import { Service } from "./service";

var numeral = require('numeral');

var StorageLoader = require('../../../../loader/storage-loader');
var ProductLoader = require('../../../../loader/product-loader');

@inject(Service)
export class List {
    constructor(service, router) {
        this.service = service;
    }

    columns = [
        { field: "storageName", title: "Storage" },
        { field: "productName", title: "Nama Barang" },
        {
            field: "stockPlanning", title: "Stock Planning", formatter: function (value, data, index) {
                return numeral(value).format('0,000.00');
            }
        },
        {
            field: "quantity", title: "Kuantiti", formatter: function (value, data, index) {
                return numeral(value).format('0,000.00');
            }
        },
        { field: "uom", title: "UOM" },
        {
            field: "totalLengthMtr", title: "Total Panjang (meter)", formatter: function (value, data, index) {
                return numeral(value).format('0,000.00');
            }
        },
        {
            field: "totalLengthYds", title: "Total Panjang (yard)", formatter: function (value, data, index) {
                return numeral(value).format('0,000.00');
            }
        }
    ];

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }

    listDataFlag = false;

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        this.arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        }

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

    fillValues() {
        this.arg.storageId = this.selectedStorage ? this.selectedStorage._id : undefined;
        this.arg.productId = this.selectedProduct ? this.selectedProduct._id : undefined;
    }

    ExportToExcel() {
        this.fillValues();
        this.service.generateExcel(this.arg);
    }

    get storageLoader() {
        return StorageLoader;
    }

    storageView = (storage) => {
        return `${storage.unit.name} - ${storage.name}`;
    }

    get productLoader() {
        return ProductLoader;
    }

    productView = (product) => {
        return `${product.code} - ${product.name}`;
    }

    search() {
        this.listDataFlag = true;
        this.summaryTable.refresh();
    }

    reset() {
        this.selectedStorage = undefined;
        this.selectedProduct = undefined;
        this.listDataFlag = false;
        this.summaryTable.refresh();
    }

    // autocomplete_change(e) {
    //     if (e.au.controller.view.bindingContext.value == undefined || e.au.controller.view.bindingContext.value == "")
    //         e.au.controller.view.bindingContext.value = e.au.controller.view.bindingContext.value == undefined ? "" : undefined;
    // }
}