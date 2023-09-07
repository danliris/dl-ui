import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import moment from 'moment';

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
        var e="";
        if (this.min.getMonth()+1 != this.params.month) {
            e+=`Tanggal awal harus pada bulan ${this.params.month} \n`
        }
        if(this.min.getFullYear()!=this.params.year){
            e+=`Tanggal awal harus pada tahun ${this.params.year} \n`;
        }
        if(this.max.getMonth()+1 != this.params.month ){
            e+=`Tanggal akhir harus pada bulan ${this.params.month} \n`
        }
        if(this.max.getFullYear()!=this.params.year){
            e+=`Tanggal akhir harus pada tahun ${this.params.year} \n`;
        }
        
        if(e!=""){
            alert(e);
        }
        else{
            this.info.page = 1;
            this.loadPage();
        }
    }

    ExportToExcel() {


    

        var e="";
        if (this.min.getMonth()+1 != this.params.month) {
            e+=`Tanggal awal harus pada bulan ${this.params.month} \n`
        }
        if(this.min.getFullYear()!=this.params.year){
            e+=`Tanggal awal harus pada tahun ${this.params.year} \n`;
        }
        if(this.max.getMonth()+1 != this.params.month ){
            e+=`Tanggal akhir harus pada bulan ${this.params.month} \n`
        }
        if(this.max.getFullYear()!=this.params.year){
            e+=`Tanggal akhir harus pada tahun ${this.params.year} \n`;
        }
        
        if(e!=""){
            alert(e);
        }
        else{
            console.log("masuk else")
           
           //ini akan di panggil di service.js generateExcel
        var info = {
            monthId: this.params.month,
            year: this.params.year,
            //page:this.info.page,
            //size:this.info.size,
            datestart: this.min.getDate(),
            datefinish: this.max.getDate(),
            shift:this.shift ? this.shift.text: ""
        }
       // console.log(shift)
           this.service.generateExcel(info);    

            
        //return this.service.getReportXls(this.Month, this.Year).then(result => {
        
        //  return {
          //  data: result,
         //   total: length
         // };
       // })  
      }
    }
}
