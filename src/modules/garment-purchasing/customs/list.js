import { inject } from 'aurelia-framework';
import { Dialog } from '../../../components/dialog/dialog';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
import { Base64Helper } from '../../../utils/base-64-coded-helper';
import { DownloadDialog } from './template/download-dialog';

@inject(Dialog, Router, Service)
export class List {
    dataToBeCompleted = [];
    dateFrom = moment().format("YYYY-MM-DD");
    dateTo = moment().format("YYYY-MM-DD");
    
    constructor(dialog, router, service) {
        this.dialog = dialog;
        this.service = service;
        this.router = router;
    }

    bind() {
        this.setContext();
        this.setColumns();
    }

    setContext() {
        this.context = ["Rincian"];
    }

    setColumns() {
        this.columns = [
            { field: "customsType", title: "Jenis Bea Cukai" },            
            { field: "beacukaiNo", title: "No Bea Cukai" },
            {
                field: "beacukaiDate", title: "Tanggal Bea Cukai", formatter: (value, data) => {
                    return moment(value).format("DD-MMM-YYYY");
                }
            },
            { field: "suppliername", title: "Supplier" },
            { field: "deliveryOrder", title: "List Nomor Surat Jalan", sortable: false  }
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
            order: order,
            select: ["beacukaiNo", "beacukaiDate", "customsType", "suppliername", "items"]
        }

        return this.service.search(arg)
            .then((result) => {
                var items = [];
                for(var a of result.data){
                    var dOrder = ""
                    if(a.items || a.items.length > 0){
                        for(var b of a.items){
                            // dOrder+=`${b.deliveryOrder.doNo}` + "</br>";
                            dOrder+=`<ul><li>${b.deliveryOrder.doNo}</li></ul>`;
                        }
                    }
                    var data = {
                        _id : a.Id,
                        beacukaiNo : a.beacukaiNo,
                        customsType : a.customType,
                        beacukaiDate : a.beacukaiDate,
                        suppliername : a.supplier.Name,
                        deliveryOrder : dOrder
                    }
                    items.push(data);
                }
                return {
                    total: result.info.total,
                    data: items
                }
            });
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        const encoded = Base64Helper.encode(data._id);
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: encoded });
                break;
        }
    }

    contextShowCallback(index, name, data) {
        return true;
    }

    create() {
        this.router.navigateToRoute('create');
    }

    showDownloadForm() {
            this.dialog.show(DownloadDialog, { dateFrom: this.dateFrom, dateTo: this.dateTo });
    }

    
}