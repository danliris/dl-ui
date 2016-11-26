import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {

    unitId = null;

    firstDay = 1;
    lastDay = 30;

    constructor(router, service) {

        this.service = service;
        this.router = router;

        var now = new Date();

        var firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDate();
        var lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

        this.currentMonth = now.toLocaleString("id-ID", { month: "long" });
    }

    activate() {

    }

    searching() {
        var data = [];
        this.service.getDailySpinningProductionReport(this.unitId)
            .then(data => {
                this.data = data;
            })
    }

    reset() {
        this.unitId = null;
    }

    spinningChanged(e) {
        var selectedspinning = e.detail || {};
        if (selectedspinning) {
            this.unitId = selectedspinning._id ? selectedspinning._id : {};
        }
    }
}