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

    listFQSDetailColumns = [
        { value: "no", header: "No" },
        { value: "productionOrderNo", header: "Nomor Order" },
        { value: "productionOrderType", header: "Jenis Order" },
        { value: "cartNo", header: "Nomor Kereta" },
        { value: "dateIm", header: "Tanggal IM" },
        { value: "shiftIm", header: "Shift" },
        { value: "operatorIm", header: "Operator IM" },
        { value: "machineNoIm", header: "No. Mesin IM" },
        { value: "construction", header: "Konstruksi" },
        { value: "buyer", header: "Buyer" },
        { value: "color", header: "Warna" },
        { value: "orderQuantity", header: "Jumlah Order (meter)" },
        { value: "packingInstruction", header: "Packing Instruction" },
        { value: "", header: "" },
    ];

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
        this.newData = [];
    }

    searching() {
        if (this.filter) {
            this.info.productionOrderNo = this.filter.productionOrderNo ? this.filter.productionOrderNo.productionOrderNo : "";
            this.info.cartNo = this.filter.cartNo ? this.filter.cartNo.cartNo : "";
            this.info.productionOrderType = this.filter.productionOrderType ? this.filter.productionOrderType.productionOrderType : "";
            this.info.shiftIm = this.filter.shiftIm ? this.filter.shiftIm : "";
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        } else {
            this.info = {};
        }
        this.service.search(this.info)
            .then(result => {
                var tempData, tempDetailData;
                this.newData = [];
                this.no = 0;
                for (var i = 0; i < result.data.length; i++) {
                    tempData = {};
                    this.no += 1;
                    this.detailNo = 0;

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

                    tempData.details = [];

                    for (var j = 0; j < result.data[i].fabricGradeTests.length; j++) {
                        this.detailNo += 1;
                        tempDetailData = {};
                        
                        tempDetailData.no = this.detailNo;
                        tempDetailData.pcsNo = result.data[i].fabricGradeTests[j].pcsNo;
                        tempDetailData.initLength = result.data[i].fabricGradeTests[j].initLength;
                        tempDetailData.width = result.data[i].fabricGradeTests[j].width;
                        tempDetailData.finalScore = result.data[i].fabricGradeTests[j].finalScore.toFixed(2);
                        tempDetailData.grade = result.data[i].fabricGradeTests[j].grade;
                        tempDetailData.avalLength = result.data[i].fabricGradeTests[j].avalLength;
                        tempDetailData.sampleLength = result.data[i].fabricGradeTests[j].sampleLength;
                        tempData.details.push(tempDetailData);
                    }

                    this.newData.push(tempData);
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
            this.info.productionOrderNo = this.filter.productionOrderNo ? this.filter.productionOrderNo.productionOrderNo : null;
            this.info.cartNo = this.filter.cartNo ? this.filter.cartNo.cartNo : null;
            this.info.productionOrderType = this.filter.productionOrderType ? this.filter.productionOrderType.productionOrderType : null;
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

    cartNoChanged(e) {
        console.log('cart number changed')
    }

    shiftImChanged(e) {
        console.log('production type changed')
    }

    get fabricQCLoader() {
        return FabricQualityControlLoader;
    }

    reset() {
        this.filter = {};
        this.newData = [];
    }



}