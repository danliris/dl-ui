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
        var id = params.id;

        this.data = await this.service.getById(id);
        if (this.data.expectedDeliveryDate == 'undefined' || this.data.expectedDeliveryDate == "") {
            this.data.expectedDeliveryDate = "-";
        }
        else {
            var d = new Date(this.data.expectedDeliveryDate);
            var year = d.getFullYear();
            var month = d.getMonth();
            switch (month) {
                case 0: month = "Januari"; break; case 1: month = "Februari"; break; case 2: month = "Maret"; break; case 3: month = "April"; break;
                case 4: month = "Mei"; break; case 5: month = "Juni"; break; case 6: month = "Juli"; break; case 7: month = "Agustus"; break;
                case 8: month = "September"; break; case 9: month = "Oktober"; break; case 10: month = "November"; break;
                case 11: month = "Desember"; break;
            }
            var day = d.getDate();
            this.data.expectedDeliveryDate = day + " " + month + " " + year;
        }
        if (this.data.items) {
            this.data.items.forEach(item => {
                item.showDetails = false
            })
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
}