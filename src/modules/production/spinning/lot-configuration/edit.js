import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var moment = require("moment");

@inject(Router, Service)
export class Edit {
    isEdit = true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.error = {};
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);

    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    saveCallback(event) {
        // this.error={};
        // var errorCount=0;
        // if(this.data.LotNo==null){
        //     this.error.LotNo="Lot tidak boleh kosong";
        //     errorCount++;
        // } 
        // if(this.data.LotDate==null){ 
        //     this.error.LotDate="Tanggal tidak boleh kosong";
        //     errorCount++;
        // }
        // if(!this.data.UnitDepartmentId){ 
        //     this.error.UnitDepartmentId="Tanggal tidak boleh kosong";
        //     errorCount++;
        // }
        // if(!this.data.YarnTypeIdentity){
        //     this.error.YarnTypeIdentity="Tipe benang tidak boleh kosong";
        //     errorCount++;
        // }
        // if(this.data.CottonCompositions==null){
        //     this.error.CottonCompositions="Detail tidak boleh kosong";
        //     errorCount++;
        // }
        // if(errorCount==0){
        this.data.LotDate = this.data.LotDate ? moment(this.data.LotDate).format("DD MMM YYYY") : null;
        this.service.update(this.data).then(result => {
            this.cancelCallback();
        }).catch(e => {
            this.error = e;
            alert("Missing Some Data");
        })
        // }
    }
}