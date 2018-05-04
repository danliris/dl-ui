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
        let id = params.id;
        this.data = await this.service.getById(id);
        this.editCallback = !this.data.IsPosted ? this.editCallback : null;
        this.deleteCallback = !this.data.IsPosted ? this.deleteCallback : null;
        this.hasUnpost = this.data.IsPosted;
        
        // this.supplier = this.data.supplier;
        // this.isReceived = this.data.items
        //     .map((item) => {
        //         var _isReceived = item.fulfillments
        //             .map((fulfillment) => fulfillment.realizationQuantity.length > 0)
        //             .reduce((prev, curr, index) => {
        //                 return prev || curr
        //             }, false);
        //         return _isReceived
        //     })
        //     .reduce((prev, curr, index) => {
        //         return prev || curr
        //     }, false);

        // if (!this.isReceived) {
        //     this.hasDelete = true;
        //     this.hasEdit = true;
        // }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    deleteCallback(event) {
        if (confirm(`Hapus ${this.data.ETONo}?`))
            this.service.delete(this.data)
                .then(result => {
                    this.cancelCallback();
                })
                .catch(e => {
                    this.error = e;
                })
    }

    unpost(event) {
        this.service.unpost(this.data.Id).then(result => {
            this.cancelCallback();
        }).catch(e => {
            this.error = e;
        })
    }
}