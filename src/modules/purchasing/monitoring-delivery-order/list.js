import { inject } from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';

var SupplierLoader = require('../../../loader/supplier-loader');
var DOLoader = require('../../../loader/delivery-orders/by-supplier');

@inject(Router, Service)

export class List {
    constructor(service) {
        this.service = service;

        this.flag = false;
        
        this.today = new Date();
        this.error = {};
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }
    // attached() {
    // }

    // activate() {

    // }

    columns = [
        { field: "index", title: "NO" , sortable: false},
        { field: "supplierCode", title: "KODE SUPPLIER" , sortable: false },
        { field: "supplierName", title: "NAMA SUPPLIER", sortable: false },
        { field: "no", title: "NOMOR SURAT JALAN", sortable: false },
        { field: "supplierDoDate", title: "TANGGAL SURAT JALAN", sortable: false, formatter: function (value, data, index) {
                return moment(value).format("DD/MM/YYYY");
            }
        },
        { field: "date", title: "TANGGAL DATANG BARANG", sortable: false, formatter: function (value, data, index) {
                return moment(value).format("DD/MM/YYYY");
            }
        },
        { field: "ePONo", title: "Nomor PO External" , sortable: false},
        { field: "productCode", title: "Kode Barang", sortable: false },
        { field: "productName", title: "Nama Barang", sortable: false },
        { field: "productRemark", title: "Deskripsi Barang", sortable: false },
        { field: "dealQuantity", title: "Jumlah Yang Diminta", sortable: false },
        { field: "dOQuantity", title: "Jumlah Yang Datang", sortable: false },
        { field: "remainingQuantity", title: "Sisa Qty", sortable: false },
        { field: "uomUnit", title: "Satuanan", sortable: false },
    ];

    search() {
        this.error = {};


        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.prTable.refresh();
        }
    }
    // search() {
    //     this.SJ = [];
    //     this.service.search(this.no ? this.no : "", this.supplierId ? this.supplierId._id : "", this.dateFrom, this.dateTo)
    //         .then(data => {
    //             this.data = data;
    //             // for (var SJ of this.data) {
    //             //     this.SJ = SJ;
    //             //     for (var item of SJ.items) {
    //             //         this.item = item;
    //             //         for (var fulfillment of item.fulfillments) {
    //             //             this.fulfillment = fulfillment;
    //             //         }
    //             //     }
    //             // }
    //         })
    // }
    reset() {
        this.no = null;
        this.supplier = null;
        this.dateFrom = undefined;
        this.dateTo = undefined;
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        let args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            no: this.no ? this.no : "",
            supplierId: this.supplier ? this.supplier.Id : "",
            dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
            dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):"",
        };

        return this.flag ?
            (
                this.service.search(args)
                    .then(result => {
                        var index=0;
                        for(var a of result.data){
                            index++;
                            a.index=index;
                        }
                        return {
                            total: result.info.total,
                            data: result.data
                        };
                    })
            ) : { total: 0, data: [] };
    }
    
    xls() {
        this.error = {};

        if (Object.getOwnPropertyNames(this.error).length === 0) {
            let args = {
            no: this.no ? this.no : "",
            supplierId: this.supplierId ? this.supplier.Id : "",
            dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
            dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):"",

        };

            this.service.getXls(args)
                .catch(e => {
                    alert(e.replace(e, "Error: ", ""));
                });
        }
    }

    // ExportToExcel() {
    //     this.service.generateExcel(this.no ? this.no : "", this.supplierId ? this.supplier._id : "", this.dateFrom, this.dateTo);
    // }

    // dateFromChanged(e) {
    //     var _startDate = new Date(e.srcElement.value);
    //     var _endDate = new Date(this.dateTo);


    //     if (_startDate > _endDate)
    //         this.dateTo = e.srcElement.value;

    // }

    get supplierLoader(){
        return SupplierLoader;
    }
    get dOLoader(){
        return DOLoader;
    }

    doView = (tr) => {
        return `${tr.no}`;
    }
}