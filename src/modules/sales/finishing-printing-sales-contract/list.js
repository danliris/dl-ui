import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    dataToBePosting = [];
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
        for(var a of this.data){
            if(a.remainingQuantity){
                if(a.remainingQuantity!=a.orderQuantity){
                    a.status="SUDAH ADA"
                }
                else{
                    a.status="BELUM ADA"
                }
            }
        }
    }

    loadPage() {
        var keyword = this.info.keyword;
        this.service.search(this.info)
            .then(result => {
                this.data = result.data;
                this.info = result.info;
                this.info.keyword = keyword;
                for(var a of this.data){
                    if(a.remainingQuantity){
                        if(a.remainingQuantity!=a.orderQuantity){
                            a.status="SUDAH ADA"
                        }
                        else{
                            a.status="BELUM ADA"
                        }
                    }
                }
            })
    }

    view(data,no) {
        this.router.navigateToRoute('view', { id: data._id });
    }

    create() {
        this.router.navigateToRoute('create');
    }

    exportPDF(data) {
        this.service.getPdfById(data._id);
    }

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.loadPage();
    }
}