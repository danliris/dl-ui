import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';
const UnitLoader = require('../../../loader/garment-units-loader');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;

    }
    bind(context) {
        this.context = context;
    }
    
    searching() {
        var info = {
            unit : this.unit ? this.unit.Id : "",
            date : this.date ? moment(this.date).format("YYYY-MM-DD") :  moment(new Date()).format("YYYY-MM-DD") ,
            ro : this.ro ?this.ro:""
        }
        this.service.search(info)
            .then(result => {
                this.data=[];
                for(var _data of result){
                      
                    this.data.push(_data);

                 }
            });
    }
    
    ExportToExcel() {
        var info = {
            unit : this.unit ? this.unit.Id : "",
            date : this.date ? moment(this.date).format("YYYY-MM-DD") :  moment(new Date()).format("YYYY-MM-DD") ,
            ro : this.ro ?this.ro:""
        }
        this.service.generateExcel(info);
    }

    get unitLoader(){
        return UnitLoader;
    }
    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    
    }

    
    reset() {
        this.ro = null;
        this.date  = null;
        this.unit = null;
    }
}