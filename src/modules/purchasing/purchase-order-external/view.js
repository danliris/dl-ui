import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

@inject(Router, Service)
export class View {

    poExId = "";
    isVoid = false;
    isArriving = false;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;

        this.poExId = id;

        this.data = await this.service.getById(id);

        if (this.data.items) {
            this.data.items.forEach(item => {
                item.showDetails = false
            })

            if(this.data.status.value === 0)
                this.isVoid = true;

            if(this.data.items.find(po => { return po.status.value > 3 }) != undefined)
                this.isArriving = true;
        }
    }

    list() {
        this.router.navigateToRoute('list');
    }

    edit() {
        this.router.navigateToRoute('edit', { id: this.data._id });
    }

    delete() {
        this.service.delete(this.data).then(result => {
            this.list();
        });
    }

    showDetail(item) {
        if (item.showDetails)
            item.showDetails = false;
        else
            item.showDetails = true;
    }

    cancel() {
        this.service.cancel(this.poExId).then(result => {
            this.list();
        }).catch(e => {
            this.error = e;
        })
    }

    unpost() {
        this.service.unpost(this.poExId).then(result => {
            this.list();
        }).catch(e => {
            this.error = e;
        })
    }

    close() {
        this.service.close(this.poExId).then(result => {
            this.list();
        }).catch(e => {
            this.error = e;
        })
    }
}
