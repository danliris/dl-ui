import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class Create {
    controlOptions = {
		label: {
			length: 4,
		},
		control: {
			length: 4,
		},
    };
    
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};

        this.collection = {
			columns: ["No. SPB", "Tanggal SPB", "Supplier", "Divisi", "Total Bayar", "Mata Uang"],
			onAdd: () => {
				this.data.Items.push({});
			},
		};
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.list();
    }

    saveCallback(event) {
        this.service.create(this.data)
            .then(result => {
                this.list();
            })
            .catch(e => {
                this.error = e;
            });
    }
}
