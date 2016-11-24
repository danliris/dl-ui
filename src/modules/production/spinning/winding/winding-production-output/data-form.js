import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
var moment = require('moment');
import {Service} from './service';

@inject(BindingEngine, Element,Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    spinningOptions = ['Spinning 1','Spinning 2','Spinning 3'];
    shiftOptions = ['Shift I: 06.00 – 14.00', 'Shift II: 14.00 – 22.00', 'Shift III: 22:00 – 06.00'];
    constructor(bindingEngine, element,service) {
        this.bindingEngine = bindingEngine;
        this.element = element;
        this.service = service;
    }
    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    machineChanged(e) {
        var selectedmachine= e.detail || {};
        var lot='';
        if (selectedmachine){
            this.data.machineId = selectedmachine._id ? selectedmachine._id : "";
            if(this.data.lotMachine==undefined|| this.data.lotMachine==null )
            {
                if(this.data.machineId!=""&&this.data.productId!=""&&this.data.machineId!=undefined&&this.data.productId!=undefined){
                    this.service.getLot(this.data.productId,this.data.machineId).then(result => {
                    this.data.lotMachine=result[0];
                    this.data.lotMachine.lot=result[0].lot;
                })
                    
                }
            }
            else if(this.data.machineId==""|| this.data.machineId==undefined) {
                this.data.lotMachine.lot="";
                this.data.lotMachine=undefined;
            }
            
        }
        
       

    }

    threadChanged(e) {
        var selectedThread = e.detail || {};
        var lot='';
        if (selectedThread) {
            this.data.productId=selectedThread._id? selectedThread._id :"";
            if(this.data.lotMachine==undefined|| this.data.lotMachine==null )
            {
                if(this.data.machineId!=""&&this.data.productId!=""&&this.data.machineId!=undefined&&this.data.productId!=undefined){
                    this.service.getLot(this.data.productId,this.data.machineId).then(result => {
                    this.data.lotMachine=result[0];
                    this.data.lotMachine.lot=result[0].lot;
                })
                    
                }
                
            }else if(this.data.productId==""|| this.data.productId==undefined) {
                    this.data.lotMachine.lot="";
                    this.data.lotMachine=undefined;
                }
            
        }
     }
}