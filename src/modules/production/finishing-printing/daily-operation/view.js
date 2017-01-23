import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class View {
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
        this.data.dateInput = `${dateInput.getFullYear()}-${mmInput}-${ddInput}`;
        this.data.hourInput = ('0' + (dateInput.getHours())).slice(-2);
        this.data.minuteInput = ('0' + (dateInput.getMinutes())).slice(-2);
        this.data.dateOutput = dateOutput.getFullYear() == 1900 ? '' : `${dateOutput.getFullYear()}-${mmOutput}-${ddOutput}`;
        this.data.hourOutput = ('0' + (dateOutput.getHours())).slice(-2);
        this.data.minuteOutput = ('0' + (dateOutput.getMinutes())).slice(-2);
        var color = {
            color : this.data.color
        }
        this.data.color = color;
        // var dateInput = new Date(this.dataTemp.kanban.partitions.dateInput);
        // var ddInput = ('0' + dateInput.getDate()).slice(-2);
        // var mmInput = ('0' + (dateInput.getMonth() + 1)).slice(-2);
        // var dateOutput = new Date(this.dataTemp.kanban.partitions.dateOutput);
        // var ddOutput = ('0' + dateOutput.getDate()).slice(-2);
        // var mmOutput = ('0' + (dateOutput.getMonth() + 1)).slice(-2);
        // this.data = {
        // 	productionOrder : this.dataTemp.productionOrder,
        // 	material : this.dataTemp.material,
        // 	constructor : this.dataTemp.constructor,
        // 	color : this.dataTemp.color,
        // 	colorType : this.dataTemp.colorType,
        //     instruction : this.dataTemp.kanban.instruction,
        //     stepId : this.dataTemp.kanban.partitions[0].stepId,
        // 	step : this.dataTemp.kanban.partitions[0].step,
        // 	shift : this.dataTemp.kanban.partitions[0].shift,
        //     machineId : this.dataTemp.kanban.partitions[0].machineId,
        // 	machine : this.dataTemp.kanban.partitions[0].machine,
        // 	steps : this.dataTemp.kanban.partitions[0].steps,
        // 	no : this.dataTemp.kanban.partitions[0].no,
        // 	dateInput : `${dateInput.getFullYear()}-${mmInput}-${ddInput}`,
        // 	hourInput : ('0' + (dateInput.getHours())).slice(-2),
        // 	minuteInput : ('0' + (dateInput.getMinutes())).slice(-2),
        // 	input : this.dataTemp.kanban.partitions[0].input,
        // 	dateOutput : `${dateOutput.getFullYear()}-${mmOutput}-${ddOutput}`,
        // 	hourOutput : ('0' + (dateOutput.getHours())).slice(-2),
        // 	minuteOutput : ('0' + (dateOutput.getMinutes())).slice(-2),
        // 	goodOutput : this.dataTemp.kanban.partitions[0].goodOutput,
        // 	badOutput : this.dataTemp.kanban.partitions[0].badOutput,
        // 	badOutputDescription : this.dataTemp.kanban.partitions[0].badOutputDescription
        // };
    }

    list() {
        this.router.navigateToRoute('list');
    }

    editInput() {
        this.router.navigateToRoute('input', { id: this.data._id, code : this.data.code, no : this.data.no, machineId : this.data.machineId });
    }

    editOutput() {
        this.router.navigateToRoute('output', { id: this.data._id, code : this.data.code, no : this.data.no, machineId : this.data.machineId });
    }

    delete() {
        var dateInput = `${this.data.dateInput} ${this.data.hourInput}:${this.data.minuteInput}:00`;
        var dateOutput = `${this.data.dateOutput} ${this.data.hourOutput}:${this.data.minuteOutput}:00`;
        this.data.dateInput = dateInput;
        this.data.dateOutput = dateOutput;
        var color = this.data.color.color;
        this.data.color = color; 
        this.service.delete(this.data)
            .then(result => {
                this.list();
            });
    }
}