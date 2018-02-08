import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    context = ["detail"];
    columns = [
        // { field: "style.name", title: "Nama Style" },
        { field: "garmentBuyerName", title: "Buyer" },
        { field: "masterplanComodityName", title: "Comodity" },
        { 
            field: "date", title: "Tanggal Update", 
            formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "shCutting", title: "SMV Cutting" },
        // { field: "shCuttingHour", title: "SH Cutting (Jam)" },
        { field: "shSewing", title: "SMV Sewing" },
        // { field: "shSewingHour", title: "SH Sewing (Jam)" },
        { field: "shFinishing", title: "SMV Finishing" },
        // { field: "shFinishingHour", title: "SH Finishing (Jam)" }
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            select:["garmentBuyerName", "masterplanComodityName", "date", "shCutting", "shSewing", "shFinishing"],
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                var data = {}
                data.total = result.info.total;
                data.data = result.data;
                // var rowData = [];
                // for(var item of result.data){
                //     var row = {
                //         _id: item._id,
                //         garmentBuyerName : {name : item.garmentBuyerName},
                //         masterplanComodityName : {name : item.masterplanComodityName},
                //         date : item.date,
                //         shCutting: item.shCutting,
                //         shCuttingHour: (item.shCutting / 60).toFixed(2),
                //         shSewing: item.shSewing,
                //         shSewingHour: (item.shSewing / 60).toFixed(2),
                //         shFinishing: item.shFinishing,
                //         shFinishingHour: (item.shFinishing / 60).toFixed(2)
                //     }
                //     rowData.push(row);
                // }
                // return data;
                return {
                    total: result.info.total,
                    data: result.data //rowData
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
        switch (arg.name) {
            case "detail":
                this.router.navigateToRoute('view', { id: data._id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}