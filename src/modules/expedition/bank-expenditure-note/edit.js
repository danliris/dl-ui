import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';

import PurchasingDocumentExpeditionService from '../shared/purchasing-document-expedition-service';
import Service from './service';


@inject(Router, Service, PurchasingDocumentExpeditionService)
export class Edit {

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

    constructor(router, service, purchasingDocumentExpeditionService) {
        this.router = router;
        this.service = service;
        this.purchasingDocumentExpeditionService = purchasingDocumentExpeditionService;

        this.collection = {
            columns: ['__check', 'No. SPB', 'Tanggal SPB', 'Tanggal Jatuh Tempo', 'Nomor Invoice', 'Supplier', 'Divisi', 'PPN', 'Total Harga (DPP + PPN)', 'Mata Uang', ''],
        };
    }

    bind() {
        this.error = {};
    }

    UPOResults = [];
    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);

        this.data.Details.map((detail) => {
            detail.Select = true;
            return detail;
        });

        let arg = {
            page: 1,
            size: Number.MAX_SAFE_INTEGER,
            filter: JSON.stringify({ "Position": 7, "SupplierCode": newVal.code, "IsPaid": false }) //CASHIER DIVISION
        };

        this.UPOResults = await this.purchasingDocumentExpeditionService.searchAllByPosition(arg)
            .then((result) => {
                return result.data;
            });

        if (this.UPOResults.length > 0) {
            this.data.Details.concat(this.UPOResults);
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    saveCallback(event) {
        this.data.Details = this.data.Details.filter((detail) => detail.Select)
        this.service.update(this.data).then(result => {
            this.cancelCallback();
        }).catch(e => {
            this.error = e;
        })
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

    onCheckAll(event) {
        for (var item of this.data.Details) {
            item.Select = event.detail.target.checked;
        }
    }
}
