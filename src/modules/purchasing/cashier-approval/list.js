import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';
import { Dialog } from '../../../au-components/dialog/dialog';
import { Service } from './service';
import VBWithPORequestService from '../shared/vb-with-po-request-service';
import VBNonPORequestService from '../shared/vb-non-po-request-service';
import { PermissionHelper } from '../../../utils/permission-helper';
import { PO, NONPO } from '../shared/permission-constants';

@inject(Router, Service, VBWithPORequestService, VBNonPORequestService, Dialog, PermissionHelper)
export class List {
    // context = ['Hapus'];

    columnsWithPO = [
        {
            field: "ApproveDate", title: "Tanggal Approval", formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        { field: "VBNo", title: "No VB" },
        {
            field: "Date", title: "Tgl VB", formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        {
            field: "Amount", title: "VB Uang", formatter: function (value, data, index) {
                return numeral(value).format('0,000.00');
            },
        },
        { field: "CurrencyCode", title: "Mata Uang" },
        { field: "CreateBy", title: "Pemohon" },
        { field: "UnitLoad", title: "Unit" },
    ];

    columnsNonPO = [
        {
            field: "ApproveDate", title: "Tanggal Approval", formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        { field: "VBNo", title: "No VB" },
        {
            field: "Date", title: "Tgl VB", formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        {
            field: "Amount", title: "VB Uang", formatter: function (value, data, index) {
                return numeral(value).format('0,000.0000');
            },
        },
        { field: "CurrencyCode", title: "Mata Uang" },
        { field: "CreateBy", title: "Pemohon" },
        { field: "UnitName", title: "Unit" },
    ];

    constructor(router, service, vbWithPORequestService, vbNonPORequestService, dialog, permissionHelper) {
        this.service = service;
        this.vbWithPORequestService = vbWithPORequestService;
        this.vbNonPORequestService = vbNonPORequestService;
        this.router = router;
        this.dialog = dialog;

        this.permissions = permissionHelper.getUserPermissions();
        this.initPermission();
    }

    initPermission() {
        this.roles = [PO, NONPO];
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

    loaderVBwithPO = (info) => {
        let order = {};

        if (info.sort)
            order[info.sort] = info.order;
        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter: JSON.stringify({
                VBRequestCategory: "PO",
                Apporve_Status: true
            }),
        };

        if (this.activeRole.key === 'PO') {
            let filter = JSON.parse(arg.filter);
            arg.filter = JSON.stringify(filter);
        }

        return this.vbWithPORequestService.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    loaderVBnonPO = (info) => {
        let order = {};

        if (info.sort)
            order[info.sort] = info.order;
        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter: JSON.stringify({
                VBRequestCategory: "NONPO",
                Apporve_Status: true
            }),
        };

        if (this.activeRole.key === 'NONPO') {
            let filter = JSON.parse(arg.filter);
            arg.filter = JSON.stringify(filter);
        }

        return this.vbNonPORequestService.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    // contextClickCallback(event) {
    //     let arg = event.detail;
    //     let data = arg.data;

    //     switch (arg.name) {
    //         case 'Hapus':
    //             this.dialog.prompt('Apakah anda yakin mau menghapus data ini?', 'Hapus Data Penerimaan Dokumen Disposisi Pembelian')
    //                 .then(response => {
    //                     if (response.ok) {
    //                         this.service.delete(data)
    //                             .then(result => {
    //                                 this.tableList.refresh();
    //                             });
    //                     }
    //                 });
    //             break;
    //     }
    // }

    create() {
        this.router.navigateToRoute('create', { role: this.activeRole });
    }
}   