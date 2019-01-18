import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    hasCancel = true;
    hasEdit = true;
    hasDelete = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);

        if (this.data) {
            if (this.data.UnitRequest) {
                this.unitRequest = this.data.UnitRequest;
            }

            if (this.data.UnitSender) {
                this.unitSender = this.data.UnitSender;
            }

            if (this.data.Storage) {
                this.storage = this.data.Storage;
            }

            if (this.data.RONo) {
                this.RONo = {
                    RONo: this.data.RONo,
                    Items: []
                };
            }

            if (this.data.Items) {
                for (let item of this.data.Items) {
                    item.IsSave = true;
                }
            }
        }
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    edit(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    delete(event) {
        this.service.delete(this.data).then(result => {
            this.cancel();
        });
    }

    cancelPO(e) {
        this.service.cancel(this.poExId).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }

    unpostPO(e) {
        this.service.unpost(this.poExId).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }

    closePO(e) {
        this.service.close(this.poExId).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }

}