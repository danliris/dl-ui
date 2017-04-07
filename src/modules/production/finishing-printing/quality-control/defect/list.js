import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {
    dataToBeCompleted = [];

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    bind() {
        this.setContext();
        this.setColumns();
    }

    setContext() {
        this.context = ["Rincian", "Cetak PDF"];
    }

    setColumns() {
        this.columns = [
            { field: "dateIm", title: "Tanggal" },
            { field: "shiftIm", title: "Shift" },
            { field: "operatorIm", title: "Operator" },
            { field: "productionOrderNo", title: "No. Order" },
            { field: "productionOrderType", title: "Jenis Order" },
            { field: "kanbanCode", title: "No. Kanban`" }
        ];
    }


    loadData = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    asc() {
        return function (kanban1, kanban2) {
            if (kanban1.isComplete && !kanban2.isComplete)
                return -1;
            if (!kanban1.isComplete && kanban2.isPending())
                return -1;
            if (!kanban1.isComplete && kanban2.isComplete)
                return 1;
            if (kanban1.isPending() && !kanban2.isComplete)
                return 1;

            return 0;
        }
    }

    desc() {
        return function (kanban1, kanban2) {
            if (kanban1.isComplete && !kanban2.isComplete)
                return 1;
            if (!kanban1.isComplete && kanban2.isPending())
                return 1;
            if (!kanban1.isComplete && kanban2.isComplete)
                return -1;
            if (kanban1.isPending() && !kanban2.isComplete)
                return -1;

            return 0;
        }
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data._id });
                break;
            case "Cetak PDF":
                this.service.getPdfById(data._id);
                break;
        }
    }

    contextShowCallback(index, name, data) {
        return true;
    }

    create() {
        this.router.navigateToRoute('create');
    }
}