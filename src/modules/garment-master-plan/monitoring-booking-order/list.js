import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var BuyerLoader=require('../../../loader/garment-buyers-loader');
var BookingOrderLoader=require('../../../loader/garment-booking-order-loader');
var ComodityLoader=require('../../../loader/garment-master-plan-comodity-loader');

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
     get comodityLoader(){
        return ComodityLoader;
    }
     
    confirmStateOption = ["","Belum Dikonfirmasi","Sudah Dikonfirmasi"];
    bookingOrderStateOption = ["","Booking","Sudah Dibuat Master Plan","Booking Dibatalkan"];
 searching() {
     
    var info = {
            
            code : this.code ? this.code.code : "",
            buyer : this.buyer ? this.buyer.name : "",
            comodity : this.comodity ? this.comodity.name : "",
            confirmState : this.confirmState ? this.confirmState : "",
            bookingOrderState : this.bookingOrderState ? this.bookingOrderState : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(info)
     
            .then(result => {
               this.data=result;
               this.data = [];
               var counter = 1;
               var remain=0;
               var temp=result;
               this.temp=[];
               var bookingNo="";
               var temps={};
               
            for (var prs of result) {
                temps.bookingCode=prs.bookingCode;
                temps.orderQty=prs.orderQty;
                this.temp.push(temps);
              
            }
           
               for (var pr of result) {
            
                  var _data = {};
               
                     _data.code=  pr.bookingCode;
                      _data.bookingDate =pr.bookingDate;
                      _data.buyer = pr.buyer;
                      _data.totalOrderQty = pr.totalOrderQty;
                      _data.deliveryDateConfirm=  pr.deliveryDateConfirm ? moment(pr.deliveryDateConfirm).format("DD MMMM YYYY") : "";
                      _data.confirmDate=  pr.confirmDate ? moment(pr.confirmDate).format("DD MMMM YYYY") : "";
                      _data.comodity =pr.comodity;
                      _data.orderQty = pr.orderQty;
                      _data.deliveryDateBooking = pr.deliveryDateBooking ? moment(pr.deliveryDateBooking).format("DD MMMM YYYY") : "";
                      _data.remark = pr.remark;                   

                      if(pr.deliveryDateConfirm=="")
                      {
                        _data.confirmState="Belum Dikonfirmasi";
                      }else
                      {
                        _data.confirmState="Sudah Dikonfirmasi";
                      }
                      if(pr.isCanceled==true)
                      {
                        _data.bookingOrderState="Booking Dibatalkan";
                      }else if(pr.isMasterPlan ==true)
                      {
                        _data.bookingOrderState="Sudah Dibuat Master Plan";   
                      }else if(pr.isMasterPlan == false && pr.isCanceled==false)
                      {
                        _data.bookingOrderState="Booking";
                      }
                    for(var item of  temp)
                    {
                        if(pr.bookingCode == item.bookingCode)
                        {
                            remain = remain + item.orderQty;
                            _data.remaining= remain ? pr.totalOrderQty-remain :pr.totalOrderQty;
                        }
                      
                    }
                    remain=0;
                      this.data.push(_data);
                    
                 counter ++;
                 }
              
            });
    }
    ExportToExcel() {
        var info = {
            
            code : this.code ? this.code.code : "",
            buyer : this.buyer ? this.buyer.name : "",
            comodity : this.comodity ? this.comodity.name : "",
            confirmState : this.confirmState ? this.confirmState : "",
            bookingOrderState : this.bookingOrderState ? this.bookingOrderState : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.generateExcel(info);
    }


      reset() {
        this.code = "";
        this.buyer="";
        this.comodity="";
        this.confirmState="";
        this.bookingOrderState="";
        this.dateFrom = "";
        this.dateTo = "";
        
    }

    
    buyerView = (buyer) => {
        return `${buyer.name} `
    }

    bookingOrderView = (bookingOrder) => {
        return `${bookingOrder.code} `
    }
    comodityView = (comodity) => {
        return `${comodity.code}-${comodity.name} `
    }

    bookingOrderStateChanged(e){
        var selectedBookingOrder= e.srcElement.value;
        this.bookingOrderState="";
        if(selectedBookingOrder=="Booking"){ 
            this.bookingOrderState="Booking";
        }
       else if(selectedBookingOrder=="Sudah Dibuat Master Plan")
       {  
            this.bookingOrderState="Sudah Dibuat Master Plan";
       }else  if(selectedBookingOrder=="Booking Dibatalkan")
       {
            this.bookingOrderState="Booking Dibatalkan";
        }else
        {
            this.bookingOrderState="";
        }
    }

      confirmStateChanged(e){
        var selectedConfirm= e.srcElement.value;
        this.confirmState="";
        if(selectedConfirm="Belum Dikonfirmasi"){
      
          this.confirmState="Belum Dikonfirmasi";
        }else  if(selectedConfirm="Sudah Dikonfirmasi")
        {
            this.confirmState="Sudah Dikonfirmasi";
        }else
        {
            this.confirmState="";
        }
      }
}