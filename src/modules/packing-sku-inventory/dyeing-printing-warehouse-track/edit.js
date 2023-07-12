import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;
    hasView = false;
    isEdit = true;
    hasCreate = false;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.error = {};
        this.checkedAll = true;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.data.isEdit = true;

    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    save(event) {
        var itemQtySum = 0;
        var trackValidate = true;


        this.data.Items.forEach(x => {
            itemQtySum += x.packagingQtySplit;

        });
        //console.log( this.data.Items);
        for(let i = 0; i < this.data.Items.length; i++){
            //console.log( this.data.Items.track.id);
            
            if ( i > 0){
                //console.log("Id Rak Pertama",this.data.Items[0].track.id);
                
                var NextId = this.data.Items[i].track.id != undefined ? this.data.Items[i].track.id : this.data.Items[i].track.Id;
                //console.log("Id Rak berikutnya",NextId);
               if( this.data.Items[0].track.id == NextId){
                trackValidate = false;
               }
            }
        };
        // console.log(this.data.Items[0].isRead);
        // console.log(this.data.Items[1].isRead);

        //console.log(this.data.Items);

        //console.log("sum", itemQtySum);


        //console.log("trackValidate", trackValidate);

        //console.log("packagingQtyRemains", parseFloat(this.data.packagingQtyRemains).toFixed(2) );

        //console.log("itemQtySum", parseFloat(itemQtySum).toFixed(2) );
        //console.log("jumlah", this.data.Items.length);

        if (parseFloat(this.data.packagingQtyRemains).toFixed(2) != parseFloat(itemQtySum).toFixed(2)) {
            alert("Jumlah Quantity Item harus sama dengan Quantity Sebelumnya")
        } 
        else if (trackValidate == false){
            alert(" Jalur/Rak Tidak boleh sama dengan Sebelum nya")

        } else if(this.data.Items.length <2 || !this.data.Items[0].isRead){

            alert("Data awal tidak di hapus")
        }
        else {
            
            this.service.update(this.data).then(result => {
                alert("Data berhasil diubah");
                this.router.navigateToRoute('list');
            }).catch(e => {
                this.error = e;
            })
        }
    }
}