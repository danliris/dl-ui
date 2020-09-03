import { inject, bindable, computedFrom } from 'aurelia-framework';
import { months } from '../../../../../node_modules/moment/moment';
var moment = require('moment');
var MachineLoader = require('../../../../loader/machines-loader');
export class DataForm {
    @bindable title;
    @bindable readOnly;

    // itemYears = [];

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    };

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    constructor(service) {
        this.service = service;

    }

    detailOptions = {};
    areaOptions = ["", "Area Pre Treatment", "Area Dyeing", "Area Printing", "Area Finishing", "Area QC"];
    shiftOptions = ['', 'Shift I: 06.00 – 14.00', 'Shift II: 14.00 – 22.00', 'Shift III: 22:00 – 06.00'];
    groupOptions = ['', 'A', 'B', 'C'];

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        if (this.data.Machine) {
            this.machine = this.data.Machine;
            if (this.machine.UseBQBS) {
                this.productionOrderItemColumns = ["No. Order", "Kecepatan (Mtr/Menit)", "BQ", "BS"];
            } else {
                this.productionOrderItemColumns = ["No. Order", "Kecepatan (Mtr/Menit)", "Input", "Output"];
            }
        }
    }

    get machineLoader() {
        return MachineLoader;
    }

    addLossEventItemCallback = (e) => {
        this.data.DailyMonitoringEventLossEventItems = this.data.DailyMonitoringEventLossEventItems || [];
        this.data.DailyMonitoringEventLossEventItems.push({})
    };

    addProductionOrderItemCallback = (e) => {
        this.data.DailyMonitoringEventProductionOrderItems = this.data.DailyMonitoringEventProductionOrderItems || [];
        this.data.DailyMonitoringEventProductionOrderItems.push({})
    };

    @bindable machine;
    machineChanged(n, o) {
        if (this.machine) {
            this.data.Machine = this.machine;

            if (this.machine.UseBQBS) {
                this.productionOrderItemColumns = ["No. Order", "Kecepatan (Mtr/Menit)", "BQ", "BS"];
            } else {
                this.productionOrderItemColumns = ["No. Order", "Kecepatan (Mtr/Menit)", "Input", "Output"];
            }
        } else {
            this.data.Machine = null
        }
    }
    productionOrderItemColumns = ["No. Order", "Kecepatan (Mtr/Menit)", "Input", "Output"];
    lossEventItemColumns = ["Kode Loss", "Kategori Loss", "Losses", "Keterangan", "Waktu (Menit)"];
}