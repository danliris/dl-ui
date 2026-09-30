import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {Base64Helper} from '../../../utils/base-64-coded-helper';


@inject(Router, Service)
export class View {
    hasCancel = true;
    hasSplit = false;
    hasDelete = false;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        let decoded = Base64Helper.decode(id);
        id = decoded;
        this.data = await this.service.getById(id);
        // var hasSource = (this.data.sourcePurchaseOrder ? true : false) ? true : this.data.isSplit
        // this.hasSplit = !this.data.items
        //     .map((item) => item.isClosed)
        //     .reduce((prev, curr, index) => {
        //         return prev || curr
        //     }, false);
        // this.hasDelete = !this.data.items
        //     .map((item) => item.isClosed)
        //     .reduce((prev, curr, index) => {
        //         return prev || curr
        //     }, false) && !hasSource ;

        this.hasSplit = this.data.IsPosted == false;
        this.hasDelete = this.data.IsPosted == false && this.data.HasDuplicate == false;
    }

    cancel(event) {
        var r = confirm("Apakah anda yakin akan keluar?")
        if (r == true) {
            this.router.navigateToRoute('list');
        }
    }

    split(event) {
        const encoded = Base64Helper.encode(this.data.Id);
        var r = confirm("Apakah Anda yakin akan pecah PO ini?")
        if (r == true) {
            this.router.navigateToRoute('edit', { id: encoded });
        }
    }

    delete(event) {
        var r = confirm("Apakah Anda yakin akan menghapus data ini?");
        if (r == true) {
            this.service.delete(this.data).then(result => {
                this.cancel();
            });
        } 
        
    }
}