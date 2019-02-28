import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var BuyerLoader=require('../../../loader/garment-buyers-loader');
var BookingOrderLoader=require('../../../loader/garment-booking-order-by-no-loader');

@inject(Router, Service)
export class List {
  constructor(router, service) {
        this.service = service;
        this.router = router;
    }
    get buyerLoader(){
        return BuyerLoader;
    }
    get bookingOrderLoader(){
        return BookingOrderLoader;
    }    
     
    cancelStateOption = ["","Cancel Confirm","Cancel Sisa","Expired"];

    search(){
        this.info.page = 1;
        this.info.total=0;
        this.searching();
    }

 searching() {
     
    var info = {
            no : this.no ? this.no.BookingOrderNo : "",
            buyerCode : this.buyerCode ? this.buyerCode.Code : "",
            statusCancel : this.statusCancel ? this.statusCancel : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(info)
     
            .then(result => {
            //    this.data=result;
               this.data = [];
               for(var _data of result){
                   _data.EarlyBooking = _data.TotalBeginningQuantity;
                   _data.BookingOrderDate = _data.BookingOrderDate ? moment(_data.BookingOrderDate).format("DD MMMM YYYY") : "";
                   _data.DeliveryDate = _data.DeliveryDate ? moment(_data.DeliveryDate).format("DD MMMM YYYY") : "";
                   _data.ConfirmDate = _data.ConfirmDate ? moment(_data.ConfirmDate).format("DD MMMM YYYY") : "";
                   _data.DeliveryDateItem = _data.DeliveryDateItem ? moment(_data.DeliveryDateItem).format("DD MMMM YYYY") : "";
                   _data.CanceledDate = _data.CanceledDate ? moment(_data.CanceledDate).format("DD MMMM YYYY") : "";

                   this.data.push(_data);
               }
            
            });
            
            
    }
    
    ExportToExcel() {
        var info = {
            no : this.no ? this.no.BookingOrderNo : "",
            buyerCode : this.buyerCode ? this.buyerCode.Code : "",
            statusCancel : this.statusCancel ? this.statusCancel : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.generateExcel(info);
    }


      reset() {
        this.no = "";
        this.buyerCode="";
        this.statusCancel="";
        this.dateFrom = "";
        this.dateTo = "";
        
    }

    sectionView = (section) => {
        return `${section.code} - ${section.name}`
    }
    
    buyerView = (buyer) => {
        return `${buyer.Code} - ${buyer.Name}`
    }

    bookingOrderView = (bookingOrder) => {
        return `${bookingOrder.BookingOrderNo} `
    }

    cancelStateChanged(e){
        var selectedCancelState= e.srcElement.value;
        this.cancelState="";
        if(selectedCancelState=="Cancel Confirm"){ 
            this.statusCancel="Cancel Confirm";
        }else if(selectedCancelState=="Cancel Sisa"){
            this.statusCancel="Cancel Sisa";
        }else if(selectedCancelState=="Expired"){  
            this.statusCancel="Expired";
        }
    }
}