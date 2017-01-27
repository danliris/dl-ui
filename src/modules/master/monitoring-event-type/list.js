import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    data = [];
    info = { page: 1 };

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    async activate() {
        var result = await this.service.search(this.info);
        this.data = result.data;
        this.info = result.info;
    }

    loadPage() {
        this.service.search(this.info)
            .then(result => {
                this.data = result.data;
                this.info = result.info;
            })
    }

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.loadPage();
    }

    create() {
        this.router.navigateToRoute('create');
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    } 

}