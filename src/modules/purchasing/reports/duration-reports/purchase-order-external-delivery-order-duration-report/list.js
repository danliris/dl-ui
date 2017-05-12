import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
@inject(Router, Service)
export class List {


    info = {
        duration: "",
        dateFrom: "",
        dateTo: "",

    };
    duration='';
    dateFrom = null;
    dateTo = null;

    durationItems=["0-30 hari", "31-60 hari","61-90 hari", "> 90 hari"]

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
            this.info.duration = this.filter.duration ? this.filter.duration : "0-30 hari";
            this.info.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
            this.info.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        } else {
            this.info = {};
        }
        this.service.search(this.info)
            .then(result => {
                this.data = result.info;
                for(var a of this.data){
                    a.dateDiff=Math.round(a.dateDiff);
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
            this.info.duration = this.filter.duration ? this.filter.duration : "0-30 hari";
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