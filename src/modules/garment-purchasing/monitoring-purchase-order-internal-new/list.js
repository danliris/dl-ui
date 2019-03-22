import { inject } from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';

//var SupplierLoader = require('../../../loader/supplier-loader');
//var DOLoader = require('../../../loader/delivery-order-all-loader');

var SupplierLoader = require('../../../loader/garment-supplier-loader');
var CategoryLoader = require('../../../loader/garment-category-loader');

@inject(Service)

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
         { field: "index", title: "No" , sortable: false},
         { field: "prNo", title: "Nomor PR", sortable: false },
         { field: "createdUtc", title: "Tanggal PO Int", sortable: false, formatter: function (value, data, index) {
                return moment(value).format("DD/MM/YYYY");
            }
         },
         { field: "shipmentDate", title: "Tanggal shipmentDate", sortable: false, formatter: function (value, data, index) {
                return moment(value).format("DD/MM/YYYY");
            }
         },
         { field: "roNo", title: "Nomor RO", sortable: false },
         { field: "buyerCode", title: "Kode Buyer", sortable: false},
         { field: "buyerName", title: "Nama Buyer", sortable: false},
         { field: "article", title: "Artikel", sortable: false },
         { field: "unitName", title: "Unit", sortable: false },
         { field: "po_SerialNumber", title: "No Ref PR", sortable: false },
         { field: "categoryName", title: "Kategori", sortable: false },
         { field: "productCode", title: "Kode Barang", sortable: false },
         { field: "productName", title: "Nama Barang", sortable: false },
         { field: "productRemark", title: "Keterangan", sortable: false },
         { field: "quantity", title: "Jumlah", sortable: false },
         { field: "uomUnit", title: "Satuan", sortable: false },
         { field: "budgetPrice", title: "Harga Budget", sortable: false },
         { field: "createdBy", title: "Staff", sortable: false },
       
    ];


    search() {
        this.error = {};


        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.doTable.refresh();
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
        // this.no = null;
        // this.supplier = null;
        this.dateFrom = undefined;
        this.dateTo = undefined;
        // this.purchaseOrderExternal = null;
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        let args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            // no: this.no ? this.no.doNo : "",
            // poEksNo : this.purchaseOrderExternal ? this.purchaseOrderExternal.EPONo : "",
            // supplierId: this.supplier ? this.supplier.Id : "",
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
            // no: this.no ? this.no.doNo : "",
            // poEksNo : this.purchaseOrderExternal ? this.purchaseOrderExternal.EPONo : "",
            // supplierId: this.supplier ? this.supplier.Id : "",
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
     get poEksLoader(){
        return POEksLoader;
    }

    get supplierLoader(){
        return SupplierLoader;
    }
    get dOLoader(){
        return DOLoader;
    }

    get CategoryLoader(){
        return CategoryLoader;
    }
    poView = (tr) => {
        return `${tr.no}`;
    }

}