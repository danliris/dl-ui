import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    isEdit = true;
    async activate(params) {
        let id = params.id;
        this.data = await this.service.read(id);
        this.Items = this.data.Items;
        this.data.Items = [];
        if (this.data) {
            if (this.data.IsUsed) {
                this.deleteCallback = null;
                this.editCallback = null;
            }

        }
    }

    bind() {
        this.error = {};
        this.checkedAll = true;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    saveCallback(event) {
        var dataToBeSaved = Object.assign({}, this.data);
        dataToBeSaved.Items = this.data.Items.filter(item => item.IsSave);
        this.service.update(dataToBeSaved)
            .then(result => {
                this.cancelCallback();
            })
            .catch(e => {
                this.error = e;
                if (typeof (this.error) == "string") {
                    alert(this.error);
                } else {
                    alert("Missing Some Data");
                }
            })
    }
}