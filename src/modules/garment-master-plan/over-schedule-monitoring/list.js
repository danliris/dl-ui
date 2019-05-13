import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var BuyerLoader=require('../../../loader/garment-buyers-loader');
var BookingOrderLoader=require('../../../loader/garment-booking-order-by-no-loader');
var SectionLoader = require('../../../loader/garment-sections-loader');
var ComodityLoader = require('../../../loader/garment-comodities-loader');

@inject(Router, Service)
export class List {
  constructor(router, service) {
        this.service = service;
        this.router = router;
    }
    get sectionLoader(){
        return SectionLoader;
    }

    get comodityLoader(){
        return ComodityLoader;
    }

    get buyerLoader(){
        return BuyerLoader;
    }
    get bookingOrderLoader(){
        return BookingOrderLoader;
    }    
     
    cancelStateOption = ["","Cancel Confirm","Cancel Sisa","Expired"];
    args = { page: 1,size:25};

    search(){
        this.args.page = 1;
        this.args.total = 0;
        this.searching();
    }

 searching() {
    var locale = 'id-ID';
    let info = {
            page: this.args.page,
            size: this.args.size,
            section:this.section? this.section.Code : "",
            bookingCode : this.no ? this.no.BookingOrderNo : "",
            buyer : this.buyerCode ? this.buyerCode.Code : "",
            comodity: this.comodity? this.comodity.Code : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            dateDeliveryFrom : this.dateDeliveryFrom ? moment(this.dateDeliveryFrom).format("YYYY-MM-DD") : "",
            dateDeliveryTo : this.dateDeliveryTo ? moment(this.dateDeliveryTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(JSON.stringify(info))
     
            .then(result => {
                this.data=result;
                var temp=[];
                var count=0;
                for(var item of this.data){
                    if(!temp[item.bookingCode]){
                        count=1;
                        temp[item.bookingCode]=count;
                    }
                    else{
                        count++;
                        temp[item.bookingCode]=count;
                        item.bookingCode=null;
                    }
                }
                
                for(var item of this.data){
                   if(item.bookingCode!=null){
                       item.row_count=temp[item.bookingCode];
                   }
                   item.week="W"+item.weekNum +" "+ moment(item.startDate).locale(locale).format("DD MMMM YYYY") +" s/d " + moment(item.endDate).locale(locale).format("DD MMMM YYYY");
                   item.bookingDate=moment(item.bookingDate).locale(locale).format("DD MMMM YYYY");
                   item.deliveryDate=moment(item.deliveryDate).locale(locale).format("DD MMMM YYYY");
                   item.bookingDeliveryDate=moment(item.bookingDeliveryDate).locale(locale).format("DD MMMM YYYY");
                }
                
            });
            
    }

    changePage(e) {
        var page = e.detail;
        this.args.page = page;
        this.searching();
    }   
    
    
    ExportToExcel() {
        var info = {
            section:this.section? this.section.Code : "",
            bookingCode : this.no ? this.no.BookingOrderNo : "",
            buyer : this.buyerCode ? this.buyerCode.Code : "",
            comodity: this.comodity? this.comodity.Code : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            dateDeliveryFrom : this.dateDeliveryFrom ? moment(this.dateDeliveryFrom).format("YYYY-MM-DD") : "",
            dateDeliveryTo : this.dateDeliveryTo ? moment(this.dateDeliveryTo).format("YYYY-MM-DD") : ""
        }
        this.service.generateExcel(JSON.stringify(info));
    }


      reset() {
        this.no = "";
        this.buyerCode="";
        this.section="";
        this.comodity="";
        this.dateFrom = "";
        this.dateTo = "";
        this.dateDeliveryFrom = "";
        this.dateDeliveryTo = "";
        
    }

    sectionView = (section) => {
        return `${section.Code} - ${section.Name}`
    }
    
    buyerView = (buyer) => {
        return `${buyer.Code} - ${buyer.Name}`
    }

    bookingOrderView = (bookingOrder) => {
        return `${bookingOrder.BookingOrderNo} `
    }

    
}