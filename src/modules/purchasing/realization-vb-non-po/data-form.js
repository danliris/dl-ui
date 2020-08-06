import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const UnitLoader = require('../../../loader/unit-loader');
var CurrencyLoader = require('../../../loader/currency-loader');
const VbLoader = require('../../../loader/vb-non-po-request-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedCurrency;
    @bindable unit;
    @bindable numberVB;
    @bindable selectedCurrency;
    @bindable division;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    controlOptionsLabel = {
        label: {
            length: 8
        },
        control: {
            length: 3
        }
    }

    controlOptionsDetail = {
        control: {
            length: 10
        }
    }

    NumberVbOptions = ["", "Dengan Nomor VB", "Tanpa Nomor VB"];

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.selectedCurrency = this.data.Currency;
        
        if (this.data.Unit && this.data.Unit.Id) {
            this.selectedUnit = this.data.Unit;
        }

        if (this.data.Division && this.data.Division.Id) {
            this.selectedDivision = this.data.Division;
        }

        if (this.data.numberVB && this.data.numberVB.VBNo) {
            this.numberVB = this.data.numberVB;
        }

        this.filter = {
            "Apporve_Status": true, "Realization_Status": false
        };

        if (this.data.TypeVBNonPO == "Tanpa Nomor VB") {

            // if (this.data.Unit && this.data.Unit.Id) {
            //     this.selectedUnit = this.data.Unit;
            // }

            if (this.data.Division && this.data.Division.Id) {
                this.selectedDivision = this.data.Division;
            }

            if (!this.data.Spinning1) {
                this.data.Spinning1 = false;
            }

            if (!this.data.Spinning2) {
                this.data.Spinning2 = false;
            }

            if (!this.data.Spinning3) {
                this.data.Spinning3 = false;
            }

            if (!this.data.Weaving1) {
                this.data.Weaving1 = false;
            }

            if (!this.data.Weaving2) {
                this.data.Weaving2 = false;
            }

            if (!this.data.Printing) {
                this.data.Printing = false;
            }

            if (!this.data.Finishing) {
                this.data.Finishing = false;
            }

            if (!this.data.Konfeksi1A) {
                this.data.Konfeksi1A = false;
            }

            if (!this.data.Konfeksi1B) {
                this.data.Konfeksi1B = false;
            }

            if (!this.data.Konfeksi2A) {
                this.data.Konfeksi2A = false;
            }

            if (!this.data.Konfeksi2B) {
                this.data.Konfeksi2B = false;
            }

            if (!this.data.Konfeksi2C) {
                this.data.Konfeksi2C = false;
            }

            if (!this.data.Umum) {
                this.data.Umum = false;
            }

            if (!this.data.Others) {
                this.data.Others = false;
                this.data.DetailOthers = "";
            }
        }
    }

    async numberVBChanged(newValue) {

        this.data.numberVB = newValue;

        if (this.data.numberVB) {
            this.data.UnitLoad = this.data.numberVB.UnitLoad;
            this.data.AmountVBReq = this.data.numberVB.Amount;
            // console.log(this.data.numberVB)
        }
        else {
            this.data.numberVB = {};

        }
    }

    columns = [
        { header: "Tanggal", value: "DateDetail" },
        { header: "Keterangan", value: "Remark" },
        { header: "Jumlah", value: "Amount" },
        { header: "Kena PPn", value: "isGetPPn" },
        { header: "PPH", value: "isGetPPh" },
        { header: "Total", value: "Total" }
    ];

    get addItems() {
        return (event) => {
            this.data.Items.push({})
        };
    }

    get vbLoader() {

        return VbLoader;
    }

    @bindable selectedUnit;
    selectedUnitChanged(newValue, oldValue) {

        if (this.selectedUnit && this.selectedUnit.Id) {
            this.data.unit = {};
            this.data.unit.id = this.selectedUnit.Id;
            this.data.unit.name = this.selectedUnit.Name;
            this.data.unit.code = this.selectedUnit.Code;

            if (this.selectedUnit.Division) {
                this.data.division = {};
                this.data.division.id = this.selectedUnit.Division.Id;
                this.data.division.name = this.selectedUnit.Division.Name;
            }
            else {
                this.data.division = {};
                this.data.division.id = this.data.Division.Id;
                this.data.division.name = this.data.Division.Name;
            }

        }
        else {
            this.data.unit.id = this.selectedUnit.id;
            this.data.unit.name = this.selectedUnit.name;
            this.data.unit.code = this.selectedUnit.code;
            this.data.unit.Division.Id = this.selectedUnit.divisionname;
            this.data.unit.Division.Name = this.selectedUnit.divisionid;
        }
    }



    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`

    }

    get unitLoader() {
        return UnitLoader;
    }

    get currencyLoader() {
        return CurrencyLoader;
    }

    @bindable selectedCurrency;
    selectedCurrencyChanged(newValue, oldValue) {
        this.data.Currency = newValue;
    }

    get getOthersValue() {
        if (this.data.DetailOthers == "") {
            return "..........";
        } else {
            return this.data.DetailOthers;
        }
    }

}
