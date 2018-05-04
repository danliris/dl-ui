import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    context = ["Rincian","Cetak PDF"];
    columns = [
        {
            field: "postedItem", checkbox: true, sortable: false,
            formatter: (value, data) => {
                return { disabled: data.IsPosted, }
            }
        },
        { field: "DONo", title: "Nomor DO" },
        {
            field: "DODate", title: "Tanggal DO", formatter: value => moment(value).format("DD MMM YYYY")
        },
        { field: "Supplier.name", title: "Unit Pengirim" },
        // { field: "items[0].ETONo", title: "List Nomor Eksternal TO", sortable: false },
        {
            field: "items", title: "List Nomor Eksternal TO",
            formatter: items => {
                items = items.map(item => "&#9679; " + item.ETONo);
                return items.join("<br>");
            }
        },
        { field: "IsPosted", title: "Status Post", formatter: value => { return value ? "SUDAH" : "BELUM" } },
    ];

    constructor(router, service) {
        this.service = service;
        this.router = router;
        // console.log(this.service);
    }

    rowFormatter(data, index) {
        return data.IsPosted ? { classes: "success" } : {};
    }
    
    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            // select:["DONo", "ArrivalDate", "supplier.name","items.purchaseOrderExternal.no"],
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                // return data;
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        // console.log(arg);
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
            case "Cetak PDF":
                this.service.pdf(data);
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
          case "Cetak PDF":
            return data.isPosted;
          default:
            return true;
        }
      }

    create() {
        this.router.navigateToRoute('create');
    }

    post() {
        var idPostItems = this.selectedItem.map(value => value.Id);
        if (idPostItems.length > 0) {
            this.service.post(idPostItems).then(result => {
                this.table.refresh();
                this.selectedItem = [];
            }).catch(e => {
                this.error = e;
            })
        }
    }
}