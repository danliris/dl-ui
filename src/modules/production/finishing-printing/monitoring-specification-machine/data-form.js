import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from './service';
// import moment from 'moment';



var MachineLoader = require('../../../../loader/machines-loader');
var ProductionOrderLoader = require('../../../../loader/production-order-loader');

@inject(Service)
export class DataForm {
    @bindable infoArea;
    // @bindable infoArea2;

    @bindable readOnly = false;
    @bindable data = {};
    @bindable error;
    @bindable Machine;
    @bindable ProductionOrder;
    @bindable title;

    auInputOptions = {
        label: {
            length: 4,
            align: "right"
        },
        control: {
            length: 5
        }
    };

    yearOptions = [];
    areaOptions = [];

    // areaOptions2 = [];
    monthOptions = [
        { text: "Januari", value: 1 },
        { text: "Februari", value: 2 },
        { text: "Maret", value: 3 },
        { text: "April", value: 4 },
        { text: "Mei", value: 5 },
        { text: "Juni", value: 6 },
        { text: "Juli", value: 7 },
        { text: "Agustus", value: 8 },
        { text: "September", value: 9 },
        { text: "Oktober", value: 10 },
        { text: "November", value: 11 },
        { text: "Desember", value: 12 },
    ];
    areaOptionsHard = [
        { text: "DIGITAL PRINT", value: 1 },
        { text: "DYEING", value: 2 },
        { text: "FINISHING", value: 3 },
        { text: "PRETREATMENT", value: 4 },
        { text: "PRINTING", value: 5 },
            ];

 

    bind(context) {
        this.context = context;
        this.infoArea = "";
        // this.infoArea2 = "";
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        // this.info.month = this.monthOptions[new Date().getMonth()];
        // this.info.year = new Date().getFullYear();
        this.infoAreaHard="";
    }

    constructor(service) {
        this.service = service;
        this.showMonth = true;

        let yearList = []
        for (var i = 2021; i <= new Date().getFullYear() + 9; i++) {
            yearList.push({ text:i, value:i });
        }
        this.yearOptions = yearList
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    // get isFilterMachineType() {
    //     this.filterMachineType = {
    //         "machineType.code": this.data.machineType.code
    //     };
    //     return this.filterMachineType;
    // }

    // itemsColumns = [
    //     { header: "Indicator", value: "Indicator" },
    //     { header: "Value", value: "DefaultValue" },
    //     { header: "Satuan", value: "Uom" },
    // ]

    // IndicatorsHeader = {
    //     Columns: [
    //         { header: "Indikator", value: "Indicator" },
    //         { header: "Value", value: "DefaultValue" },
    //         { header: "Satuan", value: "Uom" },
    //     ],
    //     onRemove: function () {
    //         console.log("remove");
    //     }.bind(this)
    // };
    // areaOptions2
    // async bind(context) {
    //     this.data = context.data;
    //     this.error = context.error;
    //     this.service.getAreaBaru().then(result => {
    //         let areaList2 = [];
    //         if (result !== null){ 
    //             result.map(x => {
    //                 areaList2.push({ text: x.name, value: x.id});
    //             });
    //             this.areaOptions2 = areaList2;
    //             this.infoArea2 = areaList2[0];
    //         }
    //     });
    // }


    async MachineChanged(newValue) {
        this.resetErrors();
        this.data.Machine = newValue;
        if (this.data.Machine) {
            var items = [];
            var machineTypeId = this.data.Machine.MachineType.Id;
            var MachineType = await this.service.getMachineType(machineTypeId);

            for (var indicator of MachineType.Indicators) {
                var item = {
                    Indicator: indicator.Indicator,
                    DataType: indicator.DataType,
                    DefaultValue: indicator.DefaultValue,
                    Value: "",
                    Uom: indicator.Uom,
                };
                items.push(item);
            }
            console.log(items)
            this.data.Details = items;

        } else {
            this.Machine = {};
            this.data.Machine = {};
            this.data.Details = [];
            this.dataCollection.refresh();
        }
    }

    get machineLoader() {
        return MachineLoader;
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    ProductionOrderChanged(newValue) {
        if (this.ProductionOrder) {
            this.data.ProductionOrder = this.ProductionOrder;
        } else {
            this.ProductionOrder = {};
            this.data.ProductionOrder = {};
        }
    }

    resetErrors() {

        this.context.error = {};
        // this.data.items = []

    }


    activate() {

    }

    attached() {

    }

} 