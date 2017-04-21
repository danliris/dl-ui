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

    fabricQCFields = ["productionOrderNo"];

    shiftOptions = [
        "",
        "Shift I: 06.00 - 14.00",
        "Shift II: 14.00 - 22.00",
        "Shift III: 22.00 - 06.00"];

    kanbanCode = "";
    productionOrderNo = "";
    productionOrderType = "";
    shiftIm = "";
    dateFrom = '';
    dateTo = '';
    newData;

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
            this.info.kanbanCode = this.filter.kanbanCode ? this.filter.kanbanCode.kanbanCode : "";
            this.info.productionOrderNo = this.filter.productionOrderNo ? this.filter.productionOrderNo.productionOrderNo : "";
            this.info.productionOrderType = this.filter.productionOrderType ? this.filter.productionOrderType.productionOrderType : "";
            this.info.shiftIm = this.filter.shiftIm ? this.filter.shiftIm : "";
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        } else {
            this.info = {};
        }
        this.service.search(this.info)
            .then(result => {
                var tempData;
                this.no = 0;
                this.newData = [];
                for (var i = 0; i < result.data.length; i++) {
                    for (var j = 0; j < result.data[i].fabricGradeTests.length; j++) {
                        tempData = {};
                        this.no += 1;
                        tempData.no = this.no;
                        tempData.kanbanCode = result.data[i].kanbanCode;
                        tempData.cartNo = result.data[i].cartNo;
                        tempData.productionOrderType = result.data[i].productionOrderType;
                        tempData.productionOrderNo = result.data[i].productionOrderNo;
                        tempData.dateIm = result.data[i].dateIm;
                        tempData.shiftIm = result.data[i].shiftIm;
                        tempData.operatorIm = result.data[i].operatorIm;
                        tempData.machineNoIm = result.data[i].machineNoIm;
                        tempData.construction = result.data[i].construction;
                        tempData.buyer = result.data[i].buyer;
                        tempData.color = result.data[i].color;
                        tempData.orderQuantity = result.data[i].orderQuantity;
                        tempData.packingInstruction = result.data[i].packingInstruction;
                        tempData.pcsNo = result.data[i].fabricGradeTests[j].pcsNo;
                        tempData.initLength = result.data[i].fabricGradeTests[j].initLength;
                        tempData.width = result.data[i].fabricGradeTests[j].width;
                        tempData.finalScore = result.data[i].fabricGradeTests[j].finalScore.toFixed(2);
                        tempData.grade = result.data[i].fabricGradeTests[j].grade;
                        tempData.avalLength = result.data[i].fabricGradeTests[j].avalLength;
                        tempData.sampleLength = result.data[i].fabricGradeTests[j].sampleLength;
                        this.newData.push(tempData);
                    }
                }
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
        console.log(this.filter.productionOrderNo);
        console.log('production number changed')
    }

    productionOrderTypeChanged(e) {
        console.log('production type changed')
    }

    shiftImChanged(e) {
        console.log('production type changed')
    }

    get fabricQCLoader() {
        return (keyword) => {
            var info = { keyword: keyword, select: this.fabricQCFields };
            return this.service.searchFabricQC(info)
                .then((result) => {
                    return result.data;
                });
        }
    }

    reset() {
        this.filter = {};
        this.data = [];
    }



}