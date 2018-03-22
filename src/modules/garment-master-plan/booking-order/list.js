import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    dataToBePosted = [];
    info = { page: 1, keyword: '' };

    rowFormatter(data, index) {
        if (data.expired=="Expired")
            return { classes: "danger" }
        else if (data.isMasterPlan)
            return { classes: "success" }
        
        else
            return {}
    }

    context = ["detail"]

    columns = [
        { field: "code", title: "Kode Booking" },
        { field: "bookingDate", title: "Tanggal Booking", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
         },
         { field: "garmentBuyerName", title: "Buyer" },
         { field: "orderQuantity", title: "Jumlah Order" },
        {
            field: "deliveryDate", title: "Tanggal Pengiriman", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "remark", title: "Keterangan" },
        {
            field: "isMasterPlan", title: "Status Booking Order",
            formatter: function (value, data, index) {
                return data.isCanceled ? "Dibatalkan" : value ? "Sudah dibuat Master Plan" : data.statusBook;
            }
        },
        { field: "confirmStatus", title: "Status Jumlah Confirm" },
        { field: "expired", title: "Status Sisa Order" }
    ];

    loader = (info) => {
        var order = {};
        var filter={
                    orderQuantity:{
                        $gt:0
                    }
        };
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
           // select:["isConfirmed", "bookingDate", "garmentBuyerName", "style.code", "standardHour.shSewing", "orderQuantity", "deliveryDate"],
            order: order,
            filter:JSON.stringify(filter)
        }

        return this.service.search(arg)
            .then(result => {
                var data = {}
                data.total = result.info.total;
                data.data = result.data;
                var today=new Date();
                for(var a of result.data){
                    a.confirmStatus='';
                    a.expired="On Process";
                    a.statusBook="Booking";
                    var total=0;
                    //status jumlah konfirm
                    if(a.items && a.items.length>0){
                        a.statusBook="Confirmed";

                        for(var b of a.items){
                            total+=b.quantity;
                        }
                        if(total>a.orderQuantity){
                            a.confirmStatus='+' + (total-a.orderQuantity);
                        }
                        else if(total<a.orderQuantity){
                            a.confirmStatus=(total-a.orderQuantity);
                        }
                        else if(total===a.orderQuantity){
                            a.confirmStatus='0';
                        }
                    }
                    else{
                        a.confirmStatus='Belum Confirm';
                    }

                    //status sisa order
                    if(a.orderQuantity> total ||  a.items.length==0){
                        var c = new Date(a.deliveryDate);
                        var b = today;
                        c.setHours(0,0,0,0);
                        b.setHours(0,0,0,0);
                        var diff=c.getTime() - b.getTime();
                        var timeDiff = Math.abs(c.getTime() - b.getTime());
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                        if(diffDays<=45){
                            a.expired="Expired";
                        }
                    }
                    if(total>a.orderQuantity || total===a.orderQuantity){
                        a.expired="-";
                    }
                    if(a.isCanceled==true){
                        a.expired="-";
                    }
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
            case "detail":
                this.router.navigateToRoute('view', { id: data._id });
                break;
        }
    }

    // posting() {
    //     if (this.dataToBePosted.length > 0) {
    //         this.service.posting(this.dataToBePosted).then(result => {
    //             this.table.refresh();
    //         }).catch(e => {
    //             this.error = e;
    //         })
    //     }
    // }

    create() {
        this.router.navigateToRoute('create');
    }
}