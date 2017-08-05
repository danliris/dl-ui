import {inject, bindable, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {activationStrategy} from 'aurelia-router';

@inject(Router, Service)
export class Create {
    dataToBePosted = [];
    @bindable data = [];

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: true
    }

    itemsColumns = [
        { header: " ", value: "__check" },
        { header: "Nomor PR", value: "no" },
        { header: "Nomor RO", value: "roNo" },
        { header: "Tgl. Shipment", value: "shipmentDate" },
        { header: "Buyer", value: "buyer" },
        { header: "Artikel", value: "artikel" },
        { header: "Unit", value: "unit" }
    ];

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    save(event) {
        this.dataToBePosted = this.data.filter(function (item) {
            return item.check
        });
        if (this.dataToBePosted.length === 0) {
            alert(`Purchase Request belum dipilih`);
        }
        else {
            this.service.create(this.dataToBePosted)
                .then(result => {
                    alert(`${this.dataToBePosted.length} data berhasil ditambahkan`);
                    this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
                })
                .catch(e => {
                    this.error = e;
                })
        }
    }

    search() {
        this.service.searchByTags(this.keywords, this.shipmentDate)
            .then(result => {
                this.data = result.data;
            })
            .catch(e => {
                this.error = e;
            })
    }

    onClickAllDataSource($event) {
        for (var item of this.data) {
            item.check = $event.detail.target.checked;
        }
    }
}