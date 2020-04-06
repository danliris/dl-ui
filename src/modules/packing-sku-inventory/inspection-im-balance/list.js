import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

const GroupLoader = require("../../../loader/inspection-group-loader");
const UnitLoader = require("../../../loader/inspection-unit-loader");

@inject(Router, Service)
export class List {
    context = ["Rincian"];
    
    columns = [
        { field: "Material", title: "Material" },
        { field: "NoSP", title: "No SP" },
        { field: "SumAwal", title: "Sum of AWAL" },
        { field: "SumMsk", title: "Sum of MSK"},
        { field: "SumKeluar", title :"Sum of KELUAR"},
        { field: "SumAkhir", title :"Sum of AKHIR"}
    ];
    loader = (info) => {
        let order = {};

        let dataDummy = [
            {
                "Material":"1",
                "NoSP":"2020-03-16",
                "SumAwal":"SIANG",
                "SumMsk":"P",
                "SumKeluar":"TRANSIT",
                "SumAkhir":"P/2020/0261"
            },
            {
                "Material":"2",
                "NoSP":"2020-03-16",
                "SumAwal":"SIANG",
                "SumMsk":"P",
                "SumKeluar":"TRANSIT",
                "SumAkhir":"P/2020/0556"
            },
                {
                "Material":"3",
                "NoSP":"2020-03-16",
                "SumAwal":"SIANG",
                "SumMsk":"P",
                "SumKeluar":"TRANSIT",
                "SumAkhir":"P/2020/0787"
            }
        ];
        var result = {}
        result["total"] = dataDummy.length;
        result["data"] = dataDummy;
        var resProm = Promise.resolve().then(x=> {return result});

        return resProm;
    }

    get shift(){
        return GroupLoader;
        
    }
    get unit(){
        return UnitLoader;
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
}
