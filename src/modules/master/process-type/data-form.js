import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var OrderLoader = require('../../../loader/order-type-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedOrder;
    @bindable selectedStyle;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    }
    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }

    // detailColumns = [{ header: "Jenis Proses" }, { header: "Jenis Order" }, { header: "Keterangan" }];


    orderFields = ["name", "code"];

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        // if (this.data.orderTypeId) {
        //     this.selectedOrder = await this.service.getOrderById(this.data.orderTypeId, this.orderFields);
        //     this.data.orderTypeId = this.selectedOrder._id;
        // }
    }


    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    selectedOrderChanged(newValue) {
        var _selectedOrder = newValue;
        if (_selectedOrder) {
            this.data.OrderType = _selectedOrder;
            // this.data.orderTypeId = _selectedOrder.Id ? _selectedOrder.Id : "";
        } else {
            // delete this.data.orderTypeId;
            this.selectedOrder = {};
        }

    }

    get orderLoader() {
        return OrderLoader;
    }

    orderView = (order) => {
        return `${order.Code ? order.Code : ""} - ${order.Name}`
    }

} 