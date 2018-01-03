import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var BookingLoader = require('../../../loader/garment-booking-order-loader');

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

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }
    detailColumns = [{ header: "Komoditi" },{ header: "Jumlah" },{header: "Keterangan"},{header: "Confirm"},{}];

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.booking = this.context.booking;
        console.log(this.data);
        if(this.data._id)
            this.bookingCode = `${this.data.bookingOrderNo} - ${this.data.garmentBuyerName}`;
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
            this.data.details = _selectedData.items;
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
            this.data.details = [];
        }
    }

    get bookingLoader() {
        return BookingLoader;
    }

    bookingView = (booking) => {
        return `${booking.code} - ${booking.garmentBuyerName}`
    }
} 