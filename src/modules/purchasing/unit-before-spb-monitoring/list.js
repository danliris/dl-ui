import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var UnitLoader = require('../../../loader/unit-loader');
var PRLoader = require('../../../loader/purchase-request-all-loader');
var URNLoader = require('../../../loader/unit-receipt-note-all-loader');
var CategoryLoader = require('../../../loader/category-loader');
var SupplierLoader = require('../../../loader/supplier-loader');

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
        this.spbStatuses = this.spbStatuses.map(status => {
            status.toString = function(){
                return this.name;
            }
            return status;
        })
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

    columns = [
        { field: "index", title: "No" , sortable: false},
        { field: "UrnNo", title: "Nomor Bon Terima" , sortable: false },
        { field: "ReceiptDate", title: "Tanggal Bon Terima", sortable: false, formatter: function (value, data, index) {
            return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "SupplierCode", title: "Kode Supplier", sortable: false },
        { field: "SupplierName", title: "Nama Supplier" , sortable: false},
        { field: "DONo", title: "Nomor Surat Jalan", sortable: false },
        { field: "DODate", title: "Tanggal Surat Jalan", sortable: false, formatter: function (value, data, index) 
            {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "EPONo", title: "Nomor PO Eksternal" , sortable: false},
        { field: "OrderDate", title: "Tanggal Order", sortable: false, formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "PaymentDueDays", title: "Tempo Pembelian" , sortable: false},
        { field: "PRNo", title: "Nomor PR" , sortable: false},
        { field: "BudgetName", title: "Nama Budget" , sortable: false},
        { field: "UnitName", title: "Nama Unit" , sortable: false},
        { field: "CategoryName", title: "Kategori" , sortable: false},
        { field: "ProductCode", title: "Kode Barang" , sortable: false},
        { field: "ProductName", title: "Nama Barang" , sortable: false},
        { field: "ReceiptQuantity", title: "Jumlah Barang", sortable: false,formatter:(value,data)=>{
            return value.toLocaleString('en-EN', { minimumFractionDigits: 2 });
        }  },
        { field: "Uom", title: "Satuan Barang", sortable: false },
        { field: "createdBy", title: "Staff Pembelian", sortable: false },
        { field: "IsPaid", title: "Status SPB", sortable: false },
        { field: "UPONo", title: "Nomor SPB", sortable: false }
    ];

    

    

   
    search() {
        this.error = {};


        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.spbTable.refresh();
        }
    }

    reset() {
        
        this.unitReceiptNote = null;
        this.supplierName = null;
        this.dateTo = undefined;
        this.dateFrom = undefined;
        this.spbStatus =null;
        this.error = {};

        this.flag = false;
        //this.prTable.refresh();
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        let args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            UrnNo:this.unitReceiptNote? this.unitReceiptNote.no:"",
            SupplierName: this.supplierName? this.supplierName.name : "",
            dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
            dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):"",
            IsPaid: this.isPaids ? this.isPaids.value :""


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

    spbStatuses = [
    {
        "name": "",
        "value": ""
    }, 
    {
        "name": "SUDAH",
        "value": "true"
    },  
    {
        "name": "BELUM",
        "value": "false"
    }];

    xls() {
        this.error = {};
        if (Object.getOwnPropertyNames(this.error).length === 0) {
            let args = {
            UrnNo:this.unitReceiptNote? this.unitReceiptNote.no:"",
            SupplierName: this.supplierName? this.supplierName.name : "",
            dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
            dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):"",
            IsPaid: this.isPaids ? this.isPaids.value :""
        };

            this.service.generateExcel(args)
                .catch(e => {
                    alert(e.replace(e, "Error: ", ""));
                });
        }
    }

    get unitLoader() {
        return UnitLoader;
    }

    get prLoader() {
        return PRLoader;
    }
    
    get categoryLoader() {
        return CategoryLoader;
    }
    
    get supplierLoader() {
        return SupplierLoader;
    }

    get urnLoader() {
        return URNLoader;
    }

    prView = (tr) => {
      return `${tr.no}`;
    }
    urnView = (urn) => {
        return `${urn.no}`;
    }
    supplierView =(supplier) =>{
        return `${supplier.name}`;
    }

    

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);


        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }
}