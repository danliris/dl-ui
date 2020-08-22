import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var UnitLoader = require('../../../../loader/garment-units-loader');
var SupplierLoader = require('../../../../loader/garment-supplier-loader');
var UnitReceiptLoader = require('../../../../loader/garment-unit-receipt-note-loader');

@inject(Router, Service)
export class List {

     reprosesOption = ['','Bahan Baku', 'Bahan Embalase','Bahan Pendukung'];
  constructor(router, service) {
        this.service = service;
        this.router = router;

    }
    
    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }
    get unitLoader(){
        return UnitLoader;
    }
    unitView = (unit) => {
      
        return `${unit.Code} - ${unit.Name}`
      }
    get supplierLoader(){
        return SupplierLoader;
    }
     get unitReceiptLoader(){
        return UnitReceiptLoader;
     
    }
   
    columns = [
        { field: "no", title: "No" , sortable: false},
        { field: "kdbarang", title: "Kode Barang", sortable: false },
        { field: "nmbarang", title: "Nama Barang", sortable: false },
        { field: "nopo", title: "No PO", sortable: false },
        { field: "keterangan", title: "Keterangan Barang", sortable: false },
        { field: "noro", title: "No RO", sortable: false },
        { field: "artikel", title: "Artikel", sortable: false },
        { field: "kdbuyer", title: "Kode Buyer", sortable: false },
        { field: "asal", title: "Asal", sortable: false },
        { field: "nobukti", title: "Nomor Bukti", sortable: false },
         { field: "tanggal", title: "Tanggal", sortable: false, formatter: function (value, data, index) {
                return moment(value).format("DD/MM/YYYY");
         }},
        { field: "jumlahbeli", title: "Jumlah Beli ", sortable: false },
        { field: "satuanbeli", title: "Satuan Beli", sortable: false },
        { field: "jumlahterima", title: "Jumlah Terima", sortable: false },
        { field: "satuanterima", title: "Satuan Terima", sortable: false },
        { field: "jumlah", title: "Jumlah", sortable: false, formatter:(value,data)=>{
            return value.toLocaleString('en-EN', { minimumFractionDigits: 2 });
        }  },
       
    ]
    Values() {
        this.arg.dateFrom = this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null;
        this.arg.dateTo = this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : null;
        this.arg.category = this.category ? this.category : "";
        // this.arg.refNo = this.poRefPR ? this.poRefPR : "";
        // this.arg.roNo = this.roNo ? this.roNo : "";
        // this.arg.doNo =this.doNo ? this.doNo : "";
        // this.arg.supplier =  this.supplier ? this.supplier.code : "";
        this.arg.unit = this.unit ? this.unit.Code : "";
        console.log(this.arg);
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
        };
        return this.listDataFlag ? (
            this.Values(),
            this.service.search(this.arg)
                .then(result => {
                            return {
                        total: result.info.total,
                        data: result.data,
                    }
                })
        ) : { total: 0, data: {} };
    }
    search() {
        this.listDataFlag = true;
        this.table.refresh();
    }


    
     ExportToExcel() {
        var info = {
           
            category : this.category ? this.category : "",
            categoryname: this.category === "Bahan Baku" ? "GUDANG BAHAN BAKU" : this.category === "Bahan Embalase" ? "GUDANG BAHAN EMBALASE" : this.category === "Bahan Pendukung" ?  "GUDANG BAHAN PENDUKUNG" : "",
            unit : this.unit ? this.unit.Code : "",
            unitname: this.unit ? this.unit.Name : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        console.log(info);
        this.service.generateXls(  info.unit,  info.category, info.dateFrom, info.dateTo, info.unitname, info.categoryname)
    }
  

    reset() {
       
    
        this.unit = "";
        this.dateFrom = "";
        this.dateTo = "";
        this.category = "";
      
        
    }
}
