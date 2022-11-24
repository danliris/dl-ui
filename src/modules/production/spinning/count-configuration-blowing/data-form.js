import { inject, bindable, observable, computedFrom } from 'aurelia-framework'
import { Service, CoreService } from './service';
import numeral from 'numeral';
var moment = require('moment');

numeral.defaultFormat("0,000.000000");

const NumberFormat = "0,0.00";

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

        this.processType = "Blowing";

        if (!this.data.ProcessType) {
            this.data.ProcessType = this.processType;
        }

        if (!this.data.Id) {
            this.data.Grain = 1;
            //this.data.Ne = 1;
            this.data.Eff = 100;
            this.data.RPM = 1;
            this.data.Standard = 1;
            this.data.LapWeight = 1; //new
            this.data.TPI = 1;
            this.data.TotalDraft = 1;
            this.data.Constant = 1;
            this.data.ConeWeight = 1;
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

        }
    }

    yarnTypeChanged(n, o) {
        if (this.yarnType && this.yarnType.Id) {
            this.data.MaterialTypeId = this.yarnType.Id;
        }
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

    @computedFrom('data.Grain')
    get Ne() {
        let Ne = (8.33 / 437.5 / this.data.Grain);

        this.data.Ne = Ne
        Ne = numeral(Ne).format();

        return Ne;
    }

    @computedFrom('data.RPM', 'data.Eff', 'data.Ne')
    get CapacityPerShift() {
        let CapacityPerShift = (60 * 8 * this.data.RPM * (this.data.Eff/100) * 0.24 * 3.1428) / (768 * 400 * this.data.Ne);

        this.data.CapacityPerShift = CapacityPerShift;
        CapacityPerShift = numeral(CapacityPerShift).format();

        return CapacityPerShift;
    }

    @computedFrom('data.CapacityPerShift')
    get CapacityPerDay() {
        let CapacityPerDay = 3 * this.data.CapacityPerShift;

        this.data.CapacityPerDay = CapacityPerDay;
        CapacityPerDay = numeral(CapacityPerDay).format();

        return CapacityPerDay;
    }
    
    @computedFrom('data.CapacityBale')
    get CapacityKG() {
        let CapacityKG = this.data.CapacityBale * 181.44;

        this.data.CapacityKG = CapacityKG;
        CapacityKG = numeral(CapacityKG).format();

        return CapacityKG;
    }

    @computedFrom('data.CapacityKG')
    get CapacityKGPerHour() {
        let CapacityKGPerHour = this.data.CapacityKG / 8;

        this.data.CapacityKGPerHour = CapacityKGPerHour;
        CapacityKGPerHour = numeral(CapacityKGPerHour).format();

        return CapacityKGPerHour;
    }
} 