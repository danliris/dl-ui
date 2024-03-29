import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

// var CategoryLoader = require('../../../../loader/category-loader');
// var UnitLoader = require('../../../../loader/unit-loader');
var AccountingCategoryLoader = require('../../../../loader/accounting-category-loader');
var AccountingUnitLoader = require('../../../../loader/accounting-unit-loader');
let DivisionLoader = require("../../../../loader/division-loader");
var UnitReceiptNoteLoader = require('../../../../loader/unit-receipt-note-basic-loader');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;
    }
    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }
    bind() {
        this.reset();
    }
    get unitReceiptNoteLoader() {
        return UnitReceiptNoteLoader;
    }
    unitReceiptNoteView = (unitReceiptNote) => {
        return `${unitReceiptNote.no} `
    }
    // get categoryLoader() {
    //     return CategoryLoader;
    // }
    // categoryView = (category) => {
    //     return `${category.code} - ${category.name}`
    // }
    // get unitLoader() {
    //     return UnitLoader;
    // }
    // unitView = (unit) => {
    //     return `${unit.Code} - ${unit.Name}`
    // }
    get accountingCategoryLoader() {
        return AccountingCategoryLoader;
    }
    accountingCategoryView = (AccountingCategoryLoader) => {
        return `${AccountingCategoryLoader.Code} - ${AccountingCategoryLoader.Name}`
    }
    get accountingUnitLoader() {
        return AccountingUnitLoader;
    }
    accountingUnittView = (accountingUnit) => {
        return `${accountingUnit.Code} - ${accountingUnit.Name}`
    }

    get divisionLoader() {
        return DivisionLoader;
    }



    searching() {
        if (false) {
            alert("");
        } else {
            var info = {
                no: this.no ? this.no : "",
                // category: this.category ? this.category.code : "",
                // unit: this.unit ? this.unit.Code : "",
                accountingCategoryId: this.accountingCategory ? this.accountingCategory.Id : 0,
                accountingUnitId: this.accountingUnit ? this.accountingUnit.Id : 0,
                dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
                //inputDate:this.inputDate ? moment(this.inputDate).format("YYYY-MM-DD") : "",
                inputDateFrom:this.inputDateFrom ? moment(this.inputDateFrom).format("YYYY-MM-DD") : "",
                inputDateTo:this.inputDateTo ? moment(this.inputDateTo).format("YYYY-MM-DD") : "",
                divisionId: this.division ? this.division.Id : 0
            }
            this.service.search(info)
                .then(result => {
                    this.data = result;
                });
        }
    }

    ExportToExcel() {
        if (false) {
            alert("");
        } else {
            var filter = {
                no: this.no ? this.no : "",
                // category: this.category ? this.category.code : "",
                // unit: this.unit ? this.unit.Code : "",
                accountingCategoryId: this.accountingCategory ? this.accountingCategory.Id : 0,
                accountingUnitId: this.accountingUnit ? this.accountingUnit.Id : 0,
                dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
                inputDateFrom:this.inputDateFrom ? moment(this.inputDateFrom).format("YYYY-MM-DD") : "",
                inputDateTo:this.inputDateTo ? moment(this.inputDateTo).format("YYYY-MM-DD") : "",
                divisionId: this.division ? this.division.Id : 0
            }

            this.service.generateExcel(filter)
                .catch(e => {
                    alert(e.replace(e, "Error: ", ""))
                });
        }
    }

    ExportToExcelMII() {
        if (false) {
            alert("");
        } else {
            var filter = {
                no: this.no ? this.no : "",
                // category: this.category ? this.category.code : "",
                // unit: this.unit ? this.unit.Code : "",
                accountingCategoryId: this.accountingCategory ? this.accountingCategory.Id : 0,
                accountingUnitId: this.accountingUnit ? this.accountingUnit.Id : 0,
                dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
                //inputDate:this.inputDate ? moment(this.inputDate).format("YYYY-MM-DD") : "",
                inputDateFrom:this.inputDateFrom ? moment(this.inputDateFrom).format("YYYY-MM-DD") : "",
                inputDateTo:this.inputDateTo ? moment(this.inputDateTo).format("YYYY-MM-DD") : "",
                divisionId: this.division ? this.division.Id : 0
            }

            this.service.generateExcelMII(filter)
                .catch(e => {
                    alert(e.replace(e, "Error: ", ""))
                });
        }
    }

    printPdf() {
        if (false) {
            alert("");
        } else {
            var filter = {
                no: this.no ? this.no : "",
                // category: this.category ? this.category.code : "",
                // unit: this.unit ? this.unit.Code : "",
                accountingCategoryId: this.accountingCategory ? this.accountingCategory.Id : 0,
                accountingUnitId: this.accountingUnit ? this.accountingUnit.Id : 0,
                dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
                //inputDate:this.inputDate ? moment(this.inputDate).format("YYYY-MM-DD") : "",
                inputDateFrom:this.inputDateFrom ? moment(this.inputDateFrom).format("YYYY-MM-DD") : "",
                inputDateTo:this.inputDateTo ? moment(this.inputDateTo).format("YYYY-MM-DD") : "",
                divisionId: this.division ? this.division.Id : 0
            }

            this.service.printPdf(filter)
                .catch(e => {
                    alert(e.replace(e, "Error: ", ""))
                });
        }
    }


    reset() {
        this.no = "";
        // this.category = "";
        // this.unit = "";
        this.accountingCategory = "";
        this.accountingUnit = "";
        this.dateFrom = null;
        this.dateTo = null;
        this.inputDate = null;
        this.inputDateFrom = null;
        this.inputDateTo = null;
        this.data = [];

    }

}