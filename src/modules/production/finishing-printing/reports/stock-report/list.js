import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    statusOptions = ['In','Out'];

    columns = [
      { field: "storageName", title: "Storage"},
      { field: "date", title: "Tanggal", 
        formatter: (value, data) => {
          return moment(value).format("DD-MMM-YYYY");
        }
      },
      { field: "productName", title: "Nama Barang"},
      { field: "uom", title: "UOM"},
      { field: "before", title: "Before"},
      { field: "quantity", title: "Kuantiti"},
      { field: "after", title: "After"}
    ]

    bind() {
        this.setContext();
        // this.setColumns();
    }

    setContext() {
        this.context = ["Rincian"];
    }

    // setColumns() {
    //     this.columns = [
    //         {
    //             field: "date", title: "Tanggal", formatter: (value, data) => {
    //                 return moment(value).format("DD-MMM-YYYY");
    //             }
    //         },
    //         { field: "kanban.productionOrder.orderNo", title: "No. Order" },
    //         { field: "kanban.productionOrder.orderType.name", title: "Jenis Order" },
    //         { field: "kanban.selectedProductionOrderDetail.colorRequest", title: "Warna" },
    //         { field: "kanban.cart.cartNumber", title: "No. Kereta" }
    //     ];
    // }


    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        this.arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            dateFrom : moment(this.dateFrom).format("YYYY-MM-DD"),
            dateTo : moment(this.dateTo).format("YYYY-MM-DD")
        }

        return this.service.search(this.arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    // asc() {
    //     return function (kanban1, kanban2) {
    //         if (kanban1.isComplete && !kanban2.isComplete)
    //             return -1;
    //         if (!kanban1.isComplete && kanban2.isPending())
    //             return -1;
    //         if (!kanban1.isComplete && kanban2.isComplete)
    //             return 1;
    //         if (kanban1.isPending() && !kanban2.isComplete)
    //             return 1;

    //         return 0;
    //     }
    // }

    // desc() {
    //     return function (kanban1, kanban2) {
    //         if (kanban1.isComplete && !kanban2.isComplete)
    //             return 1;
    //         if (!kanban1.isComplete && kanban2.isPending())
    //             return 1;
    //         if (!kanban1.isComplete && kanban2.isComplete)
    //             return -1;
    //         if (kanban1.isPending() && !kanban2.isComplete)
    //             return -1;

    //         return 0;
    //     }
    // }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data._id });
                break;
        }
    }

    contextShowCallback(index, name, data) {
        return true;
    }

    search() {
        // this.loader({});
        this.movementTable.refresh();
    }

    reset() {
        this.productionOrder = null;
        this.dateFrom = null;
        this.dateTo = null;
    }

    ExportToExcel() {
        this.service.generateExcel(this.arg);
    }


}
