import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Create {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
    }

    bind() {
        this.error = {};
    }

    cancelCallback() {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    saveCallback() {
        const items = (this.data.Items || []).filter(i => !i.IsOpenPO);
        const ids = (this.data.Items || []).filter(i => i.IsSave).map(i => i.Id);

        if (ids.length) {
            let errorCount = 0;
            this.error.Items = [];

            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                this.error.Items[i] = {};
                if (item.IsSave && item.AvailableQuantity <= 0) {
                    errorCount++;
                    this.error.Items[i] = {
                        AvailableQuantity: "Jumlah Tersedia Kurang"
                    };
                }
            }

            if (errorCount > 0) {
                alert("Ada kesalah, cek item!")
            } else {
                if (confirm("Open PO Master?")) {
                    const jsonPatch = [
                        { op: "replace", path: `/IsOpenPO`, value: true },
                    ];

                    this.service.patch({ id: JSON.stringify(ids) }, jsonPatch)
                        .then(result => {
                            alert("Berhasil Open PO Master");
                            this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
                        })
                        .catch(e => {
                            this.error = e;
                        });
                }
            }
        } else {
            alert("Tidak ada nomor PO yang dipilih.");
        }
    }
}