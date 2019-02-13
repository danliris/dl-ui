import { inject, bindable, computedFrom, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class Create {
    @bindable data = {};

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    saveCallback(event) {
        this.service.create(this.data)
        this.error={};
        if(this.data.LotNo==null){
            this.error.LotNo="Lot tidak boleh kosong";
            errorCount++;
        } 
        if(this.data.LotDate==null){ 
            this.error.LotDate="Tanggal tidak boleh kosong";
            errorCount++;
        }
        if(!this.data.UnitDepartmentId){ 
            this.error.UnitDepartmentId="Tanggal tidak boleh kosong";
            errorCount++;
        }
        if(!this.data.YarnTypeIdentity){
            this.error.YarnTypeIdentity="Tipe benang tidak boleh kosong";
            errorCount++;
        }
        if(this.data.CottonCompositions==null){
            this.error.CottonCompositions="Detail tidak boleh kosong";
            errorCount++;
        }
        console.log(this.error)
        if(errorCount==0){
            this.data.LotDate = this.data.LotDate ? moment(this.data.LotDate).format("DD MMM YYYY") : null;
            this.service.create(this.data)
            .then(result => {
                alert(`create data success`);
            })
            .catch(e => {

                this.error = e;
                alert("Missing Some Data");
            })
        }
        
    }

}