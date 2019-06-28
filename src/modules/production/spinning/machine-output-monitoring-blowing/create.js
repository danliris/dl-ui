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

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    saveCallback(event) {
        // this.error = {};
        // var errorCount = 0;
        // if(this.data.Date==null){
        //     this.error.Date="Date tidak boleh kosong";
        //     errorCount++;
        // }
        // if(!this.data.ProcessType || this.data.ProcessType==""){
        //     this.error.ProcessType="Jenis Proses tidak boleh kosong";
        //     errorCount++;
        // }
        // if(!this.data.MaterialTypeId || this.data.MaterialTypeId==""){
        //     this.error.MaterialTypeId="Nama Benang tidak boleh kosong";
        //     errorCount++;
        // }
        // if(!this.data.LotId || this.data.LotId==""){
        //     this.error.LotId="Lot tidak boleh kosong";
        //     errorCount++;
        // }
        // if(!this.data.Shift || this.data.Shift==""){
        //     this.error.Shift="Shift tidak boleh kosong";
        //     errorCount++;
        // }
        // if(!this.data.Group || this.data.Group==""){
        //     this.error.Group="Group tidak boleh kosong";
        //     errorCount++;
        // }
        // if(!this.data.UnitDepartmentId || this.data.UnitDepartmentId){
        //     this.error.UnitDepartmentId="Unit tidak boleh kosong";
        //     errorCount++;
        // }

        // if(errorCount==0){
        this.data.Date = this.data.Date ? moment(this.data.Date).format("DD MMM YYYY") : null;
        
        var outputItem = this.data.Items[0];
        
        // outputItem.Output = outputItem.BlowingDetails.reduce((a, b) => +a + +b.Output, 0);
        // if (this.data.MachineSpinning.UomUnit.toUpperCase() == "KG") {
        //     outputItem.Bale = (outputItem.Output / 181.44) * this.data.MachineSpinning.Delivery;
        // } else {
        //     outputItem.Bale = outputItem.Output;
        // }
        // outputItem.Eff = outputItem.Bale * 100 / ((this.data.CountConfig.RPM * 345.6 * (22 / 7) * this.data.MachineSpinning.Delivery) / (this.data.CountConfig.Ne * 307200)); // 60 * 24 * 0.24 & 400 * 768

        if (this.data.MachineSpinning.UomUnit.toUpperCase() == "KG") {
            var result = outputItem.BlowingDetails.reduce((a, b) => +a + +b.Output, 0);
            outputItem.Output = result - (1.6 * outputItem.BlowingDetails.filter(a => a.Output != 0).length);
            
        } else {
            var result = outputItem.BlowingDetails.reduce((a, b) => +a + +b.Output, 0);
            outputItem.Output = result - (1600 * outputItem.BlowingDetails.filter(a => a.Output != 0).length);
            
        }
        if (this.data.MachineSpinning.UomUnit.toUpperCase() == "KG") {

            outputItem.Bale = (outputItem.Output / 181.44) * this.data.MachineSpinning.Delivery;
        } else if (this.data.MachineSpinning.UomUnit.toUpperCase() == "GRAM") {
            outputItem.Bale = ((outputItem.Output / 1000) / 181.44) * this.data.MachineSpinning.Delivery;
        }
        else {
            outputItem.Bale = outputItem.Output;
        }

        outputItem.Eff = outputItem.Bale  * 100 / ((this.data.CountConfig.RPM * 345.6 * (22 / 7) * this.data.MachineSpinning.Delivery) / (this.data.CountConfig.Ne * 307200)); // 60 * 24 * 0.24 & 400 * 768
        this.service.create(this.data)
            .then(result => {
                alert('Data berhasil dibuat');
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {
                this.error = e;
                if (typeof (this.error) == "string") {
                    alert(this.error);
                } else {
                    alert("Missing Some Data");
                }
            });
        // }
    }
}
