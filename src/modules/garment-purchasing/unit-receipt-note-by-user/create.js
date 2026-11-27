
import { inject } from 'aurelia-framework';
import { Router, activationStrategy } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;
    isSaving = false;

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
    }

    bind() {
        this.data = { Items: [] };
        this.error = {};
        this.isSaving = false;
    }

    cancel(event) {
        if (confirm('Apakah Anda yakin akan kembali?')) {
            this.router.navigateToRoute('list');
        }
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    save() {
        if (this.isSaving) return;

        if (this.data.URNType === 'PEMBELIAN') {
            var items = this.data.Items || [];

            var conversionLoading = items.some(item =>
                item.ConversionLoading === true
            );

            if (conversionLoading) {
                alert('Mohon tunggu, sistem sedang mengambil Master Satuan Konversi.');
                return;
            }

            var missingItems = items.filter(item =>
                item.ConversionMissing === true ||
                !Number.isFinite(Number(item.Conversion)) ||
                Number(item.Conversion) <= 0
            );

            if (missingItems.length > 0) {
                alert(`Master Konversi Satuan Belum Dibuat untuk ${missingItems.length} barang. Daftarkan dulu di menu Master Konversi Satuan.`);
                return;
            }
        }

        this.isSaving = true;

        this.data.ReceiptDate = new Date(
            new Date().setHours(0, 0, 0, 0)
        );

        if (this.data.URNType === 'PROSES') {
            this.data.Items = [];

            for (var a of this.data.DRItems) {
                this.data.Items.push(a);
            }
        }
        else if (this.data.URNType === 'SISA SUBCON') {
            var items = [];

            for (var a of this.data.Items) {
                a.ReceiptQuantity = a.SmallQuantity;

                if (a.IsSave) {
                    items.push(a);
                }
            }

            this.data.Items = items;
        }

        this.service.create(this.data)
            .then(result => {
                alert('Data berhasil dibuat');

                this.router.navigateToRoute(
                    'create',
                    {},
                    { replace: true, trigger: true }
                );
            })
            .catch(e => {
                this.isSaving = false;

                if (e.statusCode === 500) {
                    this.error = { Remarks: e.message || 'Gagal menyimpan, silakan coba lagi!' };
                } else {
                    this.error = e;
                }
            });
    }
}
