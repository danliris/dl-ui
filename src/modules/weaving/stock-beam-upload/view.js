import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    shiftOptions = [
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
    info={size:100, page:1}
    
    async activate(params) {
        this.min= new Date(params.year,params.month-1,1);
        this.max=new Date(params.year,params.month,0);
        this.params=params;
        var arg = {
            monthId: params.month,
            year: params.year,
            page:this.info.page,
            size:this.info.size
        };
        var MR=await this.service.getByMonthYear(arg);
        var idx=1;
        for(var data of MR.data){
            data.index=idx;
            idx++;
        }
        this.data = MR.data;
        this.info.total=MR.info.total;
    }

    list() {
        this.router.navigateToRoute("list");
    }

    cancelCallback(event) {
        this.list();
    }

    loadPage() {
        this.info = {
            monthId: this.params.month,
            year: this.params.year,
            page:this.info.page,
            size:this.info.size,
            datestart: this.min.getDate(),
            datefinish: this.max.getDate(),
            shift:this.shift ? this.shift.text: ""
        };
        this.service.getByMonthYear(this.info)
            .then(result => {
                var idx=(this.info.page-1) *100;
                for(var data of result.data){
                    idx++;
                    data.index=idx;
                }
                this.data = result.data;
                this.info = result.info;
            })
    }
    
    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.loadPage();
    }

    searching() {
        if (this.min.getMonth() != this.params.month && this.min.getFullYear()!=this.params.year) {
            alert(`Tanggal awal harus pada bulan ${this.params.month} dan tahun ${this.params.year}`);
        }
        else if(this.max.getMonth() != this.params.month && this.max.getFullYear()!=this.params.year){
            alert(`Tanggal Akhir harus pada bulan ${this.params.month} dan tahun ${this.params.year}`);
        }
        else{
            this.info.page = 1;
            this.loadPage();
        }
    }
}
