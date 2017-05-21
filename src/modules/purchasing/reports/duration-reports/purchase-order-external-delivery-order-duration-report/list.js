import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
var UnitLoader = require('../../../../../loader/unit-loader');
@inject(Router, Service)
export class List {


    info = {
        unitId:"",
        duration: "",
        dateFrom: "",
        dateTo: "",

    };
    unit=null;
    duration='';
    dateFrom = null;
    dateTo = null;

    durationItems=["31-60 hari","61-90 hari", "> 90 hari"]

    constructor(router, service) {
        this.service = service;
        this.router = router;

    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

    }

    get unitLoader() {
        return UnitLoader;
    }

    searching() {
        if (this.filter) {
            this.info.unitId = this.filter.unit ? this.filter.unit._id : "";
            this.info.duration = this.filter.duration ? this.filter.duration : "31-60 hari";
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        } else {
            this.info = {};
        }
        this.service.search(this.info)
            .then(result => {
                this.data = result.info;
                for(var a of this.data){
                    a.dateDiff=Math.ceil(a.dateDiff);
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
            this.info.unitId = this.filter.unit ? this.filter.unit._id : "";
            this.info.duration = this.filter.duration ? this.filter.duration : "31-60 hari";
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        } else {
            this.info = {};
        }
        this.service.generateExcel(this.info);
    }

    
    reset() {
        this.filter = {};
        this.data = [];
    }



}