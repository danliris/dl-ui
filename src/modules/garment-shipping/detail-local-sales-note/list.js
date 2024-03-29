import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    rowFormatter(data, index) {
        if (data.isApproveShipping == true || data.isApproveFinance == true){
            return { classes: "success" }
        }else if(data.isRejectedFinance  == true || data.isRejectedShipping  == true){
            return { classes: "danger" }
        }
        else
            return {}
    }
    context = ["Detail"]

    columns = [
        { field: "noteNo", title: "No Nota Penjualan Lokal" },
        {
            field: "date", title: "Tgl Penjualan", formatter: function (value) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "buyerCode", title: "Nama Buyer" },   
        { field: "amount", title: "Amount" },        
    ];

    loader = (info) => {
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
                for (const data of result.data) {
                    data.buyer = data.buyer || {};
                    data.buyerCode = `${data.buyer.code} - ${data.buyer.name}`;                    
                }

                return {
                    total: result.info.total,
                    data: result.data
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
            case "Detail":
                this.router.navigateToRoute('view', { id: data.id });
                break; 
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}
