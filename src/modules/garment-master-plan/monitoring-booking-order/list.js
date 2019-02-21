import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var BuyerLoader=require('../../../loader/garment-buyers-loader');
var BookingOrderLoader=require('../../../loader/garment-booking-order-loader');
var ComodityLoader=require('../../../loader/garment-comodities-loader');
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
    bookingOrderStateOption = ["","Booking","Confirmed","Sudah Dibuat Master Plan"];

    searching() {
     
    var info = {
            
            SectionName : this.section ? this.SectionName : "",
            BookingOrderNo : this.BookingOrderNo ? this.BookingOrderNo : "",
            BuyerName : this.buyer ? this.BuyerName : "",
            ComodityName : this.comodity ? this.ComodityName : "",
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
               console.log(info);
               var counter = 1;
               var remain=0;
               var temp=result;
               this.temp=[];
               var bookingNo="";
               var temps={};
               var count=0;
               
            for (var prs of result) {
                temps.BookingOrderNo=prs.BookingOrderNo;
                temps.OrderQuantity=prs.OrderQuantity;
                this.temp.push(temps);
              
            }
            var _temp = {};
            var row_span_count=1;
               for (var pr of result) {
                  var _data = {};
                  
                        _data.BookingOrderNo=  pr.BookingOrderNo;
                        _data.BookingOrderDate =pr.BookingOrderDate ? moment(pr.BookingOrderDate).format("DD MMMM YYYY") : "";;
                        _data.BuyerName = pr.BuyerName;
                        _data.OrderQuantity = pr.OrderQuantity;
                        _data.DeliveryDate=  pr.DeliveryDate ? moment(pr.DeliveryDate).format("DD MMMM YYYY") : "";
                        _data.ConfirmDate=  pr.ConfirmDate ? moment(pr.ConfirmDate).format("DD MMMM YYYY") : "";
                        _data.ComodityName =pr.ComodityName;
                        _data.ConfirmQuantity = pr.ConfirmQuantity;
                        _data.DeliveryDateItems = pr.DeliveryDateItems ? moment(pr.DeliveryDateItems).format("DD MMMM YYYY") : "";
                        _data.Remark = pr.Remark;  

                        var today=new Date();
                        var a = new Date(_data.DeliveryDateItems);
                        var b = today;
                        a.setHours(0,0,0,0);
                        b.setHours(0,0,0,0);
                        var diff=a.getTime() - b.getTime();
                        var timeDiff = a.getTime() - b.getTime();
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                        
                        if(diffDays>0 && diffDays<=45){
                        _data.diffDeliveryDateBooking = diffDays;
                        } else if(diffDays<=0 || diffDays>45){
                        _data.diffDeliveryDateBooking = '-';
                        }

                        if(pr.DeliveryDateItems=="")
                        {
                        _data.StatuConfirm="Belum Dikonfirmasi";
                        }else
                        {
                        _data.StatuConfirm="Sudah Dikonfirmasi";
                        }

                        if(pr.IsBlockingPlan ==true)
                        {
                        _data.StatusBooking="Sudah Dibuat Master Plan";   
                        }else if(pr.IsBlockingPlan == false && pr.IsCanceled==false)
                        {
                        if(pr.Items==undefined){
                            _data.StatusBooking="Booking";
                        } else if(pr.Items){
                            _data.StatusBooking="Confirmed";
                        }  
                        }
                    for(var item of  temp)
                    {
                        if(pr.BookingOrderNo == item.BookingOrderNo)
                        {
                            remain = remain + item.OrderQuantity;
                            _data.remaining = remain ? pr.ConfirmQuantity - remain : pr.ConfirmQuantity;
                        }
                    }
                    
                    if(_temp.BookingOrderNo == _data.BookingOrderNo){
                        _data.BookingOrderNo=null;
                        _data.BookingOrderDate=null;
                        _data.BuyerName=null;
                        _data.ConfirmQuantity=null;
                        _data.DeliveryDateItems=null;
                        _data.confirmState=null;
                        _data.bookingOrderState=null;
                        _data.remaining=null;
                        _data.diffDeliveryDateBooking=null;
                        row_span_count=row_span_count+1;
                        _data.row_count=row_span_count;
                        
                    } else if(!_temp.BookingOrderNo || _temp.BookingOrderNo!=pr.bookingCode){
                        _temp.BookingOrderNo=_data.BookingOrderNo;
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
            });
    }

    ExportToExcel() {
        var info = {
            section : this.section ? this.section.code.code : "",
            BookingOrderNo : this.BookingOrderNo ? this.BookingOrderNo : "",
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
        this.BookingOrderNo = "";
        this.buyer="";
        this.comodity="";
        this.confirmState="";
        this.bookingOrderState="";
        this.dateFrom = "";
        this.dateTo = "";
        
    }

    sectionView = (section) => {
        return `${section.Code} - ${section.Name}`
    }
    
    buyerView = (buyer) => {
        return `${buyer.Name} `
    }

    bookingOrderView = (bookingOrder) => {
        return `${bookingOrder.BookingOrderNo} `
    }
    comodityView = (comodity) => {
        return `${comodity.Code}-${comodity.Name} `
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