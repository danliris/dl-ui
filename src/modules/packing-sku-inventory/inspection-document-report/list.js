import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

const GroupLoader = require("../../../loader/inspection-group-loader");
const MutasiLoader = require("../../../loader/inspection-mutasi-loader");
const ZonaLoader = require('../../../loader/inspection-zona-loader');
const KeteranganLoader = require('../../../loader/inspection-keterangan-loader');

@inject(Router, Service)
export class List {
    context = ["Rincian"];
    
    columns = [
        { field: "Index", title: "No" },
        {
            field: "DateReport", title: "Tanggal", formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        { field: "GroupText", title: "Group" },
        { field: "UnitText", title: "Unit" },
        { field: "KeluarKe", title: "Keluar Ke"},
        { field: "NoSPP", title :"No. SPP"},
        { field: "NoKereta", title :"No. Kereta"},
        { field: "Material", title :"Material"},
        { field: "Keterangan", title :"Ket"},
        { field: "Status", title :"Status"},
        { field: "Lebar", title :"Lebar"},
        { field: "Motif", title :"Motif"},
        { field: "Warna", title :"Warna"},
        { field: "Mtr", title :"Mtr"},
        { field: "Yds", title :"Yds"},
    ];
    loader = (info) => {
        let order = {};

        let dataDummy = [
            {
                "Index":"1",
                "DateReport":"2020-03-16",
                "GroupText":"SIANG",
                "UnitText":"P",
                "KeluarKe":"TRANSIT",
                "NoSPP":"P/2020/0261",
                "NoKereta":"1-1-9",
                "Material":"CD 74 56 44",
                "Keterangan":"NOT OK",
                "Status":"PERBAIKAN",
                "Lebar":"44",
                "Motif":"PRJ200",
                "Warna":"HIJAU",
                "Mtr":"247.00",
                "Yds":"270.22"
            },
            {
                "Index":"2",
                "DateReport":"2020-03-16",
                "GroupText":"SIANG",
                "UnitText":"P",
                "KeluarKe":"TRANSIT",
                "NoSPP":"P/2020/0556",
                "NoKereta":"1-1-6",
                "Material":"CD 94 72 44",
                "Keterangan":"NOT OK",
                "Status":"PERBAIKAN",
                "Lebar":"44",
                "Motif":"TW 1069",
                "Warna":"A",
                "Mtr":"221.00",
                "Yds":"241.77"
            },
                {
                "Index":"3",
                "DateReport":"2020-03-16",
                "GroupText":"SIANG",
                "UnitText":"P",
                "KeluarKe":"TRANSIT",
                "NoSPP":"P/2020/0787",
                "NoKereta":"1-1-10",
                "Material":"CD 94 72 44",
                "Keterangan":"NOT OK",
                "Status":"PERBAIKAN",
                "Lebar":"44",
                "Motif":"Bp 763",
                "Warna":"0",
                "Mtr":"225.00",
                "Yds":"246.15"
            }
        ];
        var result = {}
        result["total"] = dataDummy.length;
        result["data"] = dataDummy;
        var resProm = Promise.resolve().then(x=> {return result});

        return resProm;
    }

    get groups(){
        return GroupLoader;
        
    }
    get mutasi(){
        return MutasiLoader;
    }
    get zona(){
        return ZonaLoader;
    }
    get keterangan(){
        return KeteranganLoader;
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    contextCallback(event) {
        let arg = event.detail;
        let data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }

    post() {
        this.router.navigateToRoute('post');
    }
}
