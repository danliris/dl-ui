import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    dataToBeCompleted = [];
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    bind(){
        this.setContext();
        this.setColumns();
    }

    setContext(){
        this.context = ["Rincian", "Cetak PDF"];
    }

    setColumns(){
        this.columns = [
            {
                field: "toBeCompleted", title: "toBeCompleted Checkbox", checkbox: true, sortable: false,
                formatter: function (value, data, index) {
                    this.checkboxEnabled = data.isPending();
                    return ""
                }
            },
            { field: "productionOrder.orderNo", title: "Order No" },
            { field: "cart.cartNumber", title: "Nomor Kereta" },
            { field: "stepIndexPerTotal", title: "Step Index", sortable: false },
            { field: "selectedProductionOrderDetail.colorRequest", title: "Warna" },
            { field: "instruction.name", title: "Instruksi" },
            {
                field: "isComplete", title: "Complete",
                    formatter: function (value, data, index) {
                        return value ? "COMPLETE" : data.isPending() ? "PENDING" : "INCOMPLETE";
                    }
            }
        ];
    }

    rowFormatter(data, index) {
        if (data.isComplete)
            return { classes: "success" };
        else{
            if (data.isPending())
                return { classes: "warning" };
            else
                return {};
        }
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
                for (var kanban of result.data) // modify display data
                {
                    kanban.selectedProductionOrderDetail.colorRequest = kanban.selectedProductionOrderDetail.colorType 
                        ? kanban.selectedProductionOrderDetail.colorRequest + " - " + kanban.selectedProductionOrderDetail.colorType.name 
                        : kanban.selectedProductionOrderDetail.colorRequest;
                        kanban.currentStepIndex = kanban.currentStepIndex || 0; // old kanban data does not have currentStepIndex
                        kanban.stepIndexPerTotal = `${kanban.currentStepIndex}/${kanban.instruction.steps.length}`;
                        kanban.isPending = function(){ // used for custom sort
                            return !this.isComplete && this.currentStepIndex >= this.instruction.steps.length; 
                        }
                }

                if (info.sort === "isComplete"){ //custom sort
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

    asc(){
        return function(kanban1, kanban2){
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

    desc(){
        return function(kanban1, kanban2){
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
            for (var data of this.dataToBeCompleted){
                data.isComplete = true;
                updatePromise.push(this.service.update(data));
            }

            Promise.all(updatePromise)
                .then(responses => {
                    this.error = {};
                    this.table.refresh();
                })
                .catch(e => {
                    this.error = e;
                })
        }
    }
  
    create() {
        this.router.navigateToRoute('create');
    }
}