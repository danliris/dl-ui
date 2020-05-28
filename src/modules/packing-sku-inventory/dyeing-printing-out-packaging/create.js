import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Create {
    isCreate = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
        this.error = {};
    }


    back() {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    save() {
        console.log(this.data);
        var bodyRequest = {};
        bodyRequest.area = this.data.area;
        bodyRequest.date = this.data.date;
        bodyRequest.destinationArea = this.data.destinationArea;
        bodyRequest.group = this.data.group;
        bodyRequest.id = this.data.id;
        bodyRequest.shift = this.data.shift;
        bodyRequest.bonNoInput = this.data.bonNoInput;
        bodyRequest.packagingProductionOrders = [];
        this.data.packagingProductionOrders.forEach(element => {
            element.PackagingList.forEach(item => {
                var itemSpp = {};
                itemSpp.productionOrderNo = item.productionOrderNo,
                    itemSpp.productionOrder = item.productionOrder,
                    itemSpp.balance = item.balance,
                    itemSpp.buyerId = item.buyerId,
                    itemSpp.buyer = item.buyer,
                    itemSpp.color = item.color,
                    itemSpp.construction = item.construction,
                    itemSpp.grade = item.grade,
                    itemSpp.keterangan = item.keterangan,
                    itemSpp.motif = item.motif,
                    itemSpp.packagingQTY = item.packagingQTY,
                    itemSpp.packagingType = item.packagingType,
                    itemSpp.packagingUnit = item.packagingUnit,
                    itemSpp.packingInstruction = item.packingInstruction,
                    itemSpp.qtyOrder = item.qtyOrder,
                    itemSpp.qtyOut = item.qtyOut,
                    itemSpp.unit = item.unit,
                    itemSpp.uomUnit = item.uomUnit,
                    itemSpp.cartNo = item.cartNo,
                    itemSpp.remark = item.remark,
                    itemSpp.status = item.status,
                    itemSpp.material = item.material,
                    itemSpp.id = item.id
                bodyRequest.packagingProductionOrders.push(itemSpp);
            });
        });
        // console.log(bodyRequest);
        // //validation for checked
        // // var validation = [];
        // // this.data.packagingProductionOrders.forEach(element => {
        // //     var ischecked = element.isCheckedSPP;
        // //     var qtyKeluar = element.qtyOut;
        // //     var nomorSpp = element.productionOrderNo;

        // //     if(ischecked && qtyKeluar <=0){
        // //         // alert("Qty Keluar harus diisi jika di pilih, No SPP : "+nomorSpp);
        // //         // return 0;
        // //         validation.push({
        // //             NomorSpp : nomorSpp
        // //         });
        // //     }
        // // });
        // // if(validation.length!=0){
        // //     alert("Qty Keluar harus diisi jika di pilih, No SPP : "+validation[0].NomorSpp);
        // // }else
        // // {
        //     var packagingProductionOrdersSelected =[]
        //     this.data.packagingProductionOrders.forEach(element =>{
        //         if(element.isCheckedSPP){
        //             packagingProductionOrdersSelected.push(element)
        //         }
        //     });
        //     this.data.packagingProductionOrders = packagingProductionOrdersSelected;
        //     // console.log(this.data);

        this.service.create(bodyRequest)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {
                if (e.statusCode == 500) {
                    alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                } else {
                    this.error = e;
                }
            })
        // }
    }
}