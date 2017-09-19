import { inject, bindable, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import {activationStrategy} from 'aurelia-router';

@inject(Router, Service)
export class Migrate {
    @bindable error = {};

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
    }

    auInputOptions = {
        label: {
            length: 4,
            align: "right"
        },
        control: {
            length: 5
        }
    };

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    tables = ["", "Budget & POrder", "Budget1 & POrder1"];
    tables2 = ["latest", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    activate(params) {
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.list();
    }

    saveCallback(event) {

        this.service.migrate(this.data)
            .then(result => {
                if (result.length == 0) {
                    alert("tidak ada data");
                } else {
                    var migratedFalse = result[0].MigratedFalse.length;
                    var resultData = result[0].processed.length;
                    alert(resultData + " data RO migration, migration berhasil: " + (resultData - migratedFalse) + " , migration gagal: " + migratedFalse);
                }

                this.router.navigateToRoute('migrate', {}, { replace: true, trigger: true });

            })
            .catch(e => {
                this.error = e;
            })
    }
}

