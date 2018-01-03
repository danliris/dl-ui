import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;

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
                if(bookingDetail){
                    if(bookingDetail.masterPlanComodityId !== detail.masterPlanComodityId){
                        detail["bookingMasterPlanComodity"] = bookingDetail.masterPlanComodity;
                        detail["bookingMasterPlanComodityId"] = bookingDetail.masterPlanComodityId;
                    }
                    if(bookingDetail.quantity !== detail.quantity)
                        detail["bookingQuantity"] = bookingDetail.quantity;
                    if(bookingDetail.remark !== detail.remark)
                        detail["bookingRemark"] = bookingDetail.remark;
                    if(bookingDetail.isConfirmed !== detail.isConfirmed)
                        detail["bookingIsConfirmed"] = bookingDetail.isConfirmed;
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
        this.router.navigateToRoute('view', { id: this.data._id });
    }

    save(event) {
        this.service.update(this.data).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }
}