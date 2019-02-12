import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
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
        this.error = {};
        var errorCount=0;
        if(this.data.ProcessType==null){
            this.error.ProcessType="Jenis Proses tidak boleh kosong";
            errorCount++;
        }
        if(!this.data.YarnType && this.data.IsMixDrawing!=true){
            this.error.YarnType="Jenis Benang tidak boleh kosong";
            errorCount++;
        }
        if(!this.data.Count){
            this.error.Count="Count tidak boleh kosong";
            errorCount++;
        }
        if(this.data.ProcessType == "Finish Drawing" && this.data.IsMixDrawing==true && this.data.Items){
            this.error.Items="Item tidak boleh kosong";
            errorCount++;
        }

        if(errorCount==0){
            this.service.update(this.data).then(result => {
                this.cancelCallback();
            }).catch(e => {
                this.error = e;
            })
        }
    }
}