import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

var moment = require('moment');

@inject(Router, Service)
export class List {
    data = [];
    info = { page: 1, keyword: '' };
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    async activate() {
        this.info.keyword = '';
        var result = await this.service.search(this.info);
        this.data = result.data;
        this.info = result.info;
        
        this._adjustDateTime();
    }

    loadPage() {
        var keyword = this.info.keyword;
        this.service.search(this.info)
            .then(result => {
                this.data = result.data;
                this.info = result.info;
                this.info.keyword = keyword;
        
                this._adjustDateTime();
            })
    }

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.loadPage();
    }

    back() {
        this.router.navigateToRoute('list');
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }

    create() {
        this.router.navigateToRoute('create');
    }

    _adjustDateTime(){
        for (var monitoringEvent of this.data)
        {
            if (monitoringEvent.dateEnd == null )
                delete monitoringEvent.dateEnd;
            if (monitoringEvent.timeInMillisEnd == null )
                delete monitoringEvent.timeInMillisEnd;

            monitoringEvent.timeInMomentStart = monitoringEvent.timeInMillisStart != undefined ? moment(monitoringEvent.timeInMillisStart).format('HH:mm') : undefined;
            monitoringEvent.timeInMomentEnd = monitoringEvent.timeInMillisEnd != undefined ? moment(monitoringEvent.timeInMillisEnd).format('HH:mm') : undefined;

            if (monitoringEvent.dateStart)
                monitoringEvent.dateStart = moment(monitoringEvent.dateStart).format("D MMM YYYY");
            if (monitoringEvent.dateEnd)
                monitoringEvent.dateEnd = moment(monitoringEvent.dateEnd).format("D MMM YYYY");
        }
    } 
}