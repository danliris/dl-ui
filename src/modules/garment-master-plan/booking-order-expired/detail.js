import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';

@inject(Router, Service)
export class Detail {
    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.today = new Date();
    }

    async activate(params) {
        var id = params.id;
        var datas = await this.service.getMasterPlanByBookingOrderNo(id);
        this.data= datas.details;
        this.data.bookingOrderId=datas.bookingOrderId;
        this.total=0;
        for(var a of this.data){
            a.confirm=a.isConfirmed ? "Ya" : "Tidak";
            a.masterPlanComodity=a.masterPlanComodity? a.masterPlanComodity.name : "";
            a.totalSH= a.shSewing+a.shCutting+a.shFinishing;
            var endDate=moment(a.week.endDate).format("DD MMM YYYY");
            var startDate=moment(a.week.startDate).format("DD MMM YYYY");
            a.week=`W${a.week.weekNumber} - ${startDate} s/d ${endDate}`;
            this.total+=a.quantity;
        }
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data.bookingOrderId });
    }

    
}