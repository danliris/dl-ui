import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

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
        this.info.order = '';
        var result = await this.service.search(this.info);
        this.data = result.data;
        this.info = result.info;
    }

    loadPage() {
        var keyword = this.info.keyword;
        this.info.order = '';
        this.service.search(this.info)
            .then(result => {
                this.data = result.data;
                this.info = result.info;
                this.info.keyword = keyword;
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
        if(data.type === "input")
            this.router.navigateToRoute('view-input', { id: data._id });
        else
            this.router.navigateToRoute('view-output', { id: data._id });
    }

    createInput() {
        this.router.navigateToRoute('create-input');
    }

    createOutput() {
        this.router.navigateToRoute('create-output');
    }
}