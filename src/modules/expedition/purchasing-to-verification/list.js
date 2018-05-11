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
            field: 'Date', title: 'Tanggal SPB', formatter: function (value, data, index) {
                return moment(value).format('DD MMM YYYY');
            },
            sortable: false,
        },
        { field: 'Supplier', title: 'Supplier' },
        { field: 'Division', title: 'Divisi' },
        { field: 'Total', title: 'Total Bayar', sortable: false },
        { field: 'Currency', title: 'Mata Uang', sortable: false },
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
                let selectUPO = [
                    'currency.code', 'no', 'date',
                    'items.unitReceiptNote.items.deliveredQuantity',
                    'items.unitReceiptNote.items.pricePerDealUnit',
                ];

                let argUPO = {
                    page: 1,
                    size: 25,
                    filter: JSON.stringify({ no: { '$in': result.data.map(p => p.UnitPaymentOrderNo) } }),
                    select: selectUPO,
                };

                return this.service.search(argUPO)
                    .then(resultUPO => {
                        for (let data of result.data) {
                            let UPO = resultUPO.data.find(p => p.no === data.UnitPaymentOrderNo);

                            if (UPO) {
                                let totalPrice = 0;
                                for (let item of UPO.items) {
                                    for (let detail of item.unitReceiptNote.items) {
                                        totalPrice += detail.pricePerDealUnit * detail.deliveredQuantity;
                                    }
                                }

                                data.Date = UPO.date;
                                data.Total = numeral(totalPrice).format('0,000.00');
                                data.Currency = UPO.currency.code;
                            }
                        }

                        return {
                            total: result.info.total,
                            data: result.data
                        };
                    });
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