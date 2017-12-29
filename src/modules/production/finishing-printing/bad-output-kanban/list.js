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
            {
                field: "toBeCompleted", title: "toBeCompleted Checkbox", checkbox: true, sortable: false,
                formatter: function (value, data, index) {
                    this.checkboxEnabled = data.isIncomplete() ? !data.isIncomplete() : !data.isDone();
                    return ""
                }
            },
            { field: "productionOrder.orderNo", title: "Order No" },
            { field: "cart.cartNumber", title: "Nomor Kereta" },
            { field: "stepIndexPerTotal", title: "Step Index", sortable: false },
            { field: "selectedProductionOrderDetail.colorRequest", title: "Warna" },
            { field: "instruction.name", title: "Instruksi" },
            {
                field: "completeStatus", title: "Status",
                formatter: function (value, data, index) {
                    return data.isInactive ? "INACTIVE" : data.isComplete ? "COMPLETE" : data.isPending() ? "PENDING" : "INCOMPLETE";
                }
            },
            { field: "oldKanban.cart.cartNumber", title: "Nomor Kereta Lama" }
        ];
    }

    rowFormatter(data, index) {
        if (data.isInactive) {
            return { classes: "danger" }
        } else {
            if (data.isComplete)
                return { classes: "success" };
            else {
                if (data.isPending())
                    return { classes: "warning" };
                else
                    return {};
            }
        }
    }

    loadData = (info) => {
        var order = {};
        var filter = {
            isBadOutput: true
        };
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            filter: JSON.stringify(filter),
            keyword: info.search,
            order: order,
            select: ["productionOrder.orderNo", "cart.cartNumber", "selectedProductionOrderDetail.colorRequest", "selectedProductionOrderDetail.colorType.name", "selectedProductionOrderDetail.colorType", "isComplete", "isInactive", "oldKanban.cart.cartNumber", "currentStepIndex", "instruction.name", "instruction.steps.length"]
        }

        return this.service.search(arg)
            .then(result => {
                // modify display data
                for (var kanban of result.data) {
                    kanban.selectedProductionOrderDetail.colorRequest = kanban.selectedProductionOrderDetail.colorType ? kanban.selectedProductionOrderDetail.colorRequest + " - " + kanban.selectedProductionOrderDetail.colorType.name : kanban.selectedProductionOrderDetail.colorRequest;
                    kanban.currentStepIndex = kanban.currentStepIndex || 0; // old kanban data does not have currentStepIndex
                    kanban.stepIndexPerTotal = `${kanban.currentStepIndex}/${kanban.instruction.steps.length}`;
                    kanban.isPending = function () {
                        return !this.isComplete && this.currentStepIndex >= this.instruction.steps.length; // used for custom sort
                    };
                    kanban.isDone = function () {
                        return this.isComplete;
                    };
                    kanban.isIncomplete = function () {
                        return !this.isComplete && this.currentStepIndex < this.instruction.steps.length;
                    }
                }

                if (info.sort === "isComplete") { //custom sort
                    if (info.order === "desc")
                        result.data.sort(this.desc());
                    else
                        result.data.sort(this.asc());
                }

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

    submitCompleteData() {
        if (this.dataToBeCompleted.length > 0) {
            var updatePromise = [];
            for (var data of this.dataToBeCompleted) {
                updatePromise.push(this.service.updateIsComplete(data._id));
            }

            Promise.all(updatePromise)
                .then(responses => {
                    this.error = {};
                    this.table.refresh();
                    this.dataToBeCompleted = [];
                })
                .catch(e => {
                    this.error = e;
                })
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }

    reprocess() {
        this.router.navigateToRoute('reprocess');
    }
}
