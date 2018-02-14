import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var BookingLoader = require('../../../loader/garment-booking-order-loader');
var moment = require('moment');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable isView = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedBookingOrder;
    @bindable booking = {};
    @bindable preview = {};
    @bindable previewData;
    @bindable previewDataTable;
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
        "isMasterPlan": false,
        "isCanceled": false
    };

    months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    years = [];
    bookingItemColumns = [{ header: "Komoditi" }, { header: "Jumlah" }, { header: "Keterangan" }, { header: "Tanggal Pengiriman" }];

    detailColumns = [
        { header: "Confirm" },
        { header: "Komoditi" },
        { header: "SMV Sewing" },
        { header: "Unit" },
        { header: "Tahun" },
        { header: "Week" },
        { header: "Remaining EH" },
        { header: "Jumlah Order" },
        { header: "Keterangan" },
        { header: "Tanggal Pengiriman" },
        { header: "Efisiensi (%)" },
        { header: "EH Booking" },
        { header: "Sisa EH" },
        //{ header: "Plan Working Hours" }
    ]
    previewColumns = [{ header: "Konveksi" }]

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
        var year = (new Date()).getFullYear();
        this.years.push(year);
        for (var a = 1; a < 5; a++) {
            this.years.push(year + a);
        }
        this.previewData = [];
        this.previewDataTable = [];
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.booking = this.context.booking;
        this.options.buyerCode = this.data.garmentBuyerCode;
        if (this.data._id) {
            this.bookingCode = `${this.data.bookingOrderNo} - ${this.data.garmentBuyerName}`;
            this.options._id = this.data._id;
            // this.selectedBookingOrder={
            //     code:this.data.bookingOrderNo,
            //     garmentBuyerName:this.data.garmentBuyerName
            // };
            this.selectedBookingOrder = await this.service.getBookingById(this.data.bookingOrderId);
            for (var e of this.data.details){
                e.first=true;
            }
        }
        if (!this.isView) {
            var year = (new Date()).getFullYear();
            var month = (new Date()).getMonth();
            var yr = {
                year: { "$in": [year, year + 1] }
            }
            //this.previewWeeklyPlan = await this.service.getPreview(2018);
            this.previewWeeklyPlan = await this.service.getWeeklyPlan(yr);
            this.columnPreview = [{ field: "year", title: "Tahun" }, { field: "unitCode", title: "Unit" }];
            // var weeklength=[];
            // var o=[];
            for (var i = 1; i <= 53; i++) {
                this.columnPreview.push({ field: i, title: "W" + i });
            }
            // console.log(this.previewWeeklyPlan);
            
            let prev = [];
            for (var a of this.previewWeeklyPlan) {
                if (a.year === year) {
                    prev.push(a);
                }
            }
            for (var a of this.previewWeeklyPlan) {
                if (a.year === year + 1) {
                    prev.push(a);
                }

            }

            var options = {
                pagination: false,
                showColumns: false,
                search: false,
                showToggle: false,
                columns: this.columnPreview
            };

            this.context.previewTable.__table("refreshOptions", options);

            for (var a of prev) {
                let obj = {};
                obj.year = a.year;
                obj.unitCode = a.unit.code;
                for (var b of a.items) {
                    obj[b.weekNumber] = b.remainingEH;
                }

                this.previewData.push(obj);
            }
            
        }
    }

    detailsChanged(e) {
        let group = {};
        this.previewDataTable = [];
        //this.previewDataTable =this.previewData;
        //this.previewDataTable = JSON.parse(JSON.stringify(this.previewData));
        //console.log(this.options);
        console.log(this.data.details);
        
        if (this.data.details) {
            var remEH=[];
            for (let detail of this.data.details) {
                if(detail.weeklyPlanYear && detail.unit && detail.week){
                    let cat=detail.weeklyPlanYear.toString() + detail.unit.code.toString()+detail.week.weekNumber.toString();
                    let uniq = this.data.details.find(o => (o.weeklyPlanYear.toString() + o.unit.code.toString() + o.week.weekNumber.toString())  == cat);
                    remEH[cat]=uniq.remainingEH;
                    
                }
                console.log(detail);
                if(detail.oldVal){
                    console.log(detail.oldVal);
                    if(detail.oldVal.year && detail.oldVal.unitCode){
                        let item = this.previewData.find(o => (o.year.toString() + o.unitCode.toString()) == (detail.oldVal.year.toString() + detail.oldVal.unitCode.toString()));
                        if (item) {
                            item[detail.oldVal.weekNumber] = detail.oldVal.remainingEH;
                        }
                    }
                }
            }
            //console.log(remEH);
            
            for (let detail of this.data.details) {
                if(detail.weeklyPlanYear && detail.unit && detail.week){
                    let category = detail.weeklyPlanYear.toString() + detail.unit.code.toString();
                    let cat=detail.weeklyPlanYear.toString() + detail.unit.code.toString()+detail.week.weekNumber.toString();
                    //let cat=detail.weeklyPlanYear.toString() + detail.unit.code.toString()+detail.week.weekNumber.toString();
                    // //console.log(category );
                     detail.remainingEH= remEH[cat];
                     detail.sisaEH=detail.remainingEH-detail.ehBooking;
                     remEH[cat]-=detail.ehBooking;
                     console.log(remEH[cat]);
                    let item = this.previewData.find(o => (o.year.toString() + o.unitCode.toString()) == category);
                    //console.log(category);
                    if (item) {
                        // console.log(item[item.unitCode]);
                        // console.log(detail.ehBooking);
                        // debugger;
                        item[detail.week.weekNumber] = detail.sisaEH;
                        //console.log(item[detail.week.weekNumber]);
                    }
                }
            }

        }
        this.context.previewTable.refresh();

        //this.previewDataTable;
    }

    get removeDetails() {
        return (event) => //console.log(event.detail);
        {
            this.previewDataTable = []

            if (event.detail) {
                for (let detail of this.data.details) {
                    let remCat=event.detail.weeklyPlanYear.toString() + event.detail.unit.code.toString() + event.detail.week.weekNumber.toString();
                    let category = event.detail.weeklyPlanYear.toString() + event.detail.unit.code.toString();
                    let item = this.previewData.find(o => (o.year.toString() + o.unitCode.toString()) == category);
                    if (item) {
                        item[event.detail.week.weekNumber] = event.detail.week.remainingEH;
                        //console.log(event.detail.week.remainingEH);
                    }
                }
                    var remEH=[];
                    for (let detail of this.data.details) {
                        if(detail.weeklyPlanYear && detail.unit && detail.week){
                            let remCat=event.detail.weeklyPlanYear.toString() + event.detail.unit.code.toString() + event.detail.week.weekNumber.toString();
                            let cat=detail.weeklyPlanYear.toString() + detail.unit.code.toString()+detail.week.weekNumber.toString();
                            let uniq = this.data.details.find(o => (o.weeklyPlanYear.toString() + o.unit.code.toString() + o.week.weekNumber.toString())  == cat);
                            if(cat===remCat){
                                if(uniq.remainingEH<event.detail.remainingEH){
                                    remEH[cat]=event.detail.remainingEH;
                                }
                                else{
                                    remEH[cat]=uniq.remainingEH;
                                }
                            }
                            else{
                                remEH[cat]=uniq.remainingEH;
                            }
                        }
                    }
                    console.log(remEH);
                    for (let detail of this.data.details) {
                        if(detail.weeklyPlanYear && detail.unit && detail.week){
                            let cat=detail.weeklyPlanYear.toString() + detail.unit.code.toString()+detail.week.weekNumber.toString();
                            let remCat=event.detail.weeklyPlanYear.toString() + event.detail.unit.code.toString() + event.detail.week.weekNumber.toString();
                            //let cat=detail.weeklyPlanYear.toString() + detail.unit.code.toString()+detail.week.weekNumber.toString();
                            // //console.log(category );
                            // detail.remainingEH= remEH[cat];
                            // remEH[cat]-=detail.week.usedEH;
                            if(cat==remCat){
                                detail.remainingEH=remEH[cat];
                                detail.sisaEH=detail.remainingEH-detail.ehBooking;
                                remEH[cat]-=detail.ehBooking;
                                //console.log(remEH[cat]);
                            }
                            
                        }
                    }
                if(!this.data.detail){
                    let category = event.detail.weeklyPlanYear.toString() + event.detail.unit.code.toString();
                    let item = this.previewData.find(o => (o.year.toString() + o.unitCode.toString()) == category);
                    if (item) {
                        item[event.detail.week.weekNumber] = event.detail.remainingEH;
                    }
                }
            }

            

            console.log(this.previewData);
            this.context.previewTable.refresh();
        };

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
        } else {
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
            var newDetail = {
                index:this.data.details ? this.data.details.length : 0,
                isConfirmed: false,
                shSewing: 0,
                quantity: 0,
                remark: ""
            };
            this.data.details.push(newDetail);
        };
    }
    // async previewChange(event) {
    //     var month = this.getMonth(this.preview.month);
    //     var thisDate = new Date(`${this.preview.year}/${month - 1}/1`);
    //     var nextDate = thisDate.setMonth(thisDate.getMonth() + 6);
    //     var nextYear = new Date(nextDate).getFullYear();
    //     var workingHour = this.service.getWorkingHour();
    //     var weeklyPlan = this.service.getWeeklyPlan({"year" : {"$in" :[this.preview.year, nextYear]}});
    //     var preview = this.service.getPreview(2018);
    //     await Promise.all([workingHour, weeklyPlan, preview])
    //         .then(result => {
    //             var _workingHour = result[0];
    //             var _weeklyPlan = result[1];
    //             var _preview = result[2];
    //             var datas=[];
    //             console.log(_preview);
    //             return this.previewData=result;
    //         });
    // }



    getMonth(month) {
        var monthName = 0;
        switch (month) {
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