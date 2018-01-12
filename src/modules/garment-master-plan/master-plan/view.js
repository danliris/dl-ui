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
        if(this.data.status=== "Booking Dihapus"){
            this.hasEdit=false;
        }
        else if(this.data.status=== "Booking Dibatalkan"){
            this.hasEdit=false;
        }
        if(this.data.status!== "Booking Dihapus")
        {
            if(this.data && this.data.bookingOrderId){
                this.booking = {};
                var bookingData = await this.service.getBookingById(this.data.bookingOrderId);
                if(this.data.bookingDate !== bookingData.bookingDate)
                    this.booking["bookingDate"] = bookingData.bookingDate;
                if(this.data.quantity !== bookingData.orderQuantity)
                    this.booking["quantity"] = bookingData.orderQuantity;
                if(this.data.deliveryDate !== bookingData.deliveryDate)
                    this.booking["deliveryDate"] = bookingData.deliveryDate;
                if(this.data.remark !== bookingData.remark)
                    this.booking["remark"] = bookingData.remark;
                var details = [];
                var bookItems=[];
                var index=0;
                for(var detail of this.data.bookingItems){
                    console.log(detail);
                    var bookingDetail = bookingData.items.find(item => item.code === detail.code);
                    console.log(bookingDetail);
                    if(bookingDetail){
                        if(bookingDetail.masterPlanComodityId !== detail.masterPlanComodityId){
                            detail["bookingMasterPlanComodity"] = bookingDetail.masterPlanComodity;
                            detail["bookingMasterPlanComodityId"] = bookingDetail.masterPlanComodityId;
                        }
                        if(bookingDetail.quantity !== detail.quantity){
                            console.log(bookingDetail.quantity);
                            detail["bookingQuantity"] = bookingDetail.quantity;
                        }
                        if(bookingDetail.remark !== detail.remark)
                            detail["bookingRemark"] = bookingDetail.remark;
                        if(bookingDetail.deliveryDate && detail.deliveryDate && bookingDetail.deliveryDate !== detail.deliveryDate)
                            detail["bookingDeliveryDate"] = `${(new Date(bookingDetail.deliveryDate)).getDay()} - ${((new Date(bookingDetail.deliveryDate)).getMonth() + 1)} - ${(new Date(bookingDetail.deliveryDate)).getFullYear()}`;
                    }else{
                        detail["deletedData"] = "MD telah menghapus detail ini"
                    }
                    details.push(detail);
                }
                for(var item of bookingData.items){
                    var detail = this.data.bookingItems.find(detail => detail.code === item.code);
                    if(!detail){
                        var newDetail= {
                            code:item.code,
                            masterPlanComodityId:item.masterPlanComodityId,
                            masterPlanComodity:item.masterPlanComodity,
                            quantity:item.quantity,
                            remark:item.remark,
                            deliveryDate:item.deliveryDate,
                            newData:"MD telah menambah detail ini"
                        }
                        details.push(newDetail);
                    }
                }
                this.data.bookingItems = details;

            }
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