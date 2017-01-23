import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class EditInput {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        var code = params.code;
        var no = params.no;
        var machineId =  params.machineId;
        this.data = await this.service.getData(id, code, no, machineId);
        var dateInput = new Date(this.data.dateInput);
        var ddInput = ('0' + dateInput.getDate()).slice(-2);
        var mmInput = ('0' + (dateInput.getMonth() + 1)).slice(-2);
        var dateOutput = new Date(this.data.dateOutput);
        var ddOutput = ('0' + dateOutput.getDate()).slice(-2);
        var mmOutput = ('0' + (dateOutput.getMonth() + 1)).slice(-2);
        this.data.dateInput = dateInput.getFullYear() == 1900 ? '' : `${dateInput.getFullYear()}-${mmInput}-${ddInput}`;
        this.data.hourInput = ('0' + (dateInput.getHours())).slice(-2);
        this.data.minuteInput = ('0' + (dateInput.getMinutes())).slice(-2);
        this.data.dateOutput = `${dateOutput.getFullYear()}-${mmOutput}-${ddOutput}`;
        this.data.hourOutput = ('0' + (dateOutput.getHours())).slice(-2);
        this.data.minuteOutput = ('0' + (dateOutput.getMinutes())).slice(-2);
        var color = {
            color : this.data.color
        }
        this.data.color = color;
    }

    view() {
        this.router.navigateToRoute('view', { id: this.data._id, code : this.data.code, no : this.data.no, machineId : this.data.machineId });
    }

    save() {
        var dateInput = `${this.data.dateInput} ${this.data.hourInput}:${this.data.minuteInput}:00`;
        var dateOutput = `${this.data.dateOutput} ${this.data.hourOutput}:${this.data.minuteOutput}:00`;
        this.data.dateInput = dateInput;
        this.data.dateOutput = dateOutput;
        var color = this.data.color;
        this.data.color = color.color;
        this.service.update(this.data)
            .then(result => {
                this.view();
            })
            .catch(e => {
                this.data.color = color;
                this.error = e;
            })
    }
}