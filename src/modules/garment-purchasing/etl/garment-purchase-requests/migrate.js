import { inject, bindable, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Migrate {
    @bindable error = {};

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
        this.totalData = 0;
        this.count = 0;
        this.page = 1;
        this.size = 100;

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
    monthOpt = ["latest", "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

    activate(params) {
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.list();
    }

    ETL() {
        this.data.i = this.page;
        this.data.pageSize = this.size;
        this.service.migrate(this.data)
            .then(result => {
                if (result.processed.length == 0) {
                    alert("tidak ada data");
                } else {
                    this.count += this.size;
                    this.migratedFalse += result.MigratedFalse.length;
                    if (this.count < this.totalData) {
                        this.page++;
                        this.ETL();
                    }
                    else {
                        alert(this.totalData + " data migration , migration berhasil : " + (this.totalData - this.migratedFalse) + " , migration gagal: " + this.migratedFalse);
                        this.router.navigateToRoute('migrate', {}, { replace: true, trigger: true });
                    }
                    // if (page == totalPageNumber) {

                    //     // migratedFalse += result[0].MigratedFalse.length;

                    // }
                    // var migratedFalse = result[0].MigratedFalse.length;
                    // var resultData = result[0].processed.length;
                    // alert(resultData + " data RO migration, migration berhasil: " + (resultData - migratedFalse) + " , migration gagal: " + migratedFalse);
                }

            })
            .catch(e => {
                this.error = e;
            })
    }

    saveCallback(event) {
        this.service.getData(this.data).then((data) => {
            this.totalData = data;
            this.migratedFalse = 0;
            this.ETL();
        });
    }
}

