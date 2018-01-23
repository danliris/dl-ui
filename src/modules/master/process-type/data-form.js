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
    
    detailColumns = [{ header: "Jenis Proses" }, {header: "Jenis Order"}, {header: "Keterangan"}];
   

    orderFields=["name", "code"];

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.data.orderTypeId) {
            this.selectedOrder = await this.service.getOrderById(this.data.orderTypeId, this.orderFields);
            this.data.orderTypeId =this.selectedOrder._id;
        }
    }
    

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    selectedOrderChanged(newValue) {
        var _selectedOrder = newValue;
        if (_selectedOrder) {
            this.data.orderType = _selectedOrder;
            this.data.orderTypeId = _selectedOrder._id ? _selectedOrder._id : "";   
        }else{
            delete this.data.orderTypeId;
        }

    }

    get orderLoader() {
        return OrderLoader;
    }

    orderView = (order) => {
        return `${order.code} - ${order.name}`
    }

} 