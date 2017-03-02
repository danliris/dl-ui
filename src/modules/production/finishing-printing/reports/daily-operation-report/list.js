import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    dateFrom = null;
    dateTo = null;
    shift = '';
    machine = null;
    colspan = 1;
    error = '';
    
    shiftOptions = ['','Shift I: 06.00 – 14.00', 'Shift II: 14.00 – 22.00', 'Shift III: 22:00 – 06.00'];

    activate() {
    }

    get steps(){
        var _steps = [{
            key : '',
            value : ''
        }];
        return _steps;
    }

    searching() {
        var data = [];
        if(this.machine){
            this.error = "";
            this.service.getReport(this.dateFrom, this.dateTo, this.machine)
                .then(data => {
                    this.data = data;
                })
        }else{
            this.error = "Machine is not found";
        }
    }

    machineChanged(e) {
        var selectedMachine = e.detail || {};
        if (selectedMachine){
            this.colspan = selectedMachine.step && selectedMachine.step.itemMonitoring ? selectedMachine.step.itemMonitoring.length : 1;
        }
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.shift = '';
        this.machine = null;
        this.error = '';
        this.colspan = 1;
    }

    ExportToExcel() {
        //    var htmltable= document.getElementById('myTable');
        //    var html = htmltable.outerHTML;
        //    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
        this.service.generateExcel(this.dateFrom, this.dateTo, this.machine);
    }
}