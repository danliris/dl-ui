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
    shiftOptions = [
        { text: "", value: 0 },
        { text: "I", value: 1 },
        { text: "II", value: 2 },
        { text: "III", value: 3 } 
    ];
    MCNOOptions = [
        { text: "", value: 0 },
        { text: "WP 1", value: 1 },
        { text: "WP 2", value: 2 },
        { text: "WP 3", value: 3 } 
    ];
  
    searching() {
        var info = {
            shift : this.info.shift ? this.info.shift.text: "",
            mcNo : this.info.mcNo ? this.info.mcNo.text: "",
            sp: this.info.sp ? this.info.sp: "",
            code: this.info.code ? this.info.code: "",
            name : this.info.name ? this.info.name: "",
            fromDate : this.fromDate ? moment(this.fromDate).format("YYYY-MM-DD") : moment('0001-01-01').format("YYYY-MM-DD"),
            toDate : this.toDate ? moment(this.toDate).format("YYYY-MM-DD") :  moment(Date.now()).format("YYYY-MM-DD")
        }
        
        this.service.getReportData(info)
            .then(result => {
                for(var d of result.data){
                    d.Date=moment(d.Date).format("YYYY-MM-DD");
                    this.data= result.data;
                }
            });
    }
    
    ExportToExcel() {
        var info = {
            shift : this.info.shift ? this.info.shift.text: "",
            mcNo : this.info.mcNo ? this.info.mcNo.text: "",
            sp: this.info.sp ? this.info.sp: "",
            code: this.info.code ? this.info.code: "",
            name : this.info.name ? this.info.name: "",
            fromDate : this.fromDate ? moment(this.fromDate).format("YYYY-MM-DD") : moment('0001-01-01').format("YYYY-MM-DD"),
            toDate : this.toDate ? moment(this.toDate).format("YYYY-MM-DD") :  moment(Date.now()).format("YYYY-MM-DD")
        }
        this.service.generateExcel(info);
    }

  
    reset() {
        this.fromDate = null;
        this.toDate = null;
        this.info.shift = null;
        this.info.mcNo = null;
        this.info.sp = null;
        this.info.name= null;
        this.info.code= null;
    }
}