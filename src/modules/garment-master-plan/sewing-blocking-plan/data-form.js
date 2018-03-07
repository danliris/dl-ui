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
    //@bindable previewDataTable;
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
        "isCanceled": false,
        "orderQuantity":{
            $gt:0
        }
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
    ];
    previewColumns = [{ header: "Konveksi" }];

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
        var year = (new Date()).getFullYear();
        this.years.push(year);
        for (var a = 1; a < 5; a++) {
            this.years.push(year + a);
        }
        this.previewData = [];
        this.previewData1 = [];
    }

    selectedBookingOrderChanged(newValue) {
        var _selectedData = newValue;
        if (_selectedData) {
            this.data.bookingOrderNo = _selectedData.code;
            this.data.bookingOrderId = _selectedData._id;
            this.data.garmentBuyerId = _selectedData.garmentBuyerId;
            this.data.garmentBuyerName = _selectedData.garmentBuyerName;
            this.data.garmentBuyerCode = _selectedData.garmentBuyerCode;
            if (!this.data._id) {
                if(this.data && this.data.details && this.data.details.length > 0){
                    for(var detail of this.data.details){
                        let cat=detail.weeklyPlanYear.toString() + detail.unit.code.toString()+detail.week.weekNumber.toString();
                        let uniq = this.data.details.find(o => {
                            if(o.weeklyPlanYear && o.unit && o.week){
                                if( o.weeklyPlanYear.toString() + o.unit.code.toString() + o.week.weekNumber.toString()  == cat)
                                return o;
                            }
                        });
                        let item = this.previewData.find(o => (o.year.toString() + o.unitCode.toString()) == (detail.weeklyPlanYear.toString() + detail.unit.code.toString()));
                        if(uniq){
                            if(item)
                                item[detail.week.weekNumber]=uniq.remainingEH;
                            else {
                                let item1 = this.previewData1.find(o => (o.year.toString() + o.unitCode.toString()) == (detail.weeklyPlanYear.toString() + detail.unit.code.toString()));
                                if(item1){
                                    item1[detail.week.weekNumber]=uniq.remainingEH;
                                }
                            }
                        }
                    }
                    var count = this.data.details.length;
                    for(var a = count; a >= 0; a--){
                        this.data.details.splice((a-1), 1);
                    }
                }
                this.data.bookingDate = _selectedData.bookingDate;
                this.data.deliveryDate = _selectedData.deliveryDate;
                this.data.quantity = _selectedData.orderQuantity;
                this.data.remark = _selectedData.remark;
                this.data.bookingItems = _selectedData.items;
                this.options.buyerCode = this.data.garmentBuyerCode;
            }
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

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.booking = this.context.booking;
        this.options.buyerCode = this.data.garmentBuyerCode;
        if (this.data._id) {
            this.bookingCode = `${this.data.bookingOrderNo} - ${this.data.garmentBuyerName}`;
            this.options._id = this.data._id;
            this.remaining=[];
            // if(this.data.details){
            //     for(var item of this.data.details){

            //     }
            // }
            // this.selectedBookingOrder={
            //     code:this.data.bookingOrderNo,
            //     garmentBuyerName:this.data.garmentBuyerName
            // };
            this.selectedBookingOrder = await this.service.getBookingById(this.data.bookingOrderId);
            
        }
        if (!this.isView) {
            this.previewDataTable1=[];
            this.previewDataTable=[];
            var year = (new Date()).getFullYear();
            var month = (new Date()).getMonth();
            var yr = {
                year: { "$in": [year, year + 1] }
            }
            //this.previewWeeklyPlan = await this.service.getPreview(2018);
            this.previewWeeklyPlan = await this.service.getWeeklyPlan(yr);
            
            
            // var weeklength=[];
            // var o=[];
            
            
            // console.log(this.previewWeeklyPlan);
            
            let prev = [];//for preview year now
            let prev1 = []; //for preview next year
            let weekLength=0; 
            for (var a of this.previewWeeklyPlan) {
                if (a.year === year) {
                    prev.push(a);
                }
            }
            //assign columns
            this.columnPreview =[];
            if(prev.length>0){
                this.columnPreview = [{ field: "year", title: "Tahun" }, { field: "unitCode", title: "Unit" }];
                for (var i of prev[0].items) {
                    this.columnPreview.push({ field: i.weekNumber, title: "W" + i.weekNumber + " " + moment(i.endDate).format("DD MMM") });
                }
            }
            for (var a of this.previewWeeklyPlan) {
                if (a.year === year + 1) {
                    prev1.push(a);
                }
            }
            this.columnPreview1=[];
            if(prev1.length>0){
                this.columnPreview1= [{ field: "year", title: "Tahun" }, { field: "unitCode", title: "Unit" }];
                for (var i of prev1[0].items) {
                    this.columnPreview1.push({ field: i.weekNumber, title: "W" + i.weekNumber + " " + moment(i.endDate).format("DD MMM") });
                }
            }
            var options = {
                pagination: false,
                showColumns: false,
                search: false,
                showToggle: false,
                columns: this.columnPreview
            };
            var options1 = {
                pagination: false,
                showColumns: false,
                search: false,
                showToggle: false,
                columns: this.columnPreview1
            };

            this.context.previewTable.__table("refreshOptions", options);
            this.context.previewTable1.__table("refreshOptions", options1);

            //assign data
            var total=[];
            for (var a of prev) {
                let obj = {};
                obj.year = a.year;
                obj.unitCode = a.unit.code;
                for (var b of a.items) {
                    obj[b.weekNumber] = b.remainingEH;
                    if(!total[b.weekNumber]){
                        total[b.weekNumber]=b.remainingEH;
                    }
                    else{
                        total[b.weekNumber]+=b.remainingEH;
                    }
                }
                this.previewDataTable.push(obj);
                this.previewData.push(obj);
            }
            var x={
                year:'',
                unitCode:"Total"
            }
            for (var i = 1; i < total.length; i++) {
                x[i]=total[i];
            }

            this.previewDataTable.push(x);
            this.previewData.push(x);
            var total1=[];
            for (var a of prev1) {
                let obj = {};
                obj.year = a.year;
                obj.unitCode = a.unit.code;
                for (var b of a.items) {
                    obj[b.weekNumber] = b.remainingEH;
                    if(!total1[b.weekNumber]){
                        total1[b.weekNumber]=b.remainingEH;
                    }
                    else{
                        total1[b.weekNumber]+=b.remainingEH;
                    }
                }
                this.previewDataTable1.push(obj);
                this.previewData1.push(obj);
            }
            var x1={
                year:'',
                unitCode:"Total"
            }
            //sum EH per week
            for (var i = 1; i < total1.length; i++) {
                x1[i]=total1[i];
            }
            this.previewDataTable1.push(x1);
            this.previewData1.push(x1);
        }
    }



    detailsChanged(e) {
        let group = {};
        //this.previewDataTable =this.previewData;
        //this.previewDataTable = JSON.parse(JSON.stringify(this.previewData));
        //console.log(this.options);
        
        if (this.data.details) {
            var remEH=[];
            for (let detail of this.data.details) {
                if(detail.weeklyPlanYear && detail.unit && detail.week){
                    let cat=detail.weeklyPlanYear.toString() + detail.unit.code.toString()+detail.week.weekNumber.toString();
                    let uniq = this.data.details.find(o => {
                        if(o.weeklyPlanYear && o.unit && o.week){
                            if( o.weeklyPlanYear.toString() + o.unit.code.toString() + o.week.weekNumber.toString()  == cat)
                            return o;
                        }
                    });
                    let item = this.previewData.find(o => (o.year.toString() + o.unitCode.toString()) == (detail.weeklyPlanYear.toString() + detail.unit.code.toString()));
                    if(item){
                        remEH[cat]=item[detail.week.weekNumber];
                    }
                    if(this.tempEH){
                        if(remEH[cat]){
                            if(remEH[cat]<this.tempEH[cat]){
                                remEH[cat]=this.tempEH[cat];
                            }
                        }
                    }
                    else{
                        let item1 = this.previewData1.find(o => (o.year.toString() + o.unitCode.toString()) == (detail.weeklyPlanYear.toString() + detail.unit.code.toString()));
                        if(item1){
                            remEH[cat]=item1[detail.week.weekNumber];
                        }
                    }
                    if(remEH[cat]){
                        if(remEH[cat]<uniq.remainingEH){
                            remEH[cat]=uniq.remainingEH;
                        }
                    }
                    else{
                        remEH[cat]=uniq.remainingEH;
                    }
                }
                if(detail.oldVal){
                    if(detail.oldVal.year && detail.oldVal.unitCode && detail.oldVal.weekNumber){
                        let cat=detail.oldVal.year.toString() + detail.oldVal.unitCode.toString()+ detail.oldVal.weekNumber.toString();
                        if(remEH[cat]){
                            if(remEH[cat]<detail.oldVal.remainingEH){
                                remEH[cat]=detail.oldVal.remainingEH;
                            }
                        }
                        else{
                            remEH[cat]=detail.oldVal.remainingEH;
                        }
                    }
                }
                if(detail.oldVal){
                    if(detail.oldVal.year && detail.oldVal.unitCode){
                        let item = this.previewData.find(o => (o.year.toString() + o.unitCode.toString()) == (detail.oldVal.year.toString() + detail.oldVal.unitCode.toString()));
                        if (item) {
                            item[detail.oldVal.weekNumber] = detail.oldVal.remainingEH;
                            var total=[];
                            for( var a =0; a<this.previewData.length-1; a++){
                                if(!total[detail.oldVal.weekNumber]){
                                    total[detail.oldVal.weekNumber]=this.previewData[a][detail.oldVal.weekNumber];
                                }
                                else{
                                    total[detail.oldVal.weekNumber]+=this.previewData[a][detail.oldVal.weekNumber];
                                }
                            }
                            let totalItem=this.previewData.find(o => (o.year.toString() ==''&& o.unitCode.toString()) == "Total");
                            totalItem[detail.oldVal.weekNumber]=total[detail.oldVal.weekNumber];
                        }
                        else{
                            let item1 = this.previewData1.find(o => (o.year.toString() + o.unitCode.toString()) == (detail.oldVal.year.toString() + detail.oldVal.unitCode.toString()));
                            if (item1) {
                                item1[detail.oldVal.weekNumber] = detail.oldVal.remainingEH;
                                var total1=[];
                                for( var a =0; a<this.previewData1.length-1; a++){
                                    if(!total1[detail.oldVal.weekNumber]){
                                        total1[detail.oldVal.weekNumber]=this.previewData1[a][detail.oldVal.weekNumber];
                                    }
                                    else{
                                        total1[detail.oldVal.weekNumber]+=this.previewData1[a][detail.oldVal.weekNumber];
                                    }
                                }
                                let totalItem1=this.previewData1.find(o => (o.year.toString() ==''&& o.unitCode.toString()) == "Total");
                                totalItem1[detail.oldVal.weekNumber]=total1[detail.oldVal.weekNumber];
                            }
                        }
                    }
                    detail.oldVal={};
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
                    let item = this.previewData.find(o => (o.year.toString() + o.unitCode.toString()) == category);
                    //console.log(category);
                    if (item) {
                        item[detail.week.weekNumber] = detail.sisaEH;
                        var total=[];
                        for( var a =0; a<this.previewData.length-1; a++){
                            if(!total[detail.week.weekNumber]){
                                total[detail.week.weekNumber]=this.previewData[a][detail.week.weekNumber];
                            }
                            else{
                                total[detail.week.weekNumber]+=this.previewData[a][detail.week.weekNumber];
                            }
                        }
                        let totalItem=this.previewData.find(o => (o.year.toString() ==''&& o.unitCode.toString()) == "Total");
                        totalItem[detail.week.weekNumber]=total[detail.week.weekNumber];
                    }
                    else{
                        let item1 = this.previewData1.find(o => (o.year.toString() + o.unitCode.toString()) == category);
                        if (item1) {
                            item1[detail.week.weekNumber] = detail.sisaEH;
                            var total1=[];
                            for( var a =0; a<this.previewData1.length-1; a++){
                                if(!total1[detail.week.weekNumber]){
                                    total1[detail.week.weekNumber]=this.previewData1[a][detail.week.weekNumber];
                                }
                                else{
                                    total1[detail.week.weekNumber]+=this.previewData1[a][detail.week.weekNumber];
                                }
                            }
                            let totalItem1=this.previewData1.find(o => (o.year.toString() ==''&& o.unitCode.toString()) == "Total");
                            totalItem1[detail.week.weekNumber]=total1[detail.week.weekNumber];
                        }
                    }
                }
            }
            this.tempEH=[];
            for(let eh of this.data.details){
                if(eh.weeklyPlanYear && eh.unit && eh.week){
                    let cat=eh.weeklyPlanYear.toString() + eh.unit.code.toString()+eh.week.weekNumber.toString();
                    if(!this.tempEH[cat]){
                        this.tempEH[cat]=eh.remainingEH;
                    }
                }
            }
        }

        this.context.previewTable.refresh();
        this.context.previewTable1.refresh();

        //this.previewDataTable;
    }

    get removeDetails() {
        return (event) => //console.log(event.detail);
        {
            this.previewDataTable = []

            if (event.detail) {
                for (let detail of this.data.details) {
                    if(event.detail.weeklyPlanYear && event.detail.unit && event.detail.week){
                        let remCat=event.detail.weeklyPlanYear.toString() + event.detail.unit.code.toString() + event.detail.week.weekNumber.toString();
                        let category = event.detail.weeklyPlanYear.toString() + event.detail.unit.code.toString();
                        let item = this.previewData.find(o => (o.year.toString() + o.unitCode.toString()) == category);
                        if (item) {
                            item[event.detail.week.weekNumber] = event.detail.week.remainingEH;
                            var total=[];
                            for( var a =0; a<this.previewData.length-1; a++){
                                if(!total[event.detail.week.weekNumber]){
                                    total[event.detail.week.weekNumber]=this.previewData[a][event.detail.week.weekNumber];
                                }
                                else{
                                    total[event.detail.week.weekNumber]+=this.previewData[a][event.detail.week.weekNumber];
                                }
                            }
                            let totalItem=this.previewData.find(o => (o.year.toString() ==''&& o.unitCode.toString()) == "Total");
                            totalItem[event.detail.week.weekNumber]=total[event.detail.week.weekNumber];
                        }
                        else{
                            let item1 = this.previewData1.find(o => (o.year.toString() + o.unitCode.toString()) == category);
                            if (item1) {
                                item1[event.detail.week.weekNumber] = event.detail.week.remainingEH;
                                var total1=[];
                                for( var a =0; a<this.previewData1.length-1; a++){
                                    if(!total1[event.detail.week.weekNumber]){
                                        total1[event.detail.week.weekNumber]=this.previewData1[a][event.detail.week.weekNumber];
                                    }
                                    else{
                                        total1[event.detail.week.weekNumber]+=this.previewData1[a][event.detail.week.weekNumber];
                                    }
                                }
                                let totalItem1=this.previewData1.find(o => (o.year.toString() ==''&& o.unitCode.toString()) == "Total");
                                totalItem1[event.detail.week.weekNumber]=total1[event.detail.week.weekNumber];
                            }
                        }
                    }
                }
                    var remEH=[];
                    for (let detail of this.data.details) {
                        if(detail.weeklyPlanYear && detail.unit && detail.week && event.detail.weeklyPlanYear && event.detail.unit.code && event.detail.week.weekNumber){
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
                    for (let detail of this.data.details) {
                        if(detail.weeklyPlanYear && detail.unit && detail.week && event.detail.weeklyPlanYear && event.detail.unit.code && event.detail.week.weekNumber){
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
                    if(event.detail.weeklyPlanYear && event.detail.unit.code && event.detail.week.weekNumber){
                        let category = event.detail.weeklyPlanYear.toString() + event.detail.unit.code.toString();
                        let item = this.previewData.find(o => (o.year.toString() + o.unitCode.toString()) == category);
                        if (item) {
                            item[event.detail.week.weekNumber] = event.detail.remainingEH;
                            var total=[];
                            for( var a =0; a<this.previewData.length-1; a++){
                                if(!total[event.detail.week.weekNumber]){
                                    total[event.detail.week.weekNumber]=this.previewData[a][event.detail.week.weekNumber];
                                }
                                else{
                                    total[event.detail.week.weekNumber]+=this.previewData[a][event.detail.week.weekNumber];
                                }
                            }
                            let totalItem=this.previewData.find(o => (o.year.toString() ==''&& o.unitCode.toString()) == "Total");
                            totalItem[event.detail.week.weekNumber]=total[event.detail.week.weekNumber];
                        }
                        else{
                            let item1 = this.previewData1.find(o => (o.year.toString() + o.unitCode.toString()) == category);
                            if (item1) {
                                item1[event.detail.week.weekNumber] = event.detail.remainingEH;
                                var total1=[];
                                for( var a =0; a<this.previewData1.length-1; a++){
                                    if(!total1[event.detail.week.weekNumber]){
                                        total1[event.detail.week.weekNumber]=this.previewData1[a][event.detail.week.weekNumber];
                                    }
                                    else{
                                        total1[event.detail.week.weekNumber]+=this.previewData1[a][event.detail.week.weekNumber];
                                    }
                                }
                                let totalItem1=this.previewData1.find(o => (o.year.toString() ==''&& o.unitCode.toString()) == "Total");
                                totalItem1[event.detail.week.weekNumber]=total1[event.detail.week.weekNumber];
                            }
                        }
                    }
                }
            }

            this.context.previewTable.refresh();
            this.context.previewTable1.refresh();
        };

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
                deliveryDate: "",
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



    // getMonth(month) {
    //     var monthName = 0;
    //     switch (month) {
    //         case "Januari":
    //             monthName = 1;
    //             break;
    //         case "Februari":
    //             monthName = 2;
    //             break;
    //         case "Maret":
    //             monthName = 3;
    //             break;
    //         case "April":
    //             monthName = 4;
    //             break;
    //         case "Mei":
    //             monthName = 5;
    //             break;
    //         case "Juni":
    //             monthName = 6;
    //             break;
    //         case "Juli":
    //             monthName = 7;
    //             break;
    //         case "Agustus":
    //             monthName = 8;
    //             break;
    //         case "September":
    //             monthName = 9;
    //             break;
    //         case "Oktober":
    //             monthName = 10;
    //             break;
    //         case "November":
    //             monthName = 11;
    //             break;
    //         case "Desember":
    //             monthName = 12;
    //             break;
    //     }
    //     return monthName;
    // }
}