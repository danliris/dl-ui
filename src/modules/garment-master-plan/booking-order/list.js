import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    dataToBePosted = [];
    info = { page: 1, keyword: '' };

    context = ["detail"]

    columns = [
        { field: "BookingOrderNo", title: "Kode Booking" },
        { field: "BookingOrderDate", title: "Tanggal Booking", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
         },
         { field: "BuyerName", title: "Buyer" },
         { field: "OrderQuantity", title: "Jumlah Order" },
        {
            field: "DeliveryDate", title: "Tanggal Pengiriman", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "Remark", title: "Keterangan" },
        {
            field: "IsBookingPlan", title: "Status Booking Order",
            formatter: function (value, data, index) {
                return data.isCanceled ? "Dibatalkan" : value ? "Sudah dibuat Master Plan" : data.statusBook;
            }
        },
        { field: "confirmStatus", title: "Status Jumlah Confirm" },
        { field: "expired", title: "Status Sisa Order" }
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
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
                        if(total>a.OrderQuantity){
                            a.confirmStatus='+' + (total-a.OrderQuantity);
                        }
                        else if(total<a.OrderQuantity){
                            a.confirmStatus=(total-a.OrderQuantity);
                        }
                        else if(total===a.OrderQuantity){
                            a.confirmStatus='0';
                        }
                    }
                    else{
                        a.confirmStatus='Belum Confirm';
                    }

                    //status sisa order
                    if(a.OrderQuantity> total ||  a.items.length==0){
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
                    if(total>a.OrderQuantity || total===a.OrderQuantity){
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

    create() {
        this.router.navigateToRoute('create');
    }
}