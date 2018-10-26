import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    data = [];
    info = { page: 1, keyword: '' };

    rowFormatter(data, index) {
        if (data.expired == "Expired")
            return { classes: "danger" }
        else if (data.isMasterPlan)
            return { classes: "success" }
        else
            return {}
    }

    options = {
        pagination: false,
    };

    context = ["detail"]

    columns = [
        { field: "code", title: "Kode Booking" },
        {
            field: "bookingDate", title: "Tanggal Booking", formatter: function (value, data, index) {
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
            field: "isMasterPlan", title: "Status Booking Order", sortable: false,
            formatter: function (value, data, index) {
                return data.isCanceled ? "Dibatalkan" : value ? "Sudah dibuat Master Plan" : data.statusBook;
            }
        },
        { field: "confirmStatus", title: "Status Jumlah Confirm", sortable: false },
        { field: "expired", title: "Status Sisa Order", sortable: false }
    ];

    loader = (info) => {
        var order = {};
        var filter = {
            orderQuantity: {
                $gt: 0
            }
        };
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: 1,
            size: 0,
            keyword: info.search,
            select: ["code", "bookingDate", "garmentBuyerName", "orderQuantity", "deliveryDate", "remark", "isMasterPlan", "isCanceled", "items"],
            order: order,
            filter: JSON.stringify(filter)
        }

        return this.service.search(arg)
            .then(result => {
                var today = new Date();
                for (var data of result.data) {
                    data.confirmStatus = '';
                    data.expired = "On Process";
                    data.statusBook = "Booking";
                    var total = 0;
                    //status jumlah konfirm
                    if (data.items && data.items.length > 0) {
                        data.statusBook = "Confirmed";

                        for (var item of data.items) {
                            total += item.quantity;
                        }
                        if (total > data.orderQuantity) {
                            data.confirmStatus = '+' + (total - data.orderQuantity);
                        }
                        else if (total < data.orderQuantity) {
                            data.confirmStatus = (total - data.orderQuantity);
                        }
                        else if (total === data.orderQuantity) {
                            data.confirmStatus = '0';
                        }
                    }
                    else {
                        data.confirmStatus = 'Belum Confirm';
                    }

                    //status sisa order
                    if (data.orderQuantity > total || data.items.length == 0) {
                        var deliveryDate = new Date(data.deliveryDate);
                        var todayDate = today;
                        deliveryDate.setHours(0, 0, 0, 0);
                        todayDate.setHours(0, 0, 0, 0);
                        var timeDiff = deliveryDate.getTime() - todayDate.getTime();
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                        if (diffDays <= 45) {
                            data.expired = "Expired";
                        }
                    }
                    if (total > data.orderQuantity || total === data.orderQuantity) {
                        data.expired = "-";
                    }
                    if (data.isCanceled == true) {
                        data.expired = "-";
                    }
                }
                this.data = result.data;
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

    delete() {
        if (this.data.length === 0) {
            alert("Tidak Ada Data");
            return;
        }
        this.service.deleteRemaining(this.data)
            .then(() => {
                alert("Sisa Booking Order Berhasil Dihapus");
                this.table.refresh();
            })
            .catch(error => {
                if(error.statusCode === 500){
                    alert(error.message);
                }
            })
    }
}