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
        if (this.dateFrom == undefined && this.dateTo == undefined)
            uri = this.service.getDetailUnitnoDate(staff);
        else
            uri = this.service.getDetailUnit(dateFrom, dateTo, staff);


        uri.then(data => {
            this.data = data;


             for (var sel of data) {
                if (sel.selisih < 0)
                    nilais=1;
                else
                    nilais=0;

            nilaitotals += nilais;
            }
            this.nilaitotals = nilaitotals;

for (var selp of data) {
                if (selp._id.name!==0)
                    nilaip=1;
                else
                    nilaip=0;

            nilaitotalp += nilaip;
            }
            this.nilaitotalp = nilaitotalp;


                if (this.nilaitotals != 0 && this.nilaitotalp != 0 ) {
                    this.persen = ((this.nilaitotalp - this.nilaitotals) / this.nilaitotalp).toFixed(2);
                }
                else {
                    this.persen = 100;
                }

            this.dateFrom = dateFrom;
            this.dateTo = dateTo;
            this.staff = staff;
            
        })
    }

    list(sdate, edate) {
        this.router.navigateToRoute('list', { sdate: this.dateFrom, edate: this.dateTo });
    }

}
