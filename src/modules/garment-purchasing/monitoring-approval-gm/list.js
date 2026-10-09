import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class List {

    constructor(router, service){
        this.service = service;
        this.router = router;
        this.info = {
            jenisApproval: "",
            dateFrom: "",
            dateTo: "",
            nomorDokumen: ""
        };
    }

    context = ["Detail"];

    columns = [
        {
            field: "no",
            title: "No",
            sortable: false
        },
        {
            field: "JenisDokumen",
            title: "Jenis Dokumen"
        },
        {
            field: "NamaDokumen",
            title: "Nama Dokumen"
        },
        {
            field: "TanggalRequest",
            title: "Tanggal Request"
        },
        {
            field: "Pemohon",
            title: "Pemohon"
        },
        {
            field: "StatusRequest",
            title: "Status Request"
        },
        {
            field: "TanggalApprove",
            title: "Tanggal Approve"
        },
        {
            field: "detail",
            title: "Detail",
            sortable: false
        }
    ];

    jenisApprovals = [
        "NI",
        "PO Eksternal",
        "PR",
        "Disposisi Pembelian",
        "Dispo Pembayaran",
        "Debet Note",
        "Retur Note"
    ];

    filter = {};

    contexCallback(event){
        console.log("HAI");
    }


    loader = (info) => {
         if (!this.info.jenisApproval) {
                return {
                    total: 0,
                    data: []
                };
            }
            var order = {};

            if (info.sort) {
                order[info.sort] = info.order;
            }

            var arg = {
                page: parseInt(info.offset / info.limit, 10) + 1,
                size: info.limit,
                keyword: info.search,
                order: order,
                filter: JSON.stringify(this.filter)
            };

            return this.service.search(arg)
                .then(result => {
                    return {
                        total: result.info.total,
                        data: result.data
                    };
                });
    };

    search() {
        this.filter = {
            jenisApproval: this.info.jenisApproval,
            dateFrom: this.info.dateFrom,
            dateTo: this.info.dateTo,
            nomorDokumen: this.info.nomorDokumen
        };

        this.tableList.refresh();
    }

    reset() {
        this.info = {
            jenisApproval: "",
            dateFrom: "",
            dateTo: "",
            nomorDokumen: ""
        };

        this.filter = {};
        this.tableList.refresh();
    }
}