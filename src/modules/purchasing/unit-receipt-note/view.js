import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import { Dialog } from '../../../au-components/dialog/dialog';
import { Base64Helper } from '../../../utils/base-64-coded-helper';

@inject(Router, Service, Dialog)
export class View {
    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
    }

    async activate(params) {
        var id = params.id;
        let decoded = Base64Helper.decode(id);
        id = decoded;
        this.data = await this.service.getById(id);
        if (this.data.items) {
            this.data.items.forEach(item => {
                item.showDetails = false
            })
        }
        this.unit = this.data.unit;
        this.supplier = this.data.supplier;
        this.deliveryOrder = this.data.items;
        if(this.data.doNo){
            this.deliveryOrder.no=this.data.doNo;
            
        }
        for(var _item of this.deliveryOrder){
            _item.deliveredUom=_item.product.uom;
        }
        if(this.data.unit && this.data.supplier){
            this.data.unitId=this.data.unit._id;
            this.data.supplierId=this.data.supplier._id;
            
        }
        if(this.data.storage && this.data.unit){
                this.data.storage.unit=this.data.unit;
            }
    }

    list() {
        this.router.navigateToRoute('list');
    }


    canEditOrDelete() {
        const d = this.data || {};
        if (d.StatusGRND365 === "Success") {return false;}
        if (d.isPaid || this.isLocked) return false;

        const items = Array.isArray(d.items) ? d.items : [];
        if (items.length === 0) return true;

        return items.every(i => {
        const delivered = Number(i && (typeof i.deliveredQuantity !== 'undefined' ? i.deliveredQuantity :  0));
        const remaining = Number(i && (typeof i.remainingQuantity !== 'undefined' ? i.remainingQuantity :  0));
        return delivered === remaining || (delivered !== remaining && !d.isStorage);
        });
    }


    edit() {
        const encoded = Base64Helper.encode(this.data._id);
        if(confirm('Apakah anda ingin merubah data ini?') == true) {
            this.router.navigateToRoute('edit', { id: encoded } );
        }
    }

    delete() {
        // this.service.delete(this.data).then(result => {
        //   if (result != "") {
        //     alert(result)
        //   }
        //   else {
        //     alert("Data berhasil dihapus");
        //   }
        //   this.list();
        // });
        this.dialog.prompt('Apakah anda yakin akan menghapus data ini?', 'Hapus Data Bon Terima Unit')
        .then(response => {
            if (response.ok) {
                this.service.delete(this.data).then(result => {
                    alert("Data berhasil dihapus");
                    this.list();
                });
            }
        })
    }

    showDetail(item) {
        if (item.showDetails)
            item.showDetails = false;
        else
            item.showDetails = true;
    }
}
