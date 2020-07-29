import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';
import UnitAutoSuggest from '../../../components/customs/auto-suggests/unit-auto-suggest';

@inject(Router, Service)
export class List {
    dataToBePosted = [];
    columns = [
        {
            field: "isPosting", title: "Post", checkbox: true, sortable: false,
            formatter: function (value, data, index) {
                this.checkboxEnabled = !data.IsPosted;
                // console.log(data)
                return ""
            }
        },
        { field: "RqstNo", title: "No VB" },
        { field: "VBCategory", title: "Tipe VB" },
        {
            field: "RqstDate", title: "Tgl. VB", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "Unit.Name", title: "Unit" },
        { field: "Appliciant", title: "Pemohon" },
        { field: "RealNo", title: "No Realisasi" },
        {
            field: "RealDate", title: "Tgl. Realisasi", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        {
            field: "VerDate", title: "Tgl. Verifikasi", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        {
            field: "DiffStatus", title: "Sisa/Kurang/Sesuai"
        },
        {
            field: "DiffAmount", title: "Jumlah", formatter: function (value, data, index) {
                return numeral(value).format('0,000.00');
            },
        },
        {
            field: "ClearanceDate", title: "Tgl. Clearance", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        {
            field: "Status",
            title: "Status Post",
        },
    ];

    rowFormatter(data, index) {
        if (data.IsPosted)
            return { classes: "success" }
        else
            return {}
    }

    loader = (info) => {
        let order = {};

        if (info.sort) {
            if (info.sort != "Unit.Name") {
                order[info.sort] = info.order;
            }
        }

        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
        }

        return this.service.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    posting() {
        if (this.dataToBePosted.length > 0) {
            this.service.post(this.dataToBePosted.map(d => d.Id))
                .then(result => {
                    this.table.refresh();
                }).catch(e => {
                    this.error = e;
                })
        }
    }
}