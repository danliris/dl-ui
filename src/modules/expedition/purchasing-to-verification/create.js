import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PurchasingAzureService } from './service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, PurchasingAzureService)
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
            columns: ["No. SPB", "Tanggal SPB", "Tanggal Jatuh Tempo", "Supplier", "Divisi", "Total Bayar", "Mata Uang"],
            onAdd: () => {
                this.data.UnitPaymentOrders.push({});
            },
        };
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }
    
    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    saveCallback(event) {
        let data = {
            SubmissionDate: this.data.SubmissionDate,
            UnitPaymentOrders: [],
        };

        for (let unitPaymentOrder of this.data.UnitPaymentOrders) {
            data.UnitPaymentOrders.push({
                No: unitPaymentOrder.no,
                UPODate: unitPaymentOrder.date,
                DueDate: unitPaymentOrder.dueDate,
                SupplierCode: unitPaymentOrder.supplierCode,
                SupplierName: unitPaymentOrder.supplierName,
                DivisionCode: unitPaymentOrder.divisionCode,
                DivisionName: unitPaymentOrder.divisionName,
                TotalPaid: unitPaymentOrder.totalPaid,
                Currency: unitPaymentOrder.currency,
            });
        }

        this.service.create(data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {
                this.error = e;
            });
    }
}
