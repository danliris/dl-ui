import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');

const SupplierLoader = require("../../../../loader/garment-supplier-loader");
var DispositionLoader = require('../../../../loader/garment-disposition-memo-detail-loader');
@inject(Router, Service)
export class List {
    info = { page: 1,size:75};
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    bind(context) {
        console.log(context);
        this.context = context;

    }

    search(){
            this.searching();        
    }
    activate() {
       
    }
    tableData = []
    searching() {
        console.log(this.disposition)
        var args = {
            dateFromSendCashier : this.dateFromSendCashier ? moment(this.dateFromSendCashier).format("YYYY-MM-DD") : "",
            dateToSendCashier : this.dateToSendCashier ? moment(this.dateToSendCashier).format("YYYY-MM-DD") : "",
            dateFromReceiptCashier : this.dateFromReceiptCashier ? moment(this.dateFromReceiptCashier).format("YYYY-MM-DD") : "",
            dateToReceiptCashier : this.dateToReceiptCashier ? moment(this.dateToReceiptCashier).format("YYYY-MM-DD") : "",

            dispositionId : this.disposition ? this.disposition.DispositionId : "",
            supplierId : this.supplier ? this.supplier.Id : "",
            page: this.info.page,
            size: this.info.size,
            
           
        };
        
        this.service.search(args)
            .then(result=>{
                // var datas=[];
                // console.log(result)
                // for(var _data of result.data){
                //     //console.log(_data)

                  
                //     datas.push(_data);

                //  }
                //  this.info.total= result.info.total;
                //  this.data = result.data;
                // //console.log(this.data)
                // console.log(result.info.total)
                // console.log(this.info)
               
                this.rowCount=[];
                var rowDoc=[];
                this.info.total=result.info.total;    
                  
                for(var a of result.data){
                    //var bc=a.Invoice.toString();
                    //var doc=a.ExpanditurGoodId;
                    var dispoNo=a.DispositionNo.toString();
                    
                    if(!this.rowCount[dispoNo]){
                        this.rowCount[dispoNo]=1;
                    }
                    else{
                        this.rowCount[dispoNo]++;
                    }
 
                    
                }
                
                for(var b of result.data){
                   
                    let dispoc=result.data.find(o=> o.DispositionNo ==b.DispositionNo);
                    if(dispoc){
                        dispoc.rowspan=this.rowCount[b.DispositionNo];
                        b.index = index++;
                    }

                    
                }
                
                let index = 1;
                for (let item of result.data) {
                    
                    item.index = index++;
                    item.SendToCashierDate = item.SendToCashierDate ? moment(item.SendToCashierDate).format("YYYY-MM-DD") : "";
                    item.ReceiptCashierDate = item.ReceiptCashierDate ? moment(item.ReceiptCashierDate).format("YYYY-MM-DD") : "";
                }
                this.data=result.data;
            
            });
            
    }

    reset() {
        this.dateFromSendCashier= "",
        this.dateToSendCashier= "",
        this.dateFromReceiptCashier ="",
        this.dateToReceiptCashier="",
        this.supplier="",
        this.disposition=""
     
        
    }

    ExportToExcel() {
        let args = {            
            dateFromSendCashier : this.dateFromSendCashier ? moment(this.dateFromSendCashier).format("YYYY-MM-DD") : "",
            dateToSendCashier : this.dateToSendCashier ? moment(this.dateToSendCashier).format("YYYY-MM-DD") : "",
            dateFromReceiptCashier : this.dateFromReceiptCashier ? moment(this.dateFromReceiptCashier).format("YYYY-MM-DD") : "",
            dateToReceiptCashier : this.dateToReceiptCashier ? moment(this.dateToReceiptCashier).format("YYYY-MM-DD") : "",

            dispositionId : this.disposition ? this.disposition.DispositionId : "",
            supplierId : this.supplier ? this.supplier.Id : "",
            
       
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
 

    get supplierLoader() {
        return SupplierLoader;
      }

    supplierView = (supplier) => {
        return supplier.code + " - " + supplier.name;
    };

    get dispositionLoader() {
        return DispositionLoader;
    }
}
