import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "../service";

@inject(Router, Service)
export class Copy {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
        this.error = {};
    }

    identityProperties = [
        "id",
        "active",
        "createdUtc",
        "createdBy",
        "createdAgent",
        "lastModifiedUtc",
        "lastModifiedBy",
        "lastModifiedAgent",
        "isDeleted",
    ];

    async activate(params) {
        this.id = params.id;
        this.data = await this.service.getById(this.id);
        this.copiedFrom = { invoiceNo: this.data.invoiceNo };
        var idx = 0;

        if (this.data.measurements) {
            for (var i of this.data.measurements) {
                i.MeasurementIndex = idx;
                idx++;
            }
        }

        if (this.data.items) {
            for (const item of this.data.items) {
                item.buyerAgent = this.data.buyerAgent;
                item.section = this.data.section;
            }
        }

        switch (this.data.status) {
            case "DRAFT":
            case "DRAFT_APPROVED_SHIPPING":
                this.editCallback = this.editAction;
                break;
            default:
                this.editCallback = null;
                break;
        }

        switch (this.data.status) {
            case "REJECTED_MD":
                this.alertInfo = "<strong>Alasan Reject oleh Md:</strong> " + (this.data.statusActivities.slice(-1)[0] || {}).remark;
                break;
            case "REJECTED_SHIPPING_UNIT":
                this.alertInfo = "<strong>Alasan Reject oleh Shipping:</strong> " + (this.data.statusActivities.slice(-1)[0] || {}).remark;
                break;
            default:
                break;
        }
        this.clearDataProperties();
        console.log(this.data);
    }

    clearDataProperties() {
        this.identityProperties.concat([
            "invoiceNo"
        ]).forEach(prop => delete this.data[prop]);

        this.data.items.forEach(item => {
            this.identityProperties.concat([
                "id",
            ]).forEach(prop => delete item[prop]);
            item.details.forEach(detail => {
                this.identityProperties.concat([
                    "id",
                ]).forEach(prop => delete detail[prop]);
                detail.sizes.forEach(size => {
                    this.identityProperties.concat([
                        "id",
                    ]).forEach(prop => delete size[prop]);
                });
            });
        });
        this.data.measurements.forEach(item => {
            this.identityProperties.concat([
                "id",
            ]).forEach(prop => delete item[prop]);
        });
    }

    list() {
        this.router.navigateToRoute("list");
    }

    copy() {
        this.data.shippingMarkImagePath=null;
        this.data.sideMarkImagePath=null;
        this.data.remarkImagePath=null;
        this.data.isUsed=false;
        this.service.createCopy(this.data)
            .then(result => {
                alert("Data berhasil dibuat, No Invoice: " + result);
                this.router.navigateToRoute('list');
            })
            .catch(error => {
                this.error = error;

                let errorNotif = "";
                if (error.InvoiceType || error.Type || error.Date || error.ItemsCount || error.Items) {
                    errorNotif += "Tab DESCRIPTION ada kesalahan pengisian.\n"
                }
                if (error.GrossWeight || error.NettWeight || error.totalCartons || error.SayUnit || error.MeasurementsCount || error.Measurements) {
                    errorNotif += "Tab DETAIL MEASUREMENT ada kesalahan pengisian.\n"
                }
                if (error.ShippingMark || error.SideMark || error.Remark) {
                    errorNotif += "Tab SHIPPING MARK - SIDE MARK - REMARK ada kesalahan pengisian."
                }

                if (errorNotif) {
                    alert(errorNotif);
                }
            });
    }
}
