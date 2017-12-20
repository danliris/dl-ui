import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
  hasCancel = true;
  hasEdit = true;
  hasDelete = true;

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
        if(this.data && this.data.bookingOrderId){
            this.booking = {};
            var bookingData = await this.service.getBookingById(this.data.bookingOrderId);
            if(this.data.bookingDate !== bookingData.bookingDate)
                this.booking["bookingDate"] = bookingData.booking;
            if(this.data.quantity !== bookingData.orderQuantity)
                this.booking["quantity"] = bookingData.orderQuantity;
            if(this.data.deliveryDate !== bookingData.deliveryDate)
                this.booking["deliveryDate"] = bookingData.deliveryDate;
            if(this.data.remark !== bookingData.remark)
                this.booking["remark"] = bookingData.remark;
            var details = [];
            for(var detail of this.data.details){
                var bookingDetail = bookingData.items.find(item => item.code === detail.code);
                if(bookingData){
                    if(bookingData.masterPlanComodityId !== detail.masterPlanComodityId){
                        detail["bookingMasterPlanComodity"] = bookingData.masterPlanComodity;
                        detail["bookingMasterPlanComodityId"] = bookingData.masterPlanComodityId;
                    }
                    if(bookingData.quantity !== detail.quantity)
                        detail["bookingQuantity"] = bookingData.quantity;
                    if(bookingData.remark !== detail.remark)
                        detail["bookingRemark"] = bookingData.remark;
                }else{
                    detail["deletedData"] = "MD telah menghapus detail ini"
                }
                details.push(detail);
            }
            for(var item of bookingData.items){
                var detail = this.data.details.find(detail => detail.code === item.code);
                if(!detail){
                    var newDetail= {
                        code:item.code,
                        masterPlanComodityId:item.masterPlanComodityId,
                        masterPlanComodity:item.masterPlanComodity,
                        quantity:item.quantity,
                        remark:item.remark,
                        detailItems:[],
                        isConfirmed:item.isConfirmed,
                        newData:"MD telah menambah detail ini"
                    }
                    details.push(newDetail);
                }
            }
            this.data.details = details;

        }
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    edit(event) {
        this.router.navigateToRoute('edit', { id: this.data._id });
    }   
    
    delete(event) {
        this.service.delete(this.data)
            .then(result => {
            this.cancel();
            });
    }  
}