import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {bindable, computedFrom} from 'aurelia-framework';


@inject(Router, Service)
export class View {
    @bindable data = { "import": true };
    @bindable error = {};
    @bindable showSecond = false;
    @bindable Options = {
        "readOnly": true,
 
    }

    constructor(router, service, bindingEngine, element) {
        this.router = router;
        this.service = service;
        this.bindingEngine = bindingEngine;
        this.element = element;
    }
    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    get isFilterMachine() {
        this.filterMachine = {
            "machine.code": this.data.machine.code
        };
        return this.filterMachine;
    }
    machineChanged(e) {
        var selectedProcess = e.detail || {};
        this.data.items = e.detail.MachineType.indicators;
        if (selectedProcess) {
            this.data.machineId = selectedProcess._id ? selectedProcess._id : "";
        }

    }

    async activate(params) {

        var id = params.id;
        this.data = await this.service.getById(id);
    }

    list() {
        this.router.navigateToRoute('list');
    }

    edit() {
        this.router.navigateToRoute('edit', { id: this.data._id });
    }

    delete() {
        this.service.delete(this.data)
            .then(result => {
                this.list();
            });
    }
}