import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

var ProductLoader = require('../../../loader/product-purchasing-null-tags-loader');



@inject(Router, Service)
export class List {

    controlOptions = {
        label: {
          length: 4
        },
        control: {
          length: 4
        }
      }
    info = { 
        // comodityId:'', 
        // buyerId:'', 
        // orderTypeId:'', 
        // dateFrom:'', 
        // dateTo:'',
        page: 1,
        size:25
    };
    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    dateFrom = null;
    dateTo = null;
    productId = '';
    

    activate() {
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.salesContractNo = '';
        this.orderType = null;
        this.buyer = null;
        this.comodity = null;
        this.data = [];
    }
    
    
    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }
    search(){
        //  this.error = {};

        // if (Object.getOwnPropertyNames(this.error).length === 0) {
            //this.flag = true;
            // this.info.page = 1;
            // this.info.total=0;
            this.searching();
        
    }
    searching() {
        if (this.filter) {
            
            this.info.productId = this.filter.dataProduct ? this.filter.dataProduct.Id : 0;
           
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";

            console.log(this.info);
        } 
        this.service.search(this.info)
            .then(result => {
                //this.info.total=result.info.total; 
                this.data = result.data;
                console.log(this.data.length);
                var rowDoc=[];
                var index=0;
                console.log(result);
                for (var a of result.data ){

                    var doc=a.Code;
                   // var  = a.Jumlah;

                    // if(!this.rowCount[doc]){
                    //     this.rowCount[doc]=1;
                    // }
                    // else{
                    //     this.rowCount[doc]++;
                    // }


                    if(!rowDoc[doc]){
                        index++;
                        //a.count=index;
                        rowDoc[doc]=1;
                    }

                    else{
                        rowDoc[doc]++;
                    }
                }

                for (var _data of result.data)
                {
                    console.log(_data.Code);
                    let code=result.data.find(o=> o.Code == _data.Code);
                            // if(invoice){
                            //     invoice.rowspan=this.rowCount[_data.InvoiceNo];
                            // }

                           // let bcno=result.data.find(o=> o.BCType + o.BCNo==b.BCType + b.BCNo);
                            if(code){
                                code.docspan=rowDoc[_data.Code];
                            }
                    _data.DiffPricePercentage = _data.DiffPricePercentage.toLocaleString('en-EN', { minimumFractionDigits: 2 });
                    _data.DiffPrice = _data.DiffPrice.toLocaleString('en-EN', { minimumFractionDigits: 2 });
                    _data.PriceOrigin = _data.PriceOrigin.toLocaleString('en-EN', { minimumFractionDigits: 2 });
                    _data.Price = _data.Price.toLocaleString('en-EN', { minimumFractionDigits: 2 });
                }
                // for(var a of this.data){
                //     a.deliverySchedule=moment(item.deliverySchedule).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.deliverySchedule).format("DD MMM YYYY");
                // }
            })
    }

    ExportToExcel() {
        if (this.filter) {
            this.info.no = this.filter.salesContractNo ? this.filter.salesContractNo.SalesContractNo : null;
            this.info.buyerCode = this.filter.buyer ? this.filter.buyer.Code : null;
            this.info.orderTypeCode=this.filter.orderType ? this.filter.orderType.Code : null;
            this.info.comodityCode = this.filter.comodity ? this.filter.comodity.Code : null;
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        } else {
            this.info = {};
        }
        this.service.generateExcel(this.info);
    }

   
    get productLoader() {
        return ProductLoader;
      }
      isPostedQuery = {
        "Active": true
      }
  
    reset() {
        this.filter.salesContractNo=null;
        this.filter.buyer=null;
        this.filter.comodity=null;
        this.filter.dateFrom=null;
        this.filter.dateTo=null;
        this.filter.orderType=null;
        this.filter = {};
    }

buyerView = (buyer) => {
      return `${buyer.Code} - ${buyer.Name}`;
  }

}