import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }


    activate(params) {
        if (params.sdate != null || params.edate != null) {
            this.dateFrom = params.sdate;
            this.dateTo = params.edate;

            var pricetotals = 0;
            var percentage = [];
            var percentagetotal = 0;
            var persen = 0;
            var data = [];
            var amounts = [];
            var uri = "";
            if (this.dateFrom == undefined && this.dateTo == undefined)
                uri = this.service.getDataUnitnoDate();
            else
                uri = this.service.getDataUnit(this.dateFrom, this.dateTo);

            uri.then(data => {
                this.data = data;
                for (var price of data) {
                    pricetotals += price.pricetotal;
                }
                this.pricetotals = pricetotals;

                for (var item of data) {
                    if (item.pricetotal != 0 && this.pricetotals != 0) {
                        this.persen = ((item.pricetotal * 100) / this.pricetotals).toFixed(2);
                    }
                    else {
                        this.persen = 0;
                    }
                    percentage.push(this.persen);
                    var x = item.pricetotal.toFixed(2).toString().split('.');
                    var x1 = x[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    var amount = x1 + '.' + x[1];
                    amounts.push(amount);
                }
                for (var p of percentage) {
                    percentagetotal += parseFloat(p);
                }
                this.percentage = percentage;
                this.percentagetotal = Math.round(percentagetotal).toFixed(2);
                this.amounts = amounts;
                var y = this.pricetotals.toFixed(2).toString().split('.');
                var y1 = y[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                this.pricetotals = y1 + '.' + y[1];
            }
            )

        }
    }

    searching() {
        var pricetotals = 0;
        var percentage = [];
        var percentagetotal = 0;
        var persen = 0;
        var data = [];
        var amounts = [];
        var uri = "";
        if (this.dateFrom == undefined && this.dateTo == undefined)
            uri = this.service.getDataUnitnoDate();
        else
            uri = this.service.getDataUnit(this.dateFrom, this.dateTo);

        uri.then(data => {
            this.data = data;
            for (var price of data) {
                pricetotals += price.pricetotal;
            }
            this.pricetotals = pricetotals;

            for (var item of data) {
                if (item.pricetotal != 0 && this.pricetotals != 0) {
                    this.persen = ((item.pricetotal * 100) / this.pricetotals).toFixed(2);
                }
                else {
                    this.persen = 0;
                }
                percentage.push(this.persen);
                var x = item.pricetotal.toFixed(2).toString().split('.');
                var x1 = x[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                var amount = x1 + '.' + x[1];
                amounts.push(amount);
            }
            for (var p of percentage) {
                percentagetotal += parseFloat(p);
            }
            this.percentage = percentage;
            this.percentagetotal = Math.round(percentagetotal).toFixed(2);
            this.amounts = amounts;
            var y = this.pricetotals.toFixed(2).toString().split('.');
            var y1 = y[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this.pricetotals = y1 + '.' + y[1];
        })
    }

    view(data, sdate, edate) {
        this.router.navigateToRoute('view', { id: data._id, sdate: this.dateFrom, edate: this.dateTo });
    }

    reset() {
        this.dateFrom = undefined;
        this.dateTo = undefined;
    }

    ExportToExcel() {
        if (this.dateFrom == undefined && this.dateTo == undefined)
            this.service.generateExcelnoDate();
        else
            this.service.generateExcel(this.dateFrom, this.dateTo);
        if (this.dateFrom == undefined && this.dateTo == undefined)
            this.service.generateExcelnoDate2();
        else
            this.service.generateExcel2(this.dateFrom, this.dateTo);
    }
    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);


        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }
}