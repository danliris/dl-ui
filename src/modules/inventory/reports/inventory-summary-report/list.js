import { inject } from 'aurelia-framework';
import { Service } from "./service";

@inject(Service)
export class List {
    constructor(service, router){
        this.service = service;
    }

    columns = [
        { field: "storageName", title: "Storage" },
        { field: "productName", title: "Nama Barang" },
        { field: "quantity", title: "Kuantiti" },
        { field: "uom", title: "UOM" },
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        this.arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        }

        return this.service.search(this.arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    ExportToExcel() {
        this.service.generateExcel(this.arg);
    }
}