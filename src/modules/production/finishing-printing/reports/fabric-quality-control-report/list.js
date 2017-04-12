import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var FabricQualityControlLoader = require("../../../../../loader/fabric-loader")

@inject(Router, Service)
export class List {


    info = {
        kanbanCode: "",
        productionOrderNo: "",
        productionOrderType: "",
        shiftIm: "",
        dateFrom: "",
        dateTo: "",

    };

    shiftOptions = [
        "Shift I: 06.00 - 14.00",
        "Shift II: 14.00 - 22.00",
        "Shift III: 22.00 - 06.00"];

    kanbanCode = "";
    productionOrderNo = "";
    productionOrderType = "";
    shiftIm = "";
    dateFrom = '';
    dateTo = '';

    constructor(router, service) {
        this.service = service;
        this.router = router;

    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

    }

    searching() {

        if (this.filter) {
            this.info.kanbanCode = this.filter.kanbanCode ? this.filter.kanbanCode : null;
            this.info.productionOrderNo = this.filter.productionOrderNo ? this.filter.productionOrderNo : null;
            this.info.productionOrderType = this.filter.productionOrderType ? this.filter.productionOrderType : null;
            this.info.shiftIm = this.filter.shiftIm ? this.filter.shiftIm : null;
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        } else {
            this.info = {};
        }
        this.service.search(this.info)
            .then(result => {
                this.data = result.data;
            })
    }


    changePage(e) {

        var page = e.detail;
        this.info.page = page;
        this.loadPage();
    }

    ExportToExcel() {
        if (this.filter) {
            this.info.kanbanCode = this.filter.kanbanCode ? this.filter.kanbanCode : null;
            this.info.productionOrderNo = this.filter.productionOrderNo ? this.filter.productionOrderNo : null;
            this.info.productionOrderType = this.filter.productionOrderType ? this.filter.productionOrderType : null;
            this.info.shiftIm = this.filter.shiftIm ? this.filter.shiftIm : null;
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        } else {
            this.info = {};
        }
        this.service.generateExcel(this.info);
    }

    kanbanCodeChanged(e) {
        console.log('kanban changed')
    }

    productionOrderNoChanged(e) {
        console.log('production number changed')
    }

    productionOrderTypeChanged(e) {
        console.log('production type changed')
    }

    shiftImChanged(e) {
        console.log('production type changed')
    }

    get FabricQualityControlLoader() {
        return FabricQualityControlLoader;
    }

    reset() {
        this.filter = {};
        this.data = [];
    }



}