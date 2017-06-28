import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');
var ProductLoaderName = require('../../../loader/product-name-loader');

@inject(Router, Service)
export class List {

    poStates = [
        {
            "name": "",
            "value": -1
        }];


    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
        this.poStates = this.poStates.map(poState => {
            poState.toString = function () {
                return this.name;
            }
            return poState;
        })
        this.data = [];
    }
    attached() {
    }

    activate() {
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }

    search() {
        var dateFormat = "DD MMM YYYY";
        var locale = 'id-ID';
        var moment = require('moment');
        moment.locale(locale);
        if (!this.poState)
            this.poState = this.poStates[0];
        this.service.search(this.dateFrom, this.dateTo, this.productName ? this.productName : "")
            .then(data => {
                this.data = data;
            })
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.poState = this.poStates[0];
        this.productName = "";
        this.data = [];
    }

    exportToXls() {
        if (!this.poState)
            this.poState = this.poStates[0];
        this.service.generateExcel(this.dateFrom, this.dateTo, this.productName ? this.productName : "");
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);
        this.dateMin = moment(_startDate).format("YYYY-MM-DD");

        if (_startDate > _endDate || !this.dateTo) {
            this.dateTo = e.srcElement.value;
        }

    }

    get productLoaderName() {
        return ProductLoaderName;
    }

}