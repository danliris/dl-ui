import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
var UnitLoader = require('../../../../../loader/unit-loader');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    unit=null;
    duration='';
    dateFrom = null;
    dateTo = null;

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }
    durationItems=["31-60 hari","61-90 hari", "> 90 hari"];

    listDataFlag = false;

    columns = [
       { field: "index", title: "No", sortable:false},
      { field: "prDate", title: "Tanggal Purchase Request", sortable:false, 
        formatter: (value, data) => {
            return moment(value).format("DD/MM/YYYY");
        }
      },
      { field: "prCreatedDate", title: "Tanggal Buat Purchase Request", sortable:false, 
        formatter: (value, data) => {
          return moment(value).format("DD/MM/YYYY");
        }
      },
      { field: "prNo", title: "No Purchase Request", sortable:false},
      { field: "division", title: "Divisi", sortable:false},
      { field: "unit", title: "Unit", sortable:false},
      { field: "budget", title: "Budget", sortable:false},
      { field: "category", title: "Kategori", sortable:false},
      { field: "productCode", title: "Kode Barang", sortable:false},
      { field: "productName", title: "Nama Barang", sortable:false},
      { field: "productQuantity", title: "Jumlah Barang", sortable:false},
      { field: "productUom", title: "Satuan Barang", sortable:false},
      { field: "productPrice", title: "Harga Barang", sortable:false},
      { field: "supplierCode", title: "Kode Supplier", sortable:false},
      { field: "supplierName", title: "Nama Supplier", sortable:false},
      { field: "poDate", title: "Tanggal Terima PO Internal", sortable:false,
        formatter: (value, data) => {
            return moment(value).format("DD/MM/YYYY");
        }
      },
      { field: "poEksDate", title: "Tanggal PO Eksternal", sortable:false, 
        formatter: (value, data) => {
          return moment(value).format("DD/MM/YYYY");
        }
      },
      { field: "poEksCreatedDate", title: "Tanggal Buat PO Eksternal", sortable:false, 
        formatter: (value, data) => {
          return moment(value).format("DD/MM/YYYY");
        }
      },
      { field: "expectedDate", title: "Tanggal Target Datang", sortable:false, 
        formatter: (value, data) => {
          return moment(value).format("DD/MM/YYYY");
        }
      },
      { field: "poEksNo", title: "No PO Eksternal", sortable:false},
      { field: "doDate", title: "Tanggal Surat Jalan", sortable:false, 
        formatter: (value, data) => {
          return moment(value).format("DD/MM/YYYY");
        }
      },
      { field: "arrivedDate", title: "Tanggal Datang Barang", sortable:false, 
        formatter: (value, data) => {
          return moment(value).format("DD/MM/YYYY");
        }
      },
      { field: "doNo", title: "No Surat Jalan", sortable:false},
      { field: "dateDiff", title: "Selisih Tanggal PO Eksternal - Surat Jalan (hari)", sortable:false},
      { field: "staff", title: "Nama Staff Pembelian", sortable:false},
    ]

    bind() {
        
    }

    fillValues() {
        this.arg.unitId = this.filter.unit ? this.filter.unit._id : "";
        this.arg.duration = this.filter.duration ? this.filter.duration : "31-60 hari";
        this.arg.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
        this.arg.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        this.arg.offset = new Date().getTimezoneOffset() / 60 * -1;
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
                        total: result.info.length,
                        data: result.data
                    }
            })
        ) : { total: 0, data: {} };
    }

    searching() {
        this.listDataFlag = true;
        this.durationTable.refresh();
    }

    reset() {
        this.filter = {};
        this.data = [];
    }

    ExportToExcel() {
        this.fillValues();
        this.service.generateExcel(this.arg);
    }

    get unitLoader() {
        return UnitLoader;
    }

    autocomplete_change(e) {
        if(e.au.controller.view.bindingContext.value == undefined || e.au.controller.view.bindingContext.value == "")
            e.au.controller.view.bindingContext.value = e.au.controller.view.bindingContext.value == undefined ? "" : undefined;
    }
}
