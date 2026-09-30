import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import { Base64Helper } from '../../../utils/base-64-coded-helper';

@inject(Router, Service)
export class List {

    context = ["Rincian", "Cetak PDF"]

    columns = [
        
        { field: "UENNo", title: "No. Bon Pengeluaran Unit" },
        //{ field: "PRNo", title: "No. Purchase Request" },
        {
            field: "ExpenditureDate", title: "Tanggal Pengeluaran", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "TypeUen", title: "Jenis Pengeluaran" },
        { field: "ReceiptName", title: "Nama Penerima" },
        { field: "UnitName", title: "Bagian" },
        { field: "CreatedBy", title: "User" },
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            

        }
        
        return this.service.search(arg)
            .then(result => {
                // var data = {};
                // data.total = result.info.total;
                // data.data = result.data;
                let filteredData = result.data.filter(x => x.ExpenditureType !== "PROSES");
                let total = filteredData.length;

                filteredData.forEach(s => {
                    s.toString = function () {
                        var str = "<ul>";
                        for (var item of s.Items) {
                            str += `<li>${item.RONo}</li>`;
                        }
                        str += "</ul>";
                        return str;
                    }
                });
                return {
                    total: total,
                    data: filteredData
                }
            });
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        const encoded = Base64Helper.encode(data.Id);
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: encoded });
                break;
            case "Cetak PDF":
                this.service.getPdfById(data.Id);
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "Cetak PDF":
                return data.Id;
            default:
                return true;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}