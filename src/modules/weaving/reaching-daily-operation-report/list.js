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
    info={size:100, page:1}
    bind(context) {
        this.context = context;
    }
    shiftOptions = [
        { text: "", value: 0 },
        { text: "1", value: 1 },
        { text: "2", value: 2 },
        { text: "3", value: 3 } 
    ];
    MCNOOptions = [
        { text: "", value: 0 },
        { text: "1", value: 1 },
        { text: "2", value: 2 },
        { text: "3", value: 3 } 
    ];
    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 6
        }
    }

    searching() {
        var info = {
            page:this.info.page,
            size:this.info.size,
            shift : this.info.shift ? this.info.shift.text: "",
            mcNo : this.info.mcNo ? this.info.mcNo: "",
            fromDate : this.fromDate ? moment(this.fromDate).format("YYYY-MM-DD") : moment('0001-01-01').format("YYYY-MM-DD"),
            toDate : this.toDate ? moment(this.toDate).format("YYYY-MM-DD") :  moment(Date.now()).format("YYYY-MM-DD")
        }
        this.total=0
        this.service.getReportData(info)
            .then(result => {
                var idx=(this.info.page-1) *100;
                for(var d of result.data){
                    idx++;
                    d.index=idx;
                    d.Periode=moment(d.Periode).format("DD MMMM YYYY");
                    this.total+=parseFloat(d.BeamNo);
                }
                this.data= result.data;
                this.info.total=result.info.total;
            });
    }
    
    ExportToExcel() {
        var info = {
            shift : this.info.shift ? this.info.shift.text: "",
            mcNo : this.info.mcNo ? this.info.mcNo: "",
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
    }

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }
}