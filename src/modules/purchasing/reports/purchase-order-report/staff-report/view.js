import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        var staff = params.staff;
        var dateFrom = params.sdate;
        var dateTo = params.edate;
        var divisi = params.divisi;
       
        // this.data = await this.service.getDetailUnit(dateFrom,dateTo,id);
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        var persen = 0;
        var data = [];
        var amounts = [];
        var uri = "";
        var nilais=0;
        var nilaitotals=0;
         var nilaip=0;
        var nilaitotalp=0;
        var nilaipp=0;
        var divname="";
        var nilaitotalpp=0;
        if (this.dateFrom == undefined && this.dateTo == undefined )
            uri = this.service.getDetailStaffnoDate(dateFrom, dateTo, staff,divisi);
        else
            uri = this.service.getDetailStaff(dateFrom, dateTo, staff,divisi);


        uri.then(data => {
            this.data = data;



             for (var sel of data) {
                 divname=sel.divisi;
                if (sel.selisih < 0)
                    nilais=1;
                else
                    nilais=0;

            nilaitotals += nilais;
            }
            this.nilaitotals = nilaitotals;
             this.divname = divname;

            for (var tep of data) {
                if (tep.selisih >= 0)
                    nilaipp=1;
                else
                    nilaipp=0;

            nilaitotalpp += nilaipp;
            }
            this.nilaitotalpp = nilaitotalpp;

for (var selp of data) {
                if (selp._id.name!==0)
                    nilaip=1;
                else
                    nilaip=0;

            nilaitotalp += nilaip;
            }
            this.nilaitotalp = nilaitotalp;


                if (this.nilaitotalpp != 0 && this.nilaitotalp != 0 ) {
                    this.persen = (this.nilaitotalpp / this.nilaitotalp * 100).toFixed(0);
                }
                else {
                    this.persen = 100;
                }

            this.dateFrom = dateFrom;
            this.dateTo = dateTo;
            this.staff = staff;
            this.divisi = divisi;
            
        })
    }


  ExportToExcel() {
     
            this.service.generateExcel2(this.dateFrom, this.dateTo, this.staff, this.divisi);
    }

    list(sdate, edate) {
        this.router.navigateToRoute('list', { sdate: this.dateFrom, edate: this.dateTo, divisi: this.divisi});
    }

}
