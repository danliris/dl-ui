import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    prId = "";

    async activate(params) {
        var id = params.id;
        this.prId = id;
        this.data = await this.service.getById(id);

        this.data.unit.toString = function () {
            return [this.division.name, this.name]
                .filter((item, index) => {
                    return item && item.toString().trim().length > 0;
                }).join(" - ");
        }
        this.data.budget.toString = function () {
            return [this.code, this.name]
                .filter((item, index) => {
                    return item && item.toString().trim().length > 0;
                }).join(" - ");
        }
        this.data.category.toString = function () {
            return [this.code, this.name]
                .filter((item, index) => {
                    return item && item.toString().trim().length > 0;
                }).join(" - ");
        }
    }

    get list() {
        return () => {
            this.router.navigateToRoute('list');
        }
    }

    get edit() {
        return () => {
            this.router.navigateToRoute('edit', { id: this.data._id });
        }
    }

    get delete() {
        return () => {
            this.service.delete(this.data).then(result => {
                this.list();
            });
        }
    }

    get unpost() {
        return () => {
            this.service.unpost(this.prId).then(result => {
                this.list();
            }).catch(e => {
                this.error = e;
            })
        }
    }
}