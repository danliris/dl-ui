import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    dataToBePosted = [];
    info = { page: 1, keyword: '' };

    rowFormatter(data, index) {
        if (data.status === "Booking Dihapus")
            return { classes: "danger" };
        else if(data.status === "Booking Dibatalkan")
            return { classes: "danger" };
        else if(data.status === "Booking Ada Perubahan")
            return { classes: "info" };
        else if (data.status === "Booking Expired")
            return { classes: "danger" };
        else if (data.status === "Confirm Full")
            return { classes: "success" };
        else if (data.status === "Confirm Sebagian")
            return { classes: "warning" };
        else
            return {};
    }

    context = ["detail"]

    columns = [
        { field: "bookingOrderNo", title: "Nomor Booking" },
        { field: "bookingDate", title: "Tanggal Booking", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "garmentBuyerName", title: "Buyer" },
        { field: "quantity", title: "Jumlah Order" },
        {
            field: "deliveryDate", title: "Tanggal Pengiriman", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "remark", title: "Keterangan" },
        { field: "status", title: "status" },
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            select:["_id","bookingOrderNo", "garmentBuyerName", "quantity", "bookingDate", "deliveryDate", "remark", "status","details"],
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                var data = {}
                data.total = result.info.total;
                data.data = result.data;
                // return data;
                for(var dt of result.data){
                    var flag=0;
                    var count=0;
                    for(var item of dt.details){
                        if(item.isConfirmed){
                            flag++;
                        }
                        count++;
                    }
                    if(flag===count && dt.status=="Booking"){
                        dt.status="Confirm Full";
                    }
                    else if(flag>0 && dt.status=="Booking"){
                        dt.status="Confirm Sebagian";
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