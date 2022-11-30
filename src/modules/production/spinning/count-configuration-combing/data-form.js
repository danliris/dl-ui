import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service, CoreService } from './service';
import { debug } from 'util';
import numeral from 'numeral';

//var lotConfigurationLoader = require('../../../../loader/lot-configuration-loader');

var moment = require('moment');
var MaterialTypeLoader = require('../../../../loader/spinning-material-types-loader');
var UnitLoader = require('../../../../loader/unit-loader');
var ProductLoader = require('../../../../loader/product-loader');

@inject(Service, CoreService)
export class DataForm {
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable readOnly;
    @bindable data = {};
    @bindable error;
    @bindable title;
    @bindable yarnType;
    @bindable count;
    @bindable detailOptions;
    @bindable unit;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        editText: "Ubah",
        deleteText: "Hapus",
    };


    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 5
        }
    }
    controlOptions3 = {
        label: {
            length: 1
        },
        control: {
            length: 5
        }
    }
    controlOptions2 = {
        label: {
            length: 4
        },
        control: {
            length: 7
        }
    }
    mixDrawing = false;


    detailOptions = {};
    constructor(service, coreService) {
        this.service = service;
        this.coreService = coreService;
        this.detailOptions.service = service;
        this.detailOptions.coreService = coreService;
    }

    bind(context) {
        this.context = context;
        console.log(this.context)
        this.data = this.context.data;
        this.error = this.context.error;

        this.processType = "Combing";

        if (!this.data.ProcessType) {
            this.data.ProcessType = this.processType;
        }
        if (!this.data.Id) {
            this.data.Grain = 1;
            this.data.Ne = 1;
            this.data.Eff = 1;
            this.data.RPM = 1;
            this.data.Standard = 1;
            this.data.TPI = 1;
            this.data.TotalDraft = 1;
            this.data.Constant = 1;
            if (this.data.ProcessType == 'Winder') {
                this.data.ConeWeight = 1.89;
            } else {
                this.data.ConeWeight = 1;
            }

        }
        if (this.data.UnitDepartment && this.data.UnitDepartment.Id) {
            this.unit = this.data.UnitDepartment;
        }
        if (this.data.MaterialType && this.data.MaterialType.Id) {
            this.yarnType = this.data.MaterialType;
        }
        this.showItemRegular = true;
        this.mixDrawing = false;
    }

    spinningFilter = { "DivisionName.toUpper()": "SPINNING" };

    unitChanged(newValue, oldValue) {
        if (this.unit && this.unit.Id) {
            this.data.UnitDepartmentId = this.unit.Id;
            this.detailOptions.UnitDepartmentId = this.unit.Id;
            this.data.MaterialComposition = [];
        }
    }

    yarnTypeChanged(n, o) {
        if (this.yarnType && this.yarnType.Id) {
            this.data.MaterialTypeId = this.yarnType.Id;
        }
    }

    // @computedFrom('data.Grain')
    // get count_Ne(){
    //     let count_Ne = 8.33 / 437.5 / this.data.Grain;
    //     count_Ne = numeral(count_Ne).format();
    //     this.data.count_Ne = numeral(count_Ne).value();

    //     return count_Ne;
    // }

    @computedFrom('data.Eff', 'data.RPM', 'data.TotalDraft', 'data.Grain')
    get CapacityPerShift(){
        let CapacityPerShift = (60 * 8 * this.data.RPM * (this.data.Eff/100) * 2 * 0.025 * 3.142 * (this.data.TotalDraft)) / (14 * 768 * 400 * (50.00000/this.data.Grain));
        console.log(CapacityPerShift)
        CapacityPerShift = numeral(CapacityPerShift).format();
        this.data.CapacityPerShift = numeral(CapacityPerShift).value();        

        return CapacityPerShift;
    }

    @computedFrom('data.CapacityPerDay')
    get CapacityPerDay(){
        let CapacityPerDay = this.data.CapacityPerShift * 3;
        CapacityPerDay = numeral(CapacityPerDay).format();
        this.data.CapacityPerDay = numeral(CapacityPerDay).value();

        return CapacityPerDay;
    }

    get yarnLoader() {
        return ProductLoader;
    }

    get materialTypeLoader() {
        return MaterialTypeLoader;
    }

    get unitLoader() {
        return UnitLoader;
    }
} 