

import { inject } from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';


@inject(Service)
export class List {
    info = { page: 1,size:25};
    constructor(service) {
        this.service = service;

        this.flag = false;
        
        this.today = new Date();
        this.error = {};
    }
    bind(context) {
        console.log(context);
        this.context = context;
    }

    attached() {
    }

    activate() {
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

    search(){
        this.info.page = 1;
        this.info.total = 0;
        this.searching();
    }

    
    searching() {
        let args = {
            page: this.info.page,
            size: this.info.size,
            type : this.type ? this.type : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
        };
        this.service.search(args)
                .then(result => {
                    console.log(result);
                    var datas=[];
                    var index = 1;
                    for(var _data of result.data){
                
                    datas.push(_data);
                    }
                
                     this.info.total= result.info.total;
                     this.data = datas;

                 
                 
                })
        }
    
    
    ExportToExcel() {
        this.error ={};
        if(Object.getOwnPropertyNames(this.error).length === 0){
            let args = {
                dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            };
            
            this.service.generateExcel(args)
            .catch(e => {
                alert(e.replace(e, "Error:",""));
            });
        }
    }



    reset() {
        this.dateFrom = null;
        this.dateTo = null;
    }
    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }
}



