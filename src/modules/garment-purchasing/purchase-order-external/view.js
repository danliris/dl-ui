import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    hasCancel = true;
    hasEdit = false;
    hasDelete = false;
    hasCancelPo = false;
    hasUnpost = false;
    hasClosePo = false;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var isVoid = false;
        var isArriving = false;
        var id = params.id;
        this.poExId = id;
        this.data = await this.service.getById(id);

        var poIds =  this.data.items.map(function (item) {
            return item.poId;
        });
        poIds = poIds.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
        })

        var listStatusPo = [];
        for(var poId of poIds){
            listStatusPo.push(await this.service.getPoId(poId,["status.value"]))
        }

        if (this.data.status.value === 0) {
            isVoid = true;
        }
        if (listStatusPo.find(po => { return po.status.value > 3 }) != undefined) {
            isArriving = true;
        }
        if (!this.data.isPosted) {
            this.hasDelete = true;
            this.hasEdit = true;
        }
        if (this.data.isPosted && !isVoid && !isArriving && !this.data.isClosed) {
            this.hasUnpost = true;
            this.hasCancelPo = true;
        }
        if (this.data.isPosted && !isVoid && isArriving && !this.data.isClosed) {
            this.hasClosePo = true;
        }

        if (this.data.supplier) {
            this.selectedSupplier = this.data.supplier;
        }
        if (this.data.currency) {
            this.selectedCurrency = this.data.currency;
        }
        if (this.data.vat) {
            this.selectedVat = this.data.vat;
        }
        if (this.data.category) {
            this.selectedCategory = this.data.category;
        }
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    edit(event) {
        this.router.navigateToRoute('edit', { id: this.data._id });
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