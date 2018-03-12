import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var BuyerLoader=require('../../../loader/garment-buyers-loader');
var BookingOrderLoader=require('../../../loader/garment-booking-order-loader');
var ComodityLoader=require('../../../loader/garment-master-plan-comodity-loader');
var SectionLoader=require('../../../loader/garment-sections-loader');

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
     get sectionLoader(){
        return SectionLoader;
     }
    
     
    confirmStateOption = ["","Belum Dikonfirmasi","Sudah Dikonfirmasi"];
    bookingOrderStateOption = ["","Booking","Confirmed","Sudah Dibuat Master Plan"];//,"Booking Dibatalkan"];
 searching() {
     
    var info = {
            
            section : this.section ? this.section.code.code : "",
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
               this.row_temp = [];
               var counter = 1;
               var remain=0;
               var temp=result;
               this.temp=[];
               var bookingNo="";
               var temps={};
               var count=0;
               
            for (var prs of result) {
                temps.bookingCode=prs.bookingCode;
                temps.orderQty=prs.orderQty;
                this.temp.push(temps);
              
            }
            var _temp = {};
            var row_span_count=1;
               for (var pr of result) {
                  var _data = {};
                  
                      _data.code=  pr.bookingCode;
                      _data.bookingDate =pr.bookingDate ? moment(pr.bookingDate).format("DD MMMM YYYY") : "";;
                      _data.buyer = pr.buyer;
                      _data.totalOrderQty = pr.totalOrderQty;
                      _data.deliveryDateConfirm=  pr.deliveryDateConfirm ? moment(pr.deliveryDateConfirm).format("DD MMMM YYYY") : "";
                      _data.confirmDate=  pr.confirmDate ? moment(pr.confirmDate).format("DD MMMM YYYY") : "";
                      _data.comodity =pr.comodity;
                      _data.orderQty = pr.orderQty;
                      _data.deliveryDateBooking = pr.deliveryDateBooking ? moment(pr.deliveryDateBooking).format("DD MMMM YYYY") : "";
                      _data.remark = pr.remark;  

                      var today=new Date();
                      var a = new Date(_data.deliveryDateBooking);
                      var b = today;
                      a.setHours(0,0,0,0);
                      b.setHours(0,0,0,0);
                      var diff=a.getTime() - b.getTime();
                      var timeDiff = a.getTime() - b.getTime();
                      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    //   console.log(pr.items);
                      
                      if(diffDays>0 && diffDays<=45){
                        _data.diffDeliveryDateBooking = diffDays;
                      } else if(diffDays<=0 || diffDays>45){
                        _data.diffDeliveryDateBooking = '-';
                      }

                      if(pr.deliveryDateConfirm=="")
                      {
                        _data.confirmState="Belum Dikonfirmasi";
                      }else
                      {
                        _data.confirmState="Sudah Dikonfirmasi";
                      }
                    //   if(pr.isCanceled==true)
                    //   {
                    //     _data.bookingOrderState="Booking Dibatalkan";
                    //   }
                    //   else 
                      if(pr.isMasterPlan ==true)
                      {
                        _data.bookingOrderState="Sudah Dibuat Master Plan";   
                      }else if(pr.isMasterPlan == false && pr.isCanceled==false)
                      {
                        if(pr.items==undefined){
                            _data.bookingOrderState="Booking";
                        } else if(pr.items){
                            _data.bookingOrderState="Confirmed";
                        }  
                      }
                    for(var item of  temp)
                    {
                        if(pr.bookingCode == item.bookingCode)
                        {
                            remain = remain + item.orderQty;
                            _data.remaining= remain ? pr.totalOrderQty-remain :pr.totalOrderQty;
                        }
                      
                    }
                    
                    
                    if(_temp.code == _data.code){
                        _data.code=null;
                        _data.bookingDate=null;
                        _data.buyer=null;
                        _data.totalOrderQty=null;
                        _data.deliveryDateBooking=null;
                        _data.confirmState=null;
                        _data.bookingOrderState=null;
                        _data.remaining=null;
                        _data.diffDeliveryDateBooking=null;
                        row_span_count=row_span_count+1;
                        _data.row_count=row_span_count;
                        
                    } else if(!_temp.code || _temp.code!=pr.bookingCode){
                        _temp.code=_data.code;
                        row_span_count=1;
                        _data.row_count=row_span_count;
                    }
                    // console.log(_data.row_count);
                

                    remain=0;
                    this.data.push(_data);
                    
                    if (this.data[count].row_count>1){
                        for(var x=_data.row_count;0<x;x--){
                            var z=count-x;
                            
                            this.data[z+1].row_count=this.data[count].row_count;
                        }    
                    }
                    
                 count++;    
                 counter ++;
                 }
                //  console.log(this.data)                 
            });
            
    }
    ExportToExcel() {
        var info = {
            section : this.section ? this.section.code.code : "",
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
        this.section = "";
        this.code = "";
        this.buyer="";
        this.comodity="";
        this.confirmState="";
        this.bookingOrderState="";
        this.dateFrom = "";
        this.dateTo = "";
        
    }

    sectionView = (section) => {
        return `${section.code} - ${section.name}`
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
        }else if(selectedBookingOrder=="Confirmed"){
            this.bookingOrderState="Confirmed";
        }else if(selectedBookingOrder=="Sudah Dibuat Master Plan"){  
            this.bookingOrderState="Sudah Dibuat Master Plan";
        }
        // else  if(selectedBookingOrder=="Booking Dibatalkan"){
        //     this.bookingOrderState="Booking Dibatalkan";
        // }
        else{
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