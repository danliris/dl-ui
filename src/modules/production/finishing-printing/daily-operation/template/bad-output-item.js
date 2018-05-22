import { bindable } from 'aurelia-framework'
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
var BadOutputReasonLoader = require('../../../../../loader/bad-output-reason-loader');
var MachineLoader = require('../../../../../loader/machine-loader');

const resource = 'finishing-printing/daily-operations';

export class BadOutputItem {
    @bindable badOutputReason;
    @bindable machine;
    async activate(context) {
        this.data = context.data;
        this.error = typeof context.error === 'object' ? context.error : {};
        this.options = context.options;
        this.badOutputReason = this.data.badOutputReason;
        this.filter = context.context.options.reason;
        // this.machineFilter=context.context.options.machineCode;
        this.machine = this.data.machine;
        // this.data.precentage = this.error && this.error.length ? this.data.length : this.data.precentage;
        // this.data.length = this.data.length && !this.error ? this.data.length : this.data.precentage;
        this.data.length = this.data.hasOwnProperty("length") ? this.data.length : this.data.hasOwnProperty("precentage") ? this.data.precentage : 0;

        this.data.action = this.data.hasOwnProperty("action") ? this.data.action : this.filter.action;
        var config = Container.instance.get(Config);
        var endpoint = config.getEndpoint("production");
        // var filterKanban={
        //     "kanban.code":this.machineFilter.kanban,
        //     _deleted:false,
        //     type:"input"
        // };
        // var _machineCode=[];
        // await endpoint.find(resource, { filter: JSON.stringify(filterKanban)})
        // .then((result) => {
        //     for(var item of result.data){
        //         if(_machineCode.length>0){
        //             var dup=_machineCode.find(mc=>mc==item.machine.code);
        //             if(!dup)
        //                 _machineCode.push(item.machine.code);
        //         }
        //         else{
        //             _machineCode.push(item.machine.code);
        //         }
        //     }
        //     _machineCode.push(this.machineFilter.code);
        //     this.filterMachine={
        //         code:{
        //             $in:_machineCode
        //         }
        //     };
        // });

        // if(this.machineFilter)
        this.filterMachine = {
            // code:{
            //     $in:this.machineFilter.code
            // }
            "unit.division.name": "FINISHING & PRINTING"
        };
        this.selectBadOutput = ["code", "reason", ""];
        this.selectMachine = ["code", "name"];
    }

    controlOptions = {
        control: {
            length: 12
        }
    };

    get machineLoader() {
        return MachineLoader;
    }

    actionList = ["", "Reproses", "Digudangkan", "Diavalkan"];

    get badOutputReasonLoader() {
        return BadOutputReasonLoader;
    }

    badOutputReasonChanged(newValue, oldValue) {
        if (newValue) {
            this.data.badOutputReason = newValue;
            this.data.badOutputReasonId = newValue._id;
        } else {
            this.data.badOutputReason = {};
            delete this.data.badOutputReasonId;
        }
    }

    machineChanged(newValue, oldValue) {
        if (newValue) {
            this.data.machine = newValue;
            this.data.machineId = newValue._id;
        } else {
            this.data.machine = {};
            delete this.data.machineId;
        }
    }

}