import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { ServiceCore } from "./service-core";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service, ServiceCore)
export class List {
    @bindable selectedSearch;
    @bindable productionOrder;
    @bindable kanban;
    @bindable step;
    @bindable machine;

    data = [];

    columns = [
        { field: "machine.name", title: "Mesin" },
        { field: "step.process", title: "Step / Proses" },
        { field: "shift", title: "Shift" },
        { field: "kanban.productionOrder.orderNo", title: "No Order Produksi" },
        { field: "kanban.cart.cartNumber", title: "No Kereta" },
        {
            field: "dateInput", title: "Tanggal Input",
            formatter: (value, data) => {
                var date = value ? moment(value).format("DD MMM YYYY") : "-";
                return date;
            }
        },
        { field: "input", title: "Input" },
        {
            field: "dateOutput", title: "Tanggal Output",
            formatter: (value, data) => {
                var date = value ? moment(value).format("DD MMM YYYY") : "-";
                return date;
            }
        },
        { field: "goodOutput", title: "Good Output" },
        { field: "badOutput", title: "Bad Output" }
    ];

    searchList = ["Nomor SPP", "Kereta", "Proses", "Mesin"];

    tableOptions = {
        search: false
    };

    context = ["Rincian"];

    constructor(router, service, serviceCore) {
        this.service = service;
        this.serviceCore = serviceCore;
        this.router = router;

        this.sppVisibility = false;
        this.cartVisiblity = false;
        this.processVisibility = false;
        this.machineVisibility = false;

        this.filter = {};
    }

    activate() {

    }

    selectedSearchChanged(newValue, oldValue) {
        switch (newValue) {
            case this.searchList[0]: {
                this.sppVisibility = true;
                this.cartVisiblity = false;
                this.processVisibility = false;
                this.machineVisibility = false;
                break;
            }
            case this.searchList[1]: {
                this.sppVisibility = false;
                this.cartVisiblity = true;
                this.processVisibility = false;
                this.machineVisibility = false;
                break
            }
            case this.searchList[2]: {
                this.sppVisibility = false;
                this.cartVisiblity = false;
                this.processVisibility = true;
                this.machineVisibility = false;
                break;
            }
            case this.searchList[3]: {
                this.sppVisibility = false;
                this.cartVisiblity = false;
                this.processVisibility = false;
                this.machineVisibility = true;
                break;
            }
        }
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter: JSON.stringify(this.filter),
            select: ["machine.name", "step.process", "shift", "kanban.productionOrder.orderNo", "kanban.cart.cartNumber", "dateInput", "input", "dateOutput", "goodOutput", "badOutput", "type"]
        };

        return this.service.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;

        if (data.type === "input")
            this.router.navigateToRoute('view-input', { id: data._id });
        else
            this.router.navigateToRoute('view-output', { id: data._id });
    }

    back() {
        this.router.navigateToRoute('list');
    }

    createInput() {
        this.router.navigateToRoute('create-input');
    }

    createOutput() {
        this.router.navigateToRoute('create-output');
    }

    get productionOrderLoader() {
        return (keyword) => {
            var info = { keyword: keyword, select: ["orderNo"] };
            return this.service.productionOrder(info)
                .then((result) => {
                    return result.data;
                });
        }
    }

    get kanbanLoader() {
        return (keyword) => {
            var info = { keyword: keyword, select: ["cart.cartNumber"] };
            return this.service.kanban(info)
                .then((result) => {
                    return result.data;
                });
        }
    }

    get machineLoader() {
        return (keyword) => {
            var info = { keyword: keyword, select: ["name"] };
            return this.serviceCore.machine(info)
                .then((result) => {
                    return result.data;
                });
        }
    }

    get stepLoader() {
        return (keyword) => {
            var info = { keyword: keyword, select: ["process"] };
            return this.serviceCore.step(info)
                .then((result) => {
                    return result.data;
                });
        }
    }

    cartNumber = (doc) => {
        return doc.cart.cartNumber;
    }

    productionOrderChanged(value) {
        if (value) {
            this.filter = {
                "kanban.productionOrder.orderNo": value.orderNo
            };
        }
        else
            this.filter = {};

        this.dailyOperationTable.refresh();
    }

    kanbanChanged(value) {
        if (value) {
            this.filter = {
                "kanban.cart.cartNumber": value.cart.cartNumber
            };
        }
        else
            this.filter = {};

        this.dailyOperationTable.refresh();
    }

    stepChanged(value) {
        if (value) {
            this.filter = {
                "step.process": value.process
            };
        }
        else
            this.filter = {};

        this.dailyOperationTable.refresh();
    }

    machineChanged(value) {
        if (value) {
            this.filter = {
                "machine.name": value.name
            };
        }
        else
            this.filter = {};

        this.dailyOperationTable.refresh();
    }
}