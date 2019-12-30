import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var CategoryLoader = require('../../../../loader/category-loader');
var UnitLoader = require('../../../../loader/unit-loader');
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
    get categoryLoader() {
        return CategoryLoader;
    }
    categoryView = (category) => {
        return `${category.code} - ${category.name}`
    }
    get unitLoader() {
        return UnitLoader;
    }
    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`
    }



    searching() {
        if (false) {
            alert("");
        } else {
            var info = {
                no: this.no ? this.no : "",
                category: this.category ? this.category.code : "",
                unit: this.unit ? this.unit.Code : "",
                dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
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
                category: this.category ? this.category.code : "",
                unit: this.unit ? this.unit.Code : "",
                dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
            }

            this.service.generateExcel(filter)
                .catch(e => {
                    alert(e.replace(e, "Error: ", ""))
                });
        }
    }


    reset() {
        this.no = "";
        this.category = "";
        this.unit = "";
        this.dateFrom = null;
        this.dateTo = null;
        this.data = [];

    }

}