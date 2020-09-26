import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';
import { Dialog } from '../../../au-components/dialog/dialog';
import { Service } from './service';
import { PermissionHelper } from '../../../utils/permission-helper';
import { VERIFICATION, CASHIER, ACCOUNTING } from '../shared/permission-constants';

@inject(Router, Service, Dialog, PermissionHelper)
export class List {
    context = ['Hapus'];

    columns = [{
            field: 'SendToVerificationDate',
            title: 'Tanggal Penerimaan Verifikasi',
            formatter: function(value, data, index) {
                return moment(value).format('DD MMM YYYY');
            },
        },
        { field: 'VBNo', title: 'No VB' },
        {
            field: 'VBRealizationDate',
            title: 'Tanggal Realisasi VB',
            formatter: function(value, data, index) {
                return moment(value).format('DD MMM YYYY');
            },
        },
        { field: 'VBRealizationNo', title: 'Nomor Realisasi VB' },
        {
            field: 'VBType',
            title: 'Tipe VB',
            formatter: function(value, data, index) {
                return value == 1 ? 'Dengan PO' : 'Non PO';
            }
        },
        { field: 'VBRequestName', title: 'Pemohon VB' },
        { field: 'UnitName', title: 'Unit Pemohon' },
        { field: 'CurrencyCode', title: 'Mata Uang' },
        {
            field: 'VBRealizationAmount',
            title: 'Nominal Realisasi',
            formatter: function(value, data, index) {
                return numeral(value).format('0,000.00');
            },
            align: "right"
        }
    ];

    columns2 = [{
            field: 'CashierReceiptDate',
            title: 'Tanggal Penerimaan Kasir',
            formatter: function(value, data, index) {
                return moment(value).format('DD MMM YYYY');
            },
        },
        { field: 'VBNo', title: 'No VB' },
        {
            field: 'VBRealizationDate',
            title: 'Tanggal Realisasi VB',
            formatter: function(value, data, index) {
                return moment(value).format('DD MMM YYYY');
            },
        },
        { field: 'VBRealizationNo', title: 'Nomor Realisasi VB' },
        {
            field: 'VBType',
            title: 'Tipe VB',
            formatter: function(value, data, index) {
                return value == 1 ? 'Dengan PO' : 'Non PO';
            }
        },
        { field: 'VBRequestName', title: 'Pemohon VB' },
        { field: 'UnitName', title: 'Unit Pemohon' },
        { field: 'CurrencyCode', title: 'Mata Uang' },
        {
            field: 'VBRealizationAmount',
            title: 'Nominal Realisasi',
            formatter: function(value, data, index) {
                return numeral(value).format('0,000.00');
            },
            align: "right"
        }
    ];

    constructor(router, service, dialog, permissionHelper) {
        this.service = service;
        // this.purchasingDocumentExpeditionService = purchasingDocumentExpeditionService;
        this.router = router;
        this.dialog = dialog;

        this.permissions = permissionHelper.getUserPermissions();
        this.initPermission();
    }

    initPermission() {
        this.roles = [VERIFICATION, CASHIER, ACCOUNTING];
        this.accessCount = 0;

        for (let i = this.roles.length - 1; i >= 0; i--) {
            if (this.permissions.hasOwnProperty(this.roles[i].code)) {
                this.roles[i].hasPermission = true;
                this.accessCount++;
                this.activeRole = this.roles[i];
            }
        }
    }

    changeRole(role) {
        if (role.key !== this.activeRole.key) {
            this.activeRole = role;
            this.tableList.refresh();
        }
    }
    changeTable(role) {
        this.code = role.key === "CASHIER" ? true : false;
    }

    loader = (info) => {
        let order = {};

        if (info.sort)
            order[info.sort] = info.order;
        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order, // VERIFICATION_DIVISION,
            position: this.activeRole.position != 7 ? this.activeRole.position : this.activeRole.position - 2
        };

        // console.log(this.activeRole)
        // console.log(arg)

        return this.service.search(arg)
            .then(result => {
                console.log(result);
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
            case 'Hapus':
                this.dialog.prompt('Apakah anda yakin ingin mengembalikan data ke verifikasi?')
                    .then(response => {
                        if (response.ok) {
                            this.service.cashierDelete(data.VBRealizationId, data)
                                .then(result => {
                                    this.tableList.refresh();
                                });
                        }
                    })
                    .catch(e => {
                        this.error = e;
                    });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}