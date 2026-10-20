import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    constructor(router, service){
        this.service = service;
        this.keyword = "";
        this.router = router;
        this.info = {
            jenisApproval: "",
            dateFrom: "",
            dateTo: "",
            nomorDokumen: ""
        };
    }
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
            title: "Nomor Dokumen"
        },
        {
            field: "TanggalRequest",
            title: "Tanggal Request",
            formatter: function (value) {
               return value ? moment(value).format("DD MMM YYYY") : "";}
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
            title: "Tanggal Approve",
            formatter: function (value, row) {
                if (row.StatusRequest !== "Approved" || !value) {
                    return "";
                }

                return moment(value).format("DD MMM YYYY");
            }
        },
    ];

    jenisApprovals = [
        "NI",
        "PO Eksternal",
        "PR",
        "Disposisi Pembelian",
        "Dispo Pembayaran",
        "Nota Debet",
        "Nota Retur"
    ];

    filter = {};

    contexCallback(event){
        console.log("HAI");
    }


    loader = (info) => {
    this.keyword = info.search || "";

    const hasJenisApproval = !!(
        this.filter.jenisApproval &&
        this.filter.jenisApproval.trim()
    );

    const hasNomorDokumen = !!(
        this.filter.nomorDokumen &&
        this.filter.nomorDokumen.trim()
    );

    const hasKeyword = !!(
        info.search &&
        info.search.trim()
    );

    // Jangan tampilkan semua data jika belum ada kriteria pencarian
    if (!hasJenisApproval && !hasNomorDokumen && !hasKeyword) {
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
                    const offset = Number(info.offset) || 0;

                    const data = result.data.map((item, index) => ({
                        ...item,
                        no: offset + index + 1
                    }));

                    return {
                        total: result.info.total,
                        data: data
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

    downloadExcel() {
        if (!this.info.jenisApproval) {
            alert("Pilih Jenis Approval terlebih dahulu.");
            return;
        }

        return this.service.downloadExcel({
            keyword: this.keyword || "",
            filter: JSON.stringify(this.filter || {})
        });
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