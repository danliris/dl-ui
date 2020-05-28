import { inject,bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    // @bindable DateReport;
    // @bindable zone;  

    // context = ["detail"]
    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };
    detailOptions = {
        searchable : false
    };
    zoneList = ["IM","TRANSIT","PACKING","GUDANG JADI","SHIPPING","GUDANG AVAL"];
    columns = [
        // {
        //     field: "date", title: "Tanggal", formatter: function (value, data, index) {
        //         return moment(value).format("DD MMM YYYY");
        //     }
        // },
        { field: "noSpp", title: "No. SPP" },    
        { field: "contruction", title: "Material" },
        { field: "unit", title: "Unit" },
        { field: "motif", title: "Motif" },
        { field: "color", title: "Warna" },
        { field: "grade", title: "Grade" },
        { field: "jenis", title: "Jenis" },
        { field: "keterangan", title: "Ket" },
        { field: "awal", title: "Awal" },
        { field: "masuk", title: "Masuk" },
        { field: "keluar", title: "Keluar" },
        { field: "akhir", title: "Akhir" },
        { field: "satuan", title: "Satuan" }
    ];

    loader = (info) => {
        // var order = {};
        // if (info.sort)
        //     order[info.sort] = info.order;
        var arg = {
            dateReport: moment(this.dateReport).format("YYYY-MM-DD"),
            zona: this.zona,
        }

        return this.service.search(arg)
            .then((result) => {
                var data = {};
                data.data = result;
                data.total = result.length;

                return data;
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
                this.router.navigateToRoute('view', { id: data.id });
                break;
            case "print":
                this.service.getPdfById(data.id);
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "print":
                return data;
            default:
                return true;
        }
    }

    export(){
        this.service.generateExcel(moment(this.dateReport).format("YYYY-MM-DD"),this.zona);
        
    }
    search(){
        this.table.refresh();
    }

    @bindable dateReport;
    dateReportChanged(n,o){
        // if (n!=o){
        //     // this.dateReport = n;
        //     this.data.dateReport = n;
        // }
        console.log(this);
    }
    @bindable zona;
    zoneChanged(n,o){
        // if(n!=o)
        // {
        //     // this.zona = n;
        //     this.data.zona= n;
        // }
    }
    reset(){
        this.dateReport = null;
        this.zona = null;
        this.table.refresh();
    }
}

