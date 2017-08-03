import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {
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

    context = ["Rincian"];

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    activate() {

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
}