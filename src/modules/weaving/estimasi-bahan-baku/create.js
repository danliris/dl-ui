import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import { relative } from 'path';

@inject(Router, Service)
export class List {
    context = ["detail"];

    // customNoPaddingOptions = {
    //     padding: {
    //         left: 0,
    //         right: 0
    //     }
    // }

    months =
    ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Desember"];

    columns = [
        { field: "sopNoEBB", title: "No. Surat Order Produksi Weaving" },
        { field: "noKonstruksi", title: "No. Konstruksi" },
        { field: "jnsLusiSatu", title: "Jenis Lusi 1" },
        { field: "asalLusiSatu", title: "Asal Lusi 1" },
        { field: "qtyLusiSatu", title: "Qty" },
        { field: "jnsLusiDua", title: "Jenis Lusi 2" },
        { field: "asalLusiDua", title: "Asal Lusi 2" },
        { field: "qtyLusiDua", title: "Qty" },
        { field: "jnsPknSatu", title: "Jenis Pakan 1" },
        { field: "asalPknSatu", title: "Asal Pakan 1" },
        { field: "qtyPakanSatu", title: "Qty" },
        { field: "jnsPkn", title: "Jenis Pakan 2" },
        { field: "asalPknDua", title: "Asal Pakan 2" },
        { field: "qtyPakanDua", title: "Qty" }

    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            // select: ["", "", "", "", "", ""],
            order: order
        }

        return {
            total: 2,
            // total: result.info.total,
            data: [{
                sopNoEBB: '0912/00-2018',
                noKonstruksi: 'CD 133 72 63',
                jnsLusiSatu: 'CD',
                asalLusiSatu: 'SSS',
                qtyLusiSatu: 50,
                jnsLusiDua: 'CD',
                asalLusiDua: 'SSS',
                qtyLusiDua: 50,
                jnsPknSatu: 'CD',
                asalPknSatu: 'SSS',
                qtyPakanSatu: 50,
                jnsPknDua: 'CD',
                asalPknDua: 'SSS',
                qtyPakanDua: 50
            }, {
                sopNoEBB: '0913/00-2018',
                noKonstruksi: 'CD 133 72 63',
                jnsLusiSatu: 'CD',
                asalLusiSatu: 'SSS',
                qtyLusiSatu: 100,
                jnsLusiDua: 'CD',
                asalLusiDua: 'SSS',
                qtyLusiDua: 100,
                jnsPknSatu: 'CD',
                asalPknSatu: 'SSS',
                qtyPakanSatu: 100,
                jnsPknDua: 'CD',
                asalPknDua: 'SSS',
                qtyPakanDua: 100
            }]
        }

        // return this.service.search(arg)
        //   .then(result => {
        //     return {
        //       total: result.info.total,
        //       data: result.data
        //     }
        //     // .catch(error=>{
        //     //     console.log(error);
        //     // })
        //   });
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "detail":
                this.router.navigateToRoute('view', { id: data.sopNoEBB });
                // this.router.navigateToRoute('view', { id: data._id });
                break;
        }
    }

    // create() {
    //     this.router.navigateToRoute('create');
    // }

    bind(context) {
        this.context = context;
        this.data = this.context.data;

        // console.log(this.data);
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        // this.deleteCallback = this.context.deleteCallback;
        // this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
    }
}