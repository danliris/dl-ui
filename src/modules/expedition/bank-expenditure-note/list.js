import { inject } from 'aurelia-framework';
import Service from './service';
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class List {
    context = ['Rincian', 'Cetak PDF'];

    columns = [{
        field: "IsPosted",
        title: "IsPosted Checkbox",
        checkbox: true,
        sortable: false,
        formatter: function (value, data, index) {
            this.checkboxEnabled = !data.IsPosted;
            return ""
        }
    },
    { field: 'DocumentNo', title: 'No. Bukti Pengeluaran Bank' },
    {
        field: 'CreatedUtc', title: 'Tanggal', formatter: function (value, data, index) {
            return moment(value).format('DD MMM YYYY');
        },
    },
    {
        field: 'BankName', title: 'Bank', formatter: function (value, data, index) {
            return data ? `${data.BankAccountName} - A/C : ${data.BankAccountNumber}` : '';
        }
    },
    {
        field: 'GrandTotal', title: 'Total DPP+PPN', formatter: function (value, data, index) {
            return numeral(value).format('0,000.00');
        },
    },
    { field: 'BankCurrencyCode', title: 'Mata Uang' },
    { field: 'suppliers', title: 'Supplier' },
    { field: 'unitPaymentOrders', title: 'Nomor SPB' }
    ];

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.selectedItems = [];
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
        };

        return this.service.search(arg)
            .then(result => {

                // let distinctData =
                if (result.data && result.data.length > 0) {
                    result.data = result.data.map((datum) => {
                        let listSupplier = [];
                        let listUnitPaymentOrderNo = [];

                        for (let detail of datum.Details) {
                            let existSupplier = listSupplier.find((supplier) => supplier == '- ' + detail.SupplierName);
                            if (!existSupplier) {
                                listSupplier.push('- ' + detail.SupplierName);
                            }

                            let existUnitPaymentOrderNo = listUnitPaymentOrderNo.find((unitPaymentOrderNo) => unitPaymentOrderNo == '- ' + detail.UnitPaymentOrderNo);
                            if (!existUnitPaymentOrderNo) {
                                listUnitPaymentOrderNo.push('- ' + detail.UnitPaymentOrderNo);
                            }
                        }

                        datum.suppliers = listSupplier.join('\n');
                        datum.unitPaymentOrders = listUnitPaymentOrderNo.join('\n');

                        return datum;
                    })
                }

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
            case 'Rincian':
                this.router.navigateToRoute('view', { id: data.Id });
                break;
            case "Cetak PDF":
                this.service.getPdfById(data.Id);
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }

    posting() {
        console.log(response)
        var items = this.selectedItems.map(s => s.Id);
        this.service.posting(items)
            .then(result => {
                alert("Data berhasil disimpan");
                this.error = {};
                this.tableList.refresh();
                this.selectedItems = [];
            })
            .catch(e => {
                if (e.message) {
                    alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                }
                this.error = e;
            });
    }
}