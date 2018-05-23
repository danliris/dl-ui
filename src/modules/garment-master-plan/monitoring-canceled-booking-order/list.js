import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var BuyerLoader=require('../../../loader/garment-buyers-loader');
var BookingOrderLoader=require('../../../loader/garment-booking-order-loader');

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

 searching() {
     
    var info = {
            code : this.code ? this.code.code : "",
            buyer : this.buyer ? this.buyer.name : "",
            cancelState : this.cancelState ? this.cancelState : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        
        this.service.search(info)
     
            .then(result => {
               this.data=result;console.log(result);
               this.data = [];
               var temp=result;
               var count=0;
               var _temp = {};
               var _temp2 = {};
               var _temp3 = {};
               var row_span_count=1;
               for (var pr of result) {
                  var _data = {};
                  var temporaryCancelSisa = {};
                  var temporaryExpired = {};  

                      _data.code=  pr.bookingCode;
                      _data.bookingDate =pr.bookingDate ? moment(pr.bookingDate).format("DD MMMM YYYY") : "";;
                      _data.buyer = pr.buyer;
                      _data.totalOrderEnd = pr.totalOrderQty;
                      _data.deliveryDateBooking = pr.deliveryDateBooking ? moment(pr.deliveryDateBooking).format("DD MMMM YYYY") : "";
                      _data.row_count=1;
                  
                      if((pr.canceledBookingOrder==0 || pr.canceledBookingOrder==undefined) && (pr.expiredBookingOrder==0 || pr.expiredBookingOrder==undefined)){
                        _data.totalOrderBeginning = pr.totalOrderQty;
                      } else if(pr.canceledBookingOrder>0 && pr.expiredBookingOrder>0){
                        _data.totalOrderBeginning = pr.totalOrderQty + pr.canceledBookingOrder + pr.expiredBookingOrder;
                      } else if(pr.canceledBookingOrder>0 && (pr.expiredBookingOrder==0 || pr.expiredBookingOrder==undefined)){
                        _data.totalOrderBeginning = pr.totalOrderQty + pr.canceledBookingOrder;
                      } else if((pr.canceledBookingOrder==0 || pr.canceledBookingOrder==undefined) && pr.expiredBookingOrder>0){
                        _data.totalOrderBeginning= pr.totalOrderQty + pr.expiredBookingOrder;
                      }

                    if(!pr.canceledItems) {
                        _data.comodity="";
                        _data.orderQty="";
                        _data.cancelConfirmDate="";
                        _data.deliveryDateConfirm="";
                        _data.remark="";
                    } else {
                        _data.comodity = pr.comodity;
                        _data.orderQty = pr.orderQty;
                        _data.cancelConfirmDate = pr.cancelConfirmDate ? moment(pr.cancelConfirmDate).format("DD MMMM YYYY") : "";
                        _data.deliveryDateConfirm = pr.deliveryDateConfirm ? moment(pr.deliveryDateConfirm).format("DD MMMM YYYY") : "";
                        _data.remark = pr.remark;
                    }

                    if(!_data.comodity){
                        if(pr.canceledBookingOrder>0 && (this.cancelState=='' || this.cancelState=='Cancel Sisa')){
                       
                            _data.cancelItemsDate=pr.canceledDate ? moment(pr.canceledDate).format("DD MMMM YYYY") : "";
                            _data.canceledQuantity=pr.canceledBookingOrder;
                            _data.cancelState="Cancel Sisa";
                        
                        } else if(pr.expiredBookingOrder>0 && (this.cancelState== '' || this.cancelState=='Expired')){
                        
                            _data.cancelItemsDate=pr.expiredDeletedDate ? moment(pr.expiredDeletedDate).format("DD MMMM YYYY") : "";
                            _data.canceledQuantity=pr.expiredBookingOrder;
                            _data.cancelState="Expired";
                        
                        } 
                    } else if(_data.comodity) {
                        _data.cancelItemsDate=pr.cancelItemsDate ? moment(pr.cancelItemsDate).format("DD MMMM YYYY") : "";
                        _data.canceledQuantity=pr.orderQty;
                        _data.cancelState="Cancel Confirm";
                    }
                    
                    if (_data.cancelItemsDate || (pr.canceledBookingOrder>0 || pr.expiredBookingOrder>0)){
                        if(this.cancelState!=="Cancel Confirm"){
                            if(pr.canceledBookingOrder>0 && pr.canceledItems && (_data.code!==_temp2.code || !_temp2.code) && (_data.cancelState!==_temp2.cancelState || !_temp2.cancelState) && this.cancelState!=="Expired"){ //&& _data.cancelState!=="Cancel Confirm"){  
                                _temp2.code=_data.code;
                                _temp2.cancelState=_data.cancelState;
                                temporaryCancelSisa.code=_data.code;
                                temporaryCancelSisa.bookingDate =_data.bookingDate;
                                temporaryCancelSisa.buyer = _data.buyer;
                                temporaryCancelSisa.totalOrderEnd = _data.totalOrderEnd
                                temporaryCancelSisa.deliveryDateBooking = _data.deliveryDateBooking;
                                temporaryCancelSisa.comodity = "";
                                temporaryCancelSisa.orderQty = "";
                                temporaryCancelSisa.cancelConfirmDate = "";
                                temporaryCancelSisa.deliveryDateConfirm = "";
                                temporaryCancelSisa.remark = "";
                                temporaryCancelSisa.totalOrderBeginning = _data.totalOrderBeginning;
                                temporaryCancelSisa.row_count=1;
                                temporaryCancelSisa.cancelItemsDate=pr.canceledDate ? moment(pr.canceledDate).format("DD MMMM YYYY") : "";
                                temporaryCancelSisa.canceledQuantity=pr.canceledBookingOrder;
                                temporaryCancelSisa.cancelState="Cancel Sisa";
                                count++;
                                this.data.push(temporaryCancelSisa);
                            } 
                            if(pr.expiredBookingOrder>0 && pr.canceledItems && (_data.code!==_temp3.code || !_temp3.code) && (_data.cancelState!==_temp3.cancelState || !_temp3.cancelState)&& this.cancelState!=="Cancel Sisa"){ //&& _data.cancelState!=="Cancel Confirm"){
                                _temp3.code=_data.code;
                                _temp3.cancelState=_data.cancelState;
                                temporaryExpired.code=_data.code;
                                temporaryExpired.bookingDate =_data.bookingDate;
                                temporaryExpired.buyer = _data.buyer;
                                temporaryExpired.totalOrderEnd = _data.totalOrderEnd
                                temporaryExpired.deliveryDateBooking = _data.deliveryDateBooking;
                                temporaryExpired.comodity = "";
                                temporaryExpired.orderQty = "";
                                temporaryExpired.cancelConfirmDate = "";
                                temporaryExpired.deliveryDateConfirm = "";
                                temporaryExpired.remark = "";
                                temporaryExpired.totalOrderBeginning = _data.totalOrderBeginning;
                                temporaryExpired.row_count=1;
                                temporaryExpired.cancelItemsDate=pr.expiredDeletedDate ? moment(pr.expiredDeletedDate).format("DD MMMM YYYY") : "";
                                temporaryExpired.canceledQuantity=pr.expiredBookingOrder;
                                temporaryExpired.cancelState="Expired";
                                count++;
                                this.data.push(temporaryExpired);
                            }
                        }
                        if(_temp.code == _data.code && _temp.cancelState == _data.cancelState){
                            _data.code=null;
                            _data.bookingDate=null;
                            _data.buyer=null;
                            _data.totalOrderEnd=null;
                            _data.deliveryDateBooking=null;
                            _data.totalOrderBeginning=null;
                            row_span_count=row_span_count+1;
                            _data.row_count=row_span_count;    
                        } else if((!_temp.code || _temp.code !== _data.code) ){//&& (_temp.cancelState !== _data.cancelState)){
                            _temp.code = _data.code;
                            _temp.cancelState = _data.cancelState;
                            row_span_count=1;
                        } else if(_temp.code==_data.code && _temp.cancelState!==_data.cancelState){
                            _temp.code = _data.code;
                            _temp.cancelState = _data.cancelState;
                            row_span_count=1;
                        }
                        
                        if(this.cancelState=="Cancel Sisa" || this.cancelState=="Expired"){
                            if(_data.cancelState!=="Cancel Confirm")
                                this.data.push(_data);
                        } else {
                            this.data.push(_data);
                            
                            if (this.data[count].row_count>1){
                                for(var x=_data.row_count;0<x;x--){
                                    if(this.data[count].cancelState=="Cancel Confirm")
                                    {var z=count-x;
                                    
                                    this.data[z+1].row_count=this.data[count].row_count;}
                                }    
                            } 
                            count++;            
                        }    
                    }
                 }
            });
            
            
    }
    
    ExportToExcel() {
        var info = {
            code : this.code ? this.code.code : "",
            buyer : this.buyer ? this.buyer.name : "",
            cancelState : this.cancelState ? this.cancelState : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.generateExcel(info);
    }


      reset() {
        this.code = "";
        this.buyer="";
        this.cancelState="";
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

    cancelStateChanged(e){
        var selectedCancelState= e.srcElement.value;
        this.cancelState="";
        if(selectedCancelState=="Cancel Confirm"){ 
            this.cancelState="Cancel Confirm";
        }else if(selectedCancelState=="Cancel Sisa"){
            this.cancelState="Cancel Sisa";
        }else if(selectedCancelState=="Expired"){  
            this.cancelState="Expired";
        }
        else{
            this.bookingOrderState="";
        }
    }
}