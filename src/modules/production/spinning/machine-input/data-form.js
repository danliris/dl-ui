import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service, CoreService } from './service';
import { debug } from 'util';
import { Numeric } from '../../../../components/form/basic/numeric';

var UnitLoader = require('../../../../loader/unit-azure-loader');
var MaterialTypeLoader = require('../../../../loader/material-types-loader');
var LotConfigurationLoader = require('../../../../loader/lot-configuration-loader');

// var moment = require('moment');
@inject(Service, CoreService)
export class DataForm {
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable readOnly;
    @bindable data;
    @bindable error;
    @bindable title;
    @bindable unit;
    @bindable yarn;
    @bindable lot;
    @bindable processType;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        editText: "Ubah",
        deleteText: "Hapus",
    };
    typeOptions = []
    yarnTypeList = [
        "PCP",
        "CMP",
        "CD",
        "CVC",
        "PE",
        "TENCEL",
        "CUPRO",
        "PC-P 45"
    ];

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }
    itemColumns = ["Nomor Mesin", "Merk Mesin", "Input", "UOM"];
    spinningFilter = { "DivisionName.toUpper()": "SPINNING" };
    shiftOptions = ["Shift I: 06.00 – 14.00", "Shift II: 14.00 – 22.00", "Shift III: 22:00 – 06.00"]
    items = [];
    constructor(service, coreService) {
        this.service = service;
        this.coreService = coreService;
    }
    machineSpinningFilter = {};

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.coreService.getMachineTypes()
            .then(result => {
                this.typeOptions = result;
            });
        if (this.data.UnitDepartment && this.data.UnitDepartment.Id) {
            this.unit = this.data.UnitDepartment;
        }
        if (this.data.Yarn && this.data.Yarn.Id) {
            this.yarn = this.data.Yarn;
        }


    }

    inputInfo = {
        columns: [
            { header: "Nama Serat", value: "Product" },
            { header: "Komposisi", value: "Composition" },
        ],
        onAdd: function () {
            this.data.Details.push({ ProductName: {}, Hank: 0 });
        }.bind(this),
        onRemove: function () {
        }.bind(this)
    };

    addItemCallback = (e) => {
        this.data.Items = this.data.Items || [];
        this.data.Items.push({})
    };

    removeItemCallback(item, event) {
        this.data.Items.splice(item.context.Items.indexOf(Items.data), 1);
    }

    async unitChanged(newValue, oldValue) {
        if (this.unit && this.unit.Id) {
            this.data.UnitDepartmentId = this.unit.Id;

            if (this.data.UnitDepartmentId && this.data.ProcessType) {
                this.machineSpinningFilter.page = 1;
                this.machineSpinningFilter.size = 2147483647;
                this.machineSpinningFilter.order = { "No": "asc" }
                // this.machineSpinningFilter.filter = { "Type": this.data.ProcessType, "UnitId": this.data.UnitDepartmentId }
                this.filter = {};
                this.filter.Type = this.data.ProcessType;
                this.filter.UnitId = this.data.UnitDepartmentId.toString();
                this.machineSpinningFilter.filter = JSON.stringify(this.filter);

                this.data.Items = await this.coreService.searchMachineSpinning(this.machineSpinningFilter)
                    .then(results => {
                        var newItems = [];
                        for (var item of results.data) {
                            var newData = {};
                            newData.MachineSpinningNo = item.No;
                            newData.MachineSpinningName = item.Name;
                            newData.MachineSpinningUOM = item.UomUnit;
                            newData.MachineSpinningId = item.Id;
                            newItems.push(newData);
                        }
                        return newItems;
                    });

                this.items = this.data.Items;
            }
        }
    }

    lotChanged(n, o) {
        if (this.lot && this.lot.Id) {
            this.data.LotConfigurationId = this.lot.Id;
        }
    }

    yarnChanged(n,o){
        if (this.yarn && this.yarn.id) {
            this.data.YarnMaterialTypeId = this.yarn.id;
        }
    }

    async processTypeChanged(n,o){
        if (this.processType) {
            this.data.ProcessType = this.processType;

            if (this.data.UnitDepartmentId && this.data.ProcessType) {
                this.machineSpinningFilter.page = 1;
                this.machineSpinningFilter.size = 2147483647;
                this.machineSpinningFilter.order = { "No": "asc" }
                // this.machineSpinningFilter.filter = { "Type": this.data.ProcessType, "UnitId": this.data.UnitDepartmentId }
                this.filter = {};
                this.filter.Type = this.data.ProcessType;
                this.filter.UnitId = this.data.UnitDepartmentId.toString();
                this.machineSpinningFilter.filter = JSON.stringify(this.filter);

                this.data.Items = await this.coreService.searchMachineSpinning(this.machineSpinningFilter)
                    .then(results => {
                        var newItems = [];
                        for (var item of results.data) {
                            var newData = {};
                            newData.MachineSpinningNo = item.No;
                            newData.MachineSpinningName = item.Name;
                            newData.MachineSpinningUOM = item.UomUnit;
                            newData.MachineSpinningId = item.Id;
                            newItems.push(newData);
                        }
                        return newItems;
                    });

                this.items = this.data.Items;
            }
        }
    }

    get unitLoader() {
        return UnitLoader;
    }

    get materialTypeLoader() {
        return MaterialTypeLoader;
    }

    get lotConfigurationLoader() {
        return LotConfigurationLoader;
    }
} 