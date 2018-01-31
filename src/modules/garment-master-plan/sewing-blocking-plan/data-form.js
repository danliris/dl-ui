import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var BookingLoader = require('../../../loader/garment-booking-order-loader');
var moment = require('moment');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable isView = true;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedBookingOrder;
    @bindable booking = {};
    @bindable preview={};
    @bindable previewData;
    @bindable options = { buyerCode: "" };

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    filterBookingOrder = {
        "isMasterPlan":false,
        "isCanceled":false
    };

    months = ["Januari","Februari","Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    years = [];
    bookingItemColumns = [{ header: "Komoditi" },{ header: "Jumlah" },{header: "Keterangan"},{header: "Tanggal Pengiriman"}];
    
    detailColumns = [
        { header: "Confirm" },
        { header: "Komoditi" },
        { header: "SMV Sewing" },
        { header: "Unit" },
        { header: "Tahun" },
        { header: "Week" },
        { header: "Remaining AH" },
        { header: "Jumlah Order" },
        { header: "Keterangan" },
        { header: "Tanggal Pengiriman" },
        { header: "Efisiensi (%)" },
        { header: "EH Booking" },
        { header: "Sisa AH" },
        { header: "Plan Working Hours" }
    ]
    previewColumns = [{header : "Konveksi"}]

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
        var year = (new Date()).getFullYear();
        this.years.push(year);
        for(var a = 1; a < 5; a++){
            this.years.push(year + a);
        }
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.booking = this.context.booking;
        this.options.buyerCode = this.data.garmentBuyerCode;
        if(this.data._id){
            this.bookingCode = `${this.data.bookingOrderNo} - ${this.data.garmentBuyerName}`;
            this.options._id=this.data._id;
        }
        // if(this.data.details && this.data.details.length>0){
        //     for(var item of this.data.details){
        //         if(this.data.masterPlanComodityId)
        //            this.selectedComodity = this.data.masterPlanComodity;
        //     }
        // }
    }

    selectedBookingOrderChanged(newValue) {
        var _selectedData = newValue;
        if (_selectedData) {
            this.data.bookingOrderNo = _selectedData.code;
            this.data.bookingOrderId = _selectedData._id;
            this.data.garmentBuyerId = _selectedData.garmentBuyerId;
            this.data.garmentBuyerName = _selectedData.garmentBuyerName;
            this.data.garmentBuyerCode = _selectedData.garmentBuyerCode;
            this.data.bookingDate = _selectedData.bookingDate;
            this.data.deliveryDate = _selectedData.deliveryDate;
            this.data.quantity = _selectedData.orderQuantity;
            this.data.remark = _selectedData.remark;
            this.data.bookingItems = _selectedData.items;
            this.options.buyerCode = this.data.garmentBuyerCode;
        }else{
            delete this.data.bookingOrderNo;
            delete this.data.bookingOrderId;
            delete this.data.garmentBuyerId;
            delete this.data.garmentBuyerName;
            delete this.data.garmentBuyerCode;
            delete this.data.quantity;
            delete this.data.remark;
            delete this.data.bookingDate;
            delete this.data.deliveryDate;
            this.data.bookingItems = [];
        }
    }

    get bookingLoader() {
        return BookingLoader;
    }

    bookingView = (booking) => {
        return `${booking.code} - ${booking.garmentBuyerName}`
    }

    get addDetails() {
      return (event) => {
          var newDetail=   {
              isConfirmed: false,
              shSewing: 0,
              quantity: 0,
              remark:""
          };
          this.data.details.push(newDetail);
      };
    }

    async previewChange(event) {
        var month = this.getMonth(this.preview.month);
        var thisDate = new Date(`${this.preview.year}/${month - 1}/1`);
        var nextDate = thisDate.setMonth(thisDate.getMonth() + 6);
        var nextYear = new Date(nextDate).getFullYear();
        var workingHour = this.service.getWorkingHour();
        var weeklyPlan = this.service.getWeeklyPlan({"year" : {"$in" :[this.preview.year, nextYear]}});
        var preview = this.service.getPreview(2018);
        await Promise.all([workingHour, weeklyPlan, preview])
            .then(result => {
                var _workingHour = result[0];
                var _weeklyPlan = result[1];
                var _preview = result[2];
                var datas=[];
                console.log(_preview);
                return this.previewData=result;
            });
    }

    getMonth(month){
        var monthName = 0;
        switch(month){
            case "Januari":
                monthName = 1;
                break;
            case "Februari":
                monthName = 2;
                break;
            case "Maret":
                monthName = 3;
                break;
            case "April":
                monthName = 4;
                break;
            case "Mei":
                monthName = 5;
                break;
            case "Juni":
                monthName = 6;
                break;
            case "Juli":
                monthName = 7;
                break;
            case "Agustus":
                monthName = 8;
                break;
            case "September":
                monthName = 9;
                break;
            case "Oktober":
                monthName = 10;
                break;
            case "November":
                monthName = 11;
                break;
            case "Desember":
                monthName = 12;
                break;
        }
        return monthName;
    }
}