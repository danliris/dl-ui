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
        { text: "1", value: 1 },
        { text: "2", value: 2 },
        { text: "3", value: 3 } 
    ];
    MESINSIZINGOptions = [
        { text: "", value: 0 },
        { text: "SZ 1", value: 1 },
        { text: "SZ 2", value: 2 },
        { text: "SZ 3", value: 3 }, 
        { text: "SZ 4", value: 4 } 
    ];
    GROUPOptions = [
        { text: "", value: 0 },
        { text: "A", value: 1 },
        { text: "B", value: 2 },
        { text: "C", value: 3 } 
    ];
  
    searching() {
        var info = {
            shift : this.info.shift ? this.info.shift.text: "",
            machineSizing : this.info.machineSizing ? this.info.machineSizing.text: "",
            groupui : this.info.groupui ? this.info.groupui.text: "",
            fromDate : this.fromDate ? moment(this.fromDate).format("YYYY-MM-DD") : moment('0001-01-01').format("YYYY-MM-DD"),
            toDate : this.toDate ? moment(this.toDate).format("YYYY-MM-DD") :  moment(Date.now()).format("YYYY-MM-DD")
        }
        this.service.getReportData(info)
            .then(result => {
                console.log(result.data)
                for(var d of result.data){
                    d.Date=moment(d.Date).format("YYYY-MM-DD");
                    
                        //SPU
                        if (d.spu != null){
                            d.spu =d.spu.replaceAll(",",".")
                            if (d.spu > -999999 ){
                         //   console.log(d.spu)
                            d.spu =(d.spu * 100).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            }
                            else if (d.spu >= 0){
                           // console.log(d.spu)
                                d.spu =(d.spu * 100).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            }
            
                        }
                        else
                        {
                                d.spu = ""
                        }
                
                }
                this.data= result.data;
            });
    }
    
    ExportToExcel() {
        var info = {
            shift : this.info.shift ? this.info.shift.text: "",
            machineSizing : this.info.machineSizing ? this.info.machineSizing.text: "",
            groupui: this.info.groupui ? this.info.groupui.text: "",
            fromDate : this.fromDate ? moment(this.fromDate).format("YYYY-MM-DD") : moment('0001-01-01').format("YYYY-MM-DD"),
            toDate : this.toDate ? moment(this.toDate).format("YYYY-MM-DD") :  moment(Date.now()).format("YYYY-MM-DD")
        }
        this.service.generateExcel(info);
    }

  
    reset() {
        this.fromDate = null;
        this.toDate = null;
        this.info.shift = null;
        this.info.machineSizing = null;
        this.info.groupui = null;
    
    }
}