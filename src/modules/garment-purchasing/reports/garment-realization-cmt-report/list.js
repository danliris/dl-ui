import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');
var unitLoader = require('../../../../loader/unit-loader');
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
        var args = {
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            unit : this.unit ? this.unit.Code : "",
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
                var index=0;    
                for(var a of result.data){
                    //var bc=a.Invoice.toString();
                    //var doc=a.ExpanditurGoodId;
                    var inv=a.InvoiceNo.toString();
                    var bon=a.ExpenditureGoodNo;
                    if(!this.rowCount[inv]){
                        this.rowCount[inv]=1;
                    }
                    else{
                        this.rowCount[inv]++;
                    }
 
                    if(!rowDoc[bon+inv]){
                        index++;
                        //a.count=index;
                        rowDoc[bon+inv]=1;
                    }
                    else{
                        rowDoc[bon+inv]++;
                    }
                }
                for(var b of result.data){
                    let bcno=result.data.find(o=> o.InvoiceNo + o.ExpenditureGoodNo==b.InvoiceNo + b.ExpenditureGoodNo);
                    if(bcno){
                        bcno.docspan=rowDoc[b.ExpenditureGoodNo+b.InvoiceNo];
                    }
                    let invc=result.data.find(o=> o.InvoiceNo ==b.InvoiceNo);
                    if(invc){
                        invc.rowspan=this.rowCount[b.InvoiceNo];
                    }

                   }

                for(var item of result.data){
                
                    item.UnitQty = item.UnitQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.EGAmountIDR = item.EGAmountIDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.Quantity = item.Quantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.EAmountVLS = item.EAmountVLS.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.EAmountIDR = item.EAmountIDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.ReceiptQuantity = item.ReceiptQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2});
                    item.UAmountVLS = item.UAmountVLS.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    item.UAmountIDR = item.UAmountIDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                     
                }


                this.data=result.data;

            
            });
            
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.unit = null;
        this.data = [];
        
    }

    ExportToExcel() {
        let args = {            
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            unit : this.unit ? this.unit.Code : "",
            //unitname: this.unit ? this.unit.Name : "",
       
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
        return unitLoader;
    }

    unitView = (unit) => {
        return `${unit.Code}- ${unit.Name}`;
    }
}
