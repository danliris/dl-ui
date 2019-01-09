import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');
var UnitLoader = require('../../../loader/unit-loader');
var CategoryLoader = require('../../../loader/garment-category-loader');
var SupplierLoader = require('../../../loader/garment-supplier-loader');
var AccountLoader = require('../../../loader/account-loader');

@inject(Router, Service)
export class List {

    poStates = ["","Dibatalkan","PO Internal belum diorder","Sudah dibuat PO Eksternal","Sudah diorder ke Supplier","Barang sudah datang parsial","Barang sudah datang semua","Barang sudah diterima Unit parsial","Barang sudah diterima Unit semua","Sudah dibuat SPB sebagian","Sudah dibuat SPB semua"];
    info = { page: 1,size:25};

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }
    attached() {
    }

    activate() {
    }

    search(){
            this.info.page = 1;
            this.info.total=0;
            this.searching();
        
    }
    searching() {
        let args = {
            page: this.info.page,
            size: this.info.size,
            unit : this.unit ? this.unit.Name : "",
            category : this.category ? this.category.name : "",
            epoNo : this.epoNo ? this.epoNo : "",
            roNo : this.roNo ? this.roNo : "",
            prNo : this.prNo ? this.prNo : "",
            article : this.article ? this.article : "",
            doNo : this.doNo ? this.doNo : "",
            supplier : this.supplier ? this.supplier.name : "",
            staff: this.staff? this.staff.username : "",
            status: this.poState,
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        };

        this.service.search(args)
            .then(result => {
                this.info.total=result.info.total; 
                this.data = result.data;
                for (var item of this.data){
                   
                    item.prDate=moment(item.prDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.prDate).format("DD MMM YYYY");
                    item.receivedDatePO=moment(item.receivedDatePO).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.receivedDatePO).format("DD MMM YYYY");
                    item.epoDate=moment(item.epoDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.epoDate).format("DD MMM YYYY");
                    item.epoCreatedDate=moment(item.epoCreatedDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.epoCreatedDate).format("DD MMM YYYY");
                    item.epoExpectedDeliveryDate=moment(item.epoExpectedDeliveryDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.epoExpectedDeliveryDate).format("DD MMM YYYY");
                    item.epoDeliveryDate=moment(item.epoDeliveryDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.epoDeliveryDate).format("DD MMM YYYY");
                    item.doDate=moment(item.doDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.doDate).format("DD MMM YYYY");
                    item.doDeliveryDate=moment(item.doDeliveryDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.doDeliveryDate).format("DD MMM YYYY");
                    item.urnDate=moment(item.urnDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.urnDate).format("DD MMM YYYY");
                    item.invoiceDate=moment(item.invoiceDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.invoiceDate).format("DD MMM YYYY");
                    item.upoDate=moment(item.upoDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.upoDate).format("DD MMM YYYY");
                    item.dueDate=moment(item.dueDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.dueDate).format("DD MMM YYYY");
                    item.vatDate=moment(item.vatDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.vatDate).format("DD MMM YYYY");
                    item.incomeTaxDate=item.incomeTaxDate==null? "-" : moment(item.incomeTaxDate).format("DD MMM YYYY");
                    item.correctionDate=moment(item.correctionDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.correctionDate).format("DD MMM YYYY");
                   
                    item.quantity=item.quantity.toLocaleString('en-EN', { minimumFractionDigits: 2 });
                    item.pricePerDealUnit=item.pricePerDealUnit.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.priceTotal=item.priceTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.priceTotalIDR=item.priceTotalIDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.rate=item.rate.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.doQuantity =item.doQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });                   
                    item.urnQuantity=item.urnQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2 });
                    item.upoPriceTotal=item.upoPriceTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.vatValue=item.vatValue.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.incomeTaxValue=item.incomeTaxValue.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.valueCorrection=item.valueCorrection.toLocaleString();
                }
            })
    }

    reset() {
        this.unit = "";
        this.category = "";
        this.epoNo = "";
        this.prNo = "";
        this.roNo = "";
        this.supplier = "";
        this.dateFrom = null;
        this.dateTo = null;
        this.poState ="";
        this.article = "";
        this.doNo = "";        
        this.staff = "";
        //this.data = [];
    }

    exportToXls() {
        let args = {
            
            unit : this.unit ? this.unit.Name : "",
            category : this.category ? this.category.name : "",
            epoNo : this.epoNo ? this.epoNo : "",
            roNo : this.roNo ? this.roNo : "",
            prNo : this.prNo ? this.prNo : "",
            article : this.article ? this.article : "",
            doNo : this.doNo ? this.doNo : "",
            supplier : this.supplier ? this.supplier.name : "",
            staff: this.staff? this.staff.username : "",
            status: this.poState,
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        };
        
        this.service.generateExcel(args);
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);
        this.dateMin = moment(_startDate).format("YYYY-MM-DD");

        if (_startDate > _endDate || !this.dateTo) {
            this.dateTo = e.srcElement.value;
        }

    }
    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }

    get unitLoader() {
        return UnitLoader;
    }

    unitView = (unit) => {
        return `${unit.Name}`
      }

    get categoryLoader() {
        return CategoryLoader;
    }
        categoryView = (category) => {
        return `${category.name}`
      }

    get supplierLoader() {
        return SupplierLoader;
    }

        supplierView = (supplier) => {
        return `${supplier.name}`
      }

    get accountLoader() {
        return AccountLoader;
    }
        accountView = (account) => {
        return `${account.username}`;
  }
}