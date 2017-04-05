import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

var moment = require('moment');

@inject(Router, Service)
export class List {

    info = {
        machineId: '',
        machineEventCode: '',
        productionOrderNumber: '',
        dateFrom: '',
        dateTo: ''
    };

    machine = {};
    machineEvent = {};
    productionOrder = {};
    dateFrom = '';
    dateTo = '';
    divisionFilter = 'FINISHING & PRINTING';
    machineCodeFilter = '';

    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.today = new Date();
    }

    activate() {
    }

    machineChanged(e) {
        this.machineEvent = {};

        var selectedMachine = e.detail || {};
        this.machine._id = selectedMachine._id ? selectedMachine._id : "";
        this.machineCodeFilter = selectedMachine.code;
    }

    searching() {
        this.info.machineId = this.machine._id;
        this.info.machineEventCode = this.machineEvent.code;
        this.info.productionOrderNumber = this.productionOrder.orderNo;
        this.info.dateFrom = this.dateFrom;
        this.info.dateTo = this.dateTo;
        this.service.search(this.info)
            .then(result => {
                this.data = result.data;
                for (var monitoringEvent of this.data) {
                    monitoringEvent.timeInMomentStart = moment(monitoringEvent.timeInMillisStart).format('HH:mm');
                    monitoringEvent.timeInMomentEnd = moment(monitoringEvent.timeInMillisEnd).format('HH:mm');
                }
            })
    }

    reset() {
        this.info.machineId = '';
        this.info.machineEventCode = '';
        this.info.productionOrderNumber = '';
        this.info.dateFrom = '';
        this.info.dateTo = '';

        this.machine = {};
        this.machineEvent = {};
        this.productionOrder = {};
        this.dateFrom = null;
        this.dateTo = null;
    }

    ExportToExcel() {
        this.service.generateExcel(this.info);
    }

    get hasMachine() {
        return this.machine._id && this.machine._id !== '';
    }

    detail(data) {
        this.router.navigateToRoute('detail', { id: data.machineId, productionOrderNumber: data.productionOrder.orderNo, date: data.dateStart, time: data.timeInMomentStart });
    }
}