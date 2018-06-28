import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AzureService } from './service';
import { activationStrategy } from 'aurelia-router';

import SupplierLoader from '../../../loader/supplier-loader';
import BankLoader from '../../../loader/banks-loader';

import PurchasingDocumentExpeditionService from '../shared/purchasing-document-expedition-service';
import Service from './service';

@inject(Router, PurchasingDocumentExpeditionService, Service)
export class Create {
    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    formOptions = {
        cancelText: 'Kembali',
        saveText: 'Simpan',
    };

    constructor(router, purchasingDocumentExpeditionService, service) {
        this.router = router;
        this.service = service;
        this.purchasingDocumentExpeditionService = purchasingDocumentExpeditionService;
        this.data = {};

        this.collection = {
            columns: ['__check', 'No. SPB', 'Tanggal SPB', 'Tanggal Jatuh Tempo', 'Nomor Invoice', 'Supplier', 'Divisi', 'PPN', 'Total Harga (DPP + PPN)', 'Mata Uang', ''],
        };
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    onCheckAll(event) {
        for (var item of this.data.Details) {
            item.Select = event.detail.target.checked;
        }
    }

    saveCallback(event) {
        this.data.Details = this.data.Details.filter((detail) => detail.Select)
        this.service.create(this.data)
            .then(result => {
                alert('Data berhasil dibuat');
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {
                this.error = e;
            });
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get bankLoader() {
        return BankLoader;
    }

    @bindable selectedSupplier;
    isExistSupplier = false;
    UPOResults = [];
    async selectedSupplierChanged(newVal, oldVal) {
        this.data.Supplier = newVal;
        if (newVal) {

            let arg = {
                page: 1,
                size: Number.MAX_SAFE_INTEGER,
                filter: JSON.stringify({ "Position": 7, "SupplierCode": newVal.code, "IsPaid": false }) //CASHIER DIVISION
            };

            this.UPOResults = await this.purchasingDocumentExpeditionService.searchAllByPosition(arg)
                .then((result) => {
                    return result.data;
                });

            this.data.Details = this.UPOResults;
            this.isExistSupplier = true;
        }
    }

    get grandTotal() {
        let result = 0;
        if (this.data.Details && this.data.Details.length > 0) {
            for (let detail of this.data.Details) {
                if (detail.Select)
                    result += detail.TotalPaid;
            }
        }
        this.data.GrandTotal = result;
        return result;
    }
}
