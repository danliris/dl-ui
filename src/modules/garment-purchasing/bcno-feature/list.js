import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }

    info = { page: 1, size: 50 };

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

    @bindable SearchItem;

    SearchItems = ['No RO', 'No BC', 'No PO']
    UnitItems = ['', 'KONFEKSI 2A', 'KONFEKSI 2B', 'KONFEKSI 2C', 'KONFEKSI 1A', 'KONFEKSI 1B']

    search() {
        this.info.page = 1;
        this.info.total = 0;
        this.searching();
    }
    activate() {

    }
    tableData = []
    searching() {
        var args = {
            // page: this.info.page,
            // size: this.info.size,
            // dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            // dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            filter: this.filter ? this.filter : "",
            keyword: this.BCNo ? this.BCNo : this.pono ? this.pono : this.rono ? this.rono : "",
            //suppliertype : this.Tipe
        };
        this.service.search(args)
            .then(result => {
                this.rowCount = [];
                var index = 0;
                for (var a of result) {
                    var ro = a.RONo.toString();
                    var bcno = a.BCNo.toString();
                    var dono = a.DONo.toString();
                    var pono = a.PO.toString();
                    var urnno = a.URNNo.toString();
                    var qtybum = a.QtyBC.toString();
                    var uenno = a.UENNo.toString();
                    var qtyuen = a.QtyUEN.toString();
                    
                    //count data by ro
                    if (!this.rowCount[bcno + ro]) {
                        this.rowCount[bcno + ro] = 1;
                    } else {
                        this.rowCount[bcno + ro]++;
                    }

                    //count data by bcno
                    if (!this.rowCount[bcno]) {
                        this.rowCount[bcno] = 1;
                    } else {
                        this.rowCount[bcno]++;
                    }

                    //count data by dono
                    if (!this.rowCount[dono]) {
                        this.rowCount[dono] = 1;
                    } else {
                        this.rowCount[dono]++;
                    }

                    //count data by pono
                    if (!this.rowCount[pono]) {
                        this.rowCount[pono] = 1;
                    } else {
                        this.rowCount[pono]++;
                    }

                    //count data by urnno
                    if (!this.rowCount[urnno]) {
                        this.rowCount[urnno] = 1;
                    } else {
                        this.rowCount[urnno]++;
                    }

                    //count data by qtybum and urnno
                    if (!this.rowCount[urnno + qtybum]) {
                        this.rowCount[urnno + qtybum] = 1;
                    } else {
                        this.rowCount[urnno + qtybum]++;
                    }

                    //count data by uenno
                    if (!this.rowCount[uenno]) {
                        this.rowCount[uenno] = 1;
                    } else {
                        this.rowCount[uenno]++;
                    }

                    //count data by qtyuen and uenno
                    if (!this.rowCount[uenno + qtyuen]) {
                        this.rowCount[uenno + qtyuen] = 1;
                    } else {
                        this.rowCount[uenno + qtyuen]++;
                    }
                }
                for (var b of result) {
                    let bcno = result.find(
                        (o) =>  o.BCNo == b.BCNo
                    );
                    if (bcno) {
                        bcno.bcnospan = this.rowCount[b.BCNo];
                    }

                    let roNo = result.find((o) => o.BCType + o.RONo == b.BCType + b.RONo);
                    if (roNo) {
                        roNo.rospan = this.rowCount[b.BCNo + b.RONo];
                    }

                    let doNo = result.find((o) => o.DONo == b.DONo);
                    if (doNo) {
                        doNo.donospan = this.rowCount[b.DONo];
                    }

                    let poNo = result.find((o) => o.PO == b.PO);
                    if (poNo) {
                        poNo.ponospan = this.rowCount[b.PO];
                    }

                    let urnNo = result.find((o) => o.URNNo == b.URNNo);
                    if (urnNo && b.URNNo == "") {
                        urnNo.urnnospan = 1;
                    } else if (urnNo && b.URNNo != "") {
                        urnNo.urnnospan = this.rowCount[b.URNNo];
                    }

                    let qtybum = result.find((o) => o.URNNo + o.QtyBC.toString() == b.URNNo + b.QtyBC.toString());
                    if (qtybum && b.URNNo == "") {
                        qtybum.qtybumspan = 1;
                      
                    }else if (qtybum && b.URNNo != "") {
                        qtybum.qtybumspan = this.rowCount[b.URNNo + b.QtyBC.toString()];
                    }

                    // let uenNo = result.find((o) => o.UENNo == b.UENNo);
                    // if (uenNo && b.UENNo == "") {
                    //     uenNo.uennospan = 1;
                    // }else if (uenNo && b.UENNo != "") {
                    //     uenNo.uennospan = 1;
                    // }
                }
                
                this.data = result;
                console.log(this.data)
                    // this.info.total=result.info.total
                });
    }


    reset() {
        this.dateFrom= "",
        this.dateTo="",
        this.KtgrItem="",
        this.UnitItem=""

    }

    ExportToExcel() {
        let args = {            
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            unitcode : this.unit ? this.unit : "",
            unitname : this.unitname ? this.unitname : "",
            category : this.category ? this.category : "",
            categoryname : this.categoryname ? this.categoryname : ""
        };

        this.service.generateExcel(args);
    }




    SearchItemChanged(newvalue){
        if (newvalue) {
            if (newvalue === "No BC") {
                this.filter = "BCNo";
                this.pono = "";
                this.rono = "";
                this.data=[];
            }
            else if (newvalue === "No PO") { 
                this.filter = "PONo";
                this.BCNo = "";
                this.rono = "";
                this.data=[];
            }
            else if (newvalue === "No RO") {
                this.filter = "RONo";
                this.BCNo = "";
                this.pono = "";
                this.data=[];
        }else{
            this.unit = "";
            this.unitname = "";
        }
        }
    }

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }

}