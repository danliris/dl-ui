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
               this.args.total=result.info.total; 
               var _temp = {};
               var row_span_count=1;
               this.temp=[];
               var temps={};
               var count=0;

               for (var prs of result.data) {
                   temps.bookingCode=prs.BookingOrderNo;
                   temps.orderQty=prs.OrderQuantity;
                   this.temp.push(temps);
                }

               for(var _data of result.data){
                   _data.EarlyBooking = _data.TotalBeginningQuantity;
                   _data.BookingOrderDate = _data.BookingOrderDate ? moment(_data.BookingOrderDate).locale(locale).format("DD MMMM YYYY") : "";
                   _data.DeliveryDate = _data.DeliveryDate ? moment(_data.DeliveryDate).locale(locale).format("DD MMMM YYYY") : "";
                   _data.ConfirmDate = _data.ConfirmDate ? moment(_data.ConfirmDate).locale(locale).format("DD MMMM YYYY") : "";
                   _data.DeliveryDateItem = _data.DeliveryDateItem ? moment(_data.DeliveryDateItem).locale(locale).format("DD MMMM YYYY") : "";
                   _data.CanceledDate = _data.CanceledDate ? moment(_data.CanceledDate).locale(locale).format("DD MMMM YYYY") : "";

                   if(_temp.code == _data.BookingOrderNo){
                    _data.BookingOrderNo=null;
                    _data.BookingOrderDate=null;
                    _data.BuyerName=null;
                    _data.OrderQuantity=null;
                    _data.DeliveryDate=null;
                    _data.EarlyBooking=null;
                    row_span_count=row_span_count+1;
                    _data.row_count=row_span_count;
                    
                } else if(!_temp.code || _temp.code!=_data.BookingOrderNo){
                    _temp.code=_data.BookingOrderNo;
                    row_span_count=1;
                    _data.row_count=row_span_count;
                }

                   this.data.push(_data);

                   if (this.data[count].row_count>1){

                    for(var x=_data.row_count;0<x;x--){
                        var z=count-x;
                        
                        this.data[z+1].row_count=this.data[count].row_count;
                    }    
                  }

                count++; 
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