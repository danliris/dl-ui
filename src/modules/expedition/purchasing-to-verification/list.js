import { inject } from 'aurelia-framework';
import { PurchasingService, PurchasingAzureService } from './service';
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';
import { Dialog } from '../../../au-components/dialog/dialog';

@inject(Router, PurchasingService, PurchasingAzureService, Dialog)
export class List {
    context = ['Delete'];

    columns = [
        { field: 'UnitPaymentOrderNo', title: 'No. SPB' },
        {
            field: 'UPODate', title: 'Tanggal SPB', formatter: function (value, data, index) {
                return moment(value).format('DD MMM YYYY');
            },
        },
        {
            field: 'DueDate', title: 'Tanggal Jatuh Tempo', formatter: function (value, data, index) {
                return moment(value).format('DD MMM YYYY');
            },
        },
        { field: 'SupplierName', title: 'Supplier' },
        { field: 'DivisionName', title: 'Divisi' },
        {
            field: 'TotalPaid', title: 'Total Bayar', formatter: function (value, data, index) {
                return numeral(value).format('0,000.00');
            },
        },
        { field: 'Currency', title: 'Mata Uang' },
    ];

    constructor(router, service, azureService, dialog) {
        this.service = service;
        this.azureService = azureService;
        this.router = router;
        this.dialog = dialog;
    }

    loader = (info) => {
        let order = {};
        if (info.sort)
            order[info.sort] = info.order;
        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter: JSON.stringify({ Position: 2 }), // SEND_TO_VERIFICATION_DIVISION
        };

        return this.azureService.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    contextClickCallback(event) {
        let arg = event.detail;
        let data = arg.data;

        switch (arg.name) {
            case 'Delete':
                this.dialog.prompt('Apakah anda yakin mau menghapus data ini?', 'Hapus Data Penyerahan Dokumen Pembelian ke Verifikasi')
                    .then(response => {
                        if (response.ok) {
                            this.azureService.delete(data)
                                .then(result => {
                                    this.tableList.refresh();
                                });
                        }
                    });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}