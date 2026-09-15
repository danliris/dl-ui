import { inject } from 'aurelia-framework';
import { Service } from './service';
import { Router } from 'aurelia-router';
import { AuthService } from 'aurelia-authentication';
import { Base64Helper } from '../../../utils/base-64-coded-helper';
const moment = require('moment');

@inject(Router, Service, AuthService)
export class List {
    constructor(router, service, authService) {
        this.service = service;
        this.router = router;
        this.authService = authService;
    }

    filter = {};

    activate() {
        let username = null;
        if (this.authService.authenticated) {
            const me = this.authService.getTokenPayload();
            username = me.username;
        }
        this.filter = { CreatedBy: username };
    }

    context = ['Rincian', 'Cetak PDF'];

    columns = [
        { field: 'ExpenditureGoodNo', title: 'No Bon Pengeluaran' },
        { field: 'UnitCode', title: 'Unit Pengeluaran' },
        { field: 'ExpenditureType', title: 'Tipe Pengeluaran' },
        { field: 'Description', title: 'Keterangan' },
        { field: 'totalQuantity', title: 'Jumlah', sortable: false },
        { field: 'Carton', title: 'Karton', sortable: false },
        { field: 'BuyerName', title: 'Buyer' },
        { field: 'Invoice', title: 'Packing List', sortable: false },
        {
            field: 'ExpenditureDate',
            title: 'Tgl Pengeluaran',
            formatter: value => moment(value).format('DD MMM YYYY')
        }
    ];

    loader = info => {
        const order = {};
        if (info.sort)
            order[info.sort] = info.order;

        const arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order,
            filter: JSON.stringify(this.filter)
        };

        return this.service.search(arg)
            .then(result => {
                this.totalQuantity = result.info.totalQty;

                result.data.forEach(row => {
                    row.UnitCode = row.Unit ? row.Unit.Code : row.UnitCode;
                    row.BuyerName = row.Buyer ? row.Buyer.Name : row.BuyerName;

                    const items = row.Items || [];
                    row.totalQuantity = items.reduce((total, item) =>total +Number(item.Quantity || 0),0);
                });

                return {
                    total: result.info.total,
                    data: result.data
                };
            });
    };

    contextClickCallback(event) {
        const arg = event.detail;
        const data = arg.data;
        const idEncoded = Base64Helper.encode(data.Id);

        switch (arg.name) {
            case 'Rincian':
                this.router.navigateToRoute('view', { id: idEncoded });
                break;
            case 'Cetak PDF':
                this.service.getPdfById(data.Id);
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}
